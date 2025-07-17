"use client";

import { __rest } from 'tslib';
import { jsx } from 'react/jsx-runtime';
import { cva } from 'class-variance-authority';

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
    variant: {
      solid: '',
      outline: 'dash-btn-outline border !bg-transparent'
    },
    colorScheme: {
      brand: 'dash-btn-brand',
      mint: 'dash-btn-mint',
      gray: 'dash-btn-gray',
      red: 'dash-btn-red',
      lightBlue: 'dash-btn-lightBlue'
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
  // outline variant
  {
    variant: 'outline',
    state: 'disabled',
    class: 'opacity-40'
  }, {
    variant: 'outline',
    colorScheme: 'brand',
    class: '!text-dash-brand'
  }, {
    variant: 'outline',
    colorScheme: 'mint',
    class: '!text-dash-mint'
  }, {
    variant: 'outline',
    colorScheme: 'gray',
    class: '!text-gray-700'
  }, {
    variant: 'outline',
    colorScheme: 'red',
    class: '!text-red-700 hover:!bg-red-300/20'
  }, {
    variant: 'outline',
    colorScheme: 'lightBlue',
    class: '!text-dash-brand/60'
  },
  // solid variant
  {
    variant: 'solid',
    colorScheme: 'brand',
    state: 'disabled',
    class: '!bg-dash-brand/10 !text-dash-brand-dim'
  }, {
    variant: 'solid',
    colorScheme: 'mint',
    state: 'disabled',
    class: '!bg-dash-mint/30 !text-black/60'
  }, {
    variant: 'solid',
    colorScheme: 'red',
    state: 'disabled',
    class: '!bg-red-300/30 !text-black/60'
  }, {
    variant: 'solid',
    colorScheme: 'lightBlue',
    state: 'disabled',
    class: '!bg-dash-brand/5 !text-dash-brand/40'
  }],
  defaultVariants: {
    variant: 'solid',
    colorScheme: 'brand',
    state: 'active',
    size: 'md'
  }
});
/**
 * Button with solid or outline style, color schemes, disabled state,
 * press animation, and customizable size.
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
    props = __rest(_a, ["children", "variant", "colorScheme", "size", "disabled", "className"]);
  const state = disabled ? 'disabled' : 'active';
  const classes = styles({
    variant,
    colorScheme,
    size,
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
