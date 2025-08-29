'use client'

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
        light: '  bg-dash-primary-dark-blue/[0.03]',
        dark: 'bg-gray-800/20'
      }
    },
    defaultVariants: {
      theme: 'light'
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
    px-8
    py-6
    flex
    items-center
    justify-between
    font-manrope
    font-medium
    text-1
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
  px-8
  pb-6
  space-y-[0.625rem]
`)

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
  className = ''
}) => {
  const { theme } = useTheme()
  const isControlled = open !== undefined

  const rootClasses = accordionRootStyles({ theme }) + (className ? ` ${className}` : '')

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
        className={`AccordionItem ${accordionItemStyles()}`}
      >
        <RadixAccordion.Trigger 
          className={`${accordionTriggerStyles({ theme })} group`}
        >
          <span>{title}</span>
          <ChevronIcon className={chevronStyles()} />
        </RadixAccordion.Trigger>

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
