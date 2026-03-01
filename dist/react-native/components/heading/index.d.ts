import React from 'react';
import { TextProps as RNTextProps, TextStyle } from 'react-native';
import { VariantProps } from 'class-variance-authority';
declare const headingStyles: (props?: ({
    level?: 1 | 2 | 3 | 4 | 5 | 6 | null | undefined;
    weight?: "medium" | "semibold" | "bold" | "normal" | "extrabold" | null | undefined;
    color?: "default" | "blue" | "red" | "gray" | "black" | "green" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
type HeadingVariants = VariantProps<typeof headingStyles>;
export interface HeadingProps extends Omit<RNTextProps, 'style'>, HeadingVariants {
    /** Semantic level of the heading (1-6) */
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    /** Additional Tailwind classes for styling */
    className?: string;
    /** Custom text style (overrides Tailwind classes) */
    style?: TextStyle;
    /** Text children */
    children: React.ReactNode;
}
/**
 * React Native Heading component with semantic levels and customizable styling.
 * Uses twrnc for Tailwind-like styling converted to React Native styles.
 */
export declare const Heading: React.FC<HeadingProps>;
export default Heading;
