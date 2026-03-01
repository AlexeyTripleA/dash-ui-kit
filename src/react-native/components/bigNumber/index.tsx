import React from 'react'
import { View, Text, ViewStyle, TextStyle } from 'react-native'
import { cn } from '../../utils/tw'

export type BigNumberVariant = 'space' | 'comma'

export interface BigNumberProps {
  /** The numeric value (or string) to format. */
  children?: number | string | null
  /** Use non-breaking space groups or comma groups. */
  variant?: BigNumberVariant
  /** Extra class names to apply to the wrapper. Use gap-* classes for spacing between groups. */
  className?: string
  /** Horizontal spacing (in pixels) around the decimal point. Negative values reduce spacing. @default -2 */
  decimalPointSpacing?: number
  /** Custom container style (overrides Tailwind classes) */
  style?: ViewStyle
  /** Custom text style (overrides Tailwind text classes) */
  textStyle?: TextStyle
}

/**
 * Groups digits into chunks of three, right to left.
 * Used for formatting large numbers with thousand separators.
 */
const groupDigits = (intPart: string): string[] => {
  return intPart
    .split('')
    .reverse()
    .reduce<string[]>((acc, char, idx) => {
      if (idx % 3 === 0) acc.unshift('')
      acc[0] = char + acc[0]
      return acc
    }, [])
}

/**
 * Splits a numeric string into groups of three characters for display.
 * Supports two variants:
 * - `space`: groups separated by gap
 * - `comma`: groups separated by commas, with decimal part after `.`
 * Supports light/dark theme via dark: variants.
 */
export const BigNumber: React.FC<BigNumberProps> = ({ 
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
  }

  if (children === undefined || children === null) return null
  const str = children.toString()

  // Combine base styles with optional className
  const containerClasses = `flex-row flex-wrap gap-1 ${className || ''}`
  const textClasses = 'dark:text-gray-100'
  
  const containerStyle = [cn(containerClasses), style].filter(Boolean)
  const textStyleMerged = [cn(textClasses), textStyle].filter(Boolean)

  if (variant === 'space') {
    // Split into integer and decimal parts
    const [intPart, fracPart] = str.split('.')

    // group digits every 3, right to left (only for integer part)
    const groups = groupDigits(intPart)

    return (
      <View style={containerStyle}>
        {groups.map((grp, i) => (
          <Text key={i} style={textStyleMerged}>
            {grp}
          </Text>
        ))}
        {fracPart != null && (
          <>
            <Text style={[...textStyleMerged, decimalPointStyle]}>.</Text>
            <Text style={textStyleMerged}>{fracPart}</Text>
          </>
        )}
      </View>
    )
  } else {
    // comma variant
    const [intPart, fracPart] = str.split('.')
    const groups = groupDigits(intPart)

    return (
      <View style={containerStyle}>
        {groups.map((grp, i) => (
          <View key={i} style={cn('flex-row')}>
            <Text style={textStyleMerged}>{grp}</Text>
            {i < groups.length - 1 && <Text style={textStyleMerged}>,</Text>}
          </View>
        ))}
        {fracPart != null && (
          <>
            <Text style={[...textStyleMerged, decimalPointStyle]}>.</Text>
            <Text style={textStyleMerged}>{fracPart}</Text>
          </>
        )}
      </View>
    )
  }
}

export default BigNumber
