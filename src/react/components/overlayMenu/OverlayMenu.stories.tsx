import React from 'react'
import type { Meta, StoryFn } from '@storybook/react'
import { ThemeProvider } from '../../contexts/ThemeContext'
import { OverlayMenu, OverlayMenuProps } from './index'

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <div style={{ padding: '20px', minHeight: '400px' }}>
      {children}
    </div>
  </ThemeProvider>
)

// Kebab Menu Icon for examples
const KebabMenuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <circle cx='12' cy='6' r='2' fill='currentColor' />
    <circle cx='12' cy='12' r='2' fill='currentColor' />
    <circle cx='12' cy='18' r='2' fill='currentColor' />
  </svg>
)

// Edit Icon
const EditIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

// Delete Icon
const DeleteIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

// Share Icon
const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const basicMenuItems = [
  {
    id: 'edit',
    content: (
      <div className='flex items-center space-x-2'>
        <EditIcon className='w-4 h-4' />
        <span>Edit</span>
      </div>
    ),
    onClick: () => console.log('Edit clicked')
  },
  {
    id: 'share',
    content: (
      <div className='flex items-center space-x-2'>
        <ShareIcon className='w-4 h-4' />
        <span>Share</span>
      </div>
    ),
    onClick: () => console.log('Share clicked')
  },
  {
    id: 'delete',
    content: (
      <div className='flex items-center space-x-2 text-red-500'>
        <DeleteIcon className='w-4 h-4' />
        <span>Delete</span>
      </div>
    ),
    onClick: () => console.log('Delete clicked')
  }
]

const walletMenuItems = [
  {
    id: 'view-details',
    content: (
      <div className='flex items-center space-x-2'>
        <div className='w-4 h-4 bg-blue-500 rounded-full' />
        <span>View Details</span>
      </div>
    ),
    onClick: () => console.log('View details clicked')
  },
  {
    id: 'copy-address',
    content: (
      <div className='flex items-center space-x-2'>
        <div className='w-4 h-4 bg-green-500 rounded-full' />
        <span>Copy Address</span>
      </div>
    ),
    onClick: () => console.log('Copy address clicked')
  },
  {
    id: 'rename',
    content: (
      <div className='flex items-center space-x-2'>
        <EditIcon className='w-4 h-4' />
        <span>Rename Wallet</span>
      </div>
    ),
    onClick: () => console.log('Rename clicked')
  },
  {
    id: 'delete-wallet',
    content: (
      <div className='flex items-center space-x-2 text-red-500'>
        <DeleteIcon className='w-4 h-4' />
        <span>Delete Wallet</span>
      </div>
    ),
    onClick: () => console.log('Delete wallet clicked')
  }
]

const meta: Meta<OverlayMenuProps> = {
  title: 'Components/OverlayMenu',
  component: OverlayMenu,
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
      options: ['default', 'brand', 'error', 'success', 'lightGray'],
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
  },
}

export default meta

const Template: StoryFn<OverlayMenuProps> = (args) => {
  return <OverlayMenu {...args} />
}

export const Default = Template.bind({})
Default.args = {
  items: basicMenuItems,
  placeholder: 'Menu',
  overlayLabel: 'Actions',
  size: 'xl',
  border: true,
  showArrow: true,
}

export const WithKebabTrigger = Template.bind({})
WithKebabTrigger.args = {
  items: basicMenuItems,
  triggerContent: <KebabMenuIcon className='w-5 h-5' />,
  overlayLabel: 'Actions',
  size: 'md',
  border: false,
  showArrow: false,
  className: 'w-auto px-2'
}

export const WalletMenu = Template.bind({})
WalletMenu.args = {
  items: walletMenuItems,
  triggerContent: (
    <div className='flex items-center space-x-3'>
      <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold'>
        MW
      </div>
      <div className='flex-1 text-left'>
        <div className='font-medium'>Main Wallet</div>
        <div className='text-xs text-gray-500'>0x1234...5678</div>
      </div>
    </div>
  ),
  overlayLabel: 'Wallet Actions',
  size: 'xl',
  border: true,
}

