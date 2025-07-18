import React from 'react';
export interface ImageGeneratorProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
    /** Username to generate identicon for */
    username: string;
    /** Additional CSS class name */
    className?: string;
    /** Saturation level for the identicon (0-100) */
    saturation?: number;
    /** Lightness level for the identicon (0-100) */
    lightness?: number;
}
/**
 * ImageGenerator component that creates unique identicons from usernames
 * with customizable appearance.
 */
export declare const ImageGenerator: React.FC<ImageGeneratorProps>;
export default ImageGenerator;
