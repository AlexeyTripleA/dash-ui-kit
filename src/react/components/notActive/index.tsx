import React from 'react'
import { cva } from 'class-variance-authority'

const notActiveStyles = cva(
  'text-sm text-gray-400'
)

export interface NotActiveProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode
  className?: string
}

export function NotActive ({ children, className, ...props }: NotActiveProps): React.JSX.Element {
  return (
    <span
      className={`${notActiveStyles()} ${className ?? ''}`}
      {...props}
    >
      {children ?? 'n/a'}
    </span>
  )
} 