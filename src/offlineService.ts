import {
  SEED_PATHS,
  SEED_MODULES,
  SEED_LESSONS,
  SEED_CHALLENGES,
  SEED_QUIZZES,
  SEED_FLASHCARDS,
  SEED_PROJECTS
} from './data/seedData';
import { AbapSimulator } from './data/abapRunner';
import { supabaseClient } from './supabaseClient';
import type {
  UserProfile,
  LeaderboardResponse,
  LearnerProfile,
  Path,
  Module,
  LessonDetail,
  Quiz,
  QuizQuestion,
  QuizResult,
  QuizAttemptReview,
  Challenge,
  ExecutionResult,
  Flashcard,
  Project,
  PersonalNote,
  Bookmark,
  AnalyticsData,
  AuthResponse,
  RegisterRequest,
  LoginRequest
} from './types';

const simulator = new AbapSimulator();

const FAKE_USERNAMES = new Set(['rap_architect', 'clean_coder', 'core_data_fan', 'subrc_zero', 'btp_cloud_dev', 'abap_dev']);

async function hashPasswordClient(password: string): Promise<string> {
  try {
    const enc = new TextEncoder();
    const data = enc.encode(password + '_abap_salt_2026');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    return btoa(password + '_abap_salt_2026');
  }
}

// Flatten questions from SEED_QUIZZES
const ALL_SEED_QUESTIONS: QuizQuestion[] = SEED_QUIZZES.flatMap(q =>
  ((q as any).questions || []).map((qn: any) => ({
    id: qn.id,
    quiz_id: q.id,
    question_type: qn.question_type as any,
    question: qn.question,
    options: typeof qn.options_json === 'string' ? JSON.parse(qn.options_json) : (qn.options || []),
    correct_answer: typeof qn.correct_answer_json === 'string' ? JSON.parse(qn.correct_answer_json) : qn.correct_answer,
    explanation: qn.explanation,
    difficulty: qn.difficulty as any,
    topic: qn.topic || 'General'
  }))
);

// Helpers for localStorage
function getItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

