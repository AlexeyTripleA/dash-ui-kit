import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
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
    /** Theme variant */
    theme?: 'light' | 'dark';
    /** Additional CSS classes for the root container */
    className?: string;
    /** Additional CSS classes for the tabs list */
    listClassName?: string;
    /** Additional CSS classes for tab triggers */
    triggerClassName?: string;
    /** Additional CSS classes for tab content */
    contentClassName?: string;
    /** Custom container style (overrides Tailwind classes) */
    style?: ViewStyle;
    /** Custom tabs list style (overrides Tailwind classes) */
    listStyle?: ViewStyle;
    /** Custom tab trigger style (overrides Tailwind classes) */
    triggerStyle?: ViewStyle;
    /** Custom tab content style (overrides Tailwind classes) */
    contentStyle?: ViewStyle;
    /** Custom tab text style (overrides Tailwind text classes) */
    textStyle?: TextStyle;
}
/**
 * React Native Tabs component with sleek underline style matching Figma design.
 * Features horizontal scrolling, light/dark theme support, and touch interactions.
 */
export declare const Tabs: React.FC<TabsProps>;
export default Tabs;
