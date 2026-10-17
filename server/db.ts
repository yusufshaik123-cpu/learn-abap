import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'abap_mastery.db');

export const db = new DatabaseSync(DB_PATH);

// Enable WAL mode and foreign keys for high performance and integrity
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS learner_profile (
      id TEXT PRIMARY KEY,
      display_name TEXT DEFAULT 'Learner',
      role_title TEXT DEFAULT 'ABAP Developer',
      target_date TEXT,
      daily_budget_mins INTEGER DEFAULT 45,
      streak_days INTEGER DEFAULT 0,
      last_active_date TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS paths (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      order_index INTEGER NOT NULL,
      icon TEXT,
      badge TEXT
    );

    CREATE TABLE IF NOT EXISTS modules (
      id TEXT PRIMARY KEY,
      path_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      order_index INTEGER NOT NULL,
      estimated_mins INTEGER DEFAULT 60,
      is_core BOOLEAN DEFAULT 1,
      course_reference TEXT,
      FOREIGN KEY (path_id) REFERENCES paths(id)
    );

    CREATE TABLE IF NOT EXISTS lessons (
      id TEXT PRIMARY KEY,
      module_id TEXT NOT NULL,
      title TEXT NOT NULL,
      order_index INTEGER NOT NULL,
      estimated_mins INTEGER DEFAULT 25,
      prerequisites TEXT,
      objectives TEXT,
      is_core BOOLEAN DEFAULT 1,
      handbook_unit TEXT,
      content_json TEXT NOT NULL,
      summary TEXT,
      key_takeaways TEXT,
      FOREIGN KEY (module_id) REFERENCES modules(id)
    );

    CREATE TABLE IF NOT EXISTS user_lesson_progress (
      lesson_id TEXT PRIMARY KEY,
      status TEXT DEFAULT 'not_started',
      completed_at TEXT,
      last_visited_at TEXT,
      scroll_position REAL DEFAULT 0,
      notes TEXT,
      is_bookmarked BOOLEAN DEFAULT 0,
      FOREIGN KEY (lesson_id) REFERENCES lessons(id)
    );

    CREATE TABLE IF NOT EXISTS quizzes (
      id TEXT PRIMARY KEY,
      lesson_id TEXT,
      module_id TEXT,
      title TEXT NOT NULL,
      description TEXT,
      mode TEXT DEFAULT 'practice',
      passing_score INTEGER DEFAULT 70
    );

    CREATE TABLE IF NOT EXISTS quiz_questions (
      id TEXT PRIMARY KEY,
      quiz_id TEXT NOT NULL,
      question_type TEXT NOT NULL,
      question TEXT NOT NULL,
      options_json TEXT NOT NULL,
      correct_answer_json TEXT NOT NULL,
      explanation TEXT NOT NULL,
      difficulty TEXT DEFAULT 'medium',
      topic TEXT NOT NULL,
      code_snippet TEXT,
      FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
    );

    CREATE TABLE IF NOT EXISTS quiz_attempts (
      id TEXT PRIMARY KEY,
      quiz_id TEXT NOT NULL,
      score REAL NOT NULL,
      max_score REAL NOT NULL,
      percentage REAL NOT NULL,
      passed BOOLEAN NOT NULL,
      answers_json TEXT NOT NULL,
      completed_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
    );

    CREATE TABLE IF NOT EXISTS challenges (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      difficulty TEXT DEFAULT 'easy',
      order_index INTEGER DEFAULT 1,
      problem_statement TEXT NOT NULL,
      input_assumptions TEXT,
      expected_output TEXT,
      test_cases_json TEXT NOT NULL,
      constraints TEXT,
      hints_json TEXT,
      starter_code TEXT NOT NULL,
      reference_solution TEXT NOT NULL,
      solution_explanation TEXT NOT NULL,
      related_concepts_json TEXT
    );

    CREATE TABLE IF NOT EXISTS user_challenge_progress (
      challenge_id TEXT PRIMARY KEY,
      user_code TEXT,
      status TEXT DEFAULT 'not_started',
      passed_tests INTEGER DEFAULT 0,
      total_tests INTEGER DEFAULT 0,
      completed_at TEXT,
      last_attempt_at TEXT,
      FOREIGN KEY (challenge_id) REFERENCES challenges(id)
    );

    CREATE TABLE IF NOT EXISTS flashcards (
      id TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      front TEXT NOT NULL,
      back TEXT NOT NULL,
      code_snippet TEXT,
      explanation TEXT,
      mnemonic TEXT,
      difficulty TEXT DEFAULT 'medium'
    );

    CREATE TABLE IF NOT EXISTS user_card_progress (
      card_id TEXT PRIMARY KEY,
      repetitions INTEGER DEFAULT 0,
      interval_days REAL DEFAULT 1.0,
      ease_factor REAL DEFAULT 2.5,
      due_date TEXT DEFAULT (datetime('now')),
      last_reviewed_at TEXT,
      last_rating TEXT,
      FOREIGN KEY (card_id) REFERENCES flashcards(id)
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      level TEXT NOT NULL,
      order_index INTEGER DEFAULT 1,
      description TEXT NOT NULL,
      objectives_json TEXT NOT NULL,
      prerequisites_json TEXT NOT NULL,
      functional_reqs_json TEXT NOT NULL,
      data_model TEXT NOT NULL,
      milestones_json TEXT NOT NULL,
      test_scenarios_json TEXT NOT NULL,
      checklist_json TEXT NOT NULL,
      concepts_learned_json TEXT NOT NULL,
      extensions_json TEXT,
      is_sandbox_compatible BOOLEAN DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS user_project_progress (
      project_id TEXT PRIMARY KEY,
      checked_items_json TEXT DEFAULT '[]',
      status TEXT DEFAULT 'not_started',
      completed_at TEXT,
      last_updated_at TEXT,
      FOREIGN KEY (project_id) REFERENCES projects(id)
    );

    CREATE TABLE IF NOT EXISTS daily_planner (
      id TEXT PRIMARY KEY,
      date TEXT UNIQUE NOT NULL,
      daily_budget_mins INTEGER DEFAULT 45,
      priority_paths_json TEXT DEFAULT '[]',
      completed_mins INTEGER DEFAULT 0,
      notes TEXT
    );

    CREATE TABLE IF NOT EXISTS study_sessions (
      id TEXT PRIMARY KEY,
      activity_type TEXT NOT NULL,
      reference_id TEXT,
      duration_mins INTEGER NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      summary TEXT
    );

    CREATE TABLE IF NOT EXISTS personal_notes (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      tag TEXT DEFAULT 'General',
      reference_type TEXT,
      reference_id TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT,
      display_name TEXT NOT NULL,
      role_title TEXT DEFAULT 'ABAP Developer',
      avatar_color TEXT DEFAULT 'indigo',
      xp INTEGER DEFAULT 100,
      streak_days INTEGER DEFAULT 1,
      is_active BOOLEAN DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Ensure password_hash column exists on legacy users table
  try {
    db.prepare('ALTER TABLE users ADD COLUMN password_hash TEXT').run();
  } catch {}

  // Purge any legacy mock users and sprint tables
  try {
    db.prepare("DELETE FROM users WHERE username IN ('rap_architect', 'clean_coder', 'core_data_fan', 'subrc_zero', 'btp_cloud_dev', 'abap_dev')").run();
    db.prepare("DROP TABLE IF EXISTS sprint_days").run();
    db.prepare("DROP TABLE IF EXISTS user_sprint_progress").run();
  } catch {}

  // Ensure default profile exists
  const existingProfile = db.prepare('SELECT id FROM learner_profile LIMIT 1').get();
  if (!existingProfile) {
    db.prepare(`
      INSERT INTO learner_profile (id, display_name, role_title, target_date, daily_budget_mins, streak_days)
      VALUES ('default', 'Learner', 'ABAP Developer', date('now', '+30 days'), 45, 1)
    `).run();
  }
}

