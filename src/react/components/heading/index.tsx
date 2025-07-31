import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
  color?: 'black' | 'gray' | 'blue' | 'red' | 'green'
  className?: string
  children: React.ReactNode
}

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm', 
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-[2.375rem] leading-[1.3]',
  '3xl': 'text-[3rem] leading-[1.2]'
}

const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium', 
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold'
}

const colorClasses = {
  light: {
    black: 'text-black',
    gray: 'text-gray-600',
    blue: 'text-blue-600', 
    red: 'text-red-600',
    green: 'text-green-600'
  },
  dark: {
    black: 'text-white',
    gray: 'text-gray-300',
    blue: 'text-blue-400', 
    red: 'text-red-400',
    green: 'text-green-400'
  }
}

export const Heading: React.FC<HeadingProps> = ({ 
  as = 'h1',
  size = '2xl',
  weight = 'extrabold', 
  color = 'black',
  className = '',
  children
}) => {
  const { theme } = useTheme()
  const Component = as
  
  const classes = [
    sizeClasses[size],
    weightClasses[weight],
    colorClasses[theme][color],
    'tracking-[-0.4px]',
    className
  ].filter(Boolean).join(' ')

  return (
    <Component className={classes}>
      {children}
    </Component>
  )
}

export type { HeadingProps } 