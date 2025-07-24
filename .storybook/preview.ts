import type { Preview } from '@storybook/react'
import React from 'react'
import { ThemeProvider } from '../src/react/contexts/ThemeContext'
import '../src/styles/styles.pcss'

const preview: Preview = {
  decorators: [
    (Story) => React.createElement(
      ThemeProvider,
      { initialTheme: "light", children: React.createElement(Story) }
    ),
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;