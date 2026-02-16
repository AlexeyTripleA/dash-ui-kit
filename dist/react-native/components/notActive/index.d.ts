import React from 'react';
import { TextProps, TextStyle } from 'react-native';
export interface NotActiveProps extends Omit<TextProps, 'style'> {
    children?: React.ReactNode;
    className?: string;
    /** Light or dark theme */
    theme?: 'light' | 'dark';
    /** Custom text style (overrides Tailwind classes) */
    style?: TextStyle;
}
/**
 * NotActive component for React Native
 * Shows "n/a" text with theme-aware styling
 */
export declare function NotActive({ children, className, theme, style, ...props }: NotActiveProps): React.JSX.Element;
export default NotActive;
