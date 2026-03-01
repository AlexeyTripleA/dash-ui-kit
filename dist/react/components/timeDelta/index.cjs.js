"use client";

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var classVarianceAuthority = require('class-variance-authority');
var index = require('../notActive/index.cjs.js');
var datetime = require('../../shared/utils/datetime.cjs.js');
var ThemeContext = require('../../contexts/ThemeContext.cjs.js');

const wrapperStyles = classVarianceAuthority.cva('inline', {
  variants: {
    theme: {
      light: 'text-gray-900',
      dark: 'text-gray-100'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
/**
 * TimeDelta component renews a human-readable delta string periodically,
 * and optionally wraps it in a tooltip showing the exact date/time.
 * Supports light/dark theme.
 */
const TimeDelta = ({
  startDate,
  endDate,
  // showTimestampTooltip = true,
  // tooltipDate,
  format = 'default'
}) => {
  const {
    theme
  } = ThemeContext.useTheme();
  const [timeDelta, setTimeDelta] = React.useState(null);
  // const tooltipDateObj = new Date(tooltipDate ?? endDate)
  React.useEffect(() => {
    if (endDate == null) {
      setTimeDelta(null);
      return;
    }
    let timeoutId;
    const updateDelta = () => {
      const start = startDate != null ? new Date(startDate) : new Date();
      const end = new Date(endDate);
      setTimeDelta(datetime.getTimeDelta(start, end, format));
      const now = new Date();
      const diffMs = Math.abs(end.getTime() - now.getTime());
      if (diffMs > 60000) {
        const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
        timeoutId = setTimeout(updateDelta, msToNextMinute);
      } else {
        timeoutId = setTimeout(updateDelta, 1000);
      }
    };
    updateDelta();
    return () => clearTimeout(timeoutId);
  }, [startDate, endDate, format]);
  if (timeDelta == null || timeDelta === '') {
    return jsxRuntime.jsx(index.NotActive, {});
  }
  // const showTooltip = showTimestampTooltip && format !== 'detailed' && !isNaN(tooltipDateObj.getTime())
  const content = jsxRuntime.jsx("span", {
    className: wrapperStyles({
      theme
    }),
    children: timeDelta
  });
  // if (showTooltip) {
  //   return (
  //     <Tooltip
  //       placement="top"
  //       content={
  //         <span className={tooltipContentStyles()}>
  //           {tooltipDateObj.toLocaleDateString()}{' '}{tooltipDateObj.toLocaleTimeString()}
  //         </span>
  //       }
  //     >
  //       {content}
  //     </Tooltip>
  //   )
  // }
  return content;
};

exports.TimeDelta = TimeDelta;
exports.default = TimeDelta;
//# sourceMappingURL=index.cjs.js.map
