interface UseDebounceOptions<T> {
    /**
     * Delay in milliseconds
     */
    delay: number;
    /**
     * Callback called when debounced value changes
     */
    callback?: (value: T) => void;
    /**
     * If true, the value will be set immediately on first call
     */
    immediate?: boolean;
}
interface UseDebounceReturn<T> {
    /**
     * Current debounced value
     */
    debouncedValue: T;
    /**
     * Function to force flush debounce and immediately update value
     */
    flush: () => void;
    /**
     * Function to cancel current pending debounce
     */
    cancel: () => void;
    /**
     * Whether there's a pending change
     */
    isPending: boolean;
}
/**
 * Hook for debouncing values with extended functionality
 *
 * @param value - Value to debounce
 * @param options - Configuration options
 * @returns Object with debounced value and control methods
 */
declare const useDebounce: <T>(value: T, options: UseDebounceOptions<T> | number) => UseDebounceReturn<T>;
export default useDebounce;
export { useDebounce };
