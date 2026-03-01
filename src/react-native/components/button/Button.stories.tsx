import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './index'
import { View, Text } from 'react-native'
import React from 'react'

const meta: Meta<typeof Button> = {
  title: 'React Native/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
      description: 'Button style variant',
    },
    colorScheme: {
      control: 'select',
      options: ['brand', 'mint', 'gray', 'red', 'lightBlue', 'lightGray', 'white', 'halfWhite', 'halfBlue'],
      description: 'Color scheme for the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Button size',
    },
    rounded: {
      control: 'select',
      options: ['default', 'full'],
      description: 'Border radius style',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner',
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20 }}>
        <Story />
      </View>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Button>

// Basic variants
export const Solid: Story = {
  args: {
    variant: 'solid',
    colorScheme: 'brand',
    size: 'md',
    children: 'Solid Button',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    colorScheme: 'brand',
    size: 'md',
    children: 'Outline Button',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    colorScheme: 'brand',
    size: 'md',
    children: 'Ghost Button',
  },
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Button size="sm">Small Button</Button>
      <Button size="md">Medium Button</Button>
      <Button size="lg">Large Button</Button>
      <Button size="xl">Extra Large Button</Button>
    </View>
  ),
}

// Color schemes
export const ColorSchemes: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Button colorScheme="brand">Brand</Button>
      <Button colorScheme="mint">Mint</Button>
      <Button colorScheme="gray">Gray</Button>
      <Button colorScheme="red">Red</Button>
      <Button colorScheme="lightBlue">Light Blue</Button>
      <Button colorScheme="lightGray">Light Gray</Button>
      <Button colorScheme="white">White</Button>
      <Button colorScheme="halfWhite">Half White</Button>
      <Button colorScheme="halfBlue">Half Blue</Button>
    </View>
  ),
}

// States
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
}

// Rounded variants
export const Rounded: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Button rounded="default">Default Rounded</Button>
      <Button rounded="full">Fully Rounded</Button>
    </View>
  ),
}

// All outline variants
export const OutlineVariants: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Button variant="outline" colorScheme="brand">Brand Outline</Button>
      <Button variant="outline" colorScheme="mint">Mint Outline</Button>
      <Button variant="outline" colorScheme="gray">Gray Outline</Button>
      <Button variant="outline" colorScheme="red">Red Outline</Button>
    </View>
  ),
}

// Complex example with custom content
export const WithCustomContent: Story = {
  render: () => (
    <Button variant="solid" colorScheme="brand" size="lg">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>
          Custom Content
        </Text>
      </View>
    </Button>
  ),
}

// Glassmorphism buttons (best viewed on gradient background)
export const GlassmorphismButtons: Story = {
  render: () => (
    <View style={{ 
      gap: 12, 
      alignItems: 'flex-start', 
      padding: 20, 
      backgroundColor: '#4D5895',
      borderRadius: 16
    }}>
      <Button colorScheme="white" rounded="full">White Button</Button>
      <Button colorScheme="halfWhite" rounded="full">Half White Button</Button>
      <Button colorScheme="halfBlue" rounded="full">Half Blue Button</Button>
      <Button colorScheme="white" rounded="full" variant="outline">White Outline</Button>
      <Button colorScheme="halfWhite" rounded="full" variant="outline">Half White Outline</Button>
      <Button colorScheme="halfBlue" rounded="full" variant="outline">Half Blue Outline</Button>
    </View>
  ),
}

// Interactive example
export const Interactive: Story = {
  args: {
    variant: 'solid',
    colorScheme: 'brand',
    size: 'md',
    children: 'Click Me',
    onPress: () => alert('Button pressed!'),
  },
}
