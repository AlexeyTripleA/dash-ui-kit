"use client";

import { jsx } from 'react/jsx-runtime';
import { useTheme } from '../../contexts/ThemeContext.esm.js';
import { useColorScheme } from '../../hooks/useColorScheme.esm.js';

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-[2.375rem] leading-[1.3]',
  '3xl': 'text-[3rem] leading-[1.2]'
};
const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold'
};
const colorClasses = {
  light: {
    black: 'text-black',
    gray: 'text-gray-600',
    blue: 'text-blue-600',
    red: 'text-red-600',
    green: 'text-green-600'
  },
  dark: {
    black: 'text-white',
    gray: 'text-gray-300',
    blue: 'text-blue-400',
    red: 'text-red-400',
    green: 'text-green-400'
  }
};
const Heading = ({
  as = 'h1',
  size = '2xl',
  weight = 'extrabold',
  color,
  colorLight,
  colorDark,
  className = '',
  children
}) => {
  var _a;
  const {
    theme
  } = useTheme();
  const effectiveColor = (_a = useColorScheme(color, colorLight, colorDark)) !== null && _a !== void 0 ? _a : 'black';
  const Component = as;
  const classes = [sizeClasses[size], weightClasses[weight], colorClasses[theme][effectiveColor], 'tracking-[-0.4px]', className].filter(Boolean).join(' ');
  return jsx(Component, {
    className: classes,
    children: children
  });
};

export { Heading };
//# sourceMappingURL=index.esm.js.map
