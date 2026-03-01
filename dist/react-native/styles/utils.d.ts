/**
 * Utility functions for React Native styles
 */
/**
 * Creates an rgba color string from hex color and opacity
 *
 * @param hexColor - Hex color string (e.g., '#4C7EFF')
 * @param alpha - Opacity value between 0 and 1
 * @returns rgba color string
 *
 * @example
 * ```typescript
 * rgba('#4C7EFF', 0.5) // 'rgba(76, 126, 255, 0.5)'
 * rgba('#40BF40', 0.15) // 'rgba(64, 191, 64, 0.15)'
 * ```
 */
export declare function rgba(hexColor: string, alpha: number): string;
/**
 * Converts hex color to rgba
 * Alias for rgba() with more explicit naming
 *
 * @param hexColor - Hex color string
 * @param alpha - Opacity value between 0 and 1
 * @returns rgba color string
 */
export declare function hexToRgba(hexColor: string, alpha: number): string;
/**
 * Shadow style type for iOS platform
 */
type IOSShadowStyle = {
    shadowColor: string;
    shadowOffset: {
        width: number;
        height: number;
    };
    shadowOpacity: number;
    shadowRadius: number;
};
/**
 * Shadow style type for Android platform
 */
type AndroidShadowStyle = {
    elevation: number;
};
/**
 * Gets platform-specific shadow styles
 *
 * @param size - Shadow size: 'sm' | 'md' | 'lg' | 'xl'
 * @returns Platform-specific shadow styles
 *
 * @example
 * ```typescript
 * const styles = StyleSheet.create({
 *   card: {
 *     ...getShadow('md'),
 *   },
 * });
 * ```
 */
export declare function getShadow(size: 'sm' | 'md' | 'lg' | 'xl'): IOSShadowStyle | AndroidShadowStyle;
/**
 * Type guard to check if value is a valid spacing key
 */
export declare function isSpacingKey(value: any): value is keyof typeof import('./tokens').spacing;
export {};
