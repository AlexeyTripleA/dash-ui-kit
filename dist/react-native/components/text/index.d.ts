import React from 'react';
import { TextProps as RNTextProps, TextStyle } from 'react-native';
import { VariantProps } from 'class-variance-authority';
declare const textStyles: (props?: ({
    variant?: "body" | "caption" | "label" | null | undefined;
    weight?: "regular" | "medium" | "semibold" | "bold" | null | undefined;
    color?: "default" | "blue" | "red" | "gray" | null | undefined;
    italic?: boolean | null | undefined;
    underline?: boolean | null | undefined;
    lineThrough?: boolean | null | undefined;
    transform?: "none" | "uppercase" | "capitalize" | null | undefined;
    opacity?: 100 | 80 | 60 | 40 | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
type TextVariants = VariantProps<typeof textStyles>;
export interface TextProps extends Omit<RNTextProps, 'style'>, TextVariants {
    /** Additional Tailwind classes for styling */
    className?: string;
    /** Additional style object (merged with className styles) */
    style?: TextStyle;
    /** Text children */
    children?: React.ReactNode;
}
/**
 * React Native Text component with variants, weights, and styling options.
 * Uses twrnc for Tailwind-like styling converted to React Native styles.
 */
export declare const Text: React.FC<TextProps>;
export default Text;
