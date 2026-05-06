"use client";

import { jsx, jsxs } from 'react/jsx-runtime';
import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cva } from 'class-variance-authority';
import { useTheme } from '../../contexts/ThemeContext.esm.js';

const tooltipContent = cva(['z-50 rounded px-2 py-1 text-sm leading-none', 'select-none', 'animate-in fade-in-0 zoom-in-95', 'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95', 'data-[side=bottom]:slide-in-from-top-2', 'data-[side=left]:slide-in-from-right-2', 'data-[side=right]:slide-in-from-left-2', 'data-[side=top]:slide-in-from-bottom-2'].join(' '), {
  variants: {
    theme: {
      light: 'bg-white text-gray-900 shadow-lg',
      dark: 'bg-gray-950 text-gray-50 shadow-lg'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
const tooltipArrow = cva('', {
  variants: {
    theme: {
      light: 'fill-white',
      dark: 'fill-gray-950'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
const Tooltip = ({
  content,
  children,
  side = 'top',
  sideOffset = 6,
  delayDuration = 300,
  open,
  onOpenChange,
  defaultOpen
}) => {
  const {
    theme
  } = useTheme();
  return jsx(TooltipPrimitive.Provider, {
    delayDuration: delayDuration,
    children: jsxs(TooltipPrimitive.Root, {
      open: open,
      defaultOpen: defaultOpen,
      onOpenChange: onOpenChange,
      children: [jsx(TooltipPrimitive.Trigger, {
        asChild: true,
        children: /*#__PURE__*/React.isValidElement(children) ? children : jsx("span", {
          children: children
        })
      }), jsx(TooltipPrimitive.Portal, {
        children: jsxs(TooltipPrimitive.Content, {
          side: side,
          sideOffset: sideOffset,
          className: tooltipContent({
            theme
          }),
          children: [content, jsx(TooltipPrimitive.Arrow, {
            className: tooltipArrow({
              theme
            })
          })]
        })
      })]
    })
  });
};

export { Tooltip, Tooltip as default };
//# sourceMappingURL=index.esm.js.map
