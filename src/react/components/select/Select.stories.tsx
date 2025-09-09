import React from 'react'
import type { Meta, StoryFn } from '@storybook/react'
import { Select, SelectProps } from './index'

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ padding: '20px', minHeight: '300px' }}>
    {children}
  </div>
)

const basicOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true },
]

const htmlOptions = [
  {
    value: 'user1',
    label: 'John Doe',
    content: (
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
          JD
        </div>
        <div>
          <div className="font-medium">John Doe</div>
          <div className="text-xs text-gray-500">john@example.com</div>
        </div>
      </div>
    )
  },
  {
    value: 'user2',
    label: 'Jane Smith',
    content: (
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
          JS
        </div>
        <div>
          <div className="font-medium">Jane Smith</div>
          <div className="text-xs text-gray-500">jane@example.com</div>
        </div>
      </div>
    )
  },
  {
    value: 'user3',
    label: 'Bob Johnson',
    content: (
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">
          BJ
        </div>
        <div>
          <div className="font-medium">Bob Johnson</div>
          <div className="text-xs text-gray-500">bob@example.com</div>
        </div>
      </div>
    )
  },
]

const meta: Meta<SelectProps> = {
  title: 'Components/Select',
  component: Select,
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ],
  argTypes: {
    colorScheme: {
      control: { type: 'inline-radio' },
      options: ['default', 'brand', 'error', 'success'],
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'xl'],
    },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    success: { control: 'boolean' },
    border: { control: 'boolean' },
    showArrow: { control: 'boolean' },
    onChange: { action: 'value-changed' },
  },
}

export default meta

const Template: StoryFn<SelectProps> = args => <Select {...args} />

export const Default = Template.bind({})
Default.args = {
  options: basicOptions,
  placeholder: 'Select an option...',
  size: 'xl',
  border: true,
  showArrow: true,
}

export const WithValue = Template.bind({})
WithValue.args = {
  options: basicOptions,
  value: 'option2',
  size: 'xl',
  border: true,
}

export const WithHTMLContent = Template.bind({})
WithHTMLContent.args = {
  options: htmlOptions,
  placeholder: 'Select a user...',
  size: 'xl',
  border: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  options: basicOptions,
  placeholder: 'Select an option...',
  disabled: true,
  size: 'xl',
  border: true,
}

export const ErrorState = Template.bind({})
ErrorState.args = {
  options: basicOptions,
  placeholder: 'Select an option...',
  error: true,
  size: 'xl',
  border: true,
}

export const SuccessState = Template.bind({})
SuccessState.args = {
  options: basicOptions,
  placeholder: 'Select an option...',
  success: true,
  size: 'xl',
  border: true,
}

export const WithoutBorder = Template.bind({})
WithoutBorder.args = {
  options: basicOptions,
  placeholder: 'Select an option...',
  border: false,
  size: 'xl',
}

export const WithoutArrow = Template.bind({})
WithoutArrow.args = {
  options: basicOptions,
  placeholder: 'Select an option...',
  showArrow: false,
  size: 'xl',
  border: true,
}

export const Sizes: StoryFn<SelectProps> = () => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium mb-1">Small</label>
      <Select 
        options={basicOptions} 
        placeholder="Small select..." 
        size="sm" 
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Medium</label>
      <Select 
        options={basicOptions} 
        placeholder="Medium select..." 
        size="md" 
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Extra Large</label>
      <Select 
        options={basicOptions} 
        placeholder="Extra large select..." 
        size="xl" 
      />
    </div>
  </div>
)

export const ColorSchemes: StoryFn<SelectProps> = () => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium mb-1">Default</label>
      <Select 
        options={basicOptions} 
        placeholder="Default color scheme..." 
        colorScheme="default"
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Brand</label>
      <Select 
        options={basicOptions} 
        placeholder="Brand color scheme..." 
        colorScheme="brand"
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Error</label>
      <Select 
        options={basicOptions} 
        placeholder="Error color scheme..." 
        colorScheme="error"
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Success</label>
      <Select 
        options={basicOptions} 
        placeholder="Success color scheme..." 
        colorScheme="success"
      />
    </div>
  </div>
)

export const States: StoryFn<SelectProps> = () => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium mb-1">Normal</label>
      <Select 
        options={basicOptions} 
        placeholder="Normal state..." 
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Error</label>
      <Select 
        options={basicOptions} 
        placeholder="Error state..." 
        error
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Success</label>
      <Select 
        options={basicOptions} 
        placeholder="Success state..." 
        success
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Disabled</label>
      <Select 
        options={basicOptions} 
        placeholder="Disabled state..." 
        disabled
      />
    </div>
  </div>
)

export const ComplexExample: StoryFn<SelectProps> = () => {
  const [selectedUser, setSelectedUser] = React.useState<string>('')
  
  return (
    <div className="max-w-md space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Assign to User
        </label>
        <Select
          options={htmlOptions}
          value={selectedUser}
          onChange={setSelectedUser}
          placeholder="Select a user to assign..."
          size="xl"
          colorScheme="brand"
        />
      </div>
      {selectedUser && (
        <div className="p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-700">
            Selected user: {selectedUser}
          </p>
        </div>
      )}
    </div>
  )
} 