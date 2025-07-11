import React from 'react';
import { VariantProps } from 'class-variance-authority';
declare const textStyles: (props?: ({
    reset?: boolean | null | undefined;
    theme?: "light" | "dark" | null | undefined;
    color?: "default" | "red" | "blue" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | null | undefined;
    weight?: "bold" | "normal" | null | undefined;
    italic?: boolean | null | undefined;
    underline?: boolean | null | undefined;
    lineThrough?: boolean | null | undefined;
    transform?: "none" | "uppercase" | "capitalize" | null | undefined;
    opacity?: 0 | 100 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | null | undefined;
    monospace?: boolean | null | undefined;
    dim?: boolean | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
type TextVariants = Omit<VariantProps<typeof textStyles>, 'theme'>;
export interface TextProps extends TextVariants {
    /** Render as this element or component (e.g. 'h1' or Link). */
    as?: React.ElementType;
    /** Additional CSS classes. */
    className?: string;
    /** Text children. */
    children?: React.ReactNode;
}
/**
 * A versatile text component with size, color, weight, decoration,
 * transform, opacity, monospace, dimming, and theme-aware defaults.
 */
export declare const Text: React.FC<TextProps>;
export default Text;
