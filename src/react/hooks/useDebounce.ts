import { useState, useEffect, useRef, useCallback } from 'react'

interface UseDebounceOptions<T> {
  /**
   * Delay in milliseconds
   */
  delay: number
  /**
   * Callback called when debounced value changes
   */
  callback?: (value: T) => void
  /**
   * If true, the value will be set immediately on first call
   */
  immediate?: boolean
}

interface UseDebounceReturn<T> {
  /**
   * Current debounced value
   */
  debouncedValue: T
  /**
   * Function to force flush debounce and immediately update value
   */
  flush: () => void
  /**
   * Function to cancel current pending debounce
   */
  cancel: () => void
  /**
   * Whether there's a pending change
   */
  isPending: boolean
}

/**
 * Hook for debouncing values with extended functionality
 * 
 * @param value - Value to debounce
 * @param options - Configuration options
 * @returns Object with debounced value and control methods
 */
const useDebounce = <T>(
  value: T, 
  options: UseDebounceOptions<T> | number
): UseDebounceReturn<T> => {
  // Backward compatibility support - if number is passed, it's delay
  const config: UseDebounceOptions<T> = typeof options === 'number' 
    ? { delay: options }
    : options

  const { delay, callback, immediate = false } = config
  
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  const [isPending, setIsPending] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isFirstRun = useRef(true)

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
      setIsPending(false)
    }
  }, [])

  const flush = useCallback(() => {
    cancel()
    setDebouncedValue(value)
    callback?.(value)
    setIsPending(false)
  }, [value, callback, cancel])

  useEffect(() => {
    // If immediate === true and this is first run, set value immediately
    if (immediate && isFirstRun.current) {
      setDebouncedValue(value)
      callback?.(value)
      isFirstRun.current = false
      return
    }

    isFirstRun.current = false
    setIsPending(true)

    const handler = setTimeout(() => {
      setDebouncedValue(value)
      callback?.(value)
      setIsPending(false)
      timeoutRef.current = null
    }, delay)

    timeoutRef.current = handler

    return () => {
      clearTimeout(handler)
      setIsPending(false)
    }
  }, [value, delay, callback, immediate])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    debouncedValue,
    flush,
    cancel,
    isPending
  }
}

// Export for backward compatibility
export default useDebounce

// Named export for new API
export { useDebounce } 