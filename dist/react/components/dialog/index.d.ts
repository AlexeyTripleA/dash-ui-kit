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
    /** Dialog content */
    children: React.ReactNode;
    /** Additional className for the content container */
    className?: string;
    /** Custom trigger element (if not controlled) */
    trigger?: React.ReactNode;
}
export declare const DashDialog: React.FC<DialogProps>;
export { DashDialog as Dialog };
