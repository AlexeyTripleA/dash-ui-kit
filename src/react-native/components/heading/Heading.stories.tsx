import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from './index'
import { View } from 'react-native'
import React from 'react'

const meta: Meta<typeof Heading> = {
  title: 'React Native/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Semantic heading level (1-6)',
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold', 'extrabold'],
      description: 'Font weight',
    },
    color: {
      control: 'select',
      options: ['default', 'black', 'gray', 'blue', 'red', 'green'],
      description: 'Text color',
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
type Story = StoryObj<typeof Heading>

// Basic levels
export const Level1: Story = {
  args: {
    level: 1,
    children: 'Heading Level 1',
  },
}

export const Level2: Story = {
  args: {
    level: 2,
    children: 'Heading Level 2',
  },
}

export const Level3: Story = {
  args: {
    level: 3,
    children: 'Heading Level 3',
  },
}

export const Level4: Story = {
  args: {
    level: 4,
    children: 'Heading Level 4',
  },
}

export const Level5: Story = {
  args: {
    level: 5,
    children: 'Heading Level 5',
  },
}

export const Level6: Story = {
  args: {
    level: 6,
    children: 'Heading Level 6',
  },
}

// All levels showcase
export const AllLevels: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Heading level={1}>Heading 1 - 36px</Heading>
      <Heading level={2}>Heading 2 - 30px</Heading>
      <Heading level={3}>Heading 3 - 24px</Heading>
      <Heading level={4}>Heading 4 - 20px</Heading>
      <Heading level={5}>Heading 5 - 18px</Heading>
      <Heading level={6}>Heading 6 - 16px</Heading>
    </View>
  ),
}

// Weights
export const Weights: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Heading level={3} weight="normal">Normal weight</Heading>
      <Heading level={3} weight="medium">Medium weight</Heading>
      <Heading level={3} weight="semibold">Semibold weight</Heading>
      <Heading level={3} weight="bold">Bold weight</Heading>
      <Heading level={3} weight="extrabold">Extrabold weight</Heading>
    </View>
  ),
}

// Colors
export const Colors: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Heading level={3} color="default">Default color</Heading>
      <Heading level={3} color="black">Black color</Heading>
      <Heading level={3} color="gray">Gray color</Heading>
      <Heading level={3} color="blue">Blue color</Heading>
      <Heading level={3} color="red">Red color</Heading>
      <Heading level={3} color="green">Green color</Heading>
    </View>
  ),
}

// Page title example
export const PageTitle: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Heading level={1} weight="extrabold">
        Welcome to Dashboard
      </Heading>
      <Heading level={4} weight="normal" color="gray">
        Your personal analytics hub
      </Heading>
    </View>
  ),
}

// Section headers
export const SectionHeaders: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View style={{ gap: 8 }}>
        <Heading level={2} weight="bold">
          Recent Activity
        </Heading>
        <Heading level={5} weight="medium" color="gray">
          Last 7 days
        </Heading>
      </View>
      
      <View style={{ gap: 8 }}>
        <Heading level={3} weight="semibold">
          Statistics
        </Heading>
        <Heading level={6} weight="normal" color="gray">
          Overview of your metrics
        </Heading>
      </View>
    </View>
  ),
}

// Card headers
export const CardHeaders: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 4 }}>
        <Heading level={4} weight="bold">
          Total Revenue
        </Heading>
        <Heading level={2} weight="extrabold" color="green">
          $45,231
        </Heading>
      </View>
      
      <View style={{ gap: 4 }}>
        <Heading level={4} weight="bold">
          Active Users
        </Heading>
        <Heading level={2} weight="extrabold" color="blue">
          2,453
        </Heading>
      </View>
    </View>
  ),
}

// Alert headings
export const AlertHeadings: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Heading level={4} weight="bold" color="blue">
        Information
      </Heading>
      <Heading level={4} weight="bold" color="green">
        Success
      </Heading>
      <Heading level={4} weight="bold" color="red">
        Error
      </Heading>
    </View>
  ),
}

// Responsive hierarchy
export const ResponsiveHierarchy: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <Heading level={1} weight="extrabold">
        Main Title
      </Heading>
      <Heading level={2} weight="bold" color="gray">
        Subtitle
      </Heading>
      <Heading level={3} weight="semibold">
        Section Heading
      </Heading>
      <Heading level={4} weight="medium">
        Subsection Heading
      </Heading>
      <Heading level={5} weight="medium" color="gray">
        Minor Heading
      </Heading>
      <Heading level={6} weight="normal" color="gray">
        Small Label Heading
      </Heading>
    </View>
  ),
}

// Interactive heading
export const Interactive: Story = {
  args: {
    level: 3,
    color: 'blue',
    children: 'Click this heading',
    onPress: () => alert('Heading pressed!'),
  },
}
