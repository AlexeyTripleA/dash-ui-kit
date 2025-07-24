import type { Meta, StoryObj } from '@storybook/react'
import { TimeDelta } from './index'

const meta: Meta<typeof TimeDelta> = {
  title: 'Components/TimeDelta',
  component: TimeDelta,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    startDate: {
      control: 'date',
      description: 'Start date for delta calculation, defaults to now'
    },
    endDate: {
      control: 'date',
      description: 'End date or timestamp'
    },
    format: {
      control: 'select',
      options: ['default', 'detailed'],
      description: 'Format mode: default shows delta with suffix, detailed shows breakdown'
    },
    showTimestampTooltip: {
      control: 'boolean',
      description: 'Show tooltip with exact timestamp'
    },
    tooltipDate: {
      control: 'date',
      description: 'Override date for tooltip instead of endDate'
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

export const OneHourAgo: Story = {
  args: {
    endDate: hoursAgo(1),
    format: 'default'
  },
}

export const ThreeHoursLeft: Story = {
  args: {
    endDate: hoursFromNow(3),
    format: 'default'
  },
}

export const TwoDaysAgo: Story = {
  args: {
    endDate: daysAgo(2),
    format: 'default'
  },
}

export const OneWeekFromNow: Story = {
  args: {
    endDate: daysFromNow(7),
    format: 'default'
  },
}

export const DetailedFormat: Story = {
  args: {
    startDate: new Date('2024-01-01T10:00:00Z'),
    endDate: new Date('2024-01-02T14:30:15Z'),
    format: 'detailed'
  },
}

export const CustomStartDate: Story = {
  args: {
    startDate: hoursAgo(5),
    endDate: hoursAgo(2),
    format: 'default'
  },
}

export const MinutesAgo: Story = {
  args: {
    endDate: new Date(now.getTime() - 15 * 60 * 1000), // 15 minutes ago
    format: 'default'
  },
}

export const SecondsAgo: Story = {
  args: {
    endDate: new Date(now.getTime() - 30 * 1000), // 30 seconds ago
    format: 'default'
  },
}

export const InvalidDate: Story = {
  args: {
    endDate: 'invalid-date' as any,
    format: 'default'
  },
}

export const WithStringDate: Story = {
  args: {
    endDate: '2024-01-01T10:00:00Z',
    format: 'default'
  },
}

export const WithTimestamp: Story = {
  args: {
    endDate: hoursAgo(2).getTime(),
    format: 'default'
  },
} 