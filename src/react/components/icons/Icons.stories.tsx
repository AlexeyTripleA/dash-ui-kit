import type { Meta, StoryObj } from '@storybook/react'
import {
  ArrowIcon,
  CopyIcon,
  SuccessIcon,
  ErrorIcon,
  QueuedIcon,
  PooledIcon,
  BroadcastedIcon,
  CalendarIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  CheckIcon,
  KeyIcon,
  ProtectedMessageIcon,
  SmartphoneIcon,
  CrossIcon,
  WalletIcon,
  WalletSmallIcon,
  PlusIcon,
  FilterIcon,
  EditIcon,
  DeleteIcon,
  ChevronIcon,
  BurgerMenuIcon,
  KebabMenuIcon,
  CircleProcessIcon,
  CreditsIcon,
  WebIcon,
  ChainSmallIcon,
  SettingsIcon,
  ShieldSmallIcon
} from './index'

const meta: Meta = {
  title: 'Components/Icons',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Collection of icon components with customizable size, color, and click handlers.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 10, max: 64, step: 1 },
      description: 'Icon size in pixels'
    },
    color: {
      control: { type: 'color' },
      description: 'Icon color (CSS color value)'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes'
    }
  }
}

export default meta

// All Icons Overview
export const AllIcons: StoryObj = {
  render: () => (
    <div className="grid grid-cols-4 gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <ArrowIcon />
        <span className="text-sm">ArrowIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CopyIcon />
        <span className="text-sm">CopyIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SuccessIcon />
        <span className="text-sm">SuccessIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ErrorIcon />
        <span className="text-sm">ErrorIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <QueuedIcon />
        <span className="text-sm">QueuedIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PooledIcon />
        <span className="text-sm">PooledIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BroadcastedIcon />
        <span className="text-sm">BroadcastedIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CalendarIcon color="#333" />
        <span className="text-sm">CalendarIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <EyeOpenIcon color="#333" />
        <span className="text-sm">EyeOpenIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <EyeClosedIcon color="#333" />
        <span className="text-sm">EyeClosedIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CheckIcon />
        <span className="text-sm">CheckIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <KeyIcon />
        <span className="text-sm">KeyIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ProtectedMessageIcon />
        <span className="text-sm">ProtectedMessageIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SmartphoneIcon />
        <span className="text-sm">SmartphoneIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CrossIcon />
        <span className="text-sm">CrossIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <WalletIcon />
        <span className="text-sm">WalletIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <WalletSmallIcon />
        <span className="text-sm">WalletSmallIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PlusIcon />
        <span className="text-sm">PlusIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FilterIcon />
        <span className="text-sm">FilterIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <EditIcon />
        <span className="text-sm">EditIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <DeleteIcon />
        <span className="text-sm">DeleteIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ChevronIcon />
        <span className="text-sm">ChevronIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BurgerMenuIcon />
        <span className="text-sm">BurgerMenuIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <KebabMenuIcon size={2} />
        <span className="text-sm">KebabMenuIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircleProcessIcon />
        <span className="text-sm">CircleProcessIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CreditsIcon />
        <span className="text-sm">CreditsIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <WebIcon />
        <span className="text-sm">WebIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ChainSmallIcon />
        <span className="text-sm">ChainSmallIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SettingsIcon />
        <span className="text-sm">SettingsIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ShieldSmallIcon />
        <span className="text-sm">ShieldSmallIcon</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available icons in their default state.'
      }
    }
  }
}

