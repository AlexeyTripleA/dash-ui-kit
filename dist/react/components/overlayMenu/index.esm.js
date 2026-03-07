"use client";

import { __rest } from 'tslib';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { useTheme } from '../../contexts/ThemeContext.esm.js';
import { CrossIcon } from '../icons/index.esm.js';
import { useColorScheme } from '../../hooks/useColorScheme.esm.js';

const overlayMenuTrigger = cva('w-full transition-all font-inter appearance-none cursor-pointer relative text-[0.875rem] leading-[1.0625rem] inline-flex items-center justify-between', {
  variants: {
    theme: {
      light: 'text-dash-primary-dark-blue',
      dark: 'text-white'
    },
    colorScheme: {
      default: '',
      brand: '',
      error: '',
      success: '',
      gray: '',
      lightGray: ''
    },
    size: {
      sm: 'dash-block-sm',
      md: 'dash-block-md',
      xl: 'dash-block-xl'
    },
    border: {
      true: 'outline outline-1 outline-offset-[-1px]',
      false: ''
    },
    disabled: {
      false: '',
      true: 'opacity-60 cursor-not-allowed'
    },
    filled: {
      false: '',
      true: ''
    }
  },
  compoundVariants: [{
    colorScheme: 'default',
    border: true,
    class: 'outline-[rgba(12,28,51,0.35)] focus:outline-[rgba(12,28,51,0.6)]'
  }, {
    colorScheme: 'brand',
    border: true,
    class: 'outline-dash-brand/30 focus:outline-dash-brand'
  }, {
    colorScheme: 'error',
    border: true,
    class: 'outline-red-500 focus:outline-red-500'
  }, {
    colorScheme: 'success',
    border: true,
    class: 'outline-green-500 focus:outline-green-500'
  }, {
    colorScheme: 'gray',
    border: true,
    theme: 'light',
    class: 'outline-[rgba(12,28,51,0.20)] focus:outline-[rgba(12,28,51,0.35)]'
  }, {
    colorScheme: 'gray',
    border: true,
    theme: 'dark',
    class: 'outline-gray-600/50 focus:outline-gray-500'
  }, {
    colorScheme: 'lightGray',
    border: true,
    theme: 'light',
    class: 'outline-dash-primary-dark-blue/[0.05] focus:outline-dash-primary-dark-blue/[0.05]'
  }, {
    colorScheme: 'lightGray',
    border: true,
    theme: 'dark',
    class: 'outline-dash-primary-dark-blue/[0.05] focus:outline-dash-primary-dark-blue/[0.05]'
  }, {
    colorScheme: 'gray',
    border: false,
    theme: 'light',
    class: 'bg-[rgba(12,28,51,0.03)]'
  }, {
    colorScheme: 'gray',
    border: false,
    theme: 'dark',
    class: 'bg-gray-700/20'
  },
  // New lightGray scheme using dash-primary-dark-blue with 3% base and 5% hover
  {
    colorScheme: 'lightGray',
    border: false,
    theme: 'light',
    class: 'bg-dash-primary-dark-blue/[0.03] hover:bg-dash-primary-dark-blue/[0.05]'
  }, {
    colorScheme: 'lightGray',
    border: false,
    theme: 'dark',
    class: 'bg-dash-primary-dark-blue/[0.03] hover:bg-dash-primary-dark-blue/[0.05]'
  }, {
    colorScheme: 'lightGray',
    filled: true,
    theme: 'light',
    class: 'bg-dash-primary-dark-blue/[0.03] hover:bg-dash-primary-dark-blue/[0.05]'
  }, {
    colorScheme: 'lightGray',
    filled: true,
    theme: 'dark',
    class: 'bg-dash-primary-dark-blue/[0.03] hover:bg-dash-primary-dark-blue/[0.05]'
  },
  // Default background when not filled
  {
    filled: false,
    theme: 'light',
    class: 'bg-white'
  }, {
    filled: false,
    theme: 'dark',
    class: 'bg-gray-800'
  },
  // Filled variants
  {
    colorScheme: 'default',
    filled: true,
    theme: 'light',
    class: 'bg-white text-gray-900'
  }, {
    colorScheme: 'default',
    filled: true,
    theme: 'dark',
    class: 'bg-gray-700 text-white'
  }, {
    colorScheme: 'brand',
    filled: true,
    theme: 'light',
    class: 'bg-blue-50 text-blue-700'
  }, {
    colorScheme: 'brand',
    filled: true,
    theme: 'dark',
    class: 'bg-blue-900/30 text-blue-300'
  }, {
    colorScheme: 'error',
    filled: true,
    theme: 'light',
    class: 'bg-red-50 text-red-700'
  }, {
    colorScheme: 'error',
    filled: true,
    theme: 'dark',
    class: 'bg-red-500/20 text-red-400'
  }, {
    colorScheme: 'success',
    filled: true,
    theme: 'light',
    class: 'bg-green-50 text-green-700'
  }, {
    colorScheme: 'success',
    filled: true,
    theme: 'dark',
    class: 'bg-green-500/20 text-green-400'
  }, {
    colorScheme: 'gray',
    filled: true,
    theme: 'light',
    class: 'bg-gray-200 text-gray-800'
  }, {
    colorScheme: 'gray',
    filled: true,
    theme: 'dark',
    class: 'bg-gray-600 text-gray-200'
  }],
  defaultVariants: {
    theme: 'light',
    colorScheme: 'default',
    size: 'xl',
    border: true,
    disabled: false,
    filled: false
  }
});
const overlayContent = cva('absolute z-50 overflow-hidden', {
  variants: {
    theme: {
      light: 'bg-white border border-[rgba(12,28,51,0.05)]',
      dark: 'bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.15)] backdrop-blur-[256px]'
    },
    size: {
      sm: 'rounded-[0.625rem]',
      md: 'rounded-[0.75rem]',
      xl: 'rounded-[0.9375rem]'
    },
    variant: {
      dropdown: 'min-w-full',
      'context-menu': 'w-[200px]'
    },
    hasShadow: {
      true: 'shadow-[0px_0px_75px_0px_rgba(0,0,0,0.15)]',
      false: 'shadow-lg'
    }
  },
  defaultVariants: {
    variant: 'dropdown',
    hasShadow: false
  }
});
const overlayHeader = cva('flex items-center justify-between border-b gap-2', {
  variants: {
    theme: {
      light: 'border-[rgba(12,28,51,0.05)]',
      dark: 'border-[rgba(255,255,255,0.15)]'
    },
    size: {
      sm: 'px-[0.875rem] py-[0.375rem]',
      md: 'px-[1rem] py-[0.5rem]',
      xl: 'px-[1.125rem] py-[0.5rem]'
    }
  },
  defaultVariants: {
    theme: 'light',
    size: 'xl'
  }
});
const overlayItem = cva('relative flex cursor-pointer select-none items-center outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 rounded-none font-medium text-[0.75rem] leading-[1.416em]', {
  variants: {
    theme: {
      light: 'text-[#0C1C33] hover:bg-gray-50',
      dark: 'text-white hover:bg-[rgba(255,255,255,0.1)]'
    },
    size: {
      sm: 'px-[0.875rem] py-[0.625rem]',
      md: 'px-[1rem] py-[0.6875rem]',
      xl: 'px-[1.125rem] py-[0.75rem]'
    }
  },
  defaultVariants: {
    theme: 'light',
    size: 'xl'
  }
});
// Arrow icon
const ChevronDownIcon = ({
  className
}) => jsx("svg", {
  width: '15',
  height: '15',
  viewBox: '0 0 15 15',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  children: jsx("path", {
    d: 'm4.93179 5.43179c0.20081-0.20081 0.52632-0.20081 0.72713 0l2.34108 2.34108 2.34108-2.34108c0.20081-0.20081 0.52632-0.20081 0.72713 0s0.20081 0.52632 0 0.72713l-2.70455 2.70455c-0.20081 0.20081-0.52632 0.20081-0.72713 0l-2.70455-2.70455c-0.20081-0.20081-0.20081-0.52632 0-0.72713z',
    fill: 'currentColor',
    fillRule: 'evenodd',
    clipRule: 'evenodd'
  })
});
/**
 * Overlay menu component that opens above the trigger with overlay positioning.
 * Supports custom content items with onClick handlers.
 *
 * @param variant - 'dropdown' (default) or 'context-menu'
 * @param headerContent - Custom header content (for context-menu variant)
 * @param showCloseButton - Show close button in header
 * @param position - Position object for context-menu variant
 * @param width - Custom width (default: 200px for context-menu)
 */
const closeButtonAlignClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end'
};
const OverlayMenuHeader = ({
  headerClasses,
  hasContent,
  showCloseButton,
  closeButtonAlign,
  isContextMenu,
  theme,
  onClose,
  children
}) => {
  const isCloseOnly = showCloseButton && !hasContent;
  return jsxs("div", {
    className: `${headerClasses} ${isCloseOnly ? closeButtonAlignClasses[closeButtonAlign] : ''} ${!showCloseButton && !isContextMenu ? 'cursor-pointer' : ''}`,
    onClick: !showCloseButton && !isContextMenu ? onClose : undefined,
    children: [hasContent && jsx("div", {
      className: 'w-full flex-1',
      children: children
    }), showCloseButton && jsx("button", {
      className: 'flex items-center cursor-pointer hover:opacity-70 transition-opacity',
      onClick: onClose,
      "aria-label": 'Close menu',
      children: jsx(CrossIcon, {
        size: 16,
        color: theme === 'dark' ? '#FFFFFF' : '#0C1C33'
      })
    })]
  });
};
const OverlayMenu = _a => {
  var _b;
  var {
      className = '',
      triggerClassName = '',
      contentClassName = '',
      colorScheme,
      colorSchemeLight,
      colorSchemeDark,
      size,
      error = false,
      success = false,
      border = true,
      filled = false,
      disabled = false,
      items = [],
      showArrow = true,
      name,
      overlayLabel,
      maxHeight = '200px',
      triggerContent,
      placeholder = 'Menu',
      showItemBorders = true,
      variant = 'dropdown',
      align = 'left',
      wrapperClassName = '',
      headerContent,
      showCloseButton = false,
      closeButtonAlign = 'right',
      position,
      width,
      onClose
    } = _a,
    props = __rest(_a, ["className", "triggerClassName", "contentClassName", "colorScheme", "colorSchemeLight", "colorSchemeDark", "size", "error", "success", "border", "filled", "disabled", "items", "showArrow", "name", "overlayLabel", "maxHeight", "triggerContent", "placeholder", "showItemBorders", "variant", "align", "wrapperClassName", "headerContent", "showCloseButton", "closeButtonAlign", "position", "width", "onClose"]);
  const {
    theme
  } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const effectiveColorScheme = (_b = useColorScheme(colorScheme, colorSchemeLight, colorSchemeDark)) !== null && _b !== void 0 ? _b : 'default';
  // Determine color scheme based on state
  let finalColorScheme = effectiveColorScheme;
  if (error) finalColorScheme = 'error';else if (success) finalColorScheme = 'success';
  const isContextMenu = variant === 'context-menu';
  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = e => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);
  const handleClose = () => {
    setIsOpen(false);
    onClose === null || onClose === void 0 ? void 0 : onClose();
  };
  const alignClasses = {
    left: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-0'
  };
  const triggerClasses = overlayMenuTrigger({
    theme,
    colorScheme: finalColorScheme,
    size,
    border,
    filled,
    disabled
  }) + ' ' + className;
  const contentClasses = overlayContent({
    theme,
    size,
    variant,
    hasShadow: isContextMenu
  });
  const headerClasses = overlayHeader({
    theme,
    size
  });
  const itemClasses = overlayItem({
    theme,
    size
  });
  const handleItemClick = item => {
    if (!item.disabled && item.onClick) {
      item.onClick();
    }
    handleClose();
  };
  // For context-menu variant, show menu immediately if position is provided
  useEffect(() => {
    if (isContextMenu && position) {
      setIsOpen(true);
    }
  }, [isContextMenu, position]);
  // Calculate position styles for context-menu
  const getPositionStyles = () => {
    if (!isContextMenu || !position) return {};
    const styles = {};
    if (position.top !== undefined) styles.top = position.top;
    if (position.left !== undefined) styles.left = position.left;
    if (position.right !== undefined) styles.right = position.right;
    if (position.bottom !== undefined) styles.bottom = position.bottom;
    if (width) styles.width = typeof width === 'number' ? `${width}px` : width;
    return styles;
  };
  return jsxs("div", {
    className: isContextMenu ? wrapperClassName : `relative ${wrapperClassName}`,
    children: [!isContextMenu && jsxs("button", Object.assign({
      ref: triggerRef,
      type: 'button',
      className: `${triggerClasses} ${triggerClassName}`,
      onClick: () => !disabled && setIsOpen(!isOpen),
      disabled: disabled,
      name: name
    }, props, {
      children: [jsx("div", {
        className: 'w-full flex-1 text-left',
        children: triggerContent || jsx("span", {
          className: theme === 'dark' ? 'text-gray-400' : 'text-gray-500',
          children: placeholder
        })
      }), showArrow && jsx(ChevronDownIcon, {
        className: `transition-transform ${isOpen ? 'rotate-180' : ''} ${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}`
      })]
    })), isOpen && jsxs(Fragment, {
      children: [jsx("div", {
        className: `${isContextMenu ? 'fixed' : 'fixed'} inset-0 z-40`,
        onClick: handleClose
      }), jsxs("div", {
        className: `${contentClasses} ${isContextMenu ? 'fixed' : ''} ${!isContextMenu ? `top-0 ${alignClasses[align]}` : ''} overflow-y-auto ${contentClassName}`,
        style: Object.assign({
          maxHeight
        }, getPositionStyles()),
        children: [(headerContent || overlayLabel || showCloseButton) && jsx(OverlayMenuHeader, {
          headerClasses: headerClasses,
          hasContent: !!(headerContent || overlayLabel),
          showCloseButton: showCloseButton || isContextMenu && !!headerContent,
          closeButtonAlign: closeButtonAlign,
          isContextMenu: isContextMenu,
          theme: theme,
          onClose: handleClose,
          children: headerContent || overlayLabel
        }), jsx("div", {
          children: items.map((item, index) => {
            var _a;
            return jsx("div", {
              className: `${itemClasses} ${item.disabled ? 'opacity-50 !cursor-not-allowed' : ''} ${showItemBorders && index < items.length - 1 ? `border-b ${theme === 'dark' ? 'border-[rgba(255,255,255,0.15)]' : 'border-[rgba(12,28,51,0.05)]'}` : ''} ${(_a = item.className) !== null && _a !== void 0 ? _a : ''}`,
              onClick: () => handleItemClick(item),
              children: item.content
            }, item.id);
          })
        })]
      })]
    })]
  });
};

export { OverlayMenu, OverlayMenu as default };
//# sourceMappingURL=index.esm.js.map
