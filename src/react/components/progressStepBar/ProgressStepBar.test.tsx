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

  describe('color variants', () => {
    it('renders with blue color by default', () => {
      const { container } = renderWithTheme(
        <ProgressStepBar currentStep={2} totalSteps={4} />
      )
      
      const steps = container.querySelectorAll('.h-1\\.5')
      
      // Active steps should have blue variant class
      expect(steps[0].className).toContain('bg-[var(--color-dash-brand)]')
      expect(steps[1].className).toContain('bg-[var(--color-dash-brand)]')
      
      // Inactive steps should have blue inactive variant
      expect(steps[2].className).toContain('bg-[rgba(76,126,255,0.16)]')
      expect(steps[3].className).toContain('bg-[rgba(76,126,255,0.16)]')
    })

    it('renders with red color when specified', () => {
      const { container } = renderWithTheme(
        <ProgressStepBar currentStep={2} totalSteps={4} color="red" />
      )
      
      const steps = container.querySelectorAll('.h-1\\.5')
      
      // Active steps should have red variant class
      expect(steps[0].className).toContain('bg-[var(--color-dash-red)]')
      expect(steps[1].className).toContain('bg-[var(--color-dash-red)]')
      
      // Inactive steps should have red inactive variant
      expect(steps[2].className).toContain('bg-[var(--color-dash-red-15)]')
      expect(steps[3].className).toContain('bg-[var(--color-dash-red-15)]')
    })

    it('renders red color in dark theme', () => {
      const { container } = renderWithTheme(
        <ProgressStepBar currentStep={2} totalSteps={4} color="red" />,
        'dark'
      )
      
      const steps = container.querySelectorAll('.h-1\\.5')
      
      // Active steps should have red dark variant class
      expect(steps[0].className).toContain('bg-[var(--color-dash-red-75)]')
      expect(steps[1].className).toContain('bg-[var(--color-dash-red-75)]')
      
      // Inactive steps should have gray background in dark mode
      expect(steps[2]).toHaveClass('bg-gray-700')
      expect(steps[3]).toHaveClass('bg-gray-700')
    })
  })
}) 