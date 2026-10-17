import type {
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

const API_BASE = '/api';

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    },
    ...options
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

export const api = {
  // Profile
  getProfile: () => fetchJson<LearnerProfile>('/profile'),
  updateProfile: (data: Partial<LearnerProfile>) =>
    fetchJson<LearnerProfile>('/profile', { method: 'PUT', body: JSON.stringify(data) }),

  // Paths & Roadmap
  getPaths: () => fetchJson<Path[]>('/paths'),

  // Lessons
  getLesson: (id: string) => fetchJson<LessonDetail>(`/lessons/${id}`),
  updateLessonProgress: (id: string, status: 'completed' | 'in_progress' | 'not_started', scroll_position?: number) =>
    fetchJson<{ success: boolean; status: string; completedAt: string | null }>(`/lessons/${id}/progress`, {
      method: 'POST',
      body: JSON.stringify({ status, scroll_position })
    }),
  toggleBookmark: (id: string) =>
    fetchJson<{ success: boolean; is_bookmarked: boolean }>(`/lessons/${id}/bookmark`, { method: 'POST' }),
  saveLessonNotes: (id: string, notes: string) =>
    fetchJson<{ success: boolean; notes: string }>(`/lessons/${id}/notes`, {
      method: 'POST',
      body: JSON.stringify({ notes })
    }),

  // Quizzes
  getQuizzes: () => fetchJson<Quiz[]>('/quizzes'),
  getQuiz: (id: string) => fetchJson<Quiz>(`/quizzes/${id}`),
  submitQuiz: (id: string, answers: Record<string, any>) =>
    fetchJson<QuizResult>(`/quizzes/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers })
    }),

  // Challenges & Code Sandbox
  getChallenges: () => fetchJson<Challenge[]>('/challenges'),
  getChallenge: (id: string) => fetchJson<Challenge>(`/challenges/${id}`),
  runCode: (id: string, code: string) =>
    fetchJson<ExecutionResult>(`/challenges/${id}/run`, {
      method: 'POST',
      body: JSON.stringify({ code })
    }),
  submitChallenge: (id: string, code: string) =>
    fetchJson<ExecutionResult>(`/challenges/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify({ code })
    }),

  // Flashcards
  getFlashcards: () => fetchJson<{ cards: Flashcard[]; totalCount: number; dueCount: number }>('/flashcards'),
  reviewCard: (id: string, rating: 'again' | 'hard' | 'good' | 'easy') =>
    fetchJson<{ success: boolean; intervalDays: number; dueDate: string }>(`/flashcards/${id}/review`, {
      method: 'POST',
      body: JSON.stringify({ rating })
    }),

  // 5-Day Sprint
  getSprintDays: () => fetchJson<SprintDay[]>('/sprint'),
  toggleSprintTask: (day: number, taskId: string) =>
    fetchJson<{ success: boolean; completedTasks: string[]; isCompleted: boolean }>(`/sprint/${day}/toggle-task`, {
      method: 'POST',
      body: JSON.stringify({ taskId })
    }),

  // Projects
  getProjects: () => fetchJson<Project[]>('/projects'),
  toggleProjectChecklist: (id: string, itemId: string) =>
    fetchJson<{ success: boolean; checked: string[]; status: string }>(`/projects/${id}/check`, {
      method: 'POST',
      body: JSON.stringify({ itemId })
    }),

  // Notes & Bookmarks
  getNotes: () => fetchJson<PersonalNote[]>('/notes'),
  createNote: (data: Partial<PersonalNote>) =>
    fetchJson<PersonalNote>('/notes', { method: 'POST', body: JSON.stringify(data) }),
  updateNote: (id: string, data: Partial<PersonalNote>) =>
    fetchJson<PersonalNote>(`/notes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteNote: (id: string) =>
    fetchJson<{ success: boolean }>(`/notes/${id}`, { method: 'DELETE' }),
  getBookmarks: () => fetchJson<Bookmark[]>('/bookmarks'),

  // Planner
  getPlanner: () =>
    fetchJson<{
      profile: LearnerProfile;
      checklist: {
        lessons: { id: string; title: string; estimated_mins: number; module_title: string }[];
        dueCards: { id: string; front: string; category: string }[];
        challenges: { id: string; title: string; difficulty: string; category: string }[];
      };
    }>('/planner'),

  // Analytics
  getAnalytics: () => fetchJson<AnalyticsData>('/analytics'),

  // Global Search
  search: (q: string) =>
    fetchJson<{
      lessons: { id: string; title: string; summary: string; module_title: string }[];
      challenges: { id: string; title: string; category: string; difficulty: string; problem_statement: string }[];
      questions: { id: string; question: string; topic: string; difficulty: string; quiz_title: string }[];
      projects: { id: string; title: string; level: string; description: string }[];
    }>(`/search?q=${encodeURIComponent(q)}`),

  // Backup
  exportDataUrl: () => `${API_BASE}/backup/export`
};
