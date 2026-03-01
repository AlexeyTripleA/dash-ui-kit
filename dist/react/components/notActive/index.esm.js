"use client";

import { __rest } from 'tslib';
import { jsx } from 'react/jsx-runtime';
import { cva } from 'class-variance-authority';
import { useTheme } from '../../contexts/ThemeContext.esm.js';

const notActiveStyles = cva('text-sm', {
  variants: {
    theme: {
      light: 'text-gray-400',
      dark: 'text-gray-500'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
function NotActive(_a) {
  var {
      children,
      className
    } = _a,
    props = __rest(_a, ["children", "className"]);
  const {
    theme
  } = useTheme();
  return jsx("span", Object.assign({
    className: `${notActiveStyles({
      theme
    })} ${className !== null && className !== void 0 ? className : ''}`
  }, props, {
    children: children !== null && children !== void 0 ? children : 'n/a'
  }));
}

export { NotActive };
//# sourceMappingURL=index.esm.js.map
