'use client'
import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'

export interface TextProps {
  /** Render as this element or component (e.g. 'h1' or Link). */
  as?: React.ElementType
  /** Additional CSS classes. */
  className?: string
  /** Text children. */
  children?: React.ReactNode
  /** Text size */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Text weight */
  weight?: 'normal' | 'bold'
  /** Text color */
  color?: 'default' | 'blue' | 'red'
  /** Italic text */
  italic?: boolean
  /** Underline text */
  underline?: boolean
  /** Line through text */
  lineThrough?: boolean
  /** Text transform */
  transform?: 'none' | 'uppercase' | 'capitalize'
  /** Opacity */
  opacity?: number
  /** Use monospace font */
  monospace?: boolean
  /** Dim text */
  dim?: boolean
  /** Reset default styling */
  reset?: boolean
}

/**
 * A versatile text component with size, color, weight, decoration,
 * transform, opacity, monospace, dimming, and theme-aware defaults.
 */
export const Text: React.FC<TextProps> = ({ 
  as, 
  className = '', 
  children, 
  size = 'md',
  weight = 'normal',
  color = 'default',
  italic = false,
  underline = false,
  lineThrough = false,
  transform = 'none',
  opacity = 100,
  monospace = false,
  dim = false,
  reset = false,
  ...props 
}) => {
  const { theme } = useTheme()

  const classes = [
    'text-dash-ui',
    !reset && 'inline whitespace-normal',
    // Size classes
    size === 'sm' && 'text-sm',
    size === 'md' && 'text-base', 
    size === 'lg' && 'text-lg',
    size === 'xl' && 'text-xl',
    // Weight classes
    weight === 'normal' && 'font-normal',
    weight === 'bold' && 'font-bold',
    // Color classes based on theme
    theme === 'light' && color === 'default' && 'text-gray-900',
    theme === 'dark' && color === 'default' && 'text-gray-100',
    color === 'blue' && 'text-dash-ui-brand-dark',
    theme === 'dark' && color === 'blue' && 'text-dash-ui-brand-dim',
    color === 'red' && 'text-dash-ui-red',
    // Style classes
    italic && 'italic',
    underline && 'underline',
    lineThrough && 'line-through',
    transform === 'uppercase' && 'uppercase',
    transform === 'capitalize' && 'capitalize',
    // Opacity classes
    opacity !== 100 && `opacity-${opacity}`,
    // Font classes
    monospace && 'font-dash-ui-grotesque',
    !monospace && 'font-dash-ui-main',
    // Dim class
    dim && 'text-dash-ui-dim',
    className
  ].filter(Boolean).join(' ')

  const Component = as ?? 'span'
  return <Component className={classes} {...props}>{children}</Component>
}

export default Text
