"use client"

import React, { useMemo } from 'react'
import { minidenticon } from 'minidenticons'

export interface AvatarProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  /** Username to generate identicon for */
  username: string
  /** Additional CSS class name */
  className?: string
  /** Saturation level for the identicon (0-100) */
  saturation?: number
  /** Lightness level for the identicon (0-100) */
  lightness?: number
}

/**
 * Avatar component that creates unique identicons from usernames
 * with customizable appearance.
 */
export const Avatar: React.FC<AvatarProps> = ({
  username,
  className = '',
  saturation = 50,
  lightness = 50,
  ...props
}) => {
  const svgURI = useMemo(
    () => 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(username, saturation, lightness)),
    [username, saturation, lightness]
  )

  const containerClasses = `relative inline-block ${className}`.trim()
  const imageClasses = 'w-full h-full'

  return (
    <div className={containerClasses}>
      <img
        src={svgURI}
        alt={username || ''}
        className={imageClasses}
        {...props}
      />
    </div>
  )
}

export default Avatar
