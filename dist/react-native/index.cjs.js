'use strict';

var tslib = require('tslib');
var jsxRuntime = require('react/jsx-runtime');
var reactNative = require('react-native');
var classVarianceAuthority = require('class-variance-authority');
var twrnc = require('twrnc');
var react = require('react');
var Svg = require('react-native-svg');
var minidenticons = require('minidenticons');

/**
 * Tailwind utility for React Native using twrnc
 * Converts Tailwind className strings to React Native style objects
 */
// Inline Tailwind config with Dash brand colors for React Native
// Colors from src/styles/theme.pcss
const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        // Dash brand colors - matching Web version
        'dash-brand': '#4C7EFF',
        // Primary brand color
        'dash-brand-dim': '#96A7FF',
        // Dimmed brand color
        'dash-brand-dark': '#4D5895',
        // Dark brand color
        'dash-brand-darkness': '#13172A',
        // Darkest brand color
        'dash-mint': '#60F6D2',
        // Mint/teal color
        'dash-mint-hover': '#4DD4B1',
        // Mint hover state
        'dash-yellow-light': '#FEF3C7',
        // Light yellow
        'dash-yellow': '#FDE68A',
        // Yellow
        'dash-primary-die-subdued': '#0c1c3308',
        // Subdued color with alpha
        'dash-primary-dark-blue': '#0C1C33',
        // Dark blue
        // State colors
        'dash-green': '#40BF40',
        'dash-red': '#CD2E00',
        'dash-orange': '#F98F12'
      }
    }
  }
};
// Create a tailwind instance with React Native compatible colors
const tw = twrnc.create(tailwindConfig);
/**
 * Helper to convert className string to React Native style object
 * @param className - Tailwind class names string
 * @returns React Native style object
 */
const cn = className => tw`${className}`;

const textStyles$2 = classVarianceAuthority.cva('', {
  variants: {
    variant: {
      body: 'text-base',
      caption: 'text-sm',
      label: 'text-xs'
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold'
    },
    color: {
      default: 'text-gray-900 dark:text-gray-100',
      blue: 'text-dash-brand',
      red: 'text-red-700 dark:text-red-400',
      gray: 'text-gray-600 dark:text-gray-400'
    },
    italic: {
      false: '',
      true: 'italic'
    },
    underline: {
      false: '',
      true: 'underline'
    },
    lineThrough: {
      false: '',
      true: 'line-through'
    },
    transform: {
      none: '',
      uppercase: 'uppercase',
      capitalize: 'capitalize'
    },
    opacity: {
      100: 'opacity-100',
      80: 'opacity-80',
      60: 'opacity-60',
      40: 'opacity-40'
    }
  },
  defaultVariants: {
    variant: 'body',
    weight: 'regular',
    color: 'default',
    italic: false,
    underline: false,
    lineThrough: false,
    transform: 'none',
    opacity: 100
  }
});
/**
 * React Native Text component with variants, weights, and styling options.
 * Uses twrnc for Tailwind-like styling converted to React Native styles.
 */
const Text = _a => {
  var {
      variant,
      weight,
      color,
      italic,
      underline,
      lineThrough,
      transform,
      opacity,
      className = '',
      style,
      children
    } = _a,
    props = tslib.__rest(_a, ["variant", "weight", "color", "italic", "underline", "lineThrough", "transform", "opacity", "className", "style", "children"]);
  const classes = textStyles$2({
    variant,
    weight,
    color,
    italic,
    underline,
    lineThrough,
    transform,
    opacity
  }) + (className ? ` ${className}` : '');
  // Convert Tailwind classes to React Native style object
  const textStyle = [cn(classes), style].filter(Boolean);
  return jsxRuntime.jsx(reactNative.Text, Object.assign({
    style: textStyle
  }, props, {
    children: children
  }));
};

const headingStyles = classVarianceAuthority.cva('font-bold text-gray-900 dark:text-gray-100', {
  variants: {
    level: {
      1: 'text-4xl',
      2: 'text-3xl',
      3: 'text-2xl',
      4: 'text-xl',
      5: 'text-lg',
      6: 'text-base'
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold'
    },
    color: {
      default: '',
      black: 'text-black dark:text-white',
      gray: 'text-gray-600 dark:text-gray-300',
      blue: 'text-blue-600 dark:text-blue-400',
      red: 'text-red-600 dark:text-red-400',
      green: 'text-green-600 dark:text-green-400'
    }
  },
  defaultVariants: {
    level: 1,
    weight: 'extrabold',
    color: 'default'
  }
});
/**
 * React Native Heading component with semantic levels and customizable styling.
 * Uses twrnc for Tailwind-like styling converted to React Native styles.
 */
const Heading = _a => {
  var {
      level,
      weight,
      color,
      className = '',
      style,
      children
    } = _a,
    props = tslib.__rest(_a, ["level", "weight", "color", "className", "style", "children"]);
  const classes = headingStyles({
    level,
    weight,
    color
  }) + (className ? ` ${className}` : '');
  // Convert Tailwind classes to React Native style object
  const headingStyle = [cn(classes), style].filter(Boolean);
  return jsxRuntime.jsx(reactNative.Text, Object.assign({
    style: headingStyle
  }, props, {
    children: children
  }));
};

function resolveColorScheme(theme, colorScheme, colorSchemeLight, colorSchemeDark) {
  if (theme === 'light' && colorSchemeLight !== undefined) return colorSchemeLight;
  if (theme === 'dark' && colorSchemeDark !== undefined) return colorSchemeDark;
  return colorScheme;
}

const buttonStyles = classVarianceAuthority.cva('items-center justify-center flex-row min-h-11 transition-colors border border-transparent', {
  variants: {
    variant: {
      solid: '',
      outline: 'border-current bg-transparent',
      ghost: 'bg-transparent border-transparent'
    },
    colorScheme: {
      brand: '',
      mint: '',
      gray: '',
      red: '',
      lightBlue: '',
      lightGray: '',
      white: '',
      halfWhite: '',
      halfBlue: ''
    },
    size: {
      sm: 'px-3 py-2',
      md: 'px-[18px] py-3',
      lg: 'px-6 py-4',
      xl: 'px-[25px] py-5'
    },
    rounded: {
      default: '',
      full: 'rounded-full'
    },
    disabled: {
      false: '',
      true: 'opacity-50'
    }
  },
  compoundVariants: [
  // Border radius per size (when rounded is default)
  {
    size: 'sm',
    rounded: 'default',
    class: 'rounded-[10px]'
  }, {
    size: 'md',
    rounded: 'default',
    class: 'rounded-[14px]'
  }, {
    size: 'lg',
    rounded: 'default',
    class: 'rounded-[14px]'
  }, {
    size: 'xl',
    rounded: 'default',
    class: 'rounded-[16px]'
  },
  // Solid variants - brand
  {
    variant: 'solid',
    colorScheme: 'brand',
    disabled: false,
    class: 'bg-dash-brand'
  }, {
    variant: 'solid',
    colorScheme: 'mint',
    disabled: false,
    class: 'bg-dash-mint'
  }, {
    variant: 'solid',
    colorScheme: 'gray',
    disabled: false,
    class: 'bg-gray-200 dark:bg-gray-600'
  }, {
    variant: 'solid',
    colorScheme: 'red',
    disabled: false,
    class: 'bg-red-200 dark:bg-red-600'
  }, {
    variant: 'solid',
    colorScheme: 'lightBlue',
    disabled: false,
    class: 'bg-dash-brand/10 dark:bg-dash-brand/20'
  }, {
    variant: 'solid',
    colorScheme: 'lightGray',
    disabled: false,
    class: 'bg-gray-100 dark:bg-gray-700/20'
  }, {
    variant: 'solid',
    colorScheme: 'white',
    disabled: false,
    class: 'bg-white'
  }, {
    variant: 'solid',
    colorScheme: 'halfWhite',
    disabled: false,
    class: 'bg-white/15'
  }, {
    variant: 'solid',
    colorScheme: 'halfBlue',
    disabled: false,
    class: 'bg-dash-brand/15'
  },
  // Outline variants
  {
    variant: 'outline',
    colorScheme: 'brand',
    class: 'border-dash-brand'
  }, {
    variant: 'outline',
    colorScheme: 'mint',
    class: 'border-dash-mint'
  }, {
    variant: 'outline',
    colorScheme: 'gray',
    class: 'border-gray-700 dark:border-gray-300'
  }, {
    variant: 'outline',
    colorScheme: 'red',
    class: 'border-red-700 dark:border-red-400'
  }, {
    variant: 'outline',
    colorScheme: 'white',
    class: 'border-white'
  }, {
    variant: 'outline',
    colorScheme: 'halfWhite',
    class: 'border-white/50'
  }, {
    variant: 'outline',
    colorScheme: 'halfBlue',
    class: 'border-dash-brand/50'
  }],
  defaultVariants: {
    variant: 'solid',
    colorScheme: 'brand',
    size: 'md',
    rounded: 'default',
    disabled: false
  }
});
const textStyles$1 = classVarianceAuthority.cva('font-medium', {
  variants: {
    variant: {
      solid: '',
      outline: '',
      ghost: ''
    },
    colorScheme: {
      brand: '',
      mint: '',
      gray: '',
      red: '',
      lightBlue: '',
      lightGray: '',
      white: '',
      halfWhite: '',
      halfBlue: ''
    },
    size: {
      sm: 'text-sm',
      // 14px
      md: 'text-base',
      // 16px
      lg: 'text-base',
      // 16px
      xl: 'text-lg' // 18px
    }
  },
  compoundVariants: [
  // Solid text colors
  {
    variant: 'solid',
    colorScheme: 'brand',
    class: 'text-white'
  }, {
    variant: 'solid',
    colorScheme: 'mint',
    class: 'text-black'
  }, {
    variant: 'solid',
    colorScheme: 'gray',
    class: 'text-gray-700 dark:text-gray-100'
  }, {
    variant: 'solid',
    colorScheme: 'red',
    class: 'text-red-700 dark:text-red-100'
  }, {
    variant: 'solid',
    colorScheme: 'lightBlue',
    class: 'text-dash-brand'
  }, {
    variant: 'solid',
    colorScheme: 'lightGray',
    class: 'text-gray-900 dark:text-gray-300'
  }, {
    variant: 'solid',
    colorScheme: 'white',
    class: 'text-dash-brand'
  }, {
    variant: 'solid',
    colorScheme: 'halfWhite',
    class: 'text-white'
  }, {
    variant: 'solid',
    colorScheme: 'halfBlue',
    class: 'text-dash-brand'
  },
  // Outline text colors
  {
    variant: 'outline',
    colorScheme: 'brand',
    class: 'text-dash-brand'
  }, {
    variant: 'outline',
    colorScheme: 'mint',
    class: 'text-dash-mint'
  }, {
    variant: 'outline',
    colorScheme: 'gray',
    class: 'text-gray-700 dark:text-gray-300'
  }, {
    variant: 'outline',
    colorScheme: 'red',
    class: 'text-red-700 dark:text-red-400'
  }, {
    variant: 'outline',
    colorScheme: 'white',
    class: 'text-white'
  }, {
    variant: 'outline',
    colorScheme: 'halfWhite',
    class: 'text-white'
  }, {
    variant: 'outline',
    colorScheme: 'halfBlue',
    class: 'text-dash-brand'
  },
  // Ghost text colors
  {
    variant: 'ghost',
    colorScheme: 'brand',
    class: 'text-dash-brand'
  }],
  defaultVariants: {
    variant: 'solid',
    colorScheme: 'brand',
    size: 'md'
  }
});
/**
 * React Native Button component with variants, color schemes, sizes, and loading state.
 * Uses Pressable for touch interactions and twrnc for Tailwind styling.
 */
