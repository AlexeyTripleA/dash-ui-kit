import React from 'react';
export type Theme = 'light' | 'dark';
/**
 * Context value shape for theme switching.
 */
export interface ThemeContextValue {
    /** Current theme, either 'light' or 'dark'. */
    theme: Theme;
    /** Set the theme explicitly. */
    setTheme: (theme: Theme) => void;
    /** Toggle between 'light' and 'dark'. */
    toggleTheme: () => void;
}
/**
 * Props for the ThemeProvider component.
 */
export interface ThemeProviderProps {
    /** Initial theme; if not provided, reads from localStorage or defaults to 'light'. */
    initialTheme?: Theme;
    /** React children that will have access to the theme context. */
    children: React.ReactNode;
}
/**
 * Provides theme context to its descendants and syncs theme with localStorage
 * and the root HTML element's class list ('light' or 'dark').
 *
 * @param initialTheme - Optional initial theme override.
 * @param children - React children.
 */
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
/**
 * Hook to access the theme context.
 * @returns ThemeContextValue - Contains `theme`, `setTheme`, and `toggleTheme`.
 * @throws If used outside of a ThemeProvider.
 */
export declare function useTheme(): ThemeContextValue;
