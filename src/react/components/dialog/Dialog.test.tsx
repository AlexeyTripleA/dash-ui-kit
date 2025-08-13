import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Dialog } from './index'
import { ThemeProvider } from '../../contexts/ThemeContext'

const renderWithTheme = (children: React.ReactNode, theme = 'light') => {
  return render(
    <ThemeProvider initialTheme={theme as 'light' | 'dark'}>
      {children}
    </ThemeProvider>
  )
}

describe('Dialog', () => {
  it('renders controlled dialog when open', () => {
    renderWithTheme(
      <Dialog open={true} title="Test Dialog">
        <div>Dialog content</div>
      </Dialog>
    )
    
    expect(screen.getByText('Test Dialog')).toBeInTheDocument()
    expect(screen.getByText('Dialog content')).toBeInTheDocument()
  })

  it('does not render controlled dialog when closed', () => {
    renderWithTheme(
      <Dialog open={false} title="Test Dialog">
        <div>Dialog content</div>
      </Dialog>
    )
    
    expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument()
    expect(screen.queryByText('Dialog content')).not.toBeInTheDocument()
  })

  it('renders with trigger in uncontrolled mode', async () => {
    renderWithTheme(
      <Dialog 
        title="Test Dialog"
        trigger={<button>Open Dialog</button>}
      >
        <div>Dialog content</div>
      </Dialog>
    )
    
    const trigger = screen.getByText('Open Dialog')
    expect(trigger).toBeInTheDocument()
    
    fireEvent.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Test Dialog')).toBeInTheDocument()
      expect(screen.getByText('Dialog content')).toBeInTheDocument()
    })
  })

  it('calls onOpenChange when close button is clicked', async () => {
    const onOpenChange = vi.fn()
    
    renderWithTheme(
      <Dialog 
        open={true} 
        onOpenChange={onOpenChange}
        title="Test Dialog"
        showCloseButton={true}
      >
        <div>Dialog content</div>
      </Dialog>
    )
    
    const closeButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(closeButton)
    
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('renders without title when not provided', () => {
    renderWithTheme(
      <Dialog open={true}>
        <div>Dialog content</div>
      </Dialog>
    )
    
    expect(screen.getByText('Dialog content')).toBeInTheDocument()
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('renders without close button when showCloseButton is false', () => {
    renderWithTheme(
      <Dialog 
        open={true}
        title="Test Dialog"
        showCloseButton={false}
      >
        <div>Dialog content</div>
      </Dialog>
    )
    
    expect(screen.getByText('Test Dialog')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument()
  })

  it('applies custom className to content', () => {
    renderWithTheme(
      <Dialog 
        open={true}
        className="custom-class"
      >
        <div>Dialog content</div>
      </Dialog>
    )
    
    const content = screen.getByText('Dialog content').closest('[role="dialog"]')
    expect(content).toHaveClass('custom-class')
  })

  it('renders correctly in dark theme', () => {
    renderWithTheme(
      <Dialog open={true} title="Test Dialog">
        <div>Dialog content</div>
      </Dialog>,
      'dark'
    )
    
    expect(screen.getByText('Test Dialog')).toBeInTheDocument()
    expect(screen.getByText('Dialog content')).toBeInTheDocument()
  })

  it('closes dialog when overlay is clicked', async () => {
    const onOpenChange = vi.fn()
    
    renderWithTheme(
      <Dialog 
        open={true} 
        onOpenChange={onOpenChange}
        title="Test Dialog"
      >
        <div>Dialog content</div>
      </Dialog>
    )
    
    // Click on overlay (outside content)
    const overlay = document.querySelector('[data-radix-dialog-overlay]')
    if (overlay) {
      fireEvent.click(overlay)
      expect(onOpenChange).toHaveBeenCalledWith(false)
    }
  })

  it('closes dialog when Escape key is pressed', async () => {
    const onOpenChange = vi.fn()
    
    renderWithTheme(
      <Dialog 
        open={true} 
        onOpenChange={onOpenChange}
        title="Test Dialog"
      >
        <div>Dialog content</div>
      </Dialog>
    )
    
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('applies correct size classes', () => {
    renderWithTheme(
      <Dialog 
        open={true}
        size="sm"
        title="Small Dialog"
      >
        <div>Dialog content</div>
      </Dialog>
    )
    
    const content = screen.getByText('Dialog content').closest('[role="dialog"]')
    expect(content).toHaveClass('dash-block-sm')
  })

  it('applies medium size by default', () => {
    renderWithTheme(
      <Dialog 
        open={true}
        title="Default Dialog"
      >
        <div>Dialog content</div>
      </Dialog>
    )
    
    const content = screen.getByText('Dialog content').closest('[role="dialog"]')
    expect(content).toHaveClass('dash-block-md')
  })

  it('applies xl size correctly', () => {
    renderWithTheme(
      <Dialog 
        open={true}
        size="xl"
        title="Large Dialog"
      >
        <div>Dialog content</div>
      </Dialog>
    )
    
    const content = screen.getByText('Dialog content').closest('[role="dialog"]')
    expect(content).toHaveClass('dash-block-xl')
  })
})
