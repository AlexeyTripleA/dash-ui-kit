import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TransactionStatusIcon } from './index'

const meta: Meta<typeof TransactionStatusIcon> = {
  title: 'Components/TransactionStatusIcon',
  component: TransactionStatusIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['SUCCESS', 'FAIL', 'QUEUED', 'POOLED', 'BROADCASTED'],
      description: 'Transaction status to display icon for'
    },
    size: {
      control: { type: 'range', min: 12, max: 64, step: 4 },
      description: 'Size of the icon'
    },
    color: {
      control: 'color',
      description: 'Color of the icon'
    }
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: {
    status: 'SUCCESS',
    size: 24
  },
}

export const Fail: Story = {
  args: {
    status: 'FAIL',
    size: 24
  },
}

export const Queued: Story = {
  args: {
    status: 'QUEUED',
    size: 24
  },
}

export const Pooled: Story = {
  args: {
    status: 'POOLED',
    size: 24
  },
}

export const Broadcasted: Story = {
  args: {
    status: 'BROADCASTED',
    size: 24
  },
}

export const Large: Story = {
  args: {
    status: 'SUCCESS',
    size: 48
  },
}

export const Small: Story = {
  args: {
    status: 'FAIL',
    size: 16
  },
}

export const CustomColor: Story = {
  args: {
    status: 'SUCCESS',
    size: 32,
    color: '#ff6b35'
  },
}

export const AllStatuses: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col items-center gap-2">
        <TransactionStatusIcon status="SUCCESS" size={24} />
        <span className="text-sm">SUCCESS</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <TransactionStatusIcon status="FAIL" size={24} />
        <span className="text-sm">FAIL</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <TransactionStatusIcon status="QUEUED" size={24} />
        <span className="text-sm">QUEUED</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <TransactionStatusIcon status="POOLED" size={24} />
        <span className="text-sm">POOLED</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <TransactionStatusIcon status="BROADCASTED" size={24} />
        <span className="text-sm">BROADCASTED</span>
      </div>
    </div>
  ),
} 