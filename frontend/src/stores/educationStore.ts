import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import api from '@/interceptor/core-api';
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
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCourses: () => Promise<void>;
  fetchEnrollments: () => Promise<void>;
  fetchModuleProgress: () => Promise<void>;
  fetchCourseContent: (courseId: string) => Promise<void>;

  enrollInCourse: (courseId: string) => Promise<boolean>;
  updateModuleProgress: (
    moduleId: string,
    progress: number
  ) => Promise<boolean>;
  completeModule: (moduleId: string) => Promise<boolean>;
  submitQuizAttempt: (
    contentItemId: string,
    answers: any[]
  ) => Promise<boolean>;

  setCurrentCourse: (course: Course | null) => void;
  setCurrentModule: (module: Module | null) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

// For education data, we can use SecureStore as well since it might contain progress data
const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const useEducationStore = create<EducationState>()(
  persist(
    (set, get) => ({
      // Initial state
      courses: [],
      enrollments: [],
      moduleProgress: [],
      quizAttempts: [],
      currentCourse: null,
      currentModule: null,
      isLoading: false,
      error: null,

      // Actions
      fetchCourses: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.get('/courses');
          set({ courses: response.data, isLoading: false });
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
          const response = await api.get('/course-enrollments');
          set({ enrollments: response.data, isLoading: false });
        } catch (error: any) {
          set({
            error:
              error.response?.data?.message || 'Failed to fetch enrollments',
            isLoading: false,
          });
        }
      },

      fetchModuleProgress: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.get('/user-module-progress');
          set({ moduleProgress: response.data, isLoading: false });
        } catch (error: any) {
          set({
            error:
              error.response?.data?.message ||
              'Failed to fetch module progress',
            isLoading: false,
          });
        }
      },

      fetchCourseContent: async (courseId: string) => {
        set({ isLoading: true, error: null });
        try {
          const [courseResponse, modulesResponse] = await Promise.all([
            api.get(`/courses/${courseId}`),
            api.get(`/courses/${courseId}/modules`),
          ]);

          set({
            currentCourse: courseResponse.data,
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

      enrollInCourse: async (courseId: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/course-enrollments', { courseId });
          const newEnrollment = response.data;

          set(state => ({
            enrollments: [...state.enrollments, newEnrollment],
            isLoading: false,
          }));

          return true;
        } catch (error: any) {
          set({
            error:
              error.response?.data?.message || 'Failed to enroll in course',
            isLoading: false,
          });
          return false;
        }
      },

      updateModuleProgress: async (moduleId: string, progress: number) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.put(`/user-module-progress/${moduleId}`, {
            progress,
          });
          const updatedProgress = response.data;

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

      completeModule: async (moduleId: string) => {
        return get().updateModuleProgress(moduleId, 100);
      },

      submitQuizAttempt: async (contentItemId: string, answers: any[]) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/quiz-attempts', {
            contentItemId,
            answers,
          });
          const newAttempt = response.data;

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
    }),
    {
      name: 'education-storage',
      storage: createJSONStorage(() => secureStorage),
      // Cache course data and progress
      partialize: state => ({
        courses: state.courses,
        enrollments: state.enrollments,
        moduleProgress: state.moduleProgress,
        quizAttempts: state.quizAttempts,
      }),
    }
  )
);
