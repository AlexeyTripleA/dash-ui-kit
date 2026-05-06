import React from 'react';
export interface TooltipProps {
    /** Tooltip label content */
    content: React.ReactNode;
    /** Element that triggers the tooltip */
    children: React.ReactNode;
    /** Which side the tooltip appears on */
    side?: 'top' | 'bottom' | 'left' | 'right';
    /** Offset from the trigger in pixels */
    sideOffset?: number;
    /** Delay in ms before tooltip opens */
    delayDuration?: number;
    /** Controlled open state */
    open?: boolean;
    /** Called when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Default open (uncontrolled) */
    defaultOpen?: boolean;
}
export declare const Tooltip: React.FC<TooltipProps>;
export default Tooltip;
