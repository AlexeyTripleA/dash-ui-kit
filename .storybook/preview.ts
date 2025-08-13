import type { Preview } from '@storybook/react'
import React from 'react'
import { ThemeProvider } from '../src/react/contexts/ThemeContext'
import '../src/styles/styles.pcss'

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light'
      return React.createElement(
        ThemeProvider,
        { 
          initialTheme: theme,
          children: React.createElement(
            'div',
            { 
              style: { 
                backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
                minHeight: '100vh',
                padding: '20px'
              }
            },
            React.createElement(Story)
          )
        }
      )
    },
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;