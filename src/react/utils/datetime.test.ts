import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getDaysBetweenDates, getDynamicRange, getTimeDelta } from './datetime'

describe('datetime utilities', () => {
  describe('getDaysBetweenDates', () => {
    it('returns correct days between dates', () => {
      const start = new Date('2024-01-01T00:00:00Z')
      const end = new Date('2024-01-03T00:00:00Z')
      
      expect(getDaysBetweenDates(start, end)).toBe(2)
    })

    it('returns 0 when start date is missing', () => {
      const end = new Date('2024-01-03T00:00:00Z')
      
      expect(getDaysBetweenDates(undefined, end)).toBe(0)
    })

    it('returns 0 when end date is missing', () => {
      const start = new Date('2024-01-01T00:00:00Z')
      
      expect(getDaysBetweenDates(start, undefined)).toBe(0)
    })

    it('returns 0 for invalid dates', () => {
      expect(getDaysBetweenDates('invalid', 'invalid')).toBe(0)
    })

    it('rounds up partial days', () => {
      const start = new Date('2024-01-01T00:00:00Z')
      const end = new Date('2024-01-01T12:00:00Z') // 0.5 days
      
      expect(getDaysBetweenDates(start, end)).toBe(1)
    })

    it('handles string dates', () => {
      const start = '2024-01-01T00:00:00Z'
      const end = '2024-01-03T00:00:00Z'
      
      expect(getDaysBetweenDates(start, end)).toBe(2)
    })

    it('handles timestamp numbers', () => {
      const start = new Date('2024-01-01T00:00:00Z').getTime()
      const end = new Date('2024-01-03T00:00:00Z').getTime()
      
      expect(getDaysBetweenDates(start, end)).toBe(2)
    })
  })

  describe('getDynamicRange', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2024-01-01T12:00:00Z'))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('returns correct range for given duration', () => {
      const duration = 24 * 60 * 60 * 1000 // 1 day in ms
      const result = getDynamicRange(duration)
      
      expect(result.end).toBe('2024-01-01T12:00:00.000Z')
      expect(result.start).toBe('2023-12-31T12:00:00.000Z')
    })

    it('returns correct range for hour duration', () => {
      const duration = 60 * 60 * 1000 // 1 hour in ms
      const result = getDynamicRange(duration)
      
      expect(result.end).toBe('2024-01-01T12:00:00.000Z')
      expect(result.start).toBe('2024-01-01T11:00:00.000Z')
    })
  })

  describe('getTimeDelta', () => {
    it('returns correct format for past dates (default)', () => {
      const start = new Date('2024-01-01T12:00:00Z')
      const end = new Date('2024-01-01T11:00:00Z')
      
      expect(getTimeDelta(start, end)).toBe('1h ago')
    })

    it('returns correct format for future dates (default)', () => {
      const start = new Date('2024-01-01T11:00:00Z')
      const end = new Date('2024-01-01T12:00:00Z')
      
      expect(getTimeDelta(start, end)).toBe('1h left')
    })

    it('returns correct format for days', () => {
      const start = new Date('2024-01-03T12:00:00Z')
      const end = new Date('2024-01-01T12:00:00Z')
      
      expect(getTimeDelta(start, end)).toBe('2d ago')
    })

    it('returns correct format for minutes', () => {
      const start = new Date('2024-01-01T12:30:00Z')
      const end = new Date('2024-01-01T12:00:00Z')
      
      expect(getTimeDelta(start, end)).toBe('30 min. ago')
    })

    it('returns correct format for seconds', () => {
      const start = new Date('2024-01-01T12:00:30Z')
      const end = new Date('2024-01-01T12:00:00Z')
      
      expect(getTimeDelta(start, end)).toBe('30 sec. ago')
    })

    it('returns detailed format', () => {
      const start = new Date('2024-01-01T10:00:00Z')
      const end = new Date('2024-01-02T14:30:15Z')
      
      expect(getTimeDelta(start, end, 'detailed')).toBe('1d:4h:30m')
    })

    it('returns n/a for invalid dates', () => {
      expect(getTimeDelta('invalid', 'invalid')).toBe('n/a')
    })

    it('returns "Invalid format" for unknown format', () => {
      const start = new Date('2024-01-01T10:00:00Z')
      const end = new Date('2024-01-01T11:00:00Z')
      
      expect(getTimeDelta(start, end, 'unknown' as any)).toBe('Invalid format')
    })

    it('handles string dates', () => {
      const start = '2024-01-01T12:00:00Z'
      const end = '2024-01-01T11:00:00Z'
      
      expect(getTimeDelta(start, end)).toBe('1h ago')
    })

    it('handles timestamp numbers', () => {
      const start = new Date('2024-01-01T12:00:00Z').getTime()
      const end = new Date('2024-01-01T11:00:00Z').getTime()
      
      expect(getTimeDelta(start, end)).toBe('1h ago')
    })

    it('prioritizes days over hours in default format', () => {
      const start = new Date('2024-01-02T14:00:00Z')
      const end = new Date('2024-01-01T10:00:00Z')
      
      expect(getTimeDelta(start, end)).toBe('1d ago')
    })

    it('prioritizes hours over minutes in default format', () => {
      const start = new Date('2024-01-01T13:30:00Z')
      const end = new Date('2024-01-01T12:00:00Z')
      
      expect(getTimeDelta(start, end)).toBe('1h ago')
    })

    it('prioritizes minutes over seconds in default format', () => {
      const start = new Date('2024-01-01T12:01:30Z')
      const end = new Date('2024-01-01T12:00:00Z')
      
      expect(getTimeDelta(start, end)).toBe('1 min. ago')
    })
  })
}) 