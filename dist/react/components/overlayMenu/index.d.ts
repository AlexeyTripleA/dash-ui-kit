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
    className?: string;
}
export interface OverlayMenuPosition {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
}
export interface OverlayMenuProps extends Omit<OverlayMenuVariants, 'theme' | 'disabled'> {
    className?: string;
    triggerClassName?: string;
    contentClassName?: string;
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
    wrapperClassName?: string;
    variant?: 'dropdown' | 'context-menu';
    align?: 'left' | 'center' | 'right';
    headerContent?: React.ReactNode;
    showCloseButton?: boolean;
    closeButtonAlign?: 'left' | 'center' | 'right';
    position?: OverlayMenuPosition;
    width?: string | number;
    onClose?: () => void;
    /** Color scheme override for light theme */
    colorSchemeLight?: 'default' | 'brand' | 'error' | 'success' | 'gray' | 'lightGray';
    /** Color scheme override for dark theme */
    colorSchemeDark?: 'default' | 'brand' | 'error' | 'success' | 'gray' | 'lightGray';
}
export declare const OverlayMenu: React.FC<OverlayMenuProps>;
export default OverlayMenu;
