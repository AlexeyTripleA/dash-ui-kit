import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { cva } from 'class-variance-authority'
import { useTheme } from '../../contexts/ThemeContext'
import { CrossIcon } from '../icons'

// Visually hidden component for accessibility
const VisuallyHidden: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      position: 'absolute',
      border: 0,
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      wordWrap: 'normal'
    }}
  >
    {children}
  </span>
)

const overlayStyles = cva(
  `
    fixed
    inset-0
    z-50
    bg-black/80
    data-[state=open]:animate-in
    data-[state=closed]:animate-out
    data-[state=closed]:fade-out-0
    data-[state=open]:fade-in-0
  `,
  {
    variants: {
      theme: {
        light: '',
        dark: ''
      }
    }
  }
)

const contentStyles = cva(
  `
    fixed
    left-[50%]
    z-50
    w-full
    translate-x-[-50%]
    flex
    flex-col
    gap-4
    p-6
    shadow-lg
    duration-200
    data-[state=open]:animate-in
    data-[state=closed]:animate-out
    data-[state=closed]:fade-out-0
    data-[state=open]:fade-in-0
    data-[state=closed]:zoom-out-95
    data-[state=open]:zoom-in-95
    sm:rounded-lg
    font-dash-main
  `,
  {
    variants: {
      theme: {
        light: 'bg-white border-gray-200',
        dark: 'bg-gray-950 border-gray-800'
      },
      size: {
        sm: 'dash-block-sm',
        md: 'dash-block-md',
        xl: 'dash-block-xl'
      },
      position: {
        center: `
          top-[50%]
          translate-y-[-50%]
          data-[state=closed]:slide-out-to-left-1/2
          data-[state=closed]:slide-out-to-top-[48%]
          data-[state=open]:slide-in-from-left-1/2
          data-[state=open]:slide-in-from-top-[48%]
        `,
        bottom: `
          data-[state=closed]:slide-out-to-left-1/2
          data-[state=closed]:slide-out-to-bottom-full
          data-[state=open]:slide-in-from-left-1/2
          data-[state=open]:slide-in-from-bottom-full
        `
      }
    },
    defaultVariants: {
      size: 'md',
      position: 'center'
    }
  }
)

const headerStyles = cva(
  `
    flex
    flex-row
    justify-between
    items-center
    gap-1
    w-full
  `
)

const titleStyles = cva(
  `
    text-2xl
    font-medium
    leading-[1.366]
    tracking-[-0.03em]
    flex-1
    font-dash-main
  `,
  {
    variants: {
      theme: {
        light: 'text-[#0C1C33]',
        dark: 'text-gray-50'
      }
    }
  }
)

const closeButtonStyles = cva(
  `
    rounded-sm
    opacity-70
    transition-opacity
    hover:opacity-100
    focus:outline-none
    disabled:pointer-events-none
    cursor-pointer
    flex-shrink-0
  `,
  {
    variants: {
      theme: {
        light: 'text-[#0C1C33] hover:text-gray-700',
        dark: 'text-gray-400 hover:text-gray-200'
      }
    }
  }
)

export interface DialogProps {
  /** Whether the dialog is open */
  open?: boolean
  /** Callback when dialog open state changes */
  onOpenChange?: (open: boolean) => void
  /** Dialog title */
  title?: string
  /** Whether to show the close button */
  showCloseButton?: boolean
  /** Dialog size */
  size?: 'sm' | 'md' | 'xl'
  /** Vertical position of the dialog */
  position?: 'center' | 'bottom'
  /** Offset from bottom when position is 'bottom' (in pixels) */
  bottomOffset?: number
  /** Maximum width of the dialog (e.g., '500px', '50%', '2xl'). Use Tailwind classes like 'sm', 'md', 'lg', 'xl', '2xl', etc. or CSS values */
  maxWidth?: string
  /** Horizontal margin from screen edges (in pixels) */
  horizontalMargin?: number
  /** Dialog content */
  children: React.ReactNode
  /** Additional className for the content container */
  className?: string
  /** Custom trigger element (if not controlled) */
  trigger?: React.ReactNode
}

export const DashDialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  title,
  showCloseButton = true,
  size = 'md',
  position = 'center',
  bottomOffset = 24,
  maxWidth,
  horizontalMargin,
  children,
  className = '',
  trigger
}) => {
  const { theme } = useTheme()

  // Calculate position and sizing styles
  const customStyles: React.CSSProperties = {}
  
  if (position === 'bottom') {
    customStyles.bottom = `${bottomOffset}px`
  }
  
  if (maxWidth) {
    // Check if it's a Tailwind size (sm, md, lg, xl, 2xl, etc.) or a CSS value
    const tailwindSizes: Record<string, string> = {
      'xs': '320px',
      'sm': '384px',
      'md': '448px',
      'lg': '512px',
      'xl': '576px',
      '2xl': '672px',
      '3xl': '768px',
      '4xl': '896px',
      '5xl': '1024px',
      '6xl': '1152px',
      '7xl': '1280px'
    }
    customStyles.maxWidth = tailwindSizes[maxWidth] || maxWidth
  }
  
  if (horizontalMargin !== undefined) {
    // Set max width to viewport width minus margins on both sides
    const marginConstraint = `calc(100vw - ${horizontalMargin * 2}px)`
    
    if (customStyles.maxWidth) {
      // If maxWidth is already set, use the smaller of the two
      customStyles.maxWidth = `min(${customStyles.maxWidth}, ${marginConstraint})`
    } else {
      customStyles.maxWidth = marginConstraint
    }
    
    // Keep the dialog centered but constrained by the calculated maxWidth
    // The existing left-[50%] translate-x-[-50%] will handle centering
  }

  const DialogContent = (
    <Dialog.Portal>
      <Dialog.Overlay className={overlayStyles({ theme })} />
      <Dialog.Content 
        aria-describedby={undefined} 
        className={`${contentStyles({ theme, size, position })} ${className}`}
        style={customStyles}
      >
        {/* Accessibility: Always provide a title */}
        {title ? (
          // Render visible title in header if provided
          <div className={headerStyles()}>
            <Dialog.Title className={titleStyles({ theme })}>
              {title}
            </Dialog.Title>
            {showCloseButton && (
              <Dialog.Close className={closeButtonStyles({ theme })}>
                <div className='w-8 h-8 flex items-center justify-center'>
                    <CrossIcon size={16} />
                </div>
                <span className='sr-only'>Close</span>
              </Dialog.Close>
            )}
          </div>
        ) : (
          // No title provided - render visually hidden title for accessibility
          <>
            <Dialog.Title>
              <VisuallyHidden>Dialog</VisuallyHidden>
            </Dialog.Title>
            {showCloseButton && (
              <div className={headerStyles()}>
                <Dialog.Close className={closeButtonStyles({ theme })}>
                  <div className='w-8 h-8 flex items-center justify-center'>
                      <CrossIcon size={16} />
                  </div>
                  <span className='sr-only'>Close</span>
                </Dialog.Close>
              </div>
            )}
          </>
        )}
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )

  if (trigger) {
    // Uncontrolled mode with trigger
    return (
      <Dialog.Root onOpenChange={onOpenChange}>
        <Dialog.Trigger asChild>
          {trigger}
        </Dialog.Trigger>
        {DialogContent}
      </Dialog.Root>
    )
  }

  // Controlled mode
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {DialogContent}
    </Dialog.Root>
  )
}

export { DashDialog as Dialog }
