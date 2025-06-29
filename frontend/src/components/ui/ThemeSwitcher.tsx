import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useThemeStore, type ThemeMode } from '@/stores/themeStore';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface ThemeSwitcherProps {
  showLabels?: boolean;
  variant?: 'compact' | 'full';
}

export function ThemeSwitcher({
  showLabels = false,
  variant = 'compact',
}: ThemeSwitcherProps) {
  const { themeMode, setThemeMode } = useThemeStore();
  const textColor = useThemeColor({}, 'text');
  const neutralColor = useThemeColor({}, 'neutral');
  const tintColor = useThemeColor({}, 'tint');

  const themes: Array<{
    mode: ThemeMode;
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
  }> = [
    { mode: 'light', icon: 'sunny-outline', label: 'Light' },
    { mode: 'dark', icon: 'moon-outline', label: 'Dark' },
    { mode: 'system', icon: 'phone-portrait-outline', label: 'System' },
  ];

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  if (variant === 'compact') {
    return (
      <View style={styles.compactContainer}>
        {themes.map(theme => {
          const isActive = themeMode === theme.mode;
          return (
            <TouchableOpacity
              key={theme.mode}
              style={[
                styles.compactButton,
                isActive && { backgroundColor: tintColor + '20' },
              ]}
              onPress={() => handleThemeChange(theme.mode)}
              accessibilityRole="button"
              accessibilityLabel={`Switch to ${theme.label} theme`}
              accessibilityState={{ selected: isActive }}
            >
              <Ionicons
                name={theme.icon}
                size={20}
                color={isActive ? tintColor : neutralColor}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <View style={styles.fullContainer}>
      {themes.map(theme => {
        const isActive = themeMode === theme.mode;
        return (
          <TouchableOpacity
            key={theme.mode}
            style={[
              styles.fullButton,
              isActive && { backgroundColor: tintColor + '20' },
            ]}
            onPress={() => handleThemeChange(theme.mode)}
            accessibilityRole="button"
            accessibilityLabel={`Switch to ${theme.label} theme`}
            accessibilityState={{ selected: isActive }}
          >
            <Ionicons
              name={theme.icon}
              size={24}
              color={isActive ? tintColor : neutralColor}
            />
            {showLabels && (
              <ThemedText
                style={[
                  styles.label,
                  { color: isActive ? tintColor : textColor },
                ]}
              >
                {theme.label}
              </ThemedText>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  compactContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
    padding: 4,
  },
  compactButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  fullContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  fullButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    minWidth: 80,
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
  },
});
