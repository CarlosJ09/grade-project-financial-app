/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * Color palette based on the design system provided.
 */

// Primary color palette
export const ColorPalette = {
  primary: '#7BCFA3', // Main green
  secondary: '#22577A', // Dark blue
  success: '#9AE6B4', // Light green
  successLight: '#C6F6D5', // Very light green
  background: '#E0F8E0', // Very light mint green
  text: '#333333', // Font color
  error: '#D32F2F', // Red
  white: '#FFFFFF',
  black: '#000000',
};

const tintColorLight = ColorPalette.primary;
const tintColorDark = ColorPalette.success;

export const Colors = {
  light: {
    text: ColorPalette.text,
    background: ColorPalette.white,
    backgroundSecondary: ColorPalette.background,
    tint: tintColorLight,
    primary: ColorPalette.primary,
    secondary: ColorPalette.secondary,
    success: ColorPalette.success,
    successLight: ColorPalette.successLight,
    error: ColorPalette.error,
    neutral: '#687076',
    icon: ColorPalette.secondary,
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    border: ColorPalette.successLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    backgroundSecondary: '#1F2937',
    tint: tintColorDark,
    primary: ColorPalette.primary,
    secondary: ColorPalette.secondary,
    success: ColorPalette.success,
    successLight: ColorPalette.successLight,
    error: ColorPalette.error,
    neutral: '#687076',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    border: '#374151',
  },
};
