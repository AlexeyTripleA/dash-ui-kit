import React from 'react';
import { VariantProps } from 'class-variance-authority';
/** CVA for the root container, now with light/dark theme */
declare const identifier: (props?: ({
    theme?: "light" | "dark" | null | undefined;
    size?: "xs" | "sm" | "xl" | "md" | "lg" | null | undefined;
    weight?: "light" | "normal" | "medium" | null | undefined;
    ellipsis?: boolean | null | undefined;
    highlight?: "default" | "both" | "first" | "last" | "dim" | "highlight" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
type IdentifierVariants = VariantProps<typeof identifier>;
export interface IdentifierProps extends IdentifierVariants {
    children?: string;
    avatar?: boolean;
    copyButton?: boolean;
    linesAdjustment?: boolean;
    maxLines?: number;
    className?: string;
    /** Cut the middle of the ID: `true` keeps `edgeChars` per side, `'auto'` fits the ID to the container width */
    middleEllipsis?: boolean | 'auto';
    /** Characters kept on each side with `middleEllipsis={true}` */
    edgeChars?: number;
    /** Characters highlighted on each side in `highlight` modes */
    highlightChars?: number;
}
/**
 * Identifier component shows an ID string with optional highlighting, avatar,
 * copy button, dynamic line adjustment, and multi-line clamp.
 */
declare const Identifier: React.FC<IdentifierProps>;
export default Identifier;
