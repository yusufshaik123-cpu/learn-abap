import { db, initDatabase } from './db.ts';
import {
  SEED_PATHS,
  SEED_MODULES,
  SEED_LESSONS,
  SEED_CHALLENGES,
  SEED_QUIZZES,
  SEED_FLASHCARDS,
  SEED_SPRINT_DAYS,
  SEED_PROJECTS
} from './seedData.ts';

export function runSeed() {
  console.log('[Seed] Initializing database schema...');
  initDatabase();

  console.log('[Seed] Seeding Paths...');
  const insertPath = db.prepare(`
    INSERT OR REPLACE INTO paths (id, title, description, order_index, icon, badge)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  for (const p of SEED_PATHS) {
    insertPath.run(p.id, p.title, p.description, p.order_index, p.icon, p.badge);
  }

  console.log('[Seed] Seeding Modules...');
  const insertMod = db.prepare(`
    INSERT OR REPLACE INTO modules (id, path_id, title, description, order_index, estimated_mins, is_core, course_reference)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const m of SEED_MODULES) {
    insertMod.run(m.id, m.path_id, m.title, m.description, m.order_index, m.estimated_mins, m.is_core, m.course_reference);
  }

  console.log('[Seed] Seeding Lessons...');
  const insertLesson = db.prepare(`
    INSERT OR REPLACE INTO lessons (id, module_id, title, order_index, estimated_mins, prerequisites, objectives, is_core, handbook_unit, content_json, summary, key_takeaways)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const l of SEED_LESSONS) {
    insertLesson.run(
      l.id,
      l.module_id,
      l.title,
      l.order_index,
      l.estimated_mins,
      l.prerequisites,
      l.objectives,
      l.is_core,
      l.handbook_unit,
      l.content_json,
      l.summary,
      l.key_takeaways
    );
  }

  console.log('[Seed] Seeding Challenges...');
  const insertChal = db.prepare(`
    INSERT OR REPLACE INTO challenges (id, title, category, difficulty, order_index, problem_statement, input_assumptions, expected_output, test_cases_json, constraints, hints_json, starter_code, reference_solution, solution_explanation, related_concepts_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const c of SEED_CHALLENGES) {
    insertChal.run(
      c.id,
      c.title,
      c.category,
      c.difficulty,
      c.order_index,
      c.problem_statement,
      c.input_assumptions,
      c.expected_output,
      c.test_cases_json,
      c.constraints,
      c.hints_json,
      c.starter_code,
      c.reference_solution,
      c.solution_explanation,
      c.related_concepts_json
    );
  }

  console.log('[Seed] Seeding Quizzes & Questions...');
  const insertQuiz = db.prepare(`
    INSERT OR REPLACE INTO quizzes (id, lesson_id, module_id, title, description, mode, passing_score)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const insertQuestion = db.prepare(`
    INSERT OR REPLACE INTO quiz_questions (id, quiz_id, question_type, question, options_json, correct_answer_json, explanation, difficulty, topic, code_snippet)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const q of SEED_QUIZZES) {
    insertQuiz.run(q.id, q.lesson_id, q.module_id, q.title, q.description, q.mode, q.passing_score);
    for (const qq of q.questions) {
      insertQuestion.run(
        qq.id,
        q.id,
        qq.question_type,
        qq.question,
        qq.options_json,
        qq.correct_answer_json,
        qq.explanation,
        qq.difficulty,
        qq.topic,
        (qq as any).code_snippet || null
      );
    }
  }

  console.log('[Seed] Seeding Flashcards...');
  const insertCard = db.prepare(`
    INSERT OR REPLACE INTO flashcards (id, category, front, back, code_snippet, explanation, mnemonic, difficulty)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const fc of SEED_FLASHCARDS) {
    insertCard.run(fc.id, fc.category, fc.front, fc.back, fc.code_snippet, fc.explanation, fc.mnemonic, fc.difficulty);
  }

  console.log('[Seed] Seeding 5-Day Sprint Days...');
  const insertSprint = db.prepare(`
    INSERT OR REPLACE INTO sprint_days (day_number, title, subtitle, focus_area, objectives_json, theory_md, code_examples_json, practice_tasks_json, quiz_questions_json, revision_points_json, completion_criteria_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const sp of SEED_SPRINT_DAYS) {
    insertSprint.run(
      sp.day_number,
      sp.title,
      sp.subtitle,
      sp.focus_area,
      sp.objectives_json,
      sp.theory_md,
      sp.code_examples_json,
      sp.practice_tasks_json,
      sp.quiz_questions_json,
      sp.revision_points_json,
      sp.completion_criteria_json
    );
  }

  console.log('[Seed] Seeding Projects...');
  const insertProject = db.prepare(`
    INSERT OR REPLACE INTO projects (id, title, level, order_index, description, objectives_json, prerequisites_json, functional_reqs_json, data_model, milestones_json, test_scenarios_json, checklist_json, concepts_learned_json, extensions_json, is_sandbox_compatible)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const pr of SEED_PROJECTS) {
    insertProject.run(
      pr.id,
      pr.title,
      pr.level,
      pr.order_index,
      pr.description,
      pr.objectives_json,
      pr.prerequisites_json,
      pr.functional_reqs_json,
      pr.data_model,
      pr.milestones_json,
      pr.test_scenarios_json,
      pr.checklist_json,
      pr.concepts_learned_json,
      pr.extensions_json,
      pr.is_sandbox_compatible
    );
  }

  console.log('[Seed] Seeding completed successfully!');
}

// Auto-run if executed directly
if (process.argv[1]?.endsWith('seed.ts') || process.argv[1]?.endsWith('seed.js')) {
  runSeed();
}
