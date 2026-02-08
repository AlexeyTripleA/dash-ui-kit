import React from 'react'
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/tw'

const textStyles = cva('', {
  variants: {
    variant: {
      body: 'text-base',
      caption: 'text-sm',
      label: 'text-xs',
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      default: 'text-gray-900 dark:text-gray-100',
      blue: 'text-dash-brand',
      red: 'text-red-700 dark:text-red-400',
      gray: 'text-gray-600 dark:text-gray-400',
    },
    italic: {
      false: '',
      true: 'italic',
    },
    underline: {
      false: '',
      true: 'underline',
    },
    lineThrough: {
      false: '',
      true: 'line-through',
    },
    transform: {
      none: '',
      uppercase: 'uppercase',
      capitalize: 'capitalize',
    },
    opacity: {
      100: 'opacity-100',
      80: 'opacity-80',
      60: 'opacity-60',
      40: 'opacity-40',
    },
  },
  defaultVariants: {
    variant: 'body',
    weight: 'regular',
    color: 'default',
    italic: false,
    underline: false,
    lineThrough: false,
    transform: 'none',
    opacity: 100,
  },
})

type TextVariants = VariantProps<typeof textStyles>

export interface TextProps extends Omit<RNTextProps, 'style'>, TextVariants {
  /** Additional Tailwind classes for styling */
  className?: string
  /** Additional style object (merged with className styles) */
  style?: TextStyle
  /** Text children */
  children?: React.ReactNode
}

/**
 * React Native Text component with variants, weights, and styling options.
 * Uses twrnc for Tailwind-like styling converted to React Native styles.
 */
export const Text: React.FC<TextProps> = ({
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
  children,
  ...props
}) => {
  const classes =
    textStyles({
      variant,
      weight,
      color,
      italic,
      underline,
      lineThrough,
      transform,
      opacity,
    }) + (className ? ` ${className}` : '')

  // Convert Tailwind classes to React Native style object
  const textStyle = [cn(classes), style].filter(Boolean)

  return (
    <RNText style={textStyle} {...props}>
      {children}
    </RNText>
  )
}

export default Text
