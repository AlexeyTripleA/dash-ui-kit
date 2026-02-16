import React from 'react'
import { View, Pressable, ViewStyle } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { cn } from '../../utils/tw'

export interface DashLogoProps {
  color?: string
  size?: number
  width?: number
  height?: number
  className?: string
  onPress?: () => void
  containerPadding?: number
  containerSize?: number
  containerClassName?: string
  /** Custom container style (overrides Tailwind classes) */
  containerStyle?: ViewStyle
}

/**
 * Dash Logo component for React Native with customizable size and color
 * Original aspect ratio: 30:25 (1.2:1)
 * 
 * Color can be set via:
 * - color prop (default: #4C7EFF)
 * 
 * Container supports:
 * - containerPadding: padding around the logo
 * - containerSize: width/height of the container 
 * - containerClassName: Tailwind classes for the container
 * - containerStyle: Additional style object for the container
 */
export const DashLogo: React.FC<DashLogoProps> = ({
  color = '#4C7EFF',
  size,
  width,
  height,
  className = '',
  onPress,
  containerPadding,
  containerSize,
  containerClassName = '',
  containerStyle
}) => {
  const logoWidth = width || size || 30
  const logoHeight = height || (size ? (size * 25) / 30 : 25)

  const baseContainerClasses = 'flex justify-center items-center'
  const containerClasses = containerClassName 
    ? `${baseContainerClasses} ${containerClassName}` 
    : baseContainerClasses

  const inlineContainerStyle: ViewStyle = {
    padding: containerPadding,
    width: containerSize,
    height: containerSize,
    ...containerStyle
  }

  const combinedContainerStyle = [
    cn(containerClasses),
    inlineContainerStyle
  ].filter(Boolean)

  const logoElement = (
    <Svg
      width={logoWidth}
      height={logoHeight}
      viewBox='0 0 30 25'
      fill='none'
    >
      <Path
        d='M19.6465 0C29.2466 2.13767e-05 30.9542 5.2464 29.585 12.6006C28.6773 17.5547 26.3845 21.3391 22.5537 23.1084C20.8153 23.9084 19.1848 24.3555 15.3389 24.3555H4.44629L5.33887 19.293H14.9229C20.6921 19.3084 22.2159 16.8009 22.9697 14.6162C23.2467 13.8008 23.9084 11.2619 23.9238 9.76953C23.9699 6.84642 22.5383 5.07715 17.6768 5.07715L7.81543 5.06152L8.72363 0H19.6465Z'
        fill={color}
      />
      <Path
        d='M15.2002 9.63184C15.2002 9.63184 15.0775 10.232 14.7236 11.709C14.4621 12.8321 14.0462 14.6934 11.1846 14.6934H0C0.00327153 14.6775 0.12745 14.0734 0.476562 12.6162C0.73811 11.493 1.15435 9.63184 4.01562 9.63184H15.2002Z'
        fill={color}
      />
    </Svg>
  )

  if (onPress) {
    return (
      <Pressable style={combinedContainerStyle} onPress={onPress}>
        {logoElement}
      </Pressable>
    )
  }

  return (
    <View style={combinedContainerStyle}>
      {logoElement}
    </View>
  )
}

export default DashLogo