export const offlineService = {
  // Profile
  getProfile(): LearnerProfile {
    return getItem<LearnerProfile>('abap_profile', {
      id: 'default',
      display_name: 'Learner',
      role_title: 'ABAP Developer',
      streak_days: 1,
      daily_budget_mins: 45,
      target_date: '2026-12-31',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  },

  updateProfile(data: Partial<LearnerProfile>): LearnerProfile {
    const current = this.getProfile();
    const updated = { ...current, ...data, updated_at: new Date().toISOString() };
    setItem('abap_profile', updated);
    return updated;
  },

  // Authentication & Users
  getUsers(): { users: UserProfile[]; activeUser: UserProfile | null } {
    const stored = getItem<UserProfile[]>('abap_users', []);
    const cleanUsers = stored.filter(u => !FAKE_USERNAMES.has(u.username));
    if (cleanUsers.length !== stored.length) {
      setItem('abap_users', cleanUsers);
    }
    const session = getItem<UserProfile | null>('abap_auth_session', null);
    let activeUser = cleanUsers.find(u => u.is_active) || null;
    if (session && !FAKE_USERNAMES.has(session.username)) {
      activeUser = cleanUsers.find(u => u.id === session.id) || session;
    }
    return { users: cleanUsers, activeUser };
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const cleanUsername = data.username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (cleanUsername.length < 3) {
      throw new Error('Username must be at least 3 characters long (letters, numbers, underscores)');
    }
    if (!data.password || data.password.length < 4) {
      throw new Error('Password must be at least 4 characters long');
    }
    if (FAKE_USERNAMES.has(cleanUsername)) {
      throw new Error('This username is reserved');
    }

    const { users } = this.getUsers();
    if (users.some(u => u.username === cleanUsername)) {
      throw new Error('Username already exists. Please choose another or log in.');
    }

    const cleanDisplay = data.display_name?.trim() || cleanUsername;
    const cleanRole = data.role_title || 'ABAP Developer';
    const cleanAvatar = data.avatar_color || 'indigo';
    const pwdHash = await hashPasswordClient(data.password);

    const passwords = getItem<Record<string, string>>('abap_user_passwords', {});
    passwords[cleanUsername] = pwdHash;
    setItem('abap_user_passwords', passwords);

    users.forEach(u => (u.is_active = false));

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      username: cleanUsername,
      display_name: cleanDisplay,
      role_title: cleanRole,
      avatar_color: cleanAvatar,
      xp: 100,
      streak_days: 1,
      is_active: true
    };
    users.push(newUser);

    setItem('abap_users', users);
    setItem('abap_auth_session', newUser);
    this.updateProfile({ display_name: cleanDisplay, role_title: cleanRole });

    supabaseClient.upsertUser({
      id: newUser.id,
      username: newUser.username,
      display_name: newUser.display_name,
      role_title: newUser.role_title,
      avatar_color: newUser.avatar_color,
      xp: 100,
      streak_days: 1,
      lessons_completed: 0,
      quizzes_passed: 0,
      challenges_solved: 0,
      mastery_score: 0
    }).catch(() => {});

    return { success: true, user: newUser };
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    const cleanUsername = data.username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    const { users } = this.getUsers();
    const user = users.find(u => u.username === cleanUsername);
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const passwords = getItem<Record<string, string>>('abap_user_passwords', {});
    const inputHash = await hashPasswordClient(data.password);
    const storedHash = passwords[cleanUsername];

    if (storedHash && storedHash !== inputHash) {
      throw new Error('Invalid username or password');
    } else if (!storedHash) {
      passwords[cleanUsername] = inputHash;
      setItem('abap_user_passwords', passwords);
    }

    users.forEach(u => (u.is_active = u.id === user.id));
    user.is_active = true;
    setItem('abap_users', users);
    setItem('abap_auth_session', user);
    this.updateProfile({ display_name: user.display_name, role_title: user.role_title });
    this.syncActiveUser();

    return { success: true, user };
  },

  logout(): { success: boolean } {
    localStorage.removeItem('abap_auth_session');
    const { users } = this.getUsers();
    users.forEach(u => (u.is_active = false));
    setItem('abap_users', users);
    return { success: true };
  },

  getCurrentUser(): UserProfile | null {
    const { activeUser } = this.getUsers();
    return activeUser;
  },

  async createUser(data: { username: string; display_name: string; role_title: string; avatar_color: string }): Promise<{ success: boolean; user: UserProfile }> {
    return this.register({
      username: data.username,
      password: 'defaultPassword123',
      display_name: data.display_name,
      role_title: data.role_title,
      avatar_color: data.avatar_color
    });
  },

  switchUser(userId: string): { success: boolean; activeUser: UserProfile } {
    const { users } = this.getUsers();
    users.forEach(u => {
      u.is_active = u.id === userId;
    });
    setItem('abap_users', users);
    const active = users.find(u => u.id === userId) || users[0];
    if (active) {
      setItem('abap_auth_session', active);
      this.updateProfile({ display_name: active.display_name, role_title: active.role_title });
      this.syncActiveUser();
    }
    return { success: true, activeUser: active };
  },

  syncActiveUser() {
    try {
      const { activeUser } = this.getUsers();
      if (!activeUser || FAKE_USERNAMES.has(activeUser.username)) return;
      const progress = getItem<Record<string, { status: string }>>('abap_lesson_progress', {});
      const completedLessons = Object.values(progress).filter(p => p.status === 'completed').length;
      const challengeProg = getItem<Record<string, { status: string }>>('abap_challenge_progress', {});
      const completedChallenges = Object.values(challengeProg).filter(p => p.status === 'completed').length;
      const quizAttempts = getItem<any[]>('abap_quiz_attempts', []);
      const quizzesPassed = quizAttempts.filter(q => q.passed).length;
      const avgAccuracy = quizAttempts.length > 0 ? Math.round(quizAttempts.reduce((acc, q) => acc + q.percentage, 0) / quizAttempts.length) : 0;

      const streakDays = activeUser?.streak_days || 1;
      const calculatedXP = Math.max(100, (completedLessons * 50) + (quizzesPassed * 40) + (completedChallenges * 150) + (streakDays * 25));
      const masteryScore = Math.min(100, Math.round(((completedLessons / 10) * 40) + ((avgAccuracy / 100) * 30) + ((completedChallenges / 3) * 30)));

      supabaseClient.upsertUser({
        id: activeUser.id,
        username: activeUser.username,
        display_name: activeUser.display_name,
        role_title: activeUser.role_title,
        avatar_color: activeUser.avatar_color,
        xp: calculatedXP,
        streak_days: streakDays,
        lessons_completed: completedLessons,
        quizzes_passed: quizzesPassed,
        challenges_solved: completedChallenges,
        mastery_score: masteryScore
      }).catch(() => {});
    } catch {}
  },

  async getLeaderboard(): Promise<LeaderboardResponse> {
    const { users, activeUser } = this.getUsers();
    const progress = getItem<Record<string, { status: string }>>('abap_lesson_progress', {});
    const completedLessons = Object.values(progress).filter(p => p.status === 'completed').length;
    const challengeProg = getItem<Record<string, { status: string }>>('abap_challenge_progress', {});
    const completedChallenges = Object.values(challengeProg).filter(p => p.status === 'completed').length;
    const quizAttempts = getItem<any[]>('abap_quiz_attempts', []);
    const quizzesPassed = quizAttempts.filter(q => q.passed).length;
    const avgAccuracy = quizAttempts.length > 0 ? Math.round(quizAttempts.reduce((acc, q) => acc + q.percentage, 0) / quizAttempts.length) : 0;

    const streakDays = activeUser?.streak_days || 1;
    const calculatedXP = Math.max(100, (completedLessons * 50) + (quizzesPassed * 40) + (completedChallenges * 150) + (streakDays * 25));
    const masteryScore = Math.min(100, Math.round(((completedLessons / 10) * 40) + ((avgAccuracy / 100) * 30) + ((completedChallenges / 3) * 30)));

    if (activeUser && !FAKE_USERNAMES.has(activeUser.username)) {
      activeUser.xp = calculatedXP;
      activeUser.lessons_completed = completedLessons;
      activeUser.quizzes_passed = quizzesPassed;
      activeUser.challenges_solved = completedChallenges;
      activeUser.mastery_score = masteryScore;
      this.syncActiveUser();
    }

    let cloudUsers = await supabaseClient.getLeaderboard();
    let cloudSynced = false;
    let finalLeaderboard: any[] = [];

    if (cloudUsers && cloudUsers.length > 0) {
      cloudSynced = true;
      finalLeaderboard = cloudUsers.filter(u => !FAKE_USERNAMES.has(u.username));
    } else {
      finalLeaderboard = users.filter(u => !FAKE_USERNAMES.has(u.username)).map(u => ({
        ...u,
        lessons_completed: u.is_active ? completedLessons : 0,
        quizzes_passed: u.is_active ? quizzesPassed : 0,
        challenges_solved: u.is_active ? completedChallenges : 0,
        mastery_score: u.is_active ? masteryScore : 0
      }));
    }

    finalLeaderboard.sort((a, b) => b.xp - a.xp);
    const ranked = finalLeaderboard.map((item, index) => ({
      ...item,
      rank: index + 1,
      isCurrentUser: activeUser ? (item.id === activeUser.id || item.username === activeUser.username) : false
    }));

    return {
      leaderboard: ranked,
      activeUser: (activeUser && !FAKE_USERNAMES.has(activeUser.username)) ? activeUser : null,
      cloudSynced,
      totalUsers: ranked.length
    };
  },

  // Paths & Lessons
  getPaths(): Path[] {
    const progress = getItem<Record<string, { status: string }>>('abap_lesson_progress', {});
    return SEED_PATHS.map(path => {
      const modules = SEED_MODULES.filter(m => m.path_id === path.id);
      let totalLessons = 0;
      let completedLessons = 0;

      const pathModules: Module[] = modules.map(m => {
        const lessons = SEED_LESSONS.filter(l => l.module_id === m.id);
        totalLessons += lessons.length;
        const modCompleted = lessons.filter(l => progress[l.id]?.status === 'completed').length;
        completedLessons += modCompleted;

        return {
          id: m.id,
          path_id: m.path_id,
          title: m.title,
          description: m.description,
          order_index: m.order_index,
          estimated_mins: m.estimated_mins,
          is_core: Boolean(m.is_core),
          course_reference: m.course_reference || '',
          lessons: lessons.map(l => ({
            id: l.id,
            module_id: l.module_id,
            title: l.title,
            order_index: l.order_index,
            estimated_mins: l.estimated_mins,
            is_core: Boolean(l.is_core),
            user_status: (progress[l.id]?.status as any) || 'not_started',
            is_bookmarked: false
          })),
          totalLessons: lessons.length,
          completedLessons: modCompleted,
          progressPercentage: lessons.length > 0 ? Math.round((modCompleted / lessons.length) * 100) : 0
        };
      });

      return {
        id: path.id,
        title: path.title,
        description: path.description,
        order_index: path.order_index,
        icon: path.icon,
        badge: path.badge,
        modules: pathModules,
        totalLessons,
        completedLessons,
        progressPercentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
      };
    });
  },

  getLesson(id: string): LessonDetail {
    const lesson = SEED_LESSONS.find(l => l.id === id) || SEED_LESSONS[0];
    const moduleItem = SEED_MODULES.find(m => m.id === lesson.module_id);
    const pathItem = moduleItem ? SEED_PATHS.find(p => p.id === moduleItem.path_id) : undefined;
    const progress = getItem<Record<string, { status: string; scroll_position?: number }>>('abap_lesson_progress', {});
    const bookmarks = getItem<string[]>('abap_bookmarks', []);
    const notes = getItem<Record<string, string>>('abap_lesson_notes', {});

    // Prev / Next lesson
    const allModuleLessons = SEED_LESSONS.filter(l => l.module_id === lesson.module_id).sort((a, b) => a.order_index - b.order_index);
    const currentIndex = allModuleLessons.findIndex(l => l.id === lesson.id);
    const prevLesson = currentIndex > 0 ? { id: allModuleLessons[currentIndex - 1].id, title: allModuleLessons[currentIndex - 1].title } : null;
    const nextLesson = currentIndex < allModuleLessons.length - 1 ? { id: allModuleLessons[currentIndex + 1].id, title: allModuleLessons[currentIndex + 1].title } : null;

    return {
      id: lesson.id,
      module_id: lesson.module_id,
      title: lesson.title,
      order_index: lesson.order_index,
      estimated_mins: lesson.estimated_mins,
      is_core: Boolean(lesson.is_core),
      user_status: (progress[lesson.id]?.status as any) || 'not_started',
      is_bookmarked: bookmarks.includes(lesson.id),
      module_title: moduleItem?.title || '',
      path_id: pathItem?.id || '',
      path_title: pathItem?.title || '',
      prerequisites: lesson.prerequisites || '',
      objectives: lesson.objectives || '',
      handbook_unit: lesson.handbook_unit || '',
      summary: lesson.summary || '',
      key_takeaways: lesson.key_takeaways || '',
      content: typeof (lesson as any).content_json === 'string' ? JSON.parse((lesson as any).content_json) : (lesson as any).content || { sections: [] },
      personal_notes: notes[lesson.id] || '',
      scroll_position: progress[lesson.id]?.scroll_position || 0,
      prevLesson,
      nextLesson
    };
  },

  updateLessonProgress(id: string, status: 'completed' | 'in_progress' | 'not_started', scroll_position?: number) {
    const progress = getItem<Record<string, any>>('abap_lesson_progress', {});
    progress[id] = {
      status,
      scroll_position: scroll_position || 0,
      completed_at: status === 'completed' ? new Date().toISOString() : null
    };
    setItem('abap_lesson_progress', progress);
    this.syncActiveUser();
    return { success: true, status, completedAt: progress[id].completed_at };
  },

  toggleBookmark(id: string) {
    const bookmarks = getItem<string[]>('abap_bookmarks', []);
    const index = bookmarks.indexOf(id);
    let isBookmarked = false;
    if (index >= 0) {
      bookmarks.splice(index, 1);
    } else {
      bookmarks.push(id);
      isBookmarked = true;
    }
    setItem('abap_bookmarks', bookmarks);
    return { success: true, is_bookmarked: isBookmarked };
  },

  saveLessonNotes(id: string, notesText: string) {
    const notes = getItem<Record<string, string>>('abap_lesson_notes', {});
    notes[id] = notesText;
    setItem('abap_lesson_notes', notes);
    return { success: true, notes: notesText };
  },

  // Quizzes
  getQuizzes(): Quiz[] {
    const attempts = getItem<any[]>('abap_quiz_attempts', []);
    return SEED_QUIZZES.map(q => {
      const qAttempts = attempts.filter(a => a.quiz_id === q.id);
      const best = qAttempts.length > 0 ? Math.max(...qAttempts.map(a => a.percentage)) : undefined;
      return {
        id: q.id,
        lesson_id: q.lesson_id,
        module_id: q.module_id,
        title: q.title,
        description: q.description,
        mode: q.mode as any,
        passing_score: q.passing_score,
        question_count: ((q as any).questions || []).length,
        attempts_count: qAttempts.length,
        best_score: best
      };
    });
  },

  getQuiz(id: string): Quiz {
    const quiz = SEED_QUIZZES.find(q => q.id === id) || SEED_QUIZZES[0];
    const questions = ALL_SEED_QUESTIONS.filter(qn => qn.quiz_id === quiz.id);
    return {
      id: quiz.id,
      lesson_id: quiz.lesson_id,
      module_id: quiz.module_id,
      title: quiz.title,
      description: quiz.description,
      mode: quiz.mode as any,
      passing_score: quiz.passing_score,
      question_count: questions.length,
      questions
    };
  },

  submitQuiz(id: string, answers: Record<string, any>): QuizResult {
    const questions = ALL_SEED_QUESTIONS.filter(qn => qn.quiz_id === id);
    let score = 0;
    const review: QuizAttemptReview[] = questions.map(q => {
      const userAns = answers[q.id];
      const correctAns = q.correct_answer;
      let isCorrect = false;

      if (Array.isArray(correctAns) && Array.isArray(userAns)) {
        isCorrect = correctAns.length === userAns.length && correctAns.every(v => userAns.includes(v));
      } else {
        isCorrect = String(userAns || '').trim().toLowerCase() === String(correctAns || '').trim().toLowerCase();
      }

      if (isCorrect) score++;

      return {
        questionId: q.id,
        question: q.question,
        questionType: q.question_type,
        options: q.options || [],
        userAnswer: userAns,
        correctAnswer: correctAns,
        isCorrect,
        explanation: q.explanation,
        topic: q.topic || 'General'
      };
    });

    const total = questions.length || 1;
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= 70;
    const attemptId = `att-${Date.now()}`;

    const attempts = getItem<any[]>('abap_quiz_attempts', []);
    attempts.push({
      id: attemptId,
      quiz_id: id,
      score,
      total_questions: total,
      percentage,
      passed,
      created_at: new Date().toISOString()
    });
    setItem('abap_quiz_attempts', attempts);
    this.syncActiveUser();

    return {
      attemptId,
      score,
      totalQuestions: total,
      percentage,
      passed,
      review
    };
  },

  // Challenges
  getChallenges(): Challenge[] {
    const prog = getItem<Record<string, any>>('abap_challenge_progress', {});
    return SEED_CHALLENGES.map(c => {
      const userProg = prog[c.id];
      return {
        id: c.id,
        title: c.title,
        category: c.category,
        difficulty: c.difficulty as any,
        order_index: c.order_index,
        problem_statement: c.problem_statement,
        input_assumptions: c.input_assumptions,
        expected_output: c.expected_output,
        test_cases: typeof (c as any).test_cases_json === 'string' ? JSON.parse((c as any).test_cases_json) : (c as any).test_cases || [],
        constraints: c.constraints,
        hints: typeof (c as any).hints_json === 'string' ? JSON.parse((c as any).hints_json) : (c as any).hints || [],
        starter_code: c.starter_code,
        reference_solution: c.reference_solution,
        solution_explanation: c.solution_explanation,
        related_concepts: typeof (c as any).related_concepts_json === 'string' ? JSON.parse((c as any).related_concepts_json) : (c as any).related_concepts || [],
        user_status: (userProg?.status as any) || 'not_started',
        user_code: userProg?.user_code || c.starter_code,
        completed_at: userProg?.completed_at
      };
    });
  },

  getChallenge(id: string): Challenge {
    const challenge = SEED_CHALLENGES.find(c => c.id === id) || SEED_CHALLENGES[0];
    const prog = getItem<Record<string, any>>('abap_challenge_progress', {});
    const userProg = prog[challenge.id];
    return {
      id: challenge.id,
      title: challenge.title,
      category: challenge.category,
      difficulty: challenge.difficulty as any,
      order_index: challenge.order_index,
      problem_statement: challenge.problem_statement,
      input_assumptions: challenge.input_assumptions,
      expected_output: challenge.expected_output,
      test_cases: typeof (challenge as any).test_cases_json === 'string' ? JSON.parse((challenge as any).test_cases_json) : (challenge as any).test_cases || [],
      constraints: challenge.constraints,
      hints: typeof (challenge as any).hints_json === 'string' ? JSON.parse((challenge as any).hints_json) : (challenge as any).hints || [],
      starter_code: challenge.starter_code,
      reference_solution: challenge.reference_solution,
      solution_explanation: challenge.solution_explanation,
      related_concepts: typeof (challenge as any).related_concepts_json === 'string' ? JSON.parse((challenge as any).related_concepts_json) : (challenge as any).related_concepts || [],
      user_status: (userProg?.status as any) || 'not_started',
      user_code: userProg?.user_code || challenge.starter_code,
      completed_at: userProg?.completed_at
    };
  },

  runCode(id: string, code: string): ExecutionResult {
    const challenge = this.getChallenge(id);
    return simulator.run(code, challenge.test_cases);
  },

  submitChallenge(id: string, code: string): ExecutionResult {
    const result = this.runCode(id, code);
    const prog = getItem<Record<string, any>>('abap_challenge_progress', {});
    prog[id] = {
      status: result.status === 'passed' ? 'completed' : 'in_progress',
      user_code: code,
      completed_at: result.status === 'passed' ? new Date().toISOString() : null
    };
    setItem('abap_challenge_progress', prog);
    this.syncActiveUser();
    return result;
  },

  // Flashcards (SM-2)
  getFlashcards(): { cards: Flashcard[]; totalCount: number; dueCount: number } {
    const cardState = getItem<Record<string, any>>('abap_flashcards', {});
    const now = new Date();

    const cards: Flashcard[] = SEED_FLASHCARDS.map(fc => {
      const state = cardState[fc.id] || {
        interval_days: 1,
        ease_factor: 2.5,
        due_date: new Date().toISOString(),
        reviews_count: 0
      };
      return {
        id: fc.id,
        category: fc.category,
        front: fc.front,
        back: fc.back,
        code_snippet: fc.code_snippet,
        explanation: fc.explanation,
        mnemonic: fc.mnemonic,
        difficulty: fc.difficulty as 'easy' | 'medium' | 'hard',
        interval_days: state.interval_days,
        ease_factor: state.ease_factor,
        due_date: state.due_date,
        reviews_count: state.reviews_count
      };
    });

    const dueCount = cards.filter(c => new Date(c.due_date || '').getTime() <= now.getTime()).length;
    return { cards, totalCount: cards.length, dueCount };
  },

  reviewCard(id: string, rating: 'again' | 'hard' | 'good' | 'easy') {
    const cardState = getItem<Record<string, any>>('abap_flashcards', {});
    const current = cardState[id] || { interval_days: 1, ease_factor: 2.5, reviews_count: 0 };

    let interval = current.interval_days;
    let ease = current.ease_factor;

    if (rating === 'again') {
      interval = 1;
      ease = Math.max(1.3, ease - 0.2);
    } else if (rating === 'hard') {
      interval = Math.max(1, Math.round(interval * 1.2));
      ease = Math.max(1.3, ease - 0.15);
    } else if (rating === 'good') {
      interval = Math.round(interval * ease);
    } else {
      interval = Math.round(interval * ease * 1.3);
      ease += 0.15;
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + interval);

    cardState[id] = {
      interval_days: interval,
      ease_factor: ease,
      due_date: dueDate.toISOString(),
      reviews_count: (current.reviews_count || 0) + 1
    };
    setItem('abap_flashcards', cardState);

    return { success: true, intervalDays: interval, dueDate: dueDate.toISOString() };
  },


  // Projects
  getProjects(): Project[] {
    const checkedState = getItem<Record<string, string[]>>('abap_project_checks', {});
    return SEED_PROJECTS.map(p => {
      const checked = checkedState[p.id] || [];
      const checklistRaw = p.checklist_json ? JSON.parse(p.checklist_json) : [];
      const checklist = checklistRaw.map((item: any) => ({
        id: item.id,
        label: item.label,
        done: checked.includes(item.id)
      }));
      const isCompleted = checklist.length > 0 && checklist.every((c: any) => c.done);

      return {
        id: p.id,
        title: p.title,
        level: p.level as any,
        order_index: p.order_index,
        description: p.description,
        objectives: p.objectives_json ? JSON.parse(p.objectives_json) : [],
        prerequisites: p.prerequisites_json ? JSON.parse(p.prerequisites_json) : [],
        functional_reqs: p.functional_reqs_json ? JSON.parse(p.functional_reqs_json) : [],
        data_model: p.data_model || '',
        milestones: p.milestones_json ? JSON.parse(p.milestones_json) : [],
        test_scenarios: p.test_scenarios_json ? JSON.parse(p.test_scenarios_json) : [],
        checklist,
        concepts_learned: [],
        extensions: [],
        is_sandbox_compatible: Boolean(p.is_sandbox_compatible),
        user_status: isCompleted ? 'completed' : checked.length > 0 ? 'in_progress' : 'not_started',
        checked_items: checked
      };
    });
  },

  toggleProjectChecklist(id: string, itemId: string) {
    const checkedState = getItem<Record<string, string[]>>('abap_project_checks', {});
    const list = checkedState[id] || [];
    const idx = list.indexOf(itemId);
    if (idx >= 0) {
      list.splice(idx, 1);
    } else {
      list.push(itemId);
    }
    checkedState[id] = list;
    setItem('abap_project_checks', checkedState);

    const project = SEED_PROJECTS.find(p => p.id === id);
    const checklistRaw = project?.checklist_json ? JSON.parse(project.checklist_json) : [];
    const isCompleted = checklistRaw.length > 0 && list.length === checklistRaw.length;

    return {
      success: true,
      checked: list,
      status: isCompleted ? 'completed' : list.length > 0 ? 'in_progress' : 'not_started'
    };
  },

  // Notes
  getNotes(): PersonalNote[] {
    return getItem<PersonalNote[]>('abap_notes_list', []);
  },

  createNote(data: Partial<PersonalNote>): PersonalNote {
    const notes = this.getNotes();
    const newNote: PersonalNote = {
      id: `note-${Date.now()}`,
      title: data.title || 'Untitled Note',
      content: data.content || '',
      tag: data.tag || 'General',
      reference_type: data.reference_type,
      reference_id: data.reference_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    notes.unshift(newNote);
    setItem('abap_notes_list', notes);
    return newNote;
  },

  updateNote(id: string, data: Partial<PersonalNote>): PersonalNote {
    const notes = this.getNotes();
    const note = notes.find(n => n.id === id);
    if (!note) throw new Error('Note not found');
    Object.assign(note, data, { updated_at: new Date().toISOString() });
    setItem('abap_notes_list', notes);
    return note;
  },

  deleteNote(id: string) {
    const notes = this.getNotes().filter(n => n.id !== id);
    setItem('abap_notes_list', notes);
    return { success: true };
  },

  getBookmarks(): Bookmark[] {
    const bookmarks = getItem<string[]>('abap_bookmarks', []);
    return bookmarks
      .map(id => {
        const lesson = SEED_LESSONS.find(l => l.id === id);
        if (!lesson) return null;
        const mod = SEED_MODULES.find(m => m.id === lesson.module_id);
        const path = mod ? SEED_PATHS.find(p => p.id === mod.path_id) : undefined;
        return {
          id: lesson.id,
          title: lesson.title,
          module_id: lesson.module_id,
          module_title: mod?.title || '',
          path_title: path?.title || ''
        };
      })
      .filter(Boolean) as Bookmark[];
  },

  // Planner
  getPlanner() {
    const profile = this.getProfile();
    const progress = getItem<Record<string, any>>('abap_lesson_progress', {});
    const incompleteLessons = SEED_LESSONS.filter(l => progress[l.id]?.status !== 'completed').slice(0, 3);
    const { cards } = this.getFlashcards();
    const dueCards = cards.filter(c => new Date(c.due_date || '').getTime() <= Date.now()).slice(0, 5);
    const challenges = SEED_CHALLENGES.slice(0, 2);

    return {
      profile,
      checklist: {
        lessons: incompleteLessons.map(l => {
          const mod = SEED_MODULES.find(m => m.id === l.module_id);
          return {
            id: l.id,
            title: l.title,
            estimated_mins: l.estimated_mins,
            module_title: mod?.title || ''
          };
        }),
        dueCards: dueCards.map(c => ({ id: c.id, front: c.front, category: c.category })),
        challenges: challenges.map(c => ({ id: c.id, title: c.title, difficulty: c.difficulty, category: c.category }))
      }
    };
  },

  // Analytics
  getAnalytics(): AnalyticsData {
    const progress = getItem<Record<string, any>>('abap_lesson_progress', {});
    const completedLessons = Object.values(progress).filter(p => p.status === 'completed').length;
    const challengeProg = getItem<Record<string, any>>('abap_challenge_progress', {});
    const completedChallenges = Object.values(challengeProg).filter(p => p.status === 'completed').length;
    const quizAttempts = getItem<any[]>('abap_quiz_attempts', []);
    const avgAccuracy = quizAttempts.length > 0 ? Math.round(quizAttempts.reduce((acc, q) => acc + q.percentage, 0) / quizAttempts.length) : 0;

    const totalLessons = SEED_LESSONS.length || 1;
    const totalChallenges = SEED_CHALLENGES.length || 1;
    const lessonProgressPct = Math.round((completedLessons / totalLessons) * 100);
    const challengeProgressPct = Math.round((completedChallenges / totalChallenges) * 100);

    const lessonScore = Math.min(40, Math.round((completedLessons / totalLessons) * 40));
    const quizScore = Math.min(30, Math.round((avgAccuracy / 100) * 30));
    const challengeScore = Math.min(30, Math.round((completedChallenges / totalChallenges) * 30));
    const masteryScore = lessonScore + quizScore + challengeScore;

    const paths = this.getPaths();
    const pathBreakdown = paths.map(p => ({
      pathId: p.id,
      title: p.title,
      total: p.totalLessons,
      completed: p.completedLessons,
      percentage: p.progressPercentage
    }));

    const cardState = getItem<Record<string, any>>('abap_flashcards', {});
    const reviewedCards = Object.values(cardState).filter(c => (c.reviews_count || 0) > 0).length;

    return {
      totalLessons,
      completedLessons,
      lessonProgressPct,
      totalChallenges,
      completedChallenges,
      challengeProgressPct,
      avgQuizAccuracy: avgAccuracy,
      totalQuizAttempts: quizAttempts.length,
      totalCards: SEED_FLASHCARDS.length,
      reviewedCards,
      totalStudyMins: completedLessons * 25 + completedChallenges * 30 + quizAttempts.length * 15,
      masteryScore,
      masteryFormula: 'Mastery = (40% × Lesson Completion) + (30% × Quiz Accuracy) + (30% × Challenges Solved)',
      pathBreakdown,
      recentActivity: quizAttempts.slice(-5).reverse().map((qa, idx) => ({
        id: `act-${idx}`,
        activity_type: 'quiz',
        reference_id: qa.quiz_id,
        duration_mins: 15,
        created_at: qa.created_at,
        summary: `Completed Quiz (${qa.score}/${qa.total_questions} - ${qa.percentage}%)`
      }))
    };
  },

  search(q: string) {
    const query = q.toLowerCase().trim();
    if (!query) {
      return { lessons: [], challenges: [], questions: [], projects: [] };
    }

    const lessons = SEED_LESSONS.filter(l => l.title.toLowerCase().includes(query) || l.summary.toLowerCase().includes(query)).slice(0, 5).map(l => {
      const mod = SEED_MODULES.find(m => m.id === l.module_id);
      return { id: l.id, title: l.title, summary: l.summary, module_title: mod?.title || '' };
    });

    const challenges = SEED_CHALLENGES.filter(c => c.title.toLowerCase().includes(query) || c.problem_statement.toLowerCase().includes(query)).slice(0, 5).map(c => ({
      id: c.id,
      title: c.title,
      category: c.category,
      difficulty: c.difficulty,
      problem_statement: c.problem_statement
    }));

    const questions = ALL_SEED_QUESTIONS.filter(qn => qn.question.toLowerCase().includes(query) || qn.topic.toLowerCase().includes(query)).slice(0, 5).map(qn => {
      const quiz = SEED_QUIZZES.find(q => q.id === qn.quiz_id);
      return {
        id: qn.id,
        question: qn.question,
        topic: qn.topic,
        difficulty: qn.difficulty,
        quiz_title: quiz?.title || ''
      };
    });

    const projects = SEED_PROJECTS.filter(p => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)).slice(0, 5).map(p => ({
      id: p.id,
      title: p.title,
      level: p.level,
      description: p.description
    }));

    return { lessons, challenges, questions, projects };
  }
};
