"use client"

import React, { useMemo } from 'react'
import { minidenticon } from 'minidenticons'

export interface ImageGeneratorProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
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
 * ImageGenerator component that creates unique identicons from usernames
 * with customizable appearance.
 */
export const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  username,
  className = '',
  saturation,
  lightness,
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

export default ImageGenerator 