"use client";

import { __rest } from 'tslib';
import { jsx } from 'react/jsx-runtime';
import { useColorScheme } from '../../hooks/useColorScheme.esm.js';

const Badge = _a => {
  var _b;
  var {
      children,
      variant = 'default',
      color,
      colorLight,
      colorDark,
      size = 'sm',
      borderRadius,
      className = '',
      onClick
    } = _a,
    props = __rest(_a, ["children", "variant", "color", "colorLight", "colorDark", "size", "borderRadius", "className", "onClick"]);
  const effectiveColor = (_b = useColorScheme(color, colorLight, colorDark)) !== null && _b !== void 0 ? _b : 'blue';
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors';
  // Size classes with default border radius
  const sizeClasses = {
    xxs: 'px-1 py-1 text-xs gap-2 rounded-full',
    xs: 'px-[0.5rem] py-[0.25rem] text-xs rounded-full',
    sm: 'px-[2.125rem] py-[0.625rem] text-xs rounded-full',
    xl: 'px-[2.25rem] py-4 text-lg rounded-full'
  };
  // Border radius classes (overrides size border radius)
  const borderRadiusClasses = {
    xs: 'rounded-[0.25rem]'
  };
  // Color and variant combination classes
  const getVariantClasses = () => {
    const colorMap = {
      blue: {
        default: 'text-[#4C7EFF]',
        flat: 'bg-[rgba(76,126,255,0.15)] text-[#4C7EFF]',
        solid: 'bg-[#4C7EFF] text-white',
        bordered: 'outline outline-1 outline-[#4C7EFF] text-[#4C7EFF]'
      },
      white: {
        default: 'text-white',
        flat: 'bg-[rgba(255,255,255,0.15)] text-white',
        solid: 'bg-white text-[#0C1C33]',
        bordered: 'outline outline-1 outline-white text-white'
      },
      gray: {
        default: 'text-[#0C1C33]',
        flat: 'bg-[rgba(12,28,51,0.15)] text-[#0C1C33]',
        solid: 'bg-[#0C1C33] text-white',
        bordered: 'outline outline-1 outline-[#0C1C33] text-[#0C1C33]'
      },
      'light-gray': {
        default: 'text-[#6B7280]',
        flat: 'bg-[#0C1C33]/5 text-[#0C1C33]',
        solid: 'bg-[#0C1C33]/15 text-[#0C1C33]',
        bordered: 'outline outline-1 outline-[#6B7280] text-[#6B7280]'
      },
      turquoise: {
        default: 'text-[#60F6D2]',
        flat: 'bg-[rgba(96,246,210,0.15)] text-[#60F6D2]',
        solid: 'bg-[#60F6D2] text-[#0C1C33]',
        bordered: 'outline outline-1 outline-[#60F6D2] text-[#60F6D2]'
      },
      red: {
        default: 'text-[#CD2E00]',
        flat: 'bg-[rgba(205,46,0,0.15)] text-[#CD2E00]',
        solid: 'bg-[#CD2E00] text-white',
        bordered: 'outline outline-1 outline-[#CD2E00] text-[#CD2E00]'
      },
      orange: {
        default: 'text-[#F98F12]',
        flat: 'bg-[rgba(249,143,18,0.15)] text-[#F98F12]',
        solid: 'bg-[#F98F12] text-white',
        bordered: 'outline outline-1 outline-[#F98F12] text-[#F98F12]'
      }
    };
    return colorMap[effectiveColor][variant];
  };
  const classes = [baseClasses, sizeClasses[size], getVariantClasses(), borderRadius && borderRadiusClasses[borderRadius], className].filter(Boolean).join(' ');
  return jsx("span", Object.assign({
    className: classes,
    onClick: onClick
  }, props, {
    children: children
  }));
};

export { Badge, Badge as default };
//# sourceMappingURL=index.esm.js.map
