import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { useTheme } from '../../contexts/ThemeContext'
import * as RadixSelect from '@radix-ui/react-select'

const selectTrigger = cva(
  'w-full transition-all font-inter appearance-none cursor-pointer relative text-[0.875rem] leading-[1.0625rem] focus:ring-2 inline-flex items-center justify-between',
  {
    variants: {
      theme: {
        light: 'text-[#0C1C33] bg-white',
        dark: 'text-white bg-gray-800'
      },
      colorScheme: {
        default: 'focus:ring-blue-500/20',
        brand: 'focus:ring-dash-brand/20',
        error: 'focus:ring-red-500/20',
        success: 'focus:ring-green-500/20'
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
      // Outline colors by colorScheme - only when border is true
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

const selectContent = cva(
  'overflow-hidden z-50 rounded-md shadow-lg min-w-[var(--radix-select-trigger-width)] w-full',
  {
    variants: {
      theme: {
        light: 'bg-white border border-gray-200',
        dark: 'bg-gray-800 border border-gray-700'
      }
    }
  }
)

const selectItem = cva(
  'relative flex cursor-pointer select-none items-center outline-none focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  {
    variants: {
      theme: {
        light: 'text-gray-900 focus:bg-gray-100',
        dark: 'text-gray-100 focus:bg-gray-700'
      },
      size: {
        sm: 'dash-block-sm',
        md: 'dash-block-md',
        xl: 'dash-block-xl'
      }
    }
  }
)

const selectIcon = cva(
  'pointer-events-none flex items-center justify-center transition-transform',
  {
    variants: {
      size: {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        xl: 'w-4 h-4'
      }
    }
  }
)

type SelectVariants = VariantProps<typeof selectTrigger>

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  content?: React.ReactNode
}

export interface SelectProps extends Omit<SelectVariants, 'theme' | 'disabled'> {
  className?: string
  error?: boolean
  success?: boolean
  border?: boolean
  options?: SelectOption[]
  showArrow?: boolean
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  name?: string
}

  // Arrow icon
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="m4.93179 5.43179c0.20081-0.20081 0.52632-0.20081 0.72713 0l2.34108 2.34108 2.34108-2.34108c0.20081-0.20081 0.52632-0.20081 0.72713 0s0.20081 0.52632 0 0.72713l-2.70455 2.70455c-0.20081 0.20081-0.52632 0.20081-0.72713 0l-2.70455-2.70455c-0.20081-0.20081-0.20081-0.52632 0-0.72713z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
)

/**
 * A versatile select component built on Radix UI that adapts to light/dark theme,
 * supports various color schemes, sizes, variants, states, and HTML content in options.
 *
 * @example
 * <Select
 *   options={[
 *     {value: 'id1', label: 'Option 1'}, 
 *     {value: 'id2', label: 'Option 2', content: <div><strong>Option 2</strong><br/>Description</div>}
 *   ]}
 *   colorScheme="default"
 *   size="xl"
 *   border={true}
 * />
 */
export const Select: React.FC<SelectProps> = ({
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
  onChange,
  placeholder = 'Select an option...',
  name,
  ...props
}) => {
  const { theme } = useTheme()

  // Determine color scheme based on state
  let finalColorScheme = colorScheme
  if (error) finalColorScheme = 'error'
  else if (success) finalColorScheme = 'success'

  const triggerClasses = selectTrigger({
    theme,
    colorScheme: finalColorScheme,
    size,
    border,
    disabled
  }) + ' ' + className

  const contentClasses = selectContent({ theme })
  const itemClasses = selectItem({ theme, size })
  const iconClasses = selectIcon({ size })

  return (
    <RadixSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onChange}
      disabled={disabled}
      name={name}
    >
      <RadixSelect.Trigger className={triggerClasses}>
        <div className='w-full flex-1 text-left'>
          <RadixSelect.Value placeholder={placeholder} />
        </div>
        {showArrow && (
          <RadixSelect.Icon asChild>
            <ChevronDownIcon className={iconClasses} />
          </RadixSelect.Icon>
        )}
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content className={contentClasses} position='popper' sideOffset={5}>
          <RadixSelect.Viewport>
            {options.map((option) => (
              <RadixSelect.Item
                key={option.value}
                value={option.value}
                className={itemClasses}
                disabled={option.disabled}
              >
                <div className='w-full flex-1 text-left'>
                  <RadixSelect.ItemText className='w-full'>
                    {option.content || option.label}
                  </RadixSelect.ItemText>
                </div>
              </RadixSelect.Item>
              ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}

export default Select