// Arrow Icon
export const Arrow: StoryObj = {
  render: (args) => <ArrowIcon {...args} />,
  args: {
    size: 14,
    color: 'white',
    className: ''
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
}

// Copy Icon
export const Copy: StoryObj = {
  render: (args) => <CopyIcon {...args} />,
  args: {
    size: 16,
    color: 'white',
    className: ''
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
}

// Success Icon
export const Success: StoryObj = {
  render: (args) => <SuccessIcon {...args} />,
  args: {
    size: 18,
    color: '#1CC400',
    className: ''
  }
}

// Error Icon
export const Error: StoryObj = {
  render: (args) => <ErrorIcon {...args} />,
  args: {
    size: 18,
    color: '#F45858',
    className: ''
  }
}

// Queued Icon
export const Queued: StoryObj = {
  render: (args) => <QueuedIcon {...args} />,
  args: {
    size: 18,
    color: '#F4A358',
    className: ''
  }
}

// Pooled Icon
export const Pooled: StoryObj = {
  render: (args) => <PooledIcon {...args} />,
  args: {
    size: 18,
    color: '#008DE4',
    className: ''
  }
}

// Broadcasted Icon
export const Broadcasted: StoryObj = {
  render: (args) => <BroadcastedIcon {...args} />,
  args: {
    size: 18,
    color: '#008DE4',
    className: ''
  }
}

// Calendar Icon
export const Calendar: StoryObj = {
  render: (args) => <CalendarIcon {...args} />,
  args: {
    size: 14,
    color: 'currentColor',
    className: 'text-gray-700'
  }
}

// Eye Open Icon
export const EyeOpen: StoryObj = {
  render: (args) => <EyeOpenIcon {...args} />,
  args: {
    size: 16,
    color: 'currentColor',
    className: 'text-gray-700'
  }
}

// Eye Closed Icon
export const EyeClosed: StoryObj = {
  render: (args) => <EyeClosedIcon {...args} />,
  args: {
    size: 16,
    color: 'currentColor',
    className: 'text-gray-700'
  }
}

// Check Icon
export const Check: StoryObj = {
  render: (args) => <CheckIcon {...args} />,
  args: {
    size: 20,
    color: '#4C7EFF',
    className: ''
  }
}

// Size Variations
export const SizeVariations: StoryObj = {
  render: () => (
    <div className="flex items-center gap-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <SuccessIcon size={12} />
        <span className="text-xs">12px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SuccessIcon size={16} />
        <span className="text-xs">16px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SuccessIcon size={20} />
        <span className="text-xs">20px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SuccessIcon size={24} />
        <span className="text-xs">24px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SuccessIcon size={32} />
        <span className="text-xs">32px</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons can be displayed in different sizes using the size prop.'
      }
    }
  }
}

// Color Variations
export const ColorVariations: StoryObj = {
  render: () => (
    <div className="flex items-center gap-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <SuccessIcon color="#1CC400" />
        <span className="text-xs">Green</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SuccessIcon color="#F45858" />
        <span className="text-xs">Red</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SuccessIcon color="#008DE4" />
        <span className="text-xs">Blue</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SuccessIcon color="#F4A358" />
        <span className="text-xs">Orange</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SuccessIcon color="#9333EA" />
        <span className="text-xs">Purple</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons support custom colors via the color prop.'
      }
    }
  }
}

// Key Icon
export const Key: StoryObj = {
  render: (args) => <KeyIcon {...args} />,
  args: {
    size: 16,
    color: '#4C7EFF',
    className: ''
  }
}

// Protected Message Icon
export const ProtectedMessage: StoryObj = {
  render: (args) => <ProtectedMessageIcon {...args} />,
  args: {
    size: 16,
    color: '#4C7EFF',
    className: ''
  }
}

// Smartphone Icon
export const Smartphone: StoryObj = {
  render: (args) => <SmartphoneIcon {...args} />,
  args: {
    size: 12,
    color: '#4C7EFF',
    className: ''
  }
}

// Cross Icon
export const Cross: StoryObj = {
  render: (args) => <CrossIcon {...args} />,
  args: {
    size: 16,
    color: '#0C1C33',
    className: ''
  }
}

// Wallet Icon
export const Wallet: StoryObj = {
  render: (args) => <WalletIcon {...args} />,
  args: {
    size: 16,
    color: '#0C1C33',
    className: ''
  }
}

// Wallet Small Icon
export const WalletSmall: StoryObj = {
  render: (args) => <WalletSmallIcon {...args} />,
  args: {
    size: 16,
    color: '#0C1C33',
    className: ''
  }
}

// Plus Icon
export const Plus: StoryObj = {
  render: (args) => <PlusIcon {...args} />,
  args: {
    size: 17,
    color: '#4C7EFF',
    className: ''
  }
}

// Filter Icon
export const Filter: StoryObj = {
  render: (args) => <FilterIcon {...args} />,
  args: {
    size: 16,
    color: '#0C1C33',
    className: ''
  }
}

// Edit Icon
export const Edit: StoryObj = {
  render: (args) => <EditIcon {...args} />,
  args: {
    size: 16,
    color: '#0C1C33',
    className: ''
  }
}

// Delete Icon
export const Delete: StoryObj = {
  render: (args) => <DeleteIcon {...args} />,
  args: {
    size: 16,
    color: '#0C1C33',
    className: ''
  }
}

