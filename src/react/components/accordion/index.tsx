import React from 'react'
import * as RadixAccordion from '@radix-ui/react-accordion'
import { cva } from 'class-variance-authority'
import { useTheme } from '../../contexts/ThemeContext'
import { ChevronIcon } from '../icons'

const accordionRootStyles = cva(
  `
    w-full
    rounded-[1rem]
    overflow-hidden
  `,
  {
    variants: {
      theme: {
        light: 'bg-dash-primary-dark-blue/[0.05]',
        dark: 'bg-gray-800/20'
      },
      border: {
        true: 'ring-1 ring-dash-primary-dark-blue/10',
        false: ''
      }
    },
    defaultVariants: {
      theme: 'light',
      border: false
    }
  }
)

const accordionItemStyles = cva(
  `
    border-none
    outline-none
  `
)

const accordionTriggerStyles = cva(
  `
    w-full
    p-[0.875rem]
    flex
    items-center
    justify-between
    font-dash-main
    font-medium
    text-[0.875rem]
    leading-[1.366]
    text-dash-primary-dark-blue
    bg-transparent
    border-none
    outline-none
    cursor-pointer
    transition-all
    duration-300
    ease-in-out
    hover:bg-dash-primary-dark-blue/[0.01]
  `,
  {
    variants: {
      theme: {
        light: 'text-dash-primary-dark-blue hover:bg-dash-primary-dark-blue/[0.05]',
        dark: 'text-white hover:bg-white/5'
      }
    },
    defaultVariants: {
      theme: 'light'
    }
  }
)

const accordionContentStyles = cva(`
  overflow-hidden
  will-change-[height]
  data-[state=open]:h-[var(--radix-accordion-content-height)]
  data-[state=closed]:h-0
`)

const accordionContentInnerStyles = cva(`
  p-[0.875rem]
  space-y-[0.625rem]
`)

const separatorStyles = cva(`
  mx-[0.875rem]
  h-px
  bg-dash-primary-dark-blue/10
  transition-opacity
  duration-300
  ease-in-out
`, {
  variants: {
    theme: {
      light: 'bg-dash-primary-dark-blue/10',
      dark: 'bg-white/10'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
})

const chevronStyles = cva(`
  w-4
  h-4
  transition-transform
  duration-300
  ease-in-out
  transform
  group-data-[state=open]:rotate-180
`)

export interface AccordionProps {
  /** The title displayed in the accordion trigger */
  title: string
  /** Content to display in the accordion */
  children?: React.ReactNode
  /** Whether the accordion is open by default */
  defaultOpen?: boolean
  /** Controlled open state */
  open?: boolean
  /** Callback when the open state changes */
  onOpenChange?: (open: boolean) => void
  /** Additional CSS classes */
  className?: string
  /** Optional element to display on the right side of the trigger */
  rightElement?: React.ReactNode
  /** Whether to show separator between title and content when open */
  showSeparator?: boolean
  /** Whether to show border around the accordion */
  border?: boolean
}

/**
 * Accordion component based on Radix UI with smooth animations.
 * Displays custom content in an expandable format.
 */
export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  className = '',
  rightElement,
  showSeparator = false,
  border = false
}) => {
  const { theme } = useTheme()
  const isControlled = open !== undefined

  const rootClasses = accordionRootStyles({ theme, border }) + (className ? ` ${className}` : '')

  return (
    <RadixAccordion.Root
      type='single'
      collapsible
      className={rootClasses}
      value={isControlled ? (open ? 'item-1' : undefined) : undefined}
      defaultValue={defaultOpen ? 'item-1' : undefined}
      onValueChange={(value) => {
        if (onOpenChange) {
          onOpenChange(value === 'item-1')
        }
      }}
    >
      <RadixAccordion.Item
        value='item-1'
        className={`AccordionItem ${accordionItemStyles()} group`}
      >
        <RadixAccordion.Trigger 
          className={`${accordionTriggerStyles({ theme })}`}
        >
          <div className='w-full text-left'>{title}</div>
          <div className='flex items-center gap-3'>
            {rightElement && <div>{rightElement}</div>}
            <ChevronIcon className={chevronStyles()} />
          </div>
        </RadixAccordion.Trigger>

        {showSeparator && (
          <div className={`${separatorStyles({ theme })} group-data-[state=closed]:opacity-0 group-data-[state=open]:opacity-100`} />
        )}

        <RadixAccordion.Content forceMount className={accordionContentStyles()}>
          <div className={accordionContentInnerStyles()}>
            {children}
          </div>
        </RadixAccordion.Content>
      </RadixAccordion.Item>
    </RadixAccordion.Root>
  )
}

export default Accordion
