import React from 'react';
import { VariantProps } from 'class-variance-authority';
declare const overlayMenuTrigger: (props?: ({
    theme?: "light" | "dark" | null | undefined;
    colorScheme?: "default" | "brand" | "gray" | "lightGray" | "error" | "success" | null | undefined;
    size?: "sm" | "md" | "xl" | null | undefined;
    border?: boolean | null | undefined;
    disabled?: boolean | null | undefined;
    filled?: boolean | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
type OverlayMenuVariants = VariantProps<typeof overlayMenuTrigger>;
export interface OverlayMenuItem {
    id: string;
    content: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}
export interface OverlayMenuProps extends Omit<OverlayMenuVariants, 'theme' | 'disabled'> {
    className?: string;
    error?: boolean;
    success?: boolean;
    border?: boolean;
    filled?: boolean;
    items?: OverlayMenuItem[];
    showArrow?: boolean;
    disabled?: boolean;
    name?: string;
    overlayLabel?: string;
    maxHeight?: string;
    triggerContent?: React.ReactNode;
    placeholder?: string;
    showItemBorders?: boolean;
}
/**
 * Overlay menu component that opens above the trigger with overlay positioning.
 * Supports custom content items with onClick handlers.
 */
export declare const OverlayMenu: React.FC<OverlayMenuProps>;
export default OverlayMenu;
