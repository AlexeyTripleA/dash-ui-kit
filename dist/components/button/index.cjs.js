'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../node_modules/tslib/tslib.es6.cjs.js');
var jsxRuntime = require('../_virtual/jsx-runtime.cjs.js');
var index = require('../node_modules/class-variance-authority/dist/index.cjs.js');

const styles = index.cva(`
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
    color: {
      brand: 'bg-brand hover:bg-brand/80 text-white',
      mint: 'bg-mint hover:bg-mint/80 text-black',
      gray: 'bg-gray-200 hover:bg-gray-300 text-gray-700'
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
    color: 'brand',
    class: '!text-brand'
  }, {
    variant: 'outline',
    color: 'mint',
    class: '!text-mint'
  }, {
    variant: 'outline',
    color: 'gray',
    class: '!text-gray-700'
  },
  // solid variant
  {
    variant: 'solid',
    color: 'brand',
    state: 'disabled',
    class: '!bg-brand/10 !text-brand-dim'
  }, {
    variant: 'solid',
    color: 'mint',
    state: 'disabled',
    class: '!bg-mint/30 !text-black/60'
  }],
  defaultVariants: {
    variant: 'solid',
    color: 'brand',
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
      color,
      size,
      disabled,
      className = ''
    } = _a,
    props = tslib_es6.__rest(_a, ["children", "variant", "color", "size", "disabled", "className"]);
  const state = disabled ? 'disabled' : 'active';
  const classes = styles({
    variant,
    color,
    size,
    state
  }) + (className ? ` ${className}` : '');
  return jsxRuntime.jsxRuntimeExports.jsx("button", Object.assign({
    className: classes,
    disabled: disabled
  }, props, {
    children: children
  }));
};

exports.Button = Button;
exports.default = Button;
//# sourceMappingURL=index.cjs.js.map
