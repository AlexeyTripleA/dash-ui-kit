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
    position: {
      control: { type: 'inline-radio' },
      options: ['center', 'bottom'],
      description: 'Vertical position of the dialog'
    },
    bottomOffset: {
      control: { type: 'number' },
      description: 'Offset from bottom when position is bottom (in pixels)'
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width (Tailwind size: sm, md, lg, xl, 2xl, etc. or CSS value: 500px, 50%)'
    },
    horizontalMargin: {
      control: { type: 'number' },
      description: 'Horizontal margin from screen edges (in pixels)'
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

// Bottom positioned dialog
export const BottomPositioned: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>
          Open Bottom Dialog
        </Button>
        <Dialog
          {...args}
          open={open}
          onOpenChange={setOpen}
        >
          <div className='space-y-4'>
            <p>This dialog is positioned at the bottom of the screen with default offset (24px).</p>
            <Input placeholder='Enter text...' />
            <div className='flex justify-end space-x-2'>
              <Button variant='outline' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>
                Confirm
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    )
  },
  args: {
    title: 'Bottom Dialog',
    position: 'bottom',
    showCloseButton: true
  }
}

// Bottom positioned with custom offset
export const BottomCustomOffset: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>
          Open Bottom Dialog (Custom Offset)
        </Button>
        <Dialog
          {...args}
          open={open}
          onOpenChange={setOpen}
        >
          <div className='space-y-4'>
            <p>This dialog is positioned at the bottom with 80px offset from the edge.</p>
            <Input placeholder='Search...' />
            <div className='space-y-2'>
              <div className='p-2 hover:bg-gray-50 rounded cursor-pointer'>Option 1</div>
              <div className='p-2 hover:bg-gray-50 rounded cursor-pointer'>Option 2</div>
              <div className='p-2 hover:bg-gray-50 rounded cursor-pointer'>Option 3</div>
            </div>
          </div>
        </Dialog>
      </div>
    )
  },
  args: {
    title: 'Search',
    position: 'bottom',
    bottomOffset: 80,
    showCloseButton: true,
    size: 'sm'
  }
}

// Dialog without title (accessibility fix demonstration)
export const NoTitle: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>
          Open Dialog Without Title
        </Button>
        <Dialog
          {...args}
          open={open}
          onOpenChange={setOpen}
        >
          <div className='space-y-4 text-center'>
            <div className='text-6xl'>🎉</div>
            <h3 className='text-xl font-semibold'>Success!</h3>
            <p className='text-gray-600'>Your changes have been saved successfully.</p>
            <Button onClick={() => setOpen(false)} className='w-full'>
              Continue
            </Button>
          </div>
        </Dialog>
      </div>
    )
  },
  args: {
    showCloseButton: true
    // No title provided - component will add a visually hidden title for accessibility
  }
}

// Dialog without close button
export const NoCloseButton: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>
          Open Modal Without Close Button
        </Button>
        <Dialog
          {...args}
          open={open}
          onOpenChange={setOpen}
        >
          <div className='space-y-4'>
            <p>This dialog has no close button in the header. User must use an action button to close.</p>
            <div className='flex justify-end space-x-2'>
              <Button variant='outline' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>
                Accept
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    )
  },
  args: {
    title: 'Confirm Action',
    showCloseButton: false
  }
}

// Bottom notification style
export const BottomNotification: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>
          Show Notification
        </Button>
        <Dialog
          {...args}
          open={open}
          onOpenChange={setOpen}
          className='max-w-md'
        >
          <div className='flex items-start space-x-3'>
            <div className='flex-shrink-0'>
              <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center'>
                <span className='text-green-600 text-xl'>✓</span>
              </div>
            </div>
            <div className='flex-1'>
              <p className='font-medium'>Payment successful</p>
              <p className='text-sm text-gray-600 mt-1'>
                Your payment has been processed successfully. You will receive a confirmation email shortly.
              </p>
            </div>
          </div>
        </Dialog>
      </div>
    )
  },
  args: {
    position: 'bottom',
    bottomOffset: 40,
    showCloseButton: true,
    size: 'sm'
  }
}

