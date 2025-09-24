import React from 'react'
import type { Meta, StoryFn } from '@storybook/react'
import { Badge, BadgeProps } from './index'

const meta: Meta<BadgeProps> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: { type: 'inline-radio' },
      options: ['default', 'flat', 'solid', 'bordered'],
    },
    color: {
      control: { type: 'inline-radio' },
      options: ['blue', 'white', 'gray', 'light-gray', 'turquoise', 'red', 'orange'],
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['xxs', 'small', 'big'],
    },
    children: { control: 'text' },
    className: { control: 'text' },
  },
}

export default meta

const Template: StoryFn<BadgeProps> = args => <Badge {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Label',
  variant: 'default',
  color: 'blue',
  size: 'small',
}

export const Solid = Template.bind({})
Solid.args = {
  children: 'Label',
  variant: 'solid',
  color: 'blue',
  size: 'small',
}

export const Flat = Template.bind({})
Flat.args = {
  children: 'Label',
  variant: 'flat',
  color: 'blue',
  size: 'small',
}

export const Bordered = Template.bind({})
Bordered.args = {
  children: 'Label',
  variant: 'bordered',
  color: 'blue',
  size: 'small',
}

export const Sizes: StoryFn<BadgeProps> = () => (
  <div className='flex gap-4 items-center'>
    <Badge size='xxs'>XXS</Badge>
    <Badge size='small'>Small</Badge>
    <Badge size='big'>Big</Badge>
  </div>
)

export const Variants: StoryFn<BadgeProps> = () => (
  <div className='flex gap-4 items-center'>
    <Badge variant='default'>Default</Badge>
    <Badge variant='flat'>Flat</Badge>
    <Badge variant='solid'>Solid</Badge>
    <Badge variant='bordered'>Bordered</Badge>
  </div>
)

export const Colors: StoryFn<BadgeProps> = () => (
  <div className='flex gap-4 items-center flex-wrap'>
    <Badge color='blue'>Blue</Badge>
    <Badge color='white'>White</Badge>
    <Badge color='gray'>Gray</Badge>
    <Badge color='light-gray'>Light Gray</Badge>
    <Badge color='turquoise'>Turquoise</Badge>
    <Badge color='red'>Red</Badge>
    <Badge color='orange'>Orange</Badge>
  </div>
)

export const BlueVariants: StoryFn<BadgeProps> = () => (
  <div className='space-y-4'>
    <div className='flex gap-4 items-center'>
      <span className='w-20 text-sm'>XXS:</span>
      <Badge variant='default' color='blue' size='xxs'>Label</Badge>
      <Badge variant='flat' color='blue' size='xxs'>Label</Badge>
      <Badge variant='solid' color='blue' size='xxs'>Label</Badge>
      <Badge variant='bordered' color='blue' size='xxs'>Label</Badge>
    </div>
    <div className='flex gap-4 items-center'>
      <span className='w-20 text-sm'>Small:</span>
      <Badge variant='default' color='blue' size='small'>Label</Badge>
      <Badge variant='flat' color='blue' size='small'>Label</Badge>
      <Badge variant='solid' color='blue' size='small'>Label</Badge>
      <Badge variant='bordered' color='blue' size='small'>Label</Badge>
    </div>
    <div className='flex gap-4 items-center'>
      <span className='w-20 text-sm'>Big:</span>
      <Badge variant='default' color='blue' size='big'>Label</Badge>
      <Badge variant='flat' color='blue' size='big'>Label</Badge>
      <Badge variant='solid' color='blue' size='big'>Label</Badge>
      <Badge variant='bordered' color='blue' size='big'>Label</Badge>
    </div>
  </div>
)

export const RedVariants: StoryFn<BadgeProps> = () => (
  <div className='space-y-4'>
    <div className='flex gap-4 items-center'>
      <span className='w-20 text-sm'>XXS:</span>
      <Badge variant='default' color='red' size='xxs'>Label</Badge>
      <Badge variant='flat' color='red' size='xxs'>Label</Badge>
      <Badge variant='solid' color='red' size='xxs'>Label</Badge>
      <Badge variant='bordered' color='red' size='xxs'>Label</Badge>
    </div>
    <div className='flex gap-4 items-center'>
      <span className='w-20 text-sm'>Small:</span>
      <Badge variant='default' color='red' size='small'>Label</Badge>
      <Badge variant='flat' color='red' size='small'>Label</Badge>
      <Badge variant='solid' color='red' size='small'>Label</Badge>
      <Badge variant='bordered' color='red' size='small'>Label</Badge>
    </div>
    <div className='flex gap-4 items-center'>
      <span className='w-20 text-sm'>Big:</span>
      <Badge variant='default' color='red' size='big'>Label</Badge>
      <Badge variant='flat' color='red' size='big'>Label</Badge>
      <Badge variant='solid' color='red' size='big'>Label</Badge>
      <Badge variant='bordered' color='red' size='big'>Label</Badge>
    </div>
  </div>
)

