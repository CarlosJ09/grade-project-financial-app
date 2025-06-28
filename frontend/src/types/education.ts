export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  courseId: string;
  orderIndex: number;
  duration: number; // in minutes
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContentItem {
  id: string;
  title: string;
  content: string;
  type: 'video' | 'text' | 'quiz' | 'interactive';
  moduleId: string;
  orderIndex: number;
  duration?: number; // in minutes
  createdAt: string;
  updatedAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  explanation?: string;
  contentItemId: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  questionId: string;
  orderIndex: number;
}

export interface CourseEnrollment {
  id: string;
  userId: string;
  courseId: string;
  enrollmentDate: string;
  completionDate?: string;
  progress: number; // 0-100
  isCompleted: boolean;
}

export interface UserModuleProgress {
  id: string;
  userId: string;
  moduleId: string;
  progress: number; // 0-100
  isCompleted: boolean;
  completedAt?: string;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  contentItemId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  attemptDate: string;
  isCompleted: boolean;
}
