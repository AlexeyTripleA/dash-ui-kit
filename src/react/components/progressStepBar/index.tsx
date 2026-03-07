import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { useColorScheme } from '../../hooks/useColorScheme'

type ProgressColor = 'blue' | 'red' | 'orange'

interface ProgressStepBarProps {
  currentStep: number
  totalSteps: number
  className?: string
  color?: ProgressColor
  colorLight?: ProgressColor
  colorDark?: ProgressColor
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
  orange: {
    active: 'bg-[var(--color-dash-orange)]',
    activeDark: 'bg-[var(--color-dash-orange-75)]',
    inactive: 'bg-[var(--color-dash-orange-15)]',
    inactiveDark: 'bg-gray-700',
  },
}

export function ProgressStepBar({ 
  currentStep, 
  totalSteps, 
  className = '',
  color,
  colorLight,
  colorDark
}: ProgressStepBarProps): React.JSX.Element {
  const { theme } = useTheme()
  const effectiveColor = useColorScheme(color, colorLight, colorDark) ?? 'blue'
  const colors = colorConfig[effectiveColor]
  
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