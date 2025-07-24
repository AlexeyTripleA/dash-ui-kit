import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Identifier from './index'
import { ThemeProvider } from '../../contexts/ThemeContext'

const mockClipboard = {
  writeText: vi.fn()
}
Object.assign(navigator, {
  clipboard: mockClipboard
})

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider initialTheme='light'>
      {component}
    </ThemeProvider>
  )
}

const longId = 'abcdefghijklmnopqrstuvwxyz1234567890'

describe.concurrent('Identifier', () => {
  it('renders identifier text correctly', () => {
    renderWithTheme(<Identifier>test-id-123</Identifier>)
    
    expect(screen.getByText('test-id-123')).toBeInTheDocument()
  })

  it('renders NotActive when no children provided', () => {
    renderWithTheme(<Identifier />)
    
    expect(screen.getByText('Not active')).toBeInTheDocument()
  })

  it('renders NotActive when empty string provided', () => {
    renderWithTheme(<Identifier>{''}</Identifier>)
    
    expect(screen.getByText('Not active')).toBeInTheDocument()
  })

  it('shows avatar when avatar prop is true', () => {
    const { container } = renderWithTheme(
      <Identifier avatar>test-id</Identifier>
    )
    
    const avatar = container.querySelector('img')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('alt', 'test-id')
  })

  it('does not show avatar when children is empty', () => {
    const { container } = renderWithTheme(
      <Identifier avatar>{''}</Identifier>
    )
    
    const avatar = container.querySelector('img')
    expect(avatar).not.toBeInTheDocument()
  })

  it('shows copy button when copyButton prop is true', () => {
    renderWithTheme(
      <Identifier copyButton>test-id</Identifier>
    )
    
    const copyButton = screen.getByRole('button')
    expect(copyButton).toBeInTheDocument()
    expect(copyButton).toHaveAttribute('title', 'Copy to clipboard')
  })

  it('copies to clipboard when copy button is clicked', async () => {
    mockClipboard.writeText.mockResolvedValue(undefined)
    
    renderWithTheme(
      <Identifier copyButton>test-id-123</Identifier>
    )
    
    const copyButton = screen.getByRole('button')
    fireEvent.click(copyButton)
    
    expect(mockClipboard.writeText).toHaveBeenCalledWith('test-id-123')
    
    await waitFor(() => {
      expect(copyButton).toHaveAttribute('title', 'Copied!')
    })
  })

  it('applies custom className', () => {
    const { container } = renderWithTheme(
      <Identifier className="custom-class">test-id</Identifier>
    )
    
    const identifier = container.firstChild
    expect(identifier).toHaveClass('custom-class')
  })

  it('handles middle ellipsis correctly', () => {
    renderWithTheme(
      <Identifier middleEllipsis edgeChars={3}>{longId}</Identifier>
    )
    
    expect(screen.getByText('abc')).toBeInTheDocument()
    expect(screen.getByText('...')).toBeInTheDocument()
    expect(screen.getByText('890')).toBeInTheDocument()
  })

  it('does not add ellipsis for short text with middleEllipsis', () => {
    renderWithTheme(
      <Identifier middleEllipsis edgeChars={5}>short</Identifier>
    )
    
    expect(screen.getByText('short')).toBeInTheDocument()
    expect(screen.queryByText('...')).not.toBeInTheDocument()
  })

  it('renders highlighted text in highlight mode', () => {
    const { container } = renderWithTheme(
      <Identifier highlight="highlight">{longId}</Identifier>
    )
    
    const spans = container.querySelectorAll('span')
    expect(spans.length).toBeGreaterThan(1)
  })

  it('applies ellipsis styles when ellipsis prop is true', () => {
    const { container } = renderWithTheme(
      <Identifier ellipsis>very-long-identifier-that-should-be-truncated</Identifier>
    )
    
    const textContainer = container.querySelector('.overflow-hidden.whitespace-nowrap.text-ellipsis')
    expect(textContainer).toBeInTheDocument()
  })

  it('applies line clamp styles when maxLines is set', () => {
    const { container } = renderWithTheme(
      <Identifier maxLines={2}>{longId}</Identifier>
    )
    
    const textContainer = container.querySelector('div[style*="webkit-line-clamp"]')
    expect(textContainer).toBeInTheDocument()
  })

  it('works with both avatar and copy button', () => {
    const { container } = renderWithTheme(
      <Identifier avatar copyButton>test-id</Identifier>
    )
    
    const avatar = container.querySelector('img')
    const copyButton = screen.getByRole('button')
    
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('alt', 'test-id')
    expect(copyButton).toBeInTheDocument()
  })
}) 