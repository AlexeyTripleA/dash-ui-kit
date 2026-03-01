import React, { useMemo } from 'react'
import { View, ViewProps } from 'react-native'
import { minidenticon } from 'minidenticons'

export interface AvatarProps extends ViewProps {
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
}

/**
 * Avatar component that creates unique identicons from usernames
 * with customizable appearance.
 * 
 * This is the Web/Storybook version that uses inline SVG.
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
  // Generate SVG string directly
  const svgString = useMemo(
    () => minidenticon(username, saturation, lightness),
    [username, saturation, lightness]
  )

  const containerClasses = `relative ${className}`.trim()

  return (
    <View className={containerClasses} style={style} {...props}>
      <div 
        dangerouslySetInnerHTML={{ __html: svgString }}
        style={{ 
          width: typeof width === 'number' ? `${width}px` : width, 
          height: typeof height === 'number' ? `${height}px` : height,
          display: 'inline-block'
        }}
      />
    </View>
  )
}

export default Avatar
