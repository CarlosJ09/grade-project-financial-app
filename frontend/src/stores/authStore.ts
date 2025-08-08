import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import api from '@/interceptor/core-api';
import { authService } from '@/services/auth';
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
          const response = await authService.login(credentials);
          if (response.status !== 200) {
            set({
              error: { message: response.data.message },
              isLoading: false,
            });
            return false;
          }

          const session: AuthSession = response.data;

          api.defaults.headers.common['Authorization'] =
            `Bearer ${session.accessToken}`;

          set({
            user: session.user,
            session: session,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          router.replace('/(tabs)');
          return true;
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || error.message === 'Network Error'
              ? 'Cannot connect to server'
              : error.message || 'Login failed';

          set({
            error: { message: errorMessage },
            isLoading: false,
          });
          return false;
        }
      },

      register: async (credentials: RegisterCredentials): Promise<boolean> => {
        set({ isLoading: true, error: null });

        try {
          const response = await authService.register(credentials);

          if (response.status === 200 || response.status === 201) {
            const session: AuthSession = response.data;

            // Set auth header for future requests
            api.defaults.headers.common['Authorization'] =
              `Bearer ${session.accessToken}`;

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
          } else if (response.data?.error) {
            set({
              error: { message: response.data.error },
              isLoading: false,
            });
          }

          return false;
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

        if (session?.accessToken) {
          try {
            await authService.logout(session.accessToken);
          } catch (error) {
            console.error('Logout API call failed:', error);
          }
        }

        delete api.defaults.headers.common['Authorization'];

        set({
          user: null,
          session: null,
          isAuthenticated: false,
          error: null,
        });

        router.replace('/auth/sign-in');
      },

      refreshToken: async (): Promise<boolean> => {
        const { session } = get();

        if (!session?.refreshToken) {
          get().logout();
          return false;
        }

        try {
          console.log('Refreshing token...');

          const newTokens = await authService.refreshToken(
            session.refreshToken
          );

          console.log('Token refreshed successfully');

          // Update auth header
          api.defaults.headers.common['Authorization'] =
            `Bearer ${newTokens.accessToken}`;

          // Update session with new tokens
          const updatedSession: AuthSession = {
            ...session,
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken,
            expiresAt: newTokens.expiresAt,
          };

          set({
            session: updatedSession,
          });

          return true;
        } catch (error: any) {
          console.error('Token refresh failed:', error);

          // If refresh fails, logout the user
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
        if (state?.session?.accessToken) {
          api.defaults.headers.common['Authorization'] =
            `Bearer ${state.session.accessToken}`;
        }
      },
    }
  )
);
