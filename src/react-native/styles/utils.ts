/**
 * Utility functions for React Native styles
 */

import { Platform } from 'react-native';
import { shadows } from './tokens';

/**
 * Creates an rgba color string from hex color and opacity
 * 
 * @param hexColor - Hex color string (e.g., '#4C7EFF')
 * @param alpha - Opacity value between 0 and 1
 * @returns rgba color string
 * 
 * @example
 * ```typescript
 * rgba('#4C7EFF', 0.5) // 'rgba(76, 126, 255, 0.5)'
 * rgba('#40BF40', 0.15) // 'rgba(64, 191, 64, 0.15)'
 * ```
 */
export function rgba(hexColor: string, alpha: number): string {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Converts hex color to rgba
 * Alias for rgba() with more explicit naming
 * 
 * @param hexColor - Hex color string
 * @param alpha - Opacity value between 0 and 1
 * @returns rgba color string
 */
export function hexToRgba(hexColor: string, alpha: number): string {
  return rgba(hexColor, alpha);
}

/**
 * Shadow style type for iOS platform
 */
type IOSShadowStyle = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
};

/**
 * Shadow style type for Android platform
 */
type AndroidShadowStyle = {
  elevation: number;
};

/**
 * Gets platform-specific shadow styles
 * 
 * @param size - Shadow size: 'sm' | 'md' | 'lg' | 'xl'
 * @returns Platform-specific shadow styles
 * 
 * @example
 * ```typescript
 * const styles = StyleSheet.create({
 *   card: {
 *     ...getShadow('md'),
 *   },
 * });
 * ```
 */
export function getShadow(
  size: 'sm' | 'md' | 'lg' | 'xl'
): IOSShadowStyle | AndroidShadowStyle {
  if (Platform.OS === 'ios') {
    return shadows[size].ios;
  } else if (Platform.OS === 'android') {
    return shadows[size].android;
  }
  // Default to iOS shadow style for other platforms
  return shadows[size].ios;
}

/**
 * Type guard to check if value is a valid spacing key
 */
export function isSpacingKey(value: any): value is keyof typeof import('./tokens').spacing {
  const spacingKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64];
  return spacingKeys.includes(value);
}
