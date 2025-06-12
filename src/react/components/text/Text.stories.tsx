import React from 'react'
import type { Meta, StoryFn } from '@storybook/react'
import { ThemeProvider } from '../../contexts/ThemeContext'
import { Text, TextProps } from './index'

const meta: Meta<TextProps> = {
  title: 'Components/Text',
  component: Text,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    weight: {
      control: { type: 'inline-radio' },
      options: ['normal', 'bold'],
    },
    color: {
      control: { type: 'inline-radio' },
      options: ['default', 'blue', 'red'],
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

export const Sizes: StoryFn<TextProps> = () => (
  <>
    <Text size="sm">Small Text</Text>
    <Text size="md">Medium Text</Text>
    <Text size="lg">Large Text</Text>
    <Text size="xl">Extra Large Text</Text>
  </>
)

export const Weights: StoryFn<TextProps> = () => (
  <>
    <Text weight="normal">Normal Weight</Text>
    <Text weight="bold">Bold Weight</Text>
  </>
)

export const Colors: StoryFn<TextProps> = () => (
  <>
    <Text color="default">Default Color</Text>
    <Text color="blue">Blue Color</Text>
    <Text color="red">Red Color</Text>
  </>
)

export const Decorations: StoryFn<TextProps> = () => (
  <>
    <Text underline>Underline</Text>
    <Text italic>Italic</Text>
    <Text lineThrough>Line Through</Text>
  </>
)

export const Transforms: StoryFn<TextProps> = () => (
  <>
    <Text transform="none">None</Text>
    <Text transform="uppercase">Uppercase</Text>
    <Text transform="capitalize">Capitalize</Text>
  </>
)

export const Opacities: StoryFn<TextProps> = () => (
  <>
    <Text opacity={100}>Opacity 100</Text>
    <Text opacity={60}>Opacity 60</Text>
    <Text opacity={30}>Opacity 30</Text>
  </>
)

export const MonospaceAndDim: StoryFn<TextProps> = () => (
  <>
    <Text monospace>Monospace Font</Text>
    <Text dim>Dimmed Text</Text>
  </>
)

export const All: StoryFn<TextProps> = () => (
  <>
    <Text size="xl" weight="bold" color="blue" underline italic transform="uppercase" opacity={80} monospace dim>
      All Features Example
    </Text>
  </>
) 