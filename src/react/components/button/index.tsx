'use client'
import React from 'react'
import { cva } from 'class-variance-authority'

const styles = cva(
  [
    'btn-base',
    'select-none',
    'min-h-11',
    'flex',
    'items-center',
    'font-bold',
    'capitalize',
    'transition-colors',
    'hover:cursor-pointer',
    'justify-center',
    'font-main'
  ],
  {
    variants: {
      variant: {
        solid: '',
        outline: 'border bg-transparent',
      },
      colorScheme: {
        brand: 'bg-brand hover:bg-brand-dark text-white',
        mint: 'bg-mint hover:opacity-80 text-black',
        gray: 'bg-gray-200 hover:bg-gray-300 text-gray-700',
        red: 'bg-red-200 hover:bg-red-300 text-red-700',
      },
      state: {
        active: 'active:translate-y-px',
        disabled: 'hover:cursor-not-allowed opacity-60',
      },
      size: {
        sm: 'px-4 py-2 rounded-lg font-bold text-sm',
        md: 'px-6 py-2.5 rounded-xl text-lg',
      },
    },
    compoundVariants: [
      {
        variant: 'outline',
        colorScheme: 'brand',
        class: 'text-brand border-brand'
      },
      {
        variant: 'outline',
        colorScheme: 'mint',
        class: 'text-mint border-mint'
      },
      {
        variant: 'outline',
        colorScheme: 'gray',
        class: 'text-gray-700 border-gray-300'
      },
      {
        variant: 'outline',
        colorScheme: 'red',
        class: 'text-red-700 border-red-300 hover:bg-red-50'
      },
    ],
    defaultVariants: {
      variant: 'solid',
      colorScheme: 'brand',
      state: 'active',
      size: 'md',
    },
  }
)

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
  variant,
  colorScheme,
  size,
  disabled,
  className = '',
  ...props
}) => {
  const state = disabled ? 'disabled' : 'active'
  const classes =
    styles({ variant, colorScheme, size, state }) +
    (className ? ` ${className}` : '')

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  )
}

export default Button
