import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './index'
import { View } from 'react-native'
import React from 'react'

const meta: Meta<typeof Text> = {
  title: 'React Native/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['body', 'caption', 'label'],
      description: 'Text variant/size',
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
    },
    color: {
      control: 'select',
      options: ['default', 'blue', 'red', 'gray'],
      description: 'Text color',
    },
    italic: {
      control: 'boolean',
      description: 'Italic style',
    },
    underline: {
      control: 'boolean',
      description: 'Underline text',
    },
    lineThrough: {
      control: 'boolean',
      description: 'Strike through text',
    },
    transform: {
      control: 'select',
      options: ['none', 'uppercase', 'capitalize'],
      description: 'Text transformation',
    },
    opacity: {
      control: 'select',
      options: [100, 80, 60, 40],
      description: 'Text opacity',
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, maxWidth: 600 }}>
        <Story />
      </View>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Text>

// Basic variants
export const Body: Story = {
  args: {
    variant: 'body',
    children: "This is a body text. It's used for regular content and paragraphs.",
  },
}

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'This is a caption text. Smaller than body, used for secondary information.',
  },
}

export const Label: Story = {
  args: {
    variant: 'label',
    children: 'This is a label text. The smallest variant, used for labels and hints.',
  },
}

// Variants showcase
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Text variant="body">Body text - 16px</Text>
      <Text variant="caption">Caption text - 14px</Text>
      <Text variant="label">Label text - 12px</Text>
    </View>
  ),
}

// Weights
export const Weights: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Text weight="regular">Regular weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </View>
  ),
}

// Colors
export const Colors: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Text color="default">Default color</Text>
      <Text color="blue">Blue color</Text>
      <Text color="red">Red color</Text>
      <Text color="gray">Gray color</Text>
    </View>
  ),
}

// Text styles
export const Styles: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Text>Normal text</Text>
      <Text italic>Italic text</Text>
      <Text underline>Underlined text</Text>
      <Text lineThrough>Strike through text</Text>
    </View>
  ),
}

// Text transformations
export const Transformations: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Text transform="none">No transformation</Text>
      <Text transform="uppercase">uppercase text</Text>
      <Text transform="capitalize">capitalize each word</Text>
    </View>
  ),
}

// Opacity levels
export const OpacityLevels: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Text opacity={100}>100% opacity</Text>
      <Text opacity={80}>80% opacity</Text>
      <Text opacity={60}>60% opacity</Text>
      <Text opacity={40}>40% opacity</Text>
    </View>
  ),
}

// Combined styles
export const CombinedStyles: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Text variant="body" weight="bold" color="blue">
        Bold blue body text
      </Text>
      <Text variant="caption" weight="medium" color="gray" italic>
        Medium gray italic caption
      </Text>
      <Text variant="label" weight="semibold" color="red" transform="uppercase">
        Uppercase semibold red label
      </Text>
      <Text variant="body" underline color="blue">
        Underlined blue link-like text
      </Text>
    </View>
  ),
}

// Paragraph example
export const Paragraph: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Text variant="body" weight="bold">
        Lorem Ipsum
      </Text>
      <Text variant="body" color="gray">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
        quis nostrud exercitation ullamco laboris.
      </Text>
      <Text variant="caption" color="gray" italic>
        Published on February 9, 2026
      </Text>
    </View>
  ),
}

// Interactive text
export const Interactive: Story = {
  args: {
    color: 'blue',
    underline: true,
    children: 'Click this link',
    onPress: () => alert('Text pressed!'),
  },
}
