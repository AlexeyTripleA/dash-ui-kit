import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CopyButton } from './index'
import { ThemeProvider } from '../../contexts/ThemeContext'

// Mock the copyToClipboard function
vi.mock('../../utils/copyToClipboard', () => ({
  default: vi.fn(),
  copyToClipboard: vi.fn()
}))

// Mock navigator.clipboard
const mockClipboard = {
  writeText: vi.fn()
}

Object.assign(navigator, {
  clipboard: mockClipboard
})

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe('CopyButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders correctly', () => {
    render(
      <TestWrapper>
        <CopyButton text="test text" />
      </TestWrapper>
    )
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'button')
  })

  it('calls copyToClipboard with correct text when clicked', async () => {
    const testText = 'Hello, World!'
    const copyToClipboard = await import('../../utils/copyToClipboard')
    
    render(
      <TestWrapper>
        <CopyButton text={testText} />
      </TestWrapper>
    )
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(copyToClipboard.default).toHaveBeenCalledWith(testText, expect.any(Function))
  })

  it('forwards the copy result to the onCopy callback', async () => {
    const result = { status: true }
    const mockCallback = vi.fn()
    const copyToClipboard = await import('../../utils/copyToClipboard')
    vi.mocked(copyToClipboard.default).mockImplementationOnce((_text, callback) => callback?.(result))
    
    render(
      <TestWrapper>
        <CopyButton text="test" onCopy={mockCallback} />
      </TestWrapper>
    )
    
    fireEvent.click(screen.getByRole('button'))
    
    expect(mockCallback).toHaveBeenCalledWith(result)
  })

  it('shows the success feedback when the copy succeeds', async () => {
    const copyToClipboard = await import('../../utils/copyToClipboard')
    vi.mocked(copyToClipboard.default).mockImplementationOnce((_text, callback) => callback?.({ status: true }))
    
    render(
      <TestWrapper>
        <CopyButton text="test" />
      </TestWrapper>
    )
    
    fireEvent.click(screen.getByRole('button'))
    
    expect(await screen.findByText('Copied')).toBeInTheDocument()
  })

  it('shows the failure feedback when the copy fails', async () => {
    const copyToClipboard = await import('../../utils/copyToClipboard')
    vi.mocked(copyToClipboard.default).mockImplementationOnce((_text, callback) =>
      callback?.({ status: false, message: new Error('denied') })
    )
    
    render(
      <TestWrapper>
        <CopyButton text="test" />
      </TestWrapper>
    )
    
    fireEvent.click(screen.getByRole('button'))
    
    expect(await screen.findByText('Copy failed')).toBeInTheDocument()
    expect(screen.queryByText('Copied')).not.toBeInTheDocument()
  })

  it('uses custom feedback labels when provided', async () => {
    const copyToClipboard = await import('../../utils/copyToClipboard')
    vi.mocked(copyToClipboard.default).mockImplementationOnce((_text, callback) => callback?.({ status: true }))
    
    render(
      <TestWrapper>
        <CopyButton text="test" copiedLabel="Saved" />
      </TestWrapper>
    )
    
    fireEvent.click(screen.getByRole('button'))
    
    expect(await screen.findByText('Saved')).toBeInTheDocument()
  })

  it('prevents default behavior and stops propagation on click', () => {
    const mockEvent = {
      stopPropagation: vi.fn(),
      preventDefault: vi.fn()
    }
    
    render(
      <TestWrapper>
        <CopyButton text="test" />
      </TestWrapper>
    )
    
    const button = screen.getByRole('button')
    fireEvent.click(button, mockEvent)
    
    expect(mockEvent.stopPropagation).toHaveBeenCalled()
    expect(mockEvent.preventDefault).toHaveBeenCalled()
  })

  it('applies custom className', () => {
    const customClass = 'custom-class'
    
    render(
      <TestWrapper>
        <CopyButton text="test" className={customClass} />
      </TestWrapper>
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass(customClass)
  })

  it('passes through additional button props', () => {
    render(
      <TestWrapper>
        <CopyButton 
          text="test" 
          disabled 
          data-testid="copy-btn"
          aria-label="Copy text"
        />
      </TestWrapper>
    )
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('data-testid', 'copy-btn')
    expect(button).toHaveAttribute('aria-label', 'Copy text')
  })

  it('renders with light theme styles', () => {
    render(
      <ThemeProvider initialTheme="light">
        <CopyButton text="test" />
      </ThemeProvider>
    )
    
    const icon = screen.getByRole('button').querySelector('svg')
    expect(icon).toHaveClass('text-black')
  })

  it('renders with dark theme styles', () => {
    render(
      <ThemeProvider initialTheme="dark">
        <CopyButton text="test" />
      </ThemeProvider>
    )
    
    const icon = screen.getByRole('button').querySelector('svg')
    expect(icon).toHaveClass('text-white')
  })
}) 