const Button = _a => {
  var _b;
  var {
      theme = 'light',
      variant,
      colorScheme,
      colorSchemeLight,
      colorSchemeDark,
      size,
      rounded,
      disabled = false,
      loading = false,
      className = '',
      style,
      textStyle,
      children,
      onPress
    } = _a,
    props = tslib.__rest(_a, ["theme", "variant", "colorScheme", "colorSchemeLight", "colorSchemeDark", "size", "rounded", "disabled", "loading", "className", "style", "textStyle", "children", "onPress"]);
  const isDisabled = disabled || loading;
  const effectiveColorScheme = (_b = resolveColorScheme(theme, colorScheme, colorSchemeLight, colorSchemeDark)) !== null && _b !== void 0 ? _b : 'brand';
  const buttonClasses = buttonStyles({
    variant,
    colorScheme: effectiveColorScheme,
    size,
    rounded,
    disabled: isDisabled
  }) + (className ? ` ${className}` : '');
  const textClasses = textStyles$1({
    variant,
    colorScheme: effectiveColorScheme,
    size
  });
  // Convert Tailwind classes to React Native style objects
  const buttonStyle = [cn(buttonClasses), style].filter(Boolean);
  const textStyleMerged = [cn(textClasses), textStyle].filter(Boolean);
  return jsxRuntime.jsx(reactNative.Pressable, Object.assign({
    style: ({
      pressed
    }) => [...buttonStyle, pressed && !isDisabled && {
      opacity: 0.7
    }],
    disabled: isDisabled,
    onPress: onPress
  }, props, {
    children: loading ? jsxRuntime.jsx(reactNative.ActivityIndicator, {
      size: "small",
      color: variant === 'solid' && effectiveColorScheme === 'brand' ? '#fff' : '#3B82F6'
    }) : typeof children === 'string' ? jsxRuntime.jsx(reactNative.Text, {
      style: textStyleMerged,
      children: children
    }) : children
  }));
};

