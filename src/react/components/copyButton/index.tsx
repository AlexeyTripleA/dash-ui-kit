import React, { useState } from 'react'
import { cva } from 'class-variance-authority'
import * as Popover from '@radix-ui/react-popover'
import { CopyIcon } from '../icons'
import { useTheme } from '../../contexts/ThemeContext'
import copyToClipboard, { CopyResult } from '../../utils/copyToClipboard'

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
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text, className, onCopy, ...props }) => {
  const { theme } = useTheme()
  const [open, setOpen] = useState(false)

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    copyToClipboard(text, onCopy)
    setOpen(true)
    setTimeout(() => setOpen(false), 1000)
  }

  return (
    <Popover.Root open={open}>
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
          className='bg-white text-gray-900 text-sm px-2 py-1 rounded shadow-lg'
          side='top'
          sideOffset={5}
        >
          Copied
          <Popover.Arrow className='fill-white' />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default CopyButton
