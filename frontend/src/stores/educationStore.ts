import { create } from 'zustand';

import { courseService } from '@/services/course';
import { courseEnrollmentService } from '@/services/courseEnrollment';
import { moduleService } from '@/services/module';
import { quizAttemptService } from '@/services/quizAttempt';
import { userModuleProgressService } from '@/services/userModuleProgress';
import type {
  Course,
  CourseEnrollment,
  Module,
  QuizAttempt,
  UserModuleProgress,
} from '@/types/education';

interface EducationState {
  // State
  courses: Course[];
  enrollments: CourseEnrollment[];
  moduleProgress: UserModuleProgress[];
  quizAttempts: QuizAttempt[];
  currentCourse: Course | null;
  currentModule: Module | null;
  currentModules: Module[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCourses: () => Promise<void>;
  fetchEnrollments: () => Promise<void>;
  fetchModuleProgress: () => Promise<void>;
  fetchCourseContent: (courseId: number) => Promise<void>;

  enrollInCourse: (data: {
    userId: string;
    courseId: number;
  }) => Promise<boolean>;
  updateModuleProgress: (
    moduleId: number,
    progress: number
  ) => Promise<boolean>;
  completeModule: (moduleId: number) => Promise<boolean>;
  submitQuizAttempt: (
    contentItemId: number,
    answers: any[]
  ) => Promise<boolean>;

  setCurrentCourse: (course: Course | null) => void;
  setCurrentModule: (module: Module | null) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  resetStore: () => void;
}

const initialState = {
  courses: [],
  enrollments: [],
  moduleProgress: [],
  quizAttempts: [],
  currentCourse: null,
  currentModule: null,
  currentModules: [],
  isLoading: false,
  error: null,
};

export const useEducationStore = create<EducationState>()((set, get) => ({
  // Initial state
  ...initialState,

  // Actions
  fetchCourses: async () => {
    set({ isLoading: true, error: null });
    try {
      const courses = await courseService.getAll();
      set({ courses, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch courses',
        isLoading: false,
      });
    }
  },

  fetchEnrollments: async () => {
    set({ isLoading: true, error: null });
    try {
      const enrollments = await courseEnrollmentService.getAll();
      set({ enrollments, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch enrollments',
        isLoading: false,
      });
    }
  },

  fetchModuleProgress: async () => {
    set({ isLoading: true, error: null });
    try {
      const moduleProgress = await userModuleProgressService.getAll();
      set({ moduleProgress, isLoading: false });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || 'Failed to fetch module progress',
        isLoading: false,
      });
    }
  },

  fetchCourseContent: async (courseId: number) => {
    set({ isLoading: true, error: null });
    try {
      const [course, modules] = await Promise.all([
        courseService.getById(courseId),
        moduleService.getModulesByCourse(courseId),
      ]);

      set({
        currentCourse: course,
        currentModules: modules,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || 'Failed to fetch course content',
        isLoading: false,
      });
    }
  },

  enrollInCourse: async (data: { userId: string; courseId: number }) => {
    set({ isLoading: true, error: null });
    try {
      const newEnrollment = await courseEnrollmentService.enrollInCourse(data);

      set(state => ({
        enrollments: [...state.enrollments, newEnrollment],
        isLoading: false,
      }));

      return true;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to enroll in course',
        isLoading: false,
      });
      return false;
    }
  },

  updateModuleProgress: async (moduleId: number, progress: number) => {
    set({ isLoading: true, error: null });
    try {
      const updatedProgress = await userModuleProgressService.updateProgress(
        moduleId,
        progress
      );

      set(state => ({
        moduleProgress: state.moduleProgress.map(mp =>
          mp.moduleId === moduleId ? updatedProgress : mp
        ),
        isLoading: false,
      }));

      return true;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to update progress',
        isLoading: false,
      });
      return false;
    }
  },

  completeModule: async (moduleId: number) => {
    return get().updateModuleProgress(moduleId, 100);
  },

  submitQuizAttempt: async (contentItemId: number, answers: any[]) => {
    set({ isLoading: true, error: null });
    try {
      const attemptId = 1; // This should be handled by starting a quiz first
      const score = 0; // Calculate based on answers
      const newAttempt = await quizAttemptService.submitQuiz(
        attemptId,
        answers,
        score
      );

      set(state => ({
        quizAttempts: [...state.quizAttempts, newAttempt],
        isLoading: false,
      }));

      return true;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to submit quiz',
        isLoading: false,
      });
      return false;
    }
  },

  setCurrentCourse: (course: Course | null) => {
    set({ currentCourse: course });
  },

  setCurrentModule: (module: Module | null) => {
    set({ currentModule: module });
  },

  clearError: () => {
    set({ error: null });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  resetStore: () => {
    set(initialState);
  },
}));

// Safe selector hook that ensures we always get arrays
export const useEducationData = () => {
  const store = useEducationStore();

  return {
    ...store,
    courses: Array.isArray(store.courses) ? store.courses : [],
    enrollments: Array.isArray(store.enrollments) ? store.enrollments : [],
    moduleProgress: Array.isArray(store.moduleProgress)
      ? store.moduleProgress
      : [],
    quizAttempts: Array.isArray(store.quizAttempts) ? store.quizAttempts : [],
    currentModules: Array.isArray(store.currentModules)
      ? store.currentModules
      : [],
  };
};
