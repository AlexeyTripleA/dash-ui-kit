import React from 'react'
import { Text, TextProps, TextStyle } from 'react-native'
import { cn } from '../../utils/tw'

export interface NotActiveProps extends Omit<TextProps, 'style'> {
  children?: React.ReactNode
  className?: string
  /** Light or dark theme */
  theme?: 'light' | 'dark'
  /** Custom text style (overrides Tailwind classes) */
  style?: TextStyle
}

/**
 * NotActive component for React Native
 * Shows "n/a" text with theme-aware styling
 */
export function NotActive({ 
  children, 
  className = '', 
  theme = 'light',
  style,
  ...props 
}: NotActiveProps): React.JSX.Element {
  const themeColor = theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
  const textClasses = `text-sm ${themeColor} ${className}`.trim()
  
  return (
    <Text
      style={[cn(textClasses), style].filter(Boolean)}
      {...props}
    >
      {children ?? 'n/a'}
    </Text>
  )
}

export default NotActive
