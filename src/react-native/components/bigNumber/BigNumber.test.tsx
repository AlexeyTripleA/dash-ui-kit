import React from 'react'
import { render } from '@testing-library/react-native'
import { BigNumber } from './index'

describe('BigNumber', () => {
  it('renders nothing when children is null or undefined', () => {
    const { container: containerNull } = render(<BigNumber children={null} />)
    const { container: containerUndefined } = render(<BigNumber children={undefined} />)
    
    expect(containerNull.toJSON()).toBeNull()
    expect(containerUndefined.toJSON()).toBeNull()
  })

  it('renders number with space variant by default', () => {
    const { getByText } = render(<BigNumber>1234567</BigNumber>)
    expect(getByText('1234567')).toBeTruthy()
  })

  it('groups digits with space variant using gap', () => {
    const { container } = render(<BigNumber variant="space">1234567</BigNumber>)
    expect(container.toJSON()).toBeTruthy()
  })

  it('groups digits with comma variant', () => {
    const { getByText } = render(<BigNumber variant="comma">1234567</BigNumber>)
    // Should contain commas for grouping
    expect(getByText(',')).toBeTruthy()
  })

  it('handles decimal numbers with comma variant', () => {
    const { getByText } = render(<BigNumber variant="comma">1234.56</BigNumber>)
    // Should contain decimal point
    expect(getByText('.')).toBeTruthy()
    expect(getByText('56')).toBeTruthy()
  })

  it('handles string input', () => {
    const { getByText } = render(<BigNumber>9876543</BigNumber>)
    expect(getByText('9876543')).toBeTruthy()
  })

  it('applies custom className', () => {
    const { getByText } = render(
      <BigNumber className="text-blue-600">123</BigNumber>
    )
    const text = getByText('123')
    expect(text.props.style).toBeDefined()
  })

  it('handles small numbers correctly', () => {
    const { getByText } = render(<BigNumber>42</BigNumber>)
    expect(getByText('42')).toBeTruthy()
  })

  it('handles zero correctly', () => {
    const { getByText } = render(<BigNumber>0</BigNumber>)
    expect(getByText('0')).toBeTruthy()
  })

  it('groups large numbers correctly with space variant', () => {
    const { getByText } = render(<BigNumber variant="space">123456789</BigNumber>)
    // Should have groups separated - check first group exists
    expect(getByText('123')).toBeTruthy()
  })

  it('groups large numbers correctly with comma variant', () => {
    const { getAllByText } = render(<BigNumber variant="comma">123456789</BigNumber>)
    // Should have multiple commas for a 9-digit number
    const commas = getAllByText(',')
    expect(commas.length).toBe(2) // 123,456,789 has 2 commas
  })

  it('preserves decimal part with comma variant', () => {
    const { getByText } = render(<BigNumber variant="comma">12345.678</BigNumber>)
    expect(getByText('678')).toBeTruthy()
    expect(getByText('.')).toBeTruthy()
  })

  it('handles decimal numbers with space variant', () => {
    const { getByText } = render(<BigNumber variant="space">1234.56</BigNumber>)
    expect(getByText('.')).toBeTruthy()
    expect(getByText('56')).toBeTruthy()
  })

  it('groups integer part only, not decimal part', () => {
    const { getByText } = render(<BigNumber variant="space">123456.789</BigNumber>)
    // Decimal part should remain as-is
    expect(getByText('789')).toBeTruthy()
  })

  describe('Variant: space', () => {
    it('renders single digit', () => {
      const { getByText } = render(<BigNumber variant="space">5</BigNumber>)
      expect(getByText('5')).toBeTruthy()
    })

    it('renders two digits', () => {
      const { getByText } = render(<BigNumber variant="space">42</BigNumber>)
      expect(getByText('42')).toBeTruthy()
    })

    it('renders three digits', () => {
      const { getByText } = render(<BigNumber variant="space">123</BigNumber>)
      expect(getByText('123')).toBeTruthy()
    })

    it('renders four digits with grouping', () => {
      const { getByText } = render(<BigNumber variant="space">1234</BigNumber>)
      expect(getByText('1')).toBeTruthy()
      expect(getByText('234')).toBeTruthy()
    })
  })

  describe('Variant: comma', () => {
    it('renders single digit', () => {
      const { getByText } = render(<BigNumber variant="comma">5</BigNumber>)
      expect(getByText('5')).toBeTruthy()
    })

    it('renders two digits', () => {
      const { getByText } = render(<BigNumber variant="comma">42</BigNumber>)
      expect(getByText('42')).toBeTruthy()
    })

    it('renders three digits', () => {
      const { getByText } = render(<BigNumber variant="comma">123</BigNumber>)
      expect(getByText('123')).toBeTruthy()
    })

    it('renders four digits with comma', () => {
      const { getByText } = render(<BigNumber variant="comma">1234</BigNumber>)
      expect(getByText('1')).toBeTruthy()
      expect(getByText('234')).toBeTruthy()
      expect(getByText(',')).toBeTruthy()
    })
  })

  describe('Edge cases', () => {
    it('handles negative numbers', () => {
      const { getByText } = render(<BigNumber>-1234</BigNumber>)
      // The minus sign should be part of the first group
      expect(getByText('-1')).toBeTruthy()
      expect(getByText('234')).toBeTruthy()
    })

    it('handles very large numbers', () => {
      const { getByText } = render(<BigNumber>123456789012345</BigNumber>)
      expect(getByText('123')).toBeTruthy()
    })

    it('handles decimal-only numbers', () => {
      const { getByText } = render(<BigNumber>0.123</BigNumber>)
      expect(getByText('0')).toBeTruthy()
      expect(getByText('123')).toBeTruthy()
    })
  })
})
