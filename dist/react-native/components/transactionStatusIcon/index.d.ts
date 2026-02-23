import React from 'react';
import { IconProps } from '../icons';
/**
 * Available status keys for which an icon will be rendered.
 */
export type StatusKey = 'SUCCESS' | 'FAIL' | 'QUEUED' | 'POOLED' | 'BROADCASTED';
/**
 * Props for the TransactionStatusIcon component.
 */
export interface TransactionStatusIconProps extends Omit<IconProps, 'color'> {
    /** Which status icon to show. */
    status: StatusKey;
    /** Optional override for icon color. */
    color?: string;
    /** Theme for default color selection. */
    theme?: 'light' | 'dark';
}
/**
 * Renders an icon corresponding to the given `status`.
 * If `status` is not recognized, returns null.
 * Colors adapt to light/dark theme unless overridden.
 */
export declare const TransactionStatusIcon: React.FC<TransactionStatusIconProps>;
export default TransactionStatusIcon;
