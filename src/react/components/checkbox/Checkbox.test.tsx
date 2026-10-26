import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Checkbox } from './index'
import { ThemeProvider } from '../../contexts/ThemeContext'

const renderWithTheme = (component: React.ReactElement, theme: 'light' | 'dark' = 'light') => {
  return render(<ThemeProvider initialTheme={theme}>{component}</ThemeProvider>)
}

describe('Checkbox', () => {
  it('reports the toggled value on click', () => {
    const onChange = vi.fn()
    renderWithTheme(<Checkbox checked={false} onChange={onChange} label='Shield to Myself' />)

    fireEvent.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('exposes the checked state', () => {
    renderWithTheme(<Checkbox checked onChange={() => {}} />)

    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true')
  })

  it('does not fire onChange when disabled', () => {
    const onChange = vi.fn()
    renderWithTheme(<Checkbox checked={false} onChange={onChange} disabled />)

    fireEvent.click(screen.getByRole('checkbox'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('renders the label before the box with labelPosition left', () => {
    renderWithTheme(<Checkbox checked={false} onChange={() => {}} label='Label' labelPosition='left' />)

    expect(screen.getByRole('checkbox').firstChild).toHaveTextContent('Label')
  })

  it('uses a round box with shape circle', () => {
    renderWithTheme(<Checkbox checked={false} onChange={() => {}} label='Label' shape='circle' />)

    expect(screen.getByRole('checkbox').firstChild).toHaveClass('rounded-full')
  })

  it('uses dark colors in dark theme', () => {
    renderWithTheme(<Checkbox checked={false} onChange={() => {}} label='Label' />, 'dark')

    expect(screen.getByText('Label')).toHaveClass('text-white/60')
  })
})
