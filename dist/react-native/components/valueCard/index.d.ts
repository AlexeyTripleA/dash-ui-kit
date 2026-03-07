import React from 'react';
import { ViewStyle, PressableProps } from 'react-native';
import { VariantProps } from 'class-variance-authority';
/**
 * ValueCard CVA - twrnc-compatible classes.
 * dash-block-sm/md/xl expanded: px-3 py-2 rounded-[10px], px-[18px] py-3 rounded-[14px], px-[25px] py-5 rounded-[16px]
 * hover: classes omitted (RN uses Pressable opacity for press feedback)
 */
declare const valueCardStyles: (props?: ({
    theme?: "light" | "dark" | null | undefined;
    colorScheme?: "default" | "green" | "lightBlue" | "lightGray" | "white" | "transparent" | "yellow" | null | undefined;
    size?: "sm" | "md" | "xl" | "xs" | null | undefined;
    clickable?: boolean | null | undefined;
    loading?: boolean | null | undefined;
    border?: boolean | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
type ValueCardVariants = VariantProps<typeof valueCardStyles>;
export interface ValueCardProps extends Omit<PressableProps, 'style'>, Omit<ValueCardVariants, 'theme'> {
    /** Theme - light or dark. Default: 'light' */
    theme?: 'light' | 'dark';
    /** Color scheme */
    colorScheme?: 'default' | 'transparent' | 'green' | 'lightBlue' | 'white' | 'lightGray' | 'yellow';
    /** Color scheme override for light theme */
    colorSchemeLight?: 'default' | 'transparent' | 'green' | 'lightBlue' | 'white' | 'lightGray' | 'yellow';
    /** Color scheme override for dark theme */
    colorSchemeDark?: 'default' | 'transparent' | 'green' | 'lightBlue' | 'white' | 'lightGray' | 'yellow';
    /** Size variant */
    size?: 'xs' | 'sm' | 'md' | 'xl';
    /** Whether the card is clickable (shows press feedback) */
    clickable?: boolean;
    /** Show loading state with ActivityIndicator */
    loading?: boolean;
    /** Show border. Default: true */
    border?: boolean;
    /** Additional Tailwind classes */
    className?: string;
    /** Custom container style (overrides Tailwind classes) */
    style?: ViewStyle;
    /** Card content */
    children: React.ReactNode;
}
/**
 * React Native ValueCard - card container with theme, color schemes, sizes,
 * clickability, loading state, and optional border.
 */
export declare const ValueCard: React.FC<ValueCardProps>;
export default ValueCard;
