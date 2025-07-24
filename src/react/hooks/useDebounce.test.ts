import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import useDebounce from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    )

    // При первоначальной загрузке значение устанавливается, но нет pending состояния
    act(() => {
      vi.advanceTimersByTime(500) // Дожидаемся завершения первого debounce
    })

    expect(result.current.debouncedValue).toBe('initial')
    expect(result.current.isPending).toBe(false)

    // Изменяем значение
    rerender({ value: 'updated', delay: 500 })
    expect(result.current.debouncedValue).toBe('initial') // Еще не обновилось
    expect(result.current.isPending).toBe(true)

    // Прокручиваем время
    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(result.current.debouncedValue).toBe('updated')
    expect(result.current.isPending).toBe(false)
  })

  it('should call callback when value changes', () => {
    const callback = vi.fn()
    const { rerender } = renderHook(
      ({ value }) => useDebounce(value, { delay: 500, callback }),
      { initialProps: { value: 'initial' } }
    )

    rerender({ value: 'updated' })
    
    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(callback).toHaveBeenCalledWith('updated')
  })

  it('should support immediate mode', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => 
      useDebounce('immediate', { delay: 500, immediate: true, callback })
    )

    expect(result.current.debouncedValue).toBe('immediate')
    expect(callback).toHaveBeenCalledWith('immediate')
  })

  it('should cancel pending debounce', () => {
    const callback = vi.fn()
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, { delay: 500, callback }),
      { initialProps: { value: 'initial' } }
    )

    rerender({ value: 'updated' })
    expect(result.current.isPending).toBe(true)

    act(() => {
      result.current.cancel()
    })

    expect(result.current.isPending).toBe(false)

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(callback).not.toHaveBeenCalled()
  })

  it('should flush pending debounce immediately', () => {
    const callback = vi.fn()
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, { delay: 500, callback }),
      { initialProps: { value: 'initial' } }
    )

    rerender({ value: 'updated' })
    expect(result.current.debouncedValue).toBe('initial')
    expect(result.current.isPending).toBe(true)

    act(() => {
      result.current.flush()
    })

    expect(result.current.debouncedValue).toBe('updated')
    expect(result.current.isPending).toBe(false)
    expect(callback).toHaveBeenCalledWith('updated')
  })

  it('should maintain backward compatibility with number delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    )

    expect(result.current.debouncedValue).toBe('initial')

    rerender({ value: 'updated', delay: 500 })

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(result.current.debouncedValue).toBe('updated')
  })
}) 