/**
 * Design tokens for React Native
 *
 * These tokens are derived from the web theme (src/styles/theme.pcss)
 * and optimized for React Native StyleSheet usage.
 *
 * @example
 * ```typescript
 * import { colors, spacing, typography, borderRadius, shadows } from 'dash-ui-kit/react-native';
 * import { StyleSheet, Platform } from 'react-native';
 *
 * const styles = StyleSheet.create({
 *   container: {
 *     backgroundColor: colors.brand,
 *     padding: spacing[4],
 *     borderRadius: borderRadius.md,
 *     ...Platform.select({
 *       ios: shadows.md.ios,
 *       android: shadows.md.android,
 *     }),
 *   },
 *   title: {
 *     fontSize: typography.fontSize.xl,
 *     fontWeight: typography.fontWeight.semibold,
 *     lineHeight: typography.lineHeight.xl,
 *   },
 * });
 * ```
 */
/**
 * Color palette
 * Derived from theme.pcss color variables
 */
export declare const colors: {
    readonly brand: "#4C7EFF";
    readonly brandDim: "#96A7FF";
    readonly brandDark: "#4D5895";
    readonly brandDarkness: "#13172A";
    readonly mint: "#60F6D2";
    readonly mintHover: "#4DD4B1";
    readonly yellowLight: "#fef3c7";
    readonly yellow: "#fde68a";
    readonly primaryDarkBlue: "#0C1C33";
    readonly primaryDieSubdued: "rgba(12, 28, 51, 0.03)";
    readonly green: "#40BF40";
    readonly green75: "rgba(64, 191, 64, 0.75)";
    readonly green15: "rgba(64, 191, 64, 0.15)";
    readonly green5: "rgba(64, 191, 64, 0.05)";
    readonly red: "#CD2E00";
    readonly red75: "rgba(205, 46, 0, 0.75)";
    readonly red15: "rgba(205, 46, 0, 0.15)";
    readonly red5: "rgba(205, 46, 0, 0.05)";
    readonly orange: "#F98F12";
    readonly orange75: "rgba(249, 143, 18, 0.75)";
    readonly orange15: "rgba(249, 143, 18, 0.15)";
    readonly orange5: "rgba(249, 143, 18, 0.05)";
    readonly white: "#FFFFFF";
    readonly black: "#000000";
    readonly transparent: "transparent";
};
/**
 * Spacing scale
 * Based on 4px base unit (Tailwind-compatible)
 */
export declare const spacing: {
    readonly 0: 0;
    readonly 1: 4;
    readonly 2: 8;
    readonly 3: 12;
    readonly 4: 16;
    readonly 5: 20;
    readonly 6: 24;
    readonly 7: 28;
    readonly 8: 32;
    readonly 9: 36;
    readonly 10: 40;
    readonly 11: 44;
    readonly 12: 48;
    readonly 14: 56;
    readonly 16: 64;
    readonly 18: 72;
    readonly 20: 80;
    readonly 24: 96;
    readonly 28: 112;
    readonly 32: 128;
    readonly 36: 144;
    readonly 40: 160;
    readonly 44: 176;
    readonly 48: 192;
    readonly 52: 208;
    readonly 56: 224;
    readonly 60: 240;
    readonly 64: 256;
};
/**
 * Typography scale
 * Font sizes, weights, and line heights
 */
export declare const typography: {
    /**
     * Font size scale
     */
    readonly fontSize: {
        readonly xs: 12;
        readonly sm: 14;
        readonly base: 16;
        readonly lg: 18;
        readonly xl: 20;
        readonly '2xl': 24;
        readonly '3xl': 30;
        readonly '4xl': 36;
        readonly '5xl': 48;
        readonly '6xl': 60;
        readonly '7xl': 72;
        readonly '8xl': 96;
        readonly '9xl': 128;
    };
    /**
     * Font weight scale
     * Values are strings for React Native compatibility
     */
    readonly fontWeight: {
        readonly normal: "400";
        readonly medium: "500";
        readonly semibold: "600";
        readonly bold: "700";
        readonly extrabold: "800";
    };
    /**
     * Line height scale (in pixels)
     * Calculated based on common typography ratios
     */
    readonly lineHeight: {
        readonly xs: 16;
        readonly sm: 20;
        readonly base: 24;
        readonly lg: 28;
        readonly xl: 28;
        readonly '2xl': 32;
        readonly '3xl': 36;
        readonly '4xl': 40;
        readonly '5xl': 56;
        readonly '6xl': 72;
        readonly '7xl': 84;
        readonly '8xl': 112;
        readonly '9xl': 144;
    };
    /**
     * Letter spacing (tracking)
     */
    readonly letterSpacing: {
        readonly tighter: -0.8;
        readonly tight: -0.4;
        readonly normal: 0;
        readonly wide: 0.4;
        readonly wider: 0.8;
        readonly widest: 1.6;
    };
};
/**
 * Border radius scale
 */
