"use client";

'use strict';

var jsxRuntime = require('react/jsx-runtime');
var ThemeContext = require('../../contexts/ThemeContext.cjs.js');
var useColorScheme = require('../../hooks/useColorScheme.cjs.js');

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
  } = ThemeContext.useTheme();
  const effectiveColor = (_a = useColorScheme.useColorScheme(color, colorLight, colorDark)) !== null && _a !== void 0 ? _a : 'black';
  const Component = as;
  const classes = [sizeClasses[size], weightClasses[weight], colorClasses[theme][effectiveColor], 'tracking-[-0.4px]', className].filter(Boolean).join(' ');
  return jsxRuntime.jsx(Component, {
    className: classes,
    children: children
  });
};

exports.Heading = Heading;
//# sourceMappingURL=index.cjs.js.map
