"use client";

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var jsxRuntime = require('react/jsx-runtime');
var classVarianceAuthority = require('class-variance-authority');
var ThemeContext = require('../../contexts/ThemeContext.cjs.js');

const valueCard = classVarianceAuthority.cva('flex items-center transition-all outline outline-1 outline-offset-[-1px]', {
  variants: {
    theme: {
      light: 'outline-gray-200',
      dark: 'bg-gray-800/50 outline-gray-400'
    },
    colorScheme: {
      default: '',
      transparent: 'bg-transparent',
      green: 'text-green-500 bg-green-200 outline-green-400',
      lightBlue: 'bg-dash-brand-dim/10 !outline-dash-brand/20',
      white: 'bg-white',
      lightGray: 'bg-dash-primary-die-subdued',
      yellow: 'bg-dash-yellow-light !outline-dash-yellow'
    },
    size: {
      sm: 'dash-block-sm',
      md: 'dash-block-md',
      xl: 'dash-block-xl'
    },
    clickable: {
      false: '',
      true: 'cursor-pointer transition-colors active:translate-y-px active:opacity-90'
    },
    loading: {
      false: '',
      true: 'animate-pulse'
    },
    border: {
      false: '!outline-none',
      true: ''
    }
  },
  compoundVariants: [
  // default scheme hover
  {
    theme: 'light',
    colorScheme: 'default',
    clickable: true,
    class: 'hover:bg-gray-200/50'
  }, {
    theme: 'dark',
    colorScheme: 'default',
    clickable: true,
    class: 'hover:bg-gray-700/50'
  },
  // transparent scheme hover
  {
    theme: 'light',
    colorScheme: 'transparent',
    clickable: true,
    class: 'hover:bg-gray-100'
  }, {
    theme: 'dark',
    colorScheme: 'transparent',
    clickable: true,
    class: 'hover:bg-gray-900'
  },
  // green scheme hover
  {
    theme: 'light',
    colorScheme: 'green',
    clickable: true,
    class: 'hover:bg-green-300'
  }, {
    theme: 'dark',
    colorScheme: 'green',
    clickable: true,
    class: 'hover:bg-green-400'
  },
  // green lightBlue
  {
    colorScheme: 'lightBlue',
    clickable: true,
    class: 'hover:bg-dash-brand/15'
  },
  // white
  {
    theme: 'light',
    colorScheme: 'white',
    clickable: true,
    class: 'hover:bg-gray-100'
  },
  // yellow scheme hover
  {
    colorScheme: 'yellow',
    clickable: true,
    class: 'hover:bg-dash-yellow'
  }],
  defaultVariants: {
    theme: 'light',
    colorScheme: 'default',
    size: 'md',
    clickable: false,
    loading: false,
    border: true
  }
});
/**
 * A card container that adapts to light/dark theme,
 * supports various color schemes, sizes, clickability,
 * loading state, and optional border styling.
 *
 * @example
 * <ValueCard colorScheme="green" border as={Link} link="/foo">
 *   Go
 * </ValueCard>
 */
const ValueCard = _a => {
  var {
      as,
      link = '',
      colorScheme,
      size,
      clickable = false,
      loading,
      border,
      className = '',
      children
    } = _a,
    props = tslib.__rest(_a, ["as", "link", "colorScheme", "size", "clickable", "loading", "border", "className", "children"]);
  const {
    theme
  } = ThemeContext.useTheme();
  const isClickable = Boolean(link !== '' || clickable);
  const classes = valueCard({
    theme,
    colorScheme,
    size,
    clickable: isClickable,
    loading,
    border
  }) + ' ' + String(className);
  // choose element: custom `as`, or <a> if link, else <div>
  const Component = as !== null && as !== void 0 ? as : link !== '' ? 'a' : 'div';
  const mergedProps = Object.assign(Object.assign({}, props), {
    className: classes
  });
  if (link !== '') mergedProps.href = link;
  return jsxRuntime.jsx(Component, Object.assign({}, mergedProps, {
    children: children
  }));
};

exports.ValueCard = ValueCard;
exports.default = ValueCard;
//# sourceMappingURL=index.cjs.js.map
