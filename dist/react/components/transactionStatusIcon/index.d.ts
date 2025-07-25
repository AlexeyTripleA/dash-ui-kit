import React from 'react';
import { SuccessIcon } from '../icons';
/**
 * Available status keys for which an icon will be rendered.
 */
export type StatusKey = 'SUCCESS' | 'FAIL' | 'QUEUED' | 'POOLED' | 'BROADCASTED';
/**
 * Props for the TransactionStatusIcon component.
 * Inherits all props of SuccessIcon (assumed representative of all icons),
 * plus a `status` field to choose which icon to render.
 */
export interface TransactionStatusIconProps extends Omit<React.ComponentProps<typeof SuccessIcon>, 'size' | 'color'> {
    /** Which status icon to show. */
    status: StatusKey;
    /** Optional override for icon size. */
    size?: number;
    /** Optional override for icon color. */
    color?: string;
}
/**
 * Renders an icon corresponding to the given `status`.
 * If `status` is not recognized, returns null.
 * Colors adapt to light/dark theme unless overridden.
 */
export declare const TransactionStatusIcon: React.FC<TransactionStatusIconProps>;
export default TransactionStatusIcon;
