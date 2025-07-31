import React from 'react';
export type DateBlockFormat = 'all' | 'deltaOnly' | 'dateOnly';
export interface DateBlockProps {
    /** Unix timestamp (ms), Date object, or parsable date string */
    timestamp: number | Date | string;
    /** Display format: full date+delta, delta only, or date only */
    format?: DateBlockFormat;
    /** Include hours and minutes in formatted date */
    showTime?: boolean;
    /** Show a tooltip with relative time */
    showRelativeTooltip?: boolean;
    /** Additional CSS classes for wrapper div */
    className?: string;
}
/**
 * DateBlock component displays a date, optional calendar icon,
 * and relative time via TimeDelta. It can also show an optional
 * tooltip with the relative time when hovered. Supports light/dark theme.
 */
export declare const DateBlock: React.FC<DateBlockProps>;
export default DateBlock;
