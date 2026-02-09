import React from 'react';
import { TextInputProps, ViewStyle, TextStyle } from 'react-native';
import { VariantProps } from 'class-variance-authority';
declare const inputStyles: (props?: ({
    colorScheme?: "default" | "brand" | "error" | "success" | "light-gray" | null | undefined;
    size?: "sm" | "md" | "xl" | null | undefined;
    variant?: "outlined" | "filled" | null | undefined;
    disabled?: boolean | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
type InputVariants = VariantProps<typeof inputStyles>;
export interface InputProps extends Omit<TextInputProps, 'editable'>, Omit<InputVariants, 'disabled'> {
    className?: string;
    error?: boolean;
    success?: boolean;
    disabled?: boolean;
    /**
     * Prefix text or React element displayed before the input content
     */
    prefix?: string | React.ReactNode;
    /**
     * Style object for the prefix element
     */
    prefixStyle?: TextStyle;
    /**
     * Controls visibility toggle for password inputs. When false, the eye icon is hidden.
     * Defaults to true.
     */
    showPasswordToggle?: boolean;
    /**
     * Additional style object (merged with className styles)
     */
    style?: ViewStyle;
    /**
     * Style for the text inside the input
     */
    textStyle?: TextStyle;
}
/**
 * React Native Input component that adapts to various color schemes, sizes, variants, and states.
 * For password inputs (secureTextEntry), includes a toggleable eye icon.
 * Supports prefix text or elements before input content.
 *
 * @example
 * <Input
 *   secureTextEntry
 *   placeholder="Enter password"
 *   colorScheme="brand"
 *   size="xl"
 *   prefix="https://"
 * />
 */
export declare const Input: React.FC<InputProps>;
export default Input;
