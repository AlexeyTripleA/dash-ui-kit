import React, { InputHTMLAttributes, useState, useRef, useEffect } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { useTheme } from '../../contexts/ThemeContext'
import { EyeOpenIcon, EyeClosedIcon } from '../icons'

const input = cva(
  'w-full transition-all font-inter placeholder:text-opacity-60 text-[0.875rem] leading-[1.0625rem]',
  {
    variants: {
      theme: {
        light: 'text-[#111111] placeholder:text-[rgba(17,17,17,0.6)]',
        dark: 'text-white placeholder:text-gray-400'
      },
      colorScheme: {
        default: 'focus:ring-blue-500/20',
        brand: 'focus:ring-dash-brand/20',
        error: 'focus:ring-red-500/20',
        success: 'focus:ring-green-500/20',
        'light-gray': 'focus:ring-[#6B7280]/20'
      },
      size: {
        sm: 'dash-block-sm font-light',
        md: 'dash-block-md font-light',
        xl: 'dash-block-xl font-light'
      },
      variant: {
        outlined: 'outline outline-1 outline-offset-[-1px]',
        filled: 'border-none'
      },
      disabled: {
        false: '',
        true: 'opacity-60 cursor-not-allowed'
      }
    },
    compoundVariants: [
      // Outlined variant colors
      {
        variant: 'outlined',
        colorScheme: 'default',
        class: 'outline-[rgba(17,17,17,0.32)] focus:outline-[rgba(17,17,17,0.6)]'
      },
      {
        variant: 'outlined',
        colorScheme: 'brand',
        class: 'outline-dash-brand/30 focus:outline-dash-brand'
      },
      {
        variant: 'outlined',
        colorScheme: 'error',
        class: 'outline-red-500 focus:outline-red-500'
      },
      {
        variant: 'outlined',
        colorScheme: 'success',
        class: 'outline-green-500 focus:outline-green-500'
      },
      {
        variant: 'outlined',
        colorScheme: 'light-gray',
        class: 'outline-[#6B7280]/50 focus:outline-[#6B7280]'
      },
      // Outlined variant with focus ring
      {
        variant: 'outlined',
        class: 'focus:ring-2'
      },
      // Outlined variant background
      {
        variant: 'outlined',
        theme: 'light',
        class: 'bg-white'
      },
      {
        variant: 'outlined',
        theme: 'dark',
        class: 'bg-gray-800'
      },
      // Filled variant colors
      {
        variant: 'filled',
        colorScheme: 'default',
        class: 'bg-[rgba(76,126,255,0.15)] focus:bg-[rgba(76,126,255,0.2)]'
      },
      {
        variant: 'filled',
        colorScheme: 'brand',
        class: 'bg-dash-brand/15 focus:bg-dash-brand/20'
      },
      {
        variant: 'filled',
        colorScheme: 'error',
        class: 'bg-red-500/15 focus:bg-red-500/20'
      },
      {
        variant: 'filled',
        colorScheme: 'success',
        class: 'bg-green-500/15 focus:bg-green-500/20'
      },
      {
        variant: 'filled',
        colorScheme: 'light-gray',
        class: 'bg-[#0C1C33]/5 focus:bg-[#0C1C33]/10'
      },
      // Filled variant with focus ring
      {
        variant: 'filled',
        class: 'focus:ring-2'
      }
    ],
    defaultVariants: {
      theme: 'light',
      colorScheme: 'default',
      size: 'xl',
      variant: 'outlined',
      disabled: false
    }
  }
)

type InputVariants = VariantProps<typeof input>

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>, Omit<InputVariants, 'theme' | 'disabled'> {
  className?: string
  error?: boolean
  success?: boolean
  prefix?: string | React.ReactNode
  prefixClassName?: string
  /**
   * Controls visibility toggle for password inputs. When false, the eye icon is hidden and no extra right padding is applied.
   * Defaults to true.
   */
  showPasswordToggle?: boolean
}

/**
 * A versatile input component that adapts to light/dark theme,
 * supports various color schemes, sizes, variants, and states.
 * For password inputs, includes a toggleable eye icon.
 * Supports prefix text or elements before input content.
 *
 * @example
 * <Input
 *   type='password'
 *   placeholder='Enter password'
 *   colorScheme='brand'
 *   size='xl'
 *   prefix="https://"
 * />
 */
export const Input: React.FC<InputProps> = ({
  className = '',
  colorScheme,
  size,
  variant,
  error = false,
  success = false,
  disabled = false,
  type,
  prefix,
  prefixClassName = '',
  showPasswordToggle = true,
  ...props
}) => {
  const { theme } = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const [prefixWidth, setPrefixWidth] = useState(0)
  const prefixRef = useRef<HTMLDivElement>(null)

  // Determine color scheme based on state
  let finalColorScheme = colorScheme
  if (error) finalColorScheme = 'error'
  else if (success) finalColorScheme = 'success'

  const classes = input({
    theme,
    colorScheme: finalColorScheme,
    size,
    variant,
    disabled
  }) + ' ' + className

  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type
  const hasPrefix = Boolean(prefix)

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword)
  }

  // Measure actual prefix width
  useEffect(() => {
    if (prefixRef.current) {
      const width = prefixRef.current.offsetWidth
      // Convert px to rem (assuming 16px base) and add base padding (1rem) + extra space (0.5rem)
      setPrefixWidth(width / 16 + 1.5)
    }
  }, [prefix])

  // Render with prefix
  if (hasPrefix) {
    return (
      <div className='relative'>
        <div 
          ref={prefixRef}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 text-[0.875rem] opacity-60 pointer-events-none select-none ${prefixClassName}`}
        >
          {prefix}
        </div>
        <input
          className={`${classes}${isPassword && showPasswordToggle ? ' pr-12' : ''}`}
          style={{ paddingLeft: prefixWidth ? `${prefixWidth}rem` : '1rem' }}
          disabled={disabled}
          type={inputType}
          {...props}
        />
        {isPassword && showPasswordToggle && (
          <button
            type='button'
            className='absolute right-4 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-70 transition-opacity cursor-pointer focus:outline-none'
            onClick={togglePasswordVisibility}
            tabIndex={-1}
          >
            {showPassword
              ? <EyeClosedIcon size={16} color='#0C1C33' />
              : <EyeOpenIcon size={16} color='#0C1C33' />}
          </button>
        )}
      </div>
    )
  }

  // Render password input without prefix
  if (isPassword) {
    return (
      <div className='relative'>
        <input
          className={classes + (showPasswordToggle ? ' pr-12' : '')}
          disabled={disabled}
          type={inputType}
          {...props}
        />
        {showPasswordToggle && (
          <button
            type='button'
            className='absolute right-4 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-70 transition-opacity cursor-pointer focus:outline-none'
            onClick={togglePasswordVisibility}
            tabIndex={-1}
          >
            {showPassword
              ? <EyeClosedIcon size={16} color='#0C1C33' />
              : <EyeOpenIcon size={16} color='#0C1C33' />}
          </button>
        )}
      </div>
    )
  }

  // Regular input without prefix
  return (
    <input
      className={classes}
      disabled={disabled}
      type={inputType}
      {...props}
    />
  )
}

export default Input 