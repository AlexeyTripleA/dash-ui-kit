import React from 'react';
export interface TabItem {
    /** Unique identifier for the tab */
    value: string;
    /** Label text to display */
    label: string;
    /** Content to render when tab is active */
    content: React.ReactNode;
    /** Whether this tab is disabled */
    disabled?: boolean;
}
export interface TabsProps {
    /** Array of tab items */
    items: TabItem[];
    /** Currently active tab value (controlled) */
    value?: string;
    /** Default active tab value (uncontrolled) */
    defaultValue?: string;
    /** Callback when active tab changes */
    onValueChange?: (value: string) => void;
    /** Size variant */
    size?: 'sm' | 'lg' | 'xl';
    /** Additional CSS classes */
    className?: string;
    /** Additional CSS classes for the tabs list */
    listClassName?: string;
    /** Additional CSS classes for tab triggers */
    triggerClassName?: string;
    /** Additional CSS classes for tab content */
    contentClassName?: string;
}
/**
 * Tabs component with sleek underline style matching Figma design.
 * Built on radix-ui with light/dark theme support and keyboard navigation.
 */
export declare const Tabs: React.FC<TabsProps>;
export default Tabs;
