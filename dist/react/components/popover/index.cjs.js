"use client";

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var PopoverPrimitive = require('@radix-ui/react-popover');
var classVarianceAuthority = require('class-variance-authority');
var ThemeContext = require('../../contexts/ThemeContext.cjs.js');
var index = require('../icons/index.cjs.js');

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

const popoverContent = classVarianceAuthority.cva(['z-50 rounded-md p-4 shadow-lg outline-none', 'w-64', 'animate-in fade-in-0 zoom-in-95', 'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95', 'data-[side=bottom]:slide-in-from-top-2', 'data-[side=left]:slide-in-from-right-2', 'data-[side=right]:slide-in-from-left-2', 'data-[side=top]:slide-in-from-bottom-2'].join(' '), {
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
const popoverArrow = classVarianceAuthority.cva('', {
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
const closeButton = classVarianceAuthority.cva(['absolute top-2 right-2 rounded-sm opacity-70 transition-opacity', 'hover:opacity-100 focus:outline-none disabled:pointer-events-none cursor-pointer'].join(' '), {
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
  } = ThemeContext.useTheme();
  return jsxRuntime.jsxs(PopoverPrimitive__namespace.Root, {
    open: open,
    defaultOpen: defaultOpen,
    onOpenChange: onOpenChange,
    children: [jsxRuntime.jsx(PopoverPrimitive__namespace.Trigger, {
      asChild: true,
      children: /*#__PURE__*/React.isValidElement(children) ? children : jsxRuntime.jsx("span", {
        children: children
      })
    }), jsxRuntime.jsx(PopoverPrimitive__namespace.Portal, {
      children: jsxRuntime.jsxs(PopoverPrimitive__namespace.Content, {
        side: side,
        sideOffset: sideOffset,
        className: `${popoverContent({
          theme
        })} ${className !== null && className !== void 0 ? className : ''}`,
        children: [showCloseButton && jsxRuntime.jsx(PopoverPrimitive__namespace.Close, {
          className: closeButton({
            theme
          }),
          "aria-label": 'Close',
          children: jsxRuntime.jsx(index.CrossIcon, {
            size: 14
          })
        }), content, jsxRuntime.jsx(PopoverPrimitive__namespace.Arrow, {
          className: popoverArrow({
            theme
          })
        })]
      })
    })]
  });
};

exports.Popover = Popover;
exports.default = Popover;
//# sourceMappingURL=index.cjs.js.map
