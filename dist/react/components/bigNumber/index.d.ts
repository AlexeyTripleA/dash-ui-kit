import React from 'react';
export type BigNumberVariant = 'space' | 'comma';
export interface BigNumberProps {
    /** The numeric value (or string) to format. */
    children?: number | string | null;
    /** Use non-breaking space groups or comma groups. */
    variant?: BigNumberVariant;
    /** Extra class names to apply to the wrapper. Use gap-* classes for spacing between groups. */
    className?: string;
}
/**
 * Splits a numeric string into groups of three characters for display.
 * Supports two variants:
 * - `space`: groups separated by gap
 * - `comma`: groups separated by commas, with decimal part after `.`
 * Supports light/dark theme.
 */
export declare const BigNumber: React.FC<BigNumberProps>;
export default BigNumber;
