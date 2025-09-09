import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CopyButton } from './index'

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
  parameters: {
    globals: {
      theme: 'dark'
    }
  }
}

export const Disabled: Story = {
  args: {
    text: 'Disabled copy button',
    disabled: true,
  },
} 