import type { Meta, StoryObj } from '@storybook/react'
import { View, Text } from 'react-native'
import { Identifier } from './index'

const meta = {
  title: 'React Native/Identifier',
  component: Identifier,
  argTypes: {
    children: { control: 'text' },
    theme: { control: 'select', options: ['light', 'dark'] },
    highlight: { 
      control: 'select', 
      options: [undefined, 'default', 'dim', 'highlight', 'first', 'last', 'both'] 
    },
    ellipsis: { control: 'boolean' },
    middleEllipsis: { control: 'boolean' },
    maxLines: { control: { type: 'number', min: 0, max: 10, step: 1 } },
    edgeChars: { control: { type: 'number', min: 2, max: 20, step: 1 } },
    avatar: { control: 'boolean' },
    copyButton: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Identifier>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Default identifier with standard text
 */
export const Default: Story = {
  args: {
    children: '8J8k9aQ5Hotx8oLdnYAhYpyBJJGg4wZALptKLuDE9Df6',
  },
}

/**
 * Identifier with avatar
 */
export const WithAvatar: Story = {
  args: {
    children: 'alice',
    avatar: true,
  },
}

/**
 * Identifier with copy button
 */
export const WithCopyButton: Story = {
  args: {
    children: '8J8k9aQ5Hotx8oLdnYAhYpyBJJGg4wZALptKLuDE9Df6',
    copyButton: true,
  },
}

/**
 * Identifier with both avatar and copy button
 */
export const WithAvatarAndCopy: Story = {
  args: {
    children: 'alice@example.com',
    avatar: true,
    copyButton: true,
  },
}

/**
 * All highlight modes showcase
 */
export const HighlightModes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
        Highlight Modes
      </Text>
      
      <View style={{ gap: 12 }}>
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Default (first + last)
          </Text>
          <Identifier highlight="default">
            8J8k9aQ5Hotx8oLdnYAhYpyBJJGg4wZALptKLuDE9Df6
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Dim (all dimmed)
          </Text>
          <Identifier highlight="dim">
            8J8k9aQ5Hotx8oLdnYAhYpyBJJGg4wZALptKLuDE9Df6
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Highlight (all highlighted)
          </Text>
          <Identifier highlight="highlight">
            8J8k9aQ5Hotx8oLdnYAhYpyBJJGg4wZALptKLuDE9Df6
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            First only
          </Text>
          <Identifier highlight="first">
            8J8k9aQ5Hotx8oLdnYAhYpyBJJGg4wZALptKLuDE9Df6
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Last only
          </Text>
          <Identifier highlight="last">
            8J8k9aQ5Hotx8oLdnYAhYpyBJJGg4wZALptKLuDE9Df6
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Both (first + last)
          </Text>
          <Identifier highlight="both">
            8J8k9aQ5Hotx8oLdnYAhYpyBJJGg4wZALptKLuDE9Df6
          </Identifier>
        </View>
      </View>
    </View>
  ),
}

/**
 * Standard ellipsis mode (tail)
 */
export const StandardEllipsis: Story = {
  render: () => (
    <View style={{ gap: 16, maxWidth: 200 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
        Standard Ellipsis (Tail)
      </Text>
      
      <View>
        <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
          Without ellipsis
        </Text>
        <Identifier>
          very-long-identifier-text-that-wraps-to-multiple-lines
        </Identifier>
      </View>
      
      <View>
        <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
          With ellipsis
        </Text>
        <Identifier ellipsis>
          very-long-identifier-text-that-gets-truncated
        </Identifier>
      </View>
    </View>
  ),
}

/**
 * Middle ellipsis mode
 */
export const MiddleEllipsis: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
        Middle Ellipsis
      </Text>
      
      <View style={{ gap: 12 }}>
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Default (4 chars each side)
          </Text>
          <Identifier middleEllipsis>
            8J8k9aQ5Hotx8oLdnYAhYpyBJJGg4wZALptKLuDE9Df6
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Custom (6 chars each side)
          </Text>
          <Identifier middleEllipsis edgeChars={6}>
            8J8k9aQ5Hotx8oLdnYAhYpyBJJGg4wZALptKLuDE9Df6
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Custom (8 chars each side)
          </Text>
          <Identifier middleEllipsis edgeChars={8}>
            8J8k9aQ5Hotx8oLdnYAhYpyBJJGg4wZALptKLuDE9Df6
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Short text (no ellipsis)
          </Text>
          <Identifier middleEllipsis edgeChars={4}>
            short
          </Identifier>
        </View>
      </View>
    </View>
  ),
}

/**
 * MaxLines clamping
 */
