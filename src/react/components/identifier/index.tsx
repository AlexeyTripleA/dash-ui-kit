import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  PropsWithChildren
} from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import useResizeObserver from '@react-hook/resize-observer'
import useDebounce from '../../hooks/useDebounce'
import { NotActive } from '../notActive'
import { CopyButton } from '../copyButton'
import { useTheme } from '../../contexts/ThemeContext'
import { Avatar } from '../avatar'

/** CVA for the root container, now with light/dark theme */
const identifier = cva(
  'flex items-center font-dash-grotesque break-all',
  {
    variants: {
      theme: {
        light: 'text-gray-900',
        dark: 'text-white'
      },
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl'
      },
      weight: {
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium'
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
      size: 'sm',
      weight: 'normal',
      ellipsis: false,
      highlight: 'default'
    }
  }
)
type IdentifierVariants = VariantProps<typeof identifier>

/** CVA for each symbol span: inherits root color or dims */
const symbol = cva('flex-1', {
  variants: {
    dim: {
      false: 'text-inherit',
      true: 'text-gray-500'
    }
  },
  defaultVariants: {
    dim: false
  }
})

/** Highlight‐modes config */
const highlightModes = {
  default: { first: true, middle: false, last: true },
  dim: { first: false, middle: false, last: false },
  highlight: { first: true, middle: true, last: true },
  first: { first: true, middle: false, last: false },
  last: { first: false, middle: false, last: true },
  both: { first: true, middle: false, last: true }
} as const
type HighlightMode = keyof typeof highlightModes

export interface IdentifierProps extends IdentifierVariants {
  children?: string
  avatar?: boolean
  copyButton?: boolean
  linesAdjustment?: boolean
  maxLines?: number
  className?: string
  /** Cut the middle of the ID: `true` keeps `edgeChars` per side, `'auto'` fits the ID to the container width */
  middleEllipsis?: boolean | 'auto'
  /** Characters kept on each side with `middleEllipsis={true}` */
  edgeChars?: number
  /** Characters highlighted on each side in `highlight` modes */
  highlightChars?: number
}

const HighlightedID: React.FC<PropsWithChildren<{ mode: HighlightMode, count?: number }>> = ({ children, mode, count = 5 }) => {
  if (children == null || children === '') return <NotActive />
  const text: string = String(children)
  const edge = Math.min(count, Math.floor(text.length / 2))
  const first: string = text.slice(0, edge)
  const middle: string = text.slice(edge, text.length - edge)
  const last: string = text.slice(text.length - edge)
  const cfg = highlightModes[mode]

  return (
    <>
      <span className={symbol({ dim: !cfg.first })}>{first}</span>
      <span className={symbol({ dim: !cfg.middle })}>{middle}</span>
      <span className={symbol({ dim: !cfg.last })}>{last}</span>
    </>
  )
}

const MiddleEllipsisText: React.FC<{ children: string; edgeChars: number }> = ({ children, edgeChars }) => {
  if (children == null || children === '') return <NotActive />
  const text: string = String(children)
  
  if (text.length <= edgeChars * 2) {
    return <>{text}</>
  }
  
  const first: string = text.slice(0, edgeChars)
  const last: string = text.slice(-edgeChars)
  
  return (
    <>
      <span>{first}</span>
      <span className={'opacity-50'}>&hellip;</span>
      <span>{last}</span>
    </>
  )
}

/** Middle-ellipsis ID with bright edges and a dim middle part */
const HighlightedMiddleEllipsis: React.FC<{
  children: string
  edgeChars: number
  highlightChars: number
  mode: HighlightMode
}> = ({ children, edgeChars, highlightChars, mode }) => {
  const text: string = String(children)
  if (text.length <= edgeChars * 2) {
    return <HighlightedID mode={mode} count={highlightChars}>{text}</HighlightedID>
  }

  const bright = Math.min(highlightChars, edgeChars)
  const cfg = highlightModes[mode]

  return (
    <>
      <span className={symbol({ dim: !cfg.first })}>{text.slice(0, bright)}</span>
      <span className={symbol({ dim: !cfg.middle })}>{text.slice(bright, edgeChars)}</span>
      <span className={symbol({ dim: true })}>&hellip;</span>
      <span className={symbol({ dim: !cfg.middle })}>{text.slice(text.length - edgeChars, text.length - bright)}</span>
      <span className={symbol({ dim: !cfg.last })}>{text.slice(text.length - bright)}</span>
    </>
  )
}

/**
 * Identifier component shows an ID string with optional highlighting, avatar,
 * copy button, dynamic line adjustment, and multi-line clamp.
 */
