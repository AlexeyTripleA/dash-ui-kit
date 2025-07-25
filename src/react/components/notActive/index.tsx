import React from 'react'
import { cva } from 'class-variance-authority'
import { useTheme } from '../../contexts/ThemeContext'

const notActiveStyles = cva(
  'text-sm',
  {
    variants: {
      theme: {
        light: 'text-gray-400',
        dark: 'text-gray-500'
      }
    },
    defaultVariants: {
      theme: 'light'
    }
  }
)

export interface NotActiveProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode
  className?: string
}

export function NotActive ({ children, className, ...props }: NotActiveProps): React.JSX.Element {
  const { theme } = useTheme()
  
  return (
    <span
      className={`${notActiveStyles({ theme })} ${className ?? ''}`}
      {...props}
    >
      {children ?? 'n/a'}
    </span>
  )
} 