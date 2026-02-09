"use client";

import { __rest } from 'tslib';
import { jsx } from 'react/jsx-runtime';
import { cva } from 'class-variance-authority';
import { useTheme } from '../../contexts/ThemeContext.esm.js';

const styles = cva(`
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
    colorScheme: 'lightGray',
    state: 'active',
    theme: 'dark',
    class: 'text-gray-300 border-gray-600/50 hover:bg-gray-700/10'
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
    colorScheme: 'lightGray',
    state: 'disabled',
    theme: 'dark',
    class: 'bg-gray-700/20 text-gray-500'
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
    colorScheme: 'lightGray',
    state: 'disabled',
    theme: 'dark',
    class: 'text-gray-300/40 border-gray-600/30'
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
  var {
      children,
      variant,
      colorScheme,
      size,
      rounded,
      disabled = false,
      className = ''
    } = _a,
    props = __rest(_a, ["children", "variant", "colorScheme", "size", "rounded", "disabled", "className"]);
  const {
    theme
  } = useTheme();
  const state = disabled ? 'disabled' : 'active';
  const classes = styles({
    theme,
    variant,
    colorScheme,
    size,
    rounded,
    state
  }) + (className !== '' ? ` ${className}` : '');
  return jsx("button", Object.assign({
    className: classes,
    disabled: disabled
  }, props, {
    children: children
  }));
};

export { Button, Button as default };
//# sourceMappingURL=index.esm.js.map
