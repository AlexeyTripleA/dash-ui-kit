"use client";

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var index = require('../button/index.cjs.js');
var classVarianceAuthority = require('class-variance-authority');
var ThemeContext = require('../../contexts/ThemeContext.cjs.js');

const textareaContainer = classVarianceAuthority.cva('relative flex items-baseline transition-all w-full', {
  variants: {
    theme: {
      light: 'bg-white',
      dark: 'bg-gray-800'
    },
    hasValue: {
      true: '',
      false: ''
    },
    colorScheme: {
      default: 'focus-within:ring-blue-500/20',
      brand: 'focus-within:ring-dash-brand/20',
      error: 'focus-within:ring-red-500/20',
      success: 'focus-within:ring-green-500/20'
    },
    size: {
      sm: 'dash-block-sm',
      md: 'dash-block-md',
      xl: 'dash-block-xl'
    },
    variant: {
      outlined: 'outline outline-1 outline-offset-[-1px]'
    },
    isValid: {
      true: '',
      false: '',
      null: ''
    },
    disabled: {
      false: '',
      true: 'opacity-60 cursor-not-allowed'
    }
  },
  compoundVariants: [
  // Outlined variant colors
  {
    variant: 'outlined',
    colorScheme: 'default',
    class: 'outline-[rgba(17,17,17,0.32)] focus-within:outline-[rgba(17,17,17,0.6)]'
  }, {
    variant: 'outlined',
    colorScheme: 'brand',
    class: 'outline-dash-brand/30 focus-within:outline-dash-brand'
  }, {
    variant: 'outlined',
    colorScheme: 'error',
    isValid: false,
    class: 'outline-red-500 focus-within:outline-red-500'
  }, {
    variant: 'outlined',
    colorScheme: 'success',
    isValid: true,
    class: 'outline-green-500 focus-within:outline-green-500'
  },
  // Outlined variant with focus ring
  {
    variant: 'outlined',
    class: 'focus-within:ring-2'
  },
  // Add extra padding for PASTE button when no value
  {
    hasValue: false,
    size: 'sm',
    class: 'pr-[70px]'
  }, {
    hasValue: false,
    size: 'md',
    class: 'pr-[70px]'
  }, {
    hasValue: false,
    size: 'xl',
    class: 'pr-[70px]'
  }],
  defaultVariants: {
    theme: 'light',
    hasValue: false,
    colorScheme: 'default',
    size: 'xl',
    variant: 'outlined',
    isValid: null,
    disabled: false
  }
});
const textarea = classVarianceAuthority.cva('w-full bg-transparent outline-none resize-none transition-all text-[0.875rem] leading-[1.0625rem] placeholder:text-opacity-60', {
  variants: {
    theme: {
      light: 'text-[#111111] placeholder:text-[rgba(17,17,17,0.6)]',
      dark: 'text-white placeholder:text-gray-400'
    },
    font: {
      main: 'font-dash-main',
      grotesque: 'font-dash-grotesque'
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold'
    },
    size: {
      sm: '',
      md: '',
      xl: ''
    },
    disabled: {
      false: '',
      true: 'cursor-not-allowed'
    }
  },
  defaultVariants: {
    theme: 'light',
    font: 'main',
    weight: 'light',
    size: 'xl',
    disabled: false
  }
});
/**
 * A versatile textarea component that adapts to light/dark theme,
 * supports various color schemes, sizes, variants, and states.
 * Includes optional paste functionality and validation.
 *
 * @example
 * <Textarea
 *   placeholder='Enter your message'
 *   colorScheme='brand'
 *   size='xl'
 *   font='grotesque'
 *   weight='medium'
 *   rows={4}
 *   showPasteButton={true}
 * />
 */
const Textarea = _a => {
  var _b, _c;
  var {
      className = '',
      onChange,
      showPasteButton = true,
      validator = null,
      rows = 3,
      size = 'xl',
      variant = 'outlined',
      colorScheme = 'default',
      font = 'main',
      weight = 'light',
      error = false,
      success = false,
      disabled = false
    } = _a,
    props = tslib.__rest(_a, ["className", "onChange", "showPasteButton", "validator", "rows", "size", "variant", "colorScheme", "font", "weight", "error", "success", "disabled"]);
  const {
    theme
  } = ThemeContext.useTheme();
  const [value, setValue] = React.useState((_c = (_b = props.value) !== null && _b !== void 0 ? _b : props.defaultValue) !== null && _c !== void 0 ? _c : '');
  const [isValid, setIsValid] = React.useState(null);
  const textareaRef = React.useRef(null);
  const handleChange = e => {
    const newValue = e.target.value;
    setValue(newValue);
    if (typeof onChange === 'function') {
      onChange(newValue);
    }
    validateInput(newValue);
  };
  const validateInput = input => {
    if (validator === null) {
      setIsValid(null);
      return;
    }
    if (typeof validator === 'function') {
      setIsValid(validator(input));
    } else {
      setIsValid(Boolean(validator));
    }
  };
  const handlePaste = () => {
    navigator.clipboard.readText().then(text => {
      if (text !== '') {
        setValue(text);
        if (textareaRef.current != null) {
          textareaRef.current.value = text;
        }
        if (onChange != null) {
          onChange(text);
        }
        validateInput(text);
      }
    }).catch(err => {
      console.error('Failed to read clipboard contents: ', err);
    });
  };
  const hasValue = value !== '';
  // Determine color scheme based on state
  let finalColorScheme = colorScheme;
  let finalIsValid = isValid;
  if (error) {
    finalColorScheme = 'error';
    finalIsValid = false;
  } else if (success) {
    finalColorScheme = 'success';
    finalIsValid = true;
  }
  const containerClasses = textareaContainer({
    theme,
    hasValue,
    colorScheme: finalColorScheme,
    size,
    variant,
    isValid: finalIsValid,
    disabled
  });
  const textareaClasses = textarea({
    theme,
    font,
    weight,
    size,
    disabled
  }) + ' ' + className;
  return jsxRuntime.jsxs("div", {
    className: containerClasses,
    children: [jsxRuntime.jsx("textarea", Object.assign({
      ref: textareaRef,
      value: value,
      onChange: handleChange,
      rows: rows,
      className: textareaClasses,
      disabled: disabled
    }, props)), showPasteButton && !hasValue && !disabled && jsxRuntime.jsx(index.Button, {
      colorScheme: 'brand',
      size: 'sm',
      onClick: handlePaste,
      className: `absolute top-1/2 !-translate-y-1/2 ${size === 'sm' ? 'right-3' : size === 'md' ? 'right-[1.125rem]' : 'right-[1.5625rem]'}`,
      children: "PASTE"
    })]
  });
};

exports.Textarea = Textarea;
exports.default = Textarea;
//# sourceMappingURL=index.cjs.js.map
