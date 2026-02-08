"use client";

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var classVarianceAuthority = require('class-variance-authority');
var index = require('../../node_modules/@react-hook/resize-observer/dist/module/index.cjs.js');
var useDebounce = require('../../hooks/useDebounce.cjs.js');
var index$2 = require('../notActive/index.cjs.js');
var index$3 = require('../copyButton/index.cjs.js');
var ThemeContext = require('../../contexts/ThemeContext.cjs.js');
var index$1 = require('../avatar/index.cjs.js');

/** CVA for the root container, now with light/dark theme */
const identifier = classVarianceAuthority.cva('flex items-center font-dash-grotesque text-sm font-normal break-all', {
  variants: {
    theme: {
      light: 'text-gray-900',
      dark: 'text-white'
    },
    ellipsis: {
      false: '',
      true: 'overflow-hidden'
    },
    highlight: {
      default: '',
      dim: '',
      highlight: '',
      first: '',
      last: '',
      both: ''
    }
  },
  defaultVariants: {
    theme: 'light',
    ellipsis: false,
    highlight: 'default'
  }
});
/** CVA for each symbol span: inherits root color or dims */
const symbol = classVarianceAuthority.cva('flex-1', {
  variants: {
    dim: {
      false: 'text-inherit',
      true: 'text-gray-500'
    }
  },
  defaultVariants: {
    dim: false
  }
});
/** Highlight‐modes config */
const highlightModes = {
  default: {
    first: true,
    middle: false,
    last: true
  },
  dim: {
    first: false,
    middle: false,
    last: false
  },
  highlight: {
    first: true,
    middle: true,
    last: true
  },
  first: {
    first: true,
    middle: false,
    last: false
  },
  last: {
    first: false,
    middle: false,
    last: true
  },
  both: {
    first: true,
    middle: false,
    last: true
  }
};
const HighlightedID = ({
  children,
  mode
}) => {
  if (children == null || children === '') return jsxRuntime.jsx(index$2.NotActive, {});
  const text = String(children);
  const count = 5;
  const first = text.slice(0, count);
  const middle = text.slice(count, text.length - count);
  const last = text.slice(-5);
  const cfg = highlightModes[mode];
  return jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [jsxRuntime.jsx("span", {
      className: symbol({
        dim: !cfg.first
      }),
      children: first
    }), jsxRuntime.jsx("span", {
      className: symbol({
        dim: !cfg.middle
      }),
      children: middle
    }), jsxRuntime.jsx("span", {
      className: symbol({
        dim: !cfg.last
      }),
      children: last
    })]
  });
};
const MiddleEllipsisText = ({
  children,
  edgeChars
}) => {
  if (children == null || children === '') return jsxRuntime.jsx(index$2.NotActive, {});
  const text = String(children);
  if (text.length <= edgeChars * 2) {
    return jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: text
    });
  }
  const first = text.slice(0, edgeChars);
  const last = text.slice(-edgeChars);
  return jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [jsxRuntime.jsx("span", {
      children: first
    }), jsxRuntime.jsx("span", {
      className: 'opacity-50',
      children: "\u2026"
    }), jsxRuntime.jsx("span", {
      children: last
    })]
  });
};
/**
 * Identifier component shows an ID string with optional highlighting, avatar,
 * copy button, dynamic line adjustment, and multi-line clamp.
 */
