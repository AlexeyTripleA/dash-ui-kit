import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NotActive } from './index'

describe('NotActive', () => {
  it('renders with default text "n/a" when no children provided', () => {
    render(<NotActive />)
    expect(screen.getByText('n/a')).toBeInTheDocument()
  })

  it('renders with custom children text', () => {
    render(<NotActive>Custom inactive text</NotActive>)
    expect(screen.getByText('Custom inactive text')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<NotActive className="custom-class">Test</NotActive>)
    const element = screen.getByText('Test')
    expect(element).toHaveClass('custom-class')
  })

  it('applies default styling classes', () => {
    render(<NotActive>Test</NotActive>)
    const element = screen.getByText('Test')
    expect(element).toHaveClass('text-sm', 'text-gray-400')
  })

  it('passes through HTML attributes', () => {
    render(<NotActive data-testid="not-active" title="tooltip">Test</NotActive>)
    const element = screen.getByTestId('not-active')
    expect(element).toHaveAttribute('title', 'tooltip')
  })

  it('renders as span element', () => {
    render(<NotActive>Test</NotActive>)
    const element = screen.getByText('Test')
    expect(element.tagName).toBe('SPAN')
  })
}) 