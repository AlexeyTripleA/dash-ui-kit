import React from 'react'
import type { Meta, StoryFn } from '@storybook/react'
import { NotActive, NotActiveProps } from './index'

const meta: Meta<NotActiveProps> = {
  title: 'Components/NotActive',
  component: NotActive,
  argTypes: {
    children: {
      control: { type: 'text' },
    },
    className: {
      control: { type: 'text' },
    },
  },
}

export default meta

const Template: StoryFn<NotActiveProps> = args => <NotActive {...args} />

export const Default = Template.bind({})
Default.args = {}

export const WithCustomText = Template.bind({})
WithCustomText.args = {
  children: 'Custom inactive text',
}

export const WithClassName = Template.bind({})
WithClassName.args = {
  className: 'italic font-bold',
  children: 'Styled inactive text',
}

export const Examples: StoryFn<NotActiveProps> = () => (
  <div className="space-y-4">
    <div>
      <h3 className="text-lg font-medium mb-2">Default (n/a)</h3>
      <NotActive />
    </div>
    <div>
      <h3 className="text-lg font-medium mb-2">Custom text</h3>
      <NotActive>No data available</NotActive>
    </div>
    <div>
      <h3 className="text-lg font-medium mb-2">With styling</h3>
      <NotActive className="italic font-mono">Not configured</NotActive>
    </div>
  </div>
) 