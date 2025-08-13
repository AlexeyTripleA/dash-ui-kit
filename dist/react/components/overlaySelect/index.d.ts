import React from 'react';
import { VariantProps } from 'class-variance-authority';
declare const overlaySelectTrigger: (props?: ({
    theme?: "light" | "dark" | null | undefined;
    colorScheme?: "default" | "brand" | "error" | "success" | null | undefined;
    size?: "sm" | "md" | "xl" | null | undefined;
    border?: boolean | null | undefined;
    disabled?: boolean | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
type OverlaySelectVariants = VariantProps<typeof overlaySelectTrigger>;
export interface OverlaySelectOption {
    value: string;
    label: string;
    disabled?: boolean;
    content?: React.ReactNode;
}
export interface OverlaySelectProps extends Omit<OverlaySelectVariants, 'theme' | 'disabled'> {
    className?: string;
    error?: boolean;
    success?: boolean;
    border?: boolean;
    options?: OverlaySelectOption[];
    showArrow?: boolean;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    name?: string;
    overlayLabel?: string;
    maxHeight?: string;
}
/**
 * Overlay select component that opens above the trigger with overlay positioning.
 * Simple select component without additional button functionality.
 */
export declare const OverlaySelect: React.FC<OverlaySelectProps>;
export default OverlaySelect;