const Identifier: React.FC<IdentifierProps> = ({
  children,
  ellipsis = false,
  highlight = undefined,
  avatar = false,
  copyButton = false,
  linesAdjustment = true,
  maxLines = 0,
  className,
  middleEllipsis = false,
  edgeChars = 4,
  highlightChars = 5,
  size,
  weight
}) => {
  const { theme } = useTheme()
  const symbolsRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [charWidth, setCharWidth] = useState(0)
  const [linesMaxWidth, setLinesMaxWidth] = useState<'none' | string>('none')
  const [widthCounted, setWidthCounted] = useState(false)
  const [textWidth, setTextWidth] = useState(0)
  const [ellipsisWidth, setEllipsisWidth] = useState(0)
  const prevWinRef = useRef<number | null>(null)
  const [winWidth, setWinWidth] = useState(0)
  const { debouncedValue: debouncedWin, cancel: cancelDebounce } = useDebounce(winWidth, {
    delay: 500,
    callback: (newWidth) => {
      // Log window width changes for debugging (optional)
      // console.log('Window width debounced to:', newWidth)
    }
  })

  const autoEllipsis = middleEllipsis === 'auto'
  if ((ellipsis ?? false) || maxLines > 0 || middleEllipsis !== false) linesAdjustment = false

  useResizeObserver(symbolsRef, entry => {
    setContainerWidth(entry.contentRect.width)
  })

  const measureText = useCallback((text: string): number => {
    if (symbolsRef.current == null) return 0
    const temp = document.createElement('span')
    const styles = getComputedStyle(symbolsRef.current)
    temp.style.position = 'absolute'
    temp.style.visibility = 'hidden'
    temp.style.whiteSpace = 'nowrap'
    temp.style.fontFamily = styles.fontFamily
    temp.style.fontSize = styles.fontSize
    temp.style.fontWeight = styles.fontWeight
    temp.style.letterSpacing = styles.letterSpacing
    temp.textContent = text
    document.body.appendChild(temp)
    const w = temp.getBoundingClientRect().width
    document.body.removeChild(temp)
    return w > 0 ? w : 0
  }, [])

  const measureChar = useCallback((): number => {
    if (!linesAdjustment) return 0
    return measureText('A')
  }, [linesAdjustment, measureText])

  useEffect(() => {
    if (!autoEllipsis || children == null || children === '') return
    setTextWidth(measureText(children))
    setEllipsisWidth(measureText('\u2026'))
  }, [autoEllipsis, children, containerWidth, measureText])

  useEffect(() => {
    if ((symbolsRef.current == null) || !linesAdjustment) return
    const measuredWidth = measureChar()
    setCharWidth(measuredWidth > 0 ? measuredWidth : 0)
  }, [measureChar])

  const updateSize = (): void => {
    if (widthCounted) return
    const len = children?.length ?? 0
    if (charWidth === 0 || containerWidth === 0 || len === 0) {
      setLinesMaxWidth('none')
      return
    }
    const spacingF = 0.1625
    const perLine = Math.floor(containerWidth / charWidth + spacingF)
    if (perLine <= len / 8 || perLine > len) {
      setLinesMaxWidth('none')
      return
    }
    const lines = Math.max(Math.ceil(len / perLine), 1)
    const adjust = 0.7
    const width = charWidth * (len / lines + adjust)
    setLinesMaxWidth(`${width}px`)
    setWidthCounted(true)
  }

  useEffect(() => {
    if (!linesAdjustment) return
    if (
      debouncedWin !== prevWinRef.current ||
      !widthCounted ||
      prevWinRef.current === null
    ) {
      updateSize()
    }
    prevWinRef.current = debouncedWin
  }, [charWidth, containerWidth, debouncedWin])

  useEffect(() => {
    if (!linesAdjustment) return
    let prev = window.innerWidth
    const handler = (): void => {
      const cur = window.innerWidth
      if (cur !== prev) {
        setWinWidth(cur)
        setWidthCounted(false)
        prev = cur
      }
    }
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('resize', handler)
      // Cancel pending debounce on unmount
      cancelDebounce()
    }
  }, [cancelDebounce])

  /** Characters kept per side in auto mode, `null` when the whole ID fits */
  const getAutoEdgeChars = (): number | null => {
    const len = children?.length ?? 0
    if (textWidth === 0 || containerWidth === 0 || len === 0) return null
    if (textWidth <= containerWidth) return null
    const avgChar = textWidth / len
    return Math.max(Math.floor((containerWidth - ellipsisWidth) / avgChar / 2) - 1, 1)
  }

  const renderSymbols = (text: string): React.ReactNode => {
    if (middleEllipsis === false) {
      return highlight != null ? <HighlightedID mode={highlight} count={highlightChars}>{text}</HighlightedID> : text
    }

    const edge = autoEllipsis ? getAutoEdgeChars() : edgeChars
    if (edge == null) {
      return highlight != null ? <HighlightedID mode={highlight} count={highlightChars}>{text}</HighlightedID> : text
    }

    return highlight != null
      ? <HighlightedMiddleEllipsis edgeChars={edge} highlightChars={highlightChars} mode={highlight}>{text}</HighlightedMiddleEllipsis>
      : <MiddleEllipsisText edgeChars={edge}>{text}</MiddleEllipsisText>
  }

  const rootClass =
    identifier({ theme, size, weight, ellipsis, highlight }) +
    (autoEllipsis ? ' w-full min-w-0' : '') +
    (className != null && className !== '' ? ` ${className}` : '')

  const clampStyles: React.CSSProperties = maxLines > 0
    ? {
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical' as any,
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    : {}

  const symbolContainerClass = ellipsis === true
    ? 'flex-1 overflow-hidden whitespace-nowrap text-ellipsis'
    : autoEllipsis
      ? 'flex-1 min-w-0 overflow-hidden whitespace-nowrap leading-[1rem]'
      : 'flex-1 leading-[1rem]'

  const isTruncated = ellipsis === true || middleEllipsis !== false

  return (
    <div className={rootClass}>
      {(avatar ?? false) && children != null && children !== '' && (
        <Avatar 
          username={children} 
          className='w-6 h-6 mr-2 flex-shrink-0' 
        />
      )}
      <div
        ref={symbolsRef}
        className={symbolContainerClass}
        title={isTruncated && children != null && children !== '' ? children : undefined}
        style={{
          ...(widthCounted && maxLines === 0 ? { maxWidth: linesMaxWidth } : {}),
          ...clampStyles
        }}
      >
        {children != null && children !== ''
          ? renderSymbols(children)
          : (children ?? <NotActive />)}
      </div>
      {(copyButton ?? false) && children != null && children !== '' && (
        <CopyButton className='ml-3' text={children} />
      )}
    </div>
  )
}

export default Identifier 