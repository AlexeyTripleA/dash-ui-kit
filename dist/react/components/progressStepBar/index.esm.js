"use client";

import { jsx } from 'react/jsx-runtime';
import { useTheme } from '../../contexts/ThemeContext.esm.js';
import { useColorScheme } from '../../hooks/useColorScheme.esm.js';

const colorConfig = {
  blue: {
    active: 'bg-[var(--color-dash-brand)]',
    activeDark: 'bg-[var(--color-dash-brand-dim)]',
    inactive: 'bg-[rgba(76,126,255,0.16)]',
    inactiveDark: 'bg-gray-700'
  },
  red: {
    active: 'bg-[var(--color-dash-red)]',
    activeDark: 'bg-[var(--color-dash-red-75)]',
    inactive: 'bg-[var(--color-dash-red-15)]',
    inactiveDark: 'bg-gray-700'
  },
  orange: {
    active: 'bg-[var(--color-dash-orange)]',
    activeDark: 'bg-[var(--color-dash-orange-75)]',
    inactive: 'bg-[var(--color-dash-orange-15)]',
    inactiveDark: 'bg-gray-700'
  }
};
function ProgressStepBar({
  currentStep,
  totalSteps,
  className = '',
  color,
  colorLight,
  colorDark
}) {
  var _a;
  const {
    theme
  } = useTheme();
  const effectiveColor = (_a = useColorScheme(color, colorLight, colorDark)) !== null && _a !== void 0 ? _a : 'blue';
  const colors = colorConfig[effectiveColor];
  return jsx("div", {
    className: `flex gap-2 w-full ${className}`,
    children: Array.from({
      length: totalSteps
    }, (_, index) => jsx("div", {
      className: `h-1.5 rounded-2xl flex-1 transition-colors ${index < currentStep ? theme === 'dark' ? colors.activeDark : colors.active : theme === 'dark' ? colors.inactiveDark : colors.inactive}`
    }, index))
  });
}

export { ProgressStepBar };
//# sourceMappingURL=index.esm.js.map
