# Design System Guide

This document outlines the design system for the Financial App, including color palette, typography, and usage guidelines.

## Color Palette

### Primary Colors

- **Primary Green**: `#7BCFA3` - Main brand color for buttons, links, and key actions
- **Secondary Blue**: `#22577A` - Supporting color for headers and important elements
- **Success Green**: `#9AE6B4` - For success states and positive feedback
- **Success Light**: `#C6F6D5` - Light success color for backgrounds and borders
- **Background Mint**: `#E0F8E0` - Light background color for cards and sections
- **Text Color**: `#333333` - Primary text color for readability
- **Error Red**: `#D32F2F` - For error states and warnings

### Usage in Codeclear

#### Using with Tailwind CSS

```tsx
// Background colors
<View className="bg-primary" />
<View className="bg-secondary" />
<View className="bg-success" />
<View className="bg-success-light" />
<View className="bg-background" />

// Text colors
<Text className="text-text-primary" />
<Text className="text-primary" />
<Text className="text-error" />
```

#### Using with Constants

```tsx
import { ColorPalette } from '@/constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalette.primary,
  },
  text: {
    color: ColorPalette.text,
  },
});
```

#### Using with ThemedView/ThemedText

```tsx
import { ThemedView, ThemedText } from '@/components';

<ThemedView style={{ backgroundColor: Colors.light.primary }}>
  <ThemedText type="medium">Styled text</ThemedText>
</ThemedView>
```

## Typography

### Font Family: Poppins

The app uses Google Fonts Poppins in multiple weights:

- **Light**: `Poppins_300Light`
- **Regular**: `Poppins_400Regular` (default)
- **Medium**: `Poppins_500Medium`
- **Semi Bold**: `Poppins_600SemiBold`
- **Bold**: `Poppins_700Bold`

### Usage in Code

#### Using with Tailwind CSS

```tsx
// Font families
<Text className="font-poppins-light" />
<Text className="font-poppins-regular" />
<Text className="font-poppins-medium" />
<Text className="font-poppins-semibold" />
<Text className="font-poppins-bold" />
```

#### Using with ThemedText Component

```tsx
import { ThemedText } from '@/components/ThemedText';

<ThemedText type="light">Light text</ThemedText>
<ThemedText type="default">Regular text</ThemedText>
<ThemedText type="medium">Medium text</ThemedText>
<ThemedText type="defaultSemiBold">Semi-bold text</ThemedText>
<ThemedText type="bold">Bold text</ThemedText>
<ThemedText type="title">Title text</ThemedText>
<ThemedText type="subtitle">Subtitle text</ThemedText>
<ThemedText type="link">Link text</ThemedText>
```

#### Using with StyleSheet

```tsx
import { FontFamily } from '@/constants/fonts';

const styles = StyleSheet.create({
  heading: {
    fontFamily: FontFamily.bold,
    fontSize: 24,
  },
  body: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
  },
  button: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
  },
});
```

## Component Examples

### Button Component

```tsx
import { Button } from '@/components/ui/Button';

// Primary button with brand colors
<Button title="Primary Action" variant="primary" />

// Secondary button
<Button title="Secondary Action" variant="secondary" />

// Success button
<Button title="Success Action" variant="success" />

// Outline button
<Button title="Outline Action" variant="outline" />

// Error button
<Button title="Error Action" variant="error" />
```

### Card with Brand Colors

```tsx
<View className="bg-white border border-success-light rounded-xl p-4">
  <ThemedText type="subtitle" className="text-secondary mb-2">
    Card Title
  </ThemedText>
  <ThemedText type="default" className="text-text-primary">
    Card content with proper typography and colors.
  </ThemedText>
</View>
```

## Best Practices

1. **Consistency**: Always use the defined color constants instead of hardcoded hex values
2. **Accessibility**: Ensure proper contrast ratios between text and background colors
3. **Typography Hierarchy**: Use the predefined text types for consistent typography
4. **Color Context**: Use colors according to their semantic meaning (primary for main actions, error for warnings, etc.)
5. **Font Loading**: The app automatically loads Poppins fonts on startup through the `useAppFonts` hook

## File Structure

```
src/
├── constants/
│   ├── colors.ts          # Color palette and theme definitions
│   ├── fonts.ts           # Font family and size constants
│   └── designSystem.ts    # Combined design system exports
├── hooks/
│   └── useFonts.ts        # Font loading hook
└── components/
    ├── ThemedText.tsx     # Text component with theme support
    └── ui/
        └── Button.tsx     # Button component with brand colors
```
