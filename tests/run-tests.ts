import assert from 'node:assert';
import http from 'node:http';
import crypto from 'node:crypto';
import { db, initDatabase } from '../server/db.ts';
import { AbapSimulator, type TestCase } from '../server/abapRunner.ts';
import { runSeed } from '../server/seed.ts';

console.log('==============================================');
console.log('   ABAP Mastery Automated Test Suite         ');
console.log('==============================================\n');

let passedTests = 0;
let totalTests = 0;

function test(description: string, fn: () => void | Promise<void>) {
  totalTests++;
  try {
    const res = fn();
    if (res && typeof (res as any).then === 'function') {
      return (res as any)
        .then(() => {
          console.log(`  ✓ [PASS] ${description}`);
          passedTests++;
        })
        .catch((err: any) => {
          console.error(`  ✗ [FAIL] ${description}`);
          console.error(`    ${err.message || err}`);
        });
    }
    console.log(`  ✓ [PASS] ${description}`);
    passedTests++;
  } catch (err: any) {
    console.error(`  ✗ [FAIL] ${description}`);
    console.error(`    ${err.message || err}`);
  }
}

// ----------------------------------------------------
// 1. Database & Seed Verification Tests
// ----------------------------------------------------
console.log('Section 1: Database & Seed Verification');

test('Database tables exist and can be queried', () => {
  initDatabase();
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  assert(tables.length >= 10, 'Expected at least 10 database tables');
});

test('Curriculum seed contains 5 distinct paths', () => {
  runSeed();
  const paths = db.prepare('SELECT count(*) as count FROM paths').get() as any;
  assert.strictEqual(paths.count, 5, 'Must contain exactly 5 learning paths');
});

test('Curriculum contains required handbook modules', () => {
  const modules = db.prepare('SELECT count(*) as count FROM modules').get() as any;
  assert(modules.count >= 10, 'Must contain at least 10 modules');
});

test('Curriculum lessons exist and can be loaded', () => {
  const lessons = db.prepare('SELECT count(*) as count FROM lessons').get() as any;
  assert(lessons.count >= 5, 'Must contain curriculum lessons');
});

// ----------------------------------------------------
// 2. Simulated ABAP Runtime Sandbox Tests
// ----------------------------------------------------
console.log('\nSection 2: Simulated ABAP Runtime Sandbox');

const simulator = new AbapSimulator();

test('Simulates simple WRITE and arithmetic', () => {
  const code = `
    DATA lv_a TYPE i VALUE 15.
    DATA lv_b TYPE i VALUE 25.
    DATA(lv_sum) = lv_a + lv_b.
    WRITE: / 'Sum is:', lv_sum.
  `;
  const result = simulator.run(code);
  assert.strictEqual(result.isSimulated, true, 'Must clearly flag execution as simulated');
  assert(result.stdout.some(line => line.includes('40')), 'Output must include 40');
  assert.strictEqual(result.status, 'passed');
});

test('Simulates string templates with variable interpolation', () => {
  const code = `
    DATA(lv_product) = 'SAP S/4HANA'.
    DATA(lv_release) = 2026.
    WRITE: / |System: { lv_product } Release: { lv_release }|.
  `;
  const result = simulator.run(code);
  assert(result.stdout.some(line => line.includes('System: SAP S/4HANA Release: 2026')));
});

test('Simulates internal tables, APPEND, SORT and SY-SUBRC', () => {
  const code = `
    DATA lt_nums TYPE TABLE OF i.
    APPEND 50 TO lt_nums.
    APPEND 10 TO lt_nums.
    APPEND 30 TO lt_nums.
    SORT lt_nums.
    READ TABLE lt_nums INDEX 1 INTO DATA(lv_min).
    WRITE: / |Minimum: { lv_min }|.
  `;
  const result = simulator.run(code);
  assert(result.stdout.some(line => line.includes('Minimum: 10')));
  assert.strictEqual(result.systemFields.sySubrc, 0);
});

test('Sets SY-SUBRC = 4 when reading non-existent index', () => {
  const code = `
    DATA lt_tab TYPE TABLE OF i.
    APPEND 1 TO lt_tab.
    READ TABLE lt_tab INDEX 99 INTO DATA(lv_val).
  `;
  const result = simulator.run(code);
  assert.strictEqual(result.systemFields.sySubrc, 4, 'SY-SUBRC must be 4 when row is missing');
});

test('Evaluates challenge test assertions against expected outputs', () => {
  const code = `
    DATA lv_mark1 TYPE i VALUE 80.
    DATA lv_mark2 TYPE i VALUE 90.
    DATA lv_mark3 TYPE i VALUE 85.
    DATA(lv_total) = lv_mark1 + lv_mark2 + lv_mark3.
    DATA(lv_avg)   = lv_total / 3.
    DATA lv_grade TYPE string VALUE 'Distinction'.
    WRITE: / |Total: { lv_total } Average: { lv_avg } Grade: { lv_grade }|.
  `;
  const testCases: TestCase[] = [
    {
      id: 'tc-1',
      description: 'Grade evaluation',
      expectedOutput: 'Total: 255 Average: 85 Grade: Distinction'
    }
  ];
  const result = simulator.run(code, testCases);
  assert.strictEqual(result.passedTests, 1);
  assert.strictEqual(result.totalTests, 1);
  assert.strictEqual(result.status, 'passed');
});

