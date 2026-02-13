import type { Meta, StoryObj } from '@storybook/react'
import { View, Text } from 'react-native'
import { Avatar } from './index'

const meta = {
  title: 'React Native/Avatar',
  component: Avatar,
  argTypes: {
    username: { control: 'text' },
    saturation: { control: { type: 'range', min: 0, max: 100, step: 10 } },
    lightness: { control: { type: 'range', min: 0, max: 100, step: 10 } },
    width: { control: { type: 'number', min: 20, max: 200, step: 10 } },
    height: { control: { type: 'number', min: 20, max: 200, step: 10 } },
  },
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Default avatar with standard settings
 */
export const Default: Story = {
  args: {
    username: 'alice',
    width: 40,
    height: 40,
  },
}

/**
 * Different usernames showcase - each generates a unique identicon
 */
export const DifferentUsernames: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="alice" width={40} height={40} />
        <Text style={{ fontSize: 14, fontWeight: '500' }}>alice</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="bob" width={40} height={40} />
        <Text style={{ fontSize: 14, fontWeight: '500' }}>bob</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="charlie" width={40} height={40} />
        <Text style={{ fontSize: 14, fontWeight: '500' }}>charlie</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="diana" width={40} height={40} />
        <Text style={{ fontSize: 14, fontWeight: '500' }}>diana</Text>
      </View>
    </View>
  ),
}

/**
 * Different sizes - small, medium, large
 */
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="alice" width={24} height={24} />
        <Text style={{ fontSize: 14 }}>Small (24x24)</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="alice" width={40} height={40} />
        <Text style={{ fontSize: 14 }}>Medium (40x40)</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="alice" width={64} height={64} />
        <Text style={{ fontSize: 14 }}>Large (64x64)</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="alice" width={96} height={96} />
        <Text style={{ fontSize: 14 }}>Extra Large (96x96)</Text>
      </View>
    </View>
  ),
}

/**
 * Saturation variations - from grayscale to vibrant
 */
export const SaturationVariations: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="alice" width={48} height={48} saturation={0} />
        <Text style={{ fontSize: 14 }}>Saturation: 0% (Grayscale)</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="alice" width={48} height={48} saturation={25} />
        <Text style={{ fontSize: 14 }}>Saturation: 25%</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="alice" width={48} height={48} saturation={50} />
        <Text style={{ fontSize: 14 }}>Saturation: 50% (Default)</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="alice" width={48} height={48} saturation={75} />
        <Text style={{ fontSize: 14 }}>Saturation: 75%</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="alice" width={48} height={48} saturation={100} />
        <Text style={{ fontSize: 14 }}>Saturation: 100% (Vibrant)</Text>
      </View>
    </View>
  ),
}

/**
 * Lightness variations - from dark to light
 */
export const LightnessVariations: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="alice" width={48} height={48} lightness={0} />
        <Text style={{ fontSize: 14 }}>Lightness: 0% (Dark)</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="alice" width={48} height={48} lightness={25} />
        <Text style={{ fontSize: 14 }}>Lightness: 25%</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="alice" width={48} height={48} lightness={50} />
        <Text style={{ fontSize: 14 }}>Lightness: 50% (Default)</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="alice" width={48} height={48} lightness={75} />
        <Text style={{ fontSize: 14 }}>Lightness: 75%</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="alice" width={48} height={48} lightness={100} />
        <Text style={{ fontSize: 14 }}>Lightness: 100% (Light)</Text>
      </View>
    </View>
  ),
}

/**
 * Combined saturation and lightness variations
 */
export const CombinedVariations: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
        Saturation + Lightness Combinations
      </Text>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="alice" width={48} height={48} saturation={0} lightness={50} />
        <Text style={{ fontSize: 14 }}>Grayscale, Medium</Text>
      </View>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="alice" width={48} height={48} saturation={100} lightness={30} />
        <Text style={{ fontSize: 14 }}>Vibrant, Dark</Text>
      </View>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="alice" width={48} height={48} saturation={100} lightness={70} />
        <Text style={{ fontSize: 14 }}>Vibrant, Light</Text>
      </View>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="alice" width={48} height={48} saturation={25} lightness={25} />
        <Text style={{ fontSize: 14 }}>Low Saturation, Dark</Text>
      </View>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar username="alice" width={48} height={48} saturation={75} lightness={50} />
        <Text style={{ fontSize: 14 }}>High Saturation, Medium</Text>
      </View>
    </View>
  ),
}

