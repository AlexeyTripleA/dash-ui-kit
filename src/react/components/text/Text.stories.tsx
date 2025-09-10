import React from 'react'
import type { Meta, StoryFn } from '@storybook/react'
import { Text, TextProps } from './index'

const meta: Meta<TextProps> = {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    weight: {
      control: { type: 'inline-radio' },
      options: ['normal', '500', 'bold'],
    },
    color: {
      control: { type: 'inline-radio' },
      options: ['default', 'blue', 'blue-dark', 'red'],
    },
    italic: { control: 'boolean' },
    underline: { control: 'boolean' },
    lineThrough: { control: 'boolean' },
    transform: {
      control: { type: 'inline-radio' },
      options: ['none', 'uppercase', 'capitalize'],
    },
    opacity: {
      control: { type: 'inline-radio' },
      options: [0,10,20,30,40,50,60,70,80,90,100],
    },
    monospace: { control: 'boolean' },
    dim: { control: 'boolean' },
    reset: { control: 'boolean' },
    className: { control: 'text' },
    children: { control: 'text' },
  },
}

export default meta

const Template: StoryFn<TextProps> = args => <Text {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Default Text',
}

export const Sizes = Template.bind({})
Sizes.args = {
  children: 'Text Size Example',
  size: 'md'
}

export const Weights = Template.bind({})
Weights.args = {
  children: 'Text Weight Example',
  weight: 'normal'
}

export const Colors = Template.bind({})
Colors.args = {
  children: 'Text Color Example',
  color: 'default'
}

export const Decorations = Template.bind({})
Decorations.args = {
  children: 'Text Decoration Example',
  underline: false,
  italic: false,
  lineThrough: false
}

export const Transforms = Template.bind({})
Transforms.args = {
  children: 'Text Transform Example',
  transform: 'none'
}

export const Opacities = Template.bind({})
Opacities.args = {
  children: 'Text Opacity Example',
  opacity: 100
}

export const MonospaceAndDim = Template.bind({})
MonospaceAndDim.args = {
  children: 'Monospace and Dim Example',
  monospace: false,
  dim: false
}

export const AllFeatures = Template.bind({})
AllFeatures.args = {
  children: 'All Features Example',
  size: 'xl',
  weight: 'bold',
  color: 'blue-dark',
  underline: true,
  italic: true,
  transform: 'uppercase',
  opacity: 80,
  monospace: true,
  dim: true
} 