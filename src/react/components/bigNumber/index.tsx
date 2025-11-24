import React from 'react'
import { cva } from 'class-variance-authority'
import { useTheme } from '../../contexts/ThemeContext'

export type BigNumberVariant = 'space' | 'comma'

export interface BigNumberProps {
  /** The numeric value (or string) to format. */
  children?: number | string | null
  /** Use non-breaking space groups or comma groups. */
  variant?: BigNumberVariant
  /** Extra class names to apply to the wrapper. Use gap-* classes for spacing between groups. */
  className?: string
}

const bigNumberStyles = cva(
  'inline-flex whitespace-nowrap gap-1',
  {
    variants: {
      theme: {
        light: 'text-gray-900',
        dark: 'text-gray-100'
      }
    },
    defaultVariants: {
      theme: 'light'
    }
  }
)

/**
 * Splits a numeric string into groups of three characters for display.
 * Supports two variants:
 * - `space`: groups separated by gap
 * - `comma`: groups separated by commas, with decimal part after `.`
 * Supports light/dark theme.
 */
export const BigNumber: React.FC<BigNumberProps> = ({ children, variant = 'space', className = '' }) => {
  const { theme } = useTheme()

  if (children === undefined || children === null) return null
  const str = children.toString()

  if (variant === 'space') {
    // Split into integer and decimal parts
    const [intPart, fracPart] = str.split('.')

    // group digits every 3, right to left (only for integer part)
    const groups = intPart
      .split('')
      .reverse()
      .reduce<string[]>((acc, char, idx) => {
        if (idx % 3 === 0) acc.unshift('')
        acc[0] = char + acc[0]
        return acc
      }, [])

    return (
      <span className={`${bigNumberStyles({ theme })} ${className}`}>
        {groups.map((grp, i) => (
          <span key={i}>{grp}</span>
        ))}
        {fracPart != null && (
          <>
            <span>.</span>
            <span>{fracPart}</span>
          </>
        )}
      </span>
    )
  } else {
    // comma variant
    const [intPart, fracPart] = str.split('.')
    const groups = intPart
      .split('')
      .reverse()
      .reduce<string[]>((acc, char, idx) => {
        if (idx % 3 === 0) acc.unshift('')
        acc[0] = char + acc[0]
        return acc
      }, [])

    return (
      <span className={`${bigNumberStyles({ theme })} ${className}`}>
        {groups.map((grp, i) => (
          <span key={i}>
            <span>{grp}</span>
            {i < groups.length - 1 && <span>,</span>}
          </span>
        ))}
        {fracPart != null && (
          <>
            <span>.</span>
            <span>{fracPart}</span>
          </>
        )}
      </span>
    )
  }
}

export default BigNumber 