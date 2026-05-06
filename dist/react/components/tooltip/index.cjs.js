"use client";

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var TooltipPrimitive = require('@radix-ui/react-tooltip');
var classVarianceAuthority = require('class-variance-authority');
var ThemeContext = require('../../contexts/ThemeContext.cjs.js');

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

var TooltipPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(TooltipPrimitive);

const tooltipContent = classVarianceAuthority.cva(['z-50 rounded px-2 py-1 text-sm leading-none', 'select-none', 'animate-in fade-in-0 zoom-in-95', 'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95', 'data-[side=bottom]:slide-in-from-top-2', 'data-[side=left]:slide-in-from-right-2', 'data-[side=right]:slide-in-from-left-2', 'data-[side=top]:slide-in-from-bottom-2'].join(' '), {
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
const tooltipArrow = classVarianceAuthority.cva('', {
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
  } = ThemeContext.useTheme();
  return jsxRuntime.jsx(TooltipPrimitive__namespace.Provider, {
    delayDuration: delayDuration,
    children: jsxRuntime.jsxs(TooltipPrimitive__namespace.Root, {
      open: open,
      defaultOpen: defaultOpen,
      onOpenChange: onOpenChange,
      children: [jsxRuntime.jsx(TooltipPrimitive__namespace.Trigger, {
        asChild: true,
        children: /*#__PURE__*/React.isValidElement(children) ? children : jsxRuntime.jsx("span", {
          children: children
        })
      }), jsxRuntime.jsx(TooltipPrimitive__namespace.Portal, {
        children: jsxRuntime.jsxs(TooltipPrimitive__namespace.Content, {
          side: side,
          sideOffset: sideOffset,
          className: tooltipContent({
            theme
          }),
          children: [content, jsxRuntime.jsx(TooltipPrimitive__namespace.Arrow, {
            className: tooltipArrow({
              theme
            })
          })]
        })
      })]
    })
  });
};

exports.Tooltip = Tooltip;
exports.default = Tooltip;
//# sourceMappingURL=index.cjs.js.map
