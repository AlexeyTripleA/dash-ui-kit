"use client";

import { __rest } from 'tslib';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { CopyIcon } from '../icons/index.esm.js';
import { useTheme } from '../../contexts/ThemeContext.esm.js';
import { copyToClipboard } from '../../utils/copyToClipboard.esm.js';

const FEEDBACK_DURATION_MS = 1000;
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
      onCopy,
      copiedLabel = 'Copied',
      failedLabel = 'Copy failed'
    } = _a,
    props = __rest(_a, ["text", "className", "onCopy", "copiedLabel", "failedLabel"]);
  const {
    theme
  } = useTheme();
  const [state, setState] = useState('idle');
  const timeoutRef = useRef(null);
  useEffect(() => () => {
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
  }, []);
  const showResult = result => {
    setState(result);
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setState('idle'), FEEDBACK_DURATION_MS);
  };
  const handleCopy = e => {
    e.stopPropagation();
    e.preventDefault();
    copyToClipboard(text, result => {
      showResult(result.status ? 'copied' : 'failed');
      onCopy === null || onCopy === void 0 ? void 0 : onCopy(result);
    });
  };
  const failed = state === 'failed';
  return jsxs(PopoverPrimitive.Root, {
    open: state !== 'idle',
    children: [jsx(PopoverPrimitive.Trigger, {
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
    }), jsx(PopoverPrimitive.Portal, {
      children: jsxs(PopoverPrimitive.Content, {
        className: `bg-white text-sm px-2 py-1 rounded shadow-lg ${failed ? 'text-red-600' : 'text-gray-900'}`,
        side: 'top',
        sideOffset: 5,
        role: 'status',
        children: [failed ? failedLabel : copiedLabel, jsx(PopoverPrimitive.Arrow, {
          className: 'fill-white'
        })]
      })
    })]
  });
};

export { CopyButton, CopyButton as default };
//# sourceMappingURL=index.esm.js.map
