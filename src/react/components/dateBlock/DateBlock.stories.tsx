import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DateBlock } from './index'

const meta: Meta<typeof DateBlock> = {
  title: 'Components/DateBlock',
  component: DateBlock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    timestamp: {
      control: 'date',
      description: 'Unix timestamp (ms), Date object, or parsable date string'
    },
    format: {
      control: 'select',
      options: ['all', 'deltaOnly', 'dateOnly'],
      description: 'Display format: full date+delta, delta only, or date only'
    },
    showTime: {
      control: 'boolean',
      description: 'Include hours and minutes in formatted date'
    },
    showRelativeTooltip: {
      control: 'boolean',
      description: 'Show a tooltip with relative time'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for wrapper div'
    }
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Helper to create dates relative to now
const now = new Date()
const hoursAgo = (hours: number) => new Date(now.getTime() - hours * 60 * 60 * 1000)
const hoursFromNow = (hours: number) => new Date(now.getTime() + hours * 60 * 60 * 1000)
const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
const daysFromNow = (days: number) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000)

export const AllFormatDefault: Story = {
  args: {
    timestamp: daysAgo(2),
    format: 'all'
  },
}

export const DeltaOnly: Story = {
  args: {
    timestamp: hoursAgo(5),
    format: 'deltaOnly'
  },
}

export const DateOnly: Story = {
  args: {
    timestamp: daysAgo(7),
    format: 'dateOnly'
  },
}

export const WithTime: Story = {
  args: {
    timestamp: new Date('2024-01-15T14:30:45Z'),
    format: 'all',
    showTime: true
  },
}

export const WithoutTime: Story = {
  args: {
    timestamp: new Date('2024-01-15T14:30:45Z'),
    format: 'all',
    showTime: false
  },
}

export const RecentHours: Story = {
  args: {
    timestamp: hoursAgo(3),
    format: 'all'
  },
}

export const RecentMinutes: Story = {
  args: {
    timestamp: new Date(now.getTime() - 25 * 60 * 1000), // 25 minutes ago
    format: 'all'
  },
}

export const RecentSeconds: Story = {
  args: {
    timestamp: new Date(now.getTime() - 45 * 1000), // 45 seconds ago
    format: 'all'
  },
}

export const FutureDate: Story = {
  args: {
    timestamp: daysFromNow(3),
    format: 'all'
  },
}

export const FutureHours: Story = {
  args: {
    timestamp: hoursFromNow(8),
    format: 'all'
  },
}

export const WithCustomClass: Story = {
  args: {
    timestamp: daysAgo(1),
    format: 'all',
    className: 'p-4 bg-gray-100 rounded-md'
  },
}

export const StringTimestamp: Story = {
  args: {
    timestamp: '2024-01-15T10:30:00Z',
    format: 'all'
  },
}

export const NumericTimestamp: Story = {
  args: {
    timestamp: new Date('2024-01-15T10:30:00Z').getTime(),
    format: 'all'
  },
}

export const LongAgo: Story = {
  args: {
    timestamp: new Date('2020-06-15T12:00:00Z'),
    format: 'all'
  },
}

export const VeryRecent: Story = {
  args: {
    timestamp: new Date(now.getTime() - 5 * 1000), // 5 seconds ago
    format: 'all'
  },
}

export const DeltaOnlyFuture: Story = {
  args: {
    timestamp: hoursFromNow(12),
    format: 'deltaOnly'
  },
}

export const DateOnlyWithTime: Story = {
  args: {
    timestamp: new Date('2024-01-15T16:45:00Z'),
    format: 'dateOnly',
    showTime: true
  },
} 