import React from 'react'
import {
  SuccessIcon,
  ErrorIcon,
  QueuedIcon,
  PooledIcon,
  BroadcastedIcon,
  IconProps
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
 */
export interface TransactionStatusIconProps extends Omit<IconProps, 'color'> {
  /** Which status icon to show. */
  status: StatusKey
  /** Optional override for icon color. */
  color?: string
  /** Theme for default color selection. */
  theme?: 'light' | 'dark'
}

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

const iconMap = {
  SUCCESS: SuccessIcon,
  FAIL: ErrorIcon,
  QUEUED: QueuedIcon,
  POOLED: PooledIcon,
  BROADCASTED: BroadcastedIcon
} as const

/**
 * Renders an icon corresponding to the given `status`.
 * If `status` is not recognized, returns null.
 * Colors adapt to light/dark theme unless overridden.
 */
export const TransactionStatusIcon: React.FC<TransactionStatusIconProps> = ({
  status,
  color,
  theme = 'light',
  ...props
}) => {
  const IconComponent = iconMap[status]
  if (IconComponent == null) return null

  const iconColor = color ?? defaultColors[theme][status]

  return <IconComponent color={iconColor} {...props} />
}

export default TransactionStatusIcon
