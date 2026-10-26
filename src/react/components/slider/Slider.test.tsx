import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Slider } from './index'
import { ThemeProvider } from '../../contexts/ThemeContext'

const renderWithTheme = (component: React.ReactElement, theme: 'light' | 'dark' = 'light') => {
  return render(<ThemeProvider initialTheme={theme}>{component}</ThemeProvider>)
}

describe('Slider', () => {
  it('reports the new value as a number', () => {
    const onChange = vi.fn()
    renderWithTheme(<Slider value={10} onChange={onChange} />)

    fireEvent.change(screen.getByRole('slider'), { target: { value: '40' } })
    expect(onChange).toHaveBeenCalledWith(40)
  })

  it('fills the track up to the value', () => {
    renderWithTheme(<Slider value={25} min={0} max={50} onChange={() => {}} />)

    expect(screen.getByRole('slider').style.background).toContain('50%')
  })

  it('uses the dark track in dark theme', () => {
    renderWithTheme(<Slider value={0} onChange={() => {}} />, 'dark')

    expect(screen.getByRole('slider')).toHaveClass('[--slider-track:rgba(255,255,255,0.15)]')
  })

  it('passes disabled to the input', () => {
    renderWithTheme(<Slider value={0} onChange={() => {}} disabled />)

    expect(screen.getByRole('slider')).toBeDisabled()
  })
})