export const CustomContent: StoryFn<OverlayMenuProps> = () => {
  const customItems = [
    {
      id: 'profile',
      content: (
        <div className='flex items-center space-x-3 p-2'>
          <div className='w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold'>
            A
          </div>
          <div>
            <div className='font-medium'>Alexey</div>
            <div className='text-xs text-gray-500'>alexey@example.com</div>
          </div>
        </div>
      ),
      onClick: () => console.log('Profile clicked')
    },
    {
      id: 'settings',
      content: (
        <div className='flex items-center justify-between p-2'>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-gray-400 rounded' />
            <span>Settings</span>
          </div>
          <div className='text-xs text-gray-400'>⌘,</div>
        </div>
      ),
      onClick: () => console.log('Settings clicked')
    },
    {
      id: 'notifications',
      content: (
        <div className='flex items-center justify-between p-2'>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-yellow-400 rounded' />
            <span>Notifications</span>
          </div>
          <div className='w-2 h-2 bg-red-500 rounded-full' />
        </div>
      ),
      onClick: () => console.log('Notifications clicked')
    }
  ]

  return (
    <div className='max-w-xs'>
      <OverlayMenu
        items={customItems}
        triggerContent={
          <div className='flex items-center space-x-2'>
            <div className='w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
              A
            </div>
            <span className='font-medium'>Alexey</span>
          </div>
        }
        size='xl'
        border={true}
        showArrow={true}
      />
    </div>
  )
}

export const Sizes: StoryFn<OverlayMenuProps> = () => {
  return (
    <div className='space-y-8'>
      <div>
        <label className='block text-sm font-medium mb-1'>Small</label>
        <OverlayMenu 
          items={basicMenuItems}
          placeholder='Small menu'
          overlayLabel='Actions'
          size='sm'
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Medium</label>
        <OverlayMenu 
          items={basicMenuItems}
          placeholder='Medium menu'
          overlayLabel='Actions'
          size='md'
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Extra Large</label>
        <OverlayMenu 
          items={basicMenuItems}
          placeholder='Extra large menu'
          overlayLabel='Actions'
          size='xl'
        />
      </div>
    </div>
  )
}

export const ColorSchemes: StoryFn<OverlayMenuProps> = () => {
  return (
    <div className='space-y-8'>
      <div>
        <label className='block text-sm font-medium mb-1'>Default</label>
        <OverlayMenu 
          items={basicMenuItems}
          placeholder='Default color scheme'
          overlayLabel='Actions'
          colorScheme='default'
          size='xl'
          border
          showArrow
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Brand</label>
        <OverlayMenu 
          items={basicMenuItems}
          placeholder='Brand color scheme'
          overlayLabel='Actions'
          colorScheme='brand'
          size='xl'
          border
          showArrow
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Error</label>
        <OverlayMenu 
          items={basicMenuItems}
          placeholder='Error color scheme'
          overlayLabel='Actions'
          colorScheme='error'
          size='xl'
          border
          showArrow
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Success</label>
        <OverlayMenu 
          items={basicMenuItems}
          placeholder='Success color scheme'
          overlayLabel='Actions'
          colorScheme='success'
          size='xl'
          border
          showArrow
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Light Gray</label>
        <OverlayMenu 
          items={basicMenuItems}
          placeholder='Light gray color scheme'
          overlayLabel='Actions'
          colorScheme='lightGray'
          size='xl'
          border
          showArrow
        />
      </div>
    </div>
  )
}

export const BorderlessVariants: StoryFn<OverlayMenuProps> = () => {
  return (
    <div className='space-y-8'>
      <div>
        <label className='block text-sm font-medium mb-1'>Default Borderless</label>
        <OverlayMenu 
          items={basicMenuItems}
          placeholder='Default borderless'
          overlayLabel='Actions'
          colorScheme='default'
          size='xl'
          border={false}
          showArrow
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Light Gray Borderless</label>
        <OverlayMenu 
          items={basicMenuItems}
          placeholder='Light gray borderless'
          overlayLabel='Actions'
          colorScheme='lightGray'
          size='xl'
          border={false}
          showArrow
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Kebab Menu (Borderless)</label>
        <OverlayMenu 
          items={basicMenuItems}
          triggerContent={<KebabMenuIcon className='w-5 h-5' />}
          overlayLabel='Actions'
          colorScheme='lightGray'
          size='md'
          border={false}
          showArrow={false}
          className='w-auto px-2'
        />
      </div>
    </div>
  )
}
