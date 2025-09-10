import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Identifier from './index'

const meta: Meta<typeof Identifier> = {
  title: 'Components/Identifier',
  component: Identifier,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    highlight: {
      control: { type: 'select' },
      options: ['default', 'dim', 'highlight', 'first', 'last', 'both'],
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
    },
    ellipsis: {
      control: 'boolean',
    },
    avatar: {
      control: 'boolean',
    },
    copyButton: {
      control: 'boolean',
    },
    middleEllipsis: {
      control: 'boolean',
    },
    linesAdjustment: {
      control: 'boolean',
    },
    maxLines: {
      control: { type: 'number', min: 0, max: 10 },
    },
    edgeChars: {
      control: { type: 'number', min: 1, max: 20 },
    },
  },
}

export default meta
type Story = StoryObj<typeof Identifier>

export const Default: Story = {
  args: {
    children: 'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567',
  },
}

export const Empty: Story = {
  args: {
    children: '',
  },
}

export const Short: Story = {
  args: {
    children: 'short-id',
  },
}

export const WithAvatar: Story = {
  args: {
    children: 'user-id-with-avatar-123456789',
    avatar: true,
  },
}

export const WithCopyButton: Story = {
  args: {
    children: 'copyable-identifier-123456789',
    copyButton: true,
  },
}

export const WithAvatarAndCopy: Story = {
  args: {
    children: 'complete-identifier-with-all-features',
    avatar: true,
    copyButton: true,
  },
}

export const HighlightDefault: Story = {
  args: {
    children: 'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567',
    highlight: 'default',
  },
}

export const HighlightDim: Story = {
  args: {
    children: 'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567',
    highlight: 'dim',
  },
}

export const HighlightFull: Story = {
  args: {
    children: 'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567',
    highlight: 'highlight',
  },
}

export const HighlightFirst: Story = {
  args: {
    children: 'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567',
    highlight: 'first',
  },
}

export const HighlightLast: Story = {
  args: {
    children: 'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567',
    highlight: 'last',
  },
}

export const HighlightBoth: Story = {
  args: {
    children: 'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567',
    highlight: 'both',
  },
}

export const Ellipsis: Story = {
  args: {
    children: 'this-is-a-very-long-identifier-that-will-be-truncated-with-ellipsis',
    ellipsis: true,
  },
}

export const MiddleEllipsis: Story = {
  args: {
    children: 'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567',
    middleEllipsis: true,
    edgeChars: 6,
  },
}

export const MiddleEllipsisShort: Story = {
  args: {
    children: 'short-id',
    middleEllipsis: true,
    edgeChars: 4,
  },
}

export const MaxLines: Story = {
  args: {
    children: 'very-long-identifier-that-spans-multiple-lines-when-constrained-by-width-and-line-limits',
    maxLines: 2,
  },
}

export const CustomClassName: Story = {
  args: {
    children: 'custom-styled-identifier',
    className: 'bg-blue-50 p-2 rounded border',
  },
}

export const WithoutLinesAdjustment: Story = {
  args: {
    children: 'identifier-without-automatic-line-adjustment',
    linesAdjustment: false,
  },
}

export const CompleteExample: Story = {
  args: {
    children: 'complete-example-with-all-features-enabled-abc123def456',
    avatar: true,
    copyButton: true,
    highlight: 'both',
    className: 'p-3 border rounded-lg bg-gray-50',
  },
}

export const Playground: Story = {
  args: {
    children: 'playground-identifier-for-testing-abc123def456ghi789',
    avatar: false,
    copyButton: false,
    ellipsis: false,
    middleEllipsis: false,
    highlight: 'default',
    maxLines: 0,
    edgeChars: 4,
    linesAdjustment: true,
  },
} 