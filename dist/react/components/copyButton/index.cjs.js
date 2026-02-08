"use client";

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var classVarianceAuthority = require('class-variance-authority');
var index = require('../../node_modules/@radix-ui/react-popover/dist/index.cjs.js');
var index$1 = require('../icons/index.cjs.js');
var ThemeContext = require('../../contexts/ThemeContext.cjs.js');
var copyToClipboard = require('../../utils/copyToClipboard.cjs.js');

const copyBtn = classVarianceAuthority.cva('p-0 flex-shrink-0 h-[max-content] min-w-0 bg-transparent transition-colors', {
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
    props = tslib.__rest(_a, ["text", "className", "onCopy"]);
  const {
    theme
  } = ThemeContext.useTheme();
  const [open, setOpen] = React.useState(false);
  const handleCopy = e => {
    e.stopPropagation();
    e.preventDefault();
    copyToClipboard.copyToClipboard(text, onCopy);
    setOpen(true);
    setTimeout(() => setOpen(false), 1000);
  };
  return jsxRuntime.jsxs(index.Root, {
    open: open,
    children: [jsxRuntime.jsx(index.Trigger, {
      asChild: true,
      children: jsxRuntime.jsx("button", Object.assign({
        type: 'button',
        className: `${copyBtn({
          theme
        })} ${className !== null && className !== void 0 ? className : ''} hover:cursor-pointer`,
        onClick: handleCopy
      }, props, {
        children: jsxRuntime.jsx(index$1.CopyIcon, {
          className: 'w-4 h-4 transition',
          color: theme === 'light' ? '#000000' : '#ffffff'
        })
      }))
    }), jsxRuntime.jsx(index.Portal, {
      children: jsxRuntime.jsxs(index.Content, {
        className: 'bg-white text-gray-900 text-sm px-2 py-1 rounded shadow-lg',
        side: 'top',
        sideOffset: 5,
        children: ["Copied", jsxRuntime.jsx(index.Arrow, {
          className: 'fill-white'
        })]
      })
    })]
  });
};

exports.CopyButton = CopyButton;
exports.default = CopyButton;
//# sourceMappingURL=index.cjs.js.map
