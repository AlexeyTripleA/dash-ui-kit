"use client";

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var jsxRuntime = require('react/jsx-runtime');
var classVarianceAuthority = require('class-variance-authority');
var ThemeContext = require('../../contexts/ThemeContext.cjs.js');

const styles = classVarianceAuthority.cva(`
    dash-btn-base
    select-none
    min-h-11
    flex
    items-center
    capitalize
    transition-colors
    hover:cursor-pointer
    justify-center
    font-dash-main
  `, {
  variants: {
    theme: {
      light: '',
      dark: ''
    },
    variant: {
      solid: '',
      outline: 'dash-btn-outline border !bg-transparent'
    },
    colorScheme: {
      brand: '',
      mint: '',
      gray: '',
      red: '',
      lightBlue: '',
      lightGray: ''
    },
    state: {
      active: 'active:-translate-y-[-1px]',
      disabled: 'hover:!cursor-not-allowed'
    },
    size: {
      sm: 'dash-block-sm',
      md: 'dash-block-md',
      xl: 'dash-block-xl'
    }
  },
  compoundVariants: [
  // solid variant color schemes - light theme
  {
    variant: 'solid',
    colorScheme: 'brand',
    theme: 'light',
    class: '!bg-dash-brand text-white hover:!bg-dash-brand/80'
  }, {
    variant: 'solid',
    colorScheme: 'mint',
    theme: 'light',
    class: '!bg-dash-mint !text-black hover:!bg-dash-mint/80'
  }, {
    variant: 'solid',
    colorScheme: 'gray',
    theme: 'light',
    class: '!bg-gray-200 !text-gray-700 hover:!bg-gray-300'
  }, {
    variant: 'solid',
    colorScheme: 'red',
    theme: 'light',
    class: '!bg-red-200 !text-red-700 hover:!bg-red-300'
  }, {
    variant: 'solid',
    colorScheme: 'lightBlue',
    theme: 'light',
    class: '!bg-dash-brand/10 !text-dash-brand hover:!bg-dash-brand/20'
  }, {
    variant: 'solid',
    colorScheme: 'lightGray',
    theme: 'light',
    class: '!bg-[rgba(12,28,51,0.03)] !text-[#0C1C33] hover:!bg-[rgba(12,28,51,0.06)]'
  },
  // solid variant color schemes - dark theme
  {
    variant: 'solid',
    colorScheme: 'brand',
    theme: 'dark',
    class: '!bg-dash-brand !text-white hover:!bg-dash-brand/80'
  }, {
    variant: 'solid',
    colorScheme: 'mint',
    theme: 'dark',
    class: '!bg-dash-mint !text-black hover:!bg-dash-mint/80'
  }, {
    variant: 'solid',
    colorScheme: 'gray',
    theme: 'dark',
    class: '!bg-gray-600 !text-gray-100 hover:!bg-gray-500'
  }, {
    variant: 'solid',
    colorScheme: 'red',
    theme: 'dark',
    class: '!bg-red-600 !text-red-100 hover:!bg-red-500'
  }, {
    variant: 'solid',
    colorScheme: 'lightBlue',
    theme: 'dark',
    class: '!bg-dash-brand/20 !text-dash-brand hover:!bg-dash-brand/30'
  }, {
    variant: 'solid',
    colorScheme: 'lightGray',
    theme: 'dark',
    class: '!bg-gray-700/20 !text-gray-300 hover:!bg-gray-600/30'
  },
  // outline variant - light theme
  {
    variant: 'outline',
    state: 'disabled',
    theme: 'light',
    class: 'opacity-40'
  }, {
    variant: 'outline',
    state: 'disabled',
    theme: 'dark',
    class: 'opacity-50'
  }, {
    variant: 'outline',
    colorScheme: 'brand',
    theme: 'light',
    class: '!text-dash-brand !border-dash-brand hover:!bg-dash-brand/10'
  }, {
    variant: 'outline',
    colorScheme: 'brand',
    theme: 'dark',
    class: '!text-dash-brand !border-dash-brand hover:!bg-dash-brand/20'
  }, {
    variant: 'outline',
    colorScheme: 'mint',
    theme: 'light',
    class: '!text-dash-mint !border-dash-mint hover:!bg-dash-mint/10'
  }, {
    variant: 'outline',
    colorScheme: 'mint',
    theme: 'dark',
    class: '!text-dash-mint !border-dash-mint hover:!bg-dash-mint/20'
  }, {
    variant: 'outline',
    colorScheme: 'gray',
    theme: 'light',
    class: '!text-gray-700 !border-gray-700 hover:!bg-gray-200/50'
  }, {
    variant: 'outline',
    colorScheme: 'gray',
    theme: 'dark',
    class: '!text-gray-300 !border-gray-300 hover:!bg-gray-600/20'
  }, {
    variant: 'outline',
    colorScheme: 'red',
    theme: 'light',
    class: '!text-red-700 hover:!bg-red-300/20'
  }, {
    variant: 'outline',
    colorScheme: 'red',
    theme: 'dark',
    class: '!text-red-400 hover:!bg-red-500/20'
  }, {
    variant: 'outline',
    colorScheme: 'lightBlue',
    theme: 'light',
    class: '!text-dash-brand/60 !border-dash-brand/60 hover:!bg-dash-brand/5'
  }, {
    variant: 'outline',
    colorScheme: 'lightBlue',
    theme: 'dark',
    class: '!text-dash-brand/80 !border-dash-brand/80 hover:!bg-dash-brand/10'
  }, {
    variant: 'outline',
    colorScheme: 'lightGray',
    theme: 'light',
    class: '!text-[#0C1C33] !border-[#0C1C33]/20 hover:!bg-[rgba(12,28,51,0.03)]'
  }, {
    variant: 'outline',
    colorScheme: 'lightGray',
    theme: 'dark',
    class: '!text-gray-300 !border-gray-600/50 hover:!bg-gray-700/10'
  },
  // solid variant - light theme
  {
    variant: 'solid',
    colorScheme: 'brand',
    state: 'disabled',
    theme: 'light',
    class: '!bg-dash-brand/10 !text-dash-brand-dim'
  }, {
    variant: 'solid',
    colorScheme: 'brand',
    state: 'disabled',
    theme: 'dark',
    class: '!bg-dash-brand/20 !text-dash-brand/60'
  }, {
    variant: 'solid',
    colorScheme: 'mint',
    state: 'disabled',
    theme: 'light',
    class: '!bg-dash-mint/30 !text-black/60'
  }, {
    variant: 'solid',
    colorScheme: 'mint',
    state: 'disabled',
    theme: 'dark',
    class: '!bg-dash-mint/20 !text-gray-400'
  }, {
    variant: 'solid',
    colorScheme: 'red',
    state: 'disabled',
    theme: 'light',
    class: '!bg-red-300/30 !text-black/60'
  }, {
    variant: 'solid',
    colorScheme: 'red',
    state: 'disabled',
    theme: 'dark',
    class: '!bg-red-500/20 !text-gray-400'
  }, {
    variant: 'solid',
    colorScheme: 'lightBlue',
    state: 'disabled',
    theme: 'light',
    class: '!bg-dash-brand/5 !text-dash-brand/40'
  }, {
    variant: 'solid',
    colorScheme: 'lightBlue',
    state: 'disabled',
    theme: 'dark',
    class: '!bg-dash-brand/10 !text-dash-brand/50'
  }, {
    variant: 'solid',
    colorScheme: 'lightGray',
    state: 'disabled',
    theme: 'light',
    class: '!bg-[#0C1C33]/5 !text-[#0C1C33]/40'
  }, {
    variant: 'solid',
    colorScheme: 'lightGray',
    state: 'disabled',
    theme: 'dark',
    class: '!bg-gray-700/20 !text-gray-500'
  }],
  defaultVariants: {
    theme: 'light',
    variant: 'solid',
    colorScheme: 'brand',
    state: 'active',
    size: 'md'
  }
});
/**
 * Button with solid or outline style, color schemes, disabled state,
 * press animation, and customizable size. Supports light/dark theme.
 */
const Button = _a => {
  var {
      children,
      variant,
      colorScheme,
      size,
      disabled = false,
      className = ''
    } = _a,
    props = tslib.__rest(_a, ["children", "variant", "colorScheme", "size", "disabled", "className"]);
  const {
    theme
  } = ThemeContext.useTheme();
  const state = disabled ? 'disabled' : 'active';
  const classes = styles({
    theme,
    variant,
    colorScheme,
    size,
    state
  }) + (className !== '' ? ` ${className}` : '');
  return jsxRuntime.jsx("button", Object.assign({
    className: classes,
    disabled: disabled
  }, props, {
    children: children
  }));
};

exports.Button = Button;
exports.default = Button;
//# sourceMappingURL=index.cjs.js.map