const ArrowIcon = ({
  color = 'white',
  size = 14,
  onPress
}) => {
  return jsxRuntime.jsx(Svg, {
    width: size,
    height: size,
    viewBox: '0 0 9 14',
    fill: 'none',
    onPress: onPress,
    color: color,
    children: jsxRuntime.jsx(Svg.Path, {
      d: 'M7.29297 0.292893C7.68349 -0.0976311 8.31651 -0.0976311 8.70703 0.292893C9.09756 0.683418 9.09756 1.31643 8.70703 1.70696L3.41406 6.99992L8.70703 12.2929L8.77539 12.3691C9.09574 12.7618 9.07315 13.3408 8.70703 13.707C8.34092 14.0731 7.76191 14.0957 7.36914 13.7753L7.29297 13.707L0.585938 6.99992L7.29297 0.292893Z',
      fill: color
    })
  });
};
const CopyIcon = ({
  color = 'white',
  size = 16,
  onPress
}) => {
  return jsxRuntime.jsxs(Svg, {
    width: size,
    height: size,
    viewBox: '0 0 16 16',
    fill: 'none',
    onPress: onPress,
    color: color,
    children: [jsxRuntime.jsx(Svg.G, {
      clipPath: 'url(#clip0_3876_6767)',
      children: jsxRuntime.jsx(Svg.G, {
        clipPath: 'url(#clip1_3876_6767)',
        children: jsxRuntime.jsx(Svg.G, {
          clipPath: 'url(#clip2_3876_6767)',
          children: jsxRuntime.jsx(Svg.Path, {
            d: 'M11.4512 10.5645H5.28516V1.75586H9.32335L11.4512 3.88369V10.5645ZM12.332 3.51758L9.68945 0.875H5.28516H4.4043V1.75586V10.5645V11.4453H5.28516H11.4512H12.332V10.5645V3.51758ZM0.880859 4.39844H0V5.2793V14.0879V14.9688H0.880859H7.04688H7.92773V14.0879V12.3262H7.04688V14.0879H0.880859V5.2793H3.52344V4.39844H0.880859Z',
            fill: color
          })
        })
      })
    }), jsxRuntime.jsxs(Svg.Defs, {
      children: [jsxRuntime.jsx(Svg.ClipPath, {
        id: 'clip0_3876_6767',
        children: jsxRuntime.jsx(Svg.Rect, {
          width: '16',
          height: '16',
          fill: 'white'
        })
      }), jsxRuntime.jsx(Svg.ClipPath, {
        id: 'clip1_3876_6767',
        children: jsxRuntime.jsx(Svg.Rect, {
          width: '16',
          height: '14.25',
          fill: 'white',
          transform: 'translate(0 0.875)'
        })
      }), jsxRuntime.jsx(Svg.ClipPath, {
        id: 'clip2_3876_6767',
        children: jsxRuntime.jsx(Svg.Rect, {
          width: '12.332',
          height: '14.0938',
          fill: 'white',
          transform: 'translate(0 0.875)'
        })
      })]
    })]
  });
};
const SuccessIcon = ({
  color = '#1CC400',
  size = 18,
  onPress
}) => jsxRuntime.jsxs(Svg, {
  width: size,
  height: size,
  viewBox: '0 0 18 18',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: [jsxRuntime.jsx(Svg.Circle, {
    cx: '9',
    cy: '9',
    r: '9',
    fill: color,
    fillOpacity: '.2'
  }), jsxRuntime.jsx(Svg.Path, {
    d: 'M5 8.5L8 11.5L13.5 6',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round'
  })]
});
const ErrorIcon = ({
  color = '#F45858',
  size = 18,
  onPress
}) => jsxRuntime.jsxs(Svg, {
  width: size,
  height: size,
  viewBox: '0 0 18 18',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: [jsxRuntime.jsx(Svg.Rect, {
    width: '18',
    height: '18',
    rx: '4',
    fill: color,
    fillOpacity: '.2'
  }), jsxRuntime.jsx(Svg.Path, {
    d: 'M9.06951 10L9.0695 4.86092',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round'
  }), jsxRuntime.jsx(Svg.Path, {
    d: 'M9.06951 13L9.06951 13.0102',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round'
  })]
});
const CheckIcon = ({
  color = '#4C7EFF',
  size = 20,
  onPress
}) => {
  return jsxRuntime.jsxs(Svg, {
    width: size,
    height: size,
    viewBox: '0 0 20 20',
    fill: 'none',
    onPress: onPress,
    children: [jsxRuntime.jsx(Svg.Circle, {
      cx: '10',
      cy: '10',
      r: '10',
      fill: 'rgba(12, 28, 51, 0.05)'
    }), jsxRuntime.jsx(Svg.Path, {
      d: 'M6.33 10L8.83 12.5L13.67 7.67',
      stroke: color,
      strokeWidth: '1.5',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    })]
  });
};
const CrossIcon = ({
  color = '#0C1C33',
  size = 16,
  onPress
}) => jsxRuntime.jsx(Svg, {
  width: size,
  height: size * 17 / 16,
  viewBox: '0 0 16 17',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: jsxRuntime.jsx(Svg.Path, {
    d: 'M13.5693 3.40266L13.0973 2.93066L8 8.02866L2.90266 2.93066L2.43066 3.40266L7.52866 8.5L2.43066 13.5973L2.90266 14.0693L8 8.97133L13.0973 14.0693L13.5693 13.5973L8.47133 8.5L13.5693 3.40266Z',
    fill: color
  })
});
const PlusIcon = ({
  color = '#4C7EFF',
  size = 17,
  onPress
}) => jsxRuntime.jsx(Svg, {
  width: size,
  height: size * 16 / 17,
  viewBox: '0 0 17 16',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: jsxRuntime.jsx(Svg.Path, {
    d: 'M15.1667 7.66665H8.83337V1.33331H8.16671V7.66665H1.83337V8.33331H8.16671V14.6666H8.83337V8.33331H15.1667V7.66665Z',
    fill: color
  })
});
const ChevronIcon = ({
  color = '#0C1C33',
  size = 12,
  onPress
}) => jsxRuntime.jsx(Svg, {
  width: size,
  height: size,
  viewBox: '0 0 12 12',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: jsxRuntime.jsx(Svg.Path, {
    d: 'M6 8.9395L1.65149 4.59099L2.18149 4.06049L6 7.879L9.8185 4.06049L10.3485 4.59099L6 8.9395Z',
    fill: color
  })
});
const SearchIcon = ({
  color = '#0C1C33',
  size = 16,
  onPress
}) => jsxRuntime.jsx(Svg, {
  width: size,
  height: size,
  viewBox: '0 0 16 16',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: jsxRuntime.jsx(Svg.Path, {
    d: 'M14.569 14.0977L10.6623 10.191C11.5815 9.14938 12.0591 7.79092 11.9941 6.40327C11.9292 5.01564 11.3267 3.70776 10.3143 2.75659C9.30178 1.80542 7.95892 1.28563 6.56994 1.30729C5.18095 1.32895 3.85492 1.89036 2.87264 2.87264C1.89036 3.85492 1.32895 5.18095 1.30729 6.56994C1.28563 7.95892 1.80542 9.30178 2.75659 10.3143C3.70776 11.3267 5.01564 11.9292 6.40327 11.9941C7.79092 12.0591 9.14938 11.5815 10.191 10.6623L14.0977 14.569L14.569 14.0977ZM6.66665 11.3333C5.74364 11.3333 4.84138 11.0596 4.07396 10.5468C3.30653 10.0341 2.70839 9.30518 2.35518 8.45245C2.00197 7.59978 1.90956 6.66145 2.08962 5.7562C2.26968 4.85095 2.71414 4.01943 3.36678 3.36678C4.01943 2.71414 4.85095 2.26968 5.7562 2.08962C6.66145 1.90956 7.59978 2.00197 8.45245 2.35518C9.30518 2.70839 10.0341 3.30653 10.5468 4.07396C11.0596 4.84138 11.3333 5.74364 11.3333 6.66665C11.3319 7.90385 10.8398 9.09005 9.96492 9.96492C9.09005 10.8398 7.90385 11.3319 6.66665 11.3333Z',
    fill: color
  })
});
const InfoCircleIcon = ({
  color = '#4C7EFF',
  size = 19,
  onPress
}) => jsxRuntime.jsxs(Svg, {
  width: size,
  height: size,
  viewBox: '0 0 19 19',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: [jsxRuntime.jsxs(Svg.G, {
    clipPath: 'url(#clip0_1166_258)',
    children: [jsxRuntime.jsx(Svg.Path, {
      d: 'M9.5 5.5H9.51ZM9.5 8.5V13.5ZM18.5 9.5C18.5 14.4706 14.4706 18.5 9.5 18.5C4.52944 18.5 0.5 14.4706 0.5 9.5C0.5 4.52944 4.52944 0.5 9.5 0.5C14.4706 0.5 18.5 4.52944 18.5 9.5Z',
      fill: color,
      fillOpacity: '0.05'
    }), jsxRuntime.jsx(Svg.Path, {
      d: 'M18 9.5C18 4.80558 14.1945 1 9.5 1C4.80558 1 1 4.80558 1 9.5C1 14.1945 4.80558 18 9.5 18C14.1945 18 18 14.1945 18 9.5ZM9 13.5V8.5C9 8.22386 9.22386 8 9.5 8C9.77614 8 10 8.22386 10 8.5V13.5C10 13.7761 9.77614 14 9.5 14C9.22386 14 9 13.7761 9 13.5ZM9.50977 5C9.78591 5 10.0098 5.22386 10.0098 5.5C10.0098 5.77614 9.78591 6 9.50977 6H9.5C9.22386 6 9 5.77614 9 5.5C9 5.22386 9.22386 5 9.5 5H9.50977ZM19 9.5C19 14.7467 14.7467 19 9.5 19C4.2533 19 0 14.7467 0 9.5C0 4.2533 4.2533 0 9.5 0C14.7467 0 19 4.2533 19 9.5Z',
      fill: color
    })]
  }), jsxRuntime.jsx(Svg.Defs, {
    children: jsxRuntime.jsx(Svg.ClipPath, {
      id: 'clip0_1166_258',
      children: jsxRuntime.jsx(Svg.Rect, {
        width: '19',
        height: '19',
        fill: 'white'
      })
    })
  })]
});
const EyeOpenIcon = ({
  color = 'currentColor',
  size = 16,
  onPress
}) => jsxRuntime.jsx(Svg, {
  width: size,
  height: size * 10 / 16,
  viewBox: '0 0 16 10',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: jsxRuntime.jsx(Svg.Path, {
    d: 'M7.89888 0C6.24409 0.000806406 4.62351 0.471042 3.22533 1.35609C1.82715 2.24114 0.708743 3.50469 0 5C0.708092 6.49578 1.82635 7.75974 3.22468 8.64489C4.623 9.53004 6.24392 9.99999 7.89888 9.99999C9.55378 9.99999 11.1747 9.53004 12.573 8.64489C13.9713 7.75974 15.0896 6.49578 15.7977 5C15.089 3.50469 13.9706 2.24114 12.5724 1.35609C11.1742 0.471042 9.55364 0.000806406 7.89888 0ZM7.89888 8.98344C6.52084 8.97755 5.16914 8.60565 3.98212 7.90571C2.79509 7.20576 1.81538 6.20297 1.14327 5C1.81083 3.7931 2.78951 2.78709 3.97757 2.08654C5.16561 1.38601 6.51964 1.01653 7.89888 1.01653C9.27804 1.01653 10.6321 1.38601 11.8201 2.08654C13.0082 2.78709 13.9868 3.7931 14.6545 5C13.9823 6.20297 13.0026 7.20576 11.8156 7.90571C10.6285 8.60565 9.27689 8.97755 7.89888 8.98344ZM7.89888 2.51693C7.40772 2.51693 6.92767 2.66256 6.51934 2.93541C6.11101 3.20825 5.79274 3.59605 5.60481 4.0498C5.41687 4.50349 5.3677 5.00271 5.46351 5.48439C5.55932 5.96606 5.7958 6.4085 6.14306 6.7558C6.49033 7.10303 6.93275 7.33953 7.41443 7.43535C7.8961 7.53117 8.39533 7.48197 8.84909 7.29406C9.30277 7.10608 9.69059 6.78785 9.96342 6.3795C10.2362 5.97114 10.3819 5.4911 10.3819 5C10.3819 4.34146 10.1203 3.70989 9.65461 3.24421C9.189 2.77854 8.55742 2.51693 7.89888 2.51693ZM7.89888 6.46658C7.60878 6.46658 7.32525 6.38058 7.08407 6.21937C6.8429 6.05822 6.65492 5.82918 6.54392 5.56123C6.43291 5.29322 6.40387 4.99837 6.46045 4.7139C6.51704 4.42942 6.65675 4.16805 6.8618 3.96299C7.06693 3.75786 7.32823 3.61818 7.61271 3.5616C7.89726 3.50501 8.1921 3.53405 8.46011 3.64504C8.72806 3.75603 8.9571 3.94402 9.11825 4.18519C9.27939 4.42637 9.36546 4.7099 9.36546 5C9.36498 5.38884 9.21034 5.76161 8.93542 6.03654C8.66043 6.31146 8.28765 6.4661 7.89888 6.46658Z',
    fill: color
  })
});
const EyeClosedIcon = ({
  color = 'currentColor',
  size = 16,
  onPress
}) => jsxRuntime.jsxs(Svg, {
  width: size,
  height: size,
  viewBox: '0 0 16 16',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: [jsxRuntime.jsx(Svg.Path, {
    d: 'M7.89888 3C6.24409 3.00081 4.62351 3.47104 3.22533 4.35609C1.82715 5.24114 0.708743 6.50469 0 8C0.708092 9.49578 1.82635 10.7597 3.22468 11.6449C4.623 12.53 6.24392 13 7.89888 13C9.55378 13 11.1747 12.53 12.573 11.6449C13.9713 10.7597 15.0896 9.49578 15.7977 8C15.089 6.50469 13.9706 5.24114 12.5724 4.35609C11.1742 3.47104 9.55364 3.00081 7.89888 3ZM7.89888 11.9834C6.52084 11.9776 5.16914 11.6056 3.98212 10.9057C2.79509 10.2058 1.81538 9.20297 1.14327 8C1.81083 6.7931 2.78951 5.78709 3.97757 5.08654C5.16561 4.38601 6.51964 4.01653 7.89888 4.01653C9.27804 4.01653 10.6321 4.38601 11.8201 5.08654C13.0082 5.78709 13.9868 6.7931 14.6545 8C13.9823 9.20297 13.0026 10.2058 11.8156 10.9057C10.6285 11.6056 9.27689 11.9776 7.89888 11.9834Z',
    fill: color
  }), jsxRuntime.jsx(Svg.Line, {
    x1: '1',
    y1: '15',
    x2: '15',
    y2: '1',
    stroke: color,
    strokeWidth: '1.5',
    strokeLinecap: 'round'
  })]
});
const AsteriskIcon = ({
  color = '#0C1C33',
  size = 16,
  onPress
}) => jsxRuntime.jsx(Svg, {
  width: size,
  height: size * 17 / 16,
  viewBox: '0 0 16 17',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: jsxRuntime.jsx(Svg.Path, {
    d: 'M6.38944 0H9.61056L9.24092 8.5H6.75908L6.38944 0ZM6.38944 17L6.75908 8.5H9.24092L9.61056 17H6.38944ZM0 5.50476L1.63696 2.96825L8.60726 7.50159L7.36634 9.47143L0 5.50476ZM16 5.50476L8.63366 9.47143L7.39274 7.50159L14.363 2.96825L16 5.50476ZM16 11.4683L14.363 14.0048L7.39274 9.47143L8.63366 7.50159L16 11.4683ZM0 11.5222L7.36634 7.55556L8.60726 9.5254L1.63696 14.0587L0 11.5222Z',
    fill: color
  })
});
const TopRightArrowIcon = ({
  color = '#0C1C33',
  size = 25,
  onPress
}) => jsxRuntime.jsx(Svg, {
  width: size,
  height: size,
  viewBox: '0 0 25 25',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: jsxRuntime.jsx(Svg.Path, {
    d: 'M21.3388 3.66117L21.3388 21.3388M21.3388 3.66117L3.66116 3.66117M21.3388 3.66117L3.66116 21.3388',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  })
});
const QueuedIcon = ({
  color = '#F4A358',
  size = 18,
  onPress
}) => jsxRuntime.jsxs(Svg, {
  width: size,
  height: size,
  viewBox: '0 0 18 18',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: [jsxRuntime.jsx(Svg.Rect, {
    width: '18',
    height: '18',
    rx: '4',
    fill: color,
    fillOpacity: '.2'
  }), jsxRuntime.jsx(Svg.Path, {
    d: 'M11.6756 12.6482C11.8311 12.8601 12.1306 12.9075 12.3268 12.7326C13.1311 12.0158 13.6857 11.055 13.9009 9.99071C14.1476 8.77034 13.9301 7.50182 13.2909 6.43333C12.6518 5.36484 11.637 4.57324 10.4451 4.2134C9.25315 3.85356 7.96985 3.95136 6.84622 4.48768C5.72259 5.024 4.83949 5.96024 4.36966 7.11325C3.89983 8.26626 3.87708 9.55308 4.30587 10.722C4.73466 11.8909 5.58412 12.8577 6.6881 13.4334C7.65084 13.9355 8.74673 14.1085 9.80981 13.934C10.0691 13.8914 10.2207 13.6287 10.1537 13.3746C10.0867 13.1205 9.82636 12.9718 9.56614 13.0086C8.7336 13.1262 7.88063 12.982 7.12813 12.5896C6.23429 12.1235 5.5465 11.3406 5.19933 10.3942C4.85216 9.44781 4.87057 8.40592 5.25098 7.47237C5.63138 6.53882 6.3464 5.78078 7.25616 5.34654C8.16592 4.91231 9.20497 4.83312 10.17 5.12447C11.1351 5.41582 11.9567 6.05674 12.4742 6.92186C12.9917 7.78698 13.1678 8.81405 12.9681 9.80215C12.7999 10.634 12.3756 11.3878 11.7605 11.9612C11.5683 12.1404 11.5202 12.4362 11.6756 12.6482Z',
    fill: color
  })]
});
const PooledIcon = ({
  color = '#008DE4',
  size = 18,
  onPress
}) => jsxRuntime.jsxs(Svg, {
  width: size,
  height: size,
  viewBox: '0 0 18 18',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: [jsxRuntime.jsx(Svg.Rect, {
    width: '18',
    height: '18',
    rx: '4',
    fill: color,
    fillOpacity: '.2'
  }), jsxRuntime.jsx(Svg.Path, {
    d: 'M14 7L12.4328 6.01491C11.4484 5.39611 10.1941 5.40565 9.21918 6.03935C8.30752 6.63193 7.14565 6.6816 6.18674 6.16899L4 5',
    stroke: color,
    strokeLinecap: 'round'
  }), jsxRuntime.jsx(Svg.Path, {
    d: 'M14 10L12.4328 9.01491C11.4484 8.39611 10.1941 8.40565 9.21918 9.03935C8.30752 9.63193 7.14565 9.6816 6.18674 9.16899L4 8',
    stroke: color,
    strokeLinecap: 'round'
  }), jsxRuntime.jsx(Svg.Path, {
    d: 'M14 13L12.4328 12.0149C11.4484 11.3961 10.1941 11.4057 9.21918 12.0393C8.30752 12.6319 7.14565 12.6816 6.18674 12.169L4 11',
    stroke: color,
    strokeLinecap: 'round'
  })]
});
const BroadcastedIcon = ({
  color = '#008DE4',
  size = 18,
  onPress
}) => jsxRuntime.jsxs(Svg, {
  width: size,
  height: size,
  viewBox: '0 0 18 18',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: [jsxRuntime.jsx(Svg.Rect, {
    width: '18',
    height: '18',
    rx: '4',
    fill: color,
    fillOpacity: '.2'
  }), jsxRuntime.jsx(Svg.Path, {
    d: 'M4.86093 8.74967L12.5 8.74993M12.5 8.74993L9.5 5.74993M12.5 8.74993L9.5 11.7499',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  })]
});
// Export all icons as a collection
const Icons = {
  ArrowIcon,
  CopyIcon,
  SuccessIcon,
  ErrorIcon,
  CheckIcon,
  CrossIcon,
  PlusIcon,
  ChevronIcon,
  SearchIcon,
  InfoCircleIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  TopRightArrowIcon,
  QueuedIcon,
  PooledIcon,
  BroadcastedIcon,
  AsteriskIcon
};

