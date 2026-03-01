import React from 'react';
import { ViewStyle } from 'react-native';
export interface DashLogoProps {
    color?: string;
    size?: number;
    width?: number;
    height?: number;
    className?: string;
    onPress?: () => void;
    containerPadding?: number;
    containerSize?: number;
    containerClassName?: string;
    /** Custom container style (overrides Tailwind classes) */
    containerStyle?: ViewStyle;
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
export declare const DashLogo: React.FC<DashLogoProps>;
export default DashLogo;