const Identifier = ({
  children,
  ellipsis = false,
  highlight = undefined,
  avatar = false,
  copyButton = false,
  linesAdjustment = true,
  maxLines = 0,
  className,
  middleEllipsis = false,
  edgeChars = 4
}) => {
  const {
    theme
  } = ThemeContext.useTheme();
  const symbolsRef = React.useRef(null);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [charWidth, setCharWidth] = React.useState(0);
  const [linesMaxWidth, setLinesMaxWidth] = React.useState('none');
  const [widthCounted, setWidthCounted] = React.useState(false);
  const prevWinRef = React.useRef(null);
  const [winWidth, setWinWidth] = React.useState(0);
  const {
    debouncedValue: debouncedWin,
    cancel: cancelDebounce
  } = useDebounce.default(winWidth, {
    delay: 500,
    callback: newWidth => {
      // Log window width changes for debugging (optional)
      // console.log('Window width debounced to:', newWidth)
    }
  });
  if ((ellipsis !== null && ellipsis !== void 0 ? ellipsis : false) || maxLines > 0 || middleEllipsis) linesAdjustment = false;
  index.default(symbolsRef, entry => {
    setContainerWidth(entry.contentRect.width);
  });
  const measureChar = React.useCallback(() => {
    if (symbolsRef.current == null || !linesAdjustment) return 0;
    const temp = document.createElement('span');
    const styles = getComputedStyle(symbolsRef.current);
    temp.style.position = 'absolute';
    temp.style.visibility = 'hidden';
    temp.style.fontFamily = styles.fontFamily;
    temp.style.fontSize = styles.fontSize;
    temp.style.fontWeight = styles.fontWeight;
    temp.textContent = 'A';
    document.body.appendChild(temp);
    const w = temp.getBoundingClientRect().width;
    document.body.removeChild(temp);
    return w > 0 ? w : 0;
  }, [linesAdjustment]);
  React.useEffect(() => {
    if (symbolsRef.current == null || !linesAdjustment) return;
    const measuredWidth = measureChar();
    setCharWidth(measuredWidth > 0 ? measuredWidth : 0);
  }, [measureChar]);
  const updateSize = () => {
    var _a;
    if (widthCounted) return;
    const len = (_a = children === null || children === void 0 ? void 0 : children.length) !== null && _a !== void 0 ? _a : 0;
    if (charWidth === 0 || containerWidth === 0 || len === 0) {
      setLinesMaxWidth('none');
      return;
    }
    const spacingF = 0.1625;
    const perLine = Math.floor(containerWidth / charWidth + spacingF);
    if (perLine <= len / 8 || perLine > len) {
      setLinesMaxWidth('none');
      return;
    }
    const lines = Math.max(Math.ceil(len / perLine), 1);
    const adjust = 0.7;
    const width = charWidth * (len / lines + adjust);
    setLinesMaxWidth(`${width}px`);
    setWidthCounted(true);
  };
  React.useEffect(() => {
    if (!linesAdjustment) return;
    if (debouncedWin !== prevWinRef.current || !widthCounted || prevWinRef.current === null) {
      updateSize();
    }
    prevWinRef.current = debouncedWin;
  }, [charWidth, containerWidth, debouncedWin]);
  React.useEffect(() => {
    if (!linesAdjustment) return;
    let prev = window.innerWidth;
    const handler = () => {
      const cur = window.innerWidth;
      if (cur !== prev) {
        setWinWidth(cur);
        setWidthCounted(false);
        prev = cur;
      }
    };
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
      // Cancel pending debounce on unmount
      cancelDebounce();
    };
  }, [cancelDebounce]);
  const rootClass = identifier({
    theme,
    ellipsis,
    highlight
  }) + (className != null && className !== '' ? ` ${className}` : '');
  const clampStyles = maxLines > 0 ? {
    display: '-webkit-box',
    WebkitLineClamp: maxLines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  } : {};
  const symbolContainerClass = ellipsis === true ? 'flex-1 overflow-hidden whitespace-nowrap text-ellipsis' : 'flex-1 leading-[1rem]';
  return jsxRuntime.jsxs("div", {
    className: rootClass,
    children: [(avatar !== null && avatar !== void 0 ? avatar : false) && children != null && children !== '' && jsxRuntime.jsx(index$1.Avatar, {
      username: children,
      className: 'w-6 h-6 mr-2 flex-shrink-0'
    }), jsxRuntime.jsx("div", {
      ref: symbolsRef,
      className: symbolContainerClass,
      style: Object.assign(Object.assign({}, widthCounted && maxLines === 0 ? {
        maxWidth: linesMaxWidth
      } : {}), clampStyles),
      children: children != null && children !== '' && middleEllipsis ? jsxRuntime.jsx(MiddleEllipsisText, {
        edgeChars: edgeChars,
        children: children
      }) : children != null && children !== '' && highlight != null ? jsxRuntime.jsx(HighlightedID, {
        mode: highlight,
        children: children
      }) : children !== null && children !== void 0 ? children : jsxRuntime.jsx(index$2.NotActive, {})
    }), (copyButton !== null && copyButton !== void 0 ? copyButton : false) && children != null && children !== '' && jsxRuntime.jsx(index$3.CopyButton, {
      className: 'ml-3',
      text: children
    })]
  });
};

exports.default = Identifier;
//# sourceMappingURL=index.cjs.js.map