const inputStyles = classVarianceAuthority.cva('w-full font-normal text-sm leading-[17px]', {
  variants: {
    colorScheme: {
      default: '',
      brand: '',
      error: '',
      success: '',
      'light-gray': ''
    },
    size: {
      sm: 'px-3 py-2 rounded-[10px]',
      md: 'px-4 py-3 rounded-[12px]',
      xl: 'px-4 py-[18px] rounded-[14px]'
    },
    variant: {
      outlined: 'border',
      filled: 'border-0'
    },
    disabled: {
      false: '',
      true: 'opacity-60'
    }
  },
  compoundVariants: [
  // Outlined variant colors
  {
    variant: 'outlined',
    colorScheme: 'default',
    class: 'border-[rgba(17,17,17,0.32)] bg-white'
  }, {
    variant: 'outlined',
    colorScheme: 'brand',
    class: 'border-dash-brand/30 bg-white'
  }, {
    variant: 'outlined',
    colorScheme: 'error',
    class: 'border-red-500 bg-white'
  }, {
    variant: 'outlined',
    colorScheme: 'success',
    class: 'border-green-500 bg-white'
  }, {
    variant: 'outlined',
    colorScheme: 'light-gray',
    class: 'border-gray-500/50 bg-white'
  },
  // Filled variant colors
  {
    variant: 'filled',
    colorScheme: 'default',
    class: 'bg-dash-brand/15'
  }, {
    variant: 'filled',
    colorScheme: 'brand',
    class: 'bg-dash-brand/15'
  }, {
    variant: 'filled',
    colorScheme: 'error',
    class: 'bg-red-500/15'
  }, {
    variant: 'filled',
    colorScheme: 'success',
    class: 'bg-green-500/15'
  }, {
    variant: 'filled',
    colorScheme: 'light-gray',
    class: 'bg-gray-100'
  }],
  defaultVariants: {
    colorScheme: 'default',
    size: 'xl',
    variant: 'outlined',
    disabled: false
  }
});
/**
 * React Native Input component that adapts to various color schemes, sizes, variants, and states.
 * For password inputs (secureTextEntry), includes a toggleable eye icon.
 * Supports prefix text or elements before input content.
 *
 * @example
 * <Input
 *   secureTextEntry
 *   placeholder="Enter password"
 *   colorScheme="brand"
 *   size="xl"
 *   prefix="https://"
 * />
 */
const Input = _a => {
  var _b;
  var {
      theme = 'light',
      className = '',
      colorScheme,
      colorSchemeLight,
      colorSchemeDark,
      size,
      variant,
      error = false,
      success = false,
      disabled = false,
      secureTextEntry = false,
      prefix,
      prefixStyle,
      showPasswordToggle = true,
      style,
      textStyle
    } = _a,
    props = tslib.__rest(_a, ["theme", "className", "colorScheme", "colorSchemeLight", "colorSchemeDark", "size", "variant", "error", "success", "disabled", "secureTextEntry", "prefix", "prefixStyle", "showPasswordToggle", "style", "textStyle"]);
  const [showPassword, setShowPassword] = react.useState(false);
  // Determine color scheme based on state
  const effectiveColorScheme = (_b = resolveColorScheme(theme, colorScheme, colorSchemeLight, colorSchemeDark)) !== null && _b !== void 0 ? _b : 'default';
  let finalColorScheme = effectiveColorScheme;
  if (error) finalColorScheme = 'error';else if (success) finalColorScheme = 'success';
  const classes = inputStyles({
    colorScheme: finalColorScheme,
    size,
    variant,
    disabled
  }) + (className ? ` ${className}` : '');
  const isPassword = secureTextEntry;
  const shouldShowToggle = isPassword && showPasswordToggle;
  const hasPrefix = Boolean(prefix);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // Convert Tailwind classes to React Native style objects
  const inputStyle = [cn(classes), style].filter(Boolean);
  const inputTextStyle = [{
    color: '#111111',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '300'
  }, textStyle].filter(Boolean);
  // Adjust padding for password toggle button and prefix
  const containerStyle = {};
  if (shouldShowToggle) containerStyle.paddingRight = 40;
  if (hasPrefix) containerStyle.paddingLeft = 70; // Extra space for prefix
  // Default prefix style
  const defaultPrefixStyle = {
    color: 'rgba(17, 17, 17, 0.6)',
    fontSize: 14,
    lineHeight: 17
  };
  // Render prefix element
  const renderPrefix = () => {
    if (!hasPrefix) return null;
    return jsxRuntime.jsx(reactNative.View, {
      style: {
        position: 'absolute',
        left: 16,
        height: '100%',
        justifyContent: 'center',
        zIndex: 10,
        pointerEvents: 'none'
      },
      children: typeof prefix === 'string' ? jsxRuntime.jsx(reactNative.Text, {
        style: [defaultPrefixStyle, prefixStyle],
        children: prefix
      }) : prefix
    });
  };
  if (isPassword || hasPrefix) {
    return jsxRuntime.jsxs(reactNative.View, {
      style: {
        position: 'relative'
      },
      children: [renderPrefix(), jsxRuntime.jsx(reactNative.TextInput, Object.assign({
        style: [inputStyle, containerStyle, inputTextStyle],
        editable: !disabled,
        secureTextEntry: isPassword && !showPassword,
        placeholderTextColor: "rgba(17, 17, 17, 0.6)"
      }, props)), shouldShowToggle && jsxRuntime.jsx(reactNative.TouchableOpacity, {
        style: {
          position: 'absolute',
          right: 16,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0.5
        },
        onPress: togglePasswordVisibility,
        activeOpacity: 0.7,
        children: showPassword ? jsxRuntime.jsx(EyeClosedIcon, {
          size: 16,
          color: '#0C1C33'
        }) : jsxRuntime.jsx(EyeOpenIcon, {
          size: 16,
          color: '#0C1C33'
        })
      })]
    });
  }
  // Regular input without prefix or password
  return jsxRuntime.jsx(reactNative.TextInput, Object.assign({
    style: [inputStyle, inputTextStyle],
    editable: !disabled,
    placeholderTextColor: "rgba(17, 17, 17, 0.6)"
  }, props));
};

