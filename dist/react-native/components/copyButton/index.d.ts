import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
export interface CopyButtonProps {
    /** Text to copy into clipboard */
    text: string;
    /** Optional callback that will be called with the copy result */
    onCopy?: (success: boolean) => void;
    /** Additional Tailwind classes for styling */
    className?: string;
    /** Custom container style (overrides Tailwind classes) */
    style?: ViewStyle;
    /** Custom text style for the feedback text (overrides Tailwind text classes) */
    textStyle?: TextStyle;
    /** Accessible label for the button */
    accessibilityLabel?: string;
    /** Feedback shown after a successful copy */
    copiedLabel?: string;
    /** Feedback shown after a failed copy */
    failedLabel?: string;
}
/**
 * React Native CopyButton component. Copies text to clipboard on press
 * and briefly reports whether the copy succeeded.
 */
export declare const CopyButton: React.FC<CopyButtonProps>;
export default CopyButton;
