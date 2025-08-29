import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Dialog, DialogProps } from './index'
import { Button } from '../button'
import { Input } from '../input'
import Identifier from '../identifier'

const meta: Meta<DialogProps> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modal dialog component built on top of Radix UI Dialog. Can be used in controlled or uncontrolled mode.'
      }
    }
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the dialog is open (controlled mode)'
    },
    title: {
      control: 'text',
      description: 'Dialog title'
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button'
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'xl'],
      description: 'Dialog size'
    },
    onOpenChange: {
      action: 'openChanged',
      description: 'Callback when dialog open state changes'
    }
  }
}

export default meta
type Story = StoryObj<typeof Dialog>

// Basic controlled dialog
export const Controlled: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>
          Open Dialog
        </Button>
        <Dialog
          {...args}
          open={open}
          onOpenChange={setOpen}
        >
          <div className='space-y-4'>
            <p>This is a controlled dialog. You can manage its state externally.</p>
            <div className='flex justify-end space-x-2'>
              <Button variant='outline' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>
                Save
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    )
  },
  args: {
    title: 'Controlled Dialog',
    showCloseButton: true
  }
}

// Uncontrolled dialog with trigger
export const WithTrigger: Story = {
  render: (args) => (
    <Dialog
      {...args}
      trigger={<Button>Open Dialog</Button>}
    >
      <div className='space-y-4'>
        <p>This dialog is opened by clicking the trigger button.</p>
        <Input placeholder='Enter some text...' />
      </div>
    </Dialog>
  ),
  args: {
    title: 'Dialog with Trigger',
    showCloseButton: true
  }
}

// Identity selection example (exact Figma design)
export const IdentitySelection: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    const [selectedIdentity, setSelectedIdentity] = useState<string | null>(null)
    
    const identities = [
      { id: '1', name: 'alice.dash', identifier: 'BsCttq9wJXqEoMyxWzjAEVShgAdXAvZEaaM9dCBhYuZx' },
      { id: '2', name: 'bob.dash', identifier: 'BsCttq9wJXqEoMyxWzjAEVShgAdXAvZEaaM9dCBhYuZx' },
      { id: '3', name: 'carol.dash', identifier: 'BsCttq9wJXqEoMyxWzjAEVShgAdXAvZEaaM9dCBhYuZx' }
    ]

    const handleSelect = (id: string) => {
      setSelectedIdentity(id)
      setOpen(false)
    }
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>
          Select Identity
        </Button>
        {selectedIdentity && (
          <div className='mt-4 p-3 bg-gray-100 rounded'>
            Selected: {identities.find(i => i.id === selectedIdentity)?.name}
          </div>
        )}
        <Dialog
          {...args}
          open={open}
          onOpenChange={setOpen}
        >
          <div className='space-y-4'>
            <p className='text-sm text-gray-600'>
              Select an identity to continue
            </p>
            <div className='space-y-2'>
              {identities.map(identity => (
                <div 
                  key={identity.id}
                  className='flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer border border-gray-200'
                  onClick={() => handleSelect(identity.id)}
                >
                  <Identifier avatar={true}>
                    {identity.identifier}
                  </Identifier>
                </div>
              ))}
            </div>
          </div>
        </Dialog>
      </div>
    )
  },
  args: {
    title: 'Your identity',
    showCloseButton: true
  }
}

// No title, no close button
export const Minimal: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>
          Open Minimal Dialog
        </Button>
        <Dialog
          {...args}
          open={open}
          onOpenChange={setOpen}
        >
          <div className='text-center space-y-4'>
            <h3 className='text-lg font-semibold'>Custom Content</h3>
            <p>This dialog has no default title or close button.</p>
            <Button onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </Dialog>
      </div>
    )
  },
  args: {
    showCloseButton: false
  }
}

// Large content example
export const LargeContent: Story = {
  render: (args) => (
    <Dialog
      {...args}
      trigger={<Button>Open Large Dialog</Button>}
      className='max-w-2xl'
    >
      <div className='space-y-4'>
        <p>This dialog has larger content and a custom max-width.</p>
        <div className='grid grid-cols-2 gap-4'>
          <Input placeholder='First name' />
          <Input placeholder='Last name' />
          <Input placeholder='Email' />
          <Input placeholder='Phone' />
        </div>
        <div className='space-y-2'>
          <label className='block text-sm font-medium'>Message</label>
          <textarea 
            className='w-full p-2 border rounded-md' 
            rows={4}
            placeholder='Enter your message...'
          />
        </div>
      </div>
    </Dialog>
  ),
  args: {
    title: 'Contact Form',
    showCloseButton: true
  }
}

// Size variants
export const SmallSize: Story = {
  render: (args) => (
    <Dialog
      {...args}
      trigger={<Button>Small Dialog</Button>}
    >
      <div className='space-y-4'>
        <p>This is a small dialog.</p>
        <Input placeholder='Enter text...' />
      </div>
    </Dialog>
  ),
  args: {
    title: 'Small Dialog',
    size: 'sm',
    showCloseButton: true
  }
}

export const MediumSize: Story = {
  render: (args) => (
    <Dialog
      {...args}
      trigger={<Button>Medium Dialog</Button>}
    >
      <div className='space-y-4'>
        <p>This is a medium dialog (default size).</p>
        <div className='grid grid-cols-2 gap-4'>
          <Input placeholder='First name' />
          <Input placeholder='Last name' />
        </div>
      </div>
    </Dialog>
  ),
  args: {
    title: 'Medium Dialog',
    size: 'md',
    showCloseButton: true
  }
}

export const ExtraLargeSize: Story = {
  render: (args) => (
    <Dialog
      {...args}
      trigger={<Button>Extra Large Dialog</Button>}
    >
      <div className='space-y-6'>
        <p>This is an extra large dialog with more content space.</p>
        <div className='grid grid-cols-3 gap-4'>
          <Input placeholder='First name' />
          <Input placeholder='Last name' />
          <Input placeholder='Email' />
          <Input placeholder='Phone' />
          <Input placeholder='Company' />
          <Input placeholder='Position' />
        </div>
        <div className='space-y-2'>
          <label className='block text-sm font-medium'>Description</label>
          <textarea 
            className='w-full p-3 border rounded-md' 
            rows={6}
            placeholder='Enter detailed description...'
          />
        </div>
      </div>
    </Dialog>
  ),
  args: {
    title: 'Extra Large Dialog',
    size: 'xl',
    showCloseButton: true
  }
}
