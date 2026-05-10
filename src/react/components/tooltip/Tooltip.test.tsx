import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Tooltip } from './index'
import { ThemeProvider } from '../../contexts/ThemeContext'

const renderWithTheme = (children: React.ReactNode, theme: 'light' | 'dark' = 'light') =>
  render(
    <ThemeProvider initialTheme={theme}>
      {children}
    </ThemeProvider>
  )

// Radix Tooltip renders content both in the visible portal AND in a visually-hidden
// ARIA span. Use getAllByText and assert that at least one element is present.
const getVisibleTooltip = (text: string) => {
  const elements = screen.getAllByText(text)
  return elements[0]
}

describe('Tooltip', () => {
  it('renders the trigger', () => {
    renderWithTheme(
      <Tooltip content='Hello'>
        <button>Trigger</button>
      </Tooltip>
    )
    expect(screen.getByText('Trigger')).toBeInTheDocument()
  })

  it('does not show tooltip content initially', () => {
    renderWithTheme(
      <Tooltip content='Hello tooltip'>
        <button>Trigger</button>
      </Tooltip>
    )
    expect(screen.queryByText('Hello tooltip')).not.toBeInTheDocument()
  })

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup()
    renderWithTheme(
      <Tooltip content='Hello tooltip' delayDuration={0}>
        <button>Trigger</button>
      </Tooltip>
    )

    await user.hover(screen.getByText('Trigger'))

    await waitFor(() => {
      expect(screen.getAllByText('Hello tooltip').length).toBeGreaterThan(0)
    })
  })


  it('shows tooltip when open is true (controlled)', () => {
    renderWithTheme(
      <Tooltip content='Controlled tooltip' open={true}>
        <button>Trigger</button>
      </Tooltip>
    )
    expect(getVisibleTooltip('Controlled tooltip')).toBeInTheDocument()
  })

  it('does not show tooltip when open is false (controlled)', () => {
    renderWithTheme(
      <Tooltip content='Controlled tooltip' open={false}>
        <button>Trigger</button>
      </Tooltip>
    )
    expect(screen.queryByText('Controlled tooltip')).not.toBeInTheDocument()
  })

  it('calls onOpenChange when tooltip opens via hover', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()

    renderWithTheme(
      <Tooltip content='Hello' delayDuration={0} onOpenChange={onOpenChange}>
        <button>Trigger</button>
      </Tooltip>
    )

    await user.hover(screen.getByText('Trigger'))

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalled()
    })
  })

  it('renders rich ReactNode content when open is controlled', () => {
    renderWithTheme(
      <Tooltip
        content={<span data-testid='rich-content'>Rich</span>}
        open={true}
      >
        <button>Trigger</button>
      </Tooltip>
    )
    expect(screen.getAllByTestId('rich-content').length).toBeGreaterThan(0)
  })

  it('wraps plain string children in a span', () => {
    renderWithTheme(
      <Tooltip content='Tip'>
        Plain text
      </Tooltip>
    )
    expect(screen.getByText('Plain text')).toBeInTheDocument()
  })

  it('renders correctly in dark theme', () => {
    renderWithTheme(
      <Tooltip content='Dark tooltip' open={true}>
        <button>Trigger</button>
      </Tooltip>,
      'dark'
    )
    expect(screen.getAllByText('Dark tooltip').length).toBeGreaterThan(0)
  })
})
