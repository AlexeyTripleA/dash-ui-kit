"use client";

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var classVarianceAuthority = require('class-variance-authority');
var ThemeContext = require('../../contexts/ThemeContext.cjs.js');

const bigNumberStyles = classVarianceAuthority.cva('inline-flex whitespace-nowrap gap-1', {
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
  } = ThemeContext.useTheme();
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
    return jsxRuntime.jsxs("span", {
      className: `${bigNumberStyles({
        theme
      })} ${className}`,
      children: [groups.map((grp, i) => jsxRuntime.jsx("span", {
        children: grp
      }, i)), fracPart != null && jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [jsxRuntime.jsx("span", {
          style: decimalPointStyle,
          children: "."
        }), jsxRuntime.jsx("span", {
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
    return jsxRuntime.jsxs("span", {
      className: `${bigNumberStyles({
        theme
      })} ${className}`,
      children: [groups.map((grp, i) => jsxRuntime.jsxs("span", {
        children: [jsxRuntime.jsx("span", {
          children: grp
        }), i < groups.length - 1 && jsxRuntime.jsx("span", {
          children: ","
        })]
      }, i)), fracPart != null && jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [jsxRuntime.jsx("span", {
          style: decimalPointStyle,
          children: "."
        }), jsxRuntime.jsx("span", {
          children: fracPart
        })]
      })]
    });
  }
};

exports.BigNumber = BigNumber;
exports.default = BigNumber;
//# sourceMappingURL=index.cjs.js.map
