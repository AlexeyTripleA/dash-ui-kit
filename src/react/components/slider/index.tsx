import React from 'react'
import { cva } from 'class-variance-authority'
import { useTheme } from '../../contexts/ThemeContext'

const THUMB =
  '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 ' +
  '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-dash-brand [&::-webkit-slider-thumb]:cursor-pointer ' +
  '[&::-webkit-slider-thumb]:shadow-[0_0_0_0.1875rem_rgba(76,126,255,0.15)] [&::-webkit-slider-thumb]:transition-shadow ' +
  'hover:[&::-webkit-slider-thumb]:shadow-[0_0_0_0.25rem_rgba(76,126,255,0.3)] focus:[&::-webkit-slider-thumb]:shadow-[0_0_0_0.25rem_rgba(76,126,255,0.3)] ' +
  '[&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-dash-brand ' +
  '[&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-[0_0_0_0.1875rem_rgba(76,126,255,0.15)] ' +
  '[&::-moz-range-progress]:h-1 [&::-moz-range-progress]:rounded-sm [&::-moz-range-progress]:bg-dash-brand ' +
  '[&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-sm'

const slider = cva(
  `block w-full h-1 rounded-sm appearance-none outline-none ${THUMB}`,
  {
    variants: {
      theme: {
        light: '[--slider-track:rgba(12,28,51,0.1)] [&::-moz-range-track]:bg-dash-primary-dark-blue/10',
        dark: '[--slider-track:rgba(255,255,255,0.15)] [&::-moz-range-track]:bg-white/15'
      },
      disabled: {
        false: 'cursor-pointer',
        true: 'opacity-50 cursor-not-allowed'
      }
    },
    defaultVariants: {
      theme: 'light',
      disabled: false
    }
  }
)

export interface SliderProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

/**
 * Range slider with the track filled up to the current value, light/dark theme aware.
 */
export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className = '',
  'aria-label': ariaLabel
}) => {
  const { theme } = useTheme()
  const range = max - min
  const pct = range > 0 ? Math.min(100, Math.max(0, ((value - min) / range) * 100)) : 0

  // WebKit has no progress pseudo-element, so the fill is a gradient background
  const style: React.CSSProperties = {
    background: `linear-gradient(to right, var(--color-dash-brand) 0%, var(--color-dash-brand) ${pct}%, var(--slider-track) ${pct}%, var(--slider-track) 100%)`
  }

  return (
    <input
      type='range'
      min={min}
      max={max}
      step={step}
      value={value}
      disabled={disabled}
      aria-label={ariaLabel}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`${slider({ theme, disabled })} ${className}`}
      style={style}
    />
  )
}

export default Slider
