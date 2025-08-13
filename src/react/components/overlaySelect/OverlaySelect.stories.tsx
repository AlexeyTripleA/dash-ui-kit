import React from 'react'
import type { Meta, StoryFn } from '@storybook/react'
import { ThemeProvider } from '../../contexts/ThemeContext'
import { OverlaySelect, OverlaySelectProps } from './index'

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <div style={{ padding: '20px', minHeight: '400px' }}>
      {children}
    </div>
  </ThemeProvider>
)

const basicOptions = [
  { value: 'wallet1', label: 'Main Wallet' },
  { value: 'wallet2', label: 'Savings Wallet' },
  { value: 'wallet3', label: 'Trading Wallet' },
]

const walletsWithButtons = [
  {
    value: 'wallet1',
    label: 'Main Wallet',
    content: (
      <div className='flex items-center space-x-3'>
        <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold'>
          MW
        </div>
        <div>
          <div className='font-medium'>Main Wallet</div>
          <div className='text-xs text-gray-500'>0x1234...5678</div>
        </div>
      </div>
    ),
    buttons: [
      { label: 'Edit', onClick: (value: string) => console.log('Edit', value) },
      { label: 'Delete', onClick: (value: string) => console.log('Delete', value), variant: 'danger' as const }
    ]
  },
  {
    value: 'wallet2', 
    label: 'Savings Wallet',
    content: (
      <div className='flex items-center space-x-3'>
        <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold'>
          SW
        </div>
        <div>
          <div className='font-medium'>Savings Wallet</div>
          <div className='text-xs text-gray-500'>0x9876...5432</div>
        </div>
      </div>
    ),
    buttons: [
      { label: 'Edit', onClick: (value: string) => console.log('Edit', value) },
      { label: 'Delete', onClick: (value: string) => console.log('Delete', value), variant: 'danger' as const }
    ]
  },
  {
    value: 'wallet3',
    label: 'Trading Wallet', 
    content: (
      <div className='flex items-center space-x-3'>
        <div className='w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold'>
          TW
        </div>
        <div>
          <div className='font-medium'>Trading Wallet</div>
          <div className='text-xs text-gray-500'>0xabcd...efgh</div>
        </div>
      </div>
    ),
    buttons: [
      { label: 'Edit', onClick: (value: string) => console.log('Edit', value) },
      { label: 'Delete', onClick: (value: string) => console.log('Delete', value), variant: 'danger' as const }
    ]
  },
]

const meta: Meta<OverlaySelectProps> = {
  title: 'Components/OverlaySelect',
  component: OverlaySelect,
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
    showAddButton: { control: 'boolean' },
    onValueChange: { action: 'value-changed' },
    onAddClick: { action: 'add-clicked' },
  },
}

export default meta

const Template: StoryFn<OverlaySelectProps> = args => <OverlaySelect {...args} />

export const Default = Template.bind({})
Default.args = {
  options: basicOptions,
  placeholder: 'Select wallet...',
  overlayLabel: 'Your wallet',
  size: 'xl',
  border: true,
  showArrow: true,
}

export const WithValue = Template.bind({})
WithValue.args = {
  options: basicOptions,
  value: 'wallet1',
  overlayLabel: 'Your wallet',
  size: 'xl',
  border: true,
}

export const WithButtons = Template.bind({})
WithButtons.args = {
  options: walletsWithButtons,
  placeholder: 'Select wallet...',
  overlayLabel: 'Your wallet',
  size: 'xl',
  border: true,
}

export const WithAddButton = Template.bind({})
WithAddButton.args = {
  options: walletsWithButtons,
  placeholder: 'Select wallet...',
  overlayLabel: 'Your wallet',
  showAddButton: true,
  addButtonLabel: 'Add new wallet',
  size: 'xl',
  border: true,
}

export const FullExample: StoryFn<OverlaySelectProps> = () => {
  const [selectedWallet, setSelectedWallet] = React.useState<string>('')
  
  const handleEdit = (value: string) => {
    console.log('Editing wallet:', value)
  }
  
  const handleDelete = (value: string) => {
    console.log('Deleting wallet:', value)
  }
  
  const handleAdd = () => {
    console.log('Adding new wallet')
  }
  
  const optionsWithHandlers = walletsWithButtons.map(option => ({
    ...option,
    buttons: [
      { label: 'Edit', onClick: handleEdit },
      { label: 'Delete', onClick: handleDelete, variant: 'danger' as const }
    ]
  }))
  
  return (
    <div className='max-w-md space-y-4'>
      <div>
        <label className='block text-sm font-medium mb-2'>
          Choose Wallet
        </label>
        <OverlaySelect
          options={optionsWithHandlers}
          value={selectedWallet}
          onValueChange={setSelectedWallet}
          placeholder='Select wallet...'
          overlayLabel='Your wallet'
          showAddButton={true}
          addButtonLabel='Add wallet'
          onAddClick={handleAdd}
          size='xl'
          colorScheme='brand'
        />
      </div>
      {selectedWallet && (
        <div className='p-3 bg-blue-50 rounded-md'>
          <p className='text-sm text-blue-700'>
            Selected wallet: {selectedWallet}
          </p>
        </div>
      )}
    </div>
  )
}



export const Sizes: StoryFn<OverlaySelectProps> = () => (
  <div className='space-y-8'>
    <div>
      <label className='block text-sm font-medium mb-1'>Small</label>
      <OverlaySelect 
        options={basicOptions} 
        placeholder='Small overlay select...' 
        overlayLabel='Your wallet'
        size='sm' 
      />
    </div>
    <div>
      <label className='block text-sm font-medium mb-1'>Medium</label>
      <OverlaySelect 
        options={basicOptions} 
        placeholder='Medium overlay select...' 
        overlayLabel='Your wallet'
        size='md' 
      />
    </div>
    <div>
      <label className='block text-sm font-medium mb-1'>Extra Large</label>
      <OverlaySelect 
        options={basicOptions} 
        placeholder='Extra large overlay select...' 
        overlayLabel='Your wallet'
        size='xl' 
      />
    </div>
  </div>
)

export const ColorSchemes: StoryFn<OverlaySelectProps> = () => (
  <div className='space-y-8'>
    <div>
      <label className='block text-sm font-medium mb-1'>Default</label>
      <OverlaySelect 
        options={basicOptions} 
        placeholder='Default color scheme...' 
        overlayLabel='Your wallet'
        colorScheme='default'
      />
    </div>
    <div>
      <label className='block text-sm font-medium mb-1'>Brand</label>
      <OverlaySelect 
        options={basicOptions} 
        placeholder='Brand color scheme...' 
        overlayLabel='Your wallet'
        colorScheme='brand'
      />
    </div>
    <div>
      <label className='block text-sm font-medium mb-1'>Error</label>
      <OverlaySelect 
        options={basicOptions} 
        placeholder='Error color scheme...' 
        overlayLabel='Your wallet'
        colorScheme='error'
      />
    </div>
    <div>
      <label className='block text-sm font-medium mb-1'>Success</label>
      <OverlaySelect 
        options={basicOptions} 
        placeholder='Success color scheme...' 
        overlayLabel='Your wallet'
        colorScheme='success'
      />
    </div>
  </div>
)
