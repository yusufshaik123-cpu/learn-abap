import express from 'express';
import cors from 'cors';
import { db, initDatabase } from './db.ts';
import { AbapSimulator, type TestCase } from './abapRunner.ts';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize database schema
initDatabase();

const simulator = new AbapSimulator();

// ==========================================
// 1. Learner Profile & Settings
// ==========================================
app.get('/api/profile', (req, res) => {
  try {
    const profile = db.prepare('SELECT * FROM learner_profile WHERE id = ?').get('default') as any;
    res.json(profile || {
      id: 'default',
      display_name: 'Learner',
      role_title: 'ABAP Developer',
      daily_budget_mins: 45,
      streak_days: 1
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/profile', (req, res) => {
  try {
    const { display_name, role_title, target_date, daily_budget_mins } = req.body;
    db.prepare(`
      UPDATE learner_profile
      SET display_name = COALESCE(?, display_name),
          role_title = COALESCE(?, role_title),
          target_date = COALESCE(?, target_date),
          daily_budget_mins = COALESCE(?, daily_budget_mins),
          updated_at = datetime('now')
      WHERE id = 'default'
    `).run(display_name, role_title, target_date, daily_budget_mins);

    const updated = db.prepare('SELECT * FROM learner_profile WHERE id = ?').get('default');
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 2. Learning Roadmap & Paths
// ==========================================
app.get('/api/paths', (req, res) => {
  try {
    const paths = db.prepare('SELECT * FROM paths ORDER BY order_index ASC').all() as any[];
    const modules = db.prepare('SELECT * FROM modules ORDER BY order_index ASC').all() as any[];
    const lessons = db.prepare(`
      SELECT l.*,
             COALESCE(p.status, 'not_started') as user_status,
             p.completed_at,
             p.is_bookmarked
      FROM lessons l
      LEFT JOIN user_lesson_progress p ON l.id = p.lesson_id
      ORDER BY l.order_index ASC
    `).all() as any[];

    const result = paths.map(path => {
      const pathModules = modules
        .filter(m => m.path_id === path.id)
        .map(mod => {
          const modLessons = lessons.filter(l => l.module_id === mod.id);
          const completedCount = modLessons.filter(l => l.user_status === 'completed').length;
          return {
            ...mod,
            lessons: modLessons,
            totalLessons: modLessons.length,
            completedLessons: completedCount,
            progressPercentage: modLessons.length > 0 ? Math.round((completedCount / modLessons.length) * 100) : 0
          };
        });

      const totalLessonsInPath = pathModules.reduce((acc, m) => acc + m.totalLessons, 0);
      const completedLessonsInPath = pathModules.reduce((acc, m) => acc + m.completedLessons, 0);

      return {
        ...path,
        modules: pathModules,
        totalLessons: totalLessonsInPath,
        completedLessons: completedLessonsInPath,
        progressPercentage: totalLessonsInPath > 0 ? Math.round((completedLessonsInPath / totalLessonsInPath) * 100) : 0
      };
    });

    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 3. Lesson Reader & Progress
// ==========================================
app.get('/api/lessons/:id', (req, res) => {
  try {
    const lesson = db.prepare(`
      SELECT l.*,
             m.title as module_title,
             m.path_id,
             p.title as path_title,
             COALESCE(prog.status, 'not_started') as user_status,
             prog.completed_at,
             prog.scroll_position,
             prog.notes as personal_notes,
             COALESCE(prog.is_bookmarked, 0) as is_bookmarked
      FROM lessons l
      JOIN modules m ON l.module_id = m.id
      JOIN paths p ON m.path_id = p.id
      LEFT JOIN user_lesson_progress prog ON l.id = prog.lesson_id
      WHERE l.id = ?
    `).get(req.params.id) as any;

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    // Find previous and next lessons
    const allLessons = db.prepare(`
      SELECT id, title, module_id
      FROM lessons
      ORDER BY module_id, order_index ASC
    `).all() as any[];

    const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
    const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

    // Update last visited timestamp
    db.prepare(`
      INSERT INTO user_lesson_progress (lesson_id, last_visited_at)
      VALUES (?, datetime('now'))
      ON CONFLICT(lesson_id) DO UPDATE SET last_visited_at = datetime('now')
    `).run(lesson.id);

    res.json({
      ...lesson,
      content: JSON.parse(lesson.content_json),
      prevLesson,
      nextLesson
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/lessons/:id/progress', (req, res) => {
  try {
    const { status, scroll_position } = req.body;
    const completedAt = status === 'completed' ? new Date().toISOString() : null;

    db.prepare(`
      INSERT INTO user_lesson_progress (lesson_id, status, scroll_position, completed_at, last_visited_at)
      VALUES (?, ?, ?, ?, datetime('now'))
      ON CONFLICT(lesson_id) DO UPDATE SET
        status = COALESCE(?, status),
        scroll_position = COALESCE(?, scroll_position),
        completed_at = CASE WHEN ? = 'completed' THEN datetime('now') ELSE completed_at END,
        last_visited_at = datetime('now')
    `).run(req.params.id, status, scroll_position, completedAt, status, scroll_position, status);

    // If completed, record study session
    if (status === 'completed') {
      db.prepare(`
        INSERT INTO study_sessions (id, activity_type, reference_id, duration_mins, summary)
        VALUES (?, 'lesson_completed', ?, 20, 'Completed lesson')
      `).run(`sess-${Date.now()}`, req.params.id);
    }

    res.json({ success: true, status, completedAt });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/lessons/:id/bookmark', (req, res) => {
  try {
    const current = db.prepare('SELECT is_bookmarked FROM user_lesson_progress WHERE lesson_id = ?').get(req.params.id) as any;
    const newStatus = current && current.is_bookmarked ? 0 : 1;

    db.prepare(`
      INSERT INTO user_lesson_progress (lesson_id, is_bookmarked)
      VALUES (?, ?)
      ON CONFLICT(lesson_id) DO UPDATE SET is_bookmarked = ?
    `).run(req.params.id, newStatus, newStatus);

    res.json({ success: true, is_bookmarked: Boolean(newStatus) });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/lessons/:id/notes', (req, res) => {
  try {
    const { notes } = req.body;
    db.prepare(`
      INSERT INTO user_lesson_progress (lesson_id, notes)
      VALUES (?, ?)
      ON CONFLICT(lesson_id) DO UPDATE SET notes = ?
    `).run(req.params.id, notes, notes);

    res.json({ success: true, notes });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 4. Quiz Center & Assessments
// ==========================================
app.get('/api/quizzes', (req, res) => {
  try {
    const quizzes = db.prepare(`
      SELECT q.*,
             COUNT(qq.id) as question_count,
             (SELECT MAX(percentage) FROM quiz_attempts qa WHERE qa.quiz_id = q.id) as best_score,
             (SELECT COUNT(*) FROM quiz_attempts qa WHERE qa.quiz_id = q.id) as attempt_count
      FROM quizzes q
      LEFT JOIN quiz_questions qq ON q.id = qq.quiz_id
      GROUP BY q.id
    `).all() as any[];

    res.json(quizzes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/quizzes/:id', (req, res) => {
  try {
    const quiz = db.prepare('SELECT * FROM quizzes WHERE id = ?').get(req.params.id) as any;
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    const questions = db.prepare('SELECT * FROM quiz_questions WHERE quiz_id = ?').all(quiz.id) as any[];
    const parsedQuestions = questions.map(q => ({
      ...q,
      options: JSON.parse(q.options_json),
      correct_answer: JSON.parse(q.correct_answer_json)
    }));

    res.json({
      ...quiz,
      questions: parsedQuestions
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/quizzes/:id/submit', (req, res) => {
  try {
    const { answers } = req.body; // Map of questionId -> user selected option(s)
    const questions = db.prepare('SELECT * FROM quiz_questions WHERE quiz_id = ?').all(req.params.id) as any[];

    let correctCount = 0;
    const review: any[] = [];

    for (const q of questions) {
      const correct = JSON.parse(q.correct_answer_json);
      const userAns = answers[q.id];
      let isCorrect = false;

      if (Array.isArray(correct)) {
        if (Array.isArray(userAns)) {
          const s1 = [...correct].sort();
          const s2 = [...userAns].sort();
          isCorrect = s1.length === s2.length && s1.every((val, index) => val === s2[index]);
        }
      } else {
        isCorrect = String(userAns).trim().toLowerCase() === String(correct).trim().toLowerCase();
      }

      if (isCorrect) correctCount++;

      review.push({
        questionId: q.id,
        question: q.question,
        questionType: q.question_type,
        options: JSON.parse(q.options_json),
        userAnswer: userAns,
        correctAnswer: correct,
        isCorrect,
        explanation: q.explanation,
        topic: q.topic
      });
    }

    const totalQuestions = questions.length;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const quiz = db.prepare('SELECT passing_score FROM quizzes WHERE id = ?').get(req.params.id) as any;
    const passed = percentage >= (quiz?.passing_score || 70);

    const attemptId = `att-${Date.now()}`;
    db.prepare(`
      INSERT INTO quiz_attempts (id, quiz_id, score, max_score, percentage, passed, answers_json)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(attemptId, req.params.id, correctCount, totalQuestions, percentage, passed ? 1 : 0, JSON.stringify(answers));

    // Record study session
    db.prepare(`
      INSERT INTO study_sessions (id, activity_type, reference_id, duration_mins, summary)
      VALUES (?, 'quiz_completed', ?, 15, ?)
    `).run(`sess-${Date.now()}`, req.params.id, `Completed quiz with ${percentage}% score`);

    res.json({
      attemptId,
      score: correctCount,
      totalQuestions,
      percentage,
      passed,
      review
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 5. Coding Practice & Simulated Sandbox
// ==========================================
app.get('/api/challenges', (req, res) => {
  try {
    const challenges = db.prepare(`
      SELECT c.*,
             COALESCE(p.status, 'not_started') as user_status,
             p.passed_tests,
             p.total_tests,
             p.user_code,
             p.completed_at
      FROM challenges c
      LEFT JOIN user_challenge_progress p ON c.id = p.challenge_id
      ORDER BY c.order_index ASC
    `).all() as any[];

    const parsed = challenges.map(c => ({
      ...c,
      test_cases: JSON.parse(c.test_cases_json),
      hints: JSON.parse(c.hints_json || '[]'),
      related_concepts: JSON.parse(c.related_concepts_json || '[]')
    }));

    res.json(parsed);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/challenges/:id', (req, res) => {
  try {
    const challenge = db.prepare(`
      SELECT c.*,
             COALESCE(p.status, 'not_started') as user_status,
             p.passed_tests,
             p.total_tests,
             p.user_code,
             p.completed_at
      FROM challenges c
      LEFT JOIN user_challenge_progress p ON c.id = p.challenge_id
      WHERE c.id = ?
    `).get(req.params.id) as any;

    if (!challenge) return res.status(404).json({ error: 'Challenge not found' });

    res.json({
      ...challenge,
      test_cases: JSON.parse(challenge.test_cases_json),
      hints: JSON.parse(challenge.hints_json || '[]'),
      related_concepts: JSON.parse(challenge.related_concepts_json || '[]')
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/challenges/:id/run', (req, res) => {
  try {
    const { code } = req.body;
    const challenge = db.prepare('SELECT test_cases_json FROM challenges WHERE id = ?').get(req.params.id) as any;
    const testCases: TestCase[] = challenge ? JSON.parse(challenge.test_cases_json) : [];

    const executionResult = simulator.run(code, testCases);
    res.json(executionResult);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/challenges/:id/submit', (req, res) => {
  try {
    const { code } = req.body;
    const challenge = db.prepare('SELECT test_cases_json FROM challenges WHERE id = ?').get(req.params.id) as any;
    const testCases: TestCase[] = challenge ? JSON.parse(challenge.test_cases_json) : [];

    const executionResult = simulator.run(code, testCases);
    const passed = executionResult.status === 'passed';

    db.prepare(`
      INSERT INTO user_challenge_progress (challenge_id, user_code, status, passed_tests, total_tests, completed_at, last_attempt_at)
      VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
      ON CONFLICT(challenge_id) DO UPDATE SET
        user_code = ?,
        status = CASE WHEN ? = 1 THEN 'completed' ELSE 'in_progress' END,
        passed_tests = ?,
        total_tests = ?,
        completed_at = CASE WHEN ? = 1 THEN datetime('now') ELSE completed_at END,
        last_attempt_at = datetime('now')
    `).run(
      req.params.id,
      code,
      passed ? 'completed' : 'in_progress',
      executionResult.passedTests,
      executionResult.totalTests,
      passed ? new Date().toISOString() : null,
      code,
      passed ? 1 : 0,
      executionResult.passedTests,
      executionResult.totalTests,
      passed ? 1 : 0
    );

    if (passed) {
      db.prepare(`
        INSERT INTO study_sessions (id, activity_type, reference_id, duration_mins, summary)
        VALUES (?, 'challenge_completed', ?, 25, 'Passed coding challenge')
      `).run(`sess-${Date.now()}`, req.params.id);
    }

    res.json({
      ...executionResult,
      recordedStatus: passed ? 'completed' : 'in_progress'
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 6. Flashcards & Spaced Repetition (SM-2)
// ==========================================
app.get('/api/flashcards', (req, res) => {
  try {
    const cards = db.prepare(`
      SELECT f.*,
             COALESCE(p.repetitions, 0) as repetitions,
             COALESCE(p.interval_days, 1.0) as interval_days,
             COALESCE(p.ease_factor, 2.5) as ease_factor,
             p.due_date,
             p.last_rating
      FROM flashcards f
      LEFT JOIN user_card_progress p ON f.id = p.card_id
    `).all() as any[];

    // Calculate due count
    const now = new Date().toISOString();
    const dueCards = cards.filter(c => !c.due_date || c.due_date <= now);

    res.json({
      cards,
      totalCount: cards.length,
      dueCount: dueCards.length
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/flashcards/:id/review', (req, res) => {
  try {
    const { rating } = req.body; // 'again', 'hard', 'good', 'easy'
    const cardProgress = db.prepare('SELECT * FROM user_card_progress WHERE card_id = ?').get(req.params.id) as any;

    let repetitions = cardProgress?.repetitions || 0;
    let intervalDays = cardProgress?.interval_days || 1.0;
    let easeFactor = cardProgress?.ease_factor || 2.5;

    // SuperMemo-2 Spaced Repetition Algorithm
    switch (rating) {
      case 'again':
        repetitions = 0;
        intervalDays = 0.5; // Review in 12 hours
        easeFactor = Math.max(1.3, easeFactor - 0.2);
        break;
      case 'hard':
        repetitions = Math.max(1, repetitions);
        intervalDays = Math.max(1, intervalDays * 1.2);
        easeFactor = Math.max(1.3, easeFactor - 0.15);
        break;
      case 'good':
        if (repetitions === 0) intervalDays = 1;
        else if (repetitions === 1) intervalDays = 3;
        else intervalDays = Math.round(intervalDays * easeFactor);
        repetitions++;
        break;
      case 'easy':
        if (repetitions === 0) intervalDays = 2;
        else if (repetitions === 1) intervalDays = 4;
        else intervalDays = Math.round(intervalDays * easeFactor * 1.3);
        repetitions++;
        easeFactor += 0.15;
        break;
      default:
        intervalDays = 1;
    }

    const dueDate = new Date(Date.now() + intervalDays * 24 * 60 * 60 * 1000).toISOString();

    db.prepare(`
      INSERT INTO user_card_progress (card_id, repetitions, interval_days, ease_factor, due_date, last_reviewed_at, last_rating)
      VALUES (?, ?, ?, ?, ?, datetime('now'), ?)
      ON CONFLICT(card_id) DO UPDATE SET
        repetitions = ?,
        interval_days = ?,
        ease_factor = ?,
        due_date = ?,
        last_reviewed_at = datetime('now'),
        last_rating = ?
    `).run(
      req.params.id, repetitions, intervalDays, easeFactor, dueDate, rating,
      repetitions, intervalDays, easeFactor, dueDate, rating
    );

    res.json({
      success: true,
      repetitions,
      intervalDays,
      easeFactor,
      dueDate,
      rating
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 7. 5-Day Intensive Sprint
// ==========================================
app.get('/api/sprint', (req, res) => {
  try {
    const sprintDays = db.prepare(`
      SELECT s.*,
             COALESCE(p.is_completed, 0) as is_completed,
             COALESCE(p.completed_tasks_json, '[]') as completed_tasks,
             COALESCE(p.quiz_score, 0) as quiz_score,
             p.completed_at
      FROM sprint_days s
      LEFT JOIN user_sprint_progress p ON s.day_number = p.day_number
      ORDER BY s.day_number ASC
    `).all() as any[];

    const parsed = sprintDays.map(sd => ({
      ...sd,
      objectives: JSON.parse(sd.objectives_json),
      code_examples: JSON.parse(sd.code_examples_json),
      practice_tasks: JSON.parse(sd.practice_tasks_json),
      quiz_questions: JSON.parse(sd.quiz_questions_json),
      revision_points: JSON.parse(sd.revision_points_json),
      completion_criteria: JSON.parse(sd.completion_criteria_json),
      completed_tasks: JSON.parse(sd.completed_tasks)
    }));

    res.json(parsed);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/sprint/:day/toggle-task', (req, res) => {
  try {
    const dayNumber = Number(req.params.day);
    const { taskId } = req.body;

    const current = db.prepare('SELECT completed_tasks_json FROM user_sprint_progress WHERE day_number = ?').get(dayNumber) as any;
    let completedTasks: string[] = current ? JSON.parse(current.completed_tasks_json) : [];

    if (completedTasks.includes(taskId)) {
      completedTasks = completedTasks.filter(id => id !== taskId);
    } else {
      completedTasks.push(taskId);
    }

    const day = db.prepare('SELECT practice_tasks_json FROM sprint_days WHERE day_number = ?').get(dayNumber) as any;
    const allTasks: any[] = day ? JSON.parse(day.practice_tasks_json) : [];
    const isCompleted = allTasks.length > 0 && completedTasks.length >= allTasks.length;

    db.prepare(`
      INSERT INTO user_sprint_progress (day_number, completed_tasks_json, is_completed, completed_at)
      VALUES (?, ?, ?, CASE WHEN ? = 1 THEN datetime('now') ELSE NULL END)
      ON CONFLICT(day_number) DO UPDATE SET
        completed_tasks_json = ?,
        is_completed = ?,
        completed_at = CASE WHEN ? = 1 THEN datetime('now') ELSE completed_at END
    `).run(
      dayNumber, JSON.stringify(completedTasks), isCompleted ? 1 : 0, isCompleted ? 1 : 0,
      JSON.stringify(completedTasks), isCompleted ? 1 : 0, isCompleted ? 1 : 0
    );

    res.json({ success: true, completedTasks, isCompleted });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 8. Projects & Capstones
// ==========================================
app.get('/api/projects', (req, res) => {
  try {
    const projects = db.prepare(`
      SELECT p.*,
             COALESCE(up.checked_items_json, '[]') as checked_items,
             COALESCE(up.status, 'not_started') as user_status,
             up.completed_at
      FROM projects p
      LEFT JOIN user_project_progress up ON p.id = up.project_id
      ORDER BY p.order_index ASC
    `).all() as any[];

    const parsed = projects.map(p => ({
      ...p,
      objectives: JSON.parse(p.objectives_json),
      prerequisites: JSON.parse(p.prerequisites_json),
      functional_reqs: JSON.parse(p.functional_reqs_json),
      milestones: JSON.parse(p.milestones_json),
      test_scenarios: JSON.parse(p.test_scenarios_json),
      checklist: JSON.parse(p.checklist_json),
      concepts_learned: JSON.parse(p.concepts_learned_json),
      extensions: JSON.parse(p.extensions_json || '[]'),
      checked_items: JSON.parse(p.checked_items)
    }));

    res.json(parsed);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/projects/:id/check', (req, res) => {
  try {
    const { itemId } = req.body;
    const progress = db.prepare('SELECT checked_items_json FROM user_project_progress WHERE project_id = ?').get(req.params.id) as any;
    let checked: string[] = progress ? JSON.parse(progress.checked_items_json) : [];

    if (checked.includes(itemId)) {
      checked = checked.filter(id => id !== itemId);
    } else {
      checked.push(itemId);
    }

    const proj = db.prepare('SELECT checklist_json FROM projects WHERE id = ?').get(req.params.id) as any;
    const allItems: any[] = proj ? JSON.parse(proj.checklist_json) : [];
    const isCompleted = allItems.length > 0 && checked.length >= allItems.length;
    const status = isCompleted ? 'completed' : (checked.length > 0 ? 'in_progress' : 'not_started');

    db.prepare(`
      INSERT INTO user_project_progress (project_id, checked_items_json, status, completed_at, last_updated_at)
      VALUES (?, ?, ?, CASE WHEN ? = 'completed' THEN datetime('now') ELSE NULL END, datetime('now'))
      ON CONFLICT(project_id) DO UPDATE SET
        checked_items_json = ?,
        status = ?,
        completed_at = CASE WHEN ? = 'completed' THEN datetime('now') ELSE completed_at END,
        last_updated_at = datetime('now')
    `).run(
      req.params.id, JSON.stringify(checked), status, status,
      JSON.stringify(checked), status, status
    );

    res.json({ success: true, checked, status });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 9. Personal Notes & Bookmarks
// ==========================================
app.get('/api/notes', (req, res) => {
  try {
    const notes = db.prepare('SELECT * FROM personal_notes ORDER BY updated_at DESC').all() as any[];
    res.json(notes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/notes', (req, res) => {
  try {
    const { title, content, tag, reference_type, reference_id } = req.body;
    const id = `note-${Date.now()}`;
    db.prepare(`
      INSERT INTO personal_notes (id, title, content, tag, reference_type, reference_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, title, content, tag || 'General', reference_type || null, reference_id || null);

    const note = db.prepare('SELECT * FROM personal_notes WHERE id = ?').get(id);
    res.json(note);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/notes/:id', (req, res) => {
  try {
    const { title, content, tag } = req.body;
    db.prepare(`
      UPDATE personal_notes
      SET title = COALESCE(?, title),
          content = COALESCE(?, content),
          tag = COALESCE(?, tag),
          updated_at = datetime('now')
      WHERE id = ?
    `).run(title, content, tag, req.params.id);

    const note = db.prepare('SELECT * FROM personal_notes WHERE id = ?').get(req.params.id);
    res.json(note);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/notes/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM personal_notes WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/bookmarks', (req, res) => {
  try {
    const bookmarks = db.prepare(`
      SELECT l.id, l.title, l.module_id, m.title as module_title, p.title as path_title
      FROM lessons l
      JOIN user_lesson_progress up ON l.id = up.lesson_id
      JOIN modules m ON l.module_id = m.id
      JOIN paths p ON m.path_id = p.id
      WHERE up.is_bookmarked = 1
      ORDER BY up.last_visited_at DESC
    `).all() as any[];

    res.json(bookmarks);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 10. Planner & Daily Tasks
// ==========================================
app.get('/api/planner', (req, res) => {
  try {
    const profile = db.prepare('SELECT * FROM learner_profile WHERE id = ?').get('default') as any;

    // Incomplete lessons
    const incompleteLessons = db.prepare(`
      SELECT l.id, l.title, l.estimated_mins, m.title as module_title
      FROM lessons l
      JOIN modules m ON l.module_id = m.id
      LEFT JOIN user_lesson_progress p ON l.id = p.lesson_id
      WHERE p.status IS NULL OR p.status != 'completed'
      ORDER BY l.order_index ASC
      LIMIT 3
    `).all() as any[];

    // Due flashcards
    const dueCards = db.prepare(`
      SELECT f.id, f.front, f.category
      FROM flashcards f
      LEFT JOIN user_card_progress p ON f.id = p.card_id
      WHERE p.due_date IS NULL OR p.due_date <= datetime('now')
      LIMIT 5
    `).all() as any[];

    // Incomplete challenges
    const pendingChallenges = db.prepare(`
      SELECT c.id, c.title, c.difficulty, c.category
      FROM challenges c
      LEFT JOIN user_challenge_progress p ON c.id = p.challenge_id
      WHERE p.status IS NULL OR p.status != 'completed'
      LIMIT 2
    `).all() as any[];

    res.json({
      profile,
      checklist: {
        lessons: incompleteLessons,
        dueCards,
        challenges: pendingChallenges
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 11. Analytics & True Mastery Calculation
// ==========================================
app.get('/api/analytics', (req, res) => {
  try {
    const totalLessons = (db.prepare('SELECT count(*) as count FROM lessons').get() as any).count;
    const completedLessons = (db.prepare("SELECT count(*) as count FROM user_lesson_progress WHERE status = 'completed'").get() as any).count;

    const totalChallenges = (db.prepare('SELECT count(*) as count FROM challenges').get() as any).count;
    const completedChallenges = (db.prepare("SELECT count(*) as count FROM user_challenge_progress WHERE status = 'completed'").get() as any).count;

    const quizStats = db.prepare(`
      SELECT COUNT(*) as total_attempts,
             AVG(percentage) as avg_accuracy
      FROM quiz_attempts
    `).get() as any;

    const avgQuizAccuracy = Math.round(quizStats.avg_accuracy || 0);

    // Flashcard stats
    const totalCards = (db.prepare('SELECT count(*) as count FROM flashcards').get() as any).count;
    const reviewedCards = (db.prepare('SELECT count(*) as count FROM user_card_progress WHERE repetitions > 0').get() as any).count;

    // Study sessions total time
    const studyStats = db.prepare(`
      SELECT SUM(duration_mins) as total_mins,
             COUNT(*) as session_count
      FROM study_sessions
    `).get() as any;

    const totalStudyMins = studyStats.total_mins || 0;

    // Transparent Mastery Formula:
    // Mastery Score = (Lesson Completion % * 0.40) + (Quiz Accuracy % * 0.30) + (Challenges Passed % * 0.30)
    const lessonRatio = totalLessons > 0 ? (completedLessons / totalLessons) : 0;
    const challengeRatio = totalChallenges > 0 ? (completedChallenges / totalChallenges) : 0;
    const quizRatio = avgQuizAccuracy / 100;

    const masteryScore = Math.min(100, Math.round(
      (lessonRatio * 40) +
      (quizRatio * 30) +
      (challengeRatio * 30)
    ));

    // Recent activity
    const recentActivity = db.prepare(`
      SELECT * FROM study_sessions
      ORDER BY created_at DESC
      LIMIT 10
    `).all() as any[];

    // Path level breakdown
    const paths = db.prepare('SELECT id, title FROM paths ORDER BY order_index ASC').all() as any[];
    const pathBreakdown = paths.map(p => {
      const pLessons = (db.prepare(`
        SELECT count(*) as count FROM lessons l
        JOIN modules m ON l.module_id = m.id
        WHERE m.path_id = ?
      `).get(p.id) as any).count;

      const pDone = (db.prepare(`
        SELECT count(*) as count FROM lessons l
        JOIN modules m ON l.module_id = m.id
        JOIN user_lesson_progress prog ON l.id = prog.lesson_id
        WHERE m.path_id = ? AND prog.status = 'completed'
      `).get(p.id) as any).count;

      return {
        pathId: p.id,
        title: p.title,
        total: pLessons,
        completed: pDone,
        percentage: pLessons > 0 ? Math.round((pDone / pLessons) * 100) : 0
      };
    });

    res.json({
      totalLessons,
      completedLessons,
      lessonProgressPct: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
      totalChallenges,
      completedChallenges,
      challengeProgressPct: totalChallenges > 0 ? Math.round((completedChallenges / totalChallenges) * 100) : 0,
      avgQuizAccuracy,
      totalQuizAttempts: quizStats.total_attempts || 0,
      totalCards,
      reviewedCards,
      totalStudyMins,
      masteryScore,
      masteryFormula: '40% Lessons Completed + 30% Quiz Accuracy + 30% Coding Challenges Solved',
      pathBreakdown,
      recentActivity
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 12. Global Full-Text Search
// ==========================================
app.get('/api/search', (req, res) => {
  try {
    const q = req.query.q ? String(req.query.q).trim().toLowerCase() : '';
    if (!q) return res.json({ lessons: [], questions: [], challenges: [], projects: [] });

    const searchPattern = `%${q}%`;

    const lessons = db.prepare(`
      SELECT l.id, l.title, l.summary, m.title as module_title
      FROM lessons l
      JOIN modules m ON l.module_id = m.id
      WHERE lower(l.title) LIKE ? OR lower(l.summary) LIKE ? OR lower(l.content_json) LIKE ?
      LIMIT 10
    `).all(searchPattern, searchPattern, searchPattern) as any[];

    const challenges = db.prepare(`
      SELECT id, title, category, difficulty, problem_statement
      FROM challenges
      WHERE lower(title) LIKE ? OR lower(problem_statement) LIKE ?
      LIMIT 10
    `).all(searchPattern, searchPattern) as any[];

    const questions = db.prepare(`
      SELECT q.id, q.question, q.topic, q.difficulty, qz.title as quiz_title
      FROM quiz_questions q
      JOIN quizzes qz ON q.quiz_id = qz.id
      WHERE lower(q.question) LIKE ? OR lower(q.topic) LIKE ?
      LIMIT 10
    `).all(searchPattern, searchPattern) as any[];

    const projects = db.prepare(`
      SELECT id, title, level, description
      FROM projects
      WHERE lower(title) LIKE ? OR lower(description) LIKE ?
      LIMIT 10
    `).all(searchPattern, searchPattern) as any[];

    res.json({
      lessons,
      challenges,
      questions,
      projects
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 13. Backup / Export / Import
// ==========================================
app.get('/api/backup/export', (req, res) => {
  try {
    const profile = db.prepare('SELECT * FROM learner_profile WHERE id = ?').get('default');
    const lessonProgress = db.prepare('SELECT * FROM user_lesson_progress').all();
    const challengeProgress = db.prepare('SELECT * FROM user_challenge_progress').all();
    const quizAttempts = db.prepare('SELECT * FROM quiz_attempts').all();
    const cardProgress = db.prepare('SELECT * FROM user_card_progress').all();
    const sprintProgress = db.prepare('SELECT * FROM user_sprint_progress').all();
    const projectProgress = db.prepare('SELECT * FROM user_project_progress').all();
    const notes = db.prepare('SELECT * FROM personal_notes').all();
    const studySessions = db.prepare('SELECT * FROM study_sessions').all();

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=abap_mastery_backup.json');
    res.json({
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      data: {
        profile,
        lessonProgress,
        challengeProgress,
        quizAttempts,
        cardProgress,
        sprintProgress,
        projectProgress,
        notes,
        studySessions
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/backup/import', (req, res) => {
  try {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: 'No data provided' });

    // Restore lesson progress
    if (Array.isArray(data.lessonProgress)) {
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO user_lesson_progress (lesson_id, status, completed_at, last_visited_at, scroll_position, notes, is_bookmarked)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      for (const item of data.lessonProgress) {
        stmt.run(item.lesson_id, item.status, item.completed_at, item.last_visited_at, item.scroll_position, item.notes, item.is_bookmarked);
      }
    }

    res.json({ success: true, message: 'Data imported successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 14. Static Client Assets & SPA Fallback
// ==========================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

app.listen(Number(PORT), '127.0.0.1', () => {
  console.log(`[ABAP Mastery API] Server running on http://127.0.0.1:${PORT}`);
});
