import React from 'react';
import { VariantProps } from 'class-variance-authority';
/** CVA for the root container, now with light/dark theme */
declare const identifier: (props?: ({
    theme?: "light" | "dark" | null | undefined;
    ellipsis?: boolean | null | undefined;
    highlight?: "default" | "highlight" | "dim" | "first" | "last" | "both" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
type IdentifierVariants = VariantProps<typeof identifier>;
export interface IdentifierProps extends IdentifierVariants {
    children?: string;
    avatar?: boolean;
    copyButton?: boolean;
    linesAdjustment?: boolean;
    maxLines?: number;
    className?: string;
    middleEllipsis?: boolean;
    edgeChars?: number;
}
/**
 * Identifier component shows an ID string with optional highlighting, avatar,
 * copy button, dynamic line adjustment, and multi-line clamp.
 */
declare const Identifier: React.FC<IdentifierProps>;
export default Identifier;
