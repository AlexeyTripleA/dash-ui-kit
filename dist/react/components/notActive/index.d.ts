import React from 'react';
export interface NotActiveProps extends React.HTMLAttributes<HTMLSpanElement> {
    children?: React.ReactNode;
    className?: string;
}
export declare function NotActive({ children, className, ...props }: NotActiveProps): React.JSX.Element;
