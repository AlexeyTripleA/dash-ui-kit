import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'

interface ProgressStepBarProps {
  currentStep: number
  totalSteps: number
  className?: string
  color?: 'blue' | 'red'
}

const colorConfig = {
  blue: {
    active: 'bg-[var(--color-dash-brand)]',
    activeDark: 'bg-[var(--color-dash-brand-dim)]',
    inactive: 'bg-[rgba(76,126,255,0.16)]',
    inactiveDark: 'bg-gray-700',
  },
  red: {
    active: 'bg-[var(--color-dash-red)]',
    activeDark: 'bg-[var(--color-dash-red-75)]',
    inactive: 'bg-[var(--color-dash-red-15)]',
    inactiveDark: 'bg-gray-700',
  },
}

export function ProgressStepBar({ 
  currentStep, 
  totalSteps, 
  className = '',
  color = 'blue'
}: ProgressStepBarProps): React.JSX.Element {
  const { theme } = useTheme()
  const colors = colorConfig[color]
  
  return (
    <div className={`flex gap-2 w-full ${className}`}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`h-1.5 rounded-2xl flex-1 transition-colors ${
            index < currentStep 
              ? theme === 'dark' 
                ? colors.activeDark 
                : colors.active
              : theme === 'dark' 
                ? colors.inactiveDark 
                : colors.inactive
          }`}
        />
      ))}
    </div>
  )
}

export type { ProgressStepBarProps } 