import React from 'react'
import { View, Text, Pressable, ViewStyle, TextStyle, PressableProps } from 'react-native'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/tw'
import { resolveColorScheme } from '../../utils/resolveColorScheme'

/**
 * Badge component props
 */
export interface BadgeProps extends Omit<PressableProps, 'style'> {
  /**
   * Content of the badge
   */
  children: React.ReactNode

  /**
   * Visual style variant
   */
  variant?: 'default' | 'flat' | 'solid' | 'bordered'

  /**
   * Color theme
   */
  color?: 'blue' | 'white' | 'gray' | 'light-gray' | 'turquoise' | 'red' | 'orange'

  /**
   * Light or dark theme
   */
  theme?: 'light' | 'dark'

  /**
   * Color override for light theme
   */
  colorLight?: 'blue' | 'white' | 'gray' | 'light-gray' | 'turquoise' | 'red' | 'orange'

  /**
   * Color override for dark theme
   */
  colorDark?: 'blue' | 'white' | 'gray' | 'light-gray' | 'turquoise' | 'red' | 'orange'

  /**
   * Size of the badge
   */
  size?: 'xxs' | 'xs' | 'sm' | 'xl'

  /**
   * Border radius variant
   */
  borderRadius?: 'xs'

  /**
   * Additional Tailwind classes for styling
   */
  className?: string

  /**
   * Custom container style (overrides Tailwind classes)
   */
  style?: ViewStyle

  /**
   * Custom text style (overrides Tailwind text classes)
   */
  textStyle?: TextStyle

  /**
   * Press handler
   */
  onPress?: () => void
}

// Base badge container styles
const badgeStyles = cva(
  'inline-flex items-center justify-center font-medium',
  {
    variants: {
      size: {
        xxs: 'px-1 py-1 text-xs rounded-full',
        xs: 'px-2 py-1 text-xs rounded-full',
        sm: 'px-[34px] py-[10px] text-xs rounded-full',
        xl: 'px-9 py-4 text-lg rounded-full',
      },
      borderRadius: {
        default: '',
        xs: 'rounded-[4px]',
      },
      // Color and variant combinations - blue
      color_variant_blue_default: {
        true: '',
      },
      color_variant_blue_flat: {
        true: 'bg-[rgba(76,126,255,0.15)]',
      },
      color_variant_blue_solid: {
        true: 'bg-[#4C7EFF]',
      },
      color_variant_blue_bordered: {
        true: 'border border-[#4C7EFF]',
      },
      // Color and variant combinations - white
      color_variant_white_default: {
        true: '',
      },
      color_variant_white_flat: {
        true: 'bg-[rgba(255,255,255,0.15)]',
      },
      color_variant_white_solid: {
        true: 'bg-white',
      },
      color_variant_white_bordered: {
        true: 'border border-white',
      },
      // Color and variant combinations - gray
      color_variant_gray_default: {
        true: '',
      },
      color_variant_gray_flat: {
        true: 'bg-[rgba(12,28,51,0.15)]',
      },
      color_variant_gray_solid: {
        true: 'bg-[#0C1C33]',
      },
      color_variant_gray_bordered: {
        true: 'border border-[#0C1C33]',
      },
      // Color and variant combinations - light-gray
      color_variant_lightgray_default: {
        true: '',
      },
      color_variant_lightgray_flat: {
        true: 'bg-[rgba(12,28,51,0.05)]',
      },
      color_variant_lightgray_solid: {
        true: 'bg-[rgba(12,28,51,0.15)]',
      },
      color_variant_lightgray_bordered: {
        true: 'border border-[#6B7280]',
      },
      // Color and variant combinations - turquoise
      color_variant_turquoise_default: {
        true: '',
      },
      color_variant_turquoise_flat: {
        true: 'bg-[rgba(96,246,210,0.15)]',
      },
      color_variant_turquoise_solid: {
        true: 'bg-[#60F6D2]',
      },
      color_variant_turquoise_bordered: {
        true: 'border border-[#60F6D2]',
      },
      // Color and variant combinations - red
      color_variant_red_default: {
        true: '',
      },
      color_variant_red_flat: {
        true: 'bg-[rgba(205,46,0,0.15)]',
      },
      color_variant_red_solid: {
        true: 'bg-[#CD2E00]',
      },
      color_variant_red_bordered: {
        true: 'border border-[#CD2E00]',
      },
      // Color and variant combinations - orange
      color_variant_orange_default: {
        true: '',
      },
      color_variant_orange_flat: {
        true: 'bg-[rgba(249,143,18,0.15)]',
      },
      color_variant_orange_solid: {
        true: 'bg-[#F98F12]',
      },
      color_variant_orange_bordered: {
        true: 'border border-[#F98F12]',
      },
    },
    defaultVariants: {
      size: 'sm',
      borderRadius: 'default',
    },
  }
)

