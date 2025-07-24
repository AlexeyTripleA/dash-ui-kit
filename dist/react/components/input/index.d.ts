import React, { InputHTMLAttributes } from 'react';
import { VariantProps } from 'class-variance-authority';
declare const input: (props?: ({
    theme?: "light" | "dark" | null | undefined;
    colorScheme?: "default" | "brand" | "error" | "success" | null | undefined;
    size?: "sm" | "md" | "xl" | null | undefined;
    variant?: "outlined" | null | undefined;
    disabled?: boolean | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
type InputVariants = VariantProps<typeof input>;
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, Omit<InputVariants, 'theme' | 'disabled'> {
    className?: string;
    error?: boolean;
    success?: boolean;
}
/**
 * A versatile input component that adapts to light/dark theme,
 * supports various color schemes, sizes, variants, and states.
 * For password inputs, includes a toggleable eye icon.
 *
 * @example
 * <Input
 *   type='password'
 *   placeholder='Enter password'
 *   colorScheme='brand'
 *   size='xl'
 * />
 */
export declare const Input: React.FC<InputProps>;
export default Input;