export const MaxLinesClamping: Story = {
  render: () => {
    const longText = 'This is a very long identifier text that spans multiple lines and should be clamped based on the maxLines property setting'
    
    return (
      <View style={{ gap: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
          MaxLines Clamping
        </Text>
        
        <View style={{ gap: 12 }}>
          <View>
            <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
              No limit (maxLines=0)
            </Text>
            <Identifier maxLines={0}>
              {longText}
            </Identifier>
          </View>
          
          <View>
            <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
              1 line (maxLines=1)
            </Text>
            <Identifier maxLines={1}>
              {longText}
            </Identifier>
          </View>
          
          <View>
            <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
              2 lines (maxLines=2)
            </Text>
            <Identifier maxLines={2}>
              {longText}
            </Identifier>
          </View>
          
          <View>
            <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
              3 lines (maxLines=3)
            </Text>
            <Identifier maxLines={3}>
              {longText}
            </Identifier>
          </View>
        </View>
      </View>
    )
  },
}

/**
 * Theme variations
 */
export const ThemeVariations: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <View style={{ padding: 16, backgroundColor: '#ffffff' }}>
        <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 12 }}>
          Light Theme
        </Text>
        <View style={{ gap: 8 }}>
          <Identifier theme="light">
            8J8k9aQ5Hotx8oLdnYAhYpyBJJGg4wZALptKLuDE9Df6
          </Identifier>
          <Identifier theme="light" highlight="default">
            8J8k9aQ5Hotx8oLdnYAhYpyBJJGg4wZALptKLuDE9Df6
          </Identifier>
          <Identifier theme="light" avatar copyButton>
            alice
          </Identifier>
        </View>
      </View>
      
      <View style={{ padding: 16, backgroundColor: '#1a1a1a' }}>
        <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 12, color: '#fff' }}>
          Dark Theme
        </Text>
        <View style={{ gap: 8 }}>
          <Identifier theme="dark">
            8J8k9aQ5Hotx8oLdnYAhYpyBJJGg4wZALptKLuDE9Df6
          </Identifier>
          <Identifier theme="dark" highlight="default">
            8J8k9aQ5Hotx8oLdnYAhYpyBJJGg4wZALptKLuDE9Df6
          </Identifier>
          <Identifier theme="dark" avatar copyButton>
            alice
          </Identifier>
        </View>
      </View>
    </View>
  ),
}

/**
 * Empty state variations
 */
export const EmptyStates: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
        Empty States
      </Text>
      
      <View style={{ gap: 12 }}>
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            No children
          </Text>
          <Identifier />
        </View>
        
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Empty string
          </Text>
          <Identifier>{''}</Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            With avatar (no render)
          </Text>
          <Identifier avatar />
        </View>
        
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            With copy button (no render)
          </Text>
          <Identifier copyButton />
        </View>
        
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Dark theme empty
          </Text>
          <View style={{ padding: 8, backgroundColor: '#1a1a1a' }}>
            <Identifier theme="dark" />
          </View>
        </View>
      </View>
    </View>
  ),
}

/**
 * Real-world examples
 */
export const RealWorldExamples: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
        Real-World Examples
      </Text>
      
      <View style={{ gap: 16 }}>
        <View>
          <Text style={{ fontSize: 12, fontWeight: '600', marginBottom: 4 }}>
            Wallet Address
          </Text>
          <Identifier highlight="both" copyButton>
            8J8k9aQ5Hotx8oLdnYAhYpyBJJGg4wZALptKLuDE9Df6
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, fontWeight: '600', marginBottom: 4 }}>
            Transaction Hash
          </Text>
          <Identifier middleEllipsis edgeChars={8} copyButton>
            9kXm2Yn7QpRt3vGh8WzKp5Lx4Nq6Jd1Fs0Cb9Uw7Ve2Mb8Ax3Yz5Hp4Nr6Tg1Qj
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, fontWeight: '600', marginBottom: 4 }}>
            User Email
          </Text>
          <Identifier avatar copyButton>
            alice@example.com
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, fontWeight: '600', marginBottom: 4 }}>
            API Key
          </Text>
          <Identifier highlight="first" copyButton>
            8J8k9aQ5Hotx8oLdnYAhYpyBJJGg4wZALptKLuDE9Df6
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, fontWeight: '600', marginBottom: 4 }}>
            UUID
          </Text>
          <Identifier middleEllipsis edgeChars={6} copyButton>
            550e8400-e29b-41d4-a716-446655440000
          </Identifier>
        </View>
      </View>
    </View>
  ),
}

/**
 * With avatars showcase
 */
export const WithAvatars: Story = {
  render: () => {
    const users = [
      'alice',
      'bob',
      'charlie',
      'diana',
      'emma',
      'frank',
    ]
    
    return (
      <View style={{ gap: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
          User Identifiers with Avatars
        </Text>
        
        <View style={{ gap: 10 }}>
          {users.map((username) => (
            <Identifier key={username} avatar>
              {username}
            </Identifier>
          ))}
        </View>
      </View>
    )
  },
}

/**
 * Different text lengths
 */
export const DifferentLengths: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
        Different Text Lengths
      </Text>
      
      <View style={{ gap: 12 }}>
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Short (5 chars)
          </Text>
          <Identifier highlight="default">
            12345
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Medium (20 chars)
          </Text>
          <Identifier highlight="default">
            12345678901234567890
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Long (40 chars)
          </Text>
          <Identifier highlight="default">
            1234567890123456789012345678901234567890
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Very Long (80 chars)
          </Text>
          <Identifier highlight="default">
            12345678901234567890123456789012345678901234567890123456789012345678901234567890
          </Identifier>
        </View>
      </View>
    </View>
  ),
}

