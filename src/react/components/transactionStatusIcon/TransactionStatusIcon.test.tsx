import { render, screen } from '@testing-library/react'
import { TransactionStatusIcon } from './index'
import { describe, it, expect } from 'vitest'

describe('TransactionStatusIcon', () => {
  it('renders SUCCESS status icon', () => {
    const { container } = render(<TransactionStatusIcon status="SUCCESS" />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders FAIL status icon', () => {
    const { container } = render(<TransactionStatusIcon status="FAIL" />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders QUEUED status icon', () => {
    const { container } = render(<TransactionStatusIcon status="QUEUED" />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders POOLED status icon', () => {
    const { container } = render(<TransactionStatusIcon status="POOLED" />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders BROADCASTED status icon', () => {
    const { container } = render(<TransactionStatusIcon status="BROADCASTED" />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('passes through size prop', () => {
    const { container } = render(<TransactionStatusIcon status="SUCCESS" size={32} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '32')
    expect(svg).toHaveAttribute('height', '32')
  })

  it('passes through color prop', () => {
    const { container } = render(<TransactionStatusIcon status="SUCCESS" color="#ff0000" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('color', '#ff0000')
  })

  it('passes through additional props', () => {
    const { container } = render(
      <TransactionStatusIcon 
        status="SUCCESS" 
        className="custom-class"
        data-testid="transaction-icon"
      />
    )
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('custom-class')
    expect(svg).toHaveAttribute('data-testid', 'transaction-icon')
  })

  it('returns null for invalid status', () => {
    // @ts-expect-error - Testing invalid status
    const { container } = render(<TransactionStatusIcon status="INVALID" />)
    expect(container.firstChild).toBeNull()
  })

  it('handles all valid status types', () => {
    const statuses = ['SUCCESS', 'FAIL', 'QUEUED', 'POOLED', 'BROADCASTED'] as const
    
    statuses.forEach(status => {
      const { container } = render(<TransactionStatusIcon status={status} />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })
}) 