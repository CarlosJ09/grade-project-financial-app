export interface Course {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: number;
  courseId: number;
  contentItem: string;
  sequence: number;
  summary: string;
  estimatedMinutes: number;
  releaseAt: string;
  prerequisiteModuleId?: number;
}

export interface ContentItem {
  id: number;
  sectionId: string;
  moduleId: number;
  sequence: number;
  title: string;
  fileUrl: string;
  markdownBody: string;
}

export interface QuizQuestion {
  id: number;
  contentItemId: number;
  questionText: string;
  questionType: string;
  explanation: string;
}

export interface QuizOption {
  id: number;
  quizQuestionId: number;
  optionText: string;
  isCorrect: boolean;
}

export interface CourseEnrollment {
  id: number;
  userId: string;
  courseId: number;
  enrolledAt: string;
  unenrolledAt?: string;
}

export interface UserModuleProgress {
  id: number;
  userId: string;
  moduleId: number;
  status: string;
  progressPercent: number;
  startedAt: string;
  completedAt?: string;
}

export interface QuizAttempt {
  id: number;
  userId: string;
  contentItemId: number;
  attemptNo: number;
  status: string;
  startedAt: string;
  finishedAt?: string;
  score: number;
}

export interface QuizAttemptAnswer {
  id: number;
  quizAttemptId: number;
  quizQuestionId: number;
}
