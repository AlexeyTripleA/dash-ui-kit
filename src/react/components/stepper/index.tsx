import React from 'react'
import { cva } from 'class-variance-authority'
import { useTheme } from '../../contexts/ThemeContext'
import { CheckmarkIcon } from '../icons'

export type StepperStatus = 'completed' | 'active' | 'upcoming'

export interface StepperStep {
  label: React.ReactNode
  status: StepperStatus
}

const stepCircle = cva(
  'flex items-center justify-center w-8 h-8 shrink-0 rounded-full border text-sm leading-[1.2] font-dash-main',
  {
    variants: {
      status: {
        completed: 'bg-dash-brand border-dash-brand text-white font-medium',
        active: 'bg-dash-brand/[0.04] border-dash-brand text-dash-brand font-extrabold',
        upcoming: 'font-medium'
      },
      theme: {
        light: '',
        dark: ''
      }
    },
    compoundVariants: [
      { status: 'upcoming', theme: 'light', class: 'border-dash-primary-dark-blue/12 text-dash-primary-dark-blue/48' },
      { status: 'upcoming', theme: 'dark', class: 'border-white/12 text-white/48' }
    ],
    defaultVariants: {
      status: 'upcoming',
      theme: 'light'
    }
  }
)

const stepLabel = cva(
  'whitespace-nowrap text-sm leading-[1.2] font-dash-main',
  {
    variants: {
      status: {
        completed: 'font-medium',
        active: 'font-extrabold text-dash-brand',
        upcoming: 'font-medium'
      },
      theme: {
        light: '',
        dark: ''
      }
    },
    compoundVariants: [
      { status: 'completed', theme: 'light', class: 'text-dash-primary-dark-blue' },
      { status: 'completed', theme: 'dark', class: 'text-white' },
      { status: 'upcoming', theme: 'light', class: 'text-dash-primary-dark-blue/48' },
      { status: 'upcoming', theme: 'dark', class: 'text-white/48' }
    ],
    defaultVariants: {
      status: 'upcoming',
      theme: 'light'
    }
  }
)

export interface StepperProps {
  steps: StepperStep[]
  className?: string
}

/**
 * Horizontal numbered progress indicator with labelled steps and connectors.
 */
export const Stepper: React.FC<StepperProps> = ({ steps, className = '' }) => {
  const { theme } = useTheme()
  const connectorClass = theme === 'dark' ? 'bg-white/12' : 'bg-dash-primary-dark-blue/12'

  return (
    <ol className={`flex items-center gap-3 w-full m-0 p-0 list-none ${className}`}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <li aria-hidden='true' className={`flex-1 min-w-3 h-px ${connectorClass}`} />
          )}
          <li
            className='flex items-center gap-2 shrink-0'
            aria-current={step.status === 'active' ? 'step' : undefined}
          >
            <span className={stepCircle({ status: step.status, theme })}>
              {step.status === 'completed'
                ? <CheckmarkIcon size={11} color='currentColor' />
                : index + 1}
            </span>
            <span className={stepLabel({ status: step.status, theme })}>
              {step.label}
            </span>
          </li>
        </React.Fragment>
      ))}
    </ol>
  )
}

export default Stepper
