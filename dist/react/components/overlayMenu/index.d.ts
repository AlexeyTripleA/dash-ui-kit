import React from 'react';
import { VariantProps } from 'class-variance-authority';
declare const overlayMenuTrigger: (props?: ({
    theme?: "light" | "dark" | null | undefined;
    colorScheme?: "default" | "gray" | "brand" | "lightGray" | "error" | "success" | null | undefined;
    size?: "sm" | "xl" | "md" | null | undefined;
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
export interface OverlayMenuPosition {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
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
    variant?: 'dropdown' | 'context-menu';
    headerContent?: React.ReactNode;
    showCloseButton?: boolean;
    position?: OverlayMenuPosition;
    width?: string | number;
    onClose?: () => void;
}
/**
 * Overlay menu component that opens above the trigger with overlay positioning.
 * Supports custom content items with onClick handlers.
 *
 * @param variant - 'dropdown' (default) or 'context-menu'
 * @param headerContent - Custom header content (for context-menu variant)
 * @param showCloseButton - Show close button in header
 * @param position - Position object for context-menu variant
 * @param width - Custom width (default: 200px for context-menu)
 */
export declare const OverlayMenu: React.FC<OverlayMenuProps>;
export default OverlayMenu;
