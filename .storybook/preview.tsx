import type { Preview } from '@storybook/react'
import React from 'react'
import { ThemeProvider } from '../src/react/contexts/ThemeContext'
import '../src/styles/styles.pcss'

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider initialTheme="light">
        <Story />
      </ThemeProvider>
    )
  ]
}

export default preview