/**
 * Copy button interactions
 */
export const CopyButtonShowcase: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
        Copy Button Showcase
      </Text>
      
      <View style={{ gap: 12 }}>
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Simple text with copy
          </Text>
          <Identifier copyButton>
            simple-identifier
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Highlighted with copy
          </Text>
          <Identifier highlight="both" copyButton>
            8J8k9aQ5Hotx8oLdnYAhYpyBJJGg4wZALptKLuDE9Df6
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Middle ellipsis with copy
          </Text>
          <Identifier middleEllipsis copyButton>
            very-long-identifier-text
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Avatar with copy
          </Text>
          <Identifier avatar copyButton>
            alice@example.com
          </Identifier>
        </View>
      </View>
    </View>
  ),
}

/**
 * Special characters and unicode
 */
export const SpecialCharacters: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
        Special Characters & Unicode
      </Text>
      
      <View style={{ gap: 12 }}>
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Unicode characters
          </Text>
          <Identifier copyButton>
            用户名标识符123
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Emoji
          </Text>
          <Identifier copyButton>
            👤🎨🔑🌟💎
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Special symbols
          </Text>
          <Identifier copyButton>
            id!@#$%^&*()_+-=
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            Mixed content
          </Text>
          <Identifier highlight="default" copyButton>
            user-名字-👤-12345
          </Identifier>
        </View>
      </View>
    </View>
  ),
}

/**
 * Combination showcase
 */
export const CombinationShowcase: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
        Feature Combinations
      </Text>
      
      <View style={{ gap: 16 }}>
        <View>
          <Text style={{ fontSize: 12, fontWeight: '600', marginBottom: 4 }}>
            Avatar + Copy + Highlight
          </Text>
          <Identifier avatar copyButton highlight="both">
            alice-8J8k9aQ
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, fontWeight: '600', marginBottom: 4 }}>
            Avatar + Copy + Middle Ellipsis
          </Text>
          <Identifier avatar copyButton middleEllipsis edgeChars={6}>
            alice-very-long-identifier-text
          </Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, fontWeight: '600', marginBottom: 4 }}>
            Copy + Ellipsis + MaxLines
          </Text>
          <Identifier copyButton ellipsis maxLines={1}>
            very-long-identifier-that-should-be-truncated-with-ellipsis
          </Identifier>
        </View>
        
        <View style={{ padding: 12, backgroundColor: '#1a1a1a' }}>
          <Text style={{ fontSize: 12, fontWeight: '600', marginBottom: 4, color: '#fff' }}>
            Dark Theme + All Features
          </Text>
          <Identifier theme="dark" avatar copyButton highlight="both">
            bob-dark-mode
          </Identifier>
        </View>
      </View>
    </View>
  ),
}

/**
 * Layout and spacing
 */
export const LayoutAndSpacing: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
        Layout & Spacing Examples
      </Text>
      
      <View style={{ gap: 16 }}>
        <View style={{ padding: 12, backgroundColor: '#e5e7eb' }}>
          <Text style={{ fontSize: 12, fontWeight: '600', marginBottom: 8 }}>
            In a container
          </Text>
          <Identifier highlight="both" copyButton>
            8J8k9aQ5Hotx8oLdnYAhYpyBJJGg4wZALptKLuDE9Df6
          </Identifier>
        </View>
        
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <Text style={{ fontSize: 12, fontWeight: '600' }}>Label:</Text>
          <Identifier avatar>alice</Identifier>
        </View>
        
        <View>
          <Text style={{ fontSize: 12, fontWeight: '600', marginBottom: 4 }}>
            Multiple in a list
          </Text>
          <View style={{ gap: 8 }}>
            <Identifier avatar>alice</Identifier>
            <Identifier avatar>bob</Identifier>
            <Identifier avatar>charlie</Identifier>
          </View>
        </View>
      </View>
    </View>
  ),
}

/**
 * Interactive playground
 */
export const Playground: Story = {
  args: {
    children: '8J8k9aQ5Hotx8oLdnYAhYpyBJJGg4wZALptKLuDE9Df6',
    theme: 'light',
    highlight: 'default',
    avatar: false,
    copyButton: false,
    ellipsis: false,
    middleEllipsis: false,
    maxLines: 0,
    edgeChars: 4,
  },
  render: (args) => (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 16 }}>
        Interactive Playground
      </Text>
      <Identifier {...args} />
      <Text style={{ fontSize: 12, color: '#666', marginTop: 16 }}>
        Use the controls panel to customize the identifier
      </Text>
    </View>
  ),
}
