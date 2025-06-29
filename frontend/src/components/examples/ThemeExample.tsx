import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export function ThemeExample() {
  const { themeMode, activeTheme, isLight, isDark, isSystem } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Theme Example
      </ThemedText>

      <ThemedText style={styles.info}>
        Current theme mode: {themeMode}
      </ThemedText>
      <ThemedText style={styles.info}>Active theme: {activeTheme}</ThemedText>
      <ThemedText style={styles.info}>
        Is light: {isLight ? 'Yes' : 'No'}
      </ThemedText>
      <ThemedText style={styles.info}>
        Is dark: {isDark ? 'Yes' : 'No'}
      </ThemedText>
      <ThemedText style={styles.info}>
        Is system: {isSystem ? 'Yes' : 'No'}
      </ThemedText>

      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Compact Theme Switcher
        </ThemedText>
        <ThemeSwitcher variant="compact" />
      </View>

      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Full Theme Switcher
        </ThemedText>
        <ThemeSwitcher variant="full" showLabels />
      </View>

      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Full Theme Switcher (No Labels)
        </ThemedText>
        <ThemeSwitcher variant="full" />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  info: {
    marginBottom: 8,
    fontSize: 14,
  },
  section: {
    marginVertical: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  sectionTitle: {
    marginBottom: 12,
  },
});
