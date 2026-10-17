import {
  SEED_PATHS,
  SEED_MODULES,
  SEED_LESSONS,
  SEED_CHALLENGES,
  SEED_QUIZZES,
  SEED_FLASHCARDS,
  SEED_SPRINT_DAYS,
  SEED_PROJECTS
} from './data/seedData';
import { AbapSimulator } from './data/abapRunner';
import { supabaseClient } from './supabaseClient';
import type {
  UserProfile,
  LeaderboardResponse,
  LearnerProfile,
  Path,
  LessonDetail,
  Quiz,
  QuizResult,
  Challenge,
  ExecutionResult,
  Flashcard,
  SprintDay,
  Project,
  PersonalNote,
  Bookmark,
  AnalyticsData
} from './types';

const simulator = new AbapSimulator();

// Flatten questions from SEED_QUIZZES
const ALL_SEED_QUESTIONS = SEED_QUIZZES.flatMap(q =>
  ((q as any).questions || []).map((qn: any) => ({
    ...qn,
    quiz_id: q.id,
    options: typeof qn.options_json === 'string' ? JSON.parse(qn.options_json) : (qn.options || []),
    correct_answer: typeof qn.correct_answer_json === 'string' ? JSON.parse(qn.correct_answer_json) : qn.correct_answer
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
      streak_days: 2,
      daily_goal_minutes: 45,
      target_completion_date: '2026-12-31',
      theme_preference: 'dark',
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

  // Users & Leaderboard
  getUsers(): { users: UserProfile[]; activeUser: UserProfile | null } {
    const defaultUsers: UserProfile[] = [
      { id: 'usr-me', username: 'abap_dev', display_name: 'Learner', role_title: 'ABAP Developer', avatar_color: 'indigo', xp: 450, streak_days: 2, is_active: true },
      { id: 'usr-rap-arch', username: 'rap_architect', display_name: 'Senior RAP Specialist', role_title: 'RAP Enterprise Architect', avatar_color: 'purple', xp: 3450, streak_days: 18, is_active: false },
      { id: 'usr-clean-abap', username: 'clean_coder', display_name: 'ABAP Craftsman', role_title: 'Clean ABAP Lead', avatar_color: 'emerald', xp: 2890, streak_days: 14, is_active: false },
      { id: 'usr-cds-wizard', username: 'core_data_fan', display_name: 'CDS Data Modeler', role_title: 'SAP S/4HANA Consultant', avatar_color: 'sky', xp: 2150, streak_days: 9, is_active: false },
      { id: 'usr-subrc-zero', username: 'subrc_zero', display_name: 'Bug Hunter', role_title: 'ABAP Quality Engineer', avatar_color: 'amber', xp: 1780, streak_days: 7, is_active: false },
      { id: 'usr-cloud-dev', username: 'btp_cloud_dev', display_name: 'Cloud Extender', role_title: 'BTP Developer', avatar_color: 'rose', xp: 1250, streak_days: 5, is_active: false }
    ];

    const users = getItem<UserProfile[]>('abap_users', defaultUsers);
    const activeUser = users.find(u => u.is_active) || users[0] || null;
    return { users, activeUser };
  },

  async createUser(data: { username: string; display_name: string; role_title: string; avatar_color: string }): Promise<{ success: boolean; user: UserProfile }> {
    const { users } = this.getUsers();
    const cleanUsername = data.username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    const cleanDisplay = data.display_name?.trim() || cleanUsername;
    const cleanRole = data.role_title || 'ABAP Developer';
    const cleanAvatar = data.avatar_color || 'indigo';

    // Deactivate previous active users
    users.forEach(u => (u.is_active = false));

    const existing = users.find(u => u.username === cleanUsername);
    let user: UserProfile;
    if (existing) {
      existing.display_name = cleanDisplay;
      existing.role_title = cleanRole;
      existing.avatar_color = cleanAvatar;
      existing.is_active = true;
      user = existing;
    } else {
      user = {
        id: `usr-${Date.now()}`,
        username: cleanUsername,
        display_name: cleanDisplay,
        role_title: cleanRole,
        avatar_color: cleanAvatar,
        xp: 100,
        streak_days: 1,
        is_active: true
      };
      users.push(user);
    }

    setItem('abap_users', users);
    this.updateProfile({ display_name: cleanDisplay, role_title: cleanRole });

    // Sync to Supabase Cloud
    supabaseClient.upsertUser({
      id: user.id,
      username: user.username,
      display_name: user.display_name,
      role_title: user.role_title,
      avatar_color: user.avatar_color,
      xp: user.xp,
      streak_days: user.streak_days,
      lessons_completed: 0,
      quizzes_passed: 0,
      challenges_solved: 0,
      mastery_score: 0
    }).catch(() => {});

    return { success: true, user };
  },

  switchUser(userId: string): { success: boolean; activeUser: UserProfile } {
    const { users } = this.getUsers();
    users.forEach(u => {
      u.is_active = u.id === userId;
    });
    setItem('abap_users', users);
    const active = users.find(u => u.id === userId) || users[0];
    if (active) {
      this.updateProfile({ display_name: active.display_name, role_title: active.role_title });
      this.syncActiveUser();
    }
    return { success: true, activeUser: active };
  },

  syncActiveUser() {
    try {
      const { activeUser } = this.getUsers();
      if (!activeUser) return;
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

    if (activeUser) {
      activeUser.xp = calculatedXP;
      activeUser.lessons_completed = completedLessons;
      activeUser.quizzes_passed = quizzesPassed;
      activeUser.challenges_solved = completedChallenges;
      activeUser.mastery_score = masteryScore;
    }

    // Always trigger background sync to Supabase for the active user
    this.syncActiveUser();

    // Query Supabase Cloud for global platform leaderboard
    let cloudUsers = await supabaseClient.getLeaderboard();
    let cloudSynced = false;
    let finalLeaderboard: any[] = [];

    if (cloudUsers && cloudUsers.length > 0) {
      cloudSynced = true;
      finalLeaderboard = cloudUsers;
    } else {
      finalLeaderboard = users.map(u => ({
        ...u,
        lessons_completed: u.is_active ? completedLessons : Math.max(3, Math.round(u.xp / 180)),
        quizzes_passed: u.is_active ? quizzesPassed : Math.max(2, Math.round(u.xp / 350)),
        challenges_solved: u.is_active ? completedChallenges : Math.max(1, Math.round(u.xp / 400)),
        mastery_score: u.is_active ? masteryScore : Math.min(95, Math.round(u.xp / 36))
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
      activeUser,
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

      const pathModules = modules.map(m => {
        const lessons = SEED_LESSONS.filter(l => l.module_id === m.id);
        totalLessons += lessons.length;
        const modCompleted = lessons.filter(l => progress[l.id]?.status === 'completed').length;
        completedLessons += modCompleted;

        return {
          ...m,
          total_lessons: lessons.length,
          completed_lessons: modCompleted,
          is_unlocked: true,
          is_completed: modCompleted > 0 && modCompleted === lessons.length,
          lessons: lessons.map(l => ({
            ...l,
            is_completed: progress[l.id]?.status === 'completed',
            is_in_progress: progress[l.id]?.status === 'in_progress',
            is_bookmarked: false
          }))
        };
      });

      return {
        ...path,
        total_modules: modules.length,
        total_lessons: totalLessons,
        completed_lessons: completedLessons,
        is_completed: totalLessons > 0 && completedLessons === totalLessons,
        modules: pathModules
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
      ...lesson,
      module_title: moduleItem?.title || '',
      path_id: pathItem?.id || '',
      path_title: pathItem?.title || '',
      is_completed: progress[id]?.status === 'completed',
      is_in_progress: progress[id]?.status === 'in_progress',
      is_bookmarked: bookmarks.includes(id),
      user_notes: notes[id] || '',
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
        ...q,
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
      ...quiz,
      questions
    };
  },

  submitQuiz(id: string, answers: Record<string, any>): QuizResult {
    const questions = ALL_SEED_QUESTIONS.filter(qn => qn.quiz_id === id);
    let score = 0;
    const detailedResults = questions.map(q => {
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
        userAnswer: userAns,
        correctAnswer: correctAns,
        isCorrect,
        explanation: q.explanation
      };
    });

    const total = questions.length || 1;
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= 70;

    const attempts = getItem<any[]>('abap_quiz_attempts', []);
    attempts.push({
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
      score,
      totalQuestions: total,
      percentage,
      passed,
      detailedResults
    };
  },

  // Challenges
  getChallenges(): Challenge[] {
    const prog = getItem<Record<string, any>>('abap_challenge_progress', {});
    return SEED_CHALLENGES.map(c => ({
      ...c,
      status: prog[c.id]?.status || 'not_started',
      user_code: prog[c.id]?.user_code || c.starter_code
    }));
  },

  getChallenge(id: string): Challenge {
    const challenge = SEED_CHALLENGES.find(c => c.id === id) || SEED_CHALLENGES[0];
    const prog = getItem<Record<string, any>>('abap_challenge_progress', {});
    return {
      ...challenge,
      status: prog[id]?.status || 'not_started',
      user_code: prog[id]?.user_code || challenge.starter_code
    };
  },

  runCode(id: string, code: string): ExecutionResult {
    const challenge = SEED_CHALLENGES.find(c => c.id === id);
    const testCases = challenge ? (challenge.test_cases as any[]) : [];
    return simulator.execute(code, testCases);
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

    const cards = SEED_FLASHCARDS.map(fc => {
      const state = cardState[fc.id] || {
        interval_days: 1,
        ease_factor: 2.5,
        due_date: new Date().toISOString(),
        reviews_count: 0
      };
      return {
        ...fc,
        interval_days: state.interval_days,
        ease_factor: state.ease_factor,
        due_date: state.due_date,
        reviews_count: state.reviews_count
      };
    });

    const dueCount = cards.filter(c => new Date(c.due_date) <= now).length;
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

  // 5-Day Sprint
  getSprintDays(): SprintDay[] {
    const saved = getItem<Record<number, string[]>>('abap_sprint_tasks', {});
    return SEED_SPRINT_DAYS.map(day => {
      const completed = saved[day.day_number] || [];
      const tasks = day.tasks ? (typeof day.tasks === 'string' ? JSON.parse(day.tasks) : day.tasks) : [];
      return {
        ...day,
        completed_tasks: completed,
        is_completed: tasks.length > 0 && completed.length === tasks.length
      };
    });
  },

  toggleSprintTask(day: number, taskId: string) {
    const saved = getItem<Record<number, string[]>>('abap_sprint_tasks', {});
    const list = saved[day] || [];
    const idx = list.indexOf(taskId);
    if (idx >= 0) {
      list.splice(idx, 1);
    } else {
      list.push(taskId);
    }
    saved[day] = list;
    setItem('abap_sprint_tasks', saved);

    const sprintDay = SEED_SPRINT_DAYS.find(d => d.day_number === day);
    const tasks = sprintDay?.tasks ? (typeof sprintDay.tasks === 'string' ? JSON.parse(sprintDay.tasks) : sprintDay.tasks) : [];
    const isCompleted = tasks.length > 0 && list.length === tasks.length;

    return { success: true, completedTasks: list, isCompleted };
  },

  // Projects
  getProjects(): Project[] {
    const checkedState = getItem<Record<string, string[]>>('abap_project_checks', {});
    return SEED_PROJECTS.map(p => {
      const checked = checkedState[p.id] || [];
      const checklist = p.checklist ? (typeof p.checklist === 'string' ? JSON.parse(p.checklist) : p.checklist) : [];
      const isCompleted = checklist.length > 0 && checked.length === checklist.length;
      return {
        ...p,
        checked_items: checked,
        status: isCompleted ? 'completed' : checked.length > 0 ? 'in_progress' : 'not_started'
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
    const checklist = project?.checklist ? (typeof project.checklist === 'string' ? JSON.parse(project.checklist) : project.checklist) : [];
    const isCompleted = checklist.length > 0 && list.length === checklist.length;

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
      lesson_id: data.lesson_id,
      lesson_title: data.lesson_title,
      note_title: data.note_title || 'Untitled Note',
      content: data.content || '',
      tags: data.tags || '',
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
          id: `bm-${id}`,
          lesson_id: id,
          title: lesson.title,
          module_title: mod?.title || '',
          path_title: path?.title || '',
          estimated_mins: lesson.estimated_mins,
          created_at: new Date().toISOString()
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
    const dueCards = cards.filter(c => new Date(c.due_date) <= new Date()).slice(0, 5);
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

    const lessonScore = Math.min(40, Math.round((completedLessons / totalLessons) * 40));
    const quizScore = Math.min(30, Math.round((avgAccuracy / 100) * 30));
    const challengeScore = Math.min(30, Math.round((completedChallenges / totalChallenges) * 30));
    const overallScore = lessonScore + quizScore + challengeScore;

    const paths = this.getPaths();
    const pathProgress = paths.map(p => ({
      path_id: p.id,
      title: p.title,
      total_lessons: p.total_lessons,
      completed_lessons: p.completed_lessons,
      percentage: p.total_lessons > 0 ? Math.round((p.completed_lessons / p.total_lessons) * 100) : 0
    }));

    return {
      mastery: {
        overall_score: overallScore,
        lesson_score: lessonScore,
        quiz_score: quizScore,
        challenge_score: challengeScore,
        formula: 'Mastery = (Completed Lessons / Total × 40%) + (Avg Quiz Accuracy × 30%) + (Completed Challenges / Total × 30%)'
      },
      stats: {
        totalLessons,
        completedLessons,
        totalQuizzes: SEED_QUIZZES.length,
        quizAttempts: quizAttempts.length,
        avgAccuracy,
        totalChallenges,
        completedChallenges,
        streakDays: this.getProfile().streak_days || 1,
        totalNotes: this.getNotes().length,
        totalBookmarks: this.getBookmarks().length
      },
      pathProgress,
      recentAttempts: quizAttempts.slice(-5).reverse()
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
