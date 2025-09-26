import React from 'react';
import { VariantProps } from 'class-variance-authority';
declare const valueCard: (props?: ({
    theme?: "light" | "dark" | null | undefined;
    colorScheme?: "white" | "default" | "lightBlue" | "lightGray" | "green" | "transparent" | "yellow" | null | undefined;
    size?: "sm" | "xl" | "md" | null | undefined;
    clickable?: boolean | null | undefined;
    loading?: boolean | null | undefined;
    border?: boolean | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
type ValueCardVariants = VariantProps<typeof valueCard>;
export interface ValueCardProps extends Omit<ValueCardVariants, 'theme'> {
    /** If you pass an `as` component, it'll receive `href` when `link` is set */
    as?: React.ElementType;
    /** Only applies `href` if `as` is `'a'` or a component that accepts `href` */
    link?: string;
    className?: string;
    children: React.ReactNode;
    /** Additional props to pass to the underlying element */
    [key: string]: any;
}
/**
 * A card container that adapts to light/dark theme,
 * supports various color schemes, sizes, clickability,
 * loading state, and optional border styling.
 *
 * @example
 * <ValueCard colorScheme="green" border as={Link} link="/foo">
 *   Go
 * </ValueCard>
 */
export declare const ValueCard: React.FC<ValueCardProps>;
export default ValueCard;
