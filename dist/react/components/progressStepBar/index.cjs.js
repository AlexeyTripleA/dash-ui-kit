"use client";

'use strict';

var jsxRuntime = require('react/jsx-runtime');
var ThemeContext = require('../../contexts/ThemeContext.cjs.js');
var useColorScheme = require('../../hooks/useColorScheme.cjs.js');

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
  } = ThemeContext.useTheme();
  const effectiveColor = (_a = useColorScheme.useColorScheme(color, colorLight, colorDark)) !== null && _a !== void 0 ? _a : 'blue';
  const colors = colorConfig[effectiveColor];
  return jsxRuntime.jsx("div", {
    className: `flex gap-2 w-full ${className}`,
    children: Array.from({
      length: totalSteps
    }, (_, index) => jsxRuntime.jsx("div", {
      className: `h-1.5 rounded-2xl flex-1 transition-colors ${index < currentStep ? theme === 'dark' ? colors.activeDark : colors.active : theme === 'dark' ? colors.inactiveDark : colors.inactive}`
    }, index))
  });
}

exports.ProgressStepBar = ProgressStepBar;
//# sourceMappingURL=index.cjs.js.map
