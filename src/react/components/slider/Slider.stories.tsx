import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Slider, type SliderProps } from './index'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    value: 30,
    onChange: () => {},
    min: 0,
    max: 100,
    step: 1
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

const Controlled = (args: SliderProps): React.JSX.Element => {
  const [value, setValue] = useState(args.value)
  return <Slider {...args} value={value} onChange={setValue} />
}

export const Default: Story = {
  render: (args) => <Controlled {...args} />
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <Controlled {...args} />
}
