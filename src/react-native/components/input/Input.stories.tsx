import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './index'
import { View } from 'react-native'
import React, { useState } from 'react'

const meta: Meta<typeof Input> = {
  title: 'React Native/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'filled'],
      description: 'Input style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Input state for validation feedback',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, width: 400 }}>
        <Story />
      </View>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Input>

// Basic variants
export const Outline: Story = {
  args: {
    variant: 'outline',
    placeholder: 'Enter text...',
  },
}

export const Filled: Story = {
  args: {
    variant: 'filled',
    placeholder: 'Enter text...',
  },
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </View>
  ),
}

// States
export const States: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Input state="default" placeholder="Default state" />
      <Input state="error" placeholder="Error state" />
      <Input state="success" placeholder="Success state" />
    </View>
  ),
}

// Disabled
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
    value: 'Cannot edit this',
  },
}

// With value
export const WithValue: Story = {
  args: {
    value: 'Pre-filled value',
    placeholder: 'Enter text...',
  },
}

// Controlled input example
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <View style={{ gap: 12 }}>
        <Input
          value={value}
          onChangeText={setValue}
          placeholder="Type something..."
        />
      </View>
    )
  },
}

// Password input
export const Password: Story = {
  args: {
    secureTextEntry: true,
    placeholder: 'Enter password...',
  },
}

// Email input
export const Email: Story = {
  args: {
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    placeholder: 'Enter email...',
  },
}

// Number input
export const Number: Story = {
  args: {
    keyboardType: 'numeric',
    placeholder: 'Enter number...',
  },
}

// All variants combinations
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 8 }}>
        <Input variant="outline" size="sm" placeholder="Outline Small" />
        <Input variant="outline" size="md" placeholder="Outline Medium" />
        <Input variant="outline" size="lg" placeholder="Outline Large" />
      </View>
      <View style={{ gap: 8 }}>
        <Input variant="filled" size="sm" placeholder="Filled Small" />
        <Input variant="filled" size="md" placeholder="Filled Medium" />
        <Input variant="filled" size="lg" placeholder="Filled Large" />
      </View>
    </View>
  ),
}

// Error state example
export const ErrorState: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const hasError = value.length > 0 && value.length < 3
    
    return (
      <View style={{ gap: 8 }}>
        <Input
          value={value}
          onChangeText={setValue}
          state={hasError ? 'error' : 'default'}
          placeholder="Type at least 3 characters..."
        />
      </View>
    )
  },
}

// Success state example
export const SuccessState: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const isValid = value.length >= 3
    
    return (
      <View style={{ gap: 8 }}>
        <Input
          value={value}
          onChangeText={setValue}
          state={isValid ? 'success' : 'default'}
          placeholder="Type at least 3 characters..."
        />
      </View>
    )
  },
}
