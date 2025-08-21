import type { Meta, StoryObj } from '@storybook/react'
import { BigNumber } from './index'

const meta: Meta<typeof BigNumber> = {
  title: 'Components/BigNumber',
  component: BigNumber,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['space', 'comma'],
    },
    children: {
      control: { type: 'text' },
    },
    className: {
      control: { type: 'text' },
      description: 'CSS classes including gap classes (e.g., gap-1, gap-2, gap-4)',
    },
  },
}

export default meta
type Story = StoryObj<typeof BigNumber>

export const Default: Story = {
  args: {
    children: 1234567890,
  },
}

export const SpaceVariant: Story = {
  args: {
    children: 1234567890,
    variant: 'space',
  },
}

export const CommaVariant: Story = {
  args: {
    children: 1234567890,
    variant: 'comma',
  },
}

export const WithDecimals: Story = {
  args: {
    children: 1234567.89,
    variant: 'comma',
  },
}

export const StringInput: Story = {
  args: {
    children: '9876543210',
    variant: 'space',
  },
}

export const SmallNumber: Story = {
  args: {
    children: 123,
    variant: 'comma',
  },
}

export const LargeNumber: Story = {
  args: {
    children: 123456789012345,
    variant: 'space',
  },
}

export const WithCustomClassName: Story = {
  args: {
    children: 1000000,
    variant: 'comma',
    className: 'text-blue-600 font-bold',
  },
}

export const ZeroValue: Story = {
  args: {
    children: 0,
    variant: 'space',
  },
}

export const NullValue: Story = {
  args: {
    children: null as null,
    variant: 'space',
  },
}

export const CustomGapSmall: Story = {
  args: {
    children: 1234567890,
    variant: 'space',
    className: 'gap-0.5',
  },
}

export const CustomGapLarge: Story = {
  args: {
    children: 1234567890,
    variant: 'space',
    className: 'gap-4',
  },
}

export const NoGap: Story = {
  args: {
    children: 1234567890,
    variant: 'space',
    className: 'gap-0',
  },
} 