import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './index'
import { ThemeProvider } from '../../contexts/ThemeContext'

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
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    success: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="w-80">
          <Story />
        </div>
      </ThemeProvider>
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

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
    colorScheme: 'default',
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

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="xl" placeholder="Extra large input" />
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

export const DarkTheme: Story = {
  args: {
    placeholder: 'Dark theme input',
    colorScheme: 'brand',
  },
  decorators: [
    (Story) => (
      <ThemeProvider initialTheme="dark">
        <div className="bg-gray-900 p-6 w-80">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export const PasswordDarkTheme: Story = {
  args: {
    type: 'password',
    placeholder: 'Dark theme password',
    colorScheme: 'brand',
  },
  decorators: [
    (Story) => (
      <ThemeProvider initialTheme="dark">
        <div className="bg-gray-900 p-6 w-80">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} 