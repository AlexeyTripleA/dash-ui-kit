import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './index'
import { Button } from '../button'
import { InfoCircleIcon } from '../icons'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Which side the tooltip appears on',
    },
    sideOffset: {
      control: { type: 'number', min: 0, max: 20 },
      description: 'Offset from the trigger in pixels',
    },
    delayDuration: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
      description: 'Hover delay before tooltip opens (ms)',
    },
    content: {
      control: 'text',
      description: 'Tooltip label',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    side: 'top',
    sideOffset: 6,
    delayDuration: 300,
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
}

export const AllSides: Story = {
  render: () => (
    <div className='grid grid-cols-2 gap-8 p-16'>
      {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
        <Tooltip key={side} content={`Tooltip on ${side}`} side={side}>
          <Button>{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Tooltip content='More information about this field'>
      <span className='inline-flex cursor-pointer text-gray-500'>
        <InfoCircleIcon size={18} />
      </span>
    </Tooltip>
  ),
}

export const RichContent: Story = {
  render: () => (
    <Tooltip
      content={
        <div className='flex flex-col gap-1'>
          <span className='font-semibold'>Pro tip</span>
          <span>You can press Ctrl+K to open the command palette.</span>
        </div>
      }
    >
      <Button>Rich tooltip</Button>
    </Tooltip>
  ),
}

export const NoDelay: Story = {
  args: {
    content: 'Appears instantly',
    delayDuration: 0,
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>No delay</Button>
    </Tooltip>
  ),
}
