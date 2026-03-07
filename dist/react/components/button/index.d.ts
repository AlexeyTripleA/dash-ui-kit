import React from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Solid or outline style */
    variant?: 'solid' | 'outline';
    /** Color scheme for the button */
    colorScheme?: 'brand' | 'mint' | 'gray' | 'red' | 'lightBlue' | 'lightGray' | 'white' | 'halfWhite' | 'halfBlue';
    /** Color scheme override for light theme */
    colorSchemeLight?: 'brand' | 'mint' | 'gray' | 'red' | 'lightBlue' | 'lightGray' | 'white' | 'halfWhite' | 'halfBlue';
    /** Color scheme override for dark theme */
    colorSchemeDark?: 'brand' | 'mint' | 'gray' | 'red' | 'lightBlue' | 'lightGray' | 'white' | 'halfWhite' | 'halfBlue';
    /** Size of the button */
    size?: 'sm' | 'md' | 'xl';
    /** Border radius style */
    rounded?: 'default' | 'full';
}
/**
 * Button with solid or outline style, color schemes, disabled state,
 * press animation, and customizable size. Supports light/dark theme.
 */
export declare const Button: React.FC<ButtonProps>;
export default Button;
