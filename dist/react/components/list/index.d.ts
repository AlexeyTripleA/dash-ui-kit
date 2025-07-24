import React from 'react';
interface ListItem {
    text: string;
    description?: string;
}
interface ListProps {
    items: ListItem[];
    iconType?: 'check';
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}
export declare const List: React.FC<ListProps>;
export type { ListProps, ListItem };