export const TurquoiseVariants: StoryFn<BadgeProps> = () => (
  <div className='space-y-4'>
    <div className='flex gap-4 items-center'>
      <span className='w-20 text-sm'>XXS:</span>
      <Badge variant='default' color='turquoise' size='xxs'>Label</Badge>
      <Badge variant='flat' color='turquoise' size='xxs'>Label</Badge>
      <Badge variant='solid' color='turquoise' size='xxs'>Label</Badge>
      <Badge variant='bordered' color='turquoise' size='xxs'>Label</Badge>
    </div>
    <div className='flex gap-4 items-center'>
      <span className='w-20 text-sm'>Small:</span>
      <Badge variant='default' color='turquoise' size='small'>Label</Badge>
      <Badge variant='flat' color='turquoise' size='small'>Label</Badge>
      <Badge variant='solid' color='turquoise' size='small'>Label</Badge>
      <Badge variant='bordered' color='turquoise' size='small'>Label</Badge>
    </div>
    <div className='flex gap-4 items-center'>
      <span className='w-20 text-sm'>Big:</span>
      <Badge variant='default' color='turquoise' size='big'>Label</Badge>
      <Badge variant='flat' color='turquoise' size='big'>Label</Badge>
      <Badge variant='solid' color='turquoise' size='big'>Label</Badge>
      <Badge variant='bordered' color='turquoise' size='big'>Label</Badge>
    </div>
  </div>
)

export const OrangeVariants: StoryFn<BadgeProps> = () => (
  <div className='space-y-4'>
    <div className='flex gap-4 items-center'>
      <span className='w-20 text-sm'>XXS:</span>
      <Badge variant='default' color='orange' size='xxs'>Label</Badge>
      <Badge variant='flat' color='orange' size='xxs'>Label</Badge>
      <Badge variant='solid' color='orange' size='xxs'>Label</Badge>
      <Badge variant='bordered' color='orange' size='xxs'>Label</Badge>
    </div>
    <div className='flex gap-4 items-center'>
      <span className='w-20 text-sm'>Small:</span>
      <Badge variant='default' color='orange' size='small'>Label</Badge>
      <Badge variant='flat' color='orange' size='small'>Label</Badge>
      <Badge variant='solid' color='orange' size='small'>Label</Badge>
      <Badge variant='bordered' color='orange' size='small'>Label</Badge>
    </div>
    <div className='flex gap-4 items-center'>
      <span className='w-20 text-sm'>Big:</span>
      <Badge variant='default' color='orange' size='big'>Label</Badge>
      <Badge variant='flat' color='orange' size='big'>Label</Badge>
      <Badge variant='solid' color='orange' size='big'>Label</Badge>
      <Badge variant='bordered' color='orange' size='big'>Label</Badge>
    </div>
  </div>
)

export const WhiteVariants: StoryFn<BadgeProps> = () => (
  <div className='space-y-4 p-4 bg-gray-800'>
    <div className='flex gap-4 items-center'>
      <span className='w-20 text-sm text-white'>XXS:</span>
      <Badge variant='default' color='white' size='xxs'>Label</Badge>
      <Badge variant='flat' color='white' size='xxs'>Label</Badge>
      <Badge variant='solid' color='white' size='xxs'>Label</Badge>
      <Badge variant='bordered' color='white' size='xxs'>Label</Badge>
    </div>
    <div className='flex gap-4 items-center'>
      <span className='w-20 text-sm text-white'>Small:</span>
      <Badge variant='default' color='white' size='small'>Label</Badge>
      <Badge variant='flat' color='white' size='small'>Label</Badge>
      <Badge variant='solid' color='white' size='small'>Label</Badge>
      <Badge variant='bordered' color='white' size='small'>Label</Badge>
    </div>
    <div className='flex gap-4 items-center'>
      <span className='w-20 text-sm text-white'>Big:</span>
      <Badge variant='default' color='white' size='big'>Label</Badge>
      <Badge variant='flat' color='white' size='big'>Label</Badge>
      <Badge variant='solid' color='white' size='big'>Label</Badge>
      <Badge variant='bordered' color='white' size='big'>Label</Badge>
    </div>
  </div>
)

