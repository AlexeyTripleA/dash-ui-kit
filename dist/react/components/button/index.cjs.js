"use client";

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var jsxRuntime = require('react/jsx-runtime');
var classVarianceAuthority = require('class-variance-authority');
var ThemeContext = require('../../contexts/ThemeContext.cjs.js');
var useColorScheme = require('../../hooks/useColorScheme.cjs.js');

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
      lightGray: '',
      white: '',
      halfWhite: '',
      halfBlue: ''
    },
    state: {
      active: 'active:-translate-y-[-1px]',
      disabled: 'hover:!cursor-not-allowed'
    },
    size: {
      sm: 'dash-block-sm',
      md: 'dash-block-md',
      xl: 'dash-block-xl'
    },
    rounded: {
      default: '',
      full: 'rounded-full'
    }
  },
  compoundVariants: [
  // solid variant color schemes - light theme
  {
    variant: 'solid',
    colorScheme: 'brand',
    state: 'active',
    theme: 'light',
    class: 'bg-dash-brand text-white hover:bg-dash-brand/80'
  }, {
    variant: 'solid',
    colorScheme: 'mint',
    state: 'active',
    theme: 'light',
    class: 'bg-dash-mint text-black hover:bg-dash-mint/80'
  }, {
    variant: 'solid',
    colorScheme: 'gray',
    state: 'active',
    theme: 'light',
    class: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
  }, {
    variant: 'solid',
    colorScheme: 'red',
    state: 'active',
    theme: 'light',
    class: 'bg-red-200 text-red-700 hover:bg-red-300'
  }, {
    variant: 'solid',
    colorScheme: 'lightBlue',
    state: 'active',
    theme: 'light',
    class: 'bg-dash-brand/10 text-dash-brand hover:bg-dash-brand/20'
  }, {
    variant: 'solid',
    colorScheme: 'lightGray',
    state: 'active',
    theme: 'light',
    class: 'bg-[rgba(12,28,51,0.03)] text-[#0C1C33] hover:bg-[rgba(12,28,51,0.06)]'
  }, {
    variant: 'solid',
    colorScheme: 'white',
    state: 'active',
    theme: 'light',
    class: 'bg-white text-dash-brand hover:bg-white/90 backdrop-blur-[10px]'
  }, {
    variant: 'solid',
    colorScheme: 'halfWhite',
    state: 'active',
    theme: 'light',
    class: 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-[10px]'
  }, {
    variant: 'solid',
    colorScheme: 'halfBlue',
    state: 'active',
    theme: 'light',
    class: 'bg-dash-brand/15 text-dash-brand hover:bg-dash-brand/25 backdrop-blur-[10px]'
  },
  // solid variant color schemes - dark theme
  {
    variant: 'solid',
    colorScheme: 'brand',
    state: 'active',
    theme: 'dark',
    class: 'bg-dash-brand text-white hover:bg-dash-brand/80'
  }, {
    variant: 'solid',
    colorScheme: 'mint',
    state: 'active',
    theme: 'dark',
    class: 'bg-dash-mint text-black hover:bg-dash-mint/80'
  }, {
    variant: 'solid',
    colorScheme: 'gray',
    state: 'active',
    theme: 'dark',
    class: 'bg-gray-600 text-gray-100 hover:bg-gray-500'
  }, {
    variant: 'solid',
    colorScheme: 'red',
    state: 'active',
    theme: 'dark',
    class: 'bg-red-600 text-red-100 hover:bg-red-500'
  }, {
    variant: 'solid',
    colorScheme: 'lightBlue',
    state: 'active',
    theme: 'dark',
    class: 'bg-dash-brand/20 text-dash-brand hover:bg-dash-brand/30'
  }, {
    variant: 'solid',
    colorScheme: 'lightGray',
    state: 'active',
    theme: 'dark',
    class: 'bg-gray-700/20 text-gray-300 hover:bg-gray-600/30'
  }, {
    variant: 'solid',
    colorScheme: 'white',
    state: 'active',
    theme: 'dark',
    class: 'bg-white text-dash-brand hover:bg-white/90 backdrop-blur-[10px]'
  }, {
    variant: 'solid',
    colorScheme: 'halfWhite',
    state: 'active',
    theme: 'dark',
    class: 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-[10px]'
  }, {
    variant: 'solid',
    colorScheme: 'halfBlue',
    state: 'active',
    theme: 'dark',
    class: 'bg-dash-brand/15 text-dash-brand hover:bg-dash-brand/25 backdrop-blur-[10px]'
  },
  // outline variant - active state
  {
    variant: 'outline',
    colorScheme: 'brand',
    state: 'active',
    theme: 'light',
    class: 'text-dash-brand border-dash-brand hover:bg-dash-brand/10'
  }, {
    variant: 'outline',
    colorScheme: 'brand',
    state: 'active',
    theme: 'dark',
    class: 'text-dash-brand border-dash-brand hover:bg-dash-brand/20'
  }, {
    variant: 'outline',
    colorScheme: 'mint',
    state: 'active',
    theme: 'light',
    class: 'text-dash-mint border-dash-mint hover:bg-dash-mint/10'
  }, {
    variant: 'outline',
    colorScheme: 'mint',
    state: 'active',
    theme: 'dark',
    class: 'text-dash-mint border-dash-mint hover:bg-dash-mint/20'
  }, {
    variant: 'outline',
    colorScheme: 'gray',
    state: 'active',
    theme: 'light',
    class: 'text-gray-700 border-gray-700 hover:bg-gray-200/50'
  }, {
    variant: 'outline',
    colorScheme: 'gray',
    state: 'active',
    theme: 'dark',
    class: 'text-gray-300 border-gray-300 hover:bg-gray-600/20'
  }, {
    variant: 'outline',
    colorScheme: 'red',
    state: 'active',
    theme: 'light',
    class: 'text-red-700 hover:bg-red-300/20'
  }, {
    variant: 'outline',
    colorScheme: 'red',
    state: 'active',
    theme: 'dark',
    class: 'text-red-400 hover:bg-red-500/20'
  }, {
    variant: 'outline',
    colorScheme: 'lightBlue',
    state: 'active',
    theme: 'light',
    class: 'text-dash-brand/60 border-dash-brand/60 hover:bg-dash-brand/5'
  }, {
    variant: 'outline',
    colorScheme: 'lightBlue',
    state: 'active',
    theme: 'dark',
    class: 'text-dash-brand/80 border-dash-brand/80 hover:bg-dash-brand/10'
  }, {
    variant: 'outline',
    colorScheme: 'lightGray',
    state: 'active',
    theme: 'light',
    class: 'text-[#0C1C33] border-[#0C1C33]/20 hover:bg-[rgba(12,28,51,0.03)]'
  }, {
    variant: 'outline',
    colorScheme: 'white',
    state: 'active',
    theme: 'light',
    class: 'text-white border-white hover:bg-white/10'
  }, {
    variant: 'outline',
    colorScheme: 'halfWhite',
    state: 'active',
    theme: 'light',
    class: 'text-white border-white/50 hover:bg-white/10'
  }, {
    variant: 'outline',
    colorScheme: 'halfBlue',
    state: 'active',
    theme: 'light',
    class: 'text-dash-brand border-dash-brand/50 hover:bg-dash-brand/10'
  }, {
    variant: 'outline',
    colorScheme: 'lightGray',
    state: 'active',
    theme: 'dark',
    class: 'text-gray-300 border-gray-600/50 hover:bg-gray-700/10'
  }, {
    variant: 'outline',
    colorScheme: 'white',
    state: 'active',
    theme: 'dark',
    class: 'text-white border-white hover:bg-white/10'
  }, {
    variant: 'outline',
    colorScheme: 'halfWhite',
    state: 'active',
    theme: 'dark',
    class: 'text-white border-white/50 hover:bg-white/10'
  }, {
    variant: 'outline',
    colorScheme: 'halfBlue',
    state: 'active',
    theme: 'dark',
    class: 'text-dash-brand border-dash-brand/50 hover:bg-dash-brand/10'
  },
  // solid variant - light theme
  {
    variant: 'solid',
    colorScheme: 'brand',
    state: 'disabled',
    theme: 'light',
    class: 'bg-dash-brand/10 text-dash-brand-dim'
  }, {
    variant: 'solid',
    colorScheme: 'brand',
    state: 'disabled',
    theme: 'dark',
    class: 'bg-dash-brand/20 text-dash-brand/60'
  }, {
    variant: 'solid',
    colorScheme: 'mint',
    state: 'disabled',
    theme: 'light',
    class: 'bg-dash-mint/30 text-black/60'
  }, {
    variant: 'solid',
    colorScheme: 'mint',
    state: 'disabled',
    theme: 'dark',
    class: 'bg-dash-mint/20 text-gray-400'
  }, {
    variant: 'solid',
    colorScheme: 'red',
    state: 'disabled',
    theme: 'light',
    class: 'bg-red-300/30 text-black/60'
  }, {
    variant: 'solid',
    colorScheme: 'red',
    state: 'disabled',
    theme: 'dark',
    class: 'bg-red-500/20 text-gray-400'
  }, {
    variant: 'solid',
    colorScheme: 'lightBlue',
    state: 'disabled',
    theme: 'light',
    class: 'bg-dash-brand/5 text-dash-brand/40'
  }, {
    variant: 'solid',
    colorScheme: 'lightBlue',
    state: 'disabled',
    theme: 'dark',
    class: 'bg-dash-brand/10 text-dash-brand/50'
  }, {
    variant: 'solid',
    colorScheme: 'lightGray',
    state: 'disabled',
    theme: 'light',
    class: 'bg-[#0C1C33]/5 text-[#0C1C33]/40'
  }, {
    variant: 'solid',
    colorScheme: 'white',
    state: 'disabled',
    theme: 'light',
    class: 'bg-white/50 text-dash-brand/40 backdrop-blur-[10px]'
  }, {
    variant: 'solid',
    colorScheme: 'halfWhite',
    state: 'disabled',
    theme: 'light',
    class: 'bg-white/10 text-white/40 backdrop-blur-[10px]'
  }, {
    variant: 'solid',
    colorScheme: 'halfBlue',
    state: 'disabled',
    theme: 'light',
    class: 'bg-dash-brand/10 text-dash-brand/40 backdrop-blur-[10px]'
  }, {
    variant: 'solid',
    colorScheme: 'lightGray',
    state: 'disabled',
    theme: 'dark',
    class: 'bg-gray-700/20 text-gray-500'
  }, {
    variant: 'solid',
    colorScheme: 'white',
    state: 'disabled',
    theme: 'dark',
    class: 'bg-white/50 text-dash-brand/40 backdrop-blur-[10px]'
  }, {
    variant: 'solid',
    colorScheme: 'halfWhite',
    state: 'disabled',
    theme: 'dark',
    class: 'bg-white/10 text-white/40 backdrop-blur-[10px]'
  }, {
    variant: 'solid',
    colorScheme: 'halfBlue',
    state: 'disabled',
    theme: 'dark',
    class: 'bg-dash-brand/10 text-dash-brand/40 backdrop-blur-[10px]'
  },
  // outline variant - disabled state
  {
    variant: 'outline',
    colorScheme: 'brand',
    state: 'disabled',
    theme: 'light',
    class: 'text-dash-brand/40 border-dash-brand/40'
  }, {
    variant: 'outline',
    colorScheme: 'brand',
    state: 'disabled',
    theme: 'dark',
    class: 'text-dash-brand/40 border-dash-brand/40'
  }, {
    variant: 'outline',
    colorScheme: 'mint',
    state: 'disabled',
    theme: 'light',
    class: 'text-dash-mint/40 border-dash-mint/40'
  }, {
    variant: 'outline',
    colorScheme: 'mint',
    state: 'disabled',
    theme: 'dark',
    class: 'text-dash-mint/40 border-dash-mint/40'
  }, {
    variant: 'outline',
    colorScheme: 'gray',
    state: 'disabled',
    theme: 'light',
    class: 'text-gray-700/40 border-gray-700/40'
  }, {
    variant: 'outline',
    colorScheme: 'gray',
    state: 'disabled',
    theme: 'dark',
    class: 'text-gray-300/40 border-gray-300/40'
  }, {
    variant: 'outline',
    colorScheme: 'red',
    state: 'disabled',
    theme: 'light',
    class: 'text-red-700/40 border-red-700/40'
  }, {
    variant: 'outline',
    colorScheme: 'red',
    state: 'disabled',
    theme: 'dark',
    class: 'text-red-400/40 border-red-400/40'
  }, {
    variant: 'outline',
    colorScheme: 'lightBlue',
    state: 'disabled',
    theme: 'light',
    class: 'text-dash-brand/30 border-dash-brand/30'
  }, {
    variant: 'outline',
    colorScheme: 'lightBlue',
    state: 'disabled',
    theme: 'dark',
    class: 'text-dash-brand/30 border-dash-brand/30'
  }, {
    variant: 'outline',
    colorScheme: 'lightGray',
    state: 'disabled',
    theme: 'light',
    class: 'text-[#0C1C33]/30 border-[#0C1C33]/20'
  }, {
    variant: 'outline',
    colorScheme: 'white',
    state: 'disabled',
    theme: 'light',
    class: 'text-white/40 border-white/40'
  }, {
    variant: 'outline',
    colorScheme: 'halfWhite',
    state: 'disabled',
    theme: 'light',
    class: 'text-white/30 border-white/30'
  }, {
    variant: 'outline',
    colorScheme: 'halfBlue',
    state: 'disabled',
    theme: 'light',
    class: 'text-dash-brand/30 border-dash-brand/30'
  }, {
    variant: 'outline',
    colorScheme: 'lightGray',
    state: 'disabled',
    theme: 'dark',
    class: 'text-gray-300/40 border-gray-600/30'
  }, {
    variant: 'outline',
    colorScheme: 'white',
    state: 'disabled',
    theme: 'dark',
    class: 'text-white/40 border-white/40'
  }, {
    variant: 'outline',
    colorScheme: 'halfWhite',
    state: 'disabled',
    theme: 'dark',
    class: 'text-white/30 border-white/30'
  }, {
    variant: 'outline',
    colorScheme: 'halfBlue',
    state: 'disabled',
    theme: 'dark',
    class: 'text-dash-brand/30 border-dash-brand/30'
  }],
  defaultVariants: {
    theme: 'light',
    variant: 'solid',
    colorScheme: 'brand',
    state: 'active',
    size: 'md',
    rounded: 'default'
  }
});
/**
 * Button with solid or outline style, color schemes, disabled state,
 * press animation, and customizable size. Supports light/dark theme.
 */
const Button = _a => {
  var _b;
  var {
      children,
      variant,
      colorScheme,
      colorSchemeLight,
      colorSchemeDark,
      size,
      rounded,
      disabled = false,
      className = ''
    } = _a,
    props = tslib.__rest(_a, ["children", "variant", "colorScheme", "colorSchemeLight", "colorSchemeDark", "size", "rounded", "disabled", "className"]);
  const {
    theme
  } = ThemeContext.useTheme();
  const effectiveColorScheme = (_b = useColorScheme.useColorScheme(colorScheme, colorSchemeLight, colorSchemeDark)) !== null && _b !== void 0 ? _b : 'brand';
  const state = disabled ? 'disabled' : 'active';
  const classes = styles({
    theme,
    variant,
    colorScheme: effectiveColorScheme,
    size,
    rounded,
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
