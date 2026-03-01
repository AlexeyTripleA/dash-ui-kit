"use client";

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var classVarianceAuthority = require('class-variance-authority');
var index = require('../icons/index.cjs.js');
var index$1 = require('../timeDelta/index.cjs.js');
var ThemeContext = require('../../contexts/ThemeContext.cjs.js');

const wrapperStyles = classVarianceAuthority.cva('');
const infoContainer = classVarianceAuthority.cva('flex flex-wrap items-center whitespace-nowrap -mt-1 -mb-1');
const itemStyles = classVarianceAuthority.cva('mt-1 mb-1 mr-2 last:mr-0');
const dateTextStyles = classVarianceAuthority.cva('text-[0.813rem]', {
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
const deltaContainerStyles = classVarianceAuthority.cva('inline-block px-[10px] py-[3px] border rounded-[4px] text-[0.688rem]', {
  variants: {
    theme: {
      light: 'border-[rgba(147,170,178,0.4)] text-[var(--chakra-colors-gray-250)]',
      dark: 'border-gray-600 text-gray-400'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
/**
 * DateBlock component displays a date, optional calendar icon,
 * and relative time via TimeDelta. It can also show an optional
 * tooltip with the relative time when hovered. Supports light/dark theme.
 */
const DateBlock = ({
  timestamp,
  format = 'all',
  showTime = false,
  // showRelativeTooltip = false,
  className = ''
}) => {
  const {
    theme
  } = ThemeContext.useTheme();
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return null;
  const modes = {
    all: {
      calendarIcon: true,
      date: true,
      delta: true
    },
    deltaOnly: {
      calendarIcon: false,
      date: false,
      delta: true
    },
    dateOnly: {
      calendarIcon: false,
      date: true,
      delta: false
    }
  };
  const options = Object.assign({
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }, showTime ? {
    hour: '2-digit',
    minute: '2-digit'
  } : {});
  const formattedDate = date.toLocaleDateString('en-GB', options);
  // const tooltipContent = showRelativeTooltip
  //   ? <TimeDelta endDate={timestamp} showTimestampTooltip={false} />
  //   : null
  const content = jsxRuntime.jsxs("div", {
    className: infoContainer(),
    children: [modes[format].calendarIcon && jsxRuntime.jsx(index.CalendarIcon, {
      className: `${itemStyles()} w-[12px] h-[14px]`,
      color: theme === 'dark' ? '#9CA3AF' : '#93AAB2'
    }), modes[format].date && jsxRuntime.jsx("div", {
      className: `${itemStyles()} ${dateTextStyles({
        theme
      })}`,
      children: formattedDate
    }), modes[format].delta && jsxRuntime.jsx("div", {
      className: `${itemStyles()} ${deltaContainerStyles({
        theme
      })}`,
      children: jsxRuntime.jsx(index$1.TimeDelta, {
        endDate: date,
        showTimestampTooltip: format !== 'all'
      })
    })]
  });
  const wrapperClass = `${wrapperStyles()} ${className !== '' ? ` ${className}` : ''}`;
  return jsxRuntime.jsx("div", {
    className: wrapperClass,
    children: content
  });
  // return tooltipContent ? (
  //   <Tooltip placement="top" content={tooltipContent}>
  //     <div className={wrapperClass}>{content}</div>
  //   </Tooltip>
  // ) : (
  //   <div className={wrapperClass}>{content}</div>
  // )
};

exports.DateBlock = DateBlock;
exports.default = DateBlock;
//# sourceMappingURL=index.cjs.js.map
