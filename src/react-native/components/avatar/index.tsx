import React, { useMemo } from 'react'
import { View, ViewProps, ViewStyle } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { minidenticon } from 'minidenticons'
import { cn } from '../../utils/tw'

export interface AvatarProps extends Omit<ViewProps, 'style'> {
  /** Username to generate identicon for */
  username: string
  /** Additional CSS class name (for NativeWind) */
  className?: string
  /** Saturation level for the identicon (0-100) */
  saturation?: number
  /** Lightness level for the identicon (0-100) */
  lightness?: number
  /** Width of the avatar (default: 40) */
  width?: number
  /** Height of the avatar (default: 40) */
  height?: number
  /** Custom container style (overrides Tailwind classes) */
  style?: ViewStyle
}

/**
 * Avatar component that creates unique identicons from usernames
 * with customizable appearance.
 * 
 * This is the React Native version that uses SvgXml instead of img tag.
 */
export const Avatar: React.FC<AvatarProps> = ({
  username,
  className = '',
  saturation = 50,
  lightness = 50,
  width = 40,
  height = 40,
  style,
  ...props
}) => {
  // Generate SVG string directly (no data URI needed for SvgXml)
  const svgString = useMemo(
    () => minidenticon(username, saturation, lightness),
    [username, saturation, lightness]
  )

  const containerClasses = `relative ${className}`.trim()
  const containerStyle = [cn(containerClasses), style].filter(Boolean)

  return (
    <View style={containerStyle} {...props}>
      <SvgXml 
        xml={svgString} 
        width={width} 
        height={height}
      />
    </View>
  )
}

export default Avatar
