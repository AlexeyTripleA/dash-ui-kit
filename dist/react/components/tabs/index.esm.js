"use client";

import { jsxs, jsx } from 'react/jsx-runtime';
import React__default from 'react';
import { Root as Root2, List, Trigger, Content } from '../../node_modules/@radix-ui/react-tabs/dist/index.esm.js';
import { cva } from 'class-variance-authority';
import { useTheme } from '../../contexts/ThemeContext.esm.js';

const tabsRootStyles = cva('flex flex-col w-full', {
  variants: {
    theme: {
      light: '',
      dark: ''
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
const tabsListStyles = cva('flex relative overflow-x-auto scrollbar-hide after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:transition-colors', {
  variants: {
    theme: {
      light: 'after:bg-[rgba(12,28,51,0.15)]',
      dark: 'after:bg-gray-600/50'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
const tabsTriggerStyles = cva(['flex items-center justify-center relative', 'font-dash-main font-light', 'transition-all duration-200 ease-in-out cursor-pointer', 'hover:opacity-80', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500', 'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50', 'whitespace-nowrap flex-shrink-0', 'after:absolute after:bottom-0 after:left-[-0.25rem] after:w-full after:h-[1px] after:bg-transparent after:transition-colors after:duration-200 after:z-10'], {
  variants: {
    theme: {
      light: '',
      dark: ''
    },
    active: {
      true: '',
      false: ''
    },
    size: {
      sm: 'text-sm leading-[1.25] tracking-[-0.02em] px-0 pr-3 pb-2 after:right-3',
      lg: 'text-xl leading-[1.3] tracking-[-0.025em] px-0 pr-4 pb-3 after:right-4',
      xl: 'text-2xl leading-[1.366] tracking-[-0.03em] px-0 pr-[0.875rem] pb-[10px] after:right-[0.875rem]'
    }
  },
  compoundVariants: [{
    theme: 'light',
    active: true,
    class: 'text-dash-primary-dark-blue [text-shadow:0.2px_0_0_currentColor,_-0.2px_0_0_currentColor] after:!bg-[#4C7EFF]'
  }, {
    theme: 'light',
    active: false,
    class: 'text-[rgba(12,28,51,0.35)]'
  }, {
    theme: 'dark',
    active: true,
    class: 'text-white [text-shadow:0.2px_0_0_currentColor,_-0.2px_0_0_currentColor] after:!bg-[#4C7EFF]'
  }, {
    theme: 'dark',
    active: false,
    class: 'text-gray-400'
  }],
  defaultVariants: {
    theme: 'light',
    active: false,
    size: 'xl'
  }
});
const tabsContentStyles = cva('focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500', {
  variants: {
    theme: {
      light: '',
      dark: ''
    },
    size: {
      sm: 'mt-2',
      lg: 'mt-3',
      xl: 'mt-4'
    }
  },
  defaultVariants: {
    theme: 'light',
    size: 'xl'
  }
});
/**
 * Tabs component with sleek underline style matching Figma design.
 * Built on radix-ui with light/dark theme support and keyboard navigation.
 */
const Tabs = ({
  items,
  value,
  defaultValue,
  onValueChange,
  size = 'xl',
  className = '',
  listClassName = '',
  triggerClassName = '',
  contentClassName = ''
}) => {
  var _a;
  const {
    theme
  } = useTheme();
  const [internalValue, setInternalValue] = React__default.useState(defaultValue || ((_a = items[0]) === null || _a === void 0 ? void 0 : _a.value) || '');
  // Use controlled value if provided, otherwise use internal state
  const currentValue = value !== undefined ? value : internalValue;
  const handleValueChange = newValue => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(newValue);
  };
  const rootClasses = tabsRootStyles({
    theme
  }) + (className ? ` ${className}` : '');
  const listClasses = tabsListStyles({
    theme
  }) + (listClassName ? ` ${listClassName}` : '');
  const contentClasses = tabsContentStyles({
    theme,
    size
  }) + (contentClassName ? ` ${contentClassName}` : '');
  return jsxs(Root2, {
    className: rootClasses,
    value: currentValue,
    onValueChange: handleValueChange,
    children: [jsx(List, {
      className: listClasses,
      children: items.map(item => {
        const isActive = currentValue === item.value;
        const triggerClasses = tabsTriggerStyles({
          theme,
          active: isActive,
          size
        }) + (triggerClassName ? ` ${triggerClassName}` : '');
        return jsx(Trigger, {
          value: item.value,
          disabled: item.disabled,
          className: triggerClasses,
          children: item.label
        }, item.value);
      })
    }), items.map(item => jsx(Content, {
      value: item.value,
      className: contentClasses,
      children: item.content
    }, item.value))]
  });
};

export { Tabs, Tabs as default };
//# sourceMappingURL=index.esm.js.map
