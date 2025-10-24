import React from 'react'
import type { Meta, StoryFn } from '@storybook/react'
import { OverlayMenu, OverlayMenuProps } from './index'

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ padding: '20px', minHeight: '400px' }}>
    {children}
  </div>
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
        <label className='block text-sm font-medium mb-1'>Gray</label>
        <OverlayMenu 
          items={basicMenuItems}
          placeholder='Gray color scheme'
          overlayLabel='Actions'
          colorScheme='gray'
          size='xl'
          border
          showArrow
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Light Gray (new)</label>
        <OverlayMenu 
          items={basicMenuItems}
          placeholder='Light gray (new)'
          overlayLabel='Actions'
          colorScheme='lightGray'
          size='xl'
          border={false}
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

export const FilledVariants: StoryFn<OverlayMenuProps> = () => {
  return (
    <div className='space-y-8'>
      <div>
        <label className='block text-sm font-medium mb-1'>Default Filled</label>
        <OverlayMenu 
          items={basicMenuItems}
          placeholder='Default filled'
          overlayLabel='Actions'
          colorScheme='default'
          size='xl'
          filled={true}
          border={false}
          showArrow
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Brand Filled</label>
        <OverlayMenu 
          items={basicMenuItems}
          placeholder='Brand filled'
          overlayLabel='Actions'
          colorScheme='brand'
          size='xl'
          filled={true}
          border={false}
          showArrow
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Error Filled</label>
        <OverlayMenu 
          items={basicMenuItems}
          placeholder='Error filled'
          overlayLabel='Actions'
          colorScheme='error'
          size='xl'
          filled={true}
          border={false}
          showArrow
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Success Filled</label>
        <OverlayMenu 
          items={basicMenuItems}
          placeholder='Success filled'
          overlayLabel='Actions'
          colorScheme='success'
          size='xl'
          filled={true}
          border={false}
          showArrow
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Gray Filled</label>
        <OverlayMenu 
          items={basicMenuItems}
          placeholder='Gray filled'
          overlayLabel='Actions'
          colorScheme='gray'
          size='xl'
          filled={true}
          border={false}
          showArrow
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Light Gray Filled</label>
        <OverlayMenu 
          items={basicMenuItems}
          placeholder='Light gray filled'
          overlayLabel='Actions'
          colorScheme='lightGray'
          size='xl'
          filled={true}
          border={false}
          showArrow
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Kebab Menu Filled</label>
        <OverlayMenu 
          items={basicMenuItems}
          triggerContent={<KebabMenuIcon className='w-5 h-5' />}
          overlayLabel='Actions'
          colorScheme='brand'
          size='md'
          filled={true}
          border={false}
          showArrow={false}
          className='w-auto px-3'
        />
      </div>
    </div>
  )
}

// Context Menu Icons
const WalletIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <rect x='3' y='6' width='18' height='13' rx='2' stroke='currentColor' strokeWidth='2' />
    <path d='M3 10h18' stroke='currentColor' strokeWidth='2' />
    <circle cx='17' cy='15' r='1' fill='currentColor' />
  </svg>
)

const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <circle cx='12' cy='12' r='3' stroke='currentColor' strokeWidth='2' />
    <path
      d='M12 1v3m0 16v3M4.22 4.22l2.12 2.12m11.32 11.32l2.12 2.12M1 12h3m16 0h3M4.22 19.78l2.12-2.12m11.32-11.32l2.12-2.12'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
    />
  </svg>
)

