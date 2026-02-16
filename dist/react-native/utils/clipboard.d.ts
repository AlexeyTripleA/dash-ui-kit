/**
 * Universal Clipboard utility for React Native and Expo
 *
 * Supports both:
 * - @react-native-clipboard/clipboard (React Native)
 * - expo-clipboard (Expo)
 *
 * Automatically detects which one is available and uses it.
 */
/**
 * Universal Clipboard object
 * Compatible with both expo-clipboard and @react-native-clipboard/clipboard
 */
declare const Clipboard: {
    /**
     * Set string to clipboard
     * @param text - Text to copy
     */
    setString: (text: string) => void;
    /**
     * Get string from clipboard
     * @returns Promise with clipboard content
     */
    getString: () => Promise<string>;
};
export default Clipboard;
export { Clipboard };
