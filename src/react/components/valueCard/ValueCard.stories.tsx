import React from 'react'
import type { Meta, StoryFn } from '@storybook/react'
import { ValueCard, ValueCardProps } from './index'

const meta: Meta<ValueCardProps> = {
  title: 'Components/ValueCard',
  component: ValueCard,
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    )
  ],
  argTypes: {
    colorScheme: {
      control: { type: 'inline-radio' },
      options: ['default', 'transparent', 'green', 'lightBlue', 'white', 'lightGray', 'yellow'],
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'xl'],
    },
    clickable: { control: 'boolean' },
    loading: { control: 'boolean' },
    border: { control: 'boolean' },
    link: { control: 'text' },
    className: { control: 'text' },
  },
}

export default meta

const Template: StoryFn<ValueCardProps> = args => <ValueCard {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Default Value Card',
}

export const Green = Template.bind({})
Green.args = {
  children: 'Success Status',
  colorScheme: 'green',
}

export const LightBlue = Template.bind({})
LightBlue.args = {
  children: 'Brand Colored Card',
  colorScheme: 'lightBlue',
}

export const Yellow = Template.bind({})
Yellow.args = {
  children: 'Warning Status',
  colorScheme: 'yellow',
}

export const Transparent = Template.bind({})
Transparent.args = {
  children: 'Transparent Card',
  colorScheme: 'transparent',
}

export const Clickable = Template.bind({})
Clickable.args = {
  children: 'Click Me!',
  clickable: true,
  colorScheme: 'lightBlue',
}

export const WithLink = Template.bind({})
WithLink.args = {
  children: 'External Link',
  link: 'https://example.com',
  colorScheme: 'green',
}

export const Loading = Template.bind({})
Loading.args = {
  children: 'Loading...',
  loading: true,
  colorScheme: 'lightGray',
}

export const SmallSize = Template.bind({})
SmallSize.args = {
  children: 'Small Card',
  size: 'sm',
  colorScheme: 'lightBlue',
}

export const LargeSize = Template.bind({})
LargeSize.args = {
  children: 'Extra Large Card',
  size: 'xl',
  colorScheme: 'green',
}

export const NoBorder = Template.bind({})
NoBorder.args = {
  children: 'No Border',
  border: false,
  colorScheme: 'lightGray',
}

export const CustomComponent = Template.bind({})
CustomComponent.args = {
  children: 'Button Element',
  as: 'button',
  clickable: true,
  colorScheme: 'yellow',
}

export const AllVariants: StoryFn = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Color Schemes</h3>
    <div className="flex flex-wrap gap-4">
      <ValueCard colorScheme="default">Default</ValueCard>
      <ValueCard colorScheme="transparent">Transparent</ValueCard>
      <ValueCard colorScheme="green">Green</ValueCard>
      <ValueCard colorScheme="lightBlue">Light Blue</ValueCard>
      <ValueCard colorScheme="white">White</ValueCard>
      <ValueCard colorScheme="lightGray">Light Gray</ValueCard>
      <ValueCard colorScheme="yellow">Yellow</ValueCard>
    </div>
    
    <h3 className="text-lg font-semibold">Sizes</h3>
    <div className="flex flex-wrap items-end gap-4">
      <ValueCard size="sm" colorScheme="lightBlue">Small</ValueCard>
      <ValueCard size="md" colorScheme="lightBlue">Medium</ValueCard>
      <ValueCard size="xl" colorScheme="lightBlue">Extra Large</ValueCard>
    </div>
    
    <h3 className="text-lg font-semibold">States</h3>
    <div className="flex flex-wrap gap-4">
      <ValueCard clickable colorScheme="green">Clickable</ValueCard>
      <ValueCard loading colorScheme="lightGray">Loading</ValueCard>
      <ValueCard border={false} colorScheme="yellow">No Border</ValueCard>
    </div>
  </div>
) 