import React from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Solid or outline style */
    variant?: 'solid' | 'outline';
    /** Brand or mint color scheme */
    colorScheme?: 'brand' | 'mint' | 'gray' | 'red';
    /** Size of the button */
    size?: 'sm' | 'md';
}
/**
 * Button with solid or outline style, color schemes, disabled state,
 * press animation, and customizable size.
 */
export declare const Button: React.FC<ButtonProps>;
export default Button;
