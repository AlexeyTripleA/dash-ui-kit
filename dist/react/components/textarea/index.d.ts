import React, { TextareaHTMLAttributes } from 'react';
import { VariantProps } from 'class-variance-authority';
declare const textareaContainer: (props?: ({
    theme?: "light" | "dark" | null | undefined;
    hasValue?: boolean | null | undefined;
    colorScheme?: "default" | "brand" | "error" | "success" | null | undefined;
    size?: "sm" | "md" | "xl" | null | undefined;
    variant?: "outlined" | null | undefined;
    isValid?: boolean | "null" | null | undefined;
    disabled?: boolean | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
type TextareaVariants = VariantProps<typeof textareaContainer>;
export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'size'>, Omit<TextareaVariants, 'theme' | 'hasValue' | 'isValid' | 'disabled'> {
    className?: string;
    onChange?: (value: string) => void;
    showPasteButton?: boolean;
    validator?: ((value: string) => boolean) | boolean;
    rows?: number;
    font?: 'main' | 'grotesque';
    weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
    error?: boolean;
    success?: boolean;
}
/**
 * A versatile textarea component that adapts to light/dark theme,
 * supports various color schemes, sizes, variants, and states.
 * Includes optional paste functionality and validation.
 *
 * @example
 * <Textarea
 *   placeholder='Enter your message'
 *   colorScheme='brand'
 *   size='xl'
 *   font='grotesque'
 *   weight='medium'
 *   rows={4}
 *   showPasteButton={true}
 * />
 */
export declare const Textarea: React.FC<TextareaProps>;
export default Textarea;
