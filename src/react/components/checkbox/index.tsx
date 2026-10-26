import React from 'react'
import { cva } from 'class-variance-authority'
import { useTheme } from '../../contexts/ThemeContext'
import { CheckmarkIcon } from '../icons'

const checkboxRoot = cva(
  'inline-flex items-center align-middle gap-2 text-left border-none bg-transparent p-0 font-dash-main',
  {
    variants: {
      disabled: {
        false: 'cursor-pointer',
        true: 'opacity-50 cursor-not-allowed'
      }
    },
    defaultVariants: {
      disabled: false
    }
  }
)

const checkboxBox = cva(
  'flex items-center justify-center shrink-0 transition-colors',
  {
    variants: {
      theme: {
        light: '',
        dark: ''
      },
      checked: {
        false: '',
        true: 'bg-dash-brand/15 text-dash-brand'
      },
      size: {
        sm: 'w-4 h-4',
        md: 'w-5 h-5'
      },
      shape: {
        square: 'rounded-md',
        circle: 'rounded-full'
      }
    },
    compoundVariants: [
      { checked: false, theme: 'light', class: 'bg-dash-primary-dark-blue/5' },
      { checked: false, theme: 'dark', class: 'bg-white/10' }
    ],
    defaultVariants: {
      theme: 'light',
      checked: false,
      size: 'md',
      shape: 'square'
    }
  }
)

const checkboxLabel = cva(
  'font-normal',
  {
    variants: {
      theme: {
        light: 'text-dash-primary-dark-blue/60',
        dark: 'text-white/60'
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm'
      }
    },
    defaultVariants: {
      theme: 'light',
      size: 'md'
    }
  }
)

const CHECKMARK_SIZE = { sm: 9, md: 11 } as const

export interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: React.ReactNode
  labelPosition?: 'left' | 'right'
  disabled?: boolean
  size?: 'sm' | 'md'
  /** Square box or round box (on/off toggle look) */
  shape?: 'square' | 'circle'
  className?: string
}

/**
 * Checkbox with an optional clickable label, light/dark theme aware.
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  labelPosition = 'right',
  disabled = false,
  size = 'md',
  shape = 'square',
  className = ''
}) => {
  const { theme } = useTheme()

  const labelNode = label != null && (
    <span className={checkboxLabel({ theme, size })}>{label}</span>
  )

  return (
    <button
      type='button'
      role='checkbox'
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`${checkboxRoot({ disabled })} ${className}`}
    >
      {labelPosition === 'left' && labelNode}
      <span className={checkboxBox({ theme, checked, size, shape })}>
        {checked && <CheckmarkIcon size={CHECKMARK_SIZE[size]} color='currentColor' className='block' />}
      </span>
      {labelPosition === 'right' && labelNode}
    </button>
  )
}

export default Checkbox
