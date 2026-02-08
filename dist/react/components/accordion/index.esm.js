"use client";

import { jsx, jsxs } from 'react/jsx-runtime';
import { Root as Root2, Item, Trigger as Trigger2, Content as Content2 } from '../../node_modules/@radix-ui/react-accordion/dist/index.esm.js';
import { cva } from 'class-variance-authority';
import { useTheme } from '../../contexts/ThemeContext.esm.js';
import { ChevronIcon } from '../icons/index.esm.js';

const accordionRootStyles = cva(`
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
const accordionItemStyles = cva(`
    border-none
    outline-none
  `);
const accordionTriggerStyles = cva(`
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
const accordionContentStyles = cva(`
  overflow-hidden
  will-change-[height]
  data-[state=open]:h-[var(--radix-accordion-content-height)]
  data-[state=closed]:h-0
`);
const accordionContentInnerStyles = cva(`
  p-[0.875rem]
  space-y-[0.625rem]
`);
const separatorStyles = cva(`
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
const chevronStyles = cva(`
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
  } = useTheme();
  const isControlled = open !== undefined;
  const rootClasses = accordionRootStyles({
    theme,
    border
  }) + (className ? ` ${className}` : '');
  return jsx(Root2, {
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
    children: jsxs(Item, {
      value: 'item-1',
      className: `AccordionItem ${accordionItemStyles()} group`,
      children: [jsxs(Trigger2, {
        className: `${accordionTriggerStyles({
          theme
        })}`,
        children: [jsx("div", {
          className: 'w-full text-left',
          children: title
        }), jsxs("div", {
          className: 'flex items-center gap-3',
          children: [rightElement && jsx("div", {
            children: rightElement
          }), jsx(ChevronIcon, {
            className: chevronStyles()
          })]
        })]
      }), showSeparator && jsx("div", {
        className: `${separatorStyles({
          theme
        })} group-data-[state=closed]:opacity-0 group-data-[state=open]:opacity-100`
      }), jsx(Content2, {
        forceMount: true,
        className: accordionContentStyles(),
        children: jsx("div", {
          className: accordionContentInnerStyles(),
          children: children
        })
      })]
    })
  });
};

export { Accordion, Accordion as default };
//# sourceMappingURL=index.esm.js.map
