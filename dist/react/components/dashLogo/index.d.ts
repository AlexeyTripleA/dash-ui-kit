import React from 'react';
export interface DashLogoProps {
    color?: string;
    size?: number;
    width?: number;
    height?: number;
    className?: string;
    onClick?: () => void;
    containerPadding?: string | number;
    containerSize?: string | number;
    containerClassName?: string;
}
/**
 * Dash Logo component with customizable size and color
 * Original aspect ratio: 30:25 (1.2:1)
 *
 * SVG is wrapped in a container that centers the logo and supports:
 * - containerPadding: padding around the logo
 * - containerSize: width/height of the container
 * - containerClassName: CSS class for the container
 * - minWidth/minHeight: min-content (adapts to logo size)
 */
export declare const DashLogo: React.FC<DashLogoProps>;
export default DashLogo;
