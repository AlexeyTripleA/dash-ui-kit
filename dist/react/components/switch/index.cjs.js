"use client";

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var classVarianceAuthority = require('class-variance-authority');
var ThemeContext = require('../../contexts/ThemeContext.cjs.js');

const switchContainer = classVarianceAuthority.cva('flex transition-all duration-200 font-inter gap-2', {
  variants: {
    theme: {
      light: 'bg-white border border-gray-100',
      dark: 'bg-dash-primary-dark-blue/10 outline outline-1 outline-white/15 outline-offset-[-1px]'
    },
    size: {
      sm: 'p-1 rounded-xl',
      md: 'p-2 rounded-2xl',
      xl: 'p-3 rounded-3xl'
    },
    disabled: {
      false: '',
      true: 'opacity-60 cursor-not-allowed'
    }
  },
  compoundVariants: [
  // Light theme shadows
  {
    theme: 'light',
    size: 'sm',
    class: 'shadow-sm'
  }, {
    theme: 'light',
    size: 'md',
    class: 'shadow-lg'
  }, {
    theme: 'light',
    size: 'xl',
    class: 'shadow-xl'
  },
  // Dark theme shadows with brand color
  {
    theme: 'dark',
    size: 'sm',
    class: 'shadow-sm shadow-dash-brand/10'
  }, {
    theme: 'dark',
    size: 'md',
    class: 'shadow-lg shadow-dash-brand/10'
  }, {
    theme: 'dark',
    size: 'xl',
    class: 'shadow-xl shadow-dash-brand/10'
  }],
  defaultVariants: {
    theme: 'light',
    size: 'md',
    disabled: false
  }
});
const switchButton = classVarianceAuthority.cva('flex-1 text-center transition-all duration-200 font-medium whitespace-nowrap cursor-pointer font-dash-main', {
  variants: {
    theme: {
      light: '',
      dark: ''
    },
    size: {
      sm: 'py-1 px-2 rounded-lg text-sm',
      md: 'py-2 px-3 rounded-[0.625rem] text-[1rem]',
      xl: 'py-3 px-6 rounded-2xl text-lg font-semibold'
    },
    selected: {
      true: '',
      false: ''
    },
    disabled: {
      false: '',
      true: 'cursor-not-allowed opacity-50'
    }
  },
  compoundVariants: [
  // Selected state - light theme
  {
    theme: 'light',
    selected: true,
    class: 'bg-dash-brand text-white'
  },
  // Selected state - dark theme
  {
    theme: 'dark',
    selected: true,
    class: 'bg-dash-brand text-white'
  },
  // Unselected state - light theme
  {
    theme: 'light',
    selected: false,
    disabled: false,
    class: 'text-dash-brand hover:bg-dash-brand/10 active:bg-dash-brand/20'
  },
  // Unselected state - dark theme
  {
    theme: 'dark',
    selected: false,
    disabled: false,
    class: 'text-dash-brand hover:bg-dash-brand/10 active:bg-dash-brand/20'
  },
  // Disabled state - light theme
  {
    theme: 'light',
    selected: false,
    disabled: true,
    class: 'text-gray-400'
  },
  // Disabled state - dark theme
  {
    theme: 'dark',
    selected: false,
    disabled: true,
    class: 'text-gray-500'
  }],
  defaultVariants: {
    theme: 'light',
    size: 'md',
    selected: false,
    disabled: false
  }
});
/**
 * A switch component for selecting between multiple options.
 * Supports individual option disabling, hover states, and responsive sizing.
 * Uses dash design system sizing and theming with automatic light/dark mode.
 * @example
 * // With disabled options
 * <Switch
 *   options={[
 *     { label: 'Basic', value: 'basic' },
 *     { label: 'Pro', value: 'pro', disabled: true },
 *     { label: 'Free', value: 'free' }
 *   ]}
 *   value="basic"
 *   onChange={(value) => console.log(value)}
 * />
 */
function Switch({
  options,
  value,
  onChange,
  size = 'md',
  className = '',
  disabled = false
}) {
  const {
    theme
  } = ThemeContext.useTheme();
  const containerClasses = switchContainer({
    theme,
    size,
    disabled
  }) + ' ' + className;
  return jsxRuntime.jsx("div", {
    className: containerClasses,
    children: options.map((option, index) => {
      const isSelected = option.value === value;
      const isOptionDisabled = disabled || option.disabled;
      return jsxRuntime.jsx("button", {
        onClick: () => !isOptionDisabled && onChange(option.value),
        disabled: isOptionDisabled,
        className: switchButton({
          theme,
          size,
          selected: isSelected,
          disabled: isOptionDisabled
        }),
        children: option.label
      }, index);
    })
  });
}

exports.Switch = Switch;
exports.default = Switch;
//# sourceMappingURL=index.cjs.js.map
