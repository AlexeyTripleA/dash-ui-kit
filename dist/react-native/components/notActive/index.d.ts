import React from 'react';
import { TextProps } from 'react-native';
export interface NotActiveProps extends TextProps {
    children?: React.ReactNode;
    className?: string;
    /** Light or dark theme */
    theme?: 'light' | 'dark';
}
/**
 * NotActive component for React Native
 * Shows "n/a" text with theme-aware styling
 */
export declare function NotActive({ children, className, theme, style, ...props }: NotActiveProps): React.JSX.Element;
export default NotActive;
