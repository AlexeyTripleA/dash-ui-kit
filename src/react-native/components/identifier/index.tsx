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
  middleEllipsis?: boolean
  edgeChars?: number
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
  theme?: 'light' | 'dark'
  textStyle?: TextStyle
}>> = ({ 
  children, 
  mode,
  theme = 'light',
  textStyle
}) => {
  if (children == null || children === '') return <NotActive theme={theme} />
  const text: string = String(children)
  const cfg = highlightModes[mode]
  const count = 5
  const minLength = count * 2 + 1  // 11
  if (text.length < minLength) {
    const symbolStyle = [cn(symbol({ dim: cfg.middle })), textStyle].filter(Boolean)
    return <Text style={symbolStyle}>{text}</Text>
  }
  const first: string = text.slice(0, count)
  const middle: string = text.slice(count, text.length - count)
  const last: string = text.slice(-count)

  const firstStyle = [cn(symbol({ dim: !cfg.first })), textStyle].filter(Boolean)
  const middleStyle = [cn(symbol({ dim: !cfg.middle })), textStyle].filter(Boolean)
  const lastStyle = [cn(symbol({ dim: !cfg.last })), textStyle].filter(Boolean)

  return (
    <Text>
      <Text style={firstStyle}>{first}</Text>
      <Text style={middleStyle}>{middle}</Text>
      <Text style={lastStyle}>{last}</Text>
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
  textStyle?: TextStyle
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
  
  const ellipsisStyle = [cn('opacity-50'), textStyle].filter(Boolean)
  
  return (
    <Text>
      <Text style={textStyle}>{first}</Text>
      <Text style={ellipsisStyle}>&hellip;</Text>
      <Text style={textStyle}>{last}</Text>
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
  theme = 'light',
  style,
  textStyle,
  ...props
}) => {
  const [containerWidth, setContainerWidth] = useState(0)

  // Handle container layout changes
  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setContainerWidth(width)
  }, [])

  const rootClasses = `${identifier({ theme: theme as 'light' | 'dark', ellipsis, highlight })} ${className}`.trim()

  // Determine if we should use standard ellipsis with numberOfLines
  const useStandardEllipsis = ellipsis === true && !middleEllipsis && maxLines === 0
  const useMaxLines = maxLines > 0 && !middleEllipsis

  // Symbol container classes
  const symbolContainerClass = ellipsis === true
    ? 'flex-1 overflow-hidden'
    : 'flex-1'

  // Merge text styles
  const finalTextStyle = [cn('leading-4'), textStyle].filter(Boolean)

  return (
    <View 
      style={[cn(rootClasses), style].filter(Boolean)} 
      onLayout={handleLayout}
      {...props}
    >
      {avatar && children != null && children !== '' && (
        <Avatar 
          username={children} 
          className="mr-2"
          width={24}
          height={24}
        />
      )}
      
      <View style={cn(symbolContainerClass)}>
        {children != null && children !== '' && middleEllipsis ? (
          <MiddleEllipsisText edgeChars={edgeChars} theme={theme} textStyle={textStyle}>
            {children}
          </MiddleEllipsisText>
        ) : children != null && children !== '' && highlight != null ? (
          <HighlightedID mode={highlight} theme={theme} textStyle={textStyle}>
            {children}
          </HighlightedID>
        ) : children != null && children !== '' ? (
          <Text
            numberOfLines={useStandardEllipsis ? 1 : useMaxLines ? maxLines : undefined}
            ellipsizeMode={useStandardEllipsis || useMaxLines ? 'tail' : undefined}
            style={finalTextStyle}
          >
            {children}
          </Text>
        ) : (
          <NotActive theme={theme} />
        )}
      </View>
      
      {copyButton && children != null && children !== '' && (
        <CopyButton className="ml-3" text={children} />
      )}
    </View>
  )
}

export default Identifier
export { Identifier }
