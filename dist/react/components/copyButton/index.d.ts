import React from 'react';
import { CopyResult } from '../../utils/copyToClipboard';
export interface CopyButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onCopy'> {
    /** Text to copy into clipboard */
    text: string;
    /** Optional callback that will be called with the copy result */
    onCopy?: (result: CopyResult) => void;
}
export declare const CopyButton: React.FC<CopyButtonProps>;
export default CopyButton;
