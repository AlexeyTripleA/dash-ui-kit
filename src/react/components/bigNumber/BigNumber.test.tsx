import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BigNumber } from './index'

describe('BigNumber', () => {
  it('renders nothing when children is null or undefined', () => {
    const { container: containerNull } = render(<BigNumber children={null} />)
    const { container: containerUndefined } = render(<BigNumber children={undefined} />)
    
    expect(containerNull.firstChild).toBeNull()
    expect(containerUndefined.firstChild).toBeNull()
  })

  it('renders number with space variant by default', () => {
    render(<BigNumber>1234567</BigNumber>)
    const element = screen.getByText('1234567')
    expect(element).toBeInTheDocument()
  })

  it('groups digits with space variant', () => {
    const { container } = render(<BigNumber variant="space">1234567</BigNumber>)
    // Should have space separators between groups
    const spaces = container.querySelectorAll('.w-\\[3px\\]')
    expect(spaces.length).toBeGreaterThan(0)
  })

  it('groups digits with comma variant', () => {
    render(<BigNumber variant="comma">1234567</BigNumber>)
    // Should contain commas for grouping
    expect(screen.getByText(',')).toBeInTheDocument()
  })

  it('handles decimal numbers with comma variant', () => {
    render(<BigNumber variant="comma">1234.56</BigNumber>)
    // Should contain decimal point
    expect(screen.getByText('.')).toBeInTheDocument()
    expect(screen.getByText('56')).toBeInTheDocument()
  })

  it('handles string input', () => {
    render(<BigNumber>9876543</BigNumber>)
    expect(screen.getByText('9876543')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <BigNumber className="custom-class">123</BigNumber>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('handles small numbers correctly', () => {
    render(<BigNumber>42</BigNumber>)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('handles zero correctly', () => {
    render(<BigNumber>0</BigNumber>)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('groups large numbers correctly with space variant', () => {
    const { container } = render(<BigNumber variant="space">123456789</BigNumber>)
    // Should have multiple groups
    const spans = container.querySelectorAll('span span')
    expect(spans.length).toBeGreaterThan(1)
  })

  it('groups large numbers correctly with comma variant', () => {
    render(<BigNumber variant="comma">123456789</BigNumber>)
    // Should have multiple commas for a 9-digit number
    const commas = screen.getAllByText(',')
    expect(commas.length).toBe(2) // 123,456,789 has 2 commas
  })

  it('preserves decimal part with comma variant', () => {
    render(<BigNumber variant="comma">12345.678</BigNumber>)
    expect(screen.getByText('678')).toBeInTheDocument()
    expect(screen.getByText('.')).toBeInTheDocument()
  })
}) 