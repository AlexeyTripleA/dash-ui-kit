"use client";

import { __rest } from 'tslib';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { cva } from 'class-variance-authority';
import * as Popover from '@radix-ui/react-popover';
import { CopyIcon } from '../icons/index.esm.js';
import { useTheme } from '../../contexts/ThemeContext.esm.js';
import { copyToClipboard } from '../../utils/copyToClipboard.esm.js';

const copyBtn = cva('p-0 flex-shrink-0 h-[max-content] min-w-0 bg-transparent transition-colors', {
  variants: {
    theme: {
      light: 'hover:text-gray-600 active:text-gray-800',
      dark: 'hover:text-gray-300 active:text-gray-100'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
const CopyButton = _a => {
  var {
      text,
      className,
      onCopy
    } = _a,
    props = __rest(_a, ["text", "className", "onCopy"]);
  const {
    theme
  } = useTheme();
  const [open, setOpen] = useState(false);
  const handleCopy = e => {
    e.stopPropagation();
    e.preventDefault();
    copyToClipboard(text, onCopy);
    setOpen(true);
    setTimeout(() => setOpen(false), 1000);
  };
  return jsxs(Popover.Root, {
    open: open,
    children: [jsx(Popover.Trigger, {
      asChild: true,
      children: jsx("button", Object.assign({
        type: 'button',
        className: `${copyBtn({
          theme
        })} ${className !== null && className !== void 0 ? className : ''} hover:cursor-pointer`,
        onClick: handleCopy
      }, props, {
        children: jsx(CopyIcon, {
          className: 'w-4 h-4 transition',
          color: theme === 'light' ? '#000000' : '#ffffff'
        })
      }))
    }), jsx(Popover.Portal, {
      children: jsxs(Popover.Content, {
        className: 'bg-white text-gray-900 text-sm px-2 py-1 rounded shadow-lg',
        side: 'top',
        sideOffset: 5,
        children: ["Copied", jsx(Popover.Arrow, {
          className: 'fill-white'
        })]
      })
    })]
  });
};

export { CopyButton, CopyButton as default };
//# sourceMappingURL=index.esm.js.map