// Text color styles
const textStyles = cva('font-medium', {
  variants: {
    size: {
      xxs: 'text-xs',
      xs: 'text-xs',
      sm: 'text-xs',
      xl: 'text-lg',
    },
    // Text colors for each color and variant combination
    color_variant_blue_default: {
      true: 'text-[#4C7EFF]',
    },
    color_variant_blue_flat: {
      true: 'text-[#4C7EFF]',
    },
    color_variant_blue_solid: {
      true: 'text-white',
    },
    color_variant_blue_bordered: {
      true: 'text-[#4C7EFF]',
    },
    color_variant_white_default: {
      true: 'text-white',
    },
    color_variant_white_flat: {
      true: 'text-white',
    },
    color_variant_white_solid: {
      true: 'text-[#0C1C33]',
    },
    color_variant_white_bordered: {
      true: 'text-white',
    },
    color_variant_gray_default: {
      true: 'text-[#0C1C33]',
    },
    color_variant_gray_flat: {
      true: 'text-[#0C1C33]',
    },
    color_variant_gray_solid: {
      true: 'text-white',
    },
    color_variant_gray_bordered: {
      true: 'text-[#0C1C33]',
    },
    color_variant_lightgray_default: {
      true: 'text-[#6B7280]',
    },
    color_variant_lightgray_flat: {
      true: 'text-[#0C1C33]',
    },
    color_variant_lightgray_solid: {
      true: 'text-[#0C1C33]',
    },
    color_variant_lightgray_bordered: {
      true: 'text-[#6B7280]',
    },
    color_variant_turquoise_default: {
      true: 'text-[#60F6D2]',
    },
    color_variant_turquoise_flat: {
      true: 'text-[#60F6D2]',
    },
    color_variant_turquoise_solid: {
      true: 'text-[#0C1C33]',
    },
    color_variant_turquoise_bordered: {
      true: 'text-[#60F6D2]',
    },
    color_variant_red_default: {
      true: 'text-[#CD2E00]',
    },
    color_variant_red_flat: {
      true: 'text-[#CD2E00]',
    },
    color_variant_red_solid: {
      true: 'text-white',
    },
    color_variant_red_bordered: {
      true: 'text-[#CD2E00]',
    },
    color_variant_orange_default: {
      true: 'text-[#F98F12]',
    },
    color_variant_orange_flat: {
      true: 'text-[#F98F12]',
    },
    color_variant_orange_solid: {
      true: 'text-white',
    },
    color_variant_orange_bordered: {
      true: 'text-[#F98F12]',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

// Type for CVA variant props with dynamic color_variant keys
type BadgeVariantProps = VariantProps<typeof badgeStyles> & {
  [key: string]: boolean | string | undefined
}

type TextVariantProps = VariantProps<typeof textStyles> & {
  [key: string]: boolean | string | undefined
}

// Mapping object for color key normalization (handles dashes)
const COLOR_KEY_MAP: Record<string, string> = {
  'blue': 'blue',
  'white': 'white',
  'gray': 'gray',
  'light-gray': 'lightgray',
  'turquoise': 'turquoise',
  'red': 'red',
  'orange': 'orange',
}

/**
 * React Native Badge component with multiple variants, colors, sizes, and border radius options.
 * Uses CVA for variant management and twrnc for Tailwind styling.
 * 
 * Supports 28 style combinations (7 colors × 4 variants) with 4 sizes and optional custom border radius.
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  theme = 'light',
  variant = 'default',
  color,
  colorLight,
  colorDark,
  size = 'sm',
  borderRadius,
  className = '',
  style,
  textStyle,
  onPress,
  ...props
}) => {
  const effectiveColor = resolveColorScheme(theme, color, colorLight, colorDark) ?? 'blue'

  // Generate the color_variant key for CVA using explicit mapping
  const normalizedColor = COLOR_KEY_MAP[effectiveColor] || effectiveColor
  const colorVariantKey = `color_variant_${normalizedColor}_${variant}`

  // Build the badge container classes with proper typing
  const badgeVariantProps: BadgeVariantProps = {
    size,
    borderRadius: borderRadius || 'default',
    [colorVariantKey]: true,
  }
  const badgeClasses = badgeStyles(badgeVariantProps)

  // Build the text classes with proper typing
  const textVariantProps: TextVariantProps = {
    size,
    [colorVariantKey]: true,
  }
  const textClasses = textStyles(textVariantProps)

  // Convert Tailwind classes to React Native style objects
  const combinedClasses = className ? `${badgeClasses} ${className}` : badgeClasses
  const badgeStyleArray: ViewStyle[] = [cn(combinedClasses), style].filter(Boolean) as ViewStyle[]

  const textStyleMerged = [cn(textClasses), textStyle].filter(Boolean) as TextStyle[]

  // Render content (string children wrapped in Text, custom content as-is)
  const content = typeof children === 'string' ? <Text style={textStyleMerged}>{children}</Text> : children

  // If onPress is provided, wrap in Pressable
  if (onPress) {
    return (
      <Pressable
        style={({ pressed }) => (pressed ? [...badgeStyleArray, { opacity: 0.7 }] : badgeStyleArray)}
        onPress={onPress}
        {...props}
      >
        {content}
      </Pressable>
    )
  }

  // Otherwise, just render as View
  return <View style={badgeStyleArray}>{content}</View>
}

export default Badge
