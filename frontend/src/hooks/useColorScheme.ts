import { useThemeStore } from '@/stores/themeStore';
import { useColorScheme as useSystemColorScheme } from 'react-native';

export function useColorScheme() {
  const systemColorScheme = useSystemColorScheme();
  const { themeMode } = useThemeStore();

  if (themeMode === 'system') {
    return systemColorScheme;
  }

  return themeMode;
}
