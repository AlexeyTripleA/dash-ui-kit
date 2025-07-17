"use client";

import { __rest } from 'tslib';
import { jsx } from 'react/jsx-runtime';
import { cva } from 'class-variance-authority';
import { useTheme } from '../../contexts/ThemeContext.esm.js';

const textStyles = cva('', {
  variants: {
    reset: {
      false: 'inline whitespace-normal',
      true: ''
    },
    theme: {
      light: 'text-gray-900',
      dark: 'text-gray-100'
    },
    color: {
      default: '',
      blue: '!text-brand-dark dark:text-brand-dim',
      red: 'text-red-700'
    },
    size: {
      xs: 'text-[0.625rem]',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl'
    },
    weight: {
      normal: 'font-normal',
      500: 'font-medium',
      bold: 'font-bold'
    },
    italic: {
      false: '',
      true: 'italic'
    },
    underline: {
      false: '',
      true: 'underline'
    },
    lineThrough: {
      false: '',
      true: 'line-through'
    },
    transform: {
      none: '',
      uppercase: 'uppercase',
      capitalize: 'capitalize'
    },
    opacity: {
      0: 'opacity-0',
      10: 'opacity-10',
      20: 'opacity-20',
      30: 'opacity-30',
      40: 'opacity-40',
      50: 'opacity-50',
      60: 'opacity-60',
      70: 'opacity-70',
      80: 'opacity-80',
      90: 'opacity-90',
      100: 'opacity-100'
    },
    monospace: {
      false: '',
      true: 'font-grotesque'
    },
    dim: {
      false: '',
      true: '!opacity-60'
    }
  },
  defaultVariants: {
    reset: false,
    theme: 'light',
    color: 'default',
    size: 'md',
    weight: 'normal',
    italic: false,
    underline: false,
    lineThrough: false,
    transform: 'none',
    opacity: 100,
    monospace: false,
    dim: false
  }
});
/**
 * A versatile text component with size, color, weight, decoration,
 * transform, opacity, monospace, dimming, and theme-aware defaults.
 */
const Text = _a => {
  var {
      as,
      className = '',
      children
    } = _a,
    variantProps = __rest(_a, ["as", "className", "children"]);
  const {
    theme
  } = useTheme();
  const classes = textStyles(Object.assign(Object.assign({}, variantProps), {
    theme
  })) + (className !== '' ? ` ${className}` : '');
  const Component = as !== null && as !== void 0 ? as : 'span';
  return jsx(Component, {
    className: classes,
    children: children
  });
};

export { Text, Text as default };
//# sourceMappingURL=index.esm.js.map