export declare const borderRadius: {
    readonly none: 0;
    readonly xs: 4;
    readonly sm: 10;
    readonly md: 12;
    readonly lg: 14;
    readonly xl: 16;
    readonly '2xl': 20;
    readonly '3xl': 24;
    readonly full: 9999;
};
/**
 * Shadow presets
 * Platform-specific implementations for iOS and Android
 *
 * @example
 * ```typescript
 * import { Platform } from 'react-native';
 *
 * const shadowStyle = Platform.select({
 *   ios: shadows.md.ios,
 *   android: shadows.md.android,
 * });
 * ```
 */
export declare const shadows: {
    /**
     * Small shadow - subtle elevation
     */
    readonly sm: {
        readonly ios: {
            readonly shadowColor: "#000000";
            readonly shadowOffset: {
                readonly width: 0;
                readonly height: 1;
            };
            readonly shadowOpacity: 0.1;
            readonly shadowRadius: 2;
        };
        readonly android: {
            readonly elevation: 2;
        };
    };
    /**
     * Medium shadow - standard elevation
     */
    readonly md: {
        readonly ios: {
            readonly shadowColor: "#000000";
            readonly shadowOffset: {
                readonly width: 0;
                readonly height: 2;
            };
            readonly shadowOpacity: 0.15;
            readonly shadowRadius: 4;
        };
        readonly android: {
            readonly elevation: 4;
        };
    };
    /**
     * Large shadow - prominent elevation
     */
    readonly lg: {
        readonly ios: {
            readonly shadowColor: "#000000";
            readonly shadowOffset: {
                readonly width: 0;
                readonly height: 4;
            };
            readonly shadowOpacity: 0.2;
            readonly shadowRadius: 8;
        };
        readonly android: {
            readonly elevation: 8;
        };
    };
    /**
     * Extra large shadow - maximum elevation
     */
    readonly xl: {
        readonly ios: {
            readonly shadowColor: "#000000";
            readonly shadowOffset: {
                readonly width: 0;
                readonly height: 8;
            };
            readonly shadowOpacity: 0.25;
            readonly shadowRadius: 16;
        };
        readonly android: {
            readonly elevation: 12;
        };
    };
};
/**
 * Border width scale
 */
export declare const borderWidth: {
    readonly 0: 0;
    readonly 1: 1;
    readonly 2: 2;
    readonly 4: 4;
    readonly 8: 8;
};
/**
 * Opacity scale
 */
export declare const opacity: {
    readonly 0: 0;
    readonly 5: 0.05;
    readonly 10: 0.1;
    readonly 15: 0.15;
    readonly 20: 0.2;
    readonly 25: 0.25;
    readonly 30: 0.3;
    readonly 40: 0.4;
    readonly 50: 0.5;
    readonly 60: 0.6;
    readonly 70: 0.7;
    readonly 75: 0.75;
    readonly 80: 0.8;
    readonly 90: 0.9;
    readonly 95: 0.95;
    readonly 100: 1;
};
/**
 * Z-index scale
 */
export declare const zIndex: {
    readonly 0: 0;
    readonly 10: 10;
    readonly 20: 20;
    readonly 30: 30;
    readonly 40: 40;
    readonly 50: 50;
    readonly auto: "auto";
};
export type Colors = typeof colors;
export type Spacing = typeof spacing;
export type Typography = typeof typography;
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows;
export type BorderWidth = typeof borderWidth;
export type Opacity = typeof opacity;
export type ZIndex = typeof zIndex;
