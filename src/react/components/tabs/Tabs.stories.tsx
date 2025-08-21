import React from 'react'
import type { Meta, StoryFn } from '@storybook/react'
import { Tabs, TabsProps } from './index'

const meta: Meta<TabsProps> = {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'Currently active tab value (controlled)'
    },
    defaultValue: {
      control: { type: 'text' },
      description: 'Default active tab value (uncontrolled)'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'lg', 'xl'],
      description: 'Size variant'
    },
    onValueChange: { 
      action: 'tab-changed',
      description: 'Callback when active tab changes'
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A sleek tabs component with underline style, built on radix-ui with light/dark theme support.'
      }
    }
  }
}

export default meta

const sampleItems = [
  {
    value: 'tab1',
    label: 'Tab 1',
    content: <div className='p-4'>Content of Tab 1</div>
  },
  {
    value: 'tab2',
    label: 'Tab 2',
    content: <div className='p-4'>Content of Tab 2</div>
  }
]

const Template: StoryFn<TabsProps> = args => <Tabs {...args} />

export const Default = Template.bind({})
Default.args = {
  items: sampleItems,
  defaultValue: 'tab1'
}

export const SecondTabActive = Template.bind({})
SecondTabActive.args = {
  items: sampleItems,
  defaultValue: 'tab2'
}

export const Controlled: StoryFn<TabsProps> = () => {
  const [activeTab, setActiveTab] = React.useState('tab1')

  return (
    <div className='space-y-4'>
      <div className='flex gap-2'>
        <button 
          onClick={() => setActiveTab('tab1')}
          className='px-3 py-1 bg-blue-500 text-white rounded text-sm'
        >
          Set Tab 1
        </button>
        <button 
          onClick={() => setActiveTab('tab2')}
          className='px-3 py-1 bg-green-500 text-white rounded text-sm'
        >
          Set Tab 2
        </button>
      </div>
      <Tabs
        items={sampleItems}
        value={activeTab}
        onValueChange={setActiveTab}
      />
      <p className='text-sm text-gray-600'>
        Active tab: <code>{activeTab}</code>
      </p>
    </div>
  )
}

export const WithDisabledTab = Template.bind({})
WithDisabledTab.args = {
  items: [
    ...sampleItems,
    {
      value: 'tab3',
      label: 'Disabled Tab',
      content: <div className='p-4'>Content of Disabled Tab</div>,
      disabled: true
    }
  ],
  defaultValue: 'tab1'
}

export const ManyTabs = Template.bind({})
ManyTabs.args = {
  items: [
    ...sampleItems,
    {
      value: 'tab3',
      label: 'Tab 3',
      content: <div className='p-4'>Content of Tab 3</div>
    },
    {
      value: 'tab4',
      label: 'Tab 4',
      content: <div className='p-4'>Content of Tab 4</div>
    },
    {
      value: 'tab5',
      label: 'Tab 5',
      content: <div className='p-4'>Content of Tab 5</div>
    }
  ],
  defaultValue: 'tab1'
}

export const SingleTab = Template.bind({})
SingleTab.args = {
  items: [
    {
      value: 'single',
      label: 'Single Tab',
      content: <div className='p-4'>Content of Single Tab</div>
    }
  ],
  defaultValue: 'single'
}

export const EmptyContent = Template.bind({})
EmptyContent.args = {
  items: [
    {
      value: 'empty1',
      label: 'Empty Tab 1',
      content: null
    },
    {
      value: 'empty2', 
      label: 'Empty Tab 2',
      content: <div></div>
    }
  ],
  defaultValue: 'empty1'
}

export const Sizes: StoryFn<TabsProps> = () => {
  const items = [
    {
      value: 'overview',
      label: 'Overview',
      content: <div className='p-4'>Overview content</div>
    },
    {
      value: 'transactions',
      label: 'Transactions',
      content: <div className='p-4'>Transactions content</div>
    },
    {
      value: 'settings',
      label: 'Settings',
      content: <div className='p-4'>Settings content</div>
    }
  ]

  return (
    <div className='space-y-8'>
      <div>
        <h3 className="text-sm font-medium mb-2">Small (sm)</h3>
        <Tabs items={items} size="sm" defaultValue="overview" />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Large (lg)</h3>
        <Tabs items={items} size="lg" defaultValue="overview" />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Extra Large (xl) - Default</h3>
        <Tabs items={items} size="xl" defaultValue="overview" />
      </div>
    </div>
  )
}


