"use client";

'use strict';

var jsxRuntime = require('react/jsx-runtime');
var index$1 = require('../text/index.cjs.js');
var index = require('../icons/index.cjs.js');
var ThemeContext = require('../../contexts/ThemeContext.cjs.js');

const iconComponents = {
  check: index.CheckIcon
};
const List = ({
  items,
  iconType = 'check',
  className = '',
  size = 'sm'
}) => {
  const {
    theme
  } = ThemeContext.useTheme();
  const IconComponent = iconComponents[iconType];
  return jsxRuntime.jsx("ul", {
    className: `space-y-5 w-full ${className}`,
    children: items.map((item, index) => jsxRuntime.jsxs("li", {
      className: 'flex items-start gap-4',
      children: [jsxRuntime.jsx(IconComponent, {
        size: 20,
        className: 'flex-shrink-0',
        color: theme === 'dark' ? '#4C7EFF' : '#4C7EFF'
      }), jsxRuntime.jsxs("div", {
        className: 'flex flex-col gap-1',
        children: [jsxRuntime.jsx(index$1.Text, {
          size: size,
          weight: "medium",
          children: item.text
        }), item.description && jsxRuntime.jsx(index$1.Text, {
          size: 'xs',
          dim: true,
          className: 'opacity-75',
          children: item.description
        })]
      })]
    }, index))
  });
};

exports.List = List;
//# sourceMappingURL=index.cjs.js.map