const tabsRootStyles = classVarianceAuthority.cva('flex-col w-full', {
  variants: {
    theme: {
      light: '',
      dark: ''
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
const tabsListStyles = classVarianceAuthority.cva('flex-row relative', {
  variants: {
    theme: {
      light: '',
      dark: ''
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
const tabsTriggerStyles = classVarianceAuthority.cva(['flex-row items-center justify-center relative', 'font-light transition-all'], {
  variants: {
    theme: {
      light: '',
      dark: ''
    },
    active: {
      true: '',
      false: ''
    },
    size: {
      sm: 'text-sm px-0 pr-3 pb-2',
      lg: 'text-xl px-0 pr-4 pb-3',
      xl: 'text-2xl px-0 pr-[14px] pb-[10px]'
    }
  },
  compoundVariants: [{
    theme: 'light',
    active: true,
    class: 'text-dash-primary-dark-blue'
  }, {
    theme: 'light',
    active: false,
    class: 'text-[rgba(12,28,51,0.35)]'
  }, {
    theme: 'dark',
    active: true,
    class: 'text-white'
  }, {
    theme: 'dark',
    active: false,
    class: 'text-gray-400'
  }],
  defaultVariants: {
    theme: 'light',
    active: false,
    size: 'xl'
  }
});
const tabsContentStyles = classVarianceAuthority.cva('', {
  variants: {
    theme: {
      light: '',
      dark: ''
    },
    size: {
      sm: 'mt-2',
      lg: 'mt-3',
      xl: 'mt-4'
    }
  },
  defaultVariants: {
    theme: 'light',
    size: 'xl'
  }
});
/**
 * React Native Tabs component with sleek underline style matching Figma design.
 * Features horizontal scrolling, light/dark theme support, and touch interactions.
 */
const Tabs = ({
  items,
  value,
  defaultValue,
  onValueChange,
  size = 'xl',
  theme = 'light',
  className = '',
  listClassName = '',
  triggerClassName = '',
  contentClassName = '',
  style,
  listStyle,
  triggerStyle,
  contentStyle,
  textStyle
}) => {
  var _a;
  const [internalValue, setInternalValue] = react.useState(defaultValue || ((_a = items[0]) === null || _a === void 0 ? void 0 : _a.value) || '');
  // Use controlled value if provided, otherwise use internal state
  const currentValue = value !== undefined ? value : internalValue;
  const handleValueChange = newValue => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(newValue);
  };
  const rootClasses = tabsRootStyles({
    theme
  }) + (className ? ` ${className}` : '');
  const listClasses = tabsListStyles({
    theme
  }) + (listClassName ? ` ${listClassName}` : '');
  const contentClasses = tabsContentStyles({
    theme,
    size
  }) + (contentClassName ? ` ${contentClassName}` : '');
  const rootStyle = [cn(rootClasses), style].filter(Boolean);
  const listStyleCombined = [cn(listClasses), listStyle].filter(Boolean);
  const contentStyleCombined = [cn(contentClasses), contentStyle].filter(Boolean);
  // Border color based on theme
  const borderColor = theme === 'light' ? 'rgba(12, 28, 51, 0.15)' : 'rgba(156, 163, 175, 0.5)';
  const activeBorderColor = '#4C7EFF';
  return jsxRuntime.jsxs(reactNative.View, {
    style: rootStyle,
    children: [jsxRuntime.jsxs(reactNative.View, {
      style: {
        position: 'relative'
      },
      children: [jsxRuntime.jsx(reactNative.ScrollView, {
        horizontal: true,
        showsHorizontalScrollIndicator: false,
        style: listStyleCombined,
        contentContainerStyle: {
          flexDirection: 'row'
        },
        children: items.map(item => {
          const isActive = currentValue === item.value;
          const triggerClasses = tabsTriggerStyles({
            theme,
            active: isActive,
            size
          }) + (triggerClassName ? ` ${triggerClassName}` : '');
          const triggerStyleCombined = [cn(triggerClasses), triggerStyle].filter(Boolean);
          // Get text size based on size prop
          let fontSize = 24; // xl
          let lineHeight = 33; // xl (1.366)
          if (size === 'sm') {
            fontSize = 14;
            lineHeight = 18; // 1.25
          } else if (size === 'lg') {
            fontSize = 20;
            lineHeight = 26; // 1.3
          }
          // Text color based on theme and active state
          let textColor = 'rgba(12, 28, 51, 0.35)'; // light inactive
          if (theme === 'light' && isActive) {
            textColor = '#0C1C33'; // light active
          } else if (theme === 'dark' && isActive) {
            textColor = '#FFFFFF'; // dark active
          } else if (theme === 'dark' && !isActive) {
            textColor = 'rgba(156, 163, 175, 1)'; // dark inactive
          }
          const baseTextStyle = {
            fontSize,
            lineHeight,
            color: textColor,
            fontWeight: isActive ? '500' : '300'
          };
          const finalTextStyle = [baseTextStyle, textStyle].filter(Boolean);
          return jsxRuntime.jsxs(reactNative.TouchableOpacity, {
            disabled: item.disabled,
            onPress: () => !item.disabled && handleValueChange(item.value),
            activeOpacity: 0.8,
            style: triggerStyleCombined,
            children: [jsxRuntime.jsx(reactNative.Text, {
              style: finalTextStyle,
              children: item.label
            }), isActive && jsxRuntime.jsx(reactNative.View, {
              style: {
                position: 'absolute',
                bottom: 0,
                left: -4,
                right: size === 'sm' ? 12 : size === 'lg' ? 16 : 14,
                height: 1,
                backgroundColor: activeBorderColor,
                zIndex: 10
              }
            })]
          }, item.value);
        })
      }), jsxRuntime.jsx(reactNative.View, {
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: borderColor
        }
      })]
    }), items.map(item => {
      if (currentValue !== item.value) return null;
      return jsxRuntime.jsx(reactNative.View, {
        style: contentStyleCombined,
        children: item.content
      }, item.value);
    })]
  });
};

/**
 * Avatar component that creates unique identicons from usernames
 * with customizable appearance.
 *
 * This is the React Native version that uses SvgXml instead of img tag.
 */
const Avatar = _a => {
  var {
      username,
      className = '',
      saturation = 50,
      lightness = 50,
      width = 40,
      height = 40,
      style
    } = _a,
    props = tslib.__rest(_a, ["username", "className", "saturation", "lightness", "width", "height", "style"]);
  // Generate SVG string directly (no data URI needed for SvgXml)
  const svgString = react.useMemo(() => minidenticons.minidenticon(username, saturation, lightness), [username, saturation, lightness]);
  const containerClasses = `relative ${className}`.trim();
  const containerStyle = [cn(containerClasses), style].filter(Boolean);
  return jsxRuntime.jsx(reactNative.View, Object.assign({
    style: containerStyle
  }, props, {
    children: jsxRuntime.jsx(Svg.SvgXml, {
      xml: svgString,
      width: width,
      height: height
    })
  }));
};

// Base badge container styles
const badgeStyles = classVarianceAuthority.cva('inline-flex items-center justify-center font-medium', {
  variants: {
    size: {
      xxs: 'px-1 py-1 text-xs rounded-full',
      xs: 'px-2 py-1 text-xs rounded-full',
      sm: 'px-[34px] py-[10px] text-xs rounded-full',
      xl: 'px-9 py-4 text-lg rounded-full'
    },
    borderRadius: {
      default: '',
      xs: 'rounded-[4px]'
    },
    // Color and variant combinations - blue
    color_variant_blue_default: {
      true: ''
    },
    color_variant_blue_flat: {
      true: 'bg-[rgba(76,126,255,0.15)]'
    },
    color_variant_blue_solid: {
      true: 'bg-[#4C7EFF]'
    },
    color_variant_blue_bordered: {
      true: 'border border-[#4C7EFF]'
    },
    // Color and variant combinations - white
    color_variant_white_default: {
      true: ''
    },
    color_variant_white_flat: {
      true: 'bg-[rgba(255,255,255,0.15)]'
    },
    color_variant_white_solid: {
      true: 'bg-white'
    },
    color_variant_white_bordered: {
      true: 'border border-white'
    },
    // Color and variant combinations - gray
    color_variant_gray_default: {
      true: ''
    },
    color_variant_gray_flat: {
      true: 'bg-[rgba(12,28,51,0.15)]'
    },
    color_variant_gray_solid: {
      true: 'bg-[#0C1C33]'
    },
    color_variant_gray_bordered: {
      true: 'border border-[#0C1C33]'
    },
    // Color and variant combinations - light-gray
    color_variant_lightgray_default: {
      true: ''
    },
    color_variant_lightgray_flat: {
      true: 'bg-[rgba(12,28,51,0.05)]'
    },
    color_variant_lightgray_solid: {
      true: 'bg-[rgba(12,28,51,0.15)]'
    },
    color_variant_lightgray_bordered: {
      true: 'border border-[#6B7280]'
    },
    // Color and variant combinations - turquoise
    color_variant_turquoise_default: {
      true: ''
    },
    color_variant_turquoise_flat: {
      true: 'bg-[rgba(96,246,210,0.15)]'
    },
    color_variant_turquoise_solid: {
      true: 'bg-[#60F6D2]'
    },
    color_variant_turquoise_bordered: {
      true: 'border border-[#60F6D2]'
    },
    // Color and variant combinations - red
    color_variant_red_default: {
      true: ''
    },
    color_variant_red_flat: {
      true: 'bg-[rgba(205,46,0,0.15)]'
    },
    color_variant_red_solid: {
      true: 'bg-[#CD2E00]'
    },
    color_variant_red_bordered: {
      true: 'border border-[#CD2E00]'
    },
    // Color and variant combinations - orange
    color_variant_orange_default: {
      true: ''
    },
    color_variant_orange_flat: {
      true: 'bg-[rgba(249,143,18,0.15)]'
    },
    color_variant_orange_solid: {
      true: 'bg-[#F98F12]'
    },
    color_variant_orange_bordered: {
      true: 'border border-[#F98F12]'
    }
  },
  defaultVariants: {
    size: 'sm',
    borderRadius: 'default'
  }
});
// Text color styles
const textStyles = classVarianceAuthority.cva('font-medium', {
  variants: {
    size: {
      xxs: 'text-xs',
      xs: 'text-xs',
      sm: 'text-xs',
      xl: 'text-lg'
    },
    // Text colors for each color and variant combination
    color_variant_blue_default: {
      true: 'text-[#4C7EFF]'
    },
    color_variant_blue_flat: {
      true: 'text-[#4C7EFF]'
    },
    color_variant_blue_solid: {
      true: 'text-white'
    },
    color_variant_blue_bordered: {
      true: 'text-[#4C7EFF]'
    },
    color_variant_white_default: {
      true: 'text-white'
    },
    color_variant_white_flat: {
      true: 'text-white'
    },
    color_variant_white_solid: {
      true: 'text-[#0C1C33]'
    },
    color_variant_white_bordered: {
      true: 'text-white'
    },
    color_variant_gray_default: {
      true: 'text-[#0C1C33]'
    },
    color_variant_gray_flat: {
      true: 'text-[#0C1C33]'
    },
    color_variant_gray_solid: {
      true: 'text-white'
    },
    color_variant_gray_bordered: {
      true: 'text-[#0C1C33]'
    },
    color_variant_lightgray_default: {
      true: 'text-[#6B7280]'
    },
    color_variant_lightgray_flat: {
      true: 'text-[#0C1C33]'
    },
    color_variant_lightgray_solid: {
      true: 'text-[#0C1C33]'
    },
    color_variant_lightgray_bordered: {
      true: 'text-[#6B7280]'
    },
    color_variant_turquoise_default: {
      true: 'text-[#60F6D2]'
    },
    color_variant_turquoise_flat: {
      true: 'text-[#60F6D2]'
    },
    color_variant_turquoise_solid: {
      true: 'text-[#0C1C33]'
    },
    color_variant_turquoise_bordered: {
      true: 'text-[#60F6D2]'
    },
    color_variant_red_default: {
      true: 'text-[#CD2E00]'
    },
    color_variant_red_flat: {
      true: 'text-[#CD2E00]'
    },
    color_variant_red_solid: {
      true: 'text-white'
    },
    color_variant_red_bordered: {
      true: 'text-[#CD2E00]'
    },
    color_variant_orange_default: {
      true: 'text-[#F98F12]'
    },
    color_variant_orange_flat: {
      true: 'text-[#F98F12]'
    },
    color_variant_orange_solid: {
      true: 'text-white'
    },
    color_variant_orange_bordered: {
      true: 'text-[#F98F12]'
    }
  },
  defaultVariants: {
    size: 'sm'
  }
});
// Mapping object for color key normalization (handles dashes)
const COLOR_KEY_MAP = {
  'blue': 'blue',
  'white': 'white',
  'gray': 'gray',
  'light-gray': 'lightgray',
  'turquoise': 'turquoise',
  'red': 'red',
  'orange': 'orange'
};
/**
 * React Native Badge component with multiple variants, colors, sizes, and border radius options.
 * Uses CVA for variant management and twrnc for Tailwind styling.
 *
 * Supports 28 style combinations (7 colors × 4 variants) with 4 sizes and optional custom border radius.
 */
const Badge = _a => {
  var _b;
  var {
      children,
      theme = 'light',
      variant = 'default',
      color,
      colorLight,
      colorDark,
      size = 'sm',
      borderRadius,
      className = '',
      style,
      textStyle,
      onPress
    } = _a,
    props = tslib.__rest(_a, ["children", "theme", "variant", "color", "colorLight", "colorDark", "size", "borderRadius", "className", "style", "textStyle", "onPress"]);
  const effectiveColor = (_b = resolveColorScheme(theme, color, colorLight, colorDark)) !== null && _b !== void 0 ? _b : 'blue';
  // Generate the color_variant key for CVA using explicit mapping
  const normalizedColor = COLOR_KEY_MAP[effectiveColor] || effectiveColor;
  const colorVariantKey = `color_variant_${normalizedColor}_${variant}`;
  // Build the badge container classes with proper typing
  const badgeVariantProps = {
    size,
    borderRadius: borderRadius || 'default',
    [colorVariantKey]: true
  };
  const badgeClasses = badgeStyles(badgeVariantProps);
  // Build the text classes with proper typing
  const textVariantProps = {
    size,
    [colorVariantKey]: true
  };
  const textClasses = textStyles(textVariantProps);
  // Convert Tailwind classes to React Native style objects
  const combinedClasses = className ? `${badgeClasses} ${className}` : badgeClasses;
  const badgeStyleArray = [cn(combinedClasses), style].filter(Boolean);
  const textStyleMerged = [cn(textClasses), textStyle].filter(Boolean);
  // Render content (string children wrapped in Text, custom content as-is)
  const content = typeof children === 'string' ? jsxRuntime.jsx(reactNative.Text, {
    style: textStyleMerged,
    children: children
  }) : children;
  // If onPress is provided, wrap in Pressable
  if (onPress) {
    return jsxRuntime.jsx(reactNative.Pressable, Object.assign({
      style: ({
        pressed
      }) => pressed ? [...badgeStyleArray, {
        opacity: 0.7
      }] : badgeStyleArray,
      onPress: onPress
    }, props, {
      children: content
    }));
  }
  // Otherwise, just render as View
  return jsxRuntime.jsx(reactNative.View, {
    style: badgeStyleArray,
    children: content
  });
};

/**
 * Groups digits into chunks of three, right to left.
 * Used for formatting large numbers with thousand separators.
 */
const groupDigits = intPart => {
  return intPart.split('').reverse().reduce((acc, char, idx) => {
    if (idx % 3 === 0) acc.unshift('');
    acc[0] = char + acc[0];
    return acc;
  }, []);
};
/**
 * Splits a numeric string into groups of three characters for display.
 * Supports two variants:
 * - `space`: groups separated by gap
 * - `comma`: groups separated by commas, with decimal part after `.`
 * Supports light/dark theme via dark: variants.
 */
const BigNumber = ({
  children,
  variant = 'space',
  className = '',
  decimalPointSpacing = -2,
  style,
  textStyle
}) => {
  const decimalPointStyle = {
    marginLeft: decimalPointSpacing,
    marginRight: decimalPointSpacing
  };
  if (children === undefined || children === null) return null;
  const str = children.toString();
  // Combine base styles with optional className
  const containerClasses = `flex-row flex-wrap gap-1 ${className || ''}`;
  const textClasses = 'dark:text-gray-100';
  const containerStyle = [cn(containerClasses), style].filter(Boolean);
  const textStyleMerged = [cn(textClasses), textStyle].filter(Boolean);
  if (variant === 'space') {
    // Split into integer and decimal parts
    const [intPart, fracPart] = str.split('.');
    // group digits every 3, right to left (only for integer part)
    const groups = groupDigits(intPart);
    return jsxRuntime.jsxs(reactNative.View, {
      style: containerStyle,
      children: [groups.map((grp, i) => jsxRuntime.jsx(reactNative.Text, {
        style: textStyleMerged,
        children: grp
      }, i)), fracPart != null && jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [jsxRuntime.jsx(reactNative.Text, {
          style: [...textStyleMerged, decimalPointStyle],
          children: "."
        }), jsxRuntime.jsx(reactNative.Text, {
          style: textStyleMerged,
          children: fracPart
        })]
      })]
    });
  } else {
    // comma variant
    const [intPart, fracPart] = str.split('.');
    const groups = groupDigits(intPart);
    return jsxRuntime.jsxs(reactNative.View, {
      style: containerStyle,
      children: [groups.map((grp, i) => jsxRuntime.jsxs(reactNative.View, {
        style: cn('flex-row'),
        children: [jsxRuntime.jsx(reactNative.Text, {
          style: textStyleMerged,
          children: grp
        }), i < groups.length - 1 && jsxRuntime.jsx(reactNative.Text, {
          style: textStyleMerged,
          children: ","
        })]
      }, i)), fracPart != null && jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [jsxRuntime.jsx(reactNative.Text, {
          style: [...textStyleMerged, decimalPointStyle],
          children: "."
        }), jsxRuntime.jsx(reactNative.Text, {
          style: textStyleMerged,
          children: fracPart
        })]
      })]
    });
  }
};

/**
 * Universal Clipboard utility for React Native and Expo
 *
 * Supports both:
 * - @react-native-clipboard/clipboard (React Native)
 * - expo-clipboard (Expo)
 *
 * Automatically detects which one is available and uses it.
 */
let clipboardInstance = null;
/**
 * Get the clipboard instance
 * Tries to load expo-clipboard first, then falls back to @react-native-clipboard/clipboard
 */
function getClipboard() {
  if (clipboardInstance) {
    return clipboardInstance;
  }
  try {
    // Try expo-clipboard first (most common in Expo projects)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ExpoClipboard = require('expo-clipboard');
    if ((ExpoClipboard === null || ExpoClipboard === void 0 ? void 0 : ExpoClipboard.setStringAsync) && (ExpoClipboard === null || ExpoClipboard === void 0 ? void 0 : ExpoClipboard.getStringAsync)) {
      clipboardInstance = {
        setString: text => {
          ExpoClipboard.setStringAsync(text).catch(err => {
            console.warn('[dash-ui-kit] Failed to copy to clipboard:', err);
          });
        },
        getString: () => ExpoClipboard.getStringAsync()
      };
      return clipboardInstance;
    }
  } catch (err) {
    // expo-clipboard not available, continue to try React Native clipboard
  }
  try {
    // Try @react-native-clipboard/clipboard (React Native)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const RNClipboard = require('@react-native-clipboard/clipboard');
    if ((RNClipboard === null || RNClipboard === void 0 ? void 0 : RNClipboard.default) || (RNClipboard === null || RNClipboard === void 0 ? void 0 : RNClipboard.Clipboard)) {
      const clipboard = RNClipboard.default || RNClipboard.Clipboard;
      clipboardInstance = {
        setString: text => clipboard.setString(text),
        getString: () => clipboard.getString()
      };
      return clipboardInstance;
    }
  } catch (err) {
    // @react-native-clipboard/clipboard not available
  }
  // No clipboard available - return stub
  console.warn('[dash-ui-kit] No clipboard library found. Please install either:\n' + '  - expo-clipboard (for Expo projects): npx expo install expo-clipboard\n' + '  - @react-native-clipboard/clipboard (for React Native): npm install @react-native-clipboard/clipboard');
  clipboardInstance = {
    setString: () => {
      console.warn('[dash-ui-kit] Clipboard not available');
    },
    getString: async () => ''
  };
  return clipboardInstance;
}
/**
 * Universal Clipboard object
 * Compatible with both expo-clipboard and @react-native-clipboard/clipboard
 */
const Clipboard = {
  /**
   * Set string to clipboard
   * @param text - Text to copy
   */
  setString: text => {
    const clipboard = getClipboard();
    clipboard.setString(text);
  },
  /**
   * Get string from clipboard
   * @returns Promise with clipboard content
   */
  getString: () => {
    const clipboard = getClipboard();
    return clipboard.getString();
  }
};

const FEEDBACK_DURATION_MS = 1000;
/**
 * React Native CopyButton component. Copies text to clipboard on press
 * and shows "Copied!" feedback briefly.
 */
const CopyButton = ({
  text,
  onCopy,
  className = '',
  style,
  textStyle,
  accessibilityLabel = 'Copy to clipboard'
}) => {
  const [copied, setCopied] = react.useState(false);
  const timeoutRef = react.useRef(null);
  const handlePress = react.useCallback(() => {
    Clipboard.setString(text);
    setCopied(true);
    onCopy === null || onCopy === void 0 ? void 0 : onCopy(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), FEEDBACK_DURATION_MS);
  }, [text, onCopy]);
  react.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  const buttonClasses = `p-0 flex-shrink-0 min-w-0 bg-transparent ${className}`.trim();
  const buttonStyle = [cn(buttonClasses), style].filter(Boolean);
  const copiedTextClasses = 'text-xs text-dash-brand font-medium';
  const copiedTextStyle = [cn(copiedTextClasses), textStyle].filter(Boolean);
  return jsxRuntime.jsx(reactNative.Pressable, {
    onPress: handlePress,
    style: ({
      pressed
    }) => [buttonStyle, pressed && {
      opacity: 0.7
    }].filter(Boolean),
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: "button",
    children: copied ? jsxRuntime.jsx(reactNative.View, {
      style: cn('items-center justify-center min-w-4 min-h-4'),
      children: jsxRuntime.jsx(reactNative.Text, {
        style: copiedTextStyle,
        children: "Copied!"
      })
    }) : jsxRuntime.jsx(CopyIcon, {
      color: "#0C1C33",
      size: 16
    })
  });
};

/**
 * NotActive component for React Native
 * Shows "n/a" text with theme-aware styling
 */
function NotActive(_a) {
  var {
      children,
      className = '',
      theme = 'light',
      style
    } = _a,
    props = tslib.__rest(_a, ["children", "className", "theme", "style"]);
  const themeColor = theme === 'dark' ? 'text-gray-500' : 'text-gray-400';
  const textClasses = `text-sm ${themeColor} ${className}`.trim();
  return jsxRuntime.jsx(reactNative.Text, Object.assign({
    style: [cn(textClasses), style].filter(Boolean)
  }, props, {
    children: children !== null && children !== void 0 ? children : 'n/a'
  }));
}

/** CVA for the root container with light/dark theme */
const identifier = classVarianceAuthority.cva('flex flex-row items-center font-dash-grotesque text-sm font-normal', {
  variants: {
    theme: {
      light: 'text-gray-900',
      dark: 'text-white'
    },
    ellipsis: {
      false: '',
      true: 'overflow-hidden'
    },
    highlight: {
      default: '',
      dim: '',
      highlight: '',
      first: '',
      last: '',
      both: ''
    }
  },
  defaultVariants: {
    theme: 'light',
    ellipsis: false,
    highlight: 'default'
  }
});
/** CVA for each symbol text: inherits root color or dims */
const symbol = classVarianceAuthority.cva('flex-1', {
  variants: {
    dim: {
      false: '',
      true: 'opacity-50'
    }
  },
  defaultVariants: {
    dim: false
  }
});
/** Highlight modes configuration */
const highlightModes = {
  default: {
    first: true,
    middle: false,
    last: true
  },
  dim: {
    first: false,
    middle: false,
    last: false
  },
  highlight: {
    first: true,
    middle: true,
    last: true
  },
  first: {
    first: true,
    middle: false,
    last: false
  },
  last: {
    first: false,
    middle: false,
    last: true
  },
  both: {
    first: true,
    middle: false,
    last: true
  }
};
/**
 * HighlightedID subcomponent
 * Renders text with highlighting based on mode
 */
const HighlightedID = ({
  children,
  mode,
  theme = 'light',
  textStyle
}) => {
  if (children == null || children === '') return jsxRuntime.jsx(NotActive, {
    theme: theme
  });
  const text = String(children);
  const cfg = highlightModes[mode];
  const count = 5;
  const minLength = count * 2 + 1; // 11
  if (text.length < minLength) {
    const symbolStyle = [cn(symbol({
      dim: cfg.middle
    })), textStyle].filter(Boolean);
    return jsxRuntime.jsx(reactNative.Text, {
      style: symbolStyle,
      children: text
    });
  }
  const first = text.slice(0, count);
  const middle = text.slice(count, text.length - count);
  const last = text.slice(-5);
  const firstStyle = [cn(symbol({
    dim: !cfg.first
  })), textStyle].filter(Boolean);
  const middleStyle = [cn(symbol({
    dim: !cfg.middle
  })), textStyle].filter(Boolean);
  const lastStyle = [cn(symbol({
    dim: !cfg.last
  })), textStyle].filter(Boolean);
  return jsxRuntime.jsxs(reactNative.Text, {
    children: [jsxRuntime.jsx(reactNative.Text, {
      style: firstStyle,
      children: first
    }), jsxRuntime.jsx(reactNative.Text, {
      style: middleStyle,
      children: middle
    }), jsxRuntime.jsx(reactNative.Text, {
      style: lastStyle,
      children: last
    })]
  });
};
/**
 * MiddleEllipsisText subcomponent
 * Renders text with ellipsis in the middle
 */
const MiddleEllipsisText = ({
  children,
  edgeChars,
  theme = 'light',
  textStyle
}) => {
  if (children == null || children === '') return jsxRuntime.jsx(NotActive, {
    theme: theme
  });
  const text = String(children);
  if (text.length <= edgeChars * 2) {
    const style = textStyle ? [textStyle] : undefined;
    return jsxRuntime.jsx(reactNative.Text, {
      style: style,
      children: text
    });
  }
  const first = text.slice(0, edgeChars);
  const last = text.slice(-edgeChars);
  const ellipsisStyle = [cn('opacity-50'), textStyle].filter(Boolean);
  return jsxRuntime.jsxs(reactNative.Text, {
    children: [jsxRuntime.jsx(reactNative.Text, {
      style: textStyle,
      children: first
    }), jsxRuntime.jsx(reactNative.Text, {
      style: ellipsisStyle,
      children: "\u2026"
    }), jsxRuntime.jsx(reactNative.Text, {
      style: textStyle,
      children: last
    })]
  });
};
/**
 * Identifier component for React Native
 * Shows an ID string with optional highlighting, avatar, copy button, and ellipsis modes.
 *
 * Features:
 * - Highlight modes: default, dim, highlight, first, last, both
 * - Ellipsis modes: standard (tail), middle, maxLines
 * - Avatar integration
 * - Copy button integration
 * - Theme support (light/dark)
 *
 * @example
 * ```tsx
 * <Identifier highlight="both">0x1234567890abcdef</Identifier>
 * <Identifier avatar copyButton>alice@example.com</Identifier>
 * <Identifier middleEllipsis edgeChars={6}>very-long-identifier</Identifier>
 * <Identifier maxLines={2}>Multi-line\nidentifier\ntext</Identifier>
 * ```
 */
const Identifier = _a => {
  var {
      children,
      ellipsis = false,
      highlight = undefined,
      avatar = false,
      copyButton = false,
      maxLines = 0,
      className = '',
      middleEllipsis = false,
      edgeChars = 4,
      theme = 'light',
      style,
      textStyle
    } = _a,
    props = tslib.__rest(_a, ["children", "ellipsis", "highlight", "avatar", "copyButton", "maxLines", "className", "middleEllipsis", "edgeChars", "theme", "style", "textStyle"]);
  const [containerWidth, setContainerWidth] = react.useState(0);
  // Handle container layout changes
  const handleLayout = react.useCallback(event => {
    const {
      width
    } = event.nativeEvent.layout;
    setContainerWidth(width);
  }, []);
  const rootClasses = `${identifier({
    theme: theme,
    ellipsis,
    highlight
  })} ${className}`.trim();
  // Determine if we should use standard ellipsis with numberOfLines
  const useStandardEllipsis = ellipsis === true && !middleEllipsis && maxLines === 0;
  const useMaxLines = maxLines > 0 && !middleEllipsis;
  // Symbol container classes
  const symbolContainerClass = ellipsis === true ? 'flex-1 overflow-hidden' : 'flex-1';
  // Merge text styles
  const finalTextStyle = [cn('leading-4'), textStyle].filter(Boolean);
  return jsxRuntime.jsxs(reactNative.View, Object.assign({
    style: [cn(rootClasses), style].filter(Boolean),
    onLayout: handleLayout
  }, props, {
    children: [avatar && children != null && children !== '' && jsxRuntime.jsx(Avatar, {
      username: children,
      className: "mr-2",
      width: 24,
      height: 24
    }), jsxRuntime.jsx(reactNative.View, {
      style: cn(symbolContainerClass),
      children: children != null && children !== '' && middleEllipsis ? jsxRuntime.jsx(MiddleEllipsisText, {
        edgeChars: edgeChars,
        theme: theme,
        textStyle: textStyle,
        children: children
      }) : children != null && children !== '' && highlight != null ? jsxRuntime.jsx(HighlightedID, {
        mode: highlight,
        theme: theme,
        textStyle: textStyle,
        children: children
      }) : children != null && children !== '' ? jsxRuntime.jsx(reactNative.Text, {
        numberOfLines: useStandardEllipsis ? 1 : useMaxLines ? maxLines : undefined,
        ellipsizeMode: useStandardEllipsis || useMaxLines ? 'tail' : undefined,
        style: finalTextStyle,
        children: children
      }) : jsxRuntime.jsx(NotActive, {
        theme: theme
      })
    }), copyButton && children != null && children !== '' && jsxRuntime.jsx(CopyButton, {
      className: "ml-3",
      text: children
    })]
  }));
};

/**
 * ValueCard CVA - twrnc-compatible classes.
 * dash-block-sm/md/xl expanded: px-3 py-2 rounded-[10px], px-[18px] py-3 rounded-[14px], px-[25px] py-5 rounded-[16px]
 * hover: classes omitted (RN uses Pressable opacity for press feedback)
 */
const valueCardStyles = classVarianceAuthority.cva('flex flex-row items-center', {
  variants: {
    theme: {
      light: 'border-gray-200',
      dark: 'bg-gray-800/50 border-gray-400'
    },
    colorScheme: {
      default: '',
      transparent: 'bg-transparent',
      green: 'text-green-500 bg-green-200 border-green-400',
      lightBlue: 'bg-[rgba(150,167,255,0.1)] border-[rgba(76,126,255,0.2)]',
      white: 'bg-white',
      lightGray: 'bg-[#0c1c3308]',
      yellow: 'bg-dash-yellow-light border-dash-yellow'
    },
    size: {
      xs: 'px-2 py-1 rounded',
      sm: 'px-3 py-2 rounded-[10px]',
      md: 'px-[18px] py-3 rounded-[14px]',
      xl: 'px-[25px] py-5 rounded-[16px]'
    },
    clickable: {
      false: '',
      true: ''
    },
    loading: {
      false: '',
      true: 'opacity-70'
    },
    border: {
      false: 'border-0',
      true: 'border'
    }
  },
  defaultVariants: {
    theme: 'light',
    colorScheme: 'default',
    size: 'md',
    clickable: false,
    loading: false,
    border: true
  }
});
/**
 * React Native ValueCard - card container with theme, color schemes, sizes,
 * clickability, loading state, and optional border.
 */
const ValueCard = _a => {
  var _b;
  var {
      theme = 'light',
      colorScheme,
      colorSchemeLight,
      colorSchemeDark,
      size = 'md',
      clickable = false,
      loading = false,
      border = true,
      className = '',
      style,
      children,
      onPress
    } = _a,
    props = tslib.__rest(_a, ["theme", "colorScheme", "colorSchemeLight", "colorSchemeDark", "size", "clickable", "loading", "border", "className", "style", "children", "onPress"]);
  const isClickable = Boolean(onPress !== null && onPress !== void 0 ? onPress : clickable);
  const isDisabled = loading;
  const effectiveColorScheme = (_b = resolveColorScheme(theme, colorScheme, colorSchemeLight, colorSchemeDark)) !== null && _b !== void 0 ? _b : 'default';
  const classes = valueCardStyles({
    theme,
    colorScheme: effectiveColorScheme,
    size,
    clickable: isClickable,
    loading,
    border
  });
  const combinedClasses = className ? `${classes} ${className}` : classes;
  const containerStyle = [cn(combinedClasses), style].filter(Boolean);
  const content = loading ? jsxRuntime.jsx(reactNative.ActivityIndicator, {
    testID: "value-card-loading",
    size: "small",
    color: effectiveColorScheme === 'green' ? '#22c55e' : effectiveColorScheme === 'lightBlue' ? '#4C7EFF' : '#6B7280'
  }) : children;
  if (isClickable && !isDisabled) {
    return jsxRuntime.jsx(reactNative.Pressable, Object.assign({
      style: ({
        pressed
      }) => [...containerStyle, pressed && {
        opacity: 0.9
      }],
      onPress: onPress,
      disabled: isDisabled
    }, props, {
      children: content
    }));
  }
  return jsxRuntime.jsx(reactNative.View, Object.assign({
    style: containerStyle
  }, props, {
    children: content
  }));
};

/**
 * Dash Logo component for React Native with customizable size and color
 * Original aspect ratio: 30:25 (1.2:1)
 *
 * Color can be set via:
 * - color prop (default: #4C7EFF)
 *
 * Container supports:
 * - containerPadding: padding around the logo
 * - containerSize: width/height of the container
 * - containerClassName: Tailwind classes for the container
 * - containerStyle: Additional style object for the container
 */
const DashLogo = ({
  color = '#4C7EFF',
  size,
  width,
  height,
  className = '',
  onPress,
  containerPadding,
  containerSize,
  containerClassName = '',
  containerStyle
}) => {
  const logoWidth = width || size || 30;
  const logoHeight = height || (size ? size * 25 / 30 : 25);
  const baseContainerClasses = 'flex justify-center items-center';
  const containerClasses = containerClassName ? `${baseContainerClasses} ${containerClassName}` : baseContainerClasses;
  const inlineContainerStyle = Object.assign({
    padding: containerPadding,
    width: containerSize,
    height: containerSize
  }, containerStyle);
  const combinedContainerStyle = [cn(containerClasses), inlineContainerStyle].filter(Boolean);
  const logoElement = jsxRuntime.jsxs(Svg, {
    width: logoWidth,
    height: logoHeight,
    viewBox: '0 0 30 25',
    fill: 'none',
    children: [jsxRuntime.jsx(Svg.Path, {
      d: 'M19.6465 0C29.2466 2.13767e-05 30.9542 5.2464 29.585 12.6006C28.6773 17.5547 26.3845 21.3391 22.5537 23.1084C20.8153 23.9084 19.1848 24.3555 15.3389 24.3555H4.44629L5.33887 19.293H14.9229C20.6921 19.3084 22.2159 16.8009 22.9697 14.6162C23.2467 13.8008 23.9084 11.2619 23.9238 9.76953C23.9699 6.84642 22.5383 5.07715 17.6768 5.07715L7.81543 5.06152L8.72363 0H19.6465Z',
      fill: color
    }), jsxRuntime.jsx(Svg.Path, {
      d: 'M15.2002 9.63184C15.2002 9.63184 15.0775 10.232 14.7236 11.709C14.4621 12.8321 14.0462 14.6934 11.1846 14.6934H0C0.00327153 14.6775 0.12745 14.0734 0.476562 12.6162C0.73811 11.493 1.15435 9.63184 4.01562 9.63184H15.2002Z',
      fill: color
    })]
  });
  if (onPress) {
    return jsxRuntime.jsx(reactNative.Pressable, {
      style: combinedContainerStyle,
      onPress: onPress,
      children: logoElement
    });
  }
  return jsxRuntime.jsx(reactNative.View, {
    style: combinedContainerStyle,
    children: logoElement
  });
};

const defaultColors = {
  light: {
    SUCCESS: '#1CC400',
    FAIL: '#F45858',
    QUEUED: '#F4A358',
    POOLED: '#008DE4',
    BROADCASTED: '#008DE4'
  },
  dark: {
    SUCCESS: '#22D32E',
    FAIL: '#FF6B6B',
    QUEUED: '#FFB366',
    POOLED: '#42A5F5',
    BROADCASTED: '#42A5F5'
  }
};
const iconMap = {
  SUCCESS: SuccessIcon,
  FAIL: ErrorIcon,
  QUEUED: QueuedIcon,
  POOLED: PooledIcon,
  BROADCASTED: BroadcastedIcon
};
/**
 * Renders an icon corresponding to the given `status`.
 * If `status` is not recognized, returns null.
 * Colors adapt to light/dark theme unless overridden.
 */
const TransactionStatusIcon = _a => {
  var {
      status,
      color,
      theme = 'light'
    } = _a,
    props = tslib.__rest(_a, ["status", "color", "theme"]);
  const IconComponent = iconMap[status];
  if (IconComponent == null) return null;
  const iconColor = color !== null && color !== void 0 ? color : defaultColors[theme][status];
  return jsxRuntime.jsx(IconComponent, Object.assign({
    color: iconColor
  }, props));
};

/**
 * Hook for debouncing values with extended functionality
 * React Native compatible version
 *
 * @param value - Value to debounce
 * @param options - Configuration options
 * @returns Object with debounced value and control methods
 */
const useDebounce = (value, options) => {
  // Backward compatibility support - if number is passed, it's delay
  const config = typeof options === 'number' ? {
    delay: options
  } : options;
  const {
    delay,
    callback,
    immediate = false
  } = config;
  const [debouncedValue, setDebouncedValue] = react.useState(value);
  const [isPending, setIsPending] = react.useState(false);
  const timeoutRef = react.useRef(null);
  const isFirstRun = react.useRef(true);
  const cancel = react.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setIsPending(false);
    }
  }, []);
  const flush = react.useCallback(() => {
    cancel();
    setDebouncedValue(value);
    callback === null || callback === void 0 ? void 0 : callback(value);
    setIsPending(false);
  }, [value, callback, cancel]);
  react.useEffect(() => {
    // If immediate === true and this is first run, set value immediately
    if (immediate && isFirstRun.current) {
      setDebouncedValue(value);
      callback === null || callback === void 0 ? void 0 : callback(value);
      isFirstRun.current = false;
      return;
    }
    isFirstRun.current = false;
    setIsPending(true);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      callback === null || callback === void 0 ? void 0 : callback(value);
      setIsPending(false);
      timeoutRef.current = null;
    }, delay);
    timeoutRef.current = handler;
    return () => {
      clearTimeout(handler);
      setIsPending(false);
    };
  }, [value, delay, callback, immediate]);
  // Cleanup on unmount
  react.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return {
    debouncedValue,
    flush,
    cancel,
    isPending
  };
};

