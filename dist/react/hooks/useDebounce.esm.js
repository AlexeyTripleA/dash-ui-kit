"use client";

import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Hook for debouncing values with extended functionality
 *
 * @param value - Value to debounce
 * @param options - Configuration options
 * @returns Object with debounced value and control methods
 */
const useDebounce = (value, options) => {
  // Backward compatibility support - if number is passed, it's delay
  const config = typeof options === 'number' ? {
    delay: options
  } : options;
  const {
    delay,
    callback,
    immediate = false
  } = config;
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isPending, setIsPending] = useState(false);
  const timeoutRef = useRef(null);
  const isFirstRun = useRef(true);
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setIsPending(false);
    }
  }, []);
  const flush = useCallback(() => {
    cancel();
    setDebouncedValue(value);
    callback === null || callback === void 0 ? void 0 : callback(value);
    setIsPending(false);
  }, [value, callback, cancel]);
  useEffect(() => {
    // If immediate === true and this is first run, set value immediately
    if (immediate && isFirstRun.current) {
      setDebouncedValue(value);
      callback === null || callback === void 0 ? void 0 : callback(value);
      isFirstRun.current = false;
      return;
    }
    isFirstRun.current = false;
    setIsPending(true);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      callback === null || callback === void 0 ? void 0 : callback(value);
      setIsPending(false);
      timeoutRef.current = null;
    }, delay);
    timeoutRef.current = handler;
    return () => {
      clearTimeout(handler);
      setIsPending(false);
    };
  }, [value, delay, callback, immediate]);
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return {
    debouncedValue,
    flush,
    cancel,
    isPending
  };
};

export { useDebounce as default, useDebounce };
//# sourceMappingURL=useDebounce.esm.js.map
