import React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cva } from 'class-variance-authority'
import { useTheme } from '../../contexts/ThemeContext'
import { CrossIcon } from '../icons'

const popoverContent = cva(
  [
    'z-50 rounded-md p-4 shadow-lg outline-none',
    'w-64',
    'animate-in fade-in-0 zoom-in-95',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
    'data-[side=bottom]:slide-in-from-top-2',
    'data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2',
    'data-[side=top]:slide-in-from-bottom-2',
  ].join(' '),
  {
    variants: {
      theme: {
        light: 'bg-white border border-gray-200 text-gray-900',
        dark: 'bg-gray-950 border border-gray-800 text-gray-50',
      },
    },
    defaultVariants: {
      theme: 'light',
    },
  }
)

const popoverArrow = cva('', {
  variants: {
    theme: {
      light: 'fill-white stroke-gray-200',
      dark: 'fill-gray-950 stroke-gray-800',
    },
  },
  defaultVariants: {
    theme: 'light',
  },
})

const closeButton = cva(
  [
    'absolute top-2 right-2 rounded-sm opacity-70 transition-opacity',
    'hover:opacity-100 focus:outline-none disabled:pointer-events-none cursor-pointer',
  ].join(' '),
  {
    variants: {
      theme: {
        light: 'text-gray-600 hover:text-gray-900',
        dark: 'text-gray-400 hover:text-gray-100',
      },
    },
    defaultVariants: {
      theme: 'light',
    },
  }
)

export interface PopoverProps {
  /** Popover body content */
  content: React.ReactNode
  /** Element that triggers the popover on click */
  children: React.ReactNode
  /** Which side the popover appears on */
  side?: 'top' | 'bottom' | 'left' | 'right'
  /** Offset from the trigger in pixels */
  sideOffset?: number
  /** Whether to show a close button inside the popover */
  showCloseButton?: boolean
  /** Controlled open state */
  open?: boolean
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Default open (uncontrolled) */
  defaultOpen?: boolean
  /** Additional className for the content container */
  className?: string
}

export const Popover: React.FC<PopoverProps> = ({
  content,
  children,
  side = 'bottom',
  sideOffset = 8,
  showCloseButton = false,
  open,
  onOpenChange,
  defaultOpen,
  className,
}) => {
  const { theme } = useTheme()

  return (
    <PopoverPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <PopoverPrimitive.Trigger asChild>
        {React.isValidElement(children) ? children : <span>{children}</span>}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          sideOffset={sideOffset}
          className={`${popoverContent({ theme })} ${className ?? ''}`}
        >
          {showCloseButton && (
            <PopoverPrimitive.Close className={closeButton({ theme })} aria-label='Close'>
              <CrossIcon size={14} />
            </PopoverPrimitive.Close>
          )}
          {content}
          <PopoverPrimitive.Arrow className={popoverArrow({ theme })} />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

export default Popover
