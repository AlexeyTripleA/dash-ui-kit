"use client";

import { __rest } from 'tslib';
import { jsx } from 'react/jsx-runtime';
import { useTheme } from '../../contexts/ThemeContext.esm.js';
import { BroadcastedIcon, PooledIcon, QueuedIcon, ErrorIcon, SuccessIcon } from '../icons/index.esm.js';

/**
 * Renders an icon corresponding to the given `status`.
 * If `status` is not recognized, returns null.
 * Colors adapt to light/dark theme unless overridden.
 */
const TransactionStatusIcon = _a => {
  var {
      status,
      color
    } = _a,
    props = __rest(_a, ["status", "color"]);
  const {
    theme
  } = useTheme();
  const map = {
    SUCCESS: SuccessIcon,
    FAIL: ErrorIcon,
    QUEUED: QueuedIcon,
    POOLED: PooledIcon,
    BROADCASTED: BroadcastedIcon
  };
  const IconComponent = map[status];
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
  };
  const iconColor = color !== null && color !== void 0 ? color : defaultColors[theme][status];
  return IconComponent != null ? jsx(IconComponent, Object.assign({
    color: iconColor
  }, props)) : null;
};

export { TransactionStatusIcon, TransactionStatusIcon as default };
//# sourceMappingURL=index.esm.js.map
