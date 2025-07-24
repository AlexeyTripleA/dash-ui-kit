import { useState, useEffect, useRef, useCallback } from 'react'

interface UseDebounceOptions<T> {
  /**
   * Задержка в миллисекундах
   */
  delay: number
  /**
   * Колбэк, вызываемый при изменении debounced значения
   */
  callback?: (value: T) => void
  /**
   * Если true, то значение будет установлено немедленно при первом вызове
   */
  immediate?: boolean
}

interface UseDebounceReturn<T> {
  /**
   * Текущее debounced значение
   */
  debouncedValue: T
  /**
   * Функция для принудительного сброса debounce и немедленного обновления значения
   */
  flush: () => void
  /**
   * Функция для отмены текущего pending debounce
   */
  cancel: () => void
  /**
   * Есть ли pending изменение
   */
  isPending: boolean
}

/**
 * Хук для debouncing значений с расширенной функциональностью
 * 
 * @param value - Значение для debounce
 * @param options - Опции конфигурации
 * @returns Объект с debounced значением и методами управления
 */
const useDebounce = <T>(
  value: T, 
  options: UseDebounceOptions<T> | number
): UseDebounceReturn<T> => {
  // Поддержка обратной совместимости - если передали число, то это delay
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
    // Если immediate === true и это первый запуск, устанавливаем значение сразу
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

  // Cleanup на размонтирование
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

// Экспорт для обратной совместимости
export default useDebounce

// Именованный экспорт для нового API
export { useDebounce } 