/**
 * Design tokens for React Native
 *
 * These tokens are derived from the web theme (src/styles/theme.pcss)
 * and optimized for React Native StyleSheet usage.
 *
 * @example
 * ```typescript
 * import { colors, spacing, typography, borderRadius, shadows } from 'dash-ui-kit/react-native';
 * import { StyleSheet, Platform } from 'react-native';
 *
 * const styles = StyleSheet.create({
 *   container: {
 *     backgroundColor: colors.brand,
 *     padding: spacing[4],
 *     borderRadius: borderRadius.md,
 *     ...Platform.select({
 *       ios: shadows.md.ios,
 *       android: shadows.md.android,
 *     }),
 *   },
 *   title: {
 *     fontSize: typography.fontSize.xl,
 *     fontWeight: typography.fontWeight.semibold,
 *     lineHeight: typography.lineHeight.xl,
 *   },
 * });
 * ```
 */
/**
 * Color palette
 * Derived from theme.pcss color variables
 */
const colors = {
  // Brand colors
  brand: '#4C7EFF',
  brandDim: '#96A7FF',
  brandDark: '#4D5895',
  brandDarkness: '#13172A',
  // Accent colors
  mint: '#60F6D2',
  mintHover: '#4DD4B1',
  // Yellow variants
  yellowLight: '#fef3c7',
  yellow: '#fde68a',
  // Primary colors
  primaryDarkBlue: '#0C1C33',
  primaryDieSubdued: 'rgba(12, 28, 51, 0.03)',
  // State colors - Green
  green: '#40BF40',
  green75: 'rgba(64, 191, 64, 0.75)',
  green15: 'rgba(64, 191, 64, 0.15)',
  green5: 'rgba(64, 191, 64, 0.05)',
  // State colors - Red
  red: '#CD2E00',
  red75: 'rgba(205, 46, 0, 0.75)',
  red15: 'rgba(205, 46, 0, 0.15)',
  red5: 'rgba(205, 46, 0, 0.05)',
  // State colors - Orange
  orange: '#F98F12',
  orange75: 'rgba(249, 143, 18, 0.75)',
  orange15: 'rgba(249, 143, 18, 0.15)',
  orange5: 'rgba(249, 143, 18, 0.05)',
  // Common colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent'
};
/**
 * Spacing scale
 * Based on 4px base unit (Tailwind-compatible)
 */
