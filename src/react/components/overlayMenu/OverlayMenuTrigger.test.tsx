import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ThemeProvider } from '../../contexts/ThemeContext'
import { OverlayMenu } from './index'

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider initialTheme='light'>{component}</ThemeProvider>)

describe('OverlayMenu trigger', () => {
  it('lets the trigger content shrink so truncation works', () => {
    renderWithTheme(<OverlayMenu triggerContent={<span>Long content</span>} />)
    expect(screen.getByText('Long content').parentElement).toHaveClass('min-w-0')
  })

  it('applies arrowClassName to the built-in arrow', () => {
    const { container } = renderWithTheme(<OverlayMenu arrowClassName='opacity-48' />)
    expect(container.querySelector('button svg')).toHaveClass('opacity-48')
  })

  it('shows the error outline without a border', () => {
    renderWithTheme(<OverlayMenu border={false} error triggerContent='Value' />)
    expect(screen.getByRole('button')).toHaveClass('outline', 'outline-red-500')
  })
})
