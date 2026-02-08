"use client";

'use strict';

var jsxRuntime = require('react/jsx-runtime');
var index = require('../../node_modules/@radix-ui/react-dialog/dist/index.cjs.js');
var classVarianceAuthority = require('class-variance-authority');
var ThemeContext = require('../../contexts/ThemeContext.cjs.js');
var index$1 = require('../icons/index.cjs.js');

// Visually hidden component for accessibility
const VisuallyHidden = ({
  children
}) => jsxRuntime.jsx("span", {
  style: {
    position: 'absolute',
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    wordWrap: 'normal'
  },
  children: children
});
const overlayStyles = classVarianceAuthority.cva(`
    fixed
    inset-0
    z-50
    bg-black/80
    data-[state=open]:animate-in
    data-[state=closed]:animate-out
    data-[state=closed]:fade-out-0
    data-[state=open]:fade-in-0
  `, {
  variants: {
    theme: {
      light: '',
      dark: ''
    }
  }
});
const contentStyles = classVarianceAuthority.cva(`
    fixed
    left-[50%]
    z-50
    w-full
    translate-x-[-50%]
    flex
    flex-col
    gap-4
    p-6
    shadow-lg
    duration-200
    data-[state=open]:animate-in
    data-[state=closed]:animate-out
    data-[state=closed]:fade-out-0
    data-[state=open]:fade-in-0
    data-[state=closed]:zoom-out-95
    data-[state=open]:zoom-in-95
    sm:rounded-lg
    font-dash-main
  `, {
  variants: {
    theme: {
      light: 'bg-white border-gray-200',
      dark: 'bg-gray-950 border-gray-800'
    },
    size: {
      sm: 'dash-block-sm',
      md: 'dash-block-md',
      xl: 'dash-block-xl'
    },
    position: {
      center: `
          top-[50%]
          translate-y-[-50%]
          data-[state=closed]:slide-out-to-left-1/2
          data-[state=closed]:slide-out-to-top-[48%]
          data-[state=open]:slide-in-from-left-1/2
          data-[state=open]:slide-in-from-top-[48%]
        `,
      bottom: `
          data-[state=closed]:slide-out-to-left-1/2
          data-[state=closed]:slide-out-to-bottom-full
          data-[state=open]:slide-in-from-left-1/2
          data-[state=open]:slide-in-from-bottom-full
        `
    }
  },
  defaultVariants: {
    size: 'md',
    position: 'center'
  }
});
const headerStyles = classVarianceAuthority.cva(`
    flex
    flex-row
    justify-between
    items-center
    gap-1
    w-full
  `);
const titleStyles = classVarianceAuthority.cva(`
    text-2xl
    font-medium
    leading-[1.366]
    tracking-[-0.03em]
    flex-1
    font-dash-main
  `, {
  variants: {
    theme: {
      light: 'text-[#0C1C33]',
      dark: 'text-gray-50'
    }
  }
});
const closeButtonStyles = classVarianceAuthority.cva(`
    rounded-sm
    opacity-70
    transition-opacity
    hover:opacity-100
    focus:outline-none
    disabled:pointer-events-none
    cursor-pointer
    flex-shrink-0
  `, {
  variants: {
    theme: {
      light: 'text-[#0C1C33] hover:text-gray-700',
      dark: 'text-gray-400 hover:text-gray-200'
    }
  }
});
const DashDialog = ({
  open,
  onOpenChange,
  title,
  showCloseButton = true,
  size = 'md',
  position = 'center',
  bottomOffset = 24,
  maxWidth,
  horizontalMargin,
  children,
  className = '',
  trigger
}) => {
  const {
    theme
  } = ThemeContext.useTheme();
  // Calculate position and sizing styles
  const customStyles = {};
  if (position === 'bottom') {
    customStyles.bottom = `${bottomOffset}px`;
  }
  if (maxWidth) {
    // Check if it's a Tailwind size (sm, md, lg, xl, 2xl, etc.) or a CSS value
    const tailwindSizes = {
      'xs': '320px',
      'sm': '384px',
      'md': '448px',
      'lg': '512px',
      'xl': '576px',
      '2xl': '672px',
      '3xl': '768px',
      '4xl': '896px',
      '5xl': '1024px',
      '6xl': '1152px',
      '7xl': '1280px'
    };
    customStyles.maxWidth = tailwindSizes[maxWidth] || maxWidth;
  }
  if (horizontalMargin !== undefined) {
    // Set max width to viewport width minus margins on both sides
    const marginConstraint = `calc(100vw - ${horizontalMargin * 2}px)`;
    if (customStyles.maxWidth) {
      // If maxWidth is already set, use the smaller of the two
      customStyles.maxWidth = `min(${customStyles.maxWidth}, ${marginConstraint})`;
    } else {
      customStyles.maxWidth = marginConstraint;
    }
    // Keep the dialog centered but constrained by the calculated maxWidth
    // The existing left-[50%] translate-x-[-50%] will handle centering
  }
  const DialogContent = jsxRuntime.jsxs(index.Portal, {
    children: [jsxRuntime.jsx(index.Overlay, {
      className: overlayStyles({
        theme
      })
    }), jsxRuntime.jsxs(index.Content, {
      "aria-describedby": undefined,
      className: `${contentStyles({
        theme,
        size,
        position
      })} ${className}`,
      style: customStyles,
      children: [title ?
      // Render visible title in header if provided
      jsxRuntime.jsxs("div", {
        className: headerStyles(),
        children: [jsxRuntime.jsx(index.Title, {
          className: titleStyles({
            theme
          }),
          children: title
        }), showCloseButton && jsxRuntime.jsxs(index.Close, {
          className: closeButtonStyles({
            theme
          }),
          children: [jsxRuntime.jsx("div", {
            className: 'w-8 h-8 flex items-center justify-center',
            children: jsxRuntime.jsx(index$1.CrossIcon, {
              size: 16
            })
          }), jsxRuntime.jsx("span", {
            className: 'sr-only',
            children: "Close"
          })]
        })]
      }) :
      // No title provided - render visually hidden title for accessibility
      jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [jsxRuntime.jsx(index.Title, {
          children: jsxRuntime.jsx(VisuallyHidden, {
            children: "Dialog"
          })
        }), showCloseButton && jsxRuntime.jsx("div", {
          className: headerStyles(),
          children: jsxRuntime.jsxs(index.Close, {
            className: closeButtonStyles({
              theme
            }),
            children: [jsxRuntime.jsx("div", {
              className: 'w-8 h-8 flex items-center justify-center',
              children: jsxRuntime.jsx(index$1.CrossIcon, {
                size: 16
              })
            }), jsxRuntime.jsx("span", {
              className: 'sr-only',
              children: "Close"
            })]
          })
        })]
      }), children]
    })]
  });
  if (trigger) {
    // Uncontrolled mode with trigger
    return jsxRuntime.jsxs(index.Root, {
      onOpenChange: onOpenChange,
      children: [jsxRuntime.jsx(index.Trigger, {
        asChild: true,
        children: trigger
      }), DialogContent]
    });
  }
  // Controlled mode
  return jsxRuntime.jsx(index.Root, {
    open: open,
    onOpenChange: onOpenChange,
    children: DialogContent
  });
};

exports.DashDialog = DashDialog;
exports.Dialog = DashDialog;
//# sourceMappingURL=index.cjs.js.map
