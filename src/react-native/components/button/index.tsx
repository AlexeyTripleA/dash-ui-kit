import React from 'react'
import {
  Pressable,
  Text,
  ActivityIndicator,
  PressableProps,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/tw'
import { resolveColorScheme } from '../../utils/resolveColorScheme'

const buttonStyles = cva(
  'items-center justify-center flex-row min-h-11 transition-colors border border-transparent',
  {
    variants: {
      variant: {
        solid: '',
        outline: 'border-current bg-transparent',
        ghost: 'bg-transparent border-transparent',
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
        halfBlue: '',
      },
      size: {
        sm: 'px-3 py-2',
        md: 'px-[18px] py-3',
        lg: 'px-6 py-4',
        xl: 'px-[25px] py-5',
      },
      rounded: {
        default: '',
        full: 'rounded-full',
      },
      disabled: {
        false: '',
        true: 'opacity-50',
      },
    },
    compoundVariants: [
      // Border radius per size (when rounded is default)
      {
        size: 'sm',
        rounded: 'default',
        class: 'rounded-[10px]',
      },
      {
        size: 'md',
        rounded: 'default',
        class: 'rounded-[14px]',
      },
      {
        size: 'lg',
        rounded: 'default',
        class: 'rounded-[14px]',
      },
      {
        size: 'xl',
        rounded: 'default',
        class: 'rounded-[16px]',
      },
      // Solid variants - brand
      {
        variant: 'solid',
        colorScheme: 'brand',
        disabled: false,
        class: 'bg-dash-brand',
      },
      {
        variant: 'solid',
        colorScheme: 'mint',
        disabled: false,
        class: 'bg-dash-mint',
      },
      {
        variant: 'solid',
        colorScheme: 'gray',
        disabled: false,
        class: 'bg-gray-200 dark:bg-gray-600',
      },
      {
        variant: 'solid',
        colorScheme: 'red',
        disabled: false,
        class: 'bg-red-200 dark:bg-red-600',
      },
      {
        variant: 'solid',
        colorScheme: 'lightBlue',
        disabled: false,
        class: 'bg-dash-brand/10 dark:bg-dash-brand/20',
      },
      {
        variant: 'solid',
        colorScheme: 'lightGray',
        disabled: false,
        class: 'bg-gray-100 dark:bg-gray-700/20',
      },
      {
        variant: 'solid',
        colorScheme: 'white',
        disabled: false,
        class: 'bg-white',
      },
      {
        variant: 'solid',
        colorScheme: 'halfWhite',
        disabled: false,
        class: 'bg-white/15',
      },
      {
        variant: 'solid',
        colorScheme: 'halfBlue',
        disabled: false,
        class: 'bg-dash-brand/15',
      },
      // Outline variants
      {
        variant: 'outline',
        colorScheme: 'brand',
        class: 'border-dash-brand',
      },
      {
        variant: 'outline',
        colorScheme: 'mint',
        class: 'border-dash-mint',
      },
      {
        variant: 'outline',
        colorScheme: 'gray',
        class: 'border-gray-700 dark:border-gray-300',
      },
      {
        variant: 'outline',
        colorScheme: 'red',
        class: 'border-red-700 dark:border-red-400',
      },
      {
        variant: 'outline',
        colorScheme: 'white',
        class: 'border-white',
      },
      {
        variant: 'outline',
        colorScheme: 'halfWhite',
        class: 'border-white/50',
      },
      {
        variant: 'outline',
        colorScheme: 'halfBlue',
        class: 'border-dash-brand/50',
      },
    ],
    defaultVariants: {
      variant: 'solid',
      colorScheme: 'brand',
      size: 'md',
      rounded: 'default',
      disabled: false,
    },
  }
)

const textStyles = cva('font-medium', {
  variants: {
    variant: {
      solid: '',
      outline: '',
      ghost: '',
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
      halfBlue: '',
    },
    size: {
      sm: 'text-sm',    // 14px
      md: 'text-base',  // 16px
      lg: 'text-base',  // 16px
      xl: 'text-lg',    // 18px
    },
  },
  compoundVariants: [
    // Solid text colors
    {
      variant: 'solid',
      colorScheme: 'brand',
      class: 'text-white',
    },
    {
      variant: 'solid',
      colorScheme: 'mint',
      class: 'text-black',
    },
    {
      variant: 'solid',
      colorScheme: 'gray',
      class: 'text-gray-700 dark:text-gray-100',
    },
    {
      variant: 'solid',
      colorScheme: 'red',
      class: 'text-red-700 dark:text-red-100',
    },
    {
      variant: 'solid',
      colorScheme: 'lightBlue',
      class: 'text-dash-brand',
    },
    {
      variant: 'solid',
      colorScheme: 'lightGray',
      class: 'text-gray-900 dark:text-gray-300',
    },
    {
      variant: 'solid',
      colorScheme: 'white',
      class: 'text-dash-brand',
    },
    {
      variant: 'solid',
      colorScheme: 'halfWhite',
      class: 'text-white',
    },
    {
      variant: 'solid',
      colorScheme: 'halfBlue',
      class: 'text-dash-brand',
    },
    // Outline text colors
    {
      variant: 'outline',
      colorScheme: 'brand',
      class: 'text-dash-brand',
    },
    {
      variant: 'outline',
      colorScheme: 'mint',
      class: 'text-dash-mint',
    },
    {
      variant: 'outline',
      colorScheme: 'gray',
      class: 'text-gray-700 dark:text-gray-300',
    },
    {
      variant: 'outline',
      colorScheme: 'red',
      class: 'text-red-700 dark:text-red-400',
    },
    {
      variant: 'outline',
      colorScheme: 'white',
      class: 'text-white',
    },
    {
      variant: 'outline',
      colorScheme: 'halfWhite',
      class: 'text-white',
    },
    {
      variant: 'outline',
      colorScheme: 'halfBlue',
      class: 'text-dash-brand',
    },
    // Ghost text colors
    {
      variant: 'ghost',
      colorScheme: 'brand',
      class: 'text-dash-brand',
    },
  ],
  defaultVariants: {
    variant: 'solid',
    colorScheme: 'brand',
    size: 'md',
  },
})

type ButtonVariants = Omit<VariantProps<typeof buttonStyles>, 'disabled'>

export interface ButtonProps extends Omit<PressableProps, 'style'>, ButtonVariants {
  /** Light or dark theme */
  theme?: 'light' | 'dark'
  /** Solid, outline, or ghost style */
  variant?: 'solid' | 'outline' | 'ghost'
  /** Color scheme for the button */
  colorScheme?: 'brand' | 'mint' | 'gray' | 'red' | 'lightBlue' | 'lightGray' | 'white' | 'halfWhite' | 'halfBlue'
  /** Color scheme override for light theme */
  colorSchemeLight?: 'brand' | 'mint' | 'gray' | 'red' | 'lightBlue' | 'lightGray' | 'white' | 'halfWhite' | 'halfBlue'
  /** Color scheme override for dark theme */
  colorSchemeDark?: 'brand' | 'mint' | 'gray' | 'red' | 'lightBlue' | 'lightGray' | 'white' | 'halfWhite' | 'halfBlue'
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Border radius style */
  rounded?: 'default' | 'full'
  /** Whether the button is disabled */
  disabled?: boolean
  /** Whether to show loading indicator */
  loading?: boolean
  /** Additional Tailwind classes for styling */
  className?: string
  /** Custom container style (overrides Tailwind classes) */
  style?: ViewStyle
  /** Custom text style (overrides Tailwind text classes) */
  textStyle?: TextStyle
  /** Button content */
  children: React.ReactNode
}

/**
 * React Native Button component with variants, color schemes, sizes, and loading state.
 * Uses Pressable for touch interactions and twrnc for Tailwind styling.
 */
export const Button: React.FC<ButtonProps> = ({
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
  onPress,
  ...props
}) => {
  const isDisabled = disabled || loading
  const effectiveColorScheme = resolveColorScheme(theme, colorScheme, colorSchemeLight, colorSchemeDark) ?? 'brand'

  const buttonClasses =
    buttonStyles({
      variant,
      colorScheme: effectiveColorScheme,
      size,
      rounded,
      disabled: isDisabled,
    }) + (className ? ` ${className}` : '')

  const textClasses = textStyles({
    variant,
    colorScheme: effectiveColorScheme,
    size,
  })

  // Convert Tailwind classes to React Native style objects
  const buttonStyle = [cn(buttonClasses), style].filter(Boolean)
  const textStyleMerged = [cn(textClasses), textStyle].filter(Boolean)

  return (
    <Pressable
      style={({ pressed }) => [
        ...buttonStyle,
        pressed && !isDisabled && { opacity: 0.7 },
      ]}
      disabled={isDisabled}
      onPress={onPress}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'solid' && effectiveColorScheme === 'brand' ? '#fff' : '#3B82F6'}
        />
      ) : typeof children === 'string' ? (
        <Text style={textStyleMerged}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  )
}

export default Button
