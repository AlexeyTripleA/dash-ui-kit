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
      options: ['brand', 'mint', 'gray', 'lightGray', 'red', 'lightBlue', 'white', 'halfWhite', 'halfBlue'],
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md'],
    },
    rounded: {
      control: { type: 'inline-radio' },
      options: ['default', 'full'],
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

export const RoundedFull = Template.bind({})
RoundedFull.args = {
  children: 'Pill Button',
  variant: 'solid',
  colorScheme: 'brand',
  size: 'md',
  rounded: 'full',
  disabled: false,
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
    <Button colorScheme={'lightGray'}>Light Gray Button</Button>
    <Button colorScheme={'white'}>White Button</Button>
    <Button colorScheme={'halfWhite'}>Half White Button</Button>
    <Button colorScheme={'halfBlue'}>Half Blue Button</Button>
  </>
)

export const Rounded: StoryFn<ButtonProps> = () => (
  <>
    <Button rounded={'default'}>Default Rounded</Button>
    <Button rounded={'full'}>Pill Button</Button>
    <Button rounded={'full'} variant={'outline'}>Pill Outline</Button>
    <Button rounded={'full'} size={'sm'}>Small Pill</Button>
  </>
)

export const GlassmorphismButtons: StoryFn<ButtonProps> = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '12px', 
    padding: '40px', 
    background: 'linear-gradient(135deg, #13172A 0%, #4D5895 50%, #0C1C33 100%)',
    borderRadius: '16px'
  }}>
    <Button colorScheme={'white'} rounded={'full'}>White Button</Button>
    <Button colorScheme={'halfWhite'} rounded={'full'}>Half White Button</Button>
    <Button colorScheme={'halfBlue'} rounded={'full'}>Half Blue Button</Button>
    <Button colorScheme={'white'} rounded={'full'} variant={'outline'}>White Outline</Button>
    <Button colorScheme={'halfWhite'} rounded={'full'} variant={'outline'}>Half White Outline</Button>
    <Button colorScheme={'halfBlue'} rounded={'full'} variant={'outline'}>Half Blue Outline</Button>
  </div>
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
    <Button colorScheme={'lightGray'}>Light Gray Button</Button>
    <Button colorScheme={'white'}>White Button</Button>
    <Button colorScheme={'halfWhite'}>Half White Button</Button>
    <Button colorScheme={'halfBlue'}>Half Blue Button</Button>
    {/* Rounded */}
    <Button rounded={'default'}>Default Rounded</Button>
    <Button rounded={'full'}>Pill Button</Button>
  </>
)