const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  // 2.75rem from theme
  12: 48,
  14: 56,
  16: 64,
  18: 72,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256
};
/**
 * Typography scale
 * Font sizes, weights, and line heights
 */
const typography = {
  /**
   * Font size scale
   */
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128
  },
  /**
   * Font weight scale
   * Values are strings for React Native compatibility
   */
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800'
  },
  /**
   * Line height scale (in pixels)
   * Calculated based on common typography ratios
   */
  lineHeight: {
    xs: 16,
    // 1.33x
    sm: 20,
    // 1.43x
    base: 24,
    // 1.5x
    lg: 28,
    // 1.56x
    xl: 28,
    // 1.4x
    '2xl': 32,
    // 1.33x
    '3xl': 36,
    // 1.2x
    '4xl': 40,
    // 1.11x
    '5xl': 56,
    // 1.17x
    '6xl': 72,
    // 1.2x
    '7xl': 84,
    // 1.17x
    '8xl': 112,
    // 1.17x
    '9xl': 144 // 1.13x
  },
  /**
   * Letter spacing (tracking)
   */
  letterSpacing: {
    tighter: -0.8,
    tight: -0.4,
    normal: 0,
    wide: 0.4,
    wider: 0.8,
    widest: 1.6
  }
};
/**
 * Border radius scale
 */
