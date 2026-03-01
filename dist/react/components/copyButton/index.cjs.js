"use client";

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var classVarianceAuthority = require('class-variance-authority');
var Popover = require('@radix-ui/react-popover');
var index = require('../icons/index.cjs.js');
var ThemeContext = require('../../contexts/ThemeContext.cjs.js');
var copyToClipboard = require('../../utils/copyToClipboard.cjs.js');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var Popover__namespace = /*#__PURE__*/_interopNamespaceDefault(Popover);

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
  return jsxRuntime.jsxs(Popover__namespace.Root, {
    open: open,
    children: [jsxRuntime.jsx(Popover__namespace.Trigger, {
      asChild: true,
      children: jsxRuntime.jsx("button", Object.assign({
        type: 'button',
        className: `${copyBtn({
          theme
        })} ${className !== null && className !== void 0 ? className : ''} hover:cursor-pointer`,
        onClick: handleCopy
      }, props, {
        children: jsxRuntime.jsx(index.CopyIcon, {
          className: 'w-4 h-4 transition',
          color: theme === 'light' ? '#000000' : '#ffffff'
        })
      }))
    }), jsxRuntime.jsx(Popover__namespace.Portal, {
      children: jsxRuntime.jsxs(Popover__namespace.Content, {
        className: 'bg-white text-gray-900 text-sm px-2 py-1 rounded shadow-lg',
        side: 'top',
        sideOffset: 5,
        children: ["Copied", jsxRuntime.jsx(Popover__namespace.Arrow, {
          className: 'fill-white'
        })]
      })
    })]
  });
};

exports.CopyButton = CopyButton;
exports.default = CopyButton;
//# sourceMappingURL=index.cjs.js.map