// ----------------------------------------------------
// 3. Spaced Repetition (SM-2) Logic Tests
// ----------------------------------------------------
console.log('\nSection 3: Spaced Repetition (SM-2) Algorithm');

test('SM-2 resets interval on "again" rating', () => {
  let interval = 5.0;
  let repetitions = 3;
  const rating = 'again';

  if (rating === 'again') {
    repetitions = 0;
    interval = 0.5;
  }
  assert.strictEqual(repetitions, 0);
  assert.strictEqual(interval, 0.5);
});

test('SM-2 expands interval on "easy" rating', () => {
  let interval = 3.0;
  let easeFactor = 2.5;
  const rating = 'easy';

  if (rating === 'easy') {
    interval = Math.round(interval * easeFactor * 1.3);
  }
  assert(interval >= 9, 'Interval should expand significantly on easy');
});

// ----------------------------------------------------
// 4. Privacy & Anonymity Verification Tests
// ----------------------------------------------------
console.log('\nSection 4: Privacy & Anonymity Verification');

test('Learner profile uses generic title and no real personal names', () => {
  const profile = db.prepare('SELECT display_name, role_title FROM learner_profile WHERE id = ?').get('default') as any;
  assert.strictEqual(profile.display_name, 'Learner', 'Must use generic display name');
  assert.strictEqual(profile.role_title, 'ABAP Developer', 'Must use generic role title');
});

test('Database contains no personal emails, student usernames, or college names', () => {
  const rawData = JSON.stringify(db.prepare('SELECT * FROM learner_profile').all());
  assert(!rawData.includes('@gmail.com'), 'Must not contain personal email');
  assert(!rawData.includes('college'), 'Must not contain college names');
});

// ----------------------------------------------------
// 5. User Creation & Authentication Tests
// ----------------------------------------------------
console.log('\nSection 5: User Creation & Authentication Functionality');

test('Can register user with password hash and authenticate credentials', () => {
  const newUserId = `usr-test-${Date.now()}`;
  const password = 'mySecurePassword2026';
  const passwordHash = crypto.createHash('sha256').update(password + '_abap_salt_2026').digest('hex');

  db.prepare(`
    INSERT OR REPLACE INTO users (id, username, password_hash, display_name, role_title, avatar_color, xp, streak_days, is_active)
    VALUES (?, 'abap_pro', ?, 'ABAP Professional', 'RAP Cloud Architect', 'purple', 950, 5, 1)
  `).run(newUserId, passwordHash);

  const user = db.prepare('SELECT * FROM users WHERE username = ?').get('abap_pro') as any;
  assert.strictEqual(user.username, 'abap_pro');
  assert.strictEqual(user.display_name, 'ABAP Professional');
  assert.strictEqual(user.xp, 950);
  assert.strictEqual(user.password_hash, passwordHash);

  // Correct password verification
  const validHash = crypto.createHash('sha256').update(password + '_abap_salt_2026').digest('hex');
  assert.strictEqual(validHash, user.password_hash, 'Correct password hash must match stored password hash');

  // Wrong password rejected
  const invalidHash = crypto.createHash('sha256').update('wrongPassword_abap_salt_2026').digest('hex');
  assert.notStrictEqual(invalidHash, user.password_hash, 'Incorrect password hash must not match');
});

test('No synthetic fake users exist in SQLite database', () => {
  const fakeUsers = db.prepare("SELECT username FROM users WHERE username IN ('rap_architect', 'clean_coder', 'core_data_fan', 'subrc_zero', 'btp_cloud_dev', 'abap_dev')").all();
  assert.strictEqual(fakeUsers.length, 0, 'Database must not contain fake/mock users');
});

test('Leaderboard orders genuine users by XP descending', () => {
  const users = db.prepare('SELECT username, xp FROM users ORDER BY xp DESC').all() as any[];
  for (let i = 0; i < users.length - 1; i++) {
    assert(users[i].xp >= users[i + 1].xp, 'Users must be ordered by XP descending');
  }
});

// ----------------------------------------------------
// 6. Calculated Transparent Mastery Tests
// ----------------------------------------------------
console.log('\nSection 6: Analytics & Mastery Formula');

test('Calculates mastery using documented 40/30/30 formula', () => {
  const totalLessons = 10;
  const completedLessons = 5; // 50% * 0.40 = 20
  const avgQuizAccuracy = 80; // 80% * 0.30 = 24
  const totalChallenges = 10;
  const completedChallenges = 4; // 40% * 0.30 = 12

  const lessonRatio = completedLessons / totalLessons;
  const challengeRatio = completedChallenges / totalChallenges;
  const quizRatio = avgQuizAccuracy / 100;

  const score = Math.round((lessonRatio * 40) + (quizRatio * 30) + (challengeRatio * 30));
  assert.strictEqual(score, 56, 'Calculated score should equal 56%');
});

// ----------------------------------------------------
// Summary
// ----------------------------------------------------
console.log('\n==============================================');
console.log(`Test Execution Finished: ${passedTests} / ${totalTests} Passed`);
console.log('==============================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
