"use client";

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var minidenticons = require('minidenticons');

/**
 * Avatar component that creates unique identicons from usernames
 * with customizable appearance.
 */
const Avatar = _a => {
  var {
      username,
      className = '',
      saturation = 50,
      lightness = 50
    } = _a,
    props = tslib.__rest(_a, ["username", "className", "saturation", "lightness"]);
  const svgURI = React.useMemo(() => 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticons.minidenticon(username, saturation, lightness)), [username, saturation, lightness]);
  const containerClasses = `relative inline-block ${className}`.trim();
  const imageClasses = 'w-full h-full';
  return jsxRuntime.jsx("div", {
    className: containerClasses,
    children: jsxRuntime.jsx("img", Object.assign({
      src: svgURI,
      alt: username || '',
      className: imageClasses
    }, props))
  });
};

exports.Avatar = Avatar;
exports.default = Avatar;
//# sourceMappingURL=index.cjs.js.map