/**
 * Grid showcase with multiple avatars
 */
export const GridShowcase: Story = {
  render: () => {
    const usernames = [
      'alice', 'bob', 'charlie', 'diana',
      'emma', 'frank', 'grace', 'henry',
      'iris', 'jack', 'kate', 'leo',
    ]
    
    return (
      <View>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 16 }}>
          12 Unique Identicons
        </Text>
        <View 
          style={{ 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            gap: 16,
            justifyContent: 'flex-start',
          }}
        >
          {usernames.map((username) => (
            <View key={username} style={{ alignItems: 'center', width: 60 }}>
              <Avatar username={username} width={48} height={48} />
              <Text style={{ fontSize: 12, marginTop: 4, textAlign: 'center' }}>
                {username}
              </Text>
            </View>
          ))}
        </View>
      </View>
    )
  },
}

/**
 * Size comparison grid
 */
export const SizeComparisonGrid: Story = {
  render: () => {
    const sizes = [
      { size: 24, label: 'XS' },
      { size: 32, label: 'SM' },
      { size: 40, label: 'MD' },
      { size: 48, label: 'LG' },
      { size: 64, label: 'XL' },
      { size: 80, label: '2XL' },
    ]
    
    return (
      <View>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 16 }}>
          Size Comparison
        </Text>
        <View 
          style={{ 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            gap: 20,
            alignItems: 'flex-end',
          }}
        >
          {sizes.map(({ size, label }) => (
            <View key={size} style={{ alignItems: 'center' }}>
              <Avatar username="alice" width={size} height={size} />
              <Text style={{ fontSize: 12, marginTop: 8 }}>
                {label} ({size}px)
              </Text>
            </View>
          ))}
        </View>
      </View>
    )
  },
}

/**
 * Color matrix - showing different usernames with various color settings
 */
export const ColorMatrix: Story = {
  render: () => {
    const usernames = ['alice', 'bob', 'charlie']
    const saturations = [0, 50, 100]
    
    return (
      <View>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 16 }}>
          Color Matrix: Users × Saturation
        </Text>
        
        <View style={{ gap: 16 }}>
          {usernames.map((username) => (
            <View key={username}>
              <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 8 }}>
                {username}
              </Text>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                {saturations.map((sat) => (
                  <View key={sat} style={{ alignItems: 'center' }}>
                    <Avatar 
                      username={username} 
                      width={48} 
                      height={48} 
                      saturation={sat}
                    />
                    <Text style={{ fontSize: 11, marginTop: 4 }}>
                      {sat}%
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    )
  },
}

/**
 * Interactive playground - use controls to customize the avatar
 */
export const Playground: Story = {
  args: {
    username: 'alice',
    width: 64,
    height: 64,
    saturation: 50,
    lightness: 50,
  },
  render: (args) => (
    <View style={{ alignItems: 'center', gap: 16 }}>
      <Avatar {...args} />
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 14, fontWeight: '500' }}>
          {args.username}
        </Text>
        <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
          Size: {args.width}×{args.height} | Sat: {args.saturation}% | Light: {args.lightness}%
        </Text>
      </View>
    </View>
  ),
}

/**
 * Dark theme example
 */
export const DarkTheme: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 8 }}>
        Avatars on Dark Background
      </Text>
      
      <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
        <View style={{ alignItems: 'center' }}>
          <Avatar username="alice" width={48} height={48} />
          <Text style={{ fontSize: 12, color: '#fff', marginTop: 4 }}>Default</Text>
        </View>
        
        <View style={{ alignItems: 'center' }}>
          <Avatar username="alice" width={48} height={48} lightness={60} />
          <Text style={{ fontSize: 12, color: '#fff', marginTop: 4 }}>Lighter</Text>
        </View>
        
        <View style={{ alignItems: 'center' }}>
          <Avatar username="alice" width={48} height={48} saturation={80} lightness={60} />
          <Text style={{ fontSize: 12, color: '#fff', marginTop: 4 }}>Vibrant</Text>
        </View>
      </View>
    </View>
  ),
}
