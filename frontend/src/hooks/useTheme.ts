import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeStore, type ActiveTheme } from '@/stores/themeStore';

export function useTheme() {
  const { themeMode, setThemeMode } = useThemeStore();
  const activeTheme = useColorScheme() as ActiveTheme;

  return {
    themeMode,
    activeTheme,
    setThemeMode,
    isLight: activeTheme === 'light',
    isDark: activeTheme === 'dark',
    isSystem: themeMode === 'system',
  };
}
