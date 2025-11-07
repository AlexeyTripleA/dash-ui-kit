import React from 'react';
export interface DialogProps {
    /** Whether the dialog is open */
    open?: boolean;
    /** Callback when dialog open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Dialog title */
    title?: string;
    /** Whether to show the close button */
    showCloseButton?: boolean;
    /** Dialog size */
    size?: 'sm' | 'md' | 'xl';
    /** Vertical position of the dialog */
    position?: 'center' | 'bottom';
    /** Offset from bottom when position is 'bottom' (in pixels) */
    bottomOffset?: number;
    /** Maximum width of the dialog (e.g., '500px', '50%', '2xl'). Use Tailwind classes like 'sm', 'md', 'lg', 'xl', '2xl', etc. or CSS values */
    maxWidth?: string;
    /** Horizontal margin from screen edges (in pixels) */
    horizontalMargin?: number;
    /** Dialog content */
    children: React.ReactNode;
    /** Additional className for the content container */
    className?: string;
    /** Custom trigger element (if not controlled) */
    trigger?: React.ReactNode;
}
export declare const DashDialog: React.FC<DialogProps>;
export { DashDialog as Dialog };
