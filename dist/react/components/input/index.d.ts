import React, { InputHTMLAttributes } from 'react';
import { VariantProps } from 'class-variance-authority';
declare const input: (props?: ({
    theme?: "light" | "dark" | null | undefined;
    colorScheme?: "default" | "brand" | "error" | "success" | "light-gray" | null | undefined;
    size?: "sm" | "md" | "xl" | null | undefined;
    variant?: "outlined" | "filled" | null | undefined;
    disabled?: boolean | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
type InputVariants = VariantProps<typeof input>;
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>, Omit<InputVariants, 'theme' | 'disabled'> {
    className?: string;
    error?: boolean;
    success?: boolean;
    prefix?: string | React.ReactNode;
    prefixClassName?: string;
    /**
     * Controls visibility toggle for password inputs. When false, the eye icon is hidden and no extra right padding is applied.
     * Defaults to true.
     */
    showPasswordToggle?: boolean;
}
/**
 * A versatile input component that adapts to light/dark theme,
 * supports various color schemes, sizes, variants, and states.
 * For password inputs, includes a toggleable eye icon.
 * Supports prefix text or elements before input content.
 *
 * @example
 * <Input
 *   type='password'
 *   placeholder='Enter password'
 *   colorScheme='brand'
 *   size='xl'
 *   prefix="https://"
 * />
 */
export declare const Input: React.FC<InputProps>;
export default Input;
