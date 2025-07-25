"use client"

import React from 'react'
import { cva } from 'class-variance-authority'
import { useTheme } from '../../contexts/ThemeContext'

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
      theme: {
        light: '',
        dark: ''
      },
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
      // outline variant - light theme
      {
        variant: 'outline',
        state: 'disabled',
        theme: 'light',
        class: 'opacity-40'
      },
      {
        variant: 'outline',
        state: 'disabled',
        theme: 'dark',
        class: 'opacity-50'
      },
      {
        variant: 'outline',
        colorScheme: 'brand',
        theme: 'light',
        class: '!text-dash-brand'
      },
      {
        variant: 'outline',
        colorScheme: 'brand',
        theme: 'dark',
        class: '!text-dash-brand'
      },
      {
        variant: 'outline',
        colorScheme: 'mint',
        theme: 'light',
        class: '!text-dash-mint'
      },
      {
        variant: 'outline',
        colorScheme: 'mint',
        theme: 'dark',
        class: '!text-dash-mint'
      },
      {
        variant: 'outline',
        colorScheme: 'gray',
        theme: 'light',
        class: '!text-gray-700'
      },
      {
        variant: 'outline',
        colorScheme: 'gray',
        theme: 'dark',
        class: '!text-gray-300'
      },
      {
        variant: 'outline',
        colorScheme: 'red',
        theme: 'light',
        class: '!text-red-700 hover:!bg-red-300/20'
      },
      {
        variant: 'outline',
        colorScheme: 'red',
        theme: 'dark',
        class: '!text-red-400 hover:!bg-red-500/20'
      },
      {
        variant: 'outline',
        colorScheme: 'lightBlue',
        theme: 'light',
        class: '!text-dash-brand/60'
      },
      {
        variant: 'outline',
        colorScheme: 'lightBlue',
        theme: 'dark',
        class: '!text-dash-brand/80'
      },
      // solid variant - light theme
      {
        variant: 'solid',
        colorScheme: 'brand',
        state: 'disabled',
        theme: 'light',
        class: '!bg-dash-brand/10 !text-dash-brand-dim'
      },
      {
        variant: 'solid',
        colorScheme: 'brand',
        state: 'disabled',
        theme: 'dark',
        class: '!bg-dash-brand/20 !text-dash-brand/60'
      },
      {
        variant: 'solid',
        colorScheme: 'mint',
        state: 'disabled',
        theme: 'light',
        class: '!bg-dash-mint/30 !text-black/60'
      },
      {
        variant: 'solid',
        colorScheme: 'mint',
        state: 'disabled',
        theme: 'dark',
        class: '!bg-dash-mint/20 !text-gray-400'
      },
      {
        variant: 'solid',
        colorScheme: 'red',
        state: 'disabled',
        theme: 'light',
        class: '!bg-red-300/30 !text-black/60'
      },
      {
        variant: 'solid',
        colorScheme: 'red',
        state: 'disabled',
        theme: 'dark',
        class: '!bg-red-500/20 !text-gray-400'
      },
      {
        variant: 'solid',
        colorScheme: 'lightBlue',
        state: 'disabled',
        theme: 'light',
        class: '!bg-dash-brand/5 !text-dash-brand/40'
      },
      {
        variant: 'solid',
        colorScheme: 'lightBlue',
        state: 'disabled',
        theme: 'dark',
        class: '!bg-dash-brand/10 !text-dash-brand/50'
      }
    ],
    defaultVariants: {
      theme: 'light',
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
 * press animation, and customizable size. Supports light/dark theme.
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
  const { theme } = useTheme()
  const state = disabled ? 'disabled' : 'active'
  const classes =
    styles({ theme, variant, colorScheme, size, state }) +
    (className !== '' ? ` ${className}` : '')

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  )
}

export default Button
