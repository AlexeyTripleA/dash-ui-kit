import React, { useEffect, useRef, useState } from 'react'
import { cva } from 'class-variance-authority'
import * as Popover from '@radix-ui/react-popover'
import { CopyIcon } from '../icons'
import { useTheme } from '../../contexts/ThemeContext'
import copyToClipboard, { CopyResult } from '../../utils/copyToClipboard'

/** How the last copy attempt ended; 'idle' hides the feedback popover. */
type CopyState = 'idle' | 'copied' | 'failed'

const FEEDBACK_DURATION_MS = 1000

const copyBtn = cva(
  'p-0 flex-shrink-0 h-[max-content] min-w-0 bg-transparent transition-colors',
  {
    variants: {
      theme: {
        light: 'hover:text-gray-600 active:text-gray-800',
        dark: 'hover:text-gray-300 active:text-gray-100'
      }
    },
    defaultVariants: {
      theme: 'light'
    }
  }
)

export interface CopyButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onCopy'> {
  /** Text to copy into clipboard */
  text: string
  /** Optional callback that will be called with the copy result */
  onCopy?: (result: CopyResult) => void
  /** Feedback shown after a successful copy */
  copiedLabel?: string
  /** Feedback shown after a failed copy */
  failedLabel?: string
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  className,
  onCopy,
  copiedLabel = 'Copied',
  failedLabel = 'Copy failed',
  ...props
}) => {
  const { theme } = useTheme()
  const [state, setState] = useState<CopyState>('idle')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current)
  }, [])

  const showResult = (result: CopyState) => {
    setState(result)

    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setState('idle'), FEEDBACK_DURATION_MS)
  }

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()

    copyToClipboard(text, (result) => {
      showResult(result.status ? 'copied' : 'failed')
      onCopy?.(result)
    })
  }

  const failed = state === 'failed'

  return (
    <Popover.Root open={state !== 'idle'}>
      <Popover.Trigger asChild>
        <button
          type='button'
          className={`${copyBtn({ theme })} ${className ?? ''} hover:cursor-pointer`}
          onClick={handleCopy}
          {...props}
        >
          <CopyIcon
            className='w-4 h-4 transition'
            color={theme === 'light' ? '#000000' : '#ffffff'}
          />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={`bg-white text-sm px-2 py-1 rounded shadow-lg ${failed ? 'text-red-600' : 'text-gray-900'}`}
          side='top'
          sideOffset={5}
          role='status'
        >
          {failed ? failedLabel : copiedLabel}
          <Popover.Arrow className='fill-white' />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default CopyButton
