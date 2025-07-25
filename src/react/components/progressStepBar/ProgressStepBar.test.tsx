import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProgressStepBar } from './index'
import { ThemeProvider } from '../../contexts/ThemeContext'

const renderWithTheme = (ui: React.ReactElement, theme: 'light' | 'dark' = 'light') => {
  return render(
    <ThemeProvider initialTheme={theme}>
      {ui}
    </ThemeProvider>
  )
}

describe('ProgressStepBar', () => {
  it('renders correct number of steps', () => {
    const { container } = renderWithTheme(
      <ProgressStepBar currentStep={2} totalSteps={4} />
    )
    
    const steps = container.querySelectorAll('.h-1\\.5')
    expect(steps).toHaveLength(4)
  })

  it('applies correct classes for active steps', () => {
    const { container } = renderWithTheme(
      <ProgressStepBar currentStep={2} totalSteps={4} />
    )
    
    const steps = container.querySelectorAll('.h-1\\.5')
    
    // First 2 steps should be active
    expect(steps[0]).toHaveClass('bg-dash-brand')
    expect(steps[1]).toHaveClass('bg-dash-brand')
    
    // Remaining steps should be inactive
    expect(steps[2]).toHaveClass('bg-dash-brand-inactive')
    expect(steps[3]).toHaveClass('bg-dash-brand-inactive')
  })

  it('applies custom className', () => {
    const { container } = renderWithTheme(
      <ProgressStepBar 
        currentStep={1} 
        totalSteps={3} 
        className="custom-class" 
      />
    )
    
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('custom-class')
  })

  it('handles zero current steps', () => {
    const { container } = renderWithTheme(
      <ProgressStepBar currentStep={0} totalSteps={3} />
    )
    
    const steps = container.querySelectorAll('.h-1\\.5')
    
    // All steps should be inactive
    steps.forEach(step => {
      expect(step).toHaveClass('bg-dash-brand-inactive')
      expect(step).not.toHaveClass('bg-dash-brand')
    })
  })

  it('handles all steps completed', () => {
    const { container } = renderWithTheme(
      <ProgressStepBar currentStep={4} totalSteps={4} />
    )
    
    const steps = container.querySelectorAll('.h-1\\.5')
    
    // All steps should be active
    steps.forEach(step => {
      expect(step).toHaveClass('bg-dash-brand')
      expect(step).not.toHaveClass('bg-dash-brand-inactive')
    })
  })

  it('has correct base structure', () => {
    const { container } = renderWithTheme(
      <ProgressStepBar currentStep={1} totalSteps={2} />
    )
    
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('flex', 'gap-2', 'w-full')
    
    const steps = container.querySelectorAll('.h-1\\.5')
    steps.forEach(step => {
      expect(step).toHaveClass('rounded-2xl', 'flex-1', 'transition-colors')
    })
  })

  it('works with dark theme', () => {
    const { container } = renderWithTheme(
      <ProgressStepBar currentStep={2} totalSteps={4} />,
      'dark'
    )
    
    const steps = container.querySelectorAll('.h-1\\.5')
    expect(steps).toHaveLength(4)
    
    // Check that classes are applied correctly
    expect(steps[0]).toHaveClass('bg-dash-brand')
    expect(steps[1]).toHaveClass('bg-dash-brand')
    expect(steps[2]).toHaveClass('bg-dash-brand-inactive')
    expect(steps[3]).toHaveClass('bg-dash-brand-inactive')
  })
}) 