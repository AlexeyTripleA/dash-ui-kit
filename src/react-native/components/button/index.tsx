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
      },
      size: {
        sm: 'px-3 py-2 rounded-[10px]',      // 0.625rem = 10px
        md: 'px-[18px] py-3 rounded-[14px]', // 1.125rem = 18px, 0.875rem = 14px
        lg: 'px-6 py-4 rounded-[14px]',      // kept as is
        xl: 'px-[25px] py-5 rounded-[16px]', // 1.5625rem = 25px, 1rem = 16px
      },
      disabled: {
        false: '',
        true: 'opacity-50',
      },
    },
    compoundVariants: [
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
    ],
    defaultVariants: {
      variant: 'solid',
      colorScheme: 'brand',
      size: 'md',
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
  /** Solid, outline, or ghost style */
  variant?: 'solid' | 'outline' | 'ghost'
  /** Color scheme for the button */
  colorScheme?: 'brand' | 'mint' | 'gray' | 'red' | 'lightBlue' | 'lightGray'
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Whether the button is disabled */
  disabled?: boolean
  /** Whether to show loading indicator */
  loading?: boolean
  /** Additional Tailwind classes for styling */
  className?: string
  /** Additional style object (merged with className styles) */
  style?: ViewStyle
  /** Button content */
  children: React.ReactNode
}

/**
 * React Native Button component with variants, color schemes, sizes, and loading state.
 * Uses Pressable for touch interactions and twrnc for Tailwind styling.
 */
export const Button: React.FC<ButtonProps> = ({
  variant,
  colorScheme,
  size,
  disabled = false,
  loading = false,
  className = '',
  style,
  children,
  onPress,
  ...props
}) => {
  const isDisabled = disabled || loading

  const buttonClasses =
    buttonStyles({
      variant,
      colorScheme,
      size,
      disabled: isDisabled,
    }) + (className ? ` ${className}` : '')

  const textClasses = textStyles({
    variant,
    colorScheme,
    size,
  })

  // Convert Tailwind classes to React Native style objects
  const buttonStyle = [cn(buttonClasses), style].filter(Boolean)
  const textStyle = cn(textClasses)

  return (
    <Pressable
      style={buttonStyle}
      disabled={isDisabled}
      onPress={onPress}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'solid' && colorScheme === 'brand' ? '#fff' : '#3B82F6'}
        />
      ) : typeof children === 'string' ? (
        <Text style={textStyle}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  )
}

export default Button
