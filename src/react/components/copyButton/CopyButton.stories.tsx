import type { Meta, StoryObj } from '@storybook/react'
import { CopyButton } from './index'
import { ThemeProvider } from '../../contexts/ThemeContext'

const meta: Meta<typeof CopyButton> = {
  title: 'Components/CopyButton',
  component: CopyButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Text to copy to clipboard'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'Hello, World!',
  },
}

export const LongText: Story = {
  args: {
    text: 'This is a very long text that will be copied to clipboard when the button is clicked',
  },
}

export const WithCustomClass: Story = {
  args: {
    text: 'Custom styled copy button',
    className: 'p-2 bg-blue-100 rounded',
  },
}

export const DarkTheme: Story = {
  args: {
    text: 'Dark theme copy button',
  },
  decorators: [
    (Story) => (
      <ThemeProvider initialTheme="dark">
        <div className="bg-gray-900 p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export const Disabled: Story = {
  args: {
    text: 'Disabled copy button',
    disabled: true,
  },
} 