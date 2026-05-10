"use client";

import { jsxs, jsx } from 'react/jsx-runtime';
import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cva } from 'class-variance-authority';
import { useTheme } from '../../contexts/ThemeContext.esm.js';
import { CrossIcon } from '../icons/index.esm.js';

const popoverContent = cva(['z-50 rounded-md p-4 shadow-lg outline-none', 'w-64', 'animate-in fade-in-0 zoom-in-95', 'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95', 'data-[side=bottom]:slide-in-from-top-2', 'data-[side=left]:slide-in-from-right-2', 'data-[side=right]:slide-in-from-left-2', 'data-[side=top]:slide-in-from-bottom-2'].join(' '), {
  variants: {
    theme: {
      light: 'bg-white border border-gray-200 text-gray-900',
      dark: 'bg-gray-950 border border-gray-800 text-gray-50'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
const popoverArrow = cva('', {
  variants: {
    theme: {
      light: 'fill-white stroke-gray-200',
      dark: 'fill-gray-950 stroke-gray-800'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
const closeButton = cva(['absolute top-2 right-2 rounded-sm opacity-70 transition-opacity', 'hover:opacity-100 focus:outline-none disabled:pointer-events-none cursor-pointer'].join(' '), {
  variants: {
    theme: {
      light: 'text-gray-600 hover:text-gray-900',
      dark: 'text-gray-400 hover:text-gray-100'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
const Popover = ({
  content,
  children,
  side = 'bottom',
  sideOffset = 8,
  showCloseButton = false,
  open,
  onOpenChange,
  defaultOpen,
  className
}) => {
  const {
    theme
  } = useTheme();
  return jsxs(PopoverPrimitive.Root, {
    open: open,
    defaultOpen: defaultOpen,
    onOpenChange: onOpenChange,
    children: [jsx(PopoverPrimitive.Trigger, {
      asChild: true,
      children: /*#__PURE__*/React.isValidElement(children) ? children : jsx("span", {
        children: children
      })
    }), jsx(PopoverPrimitive.Portal, {
      children: jsxs(PopoverPrimitive.Content, {
        side: side,
        sideOffset: sideOffset,
        className: `${popoverContent({
          theme
        })} ${className !== null && className !== void 0 ? className : ''}`,
        children: [showCloseButton && jsx(PopoverPrimitive.Close, {
          className: closeButton({
            theme
          }),
          "aria-label": 'Close',
          children: jsx(CrossIcon, {
            size: 14
          })
        }), content, jsx(PopoverPrimitive.Arrow, {
          className: popoverArrow({
            theme
          })
        })]
      })
    })]
  });
};

export { Popover, Popover as default };
//# sourceMappingURL=index.esm.js.map
