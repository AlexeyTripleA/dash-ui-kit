/**
 * Tailwind utility for React Native using twrnc
 * Converts Tailwind className strings to React Native style objects
 */
import { create } from 'twrnc'

// Inline Tailwind config with Dash brand colors for React Native
// Colors from src/styles/theme.pcss
const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        // Dash brand colors - matching Web version
        'dash-brand': '#4C7EFF',       // Primary brand color
        'dash-brand-dim': '#96A7FF',   // Dimmed brand color
        'dash-brand-dark': '#4D5895',  // Dark brand color
        'dash-brand-darkness': '#13172A', // Darkest brand color
        'dash-mint': '#60F6D2',        // Mint/teal color
        'dash-mint-hover': '#4DD4B1',  // Mint hover state
        'dash-yellow-light': '#FEF3C7', // Light yellow
        'dash-yellow': '#FDE68A',      // Yellow
        'dash-primary-die-subdued': '#0c1c3308', // Subdued color with alpha
        'dash-primary-dark-blue': '#0C1C33', // Dark blue
        // State colors
        'dash-green': '#40BF40',
        'dash-red': '#CD2E00',
        'dash-orange': '#F98F12',
      },
    },
  },
}

// Create a tailwind instance with React Native compatible colors
export const tw = create(tailwindConfig)

/**
 * Helper to convert className string to React Native style object
 * @param className - Tailwind class names string
 * @returns React Native style object
 */
export const cn = (className: string) => tw`${className}`
