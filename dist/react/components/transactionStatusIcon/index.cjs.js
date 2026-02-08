"use client";

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var jsxRuntime = require('react/jsx-runtime');
var ThemeContext = require('../../contexts/ThemeContext.cjs.js');
var index = require('../icons/index.cjs.js');

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
    props = tslib.__rest(_a, ["status", "color"]);
  const {
    theme
  } = ThemeContext.useTheme();
  const map = {
    SUCCESS: index.SuccessIcon,
    FAIL: index.ErrorIcon,
    QUEUED: index.QueuedIcon,
    POOLED: index.PooledIcon,
    BROADCASTED: index.BroadcastedIcon
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
  return IconComponent != null ? jsxRuntime.jsx(IconComponent, Object.assign({
    color: iconColor
  }, props)) : null;
};

exports.TransactionStatusIcon = TransactionStatusIcon;
exports.default = TransactionStatusIcon;
//# sourceMappingURL=index.cjs.js.map
