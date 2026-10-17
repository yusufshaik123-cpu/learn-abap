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
import { offlineService } from './offlineService';

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
  // Users & Leaderboard
  getUsers: async (): Promise<{ users: UserProfile[]; activeUser: UserProfile | null }> => {
    try {
      return await fetchJson<{ users: UserProfile[]; activeUser: UserProfile | null }>('/users');
    } catch {
      return offlineService.getUsers();
    }
  },

  createUser: async (data: { username: string; display_name: string; role_title: string; avatar_color: string }): Promise<{ success: boolean; user: UserProfile }> => {
    try {
      return await fetchJson<{ success: boolean; user: UserProfile }>('/users', { method: 'POST', body: JSON.stringify(data) });
    } catch {
      return offlineService.createUser(data);
    }
  },

  switchUser: async (userId: string): Promise<{ success: boolean; activeUser: UserProfile }> => {
    try {
      return await fetchJson<{ success: boolean; activeUser: UserProfile }>('/users/switch', { method: 'POST', body: JSON.stringify({ userId }) });
    } catch {
      return offlineService.switchUser(userId);
    }
  },

  getLeaderboard: async (): Promise<LeaderboardResponse> => {
    try {
      return await fetchJson<LeaderboardResponse>('/leaderboard');
    } catch {
      return offlineService.getLeaderboard();
    }
  },

  // Profile
  getProfile: async (): Promise<LearnerProfile> => {
    try {
      return await fetchJson<LearnerProfile>('/profile');
    } catch {
      return offlineService.getProfile();
    }
  },

  updateProfile: async (data: Partial<LearnerProfile>): Promise<LearnerProfile> => {
    try {
      return await fetchJson<LearnerProfile>('/profile', { method: 'PUT', body: JSON.stringify(data) });
    } catch {
      return offlineService.updateProfile(data);
    }
  },

  // Paths & Roadmap
  getPaths: async (): Promise<Path[]> => {
    try {
      return await fetchJson<Path[]>('/paths');
    } catch {
      return offlineService.getPaths();
    }
  },

  // Lessons
  getLesson: async (id: string): Promise<LessonDetail> => {
    try {
      return await fetchJson<LessonDetail>(`/lessons/${id}`);
    } catch {
      return offlineService.getLesson(id);
    }
  },

  updateLessonProgress: async (id: string, status: 'completed' | 'in_progress' | 'not_started', scroll_position?: number) => {
    try {
      return await fetchJson<{ success: boolean; status: string; completedAt: string | null }>(`/lessons/${id}/progress`, {
        method: 'POST',
        body: JSON.stringify({ status, scroll_position })
      });
    } catch {
      return offlineService.updateLessonProgress(id, status, scroll_position);
    }
  },

  toggleBookmark: async (id: string) => {
    try {
      return await fetchJson<{ success: boolean; is_bookmarked: boolean }>(`/lessons/${id}/bookmark`, { method: 'POST' });
    } catch {
      return offlineService.toggleBookmark(id);
    }
  },

  saveLessonNotes: async (id: string, notes: string) => {
    try {
      return await fetchJson<{ success: boolean; notes: string }>(`/lessons/${id}/notes`, {
        method: 'POST',
        body: JSON.stringify({ notes })
      });
    } catch {
      return offlineService.saveLessonNotes(id, notes);
    }
  },

  // Quizzes
  getQuizzes: async (): Promise<Quiz[]> => {
    try {
      return await fetchJson<Quiz[]>('/quizzes');
    } catch {
      return offlineService.getQuizzes();
    }
  },

  getQuiz: async (id: string): Promise<Quiz> => {
    try {
      return await fetchJson<Quiz>(`/quizzes/${id}`);
    } catch {
      return offlineService.getQuiz(id);
    }
  },

  submitQuiz: async (id: string, answers: Record<string, any>): Promise<QuizResult> => {
    try {
      return await fetchJson<QuizResult>(`/quizzes/${id}/submit`, {
        method: 'POST',
        body: JSON.stringify({ answers })
      });
    } catch {
      return offlineService.submitQuiz(id, answers);
    }
  },

  // Challenges & Code Sandbox
  getChallenges: async (): Promise<Challenge[]> => {
    try {
      return await fetchJson<Challenge[]>('/challenges');
    } catch {
      return offlineService.getChallenges();
    }
  },

  getChallenge: async (id: string): Promise<Challenge> => {
    try {
      return await fetchJson<Challenge>(`/challenges/${id}`);
    } catch {
      return offlineService.getChallenge(id);
    }
  },

  runCode: async (id: string, code: string): Promise<ExecutionResult> => {
    try {
      return await fetchJson<ExecutionResult>(`/challenges/${id}/run`, {
        method: 'POST',
        body: JSON.stringify({ code })
      });
    } catch {
      return offlineService.runCode(id, code);
    }
  },

  submitChallenge: async (id: string, code: string): Promise<ExecutionResult> => {
    try {
      return await fetchJson<ExecutionResult>(`/challenges/${id}/submit`, {
        method: 'POST',
        body: JSON.stringify({ code })
      });
    } catch {
      return offlineService.submitChallenge(id, code);
    }
  },

  // Flashcards
  getFlashcards: async (): Promise<{ cards: Flashcard[]; totalCount: number; dueCount: number }> => {
    try {
      return await fetchJson<{ cards: Flashcard[]; totalCount: number; dueCount: number }>('/flashcards');
    } catch {
      return offlineService.getFlashcards();
    }
  },

  reviewCard: async (id: string, rating: 'again' | 'hard' | 'good' | 'easy') => {
    try {
      return await fetchJson<{ success: boolean; intervalDays: number; dueDate: string }>(`/flashcards/${id}/review`, {
        method: 'POST',
        body: JSON.stringify({ rating })
      });
    } catch {
      return offlineService.reviewCard(id, rating);
    }
  },

  // 5-Day Sprint
  getSprintDays: async (): Promise<SprintDay[]> => {
    try {
      return await fetchJson<SprintDay[]>('/sprint');
    } catch {
      return offlineService.getSprintDays();
    }
  },

  toggleSprintTask: async (day: number, taskId: string) => {
    try {
      return await fetchJson<{ success: boolean; completedTasks: string[]; isCompleted: boolean }>(`/sprint/${day}/toggle-task`, {
        method: 'POST',
        body: JSON.stringify({ taskId })
      });
    } catch {
      return offlineService.toggleSprintTask(day, taskId);
    }
  },

  // Projects
  getProjects: async (): Promise<Project[]> => {
    try {
      return await fetchJson<Project[]>('/projects');
    } catch {
      return offlineService.getProjects();
    }
  },

  toggleProjectChecklist: async (id: string, itemId: string) => {
    try {
      return await fetchJson<{ success: boolean; checked: string[]; status: string }>(`/projects/${id}/check`, {
        method: 'POST',
        body: JSON.stringify({ itemId })
      });
    } catch {
      return offlineService.toggleProjectChecklist(id, itemId);
    }
  },

  // Notes & Bookmarks
  getNotes: async (): Promise<PersonalNote[]> => {
    try {
      return await fetchJson<PersonalNote[]>('/notes');
    } catch {
      return offlineService.getNotes();
    }
  },

  createNote: async (data: Partial<PersonalNote>): Promise<PersonalNote> => {
    try {
      return await fetchJson<PersonalNote>('/notes', { method: 'POST', body: JSON.stringify(data) });
    } catch {
      return offlineService.createNote(data);
    }
  },

  updateNote: async (id: string, data: Partial<PersonalNote>): Promise<PersonalNote> => {
    try {
      return await fetchJson<PersonalNote>(`/notes/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    } catch {
      return offlineService.updateNote(id, data);
    }
  },

  deleteNote: async (id: string): Promise<{ success: boolean }> => {
    try {
      return await fetchJson<{ success: boolean }>(`/notes/${id}`, { method: 'DELETE' });
    } catch {
      return offlineService.deleteNote(id);
    }
  },

  getBookmarks: async (): Promise<Bookmark[]> => {
    try {
      return await fetchJson<Bookmark[]>('/bookmarks');
    } catch {
      return offlineService.getBookmarks();
    }
  },

  // Planner
  getPlanner: async (): Promise<{
    profile: LearnerProfile;
    checklist: {
      lessons: { id: string; title: string; estimated_mins: number; module_title: string }[];
      dueCards: { id: string; front: string; category: string }[];
      challenges: { id: string; title: string; difficulty: string; category: string }[];
    };
  }> => {
    try {
      return await fetchJson<any>('/planner');
    } catch {
      return offlineService.getPlanner();
    }
  },

  // Analytics
  getAnalytics: async (): Promise<AnalyticsData> => {
    try {
      return await fetchJson<AnalyticsData>('/analytics');
    } catch {
      return offlineService.getAnalytics();
    }
  },

  // Global Search
  search: async (q: string): Promise<{
    lessons: { id: string; title: string; summary: string; module_title: string }[];
    challenges: { id: string; title: string; category: string; difficulty: string; problem_statement: string }[];
    questions: { id: string; question: string; topic: string; difficulty: string; quiz_title: string }[];
    projects: { id: string; title: string; level: string; description: string }[];
  }> => {
    try {
      return await fetchJson<any>(`/search?q=${encodeURIComponent(q)}`);
    } catch {
      return offlineService.search(q);
    }
  },

  // Backup
  exportDataUrl: () => `${API_BASE}/backup/export`
};
