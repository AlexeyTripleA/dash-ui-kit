'use client'

import React, { useState, useRef } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { useTheme } from '../../contexts/ThemeContext'
import { CrossIcon } from '../icons'

const overlayMenuTrigger = cva(
  'w-full transition-all font-inter appearance-none cursor-pointer relative text-[0.875rem] leading-[1.0625rem] inline-flex items-center justify-between',
  {
    variants: {
      theme: {
        light: 'text-dash-primary-dark-blue',
        dark: 'text-white'
      },
      colorScheme: {
        default: '',
        brand: '',
        error: '',
        success: '',
        gray: '',
        lightGray: ''
      },
      size: {
        sm: 'dash-block-sm',
        md: 'dash-block-md',
        xl: 'dash-block-xl'
      },
      border: {
        true: 'outline outline-1 outline-offset-[-1px]',
        false: ''
      },
      disabled: {
        false: '',
        true: 'opacity-60 cursor-not-allowed'
      },
      filled: {
        false: '',
        true: ''
      }
    },
    compoundVariants: [
      {
        colorScheme: 'default',
        border: true,
        class: 'outline-[rgba(12,28,51,0.35)] focus:outline-[rgba(12,28,51,0.6)]'
      },
      {
        colorScheme: 'brand',
        border: true,
        class: 'outline-dash-brand/30 focus:outline-dash-brand'
      },
      {
        colorScheme: 'error',
        border: true,
        class: 'outline-red-500 focus:outline-red-500'
      },
      {
        colorScheme: 'success',
        border: true,
        class: 'outline-green-500 focus:outline-green-500'
      },
      {
        colorScheme: 'gray',
        border: true,
        theme: 'light',
        class: 'outline-[rgba(12,28,51,0.20)] focus:outline-[rgba(12,28,51,0.35)]'
      },
      {
        colorScheme: 'gray',
        border: true,
        theme: 'dark',
        class: 'outline-gray-600/50 focus:outline-gray-500'
      },
      {
        colorScheme: 'lightGray',
        border: true,
        theme: 'light',
        class: 'outline-dash-primary-dark-blue/[0.05] focus:outline-dash-primary-dark-blue/[0.05]'
      },
      {
        colorScheme: 'lightGray',
        border: true,
        theme: 'dark',
        class: 'outline-dash-primary-dark-blue/[0.05] focus:outline-dash-primary-dark-blue/[0.05]'
      },
      {
        colorScheme: 'gray',
        border: false,
        theme: 'light',
        class: 'bg-[rgba(12,28,51,0.03)]'
      },
      {
        colorScheme: 'gray',
        border: false,
        theme: 'dark',
        class: 'bg-gray-700/20'
      },
      // New lightGray scheme using dash-primary-dark-blue with 3% base and 5% hover
      {
        colorScheme: 'lightGray',
        border: false,
        theme: 'light',
        class: 'bg-dash-primary-dark-blue/[0.03] hover:bg-dash-primary-dark-blue/[0.05]'
      },
      {
        colorScheme: 'lightGray',
        border: false,
        theme: 'dark',
        class: 'bg-dash-primary-dark-blue/[0.03] hover:bg-dash-primary-dark-blue/[0.05]'
      },
      {
        colorScheme: 'lightGray',
        filled: true,
        theme: 'light',
        class: 'bg-dash-primary-dark-blue/[0.03] hover:bg-dash-primary-dark-blue/[0.05]'
      },
      {
        colorScheme: 'lightGray',
        filled: true,
        theme: 'dark',
        class: 'bg-dash-primary-dark-blue/[0.03] hover:bg-dash-primary-dark-blue/[0.05]'
      },
      // Default background when not filled
      {
        filled: false,
        theme: 'light',
        class: 'bg-white'
      },
      {
        filled: false,
        theme: 'dark',
        class: 'bg-gray-800'
      },
      // Filled variants
      {
        colorScheme: 'default',
        filled: true,
        theme: 'light',
        class: 'bg-white text-gray-900'
      },
      {
        colorScheme: 'default',
        filled: true,
        theme: 'dark',
        class: 'bg-gray-700 text-white'
      },
      {
        colorScheme: 'brand',
        filled: true,
        theme: 'light',
        class: 'bg-blue-50 text-blue-700'
      },
      {
        colorScheme: 'brand',
        filled: true,
        theme: 'dark',
        class: 'bg-blue-900/30 text-blue-300'
      },
      {
        colorScheme: 'error',
        filled: true,
        theme: 'light',
        class: 'bg-red-50 text-red-700'
      },
      {
        colorScheme: 'error',
        filled: true,
        theme: 'dark',
        class: 'bg-red-500/20 text-red-400'
      },
      {
        colorScheme: 'success',
        filled: true,
        theme: 'light',
        class: 'bg-green-50 text-green-700'
      },
      {
        colorScheme: 'success',
        filled: true,
        theme: 'dark',
        class: 'bg-green-500/20 text-green-400'
      },
      {
        colorScheme: 'gray',
        filled: true,
        theme: 'light',
        class: 'bg-gray-200 text-gray-800'
      },
      {
        colorScheme: 'gray',
        filled: true,
        theme: 'dark',
        class: 'bg-gray-600 text-gray-200'
      }
    ],
    defaultVariants: {
      theme: 'light',
      colorScheme: 'default',
      size: 'xl',
      border: true,
      disabled: false,
      filled: false
    }
  }
)

