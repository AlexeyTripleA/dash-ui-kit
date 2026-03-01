/**
 * Dash brand colors (from CSS variables)
 */
export const DASH_COLORS = {
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
} as const

/**
 * Status/semantic color mappings
 */
export const STATUS_COLORS = {
  success: 'green',
  error: 'red',
  warning: 'orange',
  info: 'blue',
  neutral: 'gray'
} as const
