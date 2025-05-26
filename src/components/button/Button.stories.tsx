import React from 'react'
import type { Meta, StoryFn } from '@storybook/react'
import { Button, ButtonProps } from './index'

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'inline-radio' },
      options: ['solid', 'outline'],
    },
    colorScheme: {
      control: { type: 'inline-radio' },
      options: ['brand', 'mint', 'gray'],
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md'],
    },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
}

export default meta

const Template: StoryFn<ButtonProps> = args => <Button {...args} />

export const Solid = Template.bind({})
Solid.args = {
  children: 'Solid Button',
  variant: 'solid',
  colorScheme: 'brand',
  size: 'md',
  disabled: false,
}

export const Outline = Template.bind({})
Outline.args = {
  children: 'Outline Button',
  variant: 'outline',
  colorScheme: 'brand',
  size: 'md',
  disabled: false,
}

export const Disabled = Template.bind({})
Disabled.args = {
  children: 'Disabled Button',
  variant: 'solid',
  colorScheme: 'brand',
  size: 'md',
  disabled: true,
}

export const Sizes: StoryFn<ButtonProps> = () => (
  <>
    <Button size={'sm'}>Small Button</Button>
    <Button size={'md'}>Medium Button</Button>
  </>
)

export const Variants: StoryFn<ButtonProps> = () => (
  <>
    <Button variant={'solid'}>Solid Button</Button>
    <Button variant={'outline'}>Outline Button</Button>
  </>
)

export const Colors: StoryFn<ButtonProps> = () => (
  <>
    <Button colorScheme={'brand'}>Brand Button</Button>
    <Button colorScheme={'mint'}>Mint Button</Button>
    <Button colorScheme={'gray'}>Gray Button</Button>
  </>
)

export const All: StoryFn<ButtonProps> = () => (
  <>
    {/* Variants */}
    <Button variant={'solid'}>Solid Button</Button>
    <Button variant={'outline'}>Outline Button</Button>
    {/* Sizes */}
    <Button size={'sm'}>Small Button</Button>
    <Button size={'md'}>Medium Button</Button>
    {/* Colors */}
    <Button colorScheme={'brand'}>Brand Button</Button>
    <Button colorScheme={'mint'}>Mint Button</Button>
    <Button colorScheme={'gray'}>Gray Button</Button>
  </>
)