const contextMenuItems = [
  {
    id: 'view',
    content: (
      <div className='flex items-center gap-2'>
        <EditIcon className='w-4 h-4' />
        <span>View Details</span>
      </div>
    ),
    onClick: () => console.log('View details')
  },
  {
    id: 'copy',
    content: (
      <div className='flex items-center gap-2'>
        <ShareIcon className='w-4 h-4' />
        <span>Copy Address</span>
      </div>
    ),
    onClick: () => console.log('Copy address')
  },
  {
    id: 'settings',
    content: (
      <div className='flex items-center gap-2'>
        <SettingsIcon className='w-4 h-4' />
        <span>Settings</span>
      </div>
    ),
    onClick: () => console.log('Settings')
  },
  {
    id: 'delete',
    content: (
      <div className='flex items-center gap-2 text-red-500'>
        <DeleteIcon className='w-4 h-4' />
        <span>Delete</span>
      </div>
    ),
    onClick: () => console.log('Delete')
  }
]

export const ContextMenuBasic: StoryFn<OverlayMenuProps> = () => {
  const [showMenu, setShowMenu] = React.useState(true)
  
  return (
    <div style={{ position: 'relative', height: '500px', padding: '20px' }}>
      <p className='mb-4 text-sm text-gray-600'>
        Context menu positioned at top: 100px, left: 150px
      </p>
      
      <button 
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        onClick={() => setShowMenu(!showMenu)}
      >
        {showMenu ? 'Hide' : 'Show'} Context Menu
      </button>

      {showMenu && (
        <OverlayMenu 
          variant='context-menu'
          items={contextMenuItems}
          position={{ top: 100, left: 150 }}
          headerContent={
            <div className='flex items-center gap-2'>
              <WalletIcon className='w-4 h-4' />
              <span className='font-medium text-sm'>Wallet Actions</span>
            </div>
          }
          size='md'
          onClose={() => setShowMenu(false)}
        />
      )}
    </div>
  )
}

export const ContextMenuSizes: StoryFn<OverlayMenuProps> = () => {
  const [activeMenu, setActiveMenu] = React.useState<string | null>('sm')
  
  return (
    <div style={{ position: 'relative', height: '600px', padding: '20px' }}>
      <div className='space-x-4 mb-4'>
        <button 
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          onClick={() => setActiveMenu(activeMenu === 'sm' ? null : 'sm')}
        >
          Small
        </button>
        <button 
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          onClick={() => setActiveMenu(activeMenu === 'md' ? null : 'md')}
        >
          Medium
        </button>
        <button 
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          onClick={() => setActiveMenu(activeMenu === 'xl' ? null : 'xl')}
        >
          Extra Large
        </button>
      </div>

      {activeMenu === 'sm' && (
        <OverlayMenu 
          variant='context-menu'
          items={contextMenuItems}
          position={{ top: 80, left: 50 }}
          headerContent={
            <div className='flex items-center gap-2'>
              <SettingsIcon className='w-4 h-4' />
              <span className='font-medium text-xs'>Small Menu</span>
            </div>
          }
          size='sm'
          onClose={() => setActiveMenu(null)}
        />
      )}

      {activeMenu === 'md' && (
        <OverlayMenu 
          variant='context-menu'
          items={contextMenuItems}
          position={{ top: 80, left: 280 }}
          headerContent={
            <div className='flex items-center gap-2'>
              <SettingsIcon className='w-4 h-4' />
              <span className='font-medium text-sm'>Medium Menu</span>
            </div>
          }
          size='md'
          onClose={() => setActiveMenu(null)}
        />
      )}

      {activeMenu === 'xl' && (
        <OverlayMenu 
          variant='context-menu'
          items={contextMenuItems}
          position={{ top: 80, left: 510 }}
          headerContent={
            <div className='flex items-center gap-2'>
              <SettingsIcon className='w-4 h-4' />
              <span className='font-medium text-sm'>Large Menu</span>
            </div>
          }
          size='xl'
          onClose={() => setActiveMenu(null)}
        />
      )}
    </div>
  )
}

