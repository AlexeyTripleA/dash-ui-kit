/**
 * React Native Style System
 * 
 * Export all design tokens and utility functions for building
 * consistent React Native styles.
 * 
 * @module dash-ui-kit/react-native/styles
 */

// Export all tokens
export {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  borderWidth,
  opacity,
  zIndex,
} from './tokens';

// Export types
export type {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
  Shadows,
  BorderWidth,
  Opacity,
  ZIndex,
} from './tokens';

// Export utilities
export { rgba, hexToRgba, getShadow } from './utils';
