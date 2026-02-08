"use client";

import { jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { NotActive } from '../notActive/index.esm.js';
import { getTimeDelta } from '../../src/shared/utils/datetime.esm.js';
import { useTheme } from '../../contexts/ThemeContext.esm.js';

const wrapperStyles = cva('inline', {
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
  } = useTheme();
  const [timeDelta, setTimeDelta] = useState(null);
  // const tooltipDateObj = new Date(tooltipDate ?? endDate)
  useEffect(() => {
    if (endDate == null) {
      setTimeDelta(null);
      return;
    }
    let timeoutId;
    const updateDelta = () => {
      const start = startDate != null ? new Date(startDate) : new Date();
      const end = new Date(endDate);
      setTimeDelta(getTimeDelta(start, end, format));
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
    return jsx(NotActive, {});
  }
  // const showTooltip = showTimestampTooltip && format !== 'detailed' && !isNaN(tooltipDateObj.getTime())
  const content = jsx("span", {
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

export { TimeDelta, TimeDelta as default };
//# sourceMappingURL=index.esm.js.map
