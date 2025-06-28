import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import api from '@/interceptor/core-api';
import type {
  AuthError,
  AuthSession,
  LoginCredentials,
  RegisterCredentials,
  User,
} from '@/types/auth';

interface AuthState {
  // State
  user: User | null;
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (user: Partial<User>) => void;
}

// Custom storage for Expo SecureStore
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

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials: LoginCredentials): Promise<boolean> => {
        set({ isLoading: true, error: null });

        try {
          const response = await api.post('/auth/login', credentials);

          if (response.data?.error) {
            set({
              error: { message: response.data.error },
              isLoading: false,
            });
            return false;
          }

          const session: AuthSession = response.data;

          // Set auth header for future requests
          api.defaults.headers.common['Authorization'] =
            `Bearer ${session.token}`;

          set({
            user: session.user,
            session,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          // Navigate to main app
          router.replace('/(tabs)');
          return true;
        } catch (error: any) {
          set({
            error: { message: error.response?.data?.message || 'Login failed' },
            isLoading: false,
          });
          return false;
        }
      },

      register: async (credentials: RegisterCredentials): Promise<boolean> => {
        set({ isLoading: true, error: null });

        try {
          const response = await api.post('/auth/register', credentials);

          if (response.data?.error) {
            set({
              error: { message: response.data.error },
              isLoading: false,
            });
            return false;
          }

          const session: AuthSession = response.data;

          // Set auth header for future requests
          api.defaults.headers.common['Authorization'] =
            `Bearer ${session.token}`;

          set({
            user: session.user,
            session,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          // Navigate to main app
          router.replace('/(tabs)');
          return true;
        } catch (error: any) {
          set({
            error: {
              message: error.response?.data?.message || 'Registration failed',
            },
            isLoading: false,
          });
          return false;
        }
      },

      logout: async (): Promise<void> => {
        const { session } = get();

        if (session?.token) {
          try {
            await api.post('/auth/logout', { token: session.token });
          } catch (error) {
            console.error('Logout API call failed:', error);
          }
        }

        // Clear auth header
        delete api.defaults.headers.common['Authorization'];

        // Clear state
        set({
          user: null,
          session: null,
          isAuthenticated: false,
          error: null,
        });

        // Navigate to auth
        router.replace('/auth/sign-in');
      },

      refreshToken: async (): Promise<boolean> => {
        const { session } = get();

        if (!session?.refreshToken) {
          get().logout();
          return false;
        }

        try {
          const response = await api.post('/auth/refresh-token', {
            token: session.refreshToken,
          });

          if (response.data?.error) {
            get().logout();
            return false;
          }

          const newSession: AuthSession = response.data;

          // Update auth header
          api.defaults.headers.common['Authorization'] =
            `Bearer ${newSession.token}`;

          set({
            session: newSession,
            user: newSession.user,
          });

          return true;
        } catch (error) {
          console.error('Token refresh failed:', error);
          get().logout();
          return false;
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      updateUser: (userUpdate: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...userUpdate } });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage),
      // Only persist essential data
      partialize: state => ({
        user: state.user,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
      }),
      // Restore auth header on rehydration
      onRehydrateStorage: () => state => {
        if (state?.session?.token) {
          api.defaults.headers.common['Authorization'] =
            `Bearer ${state.session.token}`;
        }
      },
    }
  )
);
