import React from 'react'
import {
  View,
  Pressable,
  ActivityIndicator,
  ViewStyle,
  PressableProps,
} from 'react-native'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/tw'

/**
 * ValueCard CVA - twrnc-compatible classes.
 * dash-block-sm/md/xl expanded: px-3 py-2 rounded-[10px], px-[18px] py-3 rounded-[14px], px-[25px] py-5 rounded-[16px]
 * hover: classes omitted (RN uses Pressable opacity for press feedback)
 */
const valueCardStyles = cva(
  'flex flex-row items-center',
  {
    variants: {
      theme: {
        light: 'border-gray-200',
        dark: 'bg-gray-800/50 border-gray-400',
      },
      colorScheme: {
        default: '',
        transparent: 'bg-transparent',
        green: 'text-green-500 bg-green-200 border-green-400',
        lightBlue: 'bg-[rgba(150,167,255,0.1)] border-[rgba(76,126,255,0.2)]',
        white: 'bg-white',
        lightGray: 'bg-[#0c1c3308]',
        yellow: 'bg-dash-yellow-light border-dash-yellow',
      },
      size: {
        xs: 'px-2 py-1 rounded',
        sm: 'px-3 py-2 rounded-[10px]',
        md: 'px-[18px] py-3 rounded-[14px]',
        xl: 'px-[25px] py-5 rounded-[16px]',
      },
      clickable: {
        false: '',
        true: '',
      },
      loading: {
        false: '',
        true: 'opacity-70',
      },
      border: {
        false: 'border-0',
        true: 'border',
      },
    },
    defaultVariants: {
      theme: 'light',
      colorScheme: 'default',
      size: 'md',
      clickable: false,
      loading: false,
      border: true,
    },
  }
)

type ValueCardVariants = VariantProps<typeof valueCardStyles>

export interface ValueCardProps
  extends Omit<PressableProps, 'style'>,
    Omit<ValueCardVariants, 'theme'> {
  /** Theme - light or dark. Default: 'light' */
  theme?: 'light' | 'dark'
  /** Color scheme */
  colorScheme?: 'default' | 'transparent' | 'green' | 'lightBlue' | 'white' | 'lightGray' | 'yellow'
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'xl'
  /** Whether the card is clickable (shows press feedback) */
  clickable?: boolean
  /** Show loading state with ActivityIndicator */
  loading?: boolean
  /** Show border. Default: true */
  border?: boolean
  /** Additional Tailwind classes */
  className?: string
  /** Additional style object */
  style?: ViewStyle
  /** Card content */
  children: React.ReactNode
}

/**
 * React Native ValueCard - card container with theme, color schemes, sizes,
 * clickability, loading state, and optional border.
 */
export const ValueCard: React.FC<ValueCardProps> = ({
  theme = 'light',
  colorScheme = 'default',
  size = 'md',
  clickable = false,
  loading = false,
  border = true,
  className = '',
  style,
  children,
  onPress,
  ...props
}) => {
  const isClickable = Boolean(onPress ?? clickable)
  const isDisabled = loading

  const classes = valueCardStyles({
    theme,
    colorScheme,
    size,
    clickable: isClickable,
    loading,
    border,
  })

  const combinedClasses = className ? `${classes} ${className}` : classes
  const containerStyle = [cn(combinedClasses), style].filter(Boolean) as ViewStyle[]

  const content = loading ? (
    <ActivityIndicator
      testID="value-card-loading"
      size="small"
      color={colorScheme === 'green' ? '#22c55e' : colorScheme === 'lightBlue' ? '#4C7EFF' : '#6B7280'}
    />
  ) : (
    children
  )

  if (isClickable && !isDisabled) {
    return (
      <Pressable
        style={({ pressed }) => [
          ...containerStyle,
          pressed && { opacity: 0.9 },
        ]}
        onPress={onPress}
        disabled={isDisabled}
        {...props}
      >
        {content}
      </Pressable>
    )
  }

  return (
    <View style={containerStyle} {...props}>
      {content}
    </View>
  )
}

export default ValueCard
