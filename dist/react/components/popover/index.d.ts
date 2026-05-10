import React from 'react';
export interface PopoverProps {
    /** Popover body content */
    content: React.ReactNode;
    /** Element that triggers the popover on click */
    children: React.ReactNode;
    /** Which side the popover appears on */
    side?: 'top' | 'bottom' | 'left' | 'right';
    /** Offset from the trigger in pixels */
    sideOffset?: number;
    /** Whether to show a close button inside the popover */
    showCloseButton?: boolean;
    /** Controlled open state */
    open?: boolean;
    /** Called when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Default open (uncontrolled) */
    defaultOpen?: boolean;
    /** Additional className for the content container */
    className?: string;
}
export declare const Popover: React.FC<PopoverProps>;
export default Popover;
