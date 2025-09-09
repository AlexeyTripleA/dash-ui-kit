import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './index'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    colorScheme: {
      control: { type: 'inline-radio' },
      options: ['default', 'brand', 'error', 'success'],
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'xl'],
    },
    variant: {
      control: { type: 'inline-radio' },
      options: ['outlined'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    prefix: {
      control: 'text',
      description: 'Text or element displayed before input content'
    },
    showPasswordToggle: {
      control: 'boolean',
      description: 'Show/hide password visibility toggle for password inputs'
    },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    success: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    colorScheme: 'default',
    size: 'xl',
    variant: 'outlined',
  },
}

export const WithPrefix: Story = {
  args: {
    prefix: 'https://',
    placeholder: 'example.com',
    colorScheme: 'default',
    size: 'xl',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
    colorScheme: 'default',
    size: 'xl',
  },
}

export const PasswordWithPrefix: Story = {
  args: {
    type: 'password',
    prefix: 'PIN:',
    placeholder: 'Enter PIN...',
    colorScheme: 'brand',
    size: 'xl',
  },
}

export const Brand: Story = {
  args: {
    placeholder: 'Brand color scheme',
    colorScheme: 'brand',
    size: 'xl',
  },
}

export const Error: Story = {
  args: {
    placeholder: 'Error state',
    error: true,
    size: 'xl',
  },
}

export const Success: Story = {
  args: {
    placeholder: 'Success state',
    success: true,
    size: 'xl',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
    size: 'xl',
  },
}

export const PrefixExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <Input prefix="https://" placeholder="Website URL" />
      <Input prefix="@" placeholder="Username" />
      <Input prefix="$" placeholder="Price" type="number" />
      <Input prefix="+1" placeholder="Phone number" type="tel" />
      <Input prefix="mailto:" placeholder="Email address" type="email" />
    </div>
  ),
}

export const PrefixWithStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Input prefix="https://" placeholder="Normal state" />
      <Input prefix="https://" placeholder="Brand color" colorScheme="brand" />
      <Input prefix="https://" placeholder="Error state" error />
      <Input prefix="https://" placeholder="Success state" success />
      <Input prefix="https://" placeholder="Disabled state" disabled />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="xl" placeholder="Extra large input" />
    </div>
  ),
}

export const SizesWithPrefix: Story = {
  render: () => (
    <div className="space-y-4">
      <Input prefix="$" size="sm" placeholder="Small with prefix" />
      <Input prefix="$" size="md" placeholder="Medium with prefix" />
      <Input prefix="$" size="xl" placeholder="Extra large with prefix" />
    </div>
  ),
}

export const ColorSchemes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input colorScheme="default" placeholder="Default color scheme" />
      <Input colorScheme="brand" placeholder="Brand color scheme" />
      <Input colorScheme="error" placeholder="Error color scheme" />
      <Input colorScheme="success" placeholder="Success color scheme" />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <Input placeholder="Normal state" />
      <Input error placeholder="Error state" />
      <Input success placeholder="Success state" />
      <Input disabled placeholder="Disabled state" />
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="space-y-4">
      <Input type="text" placeholder="Text input" />
      <Input type="password" placeholder="Password input" />
      <Input type="email" placeholder="Email input" />
      <Input type="number" placeholder="Number input" />
      <Input type="tel" placeholder="Phone input" />
      <Input type="url" placeholder="URL input" />
    </div>
  ),
}

export const TypesWithPrefix: Story = {
  render: () => (
    <div className="space-y-4">
      <Input type="text" prefix="@" placeholder="Username" />
      <Input type="password" prefix="PIN:" placeholder="Security code" />
      <Input type="email" prefix="To:" placeholder="recipient@example.com" />
      <Input type="number" prefix="$" placeholder="0.00" />
      <Input type="tel" prefix="+1" placeholder="Phone number" />
      <Input type="url" prefix="https://" placeholder="website.com" />
    </div>
  ),
}

export const DarkTheme: Story = {
  args: {
    placeholder: 'Dark theme input',
    colorScheme: 'brand',
  },
  parameters: {
    globals: {
      theme: 'dark'
    }
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-6 w-80">
        <Story />
      </div>
    ),
  ],
}

export const DarkThemeWithPrefix: Story = {
  args: {
    prefix: 'https://',
    placeholder: 'Dark theme with prefix',
    colorScheme: 'brand',
  },
  parameters: {
    globals: {
      theme: 'dark'
    }
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-6 w-80">
        <Story />
      </div>
    ),
  ],
}

export const PasswordDarkTheme: Story = {
  args: {
    type: 'password',
    placeholder: 'Dark theme password',
    colorScheme: 'brand',
  },
  parameters: {
    globals: {
      theme: 'dark'
    }
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-6 w-80">
        <Story />
      </div>
    ),
  ],
}

export const PasswordWithoutToggle: Story = {
  args: {
    type: 'password',
    placeholder: 'Password without toggle',
    showPasswordToggle: false,
    colorScheme: 'default',
    size: 'xl',
  },
}

export const PasswordWithoutToggleAndPrefix: Story = {
  args: {
    type: 'password',
    prefix: 'PIN:',
    placeholder: 'Enter PIN...',
    showPasswordToggle: false,
    colorScheme: 'brand',
    size: 'xl',
  },
}

export const PasswordVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <Input type="password" placeholder="Password with toggle (default)" />
      <Input type="password" placeholder="Password without toggle" showPasswordToggle={false} />
      <Input type="password" prefix="PIN:" placeholder="PIN with toggle" />
      <Input type="password" prefix="PIN:" placeholder="PIN without toggle" showPasswordToggle={false} />
    </div>
  ),
} 