import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabItem } from './index'
import { View, Text } from 'react-native'
import React from 'react'

// Sample tab items
const basicItems: TabItem[] = [
  {
    value: 'profile',
    label: 'Profile',
    content: (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 16 }}>Profile content goes here</Text>
      </View>
    ),
  },
  {
    value: 'settings',
    label: 'Settings',
    content: (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 16 }}>Settings content goes here</Text>
      </View>
    ),
  },
  {
    value: 'notifications',
    label: 'Notifications',
    content: (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 16 }}>Notifications content goes here</Text>
      </View>
    ),
  },
]

const manyItems: TabItem[] = [
  {
    value: 'tab1',
    label: 'Tab 1',
    content: <Text style={{ padding: 16 }}>Content for Tab 1</Text>,
  },
  {
    value: 'tab2',
    label: 'Tab 2',
    content: <Text style={{ padding: 16 }}>Content for Tab 2</Text>,
  },
  {
    value: 'tab3',
    label: 'Tab 3',
    content: <Text style={{ padding: 16 }}>Content for Tab 3</Text>,
  },
  {
    value: 'tab4',
    label: 'Tab 4',
    content: <Text style={{ padding: 16 }}>Content for Tab 4</Text>,
  },
  {
    value: 'tab5',
    label: 'Tab 5',
    content: <Text style={{ padding: 16 }}>Content for Tab 5</Text>,
  },
  {
    value: 'tab6',
    label: 'Tab 6',
    content: <Text style={{ padding: 16 }}>Content for Tab 6</Text>,
  },
]

const itemsWithDisabled: TabItem[] = [
  {
    value: 'available',
    label: 'Available',
    content: <Text style={{ padding: 16 }}>This tab is available</Text>,
  },
  {
    value: 'disabled',
    label: 'Disabled',
    content: <Text style={{ padding: 16 }}>This content cannot be accessed</Text>,
    disabled: true,
  },
  {
    value: 'active',
    label: 'Active',
    content: <Text style={{ padding: 16 }}>This tab is active too</Text>,
  },
]

const meta: Meta<typeof Tabs> = {
  title: 'React Native/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'lg', 'xl'],
      description: 'Tab size variant',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Theme variant',
    },
    defaultValue: {
      control: 'text',
      description: 'Default active tab value (uncontrolled)',
    },
    value: {
      control: 'text',
      description: 'Currently active tab value (controlled)',
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, flex: 1 }}>
        <Story />
      </View>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Tabs>

// Basic example
export const Basic: Story = {
  args: {
    items: basicItems,
    size: 'xl',
    theme: 'light',
  },
}

// Size variants
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 40 }}>
      <View>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>
          Small
        </Text>
        <Tabs items={basicItems} size="sm" />
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>
          Large
        </Text>
        <Tabs items={basicItems} size="lg" />
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>
          Extra Large (Default)
        </Text>
        <Tabs items={basicItems} size="xl" />
      </View>
    </View>
  ),
}

// Theme variants
export const Themes: Story = {
  render: () => (
    <View style={{ gap: 40 }}>
      <View>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>
          Light Theme
        </Text>
        <Tabs items={basicItems} theme="light" />
      </View>
      <View style={{ backgroundColor: '#1a1a1a', padding: 16, borderRadius: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12, color: 'white' }}>
          Dark Theme
        </Text>
        <Tabs items={basicItems} theme="dark" />
      </View>
    </View>
  ),
}

// With default value
export const WithDefaultValue: Story = {
  args: {
    items: basicItems,
    defaultValue: 'settings',
    size: 'xl',
  },
}

// Many tabs (horizontal scrolling)
export const ManyTabs: Story = {
  args: {
    items: manyItems,
    size: 'lg',
  },
}

// With disabled tab
export const WithDisabledTab: Story = {
  args: {
    items: itemsWithDisabled,
    size: 'xl',
  },
}

// Controlled example
export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState('profile')
    
    return (
      <View style={{ gap: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>
          Active Tab: {activeTab}
        </Text>
        <Tabs
          items={basicItems}
          value={activeTab}
          onValueChange={setActiveTab}
          size="xl"
        />
      </View>
    )
  },
}

// Complex content example
export const ComplexContent: Story = {
  render: () => {
    const complexItems: TabItem[] = [
      {
        value: 'overview',
        label: 'Overview',
        content: (
          <View style={{ padding: 16, gap: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: '600' }}>Dashboard Overview</Text>
            <Text style={{ fontSize: 14, color: '#666' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
            <View
              style={{
                padding: 16,
                backgroundColor: '#f0f0f0',
                borderRadius: 8,
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16 }}>Some statistics here</Text>
            </View>
          </View>
        ),
      },
      {
        value: 'analytics',
        label: 'Analytics',
        content: (
          <View style={{ padding: 16, gap: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: '600' }}>Analytics Dashboard</Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View
                style={{
                  flex: 1,
                  padding: 16,
                  backgroundColor: '#4C7EFF',
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: 'white', fontWeight: '600' }}>1,234</Text>
                <Text style={{ color: 'white', fontSize: 12 }}>Users</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  padding: 16,
                  backgroundColor: '#60F6D2',
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontWeight: '600' }}>5,678</Text>
                <Text style={{ fontSize: 12 }}>Sessions</Text>
              </View>
            </View>
          </View>
        ),
      },
      {
        value: 'reports',
        label: 'Reports',
        content: (
          <View style={{ padding: 16, gap: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: '600' }}>Reports</Text>
            <Text style={{ fontSize: 14, color: '#666' }}>
              Download or view your reports here
            </Text>
          </View>
        ),
      },
    ]
    
    return <Tabs items={complexItems} size="xl" />
  },
}

// Small size with many tabs
export const SmallWithManyTabs: Story = {
  args: {
    items: manyItems,
    size: 'sm',
  },
}

// Interactive playground
export const Playground: Story = {
  args: {
    items: basicItems,
    size: 'xl',
    theme: 'light',
  },
}

// Dark theme with many tabs
export const DarkThemeScrollable: Story = {
  render: () => (
    <View style={{ backgroundColor: '#1a1a1a', padding: 20, borderRadius: 8 }}>
      <Tabs items={manyItems} theme="dark" size="lg" />
    </View>
  ),
}

// Custom styling example
export const CustomStyling: Story = {
  render: () => (
    <View>
      <Tabs
        items={basicItems}
        size="xl"
        className="bg-gray-50"
        listClassName="px-4"
        contentClassName="bg-white rounded-lg"
      />
    </View>
  ),
}
