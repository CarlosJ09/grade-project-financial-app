/**
 * Design System Constants
 *
 * This file contains all the design tokens for the Financial App.
 * Use these constants throughout the app for consistent design.
 */

import { ColorPalette, Colors } from './colors';
import { FontFamily, FontSizes, LineHeights } from './fonts';

// Re-export for convenience
export { ColorPalette, Colors, FontFamily, FontSizes, LineHeights };

/**
 * Component Color Combinations
 * Predefined color combinations for common UI patterns
 */
export const ColorCombinations = {
  button: {
    primary: {
      background: ColorPalette.primary,
      text: ColorPalette.white,
      hover: ColorPalette.secondary,
    },
    secondary: {
      background: ColorPalette.secondary,
      text: ColorPalette.white,
      hover: ColorPalette.primary,
    },
    success: {
      background: ColorPalette.success,
      text: ColorPalette.text,
      hover: ColorPalette.successLight,
    },
  },
};

/**
 * Typography Scale
 * Predefined typography combinations for common text elements
 */
export const Typography = {
  heading1: {
    fontFamily: FontFamily.bold,
    fontSize: FontSizes['4xl'],
  },
  heading2: {
    fontFamily: FontFamily.bold,
    fontSize: FontSizes['3xl'],
  },
  body: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.base,
  },
  button: {
    fontFamily: FontFamily.medium,
    fontSize: FontSizes.base,
  },
};
