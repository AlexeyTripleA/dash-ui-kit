"use client";

import { jsx, jsxs } from 'react/jsx-runtime';
import { Text } from '../text/index.esm.js';
import { CheckIcon } from '../icons/index.esm.js';
import { useTheme } from '../../contexts/ThemeContext.esm.js';

const iconComponents = {
  check: CheckIcon
};
const List = ({
  items,
  iconType = 'check',
  className = '',
  size = 'sm'
}) => {
  const {
    theme
  } = useTheme();
  const IconComponent = iconComponents[iconType];
  return jsx("ul", {
    className: `space-y-5 w-full ${className}`,
    children: items.map((item, index) => jsxs("li", {
      className: 'flex items-start gap-4',
      children: [jsx(IconComponent, {
        size: 20,
        className: 'flex-shrink-0',
        color: theme === 'dark' ? '#4C7EFF' : '#4C7EFF'
      }), jsxs("div", {
        className: 'flex flex-col gap-1',
        children: [jsx(Text, {
          size: size,
          weight: "medium",
          children: item.text
        }), item.description && jsx(Text, {
          size: 'xs',
          dim: true,
          className: 'opacity-75',
          children: item.description
        })]
      })]
    }, index))
  });
};

export { List };
//# sourceMappingURL=index.esm.js.map
