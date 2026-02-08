"use client";

import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { cva } from 'class-variance-authority';
import { useTheme } from '../../contexts/ThemeContext.esm.js';

const bigNumberStyles = cva('inline-flex whitespace-nowrap gap-1', {
  variants: {
    theme: {
      light: 'text-gray-900',
      dark: 'text-gray-100'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
/**
 * Splits a numeric string into groups of three characters for display.
 * Supports two variants:
 * - `space`: groups separated by gap
 * - `comma`: groups separated by commas, with decimal part after `.`
 * Supports light/dark theme.
 */
const BigNumber = ({
  children,
  variant = 'space',
  className = '',
  decimalPointSpacing = -2
}) => {
  const {
    theme
  } = useTheme();
  const decimalPointStyle = {
    marginLeft: `${decimalPointSpacing}px`,
    marginRight: `${decimalPointSpacing}px`
  };
  if (children === undefined || children === null) return null;
  const str = children.toString();
  if (variant === 'space') {
    // Split into integer and decimal parts
    const [intPart, fracPart] = str.split('.');
    // group digits every 3, right to left (only for integer part)
    const groups = intPart.split('').reverse().reduce((acc, char, idx) => {
      if (idx % 3 === 0) acc.unshift('');
      acc[0] = char + acc[0];
      return acc;
    }, []);
    return jsxs("span", {
      className: `${bigNumberStyles({
        theme
      })} ${className}`,
      children: [groups.map((grp, i) => jsx("span", {
        children: grp
      }, i)), fracPart != null && jsxs(Fragment, {
        children: [jsx("span", {
          style: decimalPointStyle,
          children: "."
        }), jsx("span", {
          children: fracPart
        })]
      })]
    });
  } else {
    // comma variant
    const [intPart, fracPart] = str.split('.');
    const groups = intPart.split('').reverse().reduce((acc, char, idx) => {
      if (idx % 3 === 0) acc.unshift('');
      acc[0] = char + acc[0];
      return acc;
    }, []);
    return jsxs("span", {
      className: `${bigNumberStyles({
        theme
      })} ${className}`,
      children: [groups.map((grp, i) => jsxs("span", {
        children: [jsx("span", {
          children: grp
        }), i < groups.length - 1 && jsx("span", {
          children: ","
        })]
      }, i)), fracPart != null && jsxs(Fragment, {
        children: [jsx("span", {
          style: decimalPointStyle,
          children: "."
        }), jsx("span", {
          children: fracPart
        })]
      })]
    });
  }
};

export { BigNumber, BigNumber as default };
//# sourceMappingURL=index.esm.js.map
