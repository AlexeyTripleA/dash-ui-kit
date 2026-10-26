import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Stepper } from './index'

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    steps: [
      { label: 'From & To', status: 'completed' },
      { label: 'Amount', status: 'active' },
      { label: 'Confirm', status: 'upcoming' }
    ]
  },
  decorators: [
    (Story) => (
      <div style={{ width: '480px' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const FirstStep: Story = {
  args: {
    steps: [
      { label: 'From & To', status: 'active' },
      { label: 'Amount', status: 'upcoming' },
      { label: 'Confirm', status: 'upcoming' }
    ]
  }
}
