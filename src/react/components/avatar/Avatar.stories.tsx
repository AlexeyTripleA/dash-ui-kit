import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './index'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    username: {
      control: 'text',
      description: 'Username to generate identicon for'
    },
    saturation: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Saturation level for the identicon (0-100)'
    },
    lightness: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Lightness level for the identicon (0-100)'
    },
    width: {
      control: { type: 'range', min: 16, max: 200, step: 8 },
      description: 'Width of the image'
    },
    height: {
      control: { type: 'range', min: 16, max: 200, step: 8 },
      description: 'Height of the image'
    }
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    username: 'johndoe',
    width: 64,
    height: 64
  },
}

export const HighSaturation: Story = {
  args: {
    username: 'santa',
    saturation: 90,
    width: 64,
    height: 64
  },
}

export const CustomSaturation: Story = {
  args: {
    username: 'alice',
    saturation: 80,
    width: 64,
    height: 64
  },
}

export const CustomLightness: Story = {
  args: {
    username: 'bob',
    lightness: 70,
    width: 64,
    height: 64
  },
}

export const LargeSize: Story = {
  args: {
    username: 'biguser',
    width: 128,
    height: 128
  },
}

export const SmallSize: Story = {
  args: {
    username: 'tiny',
    width: 32,
    height: 32
  },
}

export const DifferentUsernames: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {['alice', 'bob', 'charlie', 'diana', 'eve', 'frank'].map(username => (
        <Avatar
          key={username}
          username={username}
          width={48}
          height={48}
          title={username}
        />
      ))}
    </div>
  ),
}

export const VariousColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Avatar username="user1" saturation={20} lightness={80} width={64} height={64} />
      <Avatar username="user2" saturation={60} lightness={50} width={64} height={64} />
      <Avatar username="user3" saturation={90} lightness={30} width={64} height={64} />
    </div>
  ),
} 