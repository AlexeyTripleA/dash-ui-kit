import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TimeDelta } from './index'

describe('TimeDelta', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders time delta for past date', () => {
    const now = new Date('2024-01-01T12:00:00Z')
    const pastDate = new Date('2024-01-01T11:00:00Z')
    vi.setSystemTime(now)

    render(<TimeDelta endDate={pastDate} />)
    
    expect(screen.getByText('1h ago')).toBeInTheDocument()
  })

  it('renders time delta for future date', () => {
    const now = new Date('2024-01-01T12:00:00Z')
    const futureDate = new Date('2024-01-01T13:00:00Z')
    vi.setSystemTime(now)

    render(<TimeDelta endDate={futureDate} />)
    
    expect(screen.getByText('1h left')).toBeInTheDocument()
  })

  it('renders time delta with custom start date', () => {
    const startDate = new Date('2024-01-01T10:00:00Z')
    const endDate = new Date('2024-01-01T12:00:00Z')

    render(<TimeDelta startDate={startDate} endDate={endDate} />)
    
    expect(screen.getByText('2h left')).toBeInTheDocument()
  })

  it('renders detailed format', () => {
    const startDate = new Date('2024-01-01T10:00:00Z')
    const endDate = new Date('2024-01-02T14:30:00Z')

    render(<TimeDelta startDate={startDate} endDate={endDate} format="detailed" />)
    
    expect(screen.getByText('1d:4h:30m')).toBeInTheDocument()
  })

  it('renders NotActive when endDate is null', () => {
    render(<TimeDelta endDate={null as any} />)
    
    expect(screen.getByText('N/A')).toBeInTheDocument()
  })

  it('renders days when delta is more than 24 hours', () => {
    const now = new Date('2024-01-03T12:00:00Z')
    const pastDate = new Date('2024-01-01T12:00:00Z')
    vi.setSystemTime(now)

    render(<TimeDelta endDate={pastDate} />)
    
    expect(screen.getByText('2d ago')).toBeInTheDocument()
  })

  it('renders minutes when delta is less than an hour', () => {
    const now = new Date('2024-01-01T12:30:00Z')
    const pastDate = new Date('2024-01-01T12:00:00Z')
    vi.setSystemTime(now)

    render(<TimeDelta endDate={pastDate} />)
    
    expect(screen.getByText('30 min. ago')).toBeInTheDocument()
  })

  it('renders seconds when delta is less than a minute', () => {
    const now = new Date('2024-01-01T12:00:30Z')
    const pastDate = new Date('2024-01-01T12:00:00Z')
    vi.setSystemTime(now)

    render(<TimeDelta endDate={pastDate} />)
    
    expect(screen.getByText('30 sec. ago')).toBeInTheDocument()
  })

  it('handles string dates', () => {
    const now = new Date('2024-01-01T12:00:00Z')
    const pastDateString = '2024-01-01T11:00:00Z'
    vi.setSystemTime(now)

    render(<TimeDelta endDate={pastDateString} />)
    
    expect(screen.getByText('1h ago')).toBeInTheDocument()
  })

  it('handles timestamp numbers', () => {
    const now = new Date('2024-01-01T12:00:00Z')
    const pastTimestamp = new Date('2024-01-01T11:00:00Z').getTime()
    vi.setSystemTime(now)

    render(<TimeDelta endDate={pastTimestamp} />)
    
    expect(screen.getByText('1h ago')).toBeInTheDocument()
  })

  it('renders n/a for invalid dates', () => {
    render(<TimeDelta endDate="invalid-date" />)
    
    expect(screen.getByText('N/A')).toBeInTheDocument()
  })
}) 