// Chevron Icon
export const Chevron: StoryObj = {
  render: (args) => <ChevronIcon {...args} />,
  args: {
    size: 12,
    color: '#0C1C33',
    className: ''
  }
}

// Burger Menu Icon
export const BurgerMenu: StoryObj = {
  render: (args) => <BurgerMenuIcon {...args} />,
  args: {
    size: 24,
    color: '#0C1C33',
    className: ''
  }
}

// Kebab Menu Icon
export const KebabMenu: StoryObj = {
  render: (args) => <KebabMenuIcon {...args} />,
  args: {
    size: 2,
    color: '#0C1C33',
    className: ''
  }
}

// Circle Process Icon
export const CircleProcess: StoryObj = {
  render: (args) => <CircleProcessIcon {...args} />,
  args: {
    size: 20,
    color: '#4C7EFF',
    className: ''
  }
}

// Credits Icon
export const Credits: StoryObj = {
  render: (args) => <CreditsIcon {...args} />,
  args: {
    size: 14,
    color: '#4C7EFF',
    className: ''
  }
}

// Web Icon
export const Web: StoryObj = {
  render: (args) => <WebIcon {...args} />,
  args: {
    size: 16,
    color: '#4C7EFF',
    className: ''
  }
}

// Chain Small Icon
export const ChainSmall: StoryObj = {
  render: (args) => <ChainSmallIcon {...args} />,
  args: {
    size: 17,
    color: '#0C1C33',
    className: ''
  }
}

// Settings Icon
export const Settings: StoryObj = {
  render: (args) => <SettingsIcon {...args} />,
  args: {
    size: 17,
    color: '#0C1C33',
    className: ''
  }
}

// Shield Small Icon
export const ShieldSmall: StoryObj = {
  render: (args) => <ShieldSmallIcon {...args} />,
  args: {
    size: 15,
    color: '#0C1C33',
    className: ''
  }
}

// Interactive Icons
export const Interactive: StoryObj = {
  render: () => (
    <div className="flex items-center gap-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <CopyIcon 
          color="#4C7EFF" 
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => alert('Copy clicked!')}
        />
        <span className="text-xs">Click to copy</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <EyeOpenIcon 
          color="#4C7EFF" 
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => alert('Eye clicked!')}
        />
        <span className="text-xs">Toggle visibility</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CheckIcon 
          className="cursor-pointer hover:scale-110 transition-transform"
          onClick={() => alert('Check clicked!')}
        />
        <span className="text-xs">Mark as done</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <KeyIcon 
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => alert('Key clicked!')}
        />
        <span className="text-xs">Security key</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CrossIcon 
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => alert('Cross clicked!')}
        />
        <span className="text-xs">Close dialog</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <WalletIcon 
          color="#4C7EFF"
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => alert('Wallet clicked!')}
        />
        <span className="text-xs">Wallet access</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PlusIcon 
          className="cursor-pointer hover:scale-110 transition-transform"
          onClick={() => alert('Plus clicked!')}
        />
        <span className="text-xs">Add item</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FilterIcon 
          color="#4C7EFF"
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => alert('Filter clicked!')}
        />
        <span className="text-xs">Filter data</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <DeleteIcon 
          color="#F45858"
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => alert('Delete clicked!')}
        />
        <span className="text-xs">Delete item</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BurgerMenuIcon 
          color="#4C7EFF"
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => alert('Menu clicked!')}
        />
        <span className="text-xs">Open menu</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircleProcessIcon 
          className="cursor-pointer hover:scale-110 transition-transform"
          onClick={() => alert('Process clicked!')}
        />
        <span className="text-xs">Processing</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CreditsIcon 
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => alert('Credits clicked!')}
        />
        <span className="text-xs">View credits</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <WebIcon 
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => alert('Web clicked!')}
        />
        <span className="text-xs">Web access</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ChainSmallIcon 
          color="#4C7EFF"
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => alert('Chain clicked!')}
        />
        <span className="text-xs">Link chain</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SettingsIcon 
          color="#4C7EFF"
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => alert('Settings clicked!')}
        />
        <span className="text-xs">Settings</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ShieldSmallIcon 
          color="#4C7EFF"
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => alert('Shield clicked!')}
        />
        <span className="text-xs">Security</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons can be made interactive with onClick handlers and hover effects.'
      }
    }
  }
} 