import React, {
  useState,
  useCallback,
  PropsWithChildren
} from 'react'
import { View, Text, ViewProps, LayoutChangeEvent, ViewStyle, TextStyle } from 'react-native'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/tw'
import { NotActive } from '../notActive'
import { CopyButton } from '../copyButton'
import { Avatar } from '../avatar'

/** CVA for the root container with light/dark theme */
const identifier = cva(
  'flex flex-row items-center font-dash-grotesque text-sm font-normal',
  {
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
  }
)
type IdentifierVariants = VariantProps<typeof identifier>

/** CVA for ID text: theme color, size and weight */
const identifierText = cva('', {
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
    }
  },
  defaultVariants: {
    theme: 'light',
    size: 'sm',
    weight: 'normal'
  }
})

/** Off-screen box that lets text take its natural single-line width */
const MEASURE_STYLE: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: 10000,
  opacity: 0,
  alignItems: 'flex-start'
}

/** Lets an auto-fitted ID shrink to its parent width */
const AUTO_ROOT_STYLE: ViewStyle = {
  width: '100%',
  flexShrink: 1,
  minWidth: 0
}

/** CVA for each symbol text: inherits root color or dims */
const symbol = cva('flex-1', {
  variants: {
    dim: {
      false: '',
      true: 'opacity-50'
    }
  },
  defaultVariants: {
    dim: false
  }
})

/** Highlight modes configuration */
const highlightModes = {
  default: { first: true, middle: false, last: true },
  dim: { first: false, middle: false, last: false },
  highlight: { first: true, middle: true, last: true },
  first: { first: true, middle: false, last: false },
  last: { first: false, middle: false, last: true },
  both: { first: true, middle: false, last: true }
} as const
type HighlightMode = keyof typeof highlightModes

export interface IdentifierProps extends IdentifierVariants, Omit<ViewProps, 'style'> {
  children?: string
  avatar?: boolean
  copyButton?: boolean
  maxLines?: number
  className?: string
  /** Cut the middle of the ID: `true` keeps `edgeChars` per side, `'auto'` fits the ID to the container width */
  middleEllipsis?: boolean | 'auto'
  /** Characters kept on each side with `middleEllipsis={true}` */
  edgeChars?: number
  /** Characters highlighted on each side in `highlight` modes */
  highlightChars?: number
  /** Text size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Text weight */
  weight?: 'light' | 'normal' | 'medium'
  /** Theme to use */
  theme?: 'light' | 'dark'
  /** Custom container style (overrides Tailwind classes) */
  style?: ViewStyle
  /** Custom text style (overrides Tailwind text classes) */
  textStyle?: TextStyle
}

/**
 * HighlightedID subcomponent
 * Renders text with highlighting based on mode
 */
const HighlightedID: React.FC<PropsWithChildren<{
  mode: HighlightMode
  count?: number
  theme?: 'light' | 'dark'
  textStyle?: TextStyle | TextStyle[]
}>> = ({
  children,
  mode,
  count = 5,
  theme = 'light',
  textStyle
}) => {
  if (children == null || children === '') return <NotActive theme={theme} />
  const text: string = String(children)
  const cfg = highlightModes[mode]
  const edge = Math.min(count, Math.floor(text.length / 2))

  return (
    <Text style={textStyle}>
      <Text style={cn(symbol({ dim: !cfg.first }))}>{text.slice(0, edge)}</Text>
      <Text style={cn(symbol({ dim: !cfg.middle }))}>{text.slice(edge, text.length - edge)}</Text>
      <Text style={cn(symbol({ dim: !cfg.last }))}>{text.slice(text.length - edge)}</Text>
    </Text>
  )
}

/**
 * HighlightedMiddleEllipsis subcomponent
 * Renders a middle-ellipsis ID with bright edges and a dim middle part
 */
const HighlightedMiddleEllipsis: React.FC<{
  children: string
  edgeChars: number
  highlightChars: number
  mode: HighlightMode
  textStyle?: TextStyle | TextStyle[]
}> = ({ children, edgeChars, highlightChars, mode, textStyle }) => {
  const text: string = String(children)
  if (text.length <= edgeChars * 2) {
    return <HighlightedID mode={mode} count={highlightChars} textStyle={textStyle}>{text}</HighlightedID>
  }

  const bright = Math.min(highlightChars, edgeChars)
  const cfg = highlightModes[mode]

  return (
    <Text style={textStyle} numberOfLines={1}>
      <Text style={cn(symbol({ dim: !cfg.first }))}>{text.slice(0, bright)}</Text>
      <Text style={cn(symbol({ dim: !cfg.middle }))}>{text.slice(bright, edgeChars)}</Text>
      <Text style={cn(symbol({ dim: true }))}>&hellip;</Text>
      <Text style={cn(symbol({ dim: !cfg.middle }))}>{text.slice(text.length - edgeChars, text.length - bright)}</Text>
      <Text style={cn(symbol({ dim: !cfg.last }))}>{text.slice(text.length - bright)}</Text>
    </Text>
  )
}

/**
 * MiddleEllipsisText subcomponent
 * Renders text with ellipsis in the middle
 */
