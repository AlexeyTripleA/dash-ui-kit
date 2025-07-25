import React from 'react'
import { cva } from 'class-variance-authority'
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

  return (
    <button
      type='button'
      className={`${copyBtn({ theme })} ${className ?? ''} hover:cursor-pointer`}
      onClick={e => {
        e.stopPropagation()
        e.preventDefault()
        copyToClipboard(text, onCopy)
      }}
      {...props}
    >
      <CopyIcon 
        className='w-4 h-4 transition' 
        color={theme === 'light' ? '#000000' : '#ffffff'} 
      />
    </button>
  )
}

export default CopyButton 