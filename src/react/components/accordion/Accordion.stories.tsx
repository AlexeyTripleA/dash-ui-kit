import type { Meta, StoryObj } from '@storybook/react'
import { Accordion } from './index'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title displayed in the accordion trigger'
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the accordion is open by default'
    },
    open: {
      control: 'boolean',
      description: 'Controlled open state'
    },
    showSeparator: {
      control: 'boolean',
      description: 'Whether to show separator between title and content when open'
    },
    border: {
      control: 'boolean',
      description: 'Whether to show border around the accordion'
    },
    rightElement: {
      control: false,
      description: 'Optional element to display on the right side of the trigger'
    }
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleContent = (
  <div>Sample accordion content</div>
)

// Transaction Info (closed state)
export const TransactionInfo: Story = {
  args: {
    title: 'Transaction Info',
    children: sampleContent,
    defaultOpen: false,
  },
}

// Details (open state)
export const Details: Story = {
  args: {
    title: 'Details',
    children: sampleContent,
    defaultOpen: true,
  },
}

// Controlled state
export const Controlled: Story = {
  args: {
    title: 'Controlled Accordion',
    children: (
      <div>Controlled accordion content</div>
    ),
    open: true,
    onOpenChange: (open: boolean) => {
      console.log('Accordion state changed:', open)
    }
  },
}

// With custom content
export const WithCustomContent: Story = {
  args: {
    title: 'Custom Content',
    children: (
      <div>Custom accordion content</div>
    ),
    defaultOpen: false,
  },
}

// Minimal example
export const Minimal: Story = {
  args: {
    title: 'Simple Accordion',
    children: (
      <div>Simple accordion content</div>
    ),
    defaultOpen: true,
  },
}

// With separator
export const WithSeparator: Story = {
  args: {
    title: 'Accordion with Separator',
    children: (
      <div>
        <p>This accordion has a separator line between the title and content.</p>
        <p>The separator only appears when the accordion is open.</p>
      </div>
    ),
    defaultOpen: true,
    showSeparator: true,
  },
}

// With border
export const WithBorder: Story = {
  args: {
    title: 'Accordion with Border',
    children: (
      <div>
        <p>This accordion has a subtle border around it.</p>
        <p>The border provides better visual separation.</p>
      </div>
    ),
    defaultOpen: false,
    border: true,
  },
}

// With right element
export const WithRightElement: Story = {
  args: {
    title: 'Accordion with Right Element',
    children: (
      <div>
        <p>This accordion has a custom element on the right side.</p>
        <p>It appears before the chevron icon.</p>
      </div>
    ),
    defaultOpen: false,
    rightElement: (
      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
        New
      </span>
    ),
  },
}

// With all features
export const AllFeatures: Story = {
  args: {
    title: 'Full Featured Accordion',
    children: (
      <div>
        <p>This accordion demonstrates all available features:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Border around the accordion</li>
          <li>Separator line when open</li>
          <li>Custom right element (badge)</li>
          <li>Rich content inside</li>
        </ul>
      </div>
    ),
    defaultOpen: true,
    showSeparator: true,
    border: true,
    rightElement: (
      <div className="flex items-center gap-2">
        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
          Pro
        </span>
        <span className="text-sm text-gray-500">$29</span>
      </div>
    ),
  },
}

// Status indicator example
export const WithStatusIndicator: Story = {
  args: {
    title: 'Payment Status',
    children: (
      <div>
        <p>Transaction ID: #12345</p>
        <p>Amount: $99.99</p>
        <p>Date: 2024-01-15</p>
      </div>
    ),
    defaultOpen: false,
    showSeparator: true,
    rightElement: (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-sm text-green-600">Completed</span>
      </div>
    ),
  },
}

// Icon example
export const WithIcon: Story = {
  args: {
    title: 'Settings',
    children: (
      <div>
        <p>Configure your application settings here.</p>
        <div className="mt-3 space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Enable notifications
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Auto-save changes
          </label>
        </div>
      </div>
    ),
    defaultOpen: false,
    border: true,
    rightElement: (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
}
