'use client'
import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Solid or outline style */
  variant?: 'solid' | 'outline'
  /** Brand or mint color scheme */
  colorScheme?: 'brand' | 'mint' | 'gray' | 'red'
  /** Size of the button */
  size?: 'sm' | 'md'
}

/**
 * Button with solid or outline style, color schemes, disabled state,
 * press animation, and customizable size.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid',
  colorScheme = 'brand',
  size = 'md',
  disabled,
  className = '',
  ...props
}) => {
  const classes = [
    'btn-dash-ui',
    `btn-dash-ui-${variant}`,
    `btn-dash-ui-${colorScheme}`,
    `btn-dash-ui-${size}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  )
}

export default Button
