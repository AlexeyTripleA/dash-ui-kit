import React from 'react';
export interface AccordionProps {
    /** The title displayed in the accordion trigger */
    title: string;
    /** Content to display in the accordion */
    children?: React.ReactNode;
    /** Whether the accordion is open by default */
    defaultOpen?: boolean;
    /** Controlled open state */
    open?: boolean;
    /** Callback when the open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Additional CSS classes */
    className?: string;
    /** Optional element to display on the right side of the trigger */
    rightElement?: React.ReactNode;
    /** Whether to show separator between title and content when open */
    showSeparator?: boolean;
    /** Whether to show border around the accordion */
    border?: boolean;
}
/**
 * Accordion component based on Radix UI with smooth animations.
 * Displays custom content in an expandable format.
 */
export declare const Accordion: React.FC<AccordionProps>;
export default Accordion;