// Custom width with maxWidth prop (Tailwind size)
export const CustomWidthTailwind: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>
          Open Small Width Dialog
        </Button>
        <Dialog
          {...args}
          open={open}
          onOpenChange={setOpen}
        >
          <div className='space-y-4'>
            <p>This dialog has a maximum width of 'md' (448px) using the maxWidth prop.</p>
            <Input placeholder='Enter email...' />
            <Button onClick={() => setOpen(false)} className='w-full'>
              Subscribe
            </Button>
          </div>
        </Dialog>
      </div>
    )
  },
  args: {
    title: 'Newsletter Signup',
    maxWidth: 'md',
    showCloseButton: true,
    size: 'sm'
  }
}

// Custom width with CSS value
export const CustomWidthCSS: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>
          Open Custom Width Dialog
        </Button>
        <Dialog
          {...args}
          open={open}
          onOpenChange={setOpen}
        >
          <div className='space-y-4'>
            <p>This dialog has a custom width of 600px using CSS value.</p>
            <div className='grid grid-cols-2 gap-4'>
              <Input placeholder='First name' />
              <Input placeholder='Last name' />
              <Input placeholder='Email' />
              <Input placeholder='Phone' />
            </div>
            <div className='flex justify-end space-x-2'>
              <Button variant='outline' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>
                Submit
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    )
  },
  args: {
    title: 'Registration Form',
    maxWidth: '600px',
    showCloseButton: true
  }
}

// Wide dialog with percentage
export const WideDialogPercentage: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>
          Open Wide Dialog
        </Button>
        <Dialog
          {...args}
          open={open}
          onOpenChange={setOpen}
        >
          <div className='space-y-4'>
            <p>This dialog takes up 90% of the screen width.</p>
            <div className='grid grid-cols-4 gap-4'>
              <Input placeholder='Field 1' />
              <Input placeholder='Field 2' />
              <Input placeholder='Field 3' />
              <Input placeholder='Field 4' />
            </div>
            <div className='bg-gray-100 p-4 rounded'>
              <p className='text-sm'>This is useful for dashboards or wide content.</p>
            </div>
          </div>
        </Dialog>
      </div>
    )
  },
  args: {
    title: 'Wide Dashboard',
    maxWidth: '90%',
    showCloseButton: true,
    size: 'xl'
  }
}

// Horizontal margins
export const WithHorizontalMargins: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>
          Open Dialog with Margins
        </Button>
        <Dialog
          {...args}
          open={open}
          onOpenChange={setOpen}
        >
          <div className='space-y-4'>
            <p>This dialog has 40px margin from both left and right edges of the screen.</p>
            <p className='text-sm text-gray-600'>
              The dialog is centered but constrained to not exceed the screen width minus the margins (80px total). 
              This prevents the dialog from touching the screen edges, which is especially useful on mobile devices.
            </p>
            <Input placeholder='Search...' />
          </div>
        </Dialog>
      </div>
    )
  },
  args: {
    title: 'Dialog with Margins',
    horizontalMargin: 40,
    showCloseButton: true
  }
}

// Bottom dialog with custom width
export const BottomWithCustomWidth: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>
          Open Bottom Dialog (Small Width)
        </Button>
        <Dialog
          {...args}
          open={open}
          onOpenChange={setOpen}
        >
          <div className='space-y-4'>
            <p>This dialog is at the bottom with a small width.</p>
            <div className='space-y-2'>
              <div className='p-2 hover:bg-gray-50 rounded cursor-pointer'>Quick Action 1</div>
              <div className='p-2 hover:bg-gray-50 rounded cursor-pointer'>Quick Action 2</div>
              <div className='p-2 hover:bg-gray-50 rounded cursor-pointer'>Quick Action 3</div>
            </div>
          </div>
        </Dialog>
      </div>
    )
  },
  args: {
    title: 'Quick Actions',
    position: 'bottom',
    bottomOffset: 24,
    maxWidth: 'sm',
    showCloseButton: true,
    size: 'sm'
  }
}
