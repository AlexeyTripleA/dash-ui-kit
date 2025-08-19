import React from 'react'
import type { Meta, StoryFn } from '@storybook/react'
import { DashLogo, DashLogoProps } from './index'

const meta: Meta<DashLogoProps> = {
  title: 'Components/DashLogo',
  component: DashLogo,
  argTypes: {
    color: {
      control: { type: 'color' },
    },
    size: {
      control: { type: 'range', min: 10, max: 200, step: 5 },
    },
    width: {
      control: { type: 'range', min: 10, max: 200, step: 5 },
    },
    height: {
      control: { type: 'range', min: 10, max: 200, step: 5 },
    },
    className: {
      control: { type: 'text' },
    },
    onClick: { action: 'clicked' },
  },
}

export default meta

const Template: StoryFn<DashLogoProps> = args => <DashLogo {...args} />

export const Default = Template.bind({})
Default.args = {}

export const Small = Template.bind({})
Small.args = {
  size: 20,
}

export const Medium = Template.bind({})
Medium.args = {
  size: 40,
}

export const Large = Template.bind({})
Large.args = {
  size: 80,
}

export const CustomColor = Template.bind({})
CustomColor.args = {
  color: '#FF6B35',
  size: 60,
}

export const CustomDimensions = Template.bind({})
CustomDimensions.args = {
  width: 90,
  height: 50,
}

export const Clickable = Template.bind({})
Clickable.args = {
  size: 50,
  onClick: () => alert('Logo clicked!'),
}

export const WithCustomStyles = Template.bind({})
WithCustomStyles.args = {
  size: 60,
  className: 'shadow-lg hover:opacity-80 transition-opacity',
}

export const AllSizes = () => (
  <div className="flex items-center gap-4 p-4">
    <DashLogo size={20} />
    <DashLogo size={30} />
    <DashLogo size={40} />
    <DashLogo size={60} />
    <DashLogo size={80} />
  </div>
)

export const ColorVariations = () => (
  <div className="flex items-center gap-4 p-4">
    <DashLogo size={50} color="#4C7EFF" />
    <DashLogo size={50} color="#FF6B35" />
    <DashLogo size={50} color="#00D9FF" />
    <DashLogo size={50} color="#7C3AED" />
    <DashLogo size={50} color="#10B981" />
  </div>
)

export const CSSClassColors = () => (
  <div className="flex flex-col gap-6 p-4">
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium w-32">CSS Classes:</span>
      <DashLogo size={50} className="text-red-500" />
      <DashLogo size={50} className="text-blue-600" />
      <DashLogo size={50} className="text-green-500" />
      <DashLogo size={50} className="text-purple-600" />
      <DashLogo size={50} className="text-orange-500" />
    </div>
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium w-32">Default (no color):</span>
      <DashLogo size={50} />
    </div>
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium w-32">Prop overrides CSS:</span>
      <DashLogo size={50} color="#FF0000" className="text-blue-600" />
      <span className="text-xs text-gray-500">Red prop wins over blue class</span>
    </div>
  </div>
) 