"use client";

import { jsx } from 'react/jsx-runtime';
import React from 'react';

const ThemeContext = /*#__PURE__*/React.createContext(undefined);
/**
 * Provides theme context to its descendants and syncs theme with localStorage
 * and the root HTML element's class list ('light' or 'dark').
 *
 * @param initialTheme - Optional initial theme override.
 * @param children - React children.
 */
const ThemeProvider = ({
  initialTheme,
  children
}) => {
  /**
   * Retrieve stored theme from localStorage, if available.
   */
  const getStoredTheme = () => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('theme');
    return stored != null && (stored === 'light' || stored === 'dark') ? stored : null;
  };
  const [theme, setThemeState] = React.useState(() => {
    var _a;
    return (_a = initialTheme !== null && initialTheme !== void 0 ? initialTheme : getStoredTheme()) !== null && _a !== void 0 ? _a : 'light';
  });
  // Sync theme changes to document <html> class and localStorage.
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    try {
      localStorage.setItem('theme', theme);
    } catch (_a) {
      // Ignore localStorage.
    }
  }, [theme]);
  /**
   * Update theme state explicitly.
   * @param newTheme - The theme to set ('light' or 'dark').
   */
  const setTheme = newTheme => {
    setThemeState(newTheme);
  };
  /**
   * Toggle between 'light' and 'dark' theme.
   */
  const toggleTheme = () => {
    setThemeState(current => current === 'light' ? 'dark' : 'light');
  };
  return jsx(ThemeContext.Provider, {
    value: {
      theme,
      setTheme,
      toggleTheme
    },
    children: children
  });
};
/**
 * Hook to access the theme context.
 * @returns ThemeContextValue - Contains `theme`, `setTheme`, and `toggleTheme`.
 * @throws If used outside of a ThemeProvider.
 */
function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context == null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { ThemeProvider, useTheme };
//# sourceMappingURL=ThemeContext.esm.js.map