const MiddleEllipsisText: React.FC<{ 
  children: string
  edgeChars: number
  theme?: 'light' | 'dark'
  textStyle?: TextStyle | TextStyle[]
}> = ({ 
  children, 
  edgeChars,
  theme = 'light',
  textStyle
}) => {
  if (children == null || children === '') return <NotActive theme={theme} />
  const text: string = String(children)
  
  if (text.length <= edgeChars * 2) {
    const style = textStyle ? [textStyle] : undefined
    return <Text style={style}>{text}</Text>
  }
  
  const first: string = text.slice(0, edgeChars)
  const last: string = text.slice(-edgeChars)
  
  return (
    <Text style={textStyle} numberOfLines={1}>
      <Text>{first}</Text>
      <Text style={cn('opacity-50')}>&hellip;</Text>
      <Text>{last}</Text>
    </Text>
  )
}

/**
 * Identifier component for React Native
 * Shows an ID string with optional highlighting, avatar, copy button, and ellipsis modes.
 * 
 * Features:
 * - Highlight modes: default, dim, highlight, first, last, both
 * - Ellipsis modes: standard (tail), middle, maxLines
 * - Avatar integration
 * - Copy button integration
 * - Theme support (light/dark)
 * 
 * @example
 * ```tsx
 * <Identifier highlight="both">0x1234567890abcdef</Identifier>
 * <Identifier avatar copyButton>alice@example.com</Identifier>
 * <Identifier middleEllipsis edgeChars={6}>very-long-identifier</Identifier>
 * <Identifier middleEllipsis="auto" highlight="both">very-long-identifier</Identifier>
 * <Identifier maxLines={2}>Multi-line\nidentifier\ntext</Identifier>
 * ```
 */
const Identifier: React.FC<IdentifierProps> = ({
  children,
  ellipsis = false,
  highlight = undefined,
  avatar = false,
  copyButton = false,
  maxLines = 0,
  className = '',
  middleEllipsis = false,
  edgeChars = 4,
  highlightChars = 5,
  size,
  weight,
  theme = 'light',
  style,
  textStyle,
  ...props
}) => {
  const [containerWidth, setContainerWidth] = useState(0)
  const [textWidth, setTextWidth] = useState(0)
  const [ellipsisWidth, setEllipsisWidth] = useState(0)
  const autoEllipsis = middleEllipsis === 'auto'
  const hasText = children != null && children !== ''

  const handleContainerLayout = useCallback((event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width)
  }, [])

  const rootClasses = `${identifier({ theme: theme as 'light' | 'dark', ellipsis, highlight })} ${className}`.trim()

  // Determine if we should use standard ellipsis with numberOfLines
  const useStandardEllipsis = ellipsis === true && middleEllipsis === false && maxLines === 0
  const useMaxLines = maxLines > 0 && middleEllipsis === false

  // Symbol container classes
  const symbolContainerClass = ellipsis === true || autoEllipsis
    ? 'flex-1 overflow-hidden'
    : 'flex-1'

  // Merge text styles
  const idTextStyle = [cn(identifierText({ theme, size, weight })), textStyle].filter(Boolean) as TextStyle[]
  const finalTextStyle = [cn('leading-4'), ...idTextStyle]

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
      if (highlight != null) {
        return <HighlightedID mode={highlight} count={highlightChars} theme={theme} textStyle={idTextStyle}>{text}</HighlightedID>
      }
      return (
        <Text
          numberOfLines={useStandardEllipsis ? 1 : useMaxLines ? maxLines : undefined}
          ellipsizeMode={useStandardEllipsis || useMaxLines ? 'tail' : undefined}
          style={finalTextStyle}
        >
          {text}
        </Text>
      )
    }

    const edge = autoEllipsis ? getAutoEdgeChars() : edgeChars
    if (edge == null) {
      return highlight != null
        ? <HighlightedID mode={highlight} count={highlightChars} theme={theme} textStyle={idTextStyle}>{text}</HighlightedID>
        : <Text style={idTextStyle} numberOfLines={1}>{text}</Text>
    }

    return highlight != null
      ? <HighlightedMiddleEllipsis edgeChars={edge} highlightChars={highlightChars} mode={highlight} textStyle={idTextStyle}>{text}</HighlightedMiddleEllipsis>
      : <MiddleEllipsisText edgeChars={edge} theme={theme} textStyle={idTextStyle}>{text}</MiddleEllipsisText>
  }

  const isTruncated = ellipsis === true || middleEllipsis !== false

  return (
    <View 
      style={[cn(rootClasses), autoEllipsis ? AUTO_ROOT_STYLE : undefined, style].filter(Boolean)} 
      {...props}
    >
      {avatar && hasText && (
        <Avatar 
          username={children} 
          className="mr-2"
          width={24}
          height={24}
        />
      )}
      
      <View
        style={cn(symbolContainerClass)}
        onLayout={autoEllipsis ? handleContainerLayout : undefined}
        accessible={isTruncated && hasText ? true : undefined}
        accessibilityLabel={isTruncated && hasText ? children : undefined}
      >
        {hasText ? renderSymbols(children) : <NotActive theme={theme} />}
        {autoEllipsis && hasText && (
          <View
            style={MEASURE_STYLE}
            pointerEvents='none'
            accessibilityElementsHidden
            importantForAccessibility='no-hide-descendants'
          >
            <Text style={idTextStyle} onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}>{children}</Text>
            <Text style={idTextStyle} onLayout={(e) => setEllipsisWidth(e.nativeEvent.layout.width)}>&hellip;</Text>
          </View>
        )}
      </View>
      
      {copyButton && hasText && (
        <CopyButton className="ml-3" text={children} />
      )}
    </View>
  )
}

export default Identifier
export { Identifier }
