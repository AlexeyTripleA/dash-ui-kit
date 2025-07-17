import React from 'react';
import { VariantProps } from 'class-variance-authority';
declare const selectTrigger: (props?: ({
    theme?: "light" | "dark" | null | undefined;
    colorScheme?: "default" | "brand" | "error" | "success" | null | undefined;
    size?: "sm" | "md" | "xl" | null | undefined;
    border?: boolean | null | undefined;
    disabled?: boolean | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
type SelectVariants = VariantProps<typeof selectTrigger>;
export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
    content?: React.ReactNode;
}
export interface SelectProps extends Omit<SelectVariants, 'theme' | 'disabled'> {
    className?: string;
    error?: boolean;
    success?: boolean;
    border?: boolean;
    options?: SelectOption[];
    showArrow?: boolean;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    name?: string;
}
/**
 * A versatile select component built on Radix UI that adapts to light/dark theme,
 * supports various color schemes, sizes, variants, states, and HTML content in options.
 *
 * @example
 * <Select
 *   options={[
 *     {value: 'id1', label: 'Option 1'},
 *     {value: 'id2', label: 'Option 2', content: <div><strong>Option 2</strong><br/>Description</div>}
 *   ]}
 *   colorScheme="default"
 *   size="xl"
 *   border={true}
 * />
 */
export declare const Select: React.FC<SelectProps>;
export default Select;
