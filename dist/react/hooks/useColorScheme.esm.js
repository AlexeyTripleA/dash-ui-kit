"use client";

import { useTheme } from '../contexts/ThemeContext.esm.js';

/**
 * Resolves the effective color scheme based on the active theme.
 *
 * Priority:
 *   1. colorSchemeLight — when theme is 'light' and value is provided
 *   2. colorSchemeDark  — when theme is 'dark' and value is provided
 *   3. colorScheme      — fallback, theme-independent
 */
function useColorScheme(colorScheme, colorSchemeLight, colorSchemeDark) {
  const {
    theme
  } = useTheme();
  if (theme === 'light' && colorSchemeLight !== undefined) return colorSchemeLight;
  if (theme === 'dark' && colorSchemeDark !== undefined) return colorSchemeDark;
  return colorScheme;
}

export { useColorScheme };
//# sourceMappingURL=useColorScheme.esm.js.map
