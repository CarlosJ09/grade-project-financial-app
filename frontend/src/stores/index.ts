// Auth Store
export type {
  AuthError,
  AuthSession,
  LoginCredentials,
  RegisterCredentials,
  User,
} from '@/types/auth';
export { useAuthStore } from './authStore';

// Financial Store
export type {
  Bank,
  Budget,
  Category,
  Currency,
  PaymentMethod,
  Transaction,
} from '@/types/financial';
export { useFinancialStore } from './financialStore';

// Education Store
export type {
  ContentItem,
  Course,
  CourseEnrollment,
  Module,
  QuizAttempt,
  UserModuleProgress,
} from '@/types/education';
export { useEducationStore } from './educationStore';

// Theme Store
export { useThemeStore } from './themeStore';
export type { ActiveTheme, ThemeMode } from './themeStore';
