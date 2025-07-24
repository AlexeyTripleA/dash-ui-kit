import type { Meta, StoryObj } from '@storybook/react'
import { List } from './index'

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    iconType: {
      control: { type: 'select' },
      options: ['check'],
    },
  },
}

export default meta
type Story = StoryObj<typeof List>

export const Default: Story = {
  args: {
    items: [
      { text: 'First feature', description: 'Description for the first feature' },
      { text: 'Second feature', description: 'Description for the second feature' },
      { text: 'Third feature', description: 'Description for the third feature' },
    ],
  },
}

export const WithoutDescriptions: Story = {
  args: {
    items: [
      { text: 'Simple item one' },
      { text: 'Simple item two' },
      { text: 'Simple item three' },
    ],
  },
}

export const SmallSize: Story = {
  args: {
    items: [
      { text: 'Small list item', description: 'This is a small sized list item' },
      { text: 'Another small item', description: 'Another description' },
    ],
    size: 'sm',
  },
}

export const MediumSize: Story = {
  args: {
    items: [
      { text: 'Medium list item', description: 'This is a medium sized list item' },
      { text: 'Another medium item', description: 'Another description' },
    ],
    size: 'md',
  },
}

export const LargeSize: Story = {
  args: {
    items: [
      { text: 'Large list item', description: 'This is a large sized list item' },
      { text: 'Another large item', description: 'Another description' },
    ],
    size: 'lg',
  },
}

export const MixedContent: Story = {
  args: {
    items: [
      { text: 'Item with description', description: 'This item has a description' },
      { text: 'Item without description' },
      { text: 'Another item with description', description: 'And this one has a longer description to show how it handles multiple lines of text' },
      { text: 'Final item without description' },
    ],
  },
}

export const SingleItem: Story = {
  args: {
    items: [
      { text: 'Single list item', description: 'This is the only item in the list' },
    ],
  },
}

export const CustomClassName: Story = {
  args: {
    items: [
      { text: 'Custom styled item', description: 'This list has custom styling' },
      { text: 'Another custom item', description: 'More custom styling' },
    ],
    className: 'max-w-md',
  },
} 