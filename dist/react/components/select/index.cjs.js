"use client";

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var jsxRuntime = require('react/jsx-runtime');
var classVarianceAuthority = require('class-variance-authority');
var ThemeContext = require('../../contexts/ThemeContext.cjs.js');
var index = require('../../node_modules/@radix-ui/react-select/dist/index.cjs.js');

const selectTrigger = classVarianceAuthority.cva('w-full transition-all font-inter appearance-none cursor-pointer relative text-[0.875rem] leading-[1.0625rem] focus:ring-2 inline-flex items-center justify-between outline-none', {
  variants: {
    theme: {
      light: 'text-[#0C1C33] bg-white',
      dark: 'text-white bg-gray-800'
    },
    colorScheme: {
      default: 'focus:ring-blue-500/20',
      brand: 'focus:ring-dash-brand/20',
      error: 'focus:ring-red-500/20',
      success: 'focus:ring-green-500/20'
    },
    size: {
      sm: 'dash-block-sm',
      md: 'dash-block-md',
      xl: 'dash-block-xl'
    },
    border: {
      true: 'outline outline-1 outline-offset-[-1px]',
      false: ''
    },
    disabled: {
      false: '',
      true: 'opacity-60 cursor-not-allowed'
    }
  },
  compoundVariants: [
  // Outline colors by colorScheme - only when border is true
  {
    colorScheme: 'default',
    border: true,
    class: 'outline-[rgba(12,28,51,0.35)] focus:outline-[rgba(12,28,51,0.6)]'
  }, {
    colorScheme: 'brand',
    border: true,
    class: 'outline-dash-brand/30 focus:outline-dash-brand'
  }, {
    colorScheme: 'error',
    border: true,
    class: 'outline-red-500 focus:outline-red-500'
  }, {
    colorScheme: 'success',
    border: true,
    class: 'outline-green-500 focus:outline-green-500'
  }],
  defaultVariants: {
    theme: 'light',
    colorScheme: 'default',
    size: 'xl',
    border: true,
    disabled: false
  }
});
const selectContent = classVarianceAuthority.cva('overflow-hidden z-50 rounded-md shadow-lg min-w-[var(--radix-select-trigger-width)] w-full', {
  variants: {
    theme: {
      light: 'bg-white border border-gray-200',
      dark: 'bg-gray-800 border border-gray-700'
    }
  }
});
const selectItem = classVarianceAuthority.cva('relative flex cursor-pointer select-none items-center rounded-sm py-1.5 text-sm outline-none focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50', {
  variants: {
    theme: {
      light: 'text-gray-900 focus:bg-gray-100',
      dark: 'text-gray-100 focus:bg-gray-700'
    },
    size: {
      sm: 'px-2 py-1',
      md: 'px-3 py-1.5',
      xl: 'px-4 py-2'
    }
  }
});
const selectIcon = classVarianceAuthority.cva('pointer-events-none flex items-center justify-center transition-transform', {
  variants: {
    size: {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      xl: 'w-4 h-4'
    }
  }
});
// Иконка стрелки
const ChevronDownIcon = ({
  className
}) => jsxRuntime.jsx("svg", {
  width: "15",
  height: "15",
  viewBox: "0 0 15 15",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  className: className,
  children: jsxRuntime.jsx("path", {
    d: "m4.93179 5.43179c0.20081-0.20081 0.52632-0.20081 0.72713 0l2.34108 2.34108 2.34108-2.34108c0.20081-0.20081 0.52632-0.20081 0.72713 0s0.20081 0.52632 0 0.72713l-2.70455 2.70455c-0.20081 0.20081-0.52632 0.20081-0.72713 0l-2.70455-2.70455c-0.20081-0.20081-0.20081-0.52632 0-0.72713z",
    fill: "currentColor",
    fillRule: "evenodd",
    clipRule: "evenodd"
  })
});
/**
 * A versatile select component built on Radix UI that adapts to light/dark theme,
 * supports various color schemes, sizes, variants, states, and HTML content in options.
 *
 * @example
 * <Select
 *   options={[
 *     {value: 'id1', label: 'Option 1'},
 *     {value: 'id2', label: 'Option 2', content: <div><strong>Option 2</strong><br/>Description</div>}
 *   ]}
 *   colorScheme="default"
 *   size="xl"
 *   border={true}
 * />
 */
const Select = _a => {
  var {
      className = '',
      colorScheme,
      size,
      error = false,
      success = false,
      border = true,
      disabled = false,
      options = [],
      showArrow = true,
      value,
      defaultValue,
      onValueChange,
      placeholder = 'Select an option...',
      name
    } = _a;
    tslib.__rest(_a, ["className", "colorScheme", "size", "error", "success", "border", "disabled", "options", "showArrow", "value", "defaultValue", "onValueChange", "placeholder", "name"]);
  const {
    theme
  } = ThemeContext.useTheme();
  // Determine color scheme based on state
  let finalColorScheme = colorScheme;
  if (error) finalColorScheme = 'error';else if (success) finalColorScheme = 'success';
  const triggerClasses = selectTrigger({
    theme,
    colorScheme: finalColorScheme,
    size,
    border,
    disabled
  }) + ' ' + className;
  const contentClasses = selectContent({
    theme
  });
  const itemClasses = selectItem({
    theme,
    size
  });
  const iconClasses = selectIcon({
    size
  });
  return jsxRuntime.jsxs(index.Root, {
    value: value,
    defaultValue: defaultValue,
    onValueChange: onValueChange,
    disabled: disabled,
    name: name,
    children: [jsxRuntime.jsxs(index.Trigger, {
      className: triggerClasses,
      children: [jsxRuntime.jsx(index.Value, {
        placeholder: placeholder
      }), showArrow && jsxRuntime.jsx(index.Icon, {
        asChild: true,
        children: jsxRuntime.jsx(ChevronDownIcon, {
          className: iconClasses
        })
      })]
    }), jsxRuntime.jsx(index.Portal, {
      children: jsxRuntime.jsx(index.Content, {
        className: contentClasses,
        position: "popper",
        sideOffset: 5,
        children: jsxRuntime.jsx(index.Viewport, {
          children: options.map(option => jsxRuntime.jsx(index.Item, {
            value: option.value,
            className: itemClasses,
            disabled: option.disabled,
            children: jsxRuntime.jsx(index.ItemText, {
              children: option.content || option.label
            })
          }, option.value))
        })
      })
    })]
  });
};

exports.Select = Select;
exports.default = Select;
//# sourceMappingURL=index.cjs.js.map
