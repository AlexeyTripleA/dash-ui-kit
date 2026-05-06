import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Popover } from './index'
import { Button } from '../button'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Which side the popover appears on',
    },
    sideOffset: {
      control: { type: 'number', min: 0, max: 20 },
      description: 'Offset from the trigger in pixels',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show a close button inside the popover',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    content: 'Click outside or press Escape to close.',
    side: 'bottom',
    showCloseButton: false,
  },
  render: (args) => (
    <Popover {...args}>
      <Button>Click me</Button>
    </Popover>
  ),
}

export const WithCloseButton: Story = {
  render: () => (
    <Popover
      showCloseButton
      content={
        <div className='flex flex-col gap-2 pr-4'>
          <p className='font-semibold text-sm'>Settings</p>
          <p className='text-xs text-gray-500'>Adjust your preferences here.</p>
        </div>
      }
    >
      <Button>Open settings</Button>
    </Popover>
  ),
}

export const AllSides: Story = {
  render: () => (
    <div className='grid grid-cols-2 gap-8 p-16'>
      {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
        <Popover key={side} content={`Popover on ${side}`} side={side}>
          <Button>{side}</Button>
        </Popover>
      ))}
    </div>
  ),
}

export const RichContent: Story = {
  render: () => (
    <Popover
      showCloseButton
      content={
        <div className='flex flex-col gap-3'>
          <p className='font-semibold'>Account actions</p>
          <div className='flex flex-col gap-1'>
            <button className='text-left text-sm hover:text-blue-500 transition-colors'>
              Edit profile
            </button>
            <button className='text-left text-sm hover:text-blue-500 transition-colors'>
              Change password
            </button>
            <button className='text-left text-sm text-red-500 hover:text-red-700 transition-colors'>
              Delete account
            </button>
          </div>
        </div>
      }
    >
      <Button>Account</Button>
    </Popover>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <div className='flex flex-col items-center gap-4'>
        <Popover
          open={open}
          onOpenChange={setOpen}
          content='This is a controlled popover.'
        >
          <Button>Toggle</Button>
        </Popover>
        <p className='text-sm text-gray-500'>
          State: <strong>{open ? 'open' : 'closed'}</strong>
        </p>
      </div>
    )
  },
}
