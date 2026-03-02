import React from 'react';
import { PressableProps, ViewStyle, TextStyle } from 'react-native';
import { VariantProps } from 'class-variance-authority';
declare const buttonStyles: (props?: ({
    variant?: "solid" | "outline" | "ghost" | null | undefined;
    colorScheme?: "red" | "gray" | "brand" | "mint" | "lightBlue" | "lightGray" | "white" | "halfWhite" | "halfBlue" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | null | undefined;
    rounded?: "default" | "full" | null | undefined;
    disabled?: boolean | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
type ButtonVariants = Omit<VariantProps<typeof buttonStyles>, 'disabled'>;
export interface ButtonProps extends Omit<PressableProps, 'style'>, ButtonVariants {
    /** Light or dark theme */
    theme?: 'light' | 'dark';
    /** Solid, outline, or ghost style */
    variant?: 'solid' | 'outline' | 'ghost';
    /** Color scheme for the button */
    colorScheme?: 'brand' | 'mint' | 'gray' | 'red' | 'lightBlue' | 'lightGray' | 'white' | 'halfWhite' | 'halfBlue';
    /** Color scheme override for light theme */
    colorSchemeLight?: 'brand' | 'mint' | 'gray' | 'red' | 'lightBlue' | 'lightGray' | 'white' | 'halfWhite' | 'halfBlue';
    /** Color scheme override for dark theme */
    colorSchemeDark?: 'brand' | 'mint' | 'gray' | 'red' | 'lightBlue' | 'lightGray' | 'white' | 'halfWhite' | 'halfBlue';
    /** Size of the button */
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /** Border radius style */
    rounded?: 'default' | 'full';
    /** Whether the button is disabled */
    disabled?: boolean;
    /** Whether to show loading indicator */
    loading?: boolean;
    /** Additional Tailwind classes for styling */
    className?: string;
    /** Custom container style (overrides Tailwind classes) */
    style?: ViewStyle;
    /** Custom text style (overrides Tailwind text classes) */
    textStyle?: TextStyle;
    /** Button content */
    children: React.ReactNode;
}
/**
 * React Native Button component with variants, color schemes, sizes, and loading state.
 * Uses Pressable for touch interactions and twrnc for Tailwind styling.
 */
export declare const Button: React.FC<ButtonProps>;
export default Button;
