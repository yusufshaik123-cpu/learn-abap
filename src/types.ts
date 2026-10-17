export interface UserProfile {
  id: string;
  username: string;
  display_name: string;
  role_title: string;
  avatar_color: string;
  xp: number;
  streak_days: number;
  is_active?: boolean;
  lessons_completed?: number;
  quizzes_passed?: number;
  challenges_solved?: number;
  mastery_score?: number;
  rank?: number;
  isCurrentUser?: boolean;
}

export interface LeaderboardResponse {
  leaderboard: UserProfile[];
  activeUser: UserProfile | null;
  cloudSynced: boolean;
  totalUsers: number;
}

export interface LearnerProfile {
  id: string;
  display_name: string;
  role_title: string;
  target_date: string;
  daily_budget_mins: number;
  streak_days: number;
  created_at: string;
  updated_at: string;
}

export interface Path {
  id: string;
  title: string;
  description: string;
  order_index: number;
  icon: string;
  badge: string;
  modules: Module[];
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
}

export interface Module {
  id: string;
  path_id: string;
  title: string;
  description: string;
  order_index: number;
  estimated_mins: number;
  is_core: boolean;
  course_reference: string;
  lessons: LessonSummary[];
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
}

export interface LessonSummary {
  id: string;
  module_id: string;
  title: string;
  order_index: number;
  estimated_mins: number;
  is_core: boolean;
  user_status: 'not_started' | 'in_progress' | 'completed';
  completed_at?: string;
  is_bookmarked?: boolean;
}

export interface LessonContent {
  sections: {
    title: string;
    content: string;
    callout?: {
      type: 'info' | 'warning' | 'tip';
      text: string;
    };
    codeSnippet?: {
      language: string;
      title: string;
      code: string;
      expectedOutput?: string;
    };
    mistakes?: {
      mistake: string;
      correction: string;
    }[];
  }[];
  knowledgeCheck?: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  };
}

export interface LessonDetail extends LessonSummary {
  module_title: string;
  path_id: string;
  path_title: string;
  prerequisites: string;
  objectives: string;
  handbook_unit: string;
  summary: string;
  key_takeaways: string;
  content: LessonContent;
  personal_notes?: string;
  scroll_position?: number;
  prevLesson?: { id: string; title: string } | null;
  nextLesson?: { id: string; title: string } | null;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_type: 'multiple_choice' | 'multiple_select' | 'true_false' | 'output_prediction' | 'find_error' | 'code_completion' | 'scenario_based';
  question: string;
  options: string[];
  correct_answer: any;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  code_snippet?: string;
}

export interface Quiz {
  id: string;
  lesson_id?: string;
  module_id?: string;
  title: string;
  description: string;
  mode: 'practice' | 'assessment';
  passing_score: number;
  question_count?: number;
  best_score?: number;
  attempt_count?: number;
  questions?: QuizQuestion[];
}

export interface QuizAttemptReview {
  questionId: string;
  question: string;
  questionType: string;
  options: string[];
  userAnswer: any;
  correctAnswer: any;
  isCorrect: boolean;
  explanation: string;
  topic: string;
}

export interface QuizResult {
  attemptId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  review: QuizAttemptReview[];
}

export interface ChallengeTestCase {
  id: string;
  description: string;
  input?: string;
  expectedOutput: string;
}

export interface Challenge {
  id: string;
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  order_index: number;
  problem_statement: string;
  input_assumptions: string;
  expected_output: string;
  test_cases: ChallengeTestCase[];
  constraints: string;
  hints: string[];
  starter_code: string;
  reference_solution: string;
  solution_explanation: string;
  related_concepts: string[];
  user_status: 'not_started' | 'in_progress' | 'completed';
  passed_tests?: number;
  total_tests?: number;
  user_code?: string;
  completed_at?: string;
}

export interface TestResult {
  testId: string;
  description: string;
  passed: boolean;
  actualOutput: string;
  expectedOutput: string;
  message?: string;
}

export interface ExecutionResult {
  isSimulated: boolean;
  environmentNotice: string;
  status: 'passed' | 'failed' | 'error';
  executionTimeMs: number;
  stdout: string[];
  systemFields: {
    sySubrc: number;
    syTabix: number;
    syIndex: number;
    syUname: string;
    syDatum: string;
  };
  passedTests: number;
  totalTests: number;
  testResults: TestResult[];
  diagnostics: string[];
  recordedStatus?: string;
}

export interface Flashcard {
  id: string;
  category: string;
  front: string;
  back: string;
  code_snippet?: string;
  explanation?: string;
  mnemonic?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  repetitions?: number;
  interval_days?: number;
  ease_factor?: number;
  due_date?: string;
  last_rating?: string;
}

export interface SprintDay {
  day_number: number;
  title: string;
  subtitle: string;
  focus_area: string;
  objectives: string[];
  theory_md: string;
  code_examples: {
    title: string;
    code: string;
    output?: string;
  }[];
  practice_tasks: {
    id: string;
    title: string;
    description: string;
  }[];
  quiz_questions: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
  revision_points: string[];
  completion_criteria: string[];
  is_completed: boolean;
  completed_tasks: string[];
  quiz_score?: number;
  completed_at?: string;
}

export interface ProjectMilestone {
  title: string;
  description: string;
}

export interface ProjectChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface Project {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  order_index: number;
  description: string;
  objectives: string[];
  prerequisites: string[];
  functional_reqs: string[];
  data_model: string;
  milestones: string[];
  test_scenarios: string[];
  checklist: ProjectChecklistItem[];
  concepts_learned: string[];
  extensions: string[];
  is_sandbox_compatible: boolean;
  user_status: 'not_started' | 'in_progress' | 'completed';
  checked_items: string[];
  completed_at?: string;
}

export interface PersonalNote {
  id: string;
  title: string;
  content: string;
  tag: string;
  reference_type?: string;
  reference_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Bookmark {
  id: string;
  title: string;
  module_id: string;
  module_title: string;
  path_title: string;
}

export interface AnalyticsData {
  totalLessons: number;
  completedLessons: number;
  lessonProgressPct: number;
  totalChallenges: number;
  completedChallenges: number;
  challengeProgressPct: number;
  avgQuizAccuracy: number;
  totalQuizAttempts: number;
  totalCards: number;
  reviewedCards: number;
  totalStudyMins: number;
  masteryScore: number;
  masteryFormula: string;
  pathBreakdown: {
    pathId: string;
    title: string;
    total: number;
    completed: number;
    percentage: number;
  }[];
  recentActivity: {
    id: string;
    activity_type: string;
    reference_id: string;
    duration_mins: number;
    created_at: string;
    summary: string;
  }[];
}
