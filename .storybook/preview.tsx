import type { Preview } from '@storybook/react'
import React from 'react'
import { ThemeProvider } from '../src/react/contexts/ThemeContext'
import '../src/styles/styles.pcss'

// Add React Native Web root styling
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    #storybook-root {
      width: 100%;
      height: 100%;
    }
    /* Ensure React Native components render properly */
    * {
      box-sizing: border-box;
    }
  `
  document.head.appendChild(style)
}

const preview: Preview = {
  decorators: [
    (Story, context) => {
      // Check if it's a React Native story
      const isReactNative = context.title.startsWith('React Native')
      
      if (isReactNative) {
        // For React Native stories, don't use ThemeProvider
        return <Story />
      }
      
      // For React stories, use ThemeProvider
      return (
        <ThemeProvider initialTheme='light'>
          <Story />
        </ThemeProvider>
      )
    }
  ],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a202c' },
      ],
    },
  },
}

export default preview
