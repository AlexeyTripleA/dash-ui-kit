import React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cva } from 'class-variance-authority'
import { useTheme } from '../../contexts/ThemeContext'

const tooltipContent = cva(
  [
    'z-50 rounded px-2 py-1 text-sm leading-none',
    'select-none',
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
        light: 'bg-white text-gray-900 shadow-lg',
        dark: 'bg-gray-950 text-gray-50 shadow-lg',
      },
    },
    defaultVariants: {
      theme: 'light',
    },
  }
)

const tooltipArrow = cva('', {
  variants: {
    theme: {
      light: 'fill-white',
      dark: 'fill-gray-950',
    },
  },
  defaultVariants: {
    theme: 'light',
  },
})

export interface TooltipProps {
  /** Tooltip label content */
  content: React.ReactNode
  /** Element that triggers the tooltip */
  children: React.ReactNode
  /** Which side the tooltip appears on */
  side?: 'top' | 'bottom' | 'left' | 'right'
  /** Offset from the trigger in pixels */
  sideOffset?: number
  /** Delay in ms before tooltip opens */
  delayDuration?: number
  /** Controlled open state */
  open?: boolean
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Default open (uncontrolled) */
  defaultOpen?: boolean
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = 'top',
  sideOffset = 6,
  delayDuration = 300,
  open,
  onOpenChange,
  defaultOpen,
}) => {
  const { theme } = useTheme()

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <TooltipPrimitive.Trigger asChild>
          {/* Wrap in span to safely attach ref when child is a plain string/fragment */}
          {React.isValidElement(children) ? children : <span>{children}</span>}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={sideOffset}
            className={tooltipContent({ theme })}
          >
            {content}
            <TooltipPrimitive.Arrow className={tooltipArrow({ theme })} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

export default Tooltip
