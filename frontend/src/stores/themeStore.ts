import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ActiveTheme = 'light' | 'dark';

interface ThemeState {
  // State
  themeMode: ThemeMode;

  // Actions
  setThemeMode: (mode: ThemeMode) => void;
  getActiveTheme: () => ActiveTheme;
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

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      // Initial state
      themeMode: 'system',

      // Actions
      setThemeMode: (mode: ThemeMode) => {
        set({ themeMode: mode });
      },

      getActiveTheme: (): ActiveTheme => {
        const { themeMode } = get();

        if (themeMode === 'system') {
          // For system mode, we'll rely on the useColorScheme hook
          // This function is mainly for non-hook contexts
          return 'light'; // fallback
        }

        return themeMode;
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
