import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DateBlock } from './index'

describe('DateBlock', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-15T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders with all format (default)', () => {
    const timestamp = new Date('2024-01-14T10:30:00Z')
    
    render(<DateBlock timestamp={timestamp} />)
    
    // Should show calendar icon, date, and delta
    expect(screen.getByText('14 Jan 2024')).toBeInTheDocument()
    expect(screen.getByText('1d ago')).toBeInTheDocument()
  })

  it('renders with deltaOnly format', () => {
    const timestamp = new Date('2024-01-14T10:30:00Z')
    
    render(<DateBlock timestamp={timestamp} format="deltaOnly" />)
    
    // Should only show delta
    expect(screen.getByText('1d ago')).toBeInTheDocument()
    expect(screen.queryByText('14 Jan 2024')).not.toBeInTheDocument()
  })

  it('renders with dateOnly format', () => {
    const timestamp = new Date('2024-01-14T10:30:00Z')
    
    render(<DateBlock timestamp={timestamp} format="dateOnly" />)
    
    // Should only show date
    expect(screen.getByText('14 Jan 2024')).toBeInTheDocument()
    expect(screen.queryByText('1d ago')).not.toBeInTheDocument()
  })

  it('shows time when showTime is true', () => {
    const timestamp = new Date('2024-01-14T15:45:00Z')
    
    render(<DateBlock timestamp={timestamp} showTime={true} />)
    
    // Should include time in the formatted date
    expect(screen.getByText('14 Jan 2024, 15:45')).toBeInTheDocument()
  })

  it('handles string timestamp', () => {
    const timestamp = '2024-01-14T10:30:00Z'
    
    render(<DateBlock timestamp={timestamp} />)
    
    expect(screen.getByText('14 Jan 2024')).toBeInTheDocument()
    expect(screen.getByText('1d ago')).toBeInTheDocument()
  })

  it('handles numeric timestamp', () => {
    const timestamp = new Date('2024-01-14T10:30:00Z').getTime()
    
    render(<DateBlock timestamp={timestamp} />)
    
    expect(screen.getByText('14 Jan 2024')).toBeInTheDocument()
    expect(screen.getByText('1d ago')).toBeInTheDocument()
  })

  it('returns null for invalid timestamp', () => {
    const { container } = render(<DateBlock timestamp="invalid-date" />)
    
    expect(container.firstChild).toBeNull()
  })

  it('applies custom className', () => {
    const timestamp = new Date('2024-01-14T10:30:00Z')
    
    const { container } = render(
      <DateBlock timestamp={timestamp} className="custom-class" />
    )
    
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('handles future dates', () => {
    const timestamp = new Date('2024-01-16T10:30:00Z') // tomorrow
    
    render(<DateBlock timestamp={timestamp} />)
    
    expect(screen.getByText('16 Jan 2024')).toBeInTheDocument()
    expect(screen.getByText('1d left')).toBeInTheDocument()
  })

  it('handles recent timestamps (hours)', () => {
    const timestamp = new Date('2024-01-15T10:00:00Z') // 2 hours ago
    
    render(<DateBlock timestamp={timestamp} />)
    
    expect(screen.getByText('15 Jan 2024')).toBeInTheDocument()
    expect(screen.getByText('2h ago')).toBeInTheDocument()
  })

  it('handles recent timestamps (minutes)', () => {
    const timestamp = new Date('2024-01-15T11:30:00Z') // 30 minutes ago
    
    render(<DateBlock timestamp={timestamp} />)
    
    expect(screen.getByText('15 Jan 2024')).toBeInTheDocument()
    expect(screen.getByText('30 min. ago')).toBeInTheDocument()
  })

  it('handles very recent timestamps (seconds)', () => {
    const timestamp = new Date('2024-01-15T11:59:30Z') // 30 seconds ago
    
    render(<DateBlock timestamp={timestamp} />)
    
    expect(screen.getByText('15 Jan 2024')).toBeInTheDocument()
    expect(screen.getByText('30 sec. ago')).toBeInTheDocument()
  })

  it('handles edge case with empty className', () => {
    const timestamp = new Date('2024-01-14T10:30:00Z')
    
    const { container } = render(
      <DateBlock timestamp={timestamp} className="" />
    )
    
    // Should not add extra spaces for empty className
    expect((container.firstChild as HTMLElement)?.className).not.toMatch(/\s{2,}/)
  })

  it('formats date correctly with British locale', () => {
    const timestamp = new Date('2024-12-01T10:30:00Z')
    
    render(<DateBlock timestamp={timestamp} />)
    
    // Should use British date format (day month year)
    expect(screen.getByText('1 Dec 2024')).toBeInTheDocument()
  })

  it('includes calendar icon in all format', () => {
    const timestamp = new Date('2024-01-14T10:30:00Z')
    
    const { container } = render(<DateBlock timestamp={timestamp} format="all" />)
    
    // Calendar icon should be present
    const calendarIcon = container.querySelector('svg')
    expect(calendarIcon).toBeInTheDocument()
  })

  it('excludes calendar icon in deltaOnly format', () => {
    const timestamp = new Date('2024-01-14T10:30:00Z')
    
    const { container } = render(<DateBlock timestamp={timestamp} format="deltaOnly" />)
    
    // Calendar icon should not be present
    const calendarIcon = container.querySelector('svg')
    expect(calendarIcon).not.toBeInTheDocument()
  })

  it('excludes calendar icon in dateOnly format', () => {
    const timestamp = new Date('2024-01-14T10:30:00Z')
    
    const { container } = render(<DateBlock timestamp={timestamp} format="dateOnly" />)
    
    // Calendar icon should not be present
    const calendarIcon = container.querySelector('svg')
    expect(calendarIcon).not.toBeInTheDocument()
  })
}) 