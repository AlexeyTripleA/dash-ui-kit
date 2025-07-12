"use client";

import { __rest } from '../../node_modules/tslib/tslib.es6.esm.js';
import { jsx } from 'react/jsx-runtime';
import { cva } from '../../node_modules/class-variance-authority/dist/index.esm.js';

const styles = cva(`
    btn-base
    select-none
    min-h-11
    flex
    items-center
    font-bold
    capitalize
    transition-colors
    hover:cursor-pointer
    justify-center
    font-main
  `, {
  variants: {
    variant: {
      solid: '',
      outline: 'border !bg-transparent'
    },
    colorScheme: {
      brand: 'bg-brand hover:bg-brand/80 text-white',
      mint: 'bg-mint hover:bg-mint/80 text-black',
      gray: 'bg-gray-200 hover:bg-gray-300 text-gray-700',
      red: 'bg-red-200 hover:bg-red-300 text-red-700'
    },
    state: {
      active: 'active:-translate-y-[-1px]',
      disabled: 'hover:!cursor-not-allowed'
    },
    size: {
      sm: 'px-[1rem] py-[0.5rem] rounded-[0.625rem] !font-bold text-sm',
      md: 'px-[1.563rem] py-[0.625rem] rounded-[1.25rem] text-lg'
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
    class: '!text-brand'
  }, {
    variant: 'outline',
    colorScheme: 'mint',
    class: '!text-mint'
  }, {
    variant: 'outline',
    colorScheme: 'gray',
    class: '!text-gray-700'
  }, {
    variant: 'outline',
    colorScheme: 'red',
    class: '!text-red-700 hover:!bg-red-300/20'
  },
  // solid variant
  {
    variant: 'solid',
    colorScheme: 'brand',
    state: 'disabled',
    class: '!bg-brand/10 !text-brand-dim'
  }, {
    variant: 'solid',
    colorScheme: 'mint',
    state: 'disabled',
    class: '!bg-mint/30 !text-black/60'
  }, {
    variant: 'solid',
    colorScheme: 'red',
    state: 'disabled',
    class: '!bg-red-300/30 !text-black/60'
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
      disabled,
      className = ''
    } = _a,
    props = __rest(_a, ["children", "variant", "colorScheme", "size", "disabled", "className"]);
  const state = disabled ? 'disabled' : 'active';
  const classes = styles({
    variant,
    colorScheme,
    size,
    state
  }) + (className ? ` ${className}` : '');
  return jsx("button", Object.assign({
    className: classes,
    disabled: disabled
  }, props, {
    children: children
  }));
};

export { Button, Button as default };
//# sourceMappingURL=index.esm.js.map
