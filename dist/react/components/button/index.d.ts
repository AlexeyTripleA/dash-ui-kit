import React from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Solid or outline style */
    variant?: 'solid' | 'outline';
    /** Color scheme for the button */
    colorScheme?: 'brand' | 'mint' | 'gray' | 'red' | 'lightBlue' | 'lightGray';
    /** Size of the button */
    size?: 'sm' | 'md' | 'xl';
}
/**
 * Button with solid or outline style, color schemes, disabled state,
 * press animation, and customizable size. Supports light/dark theme.
 */
export declare const Button: React.FC<ButtonProps>;
export default Button;
