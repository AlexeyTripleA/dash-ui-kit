import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Stepper } from './index'
import { ThemeProvider } from '../../contexts/ThemeContext'

const steps = [
  { label: 'From & To', status: 'completed' as const },
  { label: 'Amount', status: 'active' as const },
  { label: 'Confirm', status: 'upcoming' as const }
]

const renderWithTheme = (component: React.ReactElement, theme: 'light' | 'dark' = 'light') => {
  return render(<ThemeProvider initialTheme={theme}>{component}</ThemeProvider>)
}

describe('Stepper', () => {
  it('renders labels and numbers of not completed steps', () => {
    renderWithTheme(<Stepper steps={steps} />)

    expect(screen.getByText('From & To')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.queryByText('1')).toBeNull()
  })

  it('marks the active step', () => {
    renderWithTheme(<Stepper steps={steps} />)

    expect(screen.getByText('Amount').closest('li')).toHaveAttribute('aria-current', 'step')
  })

  it('renders connectors between steps', () => {
    const { container } = renderWithTheme(<Stepper steps={steps} />)

    expect(container.querySelectorAll('li[aria-hidden="true"]')).toHaveLength(2)
  })

  it('uses dark colors for upcoming steps in dark theme', () => {
    renderWithTheme(<Stepper steps={steps} />, 'dark')

    expect(screen.getByText('Confirm')).toHaveClass('text-white/48')
  })
})
