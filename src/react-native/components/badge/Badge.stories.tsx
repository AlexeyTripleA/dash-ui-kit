import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './index'
import { View, Text } from 'react-native'
import React from 'react'

const meta: Meta<typeof Badge> = {
  title: 'React Native/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'flat', 'solid', 'bordered'],
      description: 'Visual style variant',
    },
    color: {
      control: 'select',
      options: ['blue', 'white', 'gray', 'light-gray', 'turquoise', 'red', 'orange'],
      description: 'Color theme',
    },
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'xl'],
      description: 'Badge size',
    },
    borderRadius: {
      control: 'select',
      options: ['default', 'xs'],
      description: 'Border radius variant',
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

// Basic variants with blue color
export const Default: Story = {
  args: {
    variant: 'default',
    color: 'blue',
    size: 'sm',
    children: 'Default Badge',
  },
}

export const Flat: Story = {
  args: {
    variant: 'flat',
    color: 'blue',
    size: 'sm',
    children: 'Flat Badge',
  },
}

export const Solid: Story = {
  args: {
    variant: 'solid',
    color: 'blue',
    size: 'sm',
    children: 'Solid Badge',
  },
}

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    color: 'blue',
    size: 'sm',
    children: 'Bordered Badge',
  },
}

// All sizes
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Badge size="xxs" color="blue" variant="solid">XXS Badge</Badge>
      <Badge size="xs" color="blue" variant="solid">XS Badge</Badge>
      <Badge size="sm" color="blue" variant="solid">SM Badge</Badge>
      <Badge size="xl" color="blue" variant="solid">XL Badge</Badge>
    </View>
  ),
}

// All colors with solid variant
export const ColorsSolid: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Badge color="blue" variant="solid">Blue Solid</Badge>
      <Badge color="white" variant="solid">White Solid</Badge>
      <Badge color="gray" variant="solid">Gray Solid</Badge>
      <Badge color="light-gray" variant="solid">Light Gray Solid</Badge>
      <Badge color="turquoise" variant="solid">Turquoise Solid</Badge>
      <Badge color="red" variant="solid">Red Solid</Badge>
      <Badge color="orange" variant="solid">Orange Solid</Badge>
    </View>
  ),
}

// All colors with flat variant
export const ColorsFlat: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Badge color="blue" variant="flat">Blue Flat</Badge>
      <Badge color="white" variant="flat">White Flat</Badge>
      <Badge color="gray" variant="flat">Gray Flat</Badge>
      <Badge color="light-gray" variant="flat">Light Gray Flat</Badge>
      <Badge color="turquoise" variant="flat">Turquoise Flat</Badge>
      <Badge color="red" variant="flat">Red Flat</Badge>
      <Badge color="orange" variant="flat">Orange Flat</Badge>
    </View>
  ),
}

// All colors with bordered variant
export const ColorsBordered: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Badge color="blue" variant="bordered">Blue Bordered</Badge>
      <Badge color="white" variant="bordered">White Bordered</Badge>
      <Badge color="gray" variant="bordered">Gray Bordered</Badge>
      <Badge color="light-gray" variant="bordered">Light Gray Bordered</Badge>
      <Badge color="turquoise" variant="bordered">Turquoise Bordered</Badge>
      <Badge color="red" variant="bordered">Red Bordered</Badge>
      <Badge color="orange" variant="bordered">Orange Bordered</Badge>
    </View>
  ),
}

// All colors with default variant
export const ColorsDefault: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Badge color="blue" variant="default">Blue Default</Badge>
      <Badge color="white" variant="default">White Default</Badge>
      <Badge color="gray" variant="default">Gray Default</Badge>
      <Badge color="light-gray" variant="default">Light Gray Default</Badge>
      <Badge color="turquoise" variant="default">Turquoise Default</Badge>
      <Badge color="red" variant="default">Red Default</Badge>
      <Badge color="orange" variant="default">Orange Default</Badge>
    </View>
  ),
}

