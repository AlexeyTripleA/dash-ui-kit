/**
 * Standard size mappings to Tailwind classes
 */
const TAILWIND_SIZES = {
  xxs: 'text-[10px]',
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl'
};
/**
 * Font weight mappings to Tailwind classes
 */
const TAILWIND_WEIGHTS = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold'
};
/**
 * Spacing constants (in pixels)
 */
const SPACING = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64
};
/**
 * Border radius constants
 */
const BORDER_RADIUS = {
  none: '0',
  xs: '0.25rem',
  // 4px
  sm: '0.375rem',
  // 6px
  md: '0.5rem',
  // 8px
  lg: '0.75rem',
  // 12px
  xl: '1rem',
  // 16px
  '2xl': '1.5rem',
  // 24px
  full: '9999px'
};

/**
 * Dash brand colors (from CSS variables)
 */
const DASH_COLORS = {
  brand: 'var(--color-dash-brand)',
  brandDim: 'var(--color-dash-brand-dim)',
  brandDark: 'var(--color-dash-brand-dark)',
  brandDarkness: 'var(--color-dash-brand-darkness)',
  mint: 'var(--color-dash-mint)',
  mintHover: 'var(--color-dash-mint-hover)',
  yellowLight: 'var(--color-dash-yellow-light)',
  yellow: 'var(--color-dash-yellow)',
  primaryDieSubdued: 'var(--color-dash-primary-die-subdued)',
  primaryDarkBlue: 'var(--color-dash-primary-dark-blue)'
};
/**
 * Status/semantic color mappings
 */
const STATUS_COLORS = {
  success: 'green',
  error: 'red',
  warning: 'orange',
  info: 'blue',
  neutral: 'gray'
};

/**
 * Returns the number of whole days between two dates.
 * Rounds up any partial day.
 *
 * @param startDate - The start date (Date | ISO string | timestamp)
 * @param endDate   - The end date (Date | ISO string | timestamp)
 * @returns Number of days difference, or 0 if either date is missing/invalid
 */
function getDaysBetweenDates(startDate, endDate) {
  if (startDate == null || endDate == null) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
  const diffMs = Math.abs(end.getTime() - start.getTime());
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return days;
}
/**
 * Creates a dynamic ISO-range from now back by `duration` milliseconds.
 *
 * @param duration - Time span in milliseconds
 * @returns Object with `start` and `end` ISO date strings
 */
function getDynamicRange(duration) {
  const now = new Date();
  const end = now.toISOString();
  const start = new Date(now.getTime() - duration).toISOString();
  return {
    start,
    end
  };
}
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
function getTimeDelta(startDate, endDate, format = 'default') {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 'n/a';
  }
  const diffMs = end.getTime() - start.getTime();
  const isFuture = diffMs > 0;
  const absMs = Math.abs(diffMs);
  const days = Math.floor(absMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(absMs % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
  const minutes = Math.floor(absMs % (1000 * 60 * 60) / (1000 * 60));
  const seconds = Math.floor(absMs % (1000 * 60) / 1000);
  if (format === 'default') {
    const suffix = isFuture ? 'left' : 'ago';
    if (days > 0) {
      return `${days}d ${suffix}`;
    }
    if (hours > 0) {
      return `${hours}h ${suffix}`;
    }
    if (minutes > 0) {
      return `${minutes} min. ${suffix}`;
    }
    return `${seconds} sec. ${suffix}`;
  }
  if (format === 'detailed') {
    return `${days}d:${hours}h:${minutes}m`;
  }
  return 'Invalid format';
}

export { BORDER_RADIUS, DASH_COLORS, SPACING, STATUS_COLORS, TAILWIND_SIZES, TAILWIND_WEIGHTS, getDaysBetweenDates, getDynamicRange, getTimeDelta };
//# sourceMappingURL=index.esm.js.map
