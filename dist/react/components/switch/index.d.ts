import React from 'react';
import { VariantProps } from 'class-variance-authority';
declare const switchContainer: (props?: ({
    theme?: "light" | "dark" | null | undefined;
    size?: "sm" | "xl" | "md" | null | undefined;
    disabled?: boolean | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
type SwitchVariants = VariantProps<typeof switchContainer>;
/**
 * Configuration object for a single switch option.
 *
 * @template T - The type of the value (string or number)
 */
export interface SwitchOption<T = string | number> {
    /** Display text for the option */
    label: string;
    /** Unique value for the option */
    value: T;
    /** Whether this specific option is disabled */
    disabled?: boolean;
}
/**
 * Props for the Switch component.
 *
 * @template T - The type of the option values (string or number)
 */
export interface SwitchProps<T = string | number> extends Omit<SwitchVariants, 'theme' | 'disabled'> {
    /** Array of options to display */
    options: SwitchOption<T>[];
    /** Currently selected value */
    value: T;
    /** Callback when selection changes */
    onChange: (value: T) => void;
    /** Additional CSS classes */
    className?: string;
    /** Whether the entire switch is disabled */
    disabled?: boolean;
}
/**
 * A switch component for selecting between multiple options.
 * Supports individual option disabling, hover states, and responsive sizing.
 * Uses dash design system sizing and theming with automatic light/dark mode.
 * @example
 * // With disabled options
 * <Switch
 *   options={[
 *     { label: 'Basic', value: 'basic' },
 *     { label: 'Pro', value: 'pro', disabled: true },
 *     { label: 'Free', value: 'free' }
 *   ]}
 *   value="basic"
 *   onChange={(value) => console.log(value)}
 * />
 */
export declare function Switch<T = string | number>({ options, value, onChange, size, className, disabled }: SwitchProps<T>): React.JSX.Element;
export default Switch;
