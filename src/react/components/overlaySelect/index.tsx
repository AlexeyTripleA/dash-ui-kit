'use client'

import React, { useState, useRef } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { useTheme } from '../../contexts/ThemeContext'
import * as RadixSelect from '@radix-ui/react-select'

const overlaySelectTrigger = cva(
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
        light: 'bg-white border border-[rgba(12,28,51,0.05)] rounded-[15px]',
        dark: 'bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.15)] rounded-[15px] backdrop-blur-[256px]'
      }
    }
  }
)

const overlayItem = cva(
  'relative flex cursor-pointer select-none items-center outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
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

const addButton = cva(
  'w-full flex items-center justify-center border-t transition-colors',
  {
    variants: {
      theme: {
        light: 'border-[rgba(12,28,51,0.05)] text-[#0C1C33] hover:bg-gray-50',
        dark: 'border-[rgba(255,255,255,0.15)] text-white hover:bg-[rgba(255,255,255,0.1)]'
      },
      size: {
        sm: 'dash-block-sm',
        md: 'dash-block-md', 
        xl: 'dash-block-xl'
      }
    }
  }
)

type OverlaySelectVariants = VariantProps<typeof overlaySelectTrigger>

export interface OverlaySelectOption {
  value: string
  label: string
  disabled?: boolean
  content?: React.ReactNode
  buttons?: {
    label: string
    onClick: (optionValue: string) => void
    variant?: 'default' | 'danger'
  }[]
}

export interface OverlaySelectProps extends Omit<OverlaySelectVariants, 'theme' | 'disabled'> {
  className?: string
  error?: boolean
  success?: boolean
  border?: boolean
  options?: OverlaySelectOption[]
  showArrow?: boolean
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  name?: string
  overlayLabel?: string
  showAddButton?: boolean
  onAddClick?: () => void
  addButtonLabel?: string
  maxHeight?: string
}

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

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width='15'
    height='15'
    viewBox='0 0 15 15'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M8 2.75a0.5 0.5 0 0 0-1 0V7H2.75a0.5 0.5 0 0 0 0 1H7v4.25a0.5 0.5 0 0 0 1 0V8h4.25a0.5 0.5 0 0 0 0-1H8V2.75Z'
      fill='currentColor'
      fillRule='evenodd'
      clipRule='evenodd'
    />
  </svg>
)

/**
 * Overlay select component that opens above the trigger with overlay positioning.
 * Supports buttons in options and add functionality.
 */
export const OverlaySelect: React.FC<OverlaySelectProps> = ({
  className = '',
  colorScheme,
  size,
  error = false,
  success = false,
  border = true,
  disabled = false,
  options = [],
  showArrow = true,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select an option...',
  name,
  overlayLabel,
  showAddButton = false,
  onAddClick,
  addButtonLabel = 'Add new',
  maxHeight = '200px',
  ...props
}) => {
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Determine color scheme based on state
  let finalColorScheme = colorScheme
  if (error) finalColorScheme = 'error'
  else if (success) finalColorScheme = 'success'

  const triggerClasses = overlaySelectTrigger({
    theme,
    colorScheme: finalColorScheme,
    size,
    border,
    disabled
  }) + ' ' + className

  const contentClasses = overlayContent({ theme })
  const itemClasses = overlayItem({ theme, size })
  const addButtonClasses = addButton({ theme, size })

  const selectedOption = options.find(opt => opt.value === value)

  const handleOptionClick = (optionValue: string) => {
    onValueChange?.(optionValue)
    setIsOpen(false)
  }

  const handleAddClick = () => {
    onAddClick?.()
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
      >
        <div className='w-full flex-1 text-left'>
          {selectedOption ? (
            selectedOption.content || selectedOption.label
          ) : (
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
            className={`${contentClasses} top-0 left-0 right-0`}
            style={{ maxHeight }}
          >
            {/* Overlay label */}
            {overlayLabel && (
              <div className={`${itemClasses} font-medium pointer-events-none border-b ${
                theme === 'dark' ? 'border-[rgba(255,255,255,0.15)]' : 'border-[rgba(12,28,51,0.05)]'
              }`}>
                {overlayLabel}
              </div>
            )}
            
            {/* Options */}
            <div className='overflow-y-auto' style={{ maxHeight: `calc(${maxHeight} - ${overlayLabel ? '50px' : '0px'} - ${showAddButton ? '50px' : '0px'})` }}>
              {options.map((option, index) => (
                <div key={option.value}>
                  <div
                    className={`${itemClasses} ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${
                      index < options.length - 1 ? `border-b ${
                        theme === 'dark' ? 'border-[rgba(255,255,255,0.15)]' : 'border-[rgba(12,28,51,0.05)]'
                      }` : ''
                    }`}
                    onClick={() => !option.disabled && handleOptionClick(option.value)}
                  >
                    <div className='w-full flex-1 text-left'>
                      {option.content || option.label}
                    </div>
                  </div>
                  
                  {/* Option buttons */}
                  {option.buttons && option.buttons.length > 0 && (
                    <div className={`flex gap-2 px-3 pb-2 ${
                      index < options.length - 1 ? `border-b ${
                        theme === 'dark' ? 'border-[rgba(255,255,255,0.15)]' : 'border-[rgba(12,28,51,0.05)]'
                      }` : ''
                    }`}>
                      {option.buttons.map((button, idx) => (
                        <button
                          key={idx}
                          type='button'
                          className={`px-3 py-1 text-xs rounded transition-colors ${
                            button.variant === 'danger'
                              ? theme === 'dark' 
                                ? 'bg-red-900 text-red-200 hover:bg-red-800'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                              : theme === 'dark'
                                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation()
                            button.onClick(option.value)
                          }}
                        >
                          {button.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Add button */}
            {showAddButton && (
              <button
                type='button'
                className={addButtonClasses}
                onClick={handleAddClick}
              >
                <PlusIcon className='w-4 h-4 mr-2' />
                {addButtonLabel}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default OverlaySelect
