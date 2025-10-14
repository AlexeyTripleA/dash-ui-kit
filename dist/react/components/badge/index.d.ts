import React from 'react';
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
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
     * Additional CSS class name
     */
    className?: string;
    /**
     * Click handler
     */
    onClick?: React.MouseEventHandler<HTMLSpanElement>;
}
export declare const Badge: React.FC<BadgeProps>;
export default Badge;
