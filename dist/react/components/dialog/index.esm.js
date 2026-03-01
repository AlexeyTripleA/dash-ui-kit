"use client";

import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import * as Dialog from '@radix-ui/react-dialog';
import { cva } from 'class-variance-authority';
import { useTheme } from '../../contexts/ThemeContext.esm.js';
import { CrossIcon } from '../icons/index.esm.js';

// Visually hidden component for accessibility
const VisuallyHidden = ({
  children
}) => jsx("span", {
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
const overlayStyles = cva(`
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
const contentStyles = cva(`
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
const headerStyles = cva(`
    flex
    flex-row
    justify-between
    items-center
    gap-1
    w-full
  `);
const titleStyles = cva(`
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
const closeButtonStyles = cva(`
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
  } = useTheme();
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
  const DialogContent = jsxs(Dialog.Portal, {
    children: [jsx(Dialog.Overlay, {
      className: overlayStyles({
        theme
      })
    }), jsxs(Dialog.Content, {
      "aria-describedby": undefined,
      className: `${contentStyles({
        theme,
        size,
        position
      })} ${className}`,
      style: customStyles,
      children: [title ?
      // Render visible title in header if provided
      jsxs("div", {
        className: headerStyles(),
        children: [jsx(Dialog.Title, {
          className: titleStyles({
            theme
          }),
          children: title
        }), showCloseButton && jsxs(Dialog.Close, {
          className: closeButtonStyles({
            theme
          }),
          children: [jsx("div", {
            className: 'w-8 h-8 flex items-center justify-center',
            children: jsx(CrossIcon, {
              size: 16
            })
          }), jsx("span", {
            className: 'sr-only',
            children: "Close"
          })]
        })]
      }) :
      // No title provided - render visually hidden title for accessibility
      jsxs(Fragment, {
        children: [jsx(Dialog.Title, {
          children: jsx(VisuallyHidden, {
            children: "Dialog"
          })
        }), showCloseButton && jsx("div", {
          className: headerStyles(),
          children: jsxs(Dialog.Close, {
            className: closeButtonStyles({
              theme
            }),
            children: [jsx("div", {
              className: 'w-8 h-8 flex items-center justify-center',
              children: jsx(CrossIcon, {
                size: 16
              })
            }), jsx("span", {
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
    return jsxs(Dialog.Root, {
      onOpenChange: onOpenChange,
      children: [jsx(Dialog.Trigger, {
        asChild: true,
        children: trigger
      }), DialogContent]
    });
  }
  // Controlled mode
  return jsx(Dialog.Root, {
    open: open,
    onOpenChange: onOpenChange,
    children: DialogContent
  });
};

export { DashDialog, DashDialog as Dialog };
//# sourceMappingURL=index.esm.js.map
