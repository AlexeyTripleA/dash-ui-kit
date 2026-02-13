import type { Meta, StoryObj } from '@storybook/react'
import { ValueCard } from './index'
import { View, Text } from 'react-native'
import React from 'react'

const meta: Meta<typeof ValueCard> = {
  title: 'React Native/ValueCard',
  component: ValueCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Light or dark theme',
    },
    colorScheme: {
      control: 'select',
      options: ['default', 'transparent', 'green', 'lightBlue', 'white', 'lightGray', 'yellow'],
      description: 'Color scheme',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'xl'],
      description: 'Size variant',
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the card is clickable',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    border: {
      control: 'boolean',
      description: 'Show border',
    },
  },
}

export default meta
type Story = StoryObj<typeof ValueCard>

export const Default: Story = {
  args: {
    children: 'Default Value Card',
  },
}

export const Green: Story = {
  args: {
    children: 'Success Status',
    colorScheme: 'green',
  },
}

export const LightBlue: Story = {
  args: {
    children: 'Brand Colored Card',
    colorScheme: 'lightBlue',
  },
}

export const Yellow: Story = {
  args: {
    children: 'Warning Status',
    colorScheme: 'yellow',
  },
}

export const Transparent: Story = {
  args: {
    children: 'Transparent Card',
    colorScheme: 'transparent',
  },
}

export const White: Story = {
  args: {
    children: 'White Card',
    colorScheme: 'white',
  },
}

export const LightGray: Story = {
  args: {
    children: 'Light Gray Card',
    colorScheme: 'lightGray',
  },
}

export const Clickable: Story = {
  args: {
    children: 'Click Me!',
    clickable: true,
    colorScheme: 'lightBlue',
    onPress: () => {},
  },
}

export const Loading: Story = {
  args: {
    children: 'Loading...',
    loading: true,
    colorScheme: 'lightGray',
  },
}

export const ExtraSmallSize: Story = {
  args: {
    children: 'Extra Small Card',
    size: 'xs',
    colorScheme: 'lightBlue',
  },
}

export const SmallSize: Story = {
  args: {
    children: 'Small Card',
    size: 'sm',
    colorScheme: 'lightBlue',
  },
}

export const LargeSize: Story = {
  args: {
    children: 'Extra Large Card',
    size: 'xl',
    colorScheme: 'green',
  },
}

export const NoBorder: Story = {
  args: {
    children: 'No Border',
    border: false,
    colorScheme: 'lightGray',
  },
}

export const DarkTheme: Story = {
  args: {
    children: 'Dark Theme Card',
    theme: 'dark',
    colorScheme: 'default',
  },
}

export const ClickableWithFeedback: Story = {
  render: () => {
    const [count, setCount] = React.useState(0)
    return (
      <View style={{ gap: 12, alignItems: 'center' }}>
        <ValueCard
          colorScheme="green"
          size="md"
          onPress={() => setCount(count + 1)}
        >
          Press me! ({count})
        </ValueCard>
        <Text style={{ fontSize: 12, color: '#6B7280' }}>
          Tap the card to increment
        </Text>
      </View>
    )
  },
}

export const AllColorSchemes: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <ValueCard colorScheme="default">Default</ValueCard>
      <ValueCard colorScheme="transparent">Transparent</ValueCard>
      <ValueCard colorScheme="green">Green</ValueCard>
      <ValueCard colorScheme="lightBlue">Light Blue</ValueCard>
      <ValueCard colorScheme="white">White</ValueCard>
      <ValueCard colorScheme="lightGray">Light Gray</ValueCard>
      <ValueCard colorScheme="yellow">Yellow</ValueCard>
    </View>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <ValueCard size="xs" colorScheme="lightBlue">Extra Small</ValueCard>
      <ValueCard size="sm" colorScheme="lightBlue">Small</ValueCard>
      <ValueCard size="md" colorScheme="lightBlue">Medium</ValueCard>
      <ValueCard size="xl" colorScheme="lightBlue">Extra Large</ValueCard>
    </View>
  ),
}

export const AllStates: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <ValueCard clickable colorScheme="green" onPress={() => {}}>
        Clickable
      </ValueCard>
      <ValueCard loading colorScheme="lightGray">
        Loading
      </ValueCard>
      <ValueCard border={false} colorScheme="yellow">
        No Border
      </ValueCard>
    </View>
  ),
}

export const WithCustomContent: Story = {
  render: () => (
    <ValueCard colorScheme="lightBlue" size="md">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 24 }}>💰</Text>
        <View>
          <Text style={{ fontWeight: '600', fontSize: 16 }}>Balance</Text>
          <Text style={{ color: '#6B7280', fontSize: 14 }}>1,234.56 DASH</Text>
        </View>
      </View>
    </ValueCard>
  ),
}

export const LoadingVariants: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <ValueCard loading colorScheme="green">
        Green Loading
      </ValueCard>
      <ValueCard loading colorScheme="lightBlue">
        Light Blue Loading
      </ValueCard>
      <ValueCard loading colorScheme="yellow">
        Yellow Loading
      </ValueCard>
    </View>
  ),
}

export const ThemeComparison: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '600' }}>Light Theme</Text>
        <View style={{ gap: 8, padding: 12, backgroundColor: '#fff' }}>
          <ValueCard theme="light" colorScheme="default">Default</ValueCard>
          <ValueCard theme="light" colorScheme="lightGray">Light Gray</ValueCard>
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#fff' }}>Dark Theme</Text>
        <View style={{ gap: 8, padding: 12, backgroundColor: '#1f2937' }}>
          <ValueCard theme="dark" colorScheme="default">Default</ValueCard>
          <ValueCard theme="dark" colorScheme="lightGray">Light Gray</ValueCard>
        </View>
      </View>
    </View>
  ),
}
