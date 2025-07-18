"use client"

import React from 'react'
import { cva } from 'class-variance-authority'

const styles = cva(
  `
    dash-btn-base
    select-none
    min-h-11
    flex
    items-center
    capitalize
    transition-colors
    hover:cursor-pointer
    justify-center
    font-dash-main
  `,
  {
    variants: {
      variant: {
        solid: '',
        outline: 'dash-btn-outline border !bg-transparent',
      },
      colorScheme: {
        brand: 'dash-btn-brand',
        mint: 'dash-btn-mint',
        gray: 'dash-btn-gray',
        red: 'dash-btn-red',
        lightBlue: 'dash-btn-lightBlue',
      },
      state: {
        active: 'active:-translate-y-[-1px]',
        disabled: 'hover:!cursor-not-allowed'
      },
      size: {
        sm: 'dash-block-sm',
        md: 'dash-block-md',
        xl: 'dash-block-xl',
      },
    },
    compoundVariants: [
      // outline variant
      {
        variant: 'outline',
        state: 'disabled',
        class: 'opacity-40'
      },
      {
        variant: 'outline',
        colorScheme: 'brand',
        class: '!text-dash-brand'
      },
      {
        variant: 'outline',
        colorScheme: 'mint',
        class: '!text-dash-mint'
      },
      {
        variant: 'outline',
        colorScheme: 'gray',
        class: '!text-gray-700'
      },
      {
        variant: 'outline',
        colorScheme: 'red',
        class: '!text-red-700 hover:!bg-red-300/20'
      },
      {
        variant: 'outline',
        colorScheme: 'lightBlue',
        class: '!text-dash-brand/60'
      },
      // solid variant
      {
        variant: 'solid',
        colorScheme: 'brand',
        state: 'disabled',
        class: '!bg-dash-brand/10 !text-dash-brand-dim'
      },
      {
        variant: 'solid',
        colorScheme: 'mint',
        state: 'disabled',
        class: '!bg-dash-mint/30 !text-black/60'
      },
      {
        variant: 'solid',
        colorScheme: 'red',
        state: 'disabled',
        class: '!bg-red-300/30 !text-black/60'
      },
      {
        variant: 'solid',
        colorScheme: 'lightBlue',
        state: 'disabled',
        class: '!bg-dash-brand/5 !text-dash-brand/40'
      }
    ],
    defaultVariants: {
      variant: 'solid',
      colorScheme: 'brand',
      state: 'active',
      size: 'md'
    }
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Solid or outline style */
  variant?: 'solid' | 'outline'
  /** Color scheme for the button */
  colorScheme?: 'brand' | 'mint' | 'gray' | 'red' | 'lightBlue'
  /** Size of the button */
  size?: 'sm' | 'md' | 'xl'
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
  disabled = false,
  className = '',
  ...props
}) => {
  const state = disabled ? 'disabled' : 'active'
  const classes =
    styles({ variant, colorScheme, size, state }) +
    (className !== '' ? ` ${className}` : '')

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  )
}

export default Button