const borderRadius = {
  none: 0,
  xs: 4,
  sm: 10,
  md: 12,
  lg: 14,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999
};
/**
 * Shadow presets
 * Platform-specific implementations for iOS and Android
 *
 * @example
 * ```typescript
 * import { Platform } from 'react-native';
 *
 * const shadowStyle = Platform.select({
 *   ios: shadows.md.ios,
 *   android: shadows.md.android,
 * });
 * ```
 */
const shadows = {
  /**
   * Small shadow - subtle elevation
   */
  sm: {
    ios: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.1,
      shadowRadius: 2
    },
    android: {
      elevation: 2
    }
  },
  /**
   * Medium shadow - standard elevation
   */
  md: {
    ios: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.15,
      shadowRadius: 4
    },
    android: {
      elevation: 4
    }
  },
  /**
   * Large shadow - prominent elevation
   */
  lg: {
    ios: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: 0.2,
      shadowRadius: 8
    },
    android: {
      elevation: 8
    }
  },
  /**
   * Extra large shadow - maximum elevation
   */
  xl: {
    ios: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 8
      },
      shadowOpacity: 0.25,
      shadowRadius: 16
    },
    android: {
      elevation: 12
    }
  }
};
/**
 * Border width scale
 */
const borderWidth = {
  0: 0,
  1: 1,
  2: 2,
  4: 4,
  8: 8
};
/**
 * Opacity scale
 */
const opacity = {
  0: 0,
  5: 0.05,
  10: 0.1,
  15: 0.15,
  20: 0.2,
  25: 0.25,
  30: 0.3,
  40: 0.4,
  50: 0.5,
  60: 0.6,
  70: 0.7,
  75: 0.75,
  80: 0.8,
  90: 0.9,
  95: 0.95,
  100: 1
};
/**
 * Z-index scale
 */
const zIndex = {
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  auto: 'auto'
};

/**
 * Utility functions for React Native styles
 */
/**
 * Creates an rgba color string from hex color and opacity
 *
 * @param hexColor - Hex color string (e.g., '#4C7EFF')
 * @param alpha - Opacity value between 0 and 1
 * @returns rgba color string
 *
 * @example
 * ```typescript
 * rgba('#4C7EFF', 0.5) // 'rgba(76, 126, 255, 0.5)'
 * rgba('#40BF40', 0.15) // 'rgba(64, 191, 64, 0.15)'
 * ```
 */
function rgba(hexColor, alpha) {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
/**
 * Converts hex color to rgba
 * Alias for rgba() with more explicit naming
 *
 * @param hexColor - Hex color string
 * @param alpha - Opacity value between 0 and 1
 * @returns rgba color string
 */
function hexToRgba(hexColor, alpha) {
  return rgba(hexColor, alpha);
}
/**
 * Gets platform-specific shadow styles
 *
 * @param size - Shadow size: 'sm' | 'md' | 'lg' | 'xl'
 * @returns Platform-specific shadow styles
 *
 * @example
 * ```typescript
 * const styles = StyleSheet.create({
 *   card: {
 *     ...getShadow('md'),
 *   },
 * });
 * ```
 */
function getShadow(size) {
  if (reactNative.Platform.OS === 'ios') {
    return shadows[size].ios;
  } else if (reactNative.Platform.OS === 'android') {
    return shadows[size].android;
  }
  // Default to iOS shadow style for other platforms
  return shadows[size].ios;
}

exports.ArrowIcon = ArrowIcon;
exports.AsteriskIcon = AsteriskIcon;
exports.Avatar = Avatar;
exports.Badge = Badge;
exports.BigNumber = BigNumber;
exports.BroadcastedIcon = BroadcastedIcon;
exports.Button = Button;
exports.CheckIcon = CheckIcon;
exports.ChevronIcon = ChevronIcon;
exports.Clipboard = Clipboard;
exports.CopyButton = CopyButton;
exports.CopyIcon = CopyIcon;
exports.CrossIcon = CrossIcon;
exports.DashLogo = DashLogo;
exports.ErrorIcon = ErrorIcon;
exports.EyeClosedIcon = EyeClosedIcon;
exports.EyeOpenIcon = EyeOpenIcon;
exports.Heading = Heading;
exports.Icons = Icons;
exports.Identifier = Identifier;
exports.InfoCircleIcon = InfoCircleIcon;
exports.Input = Input;
exports.NotActive = NotActive;
exports.PlusIcon = PlusIcon;
exports.PooledIcon = PooledIcon;
exports.QueuedIcon = QueuedIcon;
exports.SearchIcon = SearchIcon;
exports.SuccessIcon = SuccessIcon;
exports.Tabs = Tabs;
exports.Text = Text;
exports.TopRightArrowIcon = TopRightArrowIcon;
exports.TransactionStatusIcon = TransactionStatusIcon;
exports.ValueCard = ValueCard;
exports.borderRadius = borderRadius;
exports.borderWidth = borderWidth;
exports.cn = cn;
exports.colors = colors;
exports.getShadow = getShadow;
exports.hexToRgba = hexToRgba;
exports.opacity = opacity;
exports.resolveColorScheme = resolveColorScheme;
exports.rgba = rgba;
exports.shadows = shadows;
exports.spacing = spacing;
exports.tw = tw;
exports.typography = typography;
exports.useDebounce = useDebounce;
exports.zIndex = zIndex;
//# sourceMappingURL=index.cjs.js.map
