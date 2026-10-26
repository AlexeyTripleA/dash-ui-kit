"use client";

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var classVarianceAuthority = require('class-variance-authority');
var PopoverPrimitive = require('@radix-ui/react-popover');
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

var PopoverPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(PopoverPrimitive);

const FEEDBACK_DURATION_MS = 1000;
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
      onCopy,
      copiedLabel = 'Copied',
      failedLabel = 'Copy failed'
    } = _a,
    props = tslib.__rest(_a, ["text", "className", "onCopy", "copiedLabel", "failedLabel"]);
  const {
    theme
  } = ThemeContext.useTheme();
  const [state, setState] = React.useState('idle');
  const timeoutRef = React.useRef(null);
  React.useEffect(() => () => {
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
    copyToClipboard.copyToClipboard(text, result => {
      showResult(result.status ? 'copied' : 'failed');
      onCopy === null || onCopy === void 0 ? void 0 : onCopy(result);
    });
  };
  const failed = state === 'failed';
  return jsxRuntime.jsxs(PopoverPrimitive__namespace.Root, {
    open: state !== 'idle',
    children: [jsxRuntime.jsx(PopoverPrimitive__namespace.Trigger, {
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
    }), jsxRuntime.jsx(PopoverPrimitive__namespace.Portal, {
      children: jsxRuntime.jsxs(PopoverPrimitive__namespace.Content, {
        className: `bg-white text-sm px-2 py-1 rounded shadow-lg ${failed ? 'text-red-600' : 'text-gray-900'}`,
        side: 'top',
        sideOffset: 5,
        role: 'status',
        children: [failed ? failedLabel : copiedLabel, jsxRuntime.jsx(PopoverPrimitive__namespace.Arrow, {
          className: 'fill-white'
        })]
      })
    })]
  });
};

exports.CopyButton = CopyButton;
exports.default = CopyButton;
//# sourceMappingURL=index.cjs.js.map
