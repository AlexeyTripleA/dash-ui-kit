/**
 * Universal Clipboard utility for React Native and Expo
 * 
 * Supports both:
 * - @react-native-clipboard/clipboard (React Native)
 * - expo-clipboard (Expo)
 * 
 * Automatically detects which one is available and uses it.
 */

interface ClipboardAPI {
  setString: (text: string) => void | Promise<void>;
  getString: () => Promise<string>;
}

let clipboardInstance: ClipboardAPI | null = null;

/**
 * Get the clipboard instance
 * Tries to load expo-clipboard first, then falls back to @react-native-clipboard/clipboard
 */
function getClipboard(): ClipboardAPI {
  if (clipboardInstance) {
    return clipboardInstance;
  }

  try {
    // Try expo-clipboard first (most common in Expo projects)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ExpoClipboard = require('expo-clipboard');
    if (ExpoClipboard?.setStringAsync && ExpoClipboard?.getStringAsync) {
      clipboardInstance = {
        setString: (text: string) => {
          ExpoClipboard.setStringAsync(text).catch((err: Error) => {
            console.warn('[dash-ui-kit] Failed to copy to clipboard:', err);
          });
        },
        getString: () => ExpoClipboard.getStringAsync(),
      };
      return clipboardInstance;
    }
  } catch (err) {
    // expo-clipboard not available, continue to try React Native clipboard
  }

  try {
    // Try @react-native-clipboard/clipboard (React Native)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const RNClipboard = require('@react-native-clipboard/clipboard');
    if (RNClipboard?.default || RNClipboard?.Clipboard) {
      const clipboard = RNClipboard.default || RNClipboard.Clipboard;
      clipboardInstance = {
        setString: (text: string) => clipboard.setString(text),
        getString: () => clipboard.getString(),
      };
      return clipboardInstance;
    }
  } catch (err) {
    // @react-native-clipboard/clipboard not available
  }

  // No clipboard available - return stub
  console.warn(
    '[dash-ui-kit] No clipboard library found. Please install either:\n' +
    '  - expo-clipboard (for Expo projects): npx expo install expo-clipboard\n' +
    '  - @react-native-clipboard/clipboard (for React Native): npm install @react-native-clipboard/clipboard'
  );
  
  clipboardInstance = {
    setString: () => {
      console.warn('[dash-ui-kit] Clipboard not available');
    },
    getString: async () => '',
  };
  
  return clipboardInstance;
}

/**
 * Universal Clipboard object
 * Compatible with both expo-clipboard and @react-native-clipboard/clipboard
 */
const Clipboard = {
  /**
   * Set string to clipboard
   * @param text - Text to copy
   */
  setString: (text: string): void => {
    const clipboard = getClipboard();
    clipboard.setString(text);
  },

  /**
   * Get string from clipboard
   * @returns Promise with clipboard content
   */
  getString: (): Promise<string> => {
    const clipboard = getClipboard();
    return clipboard.getString();
  },
};

export default Clipboard;
export { Clipboard };
