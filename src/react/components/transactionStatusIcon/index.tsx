import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import {
  SuccessIcon,
  ErrorIcon,
  QueuedIcon,
  PooledIcon,
  BroadcastedIcon
} from '../icons'

/**
 * Available status keys for which an icon will be rendered.
 */
export type StatusKey =
  | 'SUCCESS'
  | 'FAIL'
  | 'QUEUED'
  | 'POOLED'
  | 'BROADCASTED'

/**
 * Props for the TransactionStatusIcon component.
 * Inherits all props of SuccessIcon (assumed representative of all icons),
 * plus a `status` field to choose which icon to render.
 */
export interface TransactionStatusIconProps
  extends Omit<React.ComponentProps<typeof SuccessIcon>, 'size' | 'color'> {
  /** Which status icon to show. */
  status: StatusKey
  /** Optional override for icon size. */
  size?: number
  /** Optional override for icon color. */
  color?: string
}

/**
 * Renders an icon corresponding to the given `status`.
 * If `status` is not recognized, returns null.
 * Colors adapt to light/dark theme unless overridden.
 */
export const TransactionStatusIcon: React.FC<TransactionStatusIconProps> = ({ status, color, ...props }) => {
  const { theme } = useTheme()
  
  const map = {
    SUCCESS: SuccessIcon,
    FAIL: ErrorIcon,
    QUEUED: QueuedIcon,
    POOLED: PooledIcon,
    BROADCASTED: BroadcastedIcon
  } as const

  const IconComponent = map[status]

  // Default colors based on theme, if no color override provided
  const defaultColors = {
    light: {
      SUCCESS: '#1CC400',
      FAIL: '#F45858',
      QUEUED: '#F4A358',
      POOLED: '#008DE4',
      BROADCASTED: '#008DE4'
    },
    dark: {
      SUCCESS: '#22D32E',
      FAIL: '#FF6B6B',
      QUEUED: '#FFB366',
      POOLED: '#42A5F5',
      BROADCASTED: '#42A5F5'
    }
  }

  const iconColor = color ?? defaultColors[theme][status]

  return IconComponent != null ? <IconComponent color={iconColor} {...props} /> : null
}

export default TransactionStatusIcon 