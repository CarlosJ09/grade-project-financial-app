import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | 'default'
    | 'title'
    | 'defaultSemiBold'
    | 'subtitle'
    | 'link'
    | 'light'
    | 'medium'
    | 'bold';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'light' ? styles.light : undefined,
        type === 'medium' ? styles.medium : undefined,
        type === 'bold' ? styles.bold : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins_400Regular',
  },
  light: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins_300Light',
  },
  medium: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins_500Medium',
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins_600SemiBold',
  },
  bold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins_700Bold',
  },
  title: {
    fontSize: 28,
    lineHeight: 32,
    fontFamily: 'Poppins_700Bold',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#7BCFA3',
    fontFamily: 'Poppins_500Medium',
  },
});
