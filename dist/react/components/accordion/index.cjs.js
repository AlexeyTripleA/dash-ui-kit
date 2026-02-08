"use client";

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var index = require('../../node_modules/@radix-ui/react-accordion/dist/index.cjs.js');
var classVarianceAuthority = require('class-variance-authority');
var ThemeContext = require('../../contexts/ThemeContext.cjs.js');
var index$1 = require('../icons/index.cjs.js');

const accordionRootStyles = classVarianceAuthority.cva(`
    w-full
    rounded-[1rem]
    overflow-hidden
  `, {
  variants: {
    theme: {
      light: 'bg-dash-primary-dark-blue/[0.05]',
      dark: 'bg-gray-800/20'
    },
    border: {
      true: 'ring-1 ring-dash-primary-dark-blue/10',
      false: ''
    }
  },
  defaultVariants: {
    theme: 'light',
    border: false
  }
});
const accordionItemStyles = classVarianceAuthority.cva(`
    border-none
    outline-none
  `);
const accordionTriggerStyles = classVarianceAuthority.cva(`
    w-full
    p-[0.875rem]
    flex
    items-center
    justify-between
    font-dash-main
    font-medium
    text-[0.875rem]
    leading-[1.366]
    text-dash-primary-dark-blue
    bg-transparent
    border-none
    outline-none
    cursor-pointer
    transition-all
    duration-300
    ease-in-out
    hover:bg-dash-primary-dark-blue/[0.01]
  `, {
  variants: {
    theme: {
      light: 'text-dash-primary-dark-blue hover:bg-dash-primary-dark-blue/[0.05]',
      dark: 'text-white hover:bg-white/5'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
const accordionContentStyles = classVarianceAuthority.cva(`
  overflow-hidden
  will-change-[height]
  data-[state=open]:h-[var(--radix-accordion-content-height)]
  data-[state=closed]:h-0
`);
const accordionContentInnerStyles = classVarianceAuthority.cva(`
  p-[0.875rem]
  space-y-[0.625rem]
`);
const separatorStyles = classVarianceAuthority.cva(`
  mx-[0.875rem]
  h-px
  bg-dash-primary-dark-blue/10
  transition-opacity
  duration-300
  ease-in-out
`, {
  variants: {
    theme: {
      light: 'bg-dash-primary-dark-blue/10',
      dark: 'bg-white/10'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
const chevronStyles = classVarianceAuthority.cva(`
  w-4
  h-4
  transition-transform
  duration-300
  ease-in-out
  transform
  group-data-[state=open]:rotate-180
`);
/**
 * Accordion component based on Radix UI with smooth animations.
 * Displays custom content in an expandable format.
 */
const Accordion = ({
  title,
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  className = '',
  rightElement,
  showSeparator = false,
  border = false
}) => {
  const {
    theme
  } = ThemeContext.useTheme();
  const isControlled = open !== undefined;
  const rootClasses = accordionRootStyles({
    theme,
    border
  }) + (className ? ` ${className}` : '');
  return jsxRuntime.jsx(index.Root, {
    type: 'single',
    collapsible: true,
    className: rootClasses,
    value: isControlled ? open ? 'item-1' : undefined : undefined,
    defaultValue: defaultOpen ? 'item-1' : undefined,
    onValueChange: value => {
      if (onOpenChange) {
        onOpenChange(value === 'item-1');
      }
    },
    children: jsxRuntime.jsxs(index.Item, {
      value: 'item-1',
      className: `AccordionItem ${accordionItemStyles()} group`,
      children: [jsxRuntime.jsxs(index.Trigger, {
        className: `${accordionTriggerStyles({
          theme
        })}`,
        children: [jsxRuntime.jsx("div", {
          className: 'w-full text-left',
          children: title
        }), jsxRuntime.jsxs("div", {
          className: 'flex items-center gap-3',
          children: [rightElement && jsxRuntime.jsx("div", {
            children: rightElement
          }), jsxRuntime.jsx(index$1.ChevronIcon, {
            className: chevronStyles()
          })]
        })]
      }), showSeparator && jsxRuntime.jsx("div", {
        className: `${separatorStyles({
          theme
        })} group-data-[state=closed]:opacity-0 group-data-[state=open]:opacity-100`
      }), jsxRuntime.jsx(index.Content, {
        forceMount: true,
        className: accordionContentStyles(),
        children: jsxRuntime.jsx("div", {
          className: accordionContentInnerStyles(),
          children: children
        })
      })]
    })
  });
};

exports.Accordion = Accordion;
exports.default = Accordion;
//# sourceMappingURL=index.cjs.js.map
