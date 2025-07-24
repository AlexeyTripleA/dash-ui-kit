import React from 'react';
export interface AvatarProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
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
 * Avatar component that creates unique identicons from usernames
 * with customizable appearance.
 */
export declare const Avatar: React.FC<AvatarProps>;
export default Avatar;
