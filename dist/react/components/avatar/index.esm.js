"use client";

import { __rest } from 'tslib';
import { jsx } from 'react/jsx-runtime';
import { useMemo } from 'react';
import { minidenticon } from '../../node_modules/minidenticons/minidenticons.esm.js';

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
    props = __rest(_a, ["username", "className", "saturation", "lightness"]);
  const svgURI = useMemo(() => 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(username, saturation, lightness)), [username, saturation, lightness]);
  const containerClasses = `relative inline-block ${className}`.trim();
  const imageClasses = 'w-full h-full';
  return jsx("div", {
    className: containerClasses,
    children: jsx("img", Object.assign({
      src: svgURI,
      alt: username || '',
      className: imageClasses
    }, props))
  });
};

export { Avatar, Avatar as default };
//# sourceMappingURL=index.esm.js.map
