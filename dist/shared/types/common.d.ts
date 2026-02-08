/**
 * Common size variants used across components
 */
export type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
/**
 * Standard size variants (most common)
 */
export type StandardSize = 'sm' | 'md' | 'xl';
/**
 * Base props that most components extend
 */
export interface BaseComponentProps {
    /** Additional CSS class names */
    className?: string;
    /** Component children */
    children?: React.ReactNode;
}
/**
 * Theme variants
 */
export type Theme = 'light' | 'dark';
/**
 * Color scheme variants used across components
 */
export type ColorScheme = 'brand' | 'mint' | 'gray' | 'red' | 'blue' | 'green' | 'orange' | 'lightBlue' | 'lightGray' | 'turquoise' | 'white';
/**
 * Common variant patterns
 */
export type Variant = 'default' | 'solid' | 'outline' | 'flat' | 'bordered' | 'ghost';
/**
 * Font weight variants
 */
export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
