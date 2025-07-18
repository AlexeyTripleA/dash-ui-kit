import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ValueCard } from './index'
import { ThemeProvider } from '../../contexts/ThemeContext'

const TestWrapper = ({ children, theme = 'light' }: { children: React.ReactNode, theme?: 'light' | 'dark' }) => (
  <ThemeProvider initialTheme={theme}>
    {children}
  </ThemeProvider>
)

describe('ValueCard', () => {
  it('renders with provided children', () => {
    render(
      <TestWrapper>
        <ValueCard>Test content</ValueCard>
      </TestWrapper>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders as a div by default', () => {
    render(
      <TestWrapper>
        <ValueCard data-testid="value-card">Test</ValueCard>
      </TestWrapper>
    )
    expect(screen.getByTestId('value-card')).toBeInstanceOf(HTMLDivElement)
  })

  it('renders as an anchor when link is provided', () => {
    render(
      <TestWrapper>
        <ValueCard link="/test" data-testid="value-card">Test</ValueCard>
      </TestWrapper>
    )
    const element = screen.getByTestId('value-card')
    expect(element).toBeInstanceOf(HTMLAnchorElement)
    expect(element).toHaveAttribute('href', '/test')
  })

  it('renders with custom as component', () => {
    render(
      <TestWrapper>
        <ValueCard as="button" data-testid="value-card">Test</ValueCard>
      </TestWrapper>
    )
    expect(screen.getByTestId('value-card')).toBeInstanceOf(HTMLButtonElement)
  })

  it('applies clickable styles when clickable is true', () => {
    render(
      <TestWrapper>
        <ValueCard clickable data-testid="value-card">Test</ValueCard>
      </TestWrapper>
    )
    expect(screen.getByTestId('value-card')).toHaveClass('cursor-pointer')
  })

  it('applies clickable styles when link is provided', () => {
    render(
      <TestWrapper>
        <ValueCard link="/test" data-testid="value-card">Test</ValueCard>
      </TestWrapper>
    )
    expect(screen.getByTestId('value-card')).toHaveClass('cursor-pointer')
  })

  it('applies loading animation when loading is true', () => {
    render(
      <TestWrapper>
        <ValueCard loading data-testid="value-card">Test</ValueCard>
      </TestWrapper>
    )
    expect(screen.getByTestId('value-card')).toHaveClass('animate-pulse')
  })

  it('applies custom className', () => {
    render(
      <TestWrapper>
        <ValueCard className="custom-class" data-testid="value-card">Test</ValueCard>
      </TestWrapper>
    )
    expect(screen.getByTestId('value-card')).toHaveClass('custom-class')
  })

  it('handles onClick events when clickable', () => {
    const onClick = vi.fn()
    render(
      <TestWrapper>
        <ValueCard clickable onClick={onClick} data-testid="value-card">Test</ValueCard>
      </TestWrapper>
    )
    fireEvent.click(screen.getByTestId('value-card'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('applies different size variants', () => {
    const { rerender } = render(
      <TestWrapper>
        <ValueCard size="sm" data-testid="value-card">Test</ValueCard>
      </TestWrapper>
    )
    expect(screen.getByTestId('value-card')).toHaveClass('dash-block-sm')

    rerender(
      <TestWrapper>
        <ValueCard size="xl" data-testid="value-card">Test</ValueCard>
      </TestWrapper>
    )
    expect(screen.getByTestId('value-card')).toHaveClass('dash-block-xl')
  })

  it('applies different color schemes', () => {
    const { rerender } = render(
      <TestWrapper>
        <ValueCard colorScheme="green" data-testid="value-card">Test</ValueCard>
      </TestWrapper>
    )
    expect(screen.getByTestId('value-card')).toHaveClass('text-green-500', 'bg-green-200')

    rerender(
      <TestWrapper>
        <ValueCard colorScheme="lightBlue" data-testid="value-card">Test</ValueCard>
      </TestWrapper>
    )
    expect(screen.getByTestId('value-card')).toHaveClass('bg-dash-brand-dim/10')
  })

  it('removes border when border is false', () => {
    render(
      <TestWrapper>
        <ValueCard border={false} data-testid="value-card">Test</ValueCard>
      </TestWrapper>
    )
    expect(screen.getByTestId('value-card')).toHaveClass('!outline-none')
  })

  it('adapts to dark theme', () => {
    render(
      <TestWrapper theme="dark">
        <ValueCard data-testid="value-card">Test</ValueCard>
      </TestWrapper>
    )
    expect(screen.getByTestId('value-card')).toHaveClass('bg-gray-800/50', 'outline-gray-400')
  })
}) 