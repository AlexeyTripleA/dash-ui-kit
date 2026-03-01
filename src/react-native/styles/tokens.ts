/**
 * Design tokens for React Native
 * 
 * These tokens are derived from the web theme (src/styles/theme.pcss)
 * and optimized for React Native StyleSheet usage.
 * 
 * @example
 * ```typescript
 * import { colors, spacing, typography, borderRadius, shadows } from 'dash-ui-kit/react-native';
 * import { StyleSheet, Platform } from 'react-native';
 * 
 * const styles = StyleSheet.create({
 *   container: {
 *     backgroundColor: colors.brand,
 *     padding: spacing[4],
 *     borderRadius: borderRadius.md,
 *     ...Platform.select({
 *       ios: shadows.md.ios,
 *       android: shadows.md.android,
 *     }),
 *   },
 *   title: {
 *     fontSize: typography.fontSize.xl,
 *     fontWeight: typography.fontWeight.semibold,
 *     lineHeight: typography.lineHeight.xl,
 *   },
 * });
 * ```
 */

/**
 * Color palette
 * Derived from theme.pcss color variables
 */
export const colors = {
  // Brand colors
  brand: '#4C7EFF',
  brandDim: '#96A7FF',
  brandDark: '#4D5895',
  brandDarkness: '#13172A',

  // Accent colors
  mint: '#60F6D2',
  mintHover: '#4DD4B1',

  // Yellow variants
  yellowLight: '#fef3c7',
  yellow: '#fde68a',

  // Primary colors
  primaryDarkBlue: '#0C1C33',
  primaryDieSubdued: 'rgba(12, 28, 51, 0.03)',

  // State colors - Green
  green: '#40BF40',
  green75: 'rgba(64, 191, 64, 0.75)',
  green15: 'rgba(64, 191, 64, 0.15)',
  green5: 'rgba(64, 191, 64, 0.05)',

  // State colors - Red
  red: '#CD2E00',
  red75: 'rgba(205, 46, 0, 0.75)',
  red15: 'rgba(205, 46, 0, 0.15)',
  red5: 'rgba(205, 46, 0, 0.05)',

  // State colors - Orange
  orange: '#F98F12',
  orange75: 'rgba(249, 143, 18, 0.75)',
  orange15: 'rgba(249, 143, 18, 0.15)',
  orange5: 'rgba(249, 143, 18, 0.05)',

  // Common colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

/**
 * Spacing scale
 * Based on 4px base unit (Tailwind-compatible)
 */
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44, // 2.75rem from theme
  12: 48,
  14: 56,
  16: 64,
  18: 72,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
} as const;

/**
 * Typography scale
 * Font sizes, weights, and line heights
 */
export const typography = {
  /**
   * Font size scale
   */
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
  },

  /**
   * Font weight scale
   * Values are strings for React Native compatibility
   */
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  /**
   * Line height scale (in pixels)
   * Calculated based on common typography ratios
   */
  lineHeight: {
    xs: 16,    // 1.33x
    sm: 20,    // 1.43x
    base: 24,  // 1.5x
    lg: 28,    // 1.56x
    xl: 28,    // 1.4x
    '2xl': 32, // 1.33x
    '3xl': 36, // 1.2x
    '4xl': 40, // 1.11x
    '5xl': 56, // 1.17x
    '6xl': 72, // 1.2x
    '7xl': 84, // 1.17x
    '8xl': 112, // 1.17x
    '9xl': 144, // 1.13x
  },

  /**
   * Letter spacing (tracking)
   */
  letterSpacing: {
    tighter: -0.8,
    tight: -0.4,
    normal: 0,
    wide: 0.4,
    wider: 0.8,
    widest: 1.6,
  },
} as const;

/**
 * Border radius scale
 */
export const borderRadius = {
  none: 0,
  xs: 4,
  sm: 10,
  md: 12,
  lg: 14,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
} as const;

/**
 * Shadow presets
 * Platform-specific implementations for iOS and Android
 * 
 * @example
 * ```typescript
 * import { Platform } from 'react-native';
 * 
 * const shadowStyle = Platform.select({
 *   ios: shadows.md.ios,
 *   android: shadows.md.android,
 * });
 * ```
 */
export const shadows = {
  /**
   * Small shadow - subtle elevation
   */
  sm: {
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
  },

  /**
   * Medium shadow - standard elevation
   */
  md: {
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
  },

  /**
   * Large shadow - prominent elevation
   */
  lg: {
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
  },

  /**
   * Extra large shadow - maximum elevation
   */
  xl: {
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
    },
    android: {
      elevation: 12,
    },
  },
} as const;

/**
 * Border width scale
 */
export const borderWidth = {
  0: 0,
  1: 1,
  2: 2,
  4: 4,
  8: 8,
} as const;

/**
 * Opacity scale
 */
export const opacity = {
  0: 0,
  5: 0.05,
  10: 0.1,
  15: 0.15,
  20: 0.2,
  25: 0.25,
  30: 0.3,
  40: 0.4,
  50: 0.5,
  60: 0.6,
  70: 0.7,
  75: 0.75,
  80: 0.8,
  90: 0.9,
  95: 0.95,
  100: 1,
} as const;

/**
 * Z-index scale
 */
export const zIndex = {
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  auto: 'auto' as const,
} as const;

// Type exports for TypeScript users
export type Colors = typeof colors;
export type Spacing = typeof spacing;
export type Typography = typeof typography;
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows;
export type BorderWidth = typeof borderWidth;
export type Opacity = typeof opacity;
export type ZIndex = typeof zIndex;
