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

const walletsWithContent = [
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
    )
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
    )
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
    )
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
      options: ['default', 'brand', 'error', 'success', 'gray', 'lightGray'],
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'xl'],
    },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    success: { control: 'boolean' },
    border: { control: 'boolean' },
    filled: { control: 'boolean' },
    showArrow: { control: 'boolean' },
    onValueChange: { action: 'value-changed' },
  },
}

export default meta

const Template: StoryFn<OverlaySelectProps> = (args) => {
  const [value, setValue] = React.useState<string>(args.value || '')
  
  return (
    <OverlaySelect 
      {...args} 
      value={value}
      onValueChange={(newValue) => {
        setValue(newValue)
        args.onValueChange?.(newValue)
      }}
    />
  )
}

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

export const WithContent = Template.bind({})
WithContent.args = {
  options: walletsWithContent,
  placeholder: 'Select wallet...',
  overlayLabel: 'Your wallet',
  size: 'xl',
  border: true,
}



export const FullExample: StoryFn<OverlaySelectProps> = () => {
  const [selectedWallet, setSelectedWallet] = React.useState<string>('')
  
  return (
    <div className='max-w-md space-y-4'>
      <div>
        <label className='block text-sm font-medium mb-2'>
          Choose Wallet
        </label>
        <OverlaySelect
          options={walletsWithContent}
          value={selectedWallet}
          onValueChange={setSelectedWallet}
          placeholder='Select wallet...'
          overlayLabel='Your wallet'
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



export const Sizes: StoryFn<OverlaySelectProps> = () => {
  const [smallValue, setSmallValue] = React.useState<string>('')
  const [mediumValue, setMediumValue] = React.useState<string>('')
  const [largeValue, setLargeValue] = React.useState<string>('')

  return (
    <div className='space-y-8'>
      <div>
        <label className='block text-sm font-medium mb-1'>Small</label>
        <OverlaySelect 
          options={basicOptions} 
          placeholder='Small overlay select...' 
          overlayLabel='Your wallet'
          size='sm'
          value={smallValue}
          onValueChange={setSmallValue}
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Medium</label>
        <OverlaySelect 
          options={basicOptions} 
          placeholder='Medium overlay select...' 
          overlayLabel='Your wallet'
          size='md'
          value={mediumValue}
          onValueChange={setMediumValue}
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Extra Large</label>
        <OverlaySelect 
          options={basicOptions} 
          placeholder='Extra large overlay select...' 
          overlayLabel='Your wallet'
          size='xl'
          value={largeValue}
          onValueChange={setLargeValue}
        />
      </div>
    </div>
  )
}

export const ColorSchemes: StoryFn<OverlaySelectProps> = () => {
  const [defaultValue, setDefaultValue] = React.useState<string>('')
  const [brandValue, setBrandValue] = React.useState<string>('')
  const [errorValue, setErrorValue] = React.useState<string>('')
  const [successValue, setSuccessValue] = React.useState<string>('')
  const [grayValue, setGrayValue] = React.useState<string>('')
  const [lightGrayValue, setLightGrayValue] = React.useState<string>('')

  return (
    <div className='space-y-8'>
      <div>
        <label className='block text-sm font-medium mb-1'>Default</label>
        <OverlaySelect 
          options={basicOptions} 
          placeholder='Default color scheme...' 
          overlayLabel='Your wallet'
          colorScheme='default'
          value={defaultValue}
          onValueChange={setDefaultValue}
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Brand</label>
        <OverlaySelect 
          options={basicOptions} 
          placeholder='Brand color scheme...' 
          overlayLabel='Your wallet'
          colorScheme='brand'
          value={brandValue}
          onValueChange={setBrandValue}
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Error</label>
        <OverlaySelect 
          options={basicOptions} 
          placeholder='Error color scheme...' 
          overlayLabel='Your wallet'
          colorScheme='error'
          value={errorValue}
          onValueChange={setErrorValue}
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Success</label>
        <OverlaySelect 
          options={basicOptions} 
          placeholder='Success color scheme...' 
          overlayLabel='Your wallet'
          colorScheme='success'
          value={successValue}
          onValueChange={setSuccessValue}
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Gray</label>
        <OverlaySelect 
          options={basicOptions} 
          placeholder='Gray color scheme...' 
          overlayLabel='Your wallet'
          colorScheme='gray'
          value={grayValue}
          onValueChange={setGrayValue}
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Light Gray (new)</label>
        <OverlaySelect 
          options={basicOptions} 
          placeholder='Light gray (new)...' 
          overlayLabel='Your wallet'
          colorScheme='lightGray'
          border={false}
          value={lightGrayValue}
          onValueChange={setLightGrayValue}
        />
      </div>
    </div>
  )
}

export const BorderlessVariants: StoryFn<OverlaySelectProps> = () => {
  const [defaultValue, setDefaultValue] = React.useState<string>('')
  const [lightGrayValue, setLightGrayValue] = React.useState<string>('')

  return (
    <div className='space-y-8'>
      <div>
        <label className='block text-sm font-medium mb-1'>Default Borderless</label>
        <OverlaySelect 
          options={basicOptions} 
          placeholder='Default borderless...' 
          overlayLabel='Your wallet'
          colorScheme='default'
          size='xl'
          border={false}
          value={defaultValue}
          onValueChange={setDefaultValue}
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Light Gray Borderless</label>
        <OverlaySelect 
          options={walletsWithContent} 
          placeholder='Light gray borderless...' 
          overlayLabel='Your wallet'
          colorScheme='lightGray'
          size='xl'
          border={false}
          value={lightGrayValue}
          onValueChange={setLightGrayValue}
        />
      </div>
    </div>
  )
}

export const FilledVariants: StoryFn<OverlaySelectProps> = () => {
  const [defaultValue, setDefaultValue] = React.useState<string>('')
  const [brandValue, setBrandValue] = React.useState<string>('')
  const [errorValue, setErrorValue] = React.useState<string>('')
  const [successValue, setSuccessValue] = React.useState<string>('')
  const [lightGrayValue, setLightGrayValue] = React.useState<string>('')

  return (
    <div className='space-y-8'>
      <div>
        <label className='block text-sm font-medium mb-1'>Default Filled</label>
        <OverlaySelect 
          options={basicOptions} 
          placeholder='Default filled...' 
          overlayLabel='Your wallet'
          colorScheme='default'
          size='xl'
          filled={true}
          border={false}
          value={defaultValue}
          onValueChange={setDefaultValue}
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Brand Filled</label>
        <OverlaySelect 
          options={basicOptions} 
          placeholder='Brand filled...' 
          overlayLabel='Your wallet'
          colorScheme='brand'
          size='xl'
          filled={true}
          border={false}
          value={brandValue}
          onValueChange={setBrandValue}
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Error Filled</label>
        <OverlaySelect 
          options={basicOptions} 
          placeholder='Error filled...' 
          overlayLabel='Your wallet'
          colorScheme='error'
          size='xl'
          filled={true}
          border={false}
          value={errorValue}
          onValueChange={setErrorValue}
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Success Filled</label>
        <OverlaySelect 
          options={basicOptions} 
          placeholder='Success filled...' 
          overlayLabel='Your wallet'
          colorScheme='success'
          size='xl'
          filled={true}
          border={false}
          value={successValue}
          onValueChange={setSuccessValue}
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Light Gray Filled</label>
        <OverlaySelect 
          options={walletsWithContent} 
          placeholder='Light gray filled...' 
          overlayLabel='Your wallet'
          colorScheme='lightGray'
          size='xl'
          filled={true}
          border={false}
          value={lightGrayValue}
          onValueChange={setLightGrayValue}
        />
      </div>
    </div>
  )
}
