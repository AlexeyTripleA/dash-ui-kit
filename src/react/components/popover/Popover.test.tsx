import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Popover } from './index'
import { ThemeProvider } from '../../contexts/ThemeContext'

const renderWithTheme = (children: React.ReactNode, theme: 'light' | 'dark' = 'light') =>
  render(
    <ThemeProvider initialTheme={theme}>
      {children}
    </ThemeProvider>
  )

describe('Popover', () => {
  it('renders the trigger', () => {
    renderWithTheme(
      <Popover content='Popover body'>
        <button>Open</button>
      </Popover>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('does not show content initially', () => {
    renderWithTheme(
      <Popover content='Popover body'>
        <button>Open</button>
      </Popover>
    )
    expect(screen.queryByText('Popover body')).not.toBeInTheDocument()
  })

  it('shows content after clicking trigger', async () => {
    renderWithTheme(
      <Popover content='Popover body'>
        <button>Open</button>
      </Popover>
    )

    fireEvent.click(screen.getByText('Open'))

    await waitFor(() => {
      expect(screen.getByText('Popover body')).toBeInTheDocument()
    })
  })

  it('closes popover when Escape is pressed', async () => {
    renderWithTheme(
      <Popover content='Popover body'>
        <button>Open</button>
      </Popover>
    )

    fireEvent.click(screen.getByText('Open'))

    await waitFor(() => {
      expect(screen.getByText('Popover body')).toBeInTheDocument()
    })

    fireEvent.keyDown(document, { key: 'Escape' })

    await waitFor(() => {
      expect(screen.queryByText('Popover body')).not.toBeInTheDocument()
    })
  })

  it('renders close button when showCloseButton is true', async () => {
    renderWithTheme(
      <Popover content='Popover body' showCloseButton>
        <button>Open</button>
      </Popover>
    )

    fireEvent.click(screen.getByText('Open'))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
    })
  })

  it('does not render close button by default', async () => {
    renderWithTheme(
      <Popover content='Popover body'>
        <button>Open</button>
      </Popover>
    )

    fireEvent.click(screen.getByText('Open'))

    await waitFor(() => {
      expect(screen.getByText('Popover body')).toBeInTheDocument()
    })

    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument()
  })

  it('closes popover when close button is clicked', async () => {
    renderWithTheme(
      <Popover content='Popover body' showCloseButton>
        <button>Open</button>
      </Popover>
    )

    fireEvent.click(screen.getByText('Open'))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /close/i }))

    await waitFor(() => {
      expect(screen.queryByText('Popover body')).not.toBeInTheDocument()
    })
  })

  it('shows content when open is true (controlled)', () => {
    renderWithTheme(
      <Popover content='Controlled popover' open={true}>
        <button>Open</button>
      </Popover>
    )
    expect(screen.getByText('Controlled popover')).toBeInTheDocument()
  })

  it('hides content when open is false (controlled)', () => {
    renderWithTheme(
      <Popover content='Controlled popover' open={false}>
        <button>Open</button>
      </Popover>
    )
    expect(screen.queryByText('Controlled popover')).not.toBeInTheDocument()
  })

  it('calls onOpenChange when popover is toggled', async () => {
    const onOpenChange = vi.fn()

    renderWithTheme(
      <Popover content='Popover body' onOpenChange={onOpenChange}>
        <button>Open</button>
      </Popover>
    )

    fireEvent.click(screen.getByText('Open'))

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true)
    })
  })

  it('renders rich ReactNode content', async () => {
    renderWithTheme(
      <Popover
        content={<div data-testid='rich'>Rich content</div>}
        open={true}
      >
        <button>Open</button>
      </Popover>
    )
    expect(screen.getByTestId('rich')).toBeInTheDocument()
  })

  it('applies custom className to content', async () => {
    renderWithTheme(
      <Popover content='Popover body' open={true} className='custom-cls'>
        <button>Open</button>
      </Popover>
    )

    const content = screen.getByText('Popover body').closest('[data-radix-popper-content-wrapper]')
      ?.firstElementChild

    expect(content).toHaveClass('custom-cls')
  })

  it('renders correctly in dark theme', () => {
    renderWithTheme(
      <Popover content='Dark popover' open={true}>
        <button>Open</button>
      </Popover>,
      'dark'
    )
    expect(screen.getByText('Dark popover')).toBeInTheDocument()
  })
})
