import React from 'react';
import { ViewProps } from 'react-native';
import { VariantProps } from 'class-variance-authority';
/** CVA for the root container with light/dark theme */
declare const identifier: (props?: ({
    theme?: "light" | "dark" | null | undefined;
    ellipsis?: boolean | null | undefined;
    highlight?: "default" | "highlight" | "dim" | "first" | "last" | "both" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
type IdentifierVariants = VariantProps<typeof identifier>;
export interface IdentifierProps extends IdentifierVariants, ViewProps {
    children?: string;
    avatar?: boolean;
    copyButton?: boolean;
    maxLines?: number;
    className?: string;
    middleEllipsis?: boolean;
    edgeChars?: number;
    /** Theme to use */
    theme?: 'light' | 'dark';
}
/**
 * Identifier component for React Native
 * Shows an ID string with optional highlighting, avatar, copy button, and ellipsis modes.
 *
 * Features:
 * - Highlight modes: default, dim, highlight, first, last, both
 * - Ellipsis modes: standard (tail), middle, maxLines
 * - Avatar integration
 * - Copy button integration
 * - Theme support (light/dark)
 *
 * @example
 * ```tsx
 * <Identifier highlight="both">0x1234567890abcdef</Identifier>
 * <Identifier avatar copyButton>alice@example.com</Identifier>
 * <Identifier middleEllipsis edgeChars={6}>very-long-identifier</Identifier>
 * <Identifier maxLines={2}>Multi-line\nidentifier\ntext</Identifier>
 * ```
 */
declare const Identifier: React.FC<IdentifierProps>;
export default Identifier;
export { Identifier };
