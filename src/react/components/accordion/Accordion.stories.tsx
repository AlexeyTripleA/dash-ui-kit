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
    defaultOpen: false,
  },
}
