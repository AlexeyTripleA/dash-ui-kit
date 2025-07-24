/**
 * Acceptable inputs for date parameters.
 */
export type DateInput = Date | string | number;
/**
 * Returns the number of whole days between two dates.
 * Rounds up any partial day.
 *
 * @param startDate - The start date (Date | ISO string | timestamp)
 * @param endDate   - The end date (Date | ISO string | timestamp)
 * @returns Number of days difference, or 0 if either date is missing/invalid
 */
export declare function getDaysBetweenDates(startDate?: DateInput, endDate?: DateInput): number;
/**
 * Creates a dynamic ISO-range from now back by `duration` milliseconds.
 *
 * @param duration - Time span in milliseconds
 * @returns Object with `start` and `end` ISO date strings
 */
export declare function getDynamicRange(duration: number): {
    start: string;
    end: string;
};
/**
 * Allowed formats for time delta output.
 */
export type TimeDeltaFormat = 'default' | 'detailed';
/**
 * Returns a human-readable difference between two dates.
 *
 * - `default`: largest unit with suffix (`"2d ago"`, `"5h left"`, etc.)
 * - `detailed`: full breakdown as `"Xd:Yh:Zm"`
 *
 * If inputs are invalid, returns `"n/a"` or `"Invalid format"`.
 *
 * @param startDate - The start date (Date | ISO string | timestamp)
 * @param endDate   - The end date (Date | ISO string | timestamp)
 * @param format    - `'default'` or `'detailed'`
 * @returns A string describing the time delta
 */
export declare function getTimeDelta(startDate: DateInput, endDate: DateInput, format?: TimeDeltaFormat): string;
