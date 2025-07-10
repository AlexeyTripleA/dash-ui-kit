import React from 'react';
export interface TextProps {
    /** Render as this element or component (e.g. 'h1' or Link). */
    as?: React.ElementType;
    /** Additional CSS classes. */
    className?: string;
    /** Text children. */
    children?: React.ReactNode;
    /** Text size */
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /** Text weight */
    weight?: 'normal' | 'bold';
    /** Text color */
    color?: 'default' | 'blue' | 'red';
    /** Italic text */
    italic?: boolean;
    /** Underline text */
    underline?: boolean;
    /** Line through text */
    lineThrough?: boolean;
    /** Text transform */
    transform?: 'none' | 'uppercase' | 'capitalize';
    /** Opacity */
    opacity?: number;
    /** Use monospace font */
    monospace?: boolean;
    /** Dim text */
    dim?: boolean;
    /** Reset default styling */
    reset?: boolean;
}
/**
 * A versatile text component with size, color, weight, decoration,
 * transform, opacity, monospace, dimming, and theme-aware defaults.
 */
export declare const Text: React.FC<TextProps>;
export default Text;