export const GrayVariants: StoryFn<BadgeProps> = () => (
  <div className='space-y-4'>
    <div className='flex gap-4 items-center'>
      <span className='w-20 text-sm'>XXS:</span>
      <Badge variant='default' color='gray' size='xxs'>Label</Badge>
      <Badge variant='flat' color='gray' size='xxs'>Label</Badge>
      <Badge variant='solid' color='gray' size='xxs'>Label</Badge>
      <Badge variant='bordered' color='gray' size='xxs'>Label</Badge>
    </div>
    <div className='flex gap-4 items-center'>
      <span className='w-20 text-sm'>Small:</span>
      <Badge variant='default' color='gray' size='small'>Label</Badge>
      <Badge variant='flat' color='gray' size='small'>Label</Badge>
      <Badge variant='solid' color='gray' size='small'>Label</Badge>
      <Badge variant='bordered' color='gray' size='small'>Label</Badge>
    </div>
    <div className='flex gap-4 items-center'>
      <span className='w-20 text-sm'>Big:</span>
      <Badge variant='default' color='gray' size='big'>Label</Badge>
      <Badge variant='flat' color='gray' size='big'>Label</Badge>
      <Badge variant='solid' color='gray' size='big'>Label</Badge>
      <Badge variant='bordered' color='gray' size='big'>Label</Badge>
    </div>
  </div>
)

export const LightGrayVariants: StoryFn<BadgeProps> = () => (
  <div className='space-y-4'>
    <div className='flex gap-4 items-center'>
      <span className='w-20 text-sm'>XXS:</span>
      <Badge variant='default' color='light-gray' size='xxs'>Label</Badge>
      <Badge variant='flat' color='light-gray' size='xxs'>Label</Badge>
      <Badge variant='solid' color='light-gray' size='xxs'>Label</Badge>
      <Badge variant='bordered' color='light-gray' size='xxs'>Label</Badge>
    </div>
    <div className='flex gap-4 items-center'>
      <span className='w-20 text-sm'>Small:</span>
      <Badge variant='default' color='light-gray' size='small'>Label</Badge>
      <Badge variant='flat' color='light-gray' size='small'>Label</Badge>
      <Badge variant='solid' color='light-gray' size='small'>Label</Badge>
      <Badge variant='bordered' color='light-gray' size='small'>Label</Badge>
    </div>
    <div className='flex gap-4 items-center'>
      <span className='w-20 text-sm'>Big:</span>
      <Badge variant='default' color='light-gray' size='big'>Label</Badge>
      <Badge variant='flat' color='light-gray' size='big'>Label</Badge>
      <Badge variant='solid' color='light-gray' size='big'>Label</Badge>
      <Badge variant='bordered' color='light-gray' size='big'>Label</Badge>
    </div>
  </div>
)

