"use client";

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var jsxRuntime = require('react/jsx-runtime');
var classVarianceAuthority = require('class-variance-authority');
var ThemeContext = require('../../contexts/ThemeContext.cjs.js');
var useColorScheme = require('../../hooks/useColorScheme.cjs.js');

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
      xs: 'px-[0.5rem] py-[0.25rem] rounded-[0.25rem]',
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
  }, {
    theme: 'dark',
    colorScheme: 'white',
    clickable: true,
    class: 'hover:bg-gray-100'
  },
  // lightGray scheme hover
  {
    theme: 'light',
    colorScheme: 'lightGray',
    clickable: true,
    class: 'hover:bg-dash-primary-die'
  }, {
    theme: 'dark',
    colorScheme: 'lightGray',
    clickable: true,
    class: 'hover:bg-gray-600'
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
  var _b;
  var {
      as,
      link = '',
      colorScheme,
      colorSchemeLight,
      colorSchemeDark,
      size,
      clickable = false,
      loading,
      border,
      className = '',
      children
    } = _a,
    props = tslib.__rest(_a, ["as", "link", "colorScheme", "colorSchemeLight", "colorSchemeDark", "size", "clickable", "loading", "border", "className", "children"]);
  const {
    theme
  } = ThemeContext.useTheme();
  const effectiveColorScheme = (_b = useColorScheme.useColorScheme(colorScheme, colorSchemeLight, colorSchemeDark)) !== null && _b !== void 0 ? _b : 'default';
  const isClickable = Boolean(link !== '' || clickable);
  const classes = valueCard({
    theme,
    colorScheme: effectiveColorScheme,
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
