'use client'

import React, { useState, useRef } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { useTheme } from '../../contexts/ThemeContext'

const overlayMenuTrigger = cva(
  'w-full transition-all font-inter appearance-none cursor-pointer relative text-[0.875rem] leading-[1.0625rem] inline-flex items-center justify-between',
  {
    variants: {
      theme: {
        light: 'text-[#0C1C33] bg-white',
        dark: 'text-white bg-gray-800'
      },
      colorScheme: {
        default: '',
        brand: '',
        error: '',
        success: ''
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
      }
    ],
    defaultVariants: {
      theme: 'light',
      colorScheme: 'default',
      size: 'xl',
      border: true,
      disabled: false
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
              <div className={`${itemClasses} font-medium pointer-events-none border-b rounded-b-none ${
                theme === 'dark' ? 'border-[rgba(255,255,255,0.15)]' : 'border-[rgba(12,28,51,0.05)]'
              }`}>
                {overlayLabel}
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
