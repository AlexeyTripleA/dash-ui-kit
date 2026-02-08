import React from 'react'
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/tw'

const headingStyles = cva('font-bold text-gray-900 dark:text-gray-100', {
  variants: {
    level: {
      1: 'text-4xl',
      2: 'text-3xl',
      3: 'text-2xl',
      4: 'text-xl',
      5: 'text-lg',
      6: 'text-base',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
    color: {
      default: '',
      black: 'text-black dark:text-white',
      gray: 'text-gray-600 dark:text-gray-300',
      blue: 'text-blue-600 dark:text-blue-400',
      red: 'text-red-600 dark:text-red-400',
      green: 'text-green-600 dark:text-green-400',
    },
  },
  defaultVariants: {
    level: 1,
    weight: 'extrabold',
    color: 'default',
  },
})

type HeadingVariants = VariantProps<typeof headingStyles>

export interface HeadingProps extends Omit<RNTextProps, 'style'>, HeadingVariants {
  /** Semantic level of the heading (1-6) */
  level?: 1 | 2 | 3 | 4 | 5 | 6
  /** Additional Tailwind classes for styling */
  className?: string
  /** Additional style object (merged with className styles) */
  style?: TextStyle
  /** Text children */
  children: React.ReactNode
}

/**
 * React Native Heading component with semantic levels and customizable styling.
 * Uses twrnc for Tailwind-like styling converted to React Native styles.
 */
export const Heading: React.FC<HeadingProps> = ({
  level,
  weight,
  color,
  className = '',
  style,
  children,
  ...props
}) => {
  const classes =
    headingStyles({
      level,
      weight,
      color,
    }) + (className ? ` ${className}` : '')

  // Convert Tailwind classes to React Native style object
  const headingStyle = [cn(classes), style].filter(Boolean)

  return (
    <RNText style={headingStyle} {...props}>
      {children}
    </RNText>
  )
}

export default Heading
