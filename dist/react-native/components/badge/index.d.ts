import React from 'react';
import { ViewStyle, TextStyle, PressableProps } from 'react-native';
/**
 * Badge component props
 */
export interface BadgeProps extends Omit<PressableProps, 'style'> {
    /**
     * Content of the badge
     */
    children: React.ReactNode;
    /**
     * Visual style variant
     */
    variant?: 'default' | 'flat' | 'solid' | 'bordered';
    /**
     * Color theme
     */
    color?: 'blue' | 'white' | 'gray' | 'light-gray' | 'turquoise' | 'red' | 'orange';
    /**
     * Size of the badge
     */
    size?: 'xxs' | 'xs' | 'sm' | 'xl';
    /**
     * Border radius variant
     */
    borderRadius?: 'xs';
    /**
     * Additional Tailwind classes for styling
     */
    className?: string;
    /**
     * Custom container style (overrides Tailwind classes)
     */
    style?: ViewStyle;
    /**
     * Custom text style (overrides Tailwind text classes)
     */
    textStyle?: TextStyle;
    /**
     * Press handler
     */
    onPress?: () => void;
}
/**
 * React Native Badge component with multiple variants, colors, sizes, and border radius options.
 * Uses CVA for variant management and twrnc for Tailwind styling.
 *
 * Supports 28 style combinations (7 colors × 4 variants) with 4 sizes and optional custom border radius.
 */
export declare const Badge: React.FC<BadgeProps>;
export default Badge;
