"use client";

'use strict';

var tslib = require('tslib');
var jsxRuntime = require('react/jsx-runtime');
var classVarianceAuthority = require('class-variance-authority');
var ThemeContext = require('../../contexts/ThemeContext.cjs.js');

const notActiveStyles = classVarianceAuthority.cva('text-sm', {
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
    props = tslib.__rest(_a, ["children", "className"]);
  const {
    theme
  } = ThemeContext.useTheme();
  return jsxRuntime.jsx("span", Object.assign({
    className: `${notActiveStyles({
      theme
    })} ${className !== null && className !== void 0 ? className : ''}`
  }, props, {
    children: children !== null && children !== void 0 ? children : 'n/a'
  }));
}

exports.NotActive = NotActive;
//# sourceMappingURL=index.cjs.js.map
