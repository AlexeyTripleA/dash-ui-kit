export function resolveColorScheme<T>(
  theme: 'light' | 'dark',
  colorScheme?: T,
  colorSchemeLight?: T,
  colorSchemeDark?: T
): T | undefined {
  if (theme === 'light' && colorSchemeLight !== undefined) return colorSchemeLight
  if (theme === 'dark' && colorSchemeDark !== undefined) return colorSchemeDark
  return colorScheme
}
