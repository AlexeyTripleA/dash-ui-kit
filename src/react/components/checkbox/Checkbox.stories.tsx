import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox, type CheckboxProps } from './index'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    labelPosition: { control: 'select', options: ['left', 'right'] },
    size: { control: 'select', options: ['sm', 'md'] },
    shape: { control: 'select', options: ['square', 'circle'] },
    disabled: { control: 'boolean' }
  },
  args: {
    checked: false,
    onChange: () => {},
    label: 'Advanced Transfer Settings'
  }
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

const Controlled = (args: CheckboxProps): React.JSX.Element => {
  const [checked, setChecked] = useState(args.checked)
  return <Checkbox {...args} checked={checked} onChange={setChecked} />
}

export const Default: Story = {
  render: (args) => <Controlled {...args} />
}

export const Checked: Story = {
  args: { checked: true },
  render: (args) => <Controlled {...args} />
}

export const LabelLeftCircle: Story = {
  args: { label: 'Custom Change Address', labelPosition: 'left', shape: 'circle' },
  render: (args) => <Controlled {...args} />
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <Controlled {...args} />
}