// Border radius variants
export const BorderRadiusVariants: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Badge color="blue" variant="solid">Default Border Radius (Full)</Badge>
      <Badge color="blue" variant="solid" borderRadius="xs">XS Border Radius</Badge>
    </View>
  ),
}

// Blue color - all variants and sizes
export const BlueVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 8 }}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>Default</Text>
        <View style={{ gap: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Badge color="blue" variant="default" size="xxs">XXS</Badge>
          <Badge color="blue" variant="default" size="xs">XS</Badge>
          <Badge color="blue" variant="default" size="sm">SM</Badge>
          <Badge color="blue" variant="default" size="xl">XL</Badge>
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>Flat</Text>
        <View style={{ gap: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Badge color="blue" variant="flat" size="xxs">XXS</Badge>
          <Badge color="blue" variant="flat" size="xs">XS</Badge>
          <Badge color="blue" variant="flat" size="sm">SM</Badge>
          <Badge color="blue" variant="flat" size="xl">XL</Badge>
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>Solid</Text>
        <View style={{ gap: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Badge color="blue" variant="solid" size="xxs">XXS</Badge>
          <Badge color="blue" variant="solid" size="xs">XS</Badge>
          <Badge color="blue" variant="solid" size="sm">SM</Badge>
          <Badge color="blue" variant="solid" size="xl">XL</Badge>
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>Bordered</Text>
        <View style={{ gap: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Badge color="blue" variant="bordered" size="xxs">XXS</Badge>
          <Badge color="blue" variant="bordered" size="xs">XS</Badge>
          <Badge color="blue" variant="bordered" size="sm">SM</Badge>
          <Badge color="blue" variant="bordered" size="xl">XL</Badge>
        </View>
      </View>
    </View>
  ),
}

// Red color - all variants and sizes
export const RedVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 8 }}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>Default</Text>
        <View style={{ gap: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Badge color="red" variant="default" size="xxs">XXS</Badge>
          <Badge color="red" variant="default" size="xs">XS</Badge>
          <Badge color="red" variant="default" size="sm">SM</Badge>
          <Badge color="red" variant="default" size="xl">XL</Badge>
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>Flat</Text>
        <View style={{ gap: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Badge color="red" variant="flat" size="xxs">XXS</Badge>
          <Badge color="red" variant="flat" size="xs">XS</Badge>
          <Badge color="red" variant="flat" size="sm">SM</Badge>
          <Badge color="red" variant="flat" size="xl">XL</Badge>
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>Solid</Text>
        <View style={{ gap: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Badge color="red" variant="solid" size="xxs">XXS</Badge>
          <Badge color="red" variant="solid" size="xs">XS</Badge>
          <Badge color="red" variant="solid" size="sm">SM</Badge>
          <Badge color="red" variant="solid" size="xl">XL</Badge>
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>Bordered</Text>
        <View style={{ gap: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Badge color="red" variant="bordered" size="xxs">XXS</Badge>
          <Badge color="red" variant="bordered" size="xs">XS</Badge>
          <Badge color="red" variant="bordered" size="sm">SM</Badge>
          <Badge color="red" variant="bordered" size="xl">XL</Badge>
        </View>
      </View>
    </View>
  ),
}

// Turquoise color - all variants and sizes
export const TurquoiseVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 8 }}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>Default</Text>
        <View style={{ gap: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Badge color="turquoise" variant="default" size="xxs">XXS</Badge>
          <Badge color="turquoise" variant="default" size="xs">XS</Badge>
          <Badge color="turquoise" variant="default" size="sm">SM</Badge>
          <Badge color="turquoise" variant="default" size="xl">XL</Badge>
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>Flat</Text>
        <View style={{ gap: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Badge color="turquoise" variant="flat" size="xxs">XXS</Badge>
          <Badge color="turquoise" variant="flat" size="xs">XS</Badge>
          <Badge color="turquoise" variant="flat" size="sm">SM</Badge>
          <Badge color="turquoise" variant="flat" size="xl">XL</Badge>
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>Solid</Text>
        <View style={{ gap: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Badge color="turquoise" variant="solid" size="xxs">XXS</Badge>
          <Badge color="turquoise" variant="solid" size="xs">XS</Badge>
          <Badge color="turquoise" variant="solid" size="sm">SM</Badge>
          <Badge color="turquoise" variant="solid" size="xl">XL</Badge>
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>Bordered</Text>
        <View style={{ gap: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Badge color="turquoise" variant="bordered" size="xxs">XXS</Badge>
          <Badge color="turquoise" variant="bordered" size="xs">XS</Badge>
          <Badge color="turquoise" variant="bordered" size="sm">SM</Badge>
          <Badge color="turquoise" variant="bordered" size="xl">XL</Badge>
        </View>
      </View>
    </View>
  ),
}

// Interactive badge with onPress
export const Interactive: Story = {
  render: () => {
    const [count, setCount] = React.useState(0)
    return (
      <View style={{ gap: 12, alignItems: 'center' }}>
        <Badge 
          color="blue" 
          variant="solid" 
          size="sm"
          onPress={() => setCount(count + 1)}
        >
          Press me! ({count})
        </Badge>
        <Text style={{ color: 'white', fontSize: 12 }}>
          Tap the badge to increment the counter
        </Text>
      </View>
    )
  },
}

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Badge 
        color="blue" 
        variant="solid" 
        className="shadow-lg"
      >
        With Shadow
      </Badge>
      <Badge 
        color="turquoise" 
        variant="bordered" 
        style={{ marginTop: 20 }}
      >
        With Custom Margin
      </Badge>
      <Badge 
        color="red" 
        variant="flat" 
        className="opacity-70"
      >
        With Opacity
      </Badge>
    </View>
  ),
}

// All color combinations in a grid
export const AllCombinations: Story = {
  render: () => {
    const colors = ['blue', 'white', 'gray', 'light-gray', 'turquoise', 'red', 'orange'] as const
    const variants = ['default', 'flat', 'solid', 'bordered'] as const

    return (
      <View style={{ gap: 20 }}>
        {variants.map((variant) => (
          <View key={variant} style={{ gap: 8 }}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '600', textTransform: 'capitalize' }}>
              {variant}
            </Text>
            <View style={{ gap: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
              {colors.map((color) => (
                <Badge key={`${variant}-${color}`} color={color} variant={variant} size="xs">
                  {color}
                </Badge>
              ))}
            </View>
          </View>
        ))}
      </View>
    )
  },
}

// Real-world usage examples
export const UsageExamples: Story = {
  render: () => (
    <View style={{ gap: 20, alignItems: 'flex-start' }}>
      <View style={{ gap: 8 }}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>Status Badges</Text>
        <View style={{ gap: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Badge color="turquoise" variant="flat" size="xs">Active</Badge>
          <Badge color="orange" variant="flat" size="xs">Pending</Badge>
          <Badge color="red" variant="flat" size="xs">Inactive</Badge>
          <Badge color="gray" variant="flat" size="xs">Draft</Badge>
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>Category Tags</Text>
        <View style={{ gap: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Badge color="blue" variant="bordered" size="xs">React Native</Badge>
          <Badge color="turquoise" variant="bordered" size="xs">TypeScript</Badge>
          <Badge color="orange" variant="bordered" size="xs">Design</Badge>
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>Notification Counts</Text>
        <View style={{ gap: 8, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>Messages</Text>
            <Badge color="red" variant="solid" size="xxs">3</Badge>
          </View>
          <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>Notifications</Text>
            <Badge color="blue" variant="solid" size="xxs">12</Badge>
          </View>
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>Labels</Text>
        <View style={{ gap: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Badge color="turquoise" variant="solid" size="xs">New</Badge>
          <Badge color="orange" variant="solid" size="xs">Hot</Badge>
          <Badge color="blue" variant="solid" size="xs">Featured</Badge>
        </View>
      </View>
    </View>
  ),
}
