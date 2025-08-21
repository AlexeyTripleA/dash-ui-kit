"use client"

import React from 'react'
import * as RadixTabs from '@radix-ui/react-tabs'
import { cva } from 'class-variance-authority'
import { useTheme } from '../../contexts/ThemeContext'

const tabsRootStyles = cva(
  'flex flex-col w-full',
  {
    variants: {
      theme: {
        light: '',
        dark: ''
      }
    },
    defaultVariants: {
      theme: 'light'
    }
  }
)

const tabsListStyles = cva(
  'flex relative overflow-x-auto scrollbar-hide after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:transition-colors',
  {
    variants: {
      theme: {
        light: 'after:bg-[rgba(12,28,51,0.15)]',
        dark: 'after:bg-gray-600/50'
      }
    },
    defaultVariants: {
      theme: 'light'
    }
  }
)

const tabsTriggerStyles = cva(
  [
    'flex items-center justify-center relative',
    'font-dash-main font-light',
    'transition-all duration-200 ease-in-out cursor-pointer',
    'hover:opacity-80',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50',
    'whitespace-nowrap flex-shrink-0',
    'after:absolute after:bottom-0 after:left-0 after:bg-transparent after:transition-colors after:duration-200 after:z-10'
  ],
  {
    variants: {
      theme: {
        light: '',
        dark: ''
      },
      active: {
        true: '',
        false: ''
      },
      size: {
        sm: 'text-sm leading-[1.25] tracking-[-0.02em] px-0 pr-3 pb-2 after:right-3',
        lg: 'text-xl leading-[1.3] tracking-[-0.025em] px-0 pr-4 pb-3 after:right-4',
        xl: 'text-2xl leading-[1.366] tracking-[-0.03em] px-0 pr-[0.875rem] pb-[10px] after:right-[0.875rem]'
      }
    },
    compoundVariants: [
      {
        theme: 'light',
        active: true,
        class: 'text-dash-primary-dark-blue [text-shadow:0.2px_0_0_currentColor,_-0.2px_0_0_currentColor] after:!bg-[#4C7EFF]'
      },
      {
        theme: 'light',
        active: false,
        class: 'text-[rgba(12,28,51,0.35)]'
      },
      {
        theme: 'dark',
        active: true,
        class: 'text-white [text-shadow:0.2px_0_0_currentColor,_-0.2px_0_0_currentColor] after:!bg-[#4C7EFF]'
      },
      {
        theme: 'dark',
        active: false,
        class: 'text-gray-400'
      }
    ],
    defaultVariants: {
      theme: 'light',
      active: false,
      size: 'xl'
    }
  }
)

const tabsContentStyles = cva(
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
  {
    variants: {
      theme: {
        light: '',
        dark: ''
      },
      size: {
        sm: 'mt-2',
        lg: 'mt-3',
        xl: 'mt-4'
      }
    },
    defaultVariants: {
      theme: 'light',
      size: 'xl'
    }
  }
)

export interface TabItem {
  /** Unique identifier for the tab */
  value: string
  /** Label text to display */
  label: string
  /** Content to render when tab is active */
  content: React.ReactNode
  /** Whether this tab is disabled */
  disabled?: boolean
}

export interface TabsProps {
  /** Array of tab items */
  items: TabItem[]
  /** Currently active tab value (controlled) */
  value?: string
  /** Default active tab value (uncontrolled) */
  defaultValue?: string
  /** Callback when active tab changes */
  onValueChange?: (value: string) => void
  /** Size variant */
  size?: 'sm' | 'lg' | 'xl'
  /** Additional CSS classes */
  className?: string
  /** Additional CSS classes for the tabs list */
  listClassName?: string
  /** Additional CSS classes for tab triggers */
  triggerClassName?: string
  /** Additional CSS classes for tab content */
  contentClassName?: string
}

/**
 * Tabs component with sleek underline style matching Figma design.
 * Built on radix-ui with light/dark theme support and keyboard navigation.
 */
export const Tabs: React.FC<TabsProps> = ({
  items,
  value,
  defaultValue,
  onValueChange,
  size = 'xl',
  className = '',
  listClassName = '',
  triggerClassName = '',
  contentClassName = '',
}) => {
  const { theme } = useTheme()
  const [internalValue, setInternalValue] = React.useState(defaultValue || items[0]?.value || '')
  
  // Use controlled value if provided, otherwise use internal state
  const currentValue = value !== undefined ? value : internalValue
  
  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }
  
  const rootClasses = tabsRootStyles({ theme }) + (className ? ` ${className}` : '')
  const listClasses = tabsListStyles({ theme }) + (listClassName ? ` ${listClassName}` : '')
  const contentClasses = tabsContentStyles({ theme, size }) + (contentClassName ? ` ${contentClassName}` : '')

  return (
    <RadixTabs.Root
      className={rootClasses}
      value={currentValue}
      onValueChange={handleValueChange}
    >
      <RadixTabs.List className={listClasses}>
        {items.map((item) => {
          const isActive = currentValue === item.value
          const triggerClasses = tabsTriggerStyles({ 
            theme, 
            active: isActive,
            size
          }) + (triggerClassName ? ` ${triggerClassName}` : '')
          
          return (
            <RadixTabs.Trigger
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              className={triggerClasses}
            >
              {item.label}
            </RadixTabs.Trigger>
          )
        })}
      </RadixTabs.List>

      {items.map((item) => (
        <RadixTabs.Content
          key={item.value}
          value={item.value}
          className={contentClasses}
        >
          {item.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  )
}

export default Tabs