export const ContextMenuCustomWidth: StoryFn<OverlayMenuProps> = () => {
  const [showMenu, setShowMenu] = React.useState(true)
  
  return (
    <div style={{ position: 'relative', height: '500px', padding: '20px' }}>
      <p className='mb-4 text-sm text-gray-600'>
        Context menu with custom width (300px)
      </p>
      
      <button 
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        onClick={() => setShowMenu(!showMenu)}
      >
        {showMenu ? 'Hide' : 'Show'} Context Menu
      </button>

      {showMenu && (
        <OverlayMenu 
          variant='context-menu'
          items={[
            {
              id: 'wallet-info',
              content: (
                <div className='flex flex-col'>
                  <span className='font-medium'>Main Wallet</span>
                  <span className='text-xs text-gray-500'>0x1234...5678</span>
                </div>
              ),
              onClick: () => console.log('Wallet info')
            },
            ...contextMenuItems
          ]}
          position={{ top: 100, left: 150 }}
          headerContent={
            <div className='flex items-center gap-2'>
              <WalletIcon className='w-4 h-4' />
              <span className='font-medium text-sm'>Wallet Menu</span>
            </div>
          }
          width={300}
          size='md'
          onClose={() => setShowMenu(false)}
        />
      )}
    </div>
  )
}

export const ContextMenuRightAligned: StoryFn<OverlayMenuProps> = () => {
  const [showMenu, setShowMenu] = React.useState(true)
  
  return (
    <div style={{ position: 'relative', height: '500px', padding: '20px' }}>
      <p className='mb-4 text-sm text-gray-600'>
        Context menu positioned from right (right: 50px, top: 100px)
      </p>
      
      <button 
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        onClick={() => setShowMenu(!showMenu)}
      >
        {showMenu ? 'Hide' : 'Show'} Context Menu
      </button>

      {showMenu && (
        <OverlayMenu 
          variant='context-menu'
          items={contextMenuItems}
          position={{ top: 100, right: 50 }}
          headerContent={
            <div className='flex items-center gap-2'>
              <KebabMenuIcon className='w-4 h-4' />
              <span className='font-medium text-sm'>Options</span>
            </div>
          }
          size='md'
          onClose={() => setShowMenu(false)}
        />
      )}
    </div>
  )
}

export const ContextMenuWithCloseButton: StoryFn<OverlayMenuProps> = () => {
  const [showMenu, setShowMenu] = React.useState(true)
  
  return (
    <div style={{ position: 'relative', height: '500px', padding: '20px' }}>
      <p className='mb-4 text-sm text-gray-600'>
        Context menu with close button (showCloseButton=true)
      </p>
      
      <button 
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        onClick={() => setShowMenu(!showMenu)}
      >
        {showMenu ? 'Hide' : 'Show'} Context Menu
      </button>

      {showMenu && (
        <OverlayMenu 
          variant='context-menu'
          items={contextMenuItems}
          position={{ top: 100, left: 150 }}
          headerContent={
            <div className='flex items-center gap-2'>
              <SettingsIcon className='w-4 h-4' />
              <span className='font-medium text-sm'>Settings</span>
            </div>
          }
          showCloseButton
          size='md'
          onClose={() => {
            console.log('Menu closed')
            setShowMenu(false)
          }}
        />
      )}
    </div>
  )
}

export const HeaderContentVariants: StoryFn<OverlayMenuProps> = () => {
  return (
    <div className='space-y-8'>
      <div>
        <label className='block text-sm font-medium mb-1'>Dropdown with Custom Header Content</label>
        <OverlayMenu 
          items={basicMenuItems}
          headerContent={
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs'>
                A
              </div>
              <div className='flex-1'>
                <div className='font-medium text-sm'>Alexey</div>
                <div className='text-xs text-gray-500'>alexey@example.com</div>
              </div>
            </div>
          }
          showCloseButton
          size='xl'
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Dropdown with Simple Header</label>
        <OverlayMenu 
          items={basicMenuItems}
          headerContent={
            <span className='font-medium text-sm'>Actions Menu</span>
          }
          showCloseButton
          size='md'
        />
      </div>
    </div>
  )
}
