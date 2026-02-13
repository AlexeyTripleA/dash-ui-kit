import React from 'react';
import { ViewProps } from 'react-native';
export interface AvatarProps extends ViewProps {
    /** Username to generate identicon for */
    username: string;
    /** Additional CSS class name (for NativeWind) */
    className?: string;
    /** Saturation level for the identicon (0-100) */
    saturation?: number;
    /** Lightness level for the identicon (0-100) */
    lightness?: number;
    /** Width of the avatar (default: 40) */
    width?: number;
    /** Height of the avatar (default: 40) */
    height?: number;
}
/**
 * Avatar component that creates unique identicons from usernames
 * with customizable appearance.
 *
 * This is the React Native version that uses SvgXml instead of img tag.
 */
export declare const Avatar: React.FC<AvatarProps>;
export default Avatar;
