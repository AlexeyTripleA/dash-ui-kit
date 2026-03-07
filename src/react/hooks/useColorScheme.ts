import { useTheme } from '../contexts/ThemeContext'

/**
 * Resolves the effective color scheme based on the active theme.
 *
 * Priority:
 *   1. colorSchemeLight — when theme is 'light' and value is provided
 *   2. colorSchemeDark  — when theme is 'dark' and value is provided
 *   3. colorScheme      — fallback, theme-independent
 */
export function useColorScheme<T>(
  colorScheme?: T,
  colorSchemeLight?: T,
  colorSchemeDark?: T
): T | undefined {
  const { theme } = useTheme()

  if (theme === 'light' && colorSchemeLight !== undefined) return colorSchemeLight
  if (theme === 'dark' && colorSchemeDark !== undefined) return colorSchemeDark

  return colorScheme
}