const overlayContent = cva(
  'absolute z-50 min-w-full overflow-hidden shadow-lg',
  {
    variants: {
      theme: {
        light: 'bg-white border border-[rgba(12,28,51,0.05)]',
        dark: 'bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.15)] backdrop-blur-[256px]'
      },
      size: {
        sm: 'rounded-[0.625rem]',
        md: 'rounded-[0.875rem]', 
        xl: 'rounded-[1rem]'
      }
    }
  }
)

const overlayItem = cva(
  'relative flex cursor-pointer select-none items-center outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 rounded-none',
  {
    variants: {
      theme: {
        light: 'text-[#0C1C33] hover:bg-gray-50',
        dark: 'text-white hover:bg-[rgba(255,255,255,0.1)]'
      },
      size: {
        sm: 'dash-block-sm',
        md: 'dash-block-md',
        xl: 'dash-block-xl'
      }
    }
  }
)

// Arrow icon
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width='15'
    height='15'
    viewBox='0 0 15 15'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='m4.93179 5.43179c0.20081-0.20081 0.52632-0.20081 0.72713 0l2.34108 2.34108 2.34108-2.34108c0.20081-0.20081 0.52632-0.20081 0.72713 0s0.20081 0.52632 0 0.72713l-2.70455 2.70455c-0.20081 0.20081-0.52632 0.20081-0.72713 0l-2.70455-2.70455c-0.20081-0.20081-0.20081-0.52632 0-0.72713z'
      fill='currentColor'
      fillRule='evenodd'
      clipRule='evenodd'
    />
  </svg>
)

type OverlayMenuVariants = VariantProps<typeof overlayMenuTrigger>

export interface OverlayMenuItem {
  id: string
  content: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export interface OverlayMenuProps extends Omit<OverlayMenuVariants, 'theme' | 'disabled'> {
  className?: string
  error?: boolean
  success?: boolean
  border?: boolean
  filled?: boolean
  items?: OverlayMenuItem[]
  showArrow?: boolean
  disabled?: boolean
  name?: string
  overlayLabel?: string
  maxHeight?: string
  triggerContent?: React.ReactNode
  placeholder?: string
  showItemBorders?: boolean
}

/**
 * Overlay menu component that opens above the trigger with overlay positioning.
 * Supports custom content items with onClick handlers.
 */
export const OverlayMenu: React.FC<OverlayMenuProps> = ({
  className = '',
  colorScheme,
  size,
  error = false,
  success = false,
  border = true,
  filled = false,
  disabled = false,
  items = [],
  showArrow = true,
  name,
  overlayLabel,
  maxHeight = '200px',
  triggerContent,
  placeholder = 'Menu',
  showItemBorders = true,
  ...props
}) => {
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Determine color scheme based on state
  let finalColorScheme = colorScheme
  if (error) finalColorScheme = 'error'
  else if (success) finalColorScheme = 'success'

  const triggerClasses = overlayMenuTrigger({
    theme,
    colorScheme: finalColorScheme,
    size,
    border,
    filled,
    disabled
  }) + ' ' + className

  const contentClasses = overlayContent({ theme, size })
  const itemClasses = overlayItem({ theme, size })

  const handleItemClick = (item: OverlayMenuItem) => {
    if (!item.disabled && item.onClick) {
      item.onClick()
    }
    setIsOpen(false)
  }

  return (
    <div className='relative'>
      <button
        ref={triggerRef}
        type='button'
        className={triggerClasses}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        name={name}
        {...props}
      >
        <div className='w-full flex-1 text-left'>
          {triggerContent || (
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
              {placeholder}
            </span>
          )}
        </div>
        {showArrow && (
          <ChevronDownIcon 
            className={`transition-transform ${isOpen ? 'rotate-180' : ''} ${
              size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
            }`} 
          />
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className='fixed inset-0 z-40' 
            onClick={() => setIsOpen(false)}
          />

          {/* Overlay content */}
          <div
            className={`${contentClasses} top-0 left-0 right-0 overflow-y-auto`}
            style={{ maxHeight }}
          >
            {/* Overlay label */}
            {overlayLabel && (
              <div 
                className={`${itemClasses} font-medium border-b rounded-b-none cursor-pointer ${
                  theme === 'dark' ? 'border-[rgba(255,255,255,0.15)]' : 'border-[rgba(12,28,51,0.05)]'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <div className='w-full flex-1'>
                  {overlayLabel}
                </div>
                <div className='flex items-center pl-1'>
                  <CrossIcon 
                    size={16} 
                    color={theme === 'dark' ? '#FFFFFF' : '#0C1C33'}
                    className='cursor-pointer'
                  />
                </div>
              </div>
            )}

            {/* Menu items */}
            <div>
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`${itemClasses} ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${
                    index < items.length - 1 
                      ? `border-b ${theme === 'dark' ? 'border-[rgba(255,255,255,0.15)]' : 'border-[rgba(12,28,51,0.05)]'}`
                      : ''
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <div className='w-full flex-1'>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default OverlayMenu
