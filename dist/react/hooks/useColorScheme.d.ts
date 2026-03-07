/**
 * Resolves the effective color scheme based on the active theme.
 *
 * Priority:
 *   1. colorSchemeLight — when theme is 'light' and value is provided
 *   2. colorSchemeDark  — when theme is 'dark' and value is provided
 *   3. colorScheme      — fallback, theme-independent
 */
export declare function useColorScheme<T>(colorScheme?: T, colorSchemeLight?: T, colorSchemeDark?: T): T | undefined;
