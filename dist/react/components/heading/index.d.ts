import React from 'react';
type HeadingColor = 'black' | 'gray' | 'blue' | 'red' | 'green';
interface HeadingProps {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
    weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
    color?: HeadingColor;
    colorLight?: HeadingColor;
    colorDark?: HeadingColor;
    className?: string;
    children: React.ReactNode;
}
export declare const Heading: React.FC<HeadingProps>;
export type { HeadingProps };