export const AllVariants: StoryFn<BadgeProps> = () => (
  <div className='space-y-8'>
    <div>
      <h3 className='text-lg font-bold mb-4'>Blue</h3>
      <div className='space-y-4'>
        <div className='flex gap-4 items-center'>
          <span className='w-20 text-sm'>XXS:</span>
          <Badge variant='default' color='blue' size='xxs'>Label</Badge>
          <Badge variant='flat' color='blue' size='xxs'>Label</Badge>
          <Badge variant='solid' color='blue' size='xxs'>Label</Badge>
          <Badge variant='bordered' color='blue' size='xxs'>Label</Badge>
        </div>
        <div className='flex gap-4 items-center'>
          <span className='w-20 text-sm'>Small:</span>
          <Badge variant='default' color='blue' size='small'>Label</Badge>
          <Badge variant='flat' color='blue' size='small'>Label</Badge>
          <Badge variant='solid' color='blue' size='small'>Label</Badge>
          <Badge variant='bordered' color='blue' size='small'>Label</Badge>
        </div>
        <div className='flex gap-4 items-center'>
          <span className='w-20 text-sm'>Big:</span>
          <Badge variant='default' color='blue' size='big'>Label</Badge>
          <Badge variant='flat' color='blue' size='big'>Label</Badge>
          <Badge variant='solid' color='blue' size='big'>Label</Badge>
          <Badge variant='bordered' color='blue' size='big'>Label</Badge>
        </div>
      </div>
    </div>

    <div>
      <h3 className='text-lg font-bold mb-4'>Red</h3>
      <div className='space-y-4'>
        <div className='flex gap-4 items-center'>
          <span className='w-20 text-sm'>XXS:</span>
          <Badge variant='default' color='red' size='xxs'>Label</Badge>
          <Badge variant='flat' color='red' size='xxs'>Label</Badge>
          <Badge variant='solid' color='red' size='xxs'>Label</Badge>
          <Badge variant='bordered' color='red' size='xxs'>Label</Badge>
        </div>
        <div className='flex gap-4 items-center'>
          <span className='w-20 text-sm'>Small:</span>
          <Badge variant='default' color='red' size='small'>Label</Badge>
          <Badge variant='flat' color='red' size='small'>Label</Badge>
          <Badge variant='solid' color='red' size='small'>Label</Badge>
          <Badge variant='bordered' color='red' size='small'>Label</Badge>
        </div>
        <div className='flex gap-4 items-center'>
          <span className='w-20 text-sm'>Big:</span>
          <Badge variant='default' color='red' size='big'>Label</Badge>
          <Badge variant='flat' color='red' size='big'>Label</Badge>
          <Badge variant='solid' color='red' size='big'>Label</Badge>
          <Badge variant='bordered' color='red' size='big'>Label</Badge>
        </div>
      </div>
    </div>

    <div>
      <h3 className='text-lg font-bold mb-4'>Turquoise</h3>
      <div className='space-y-4'>
        <div className='flex gap-4 items-center'>
          <span className='w-20 text-sm'>XXS:</span>
          <Badge variant='default' color='turquoise' size='xxs'>Label</Badge>
          <Badge variant='flat' color='turquoise' size='xxs'>Label</Badge>
          <Badge variant='solid' color='turquoise' size='xxs'>Label</Badge>
          <Badge variant='bordered' color='turquoise' size='xxs'>Label</Badge>
        </div>
        <div className='flex gap-4 items-center'>
          <span className='w-20 text-sm'>Small:</span>
          <Badge variant='default' color='turquoise' size='small'>Label</Badge>
          <Badge variant='flat' color='turquoise' size='small'>Label</Badge>
          <Badge variant='solid' color='turquoise' size='small'>Label</Badge>
          <Badge variant='bordered' color='turquoise' size='small'>Label</Badge>
        </div>
        <div className='flex gap-4 items-center'>
          <span className='w-20 text-sm'>Big:</span>
          <Badge variant='default' color='turquoise' size='big'>Label</Badge>
          <Badge variant='flat' color='turquoise' size='big'>Label</Badge>
          <Badge variant='solid' color='turquoise' size='big'>Label</Badge>
          <Badge variant='bordered' color='turquoise' size='big'>Label</Badge>
        </div>
      </div>
    </div>

    <div>
      <h3 className='text-lg font-bold mb-4'>Orange</h3>
      <div className='space-y-4'>
        <div className='flex gap-4 items-center'>
          <span className='w-20 text-sm'>XXS:</span>
          <Badge variant='default' color='orange' size='xxs'>Label</Badge>
          <Badge variant='flat' color='orange' size='xxs'>Label</Badge>
          <Badge variant='solid' color='orange' size='xxs'>Label</Badge>
          <Badge variant='bordered' color='orange' size='xxs'>Label</Badge>
        </div>
        <div className='flex gap-4 items-center'>
          <span className='w-20 text-sm'>Small:</span>
          <Badge variant='default' color='orange' size='small'>Label</Badge>
          <Badge variant='flat' color='orange' size='small'>Label</Badge>
          <Badge variant='solid' color='orange' size='small'>Label</Badge>
          <Badge variant='bordered' color='orange' size='small'>Label</Badge>
        </div>
        <div className='flex gap-4 items-center'>
          <span className='w-20 text-sm'>Big:</span>
          <Badge variant='default' color='orange' size='big'>Label</Badge>
          <Badge variant='flat' color='orange' size='big'>Label</Badge>
          <Badge variant='solid' color='orange' size='big'>Label</Badge>
          <Badge variant='bordered' color='orange' size='big'>Label</Badge>
        </div>
      </div>
    </div>

    <div>
      <h3 className='text-lg font-bold mb-4'>Gray</h3>
      <div className='space-y-4'>
        <div className='flex gap-4 items-center'>
          <span className='w-20 text-sm'>XXS:</span>
          <Badge variant='default' color='gray' size='xxs'>Label</Badge>
          <Badge variant='flat' color='gray' size='xxs'>Label</Badge>
          <Badge variant='solid' color='gray' size='xxs'>Label</Badge>
          <Badge variant='bordered' color='gray' size='xxs'>Label</Badge>
        </div>
        <div className='flex gap-4 items-center'>
          <span className='w-20 text-sm'>Small:</span>
          <Badge variant='default' color='gray' size='small'>Label</Badge>
          <Badge variant='flat' color='gray' size='small'>Label</Badge>
          <Badge variant='solid' color='gray' size='small'>Label</Badge>
          <Badge variant='bordered' color='gray' size='small'>Label</Badge>
        </div>
        <div className='flex gap-4 items-center'>
          <span className='w-20 text-sm'>Big:</span>
          <Badge variant='default' color='gray' size='big'>Label</Badge>
          <Badge variant='flat' color='gray' size='big'>Label</Badge>
          <Badge variant='solid' color='gray' size='big'>Label</Badge>
          <Badge variant='bordered' color='gray' size='big'>Label</Badge>
        </div>
      </div>
    </div>

    <div>
      <h3 className='text-lg font-bold mb-4'>Light Gray</h3>
      <div className='space-y-4'>
        <div className='flex gap-4 items-center'>
          <span className='w-20 text-sm'>XXS:</span>
          <Badge variant='default' color='light-gray' size='xxs'>Label</Badge>
          <Badge variant='flat' color='light-gray' size='xxs'>Label</Badge>
          <Badge variant='solid' color='light-gray' size='xxs'>Label</Badge>
          <Badge variant='bordered' color='light-gray' size='xxs'>Label</Badge>
        </div>
        <div className='flex gap-4 items-center'>
          <span className='w-20 text-sm'>Small:</span>
          <Badge variant='default' color='light-gray' size='small'>Label</Badge>
          <Badge variant='flat' color='light-gray' size='small'>Label</Badge>
          <Badge variant='solid' color='light-gray' size='small'>Label</Badge>
          <Badge variant='bordered' color='light-gray' size='small'>Label</Badge>
        </div>
        <div className='flex gap-4 items-center'>
          <span className='w-20 text-sm'>Big:</span>
          <Badge variant='default' color='light-gray' size='big'>Label</Badge>
          <Badge variant='flat' color='light-gray' size='big'>Label</Badge>
          <Badge variant='solid' color='light-gray' size='big'>Label</Badge>
          <Badge variant='bordered' color='light-gray' size='big'>Label</Badge>
        </div>
      </div>
    </div>

    <div className='p-4 bg-gray-800 rounded'>
      <h3 className='text-lg font-bold mb-4 text-white'>White (on dark background)</h3>
      <div className='space-y-4'>
        <div className='flex gap-4 items-center'>
          <span className='w-20 text-sm text-white'>XXS:</span>
          <Badge variant='default' color='white' size='xxs'>Label</Badge>
          <Badge variant='flat' color='white' size='xxs'>Label</Badge>
          <Badge variant='solid' color='white' size='xxs'>Label</Badge>
          <Badge variant='bordered' color='white' size='xxs'>Label</Badge>
        </div>
        <div className='flex gap-4 items-center'>
          <span className='w-20 text-sm text-white'>Small:</span>
          <Badge variant='default' color='white' size='small'>Label</Badge>
          <Badge variant='flat' color='white' size='small'>Label</Badge>
          <Badge variant='solid' color='white' size='small'>Label</Badge>
          <Badge variant='bordered' color='white' size='small'>Label</Badge>
        </div>
        <div className='flex gap-4 items-center'>
          <span className='w-20 text-sm text-white'>Big:</span>
          <Badge variant='default' color='white' size='big'>Label</Badge>
          <Badge variant='flat' color='white' size='big'>Label</Badge>
          <Badge variant='solid' color='white' size='big'>Label</Badge>
          <Badge variant='bordered' color='white' size='big'>Label</Badge>
        </div>
      </div>
    </div>
  </div>
)
