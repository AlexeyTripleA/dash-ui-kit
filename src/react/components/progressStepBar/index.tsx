import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'

interface ProgressStepBarProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export function ProgressStepBar({ 
  currentStep, 
  totalSteps, 
  className = '' 
}: ProgressStepBarProps): React.JSX.Element {
  const { theme } = useTheme()
  
  return (
    <div className={`flex gap-2 w-full ${className}`}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`h-1.5 rounded-2xl flex-1 transition-colors ${
            index < currentStep 
              ? theme === 'dark' 
                ? 'bg-[var(--color-dash-brand-dim)]' 
                : 'bg-[var(--color-dash-brand)]'
              : theme === 'dark' 
                ? 'bg-gray-700' 
                : 'bg-[rgba(76,126,255,0.16)]'
          }`}
        />
      ))}
    </div>
  )
}

export type { ProgressStepBarProps } 