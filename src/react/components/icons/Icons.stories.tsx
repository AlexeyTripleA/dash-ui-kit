import React from 'react'
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
  ShieldSmallIcon,
  QuestionMessageIcon,
  CheckmarkIcon,
  FingerprintIcon,
  FaceIcon,
  SignIcon,
  SignLockIcon,
  LockIcon
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
      <div className="flex flex-col items-center gap-2">
        <QuestionMessageIcon />
        <span className="text-sm">QuestionMessageIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CheckmarkIcon />
        <span className="text-sm">CheckmarkIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FingerprintIcon />
        <span className="text-sm">FingerprintIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FaceIcon />
        <span className="text-sm">FaceIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SignIcon />
        <span className="text-sm">SignIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SignLockIcon />
        <span className="text-sm">SignLockIcon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LockIcon />
        <span className="text-sm">LockIcon</span>
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
    <div className="p-4">
      <p className="mb-4 text-sm">Icons support different sizes:</p>
      <div className="flex items-center gap-4">
        <SuccessIcon size={16} />
        <SuccessIcon size={24} />
        <SuccessIcon size={32} />
      </div>
    </div>
  )
}

// Color Variations
export const ColorVariations: StoryObj = {
  render: () => (
    <div className="p-4">
      <p className="mb-4 text-sm">Icons support custom colors:</p>
      <div className="flex items-center gap-4">
        <SuccessIcon color="#1CC400" />
        <SuccessIcon color="#F45858" />
        <SuccessIcon color="#008DE4" />
      </div>
    </div>
  )
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

// Question Message Icon
export const QuestionMessage: StoryObj = {
  render: (args) => <QuestionMessageIcon {...args} />,
  args: {
    size: 17,
    color: '#0C1C33',
    className: ''
  }
}

// Checkmark Icon
export const Checkmark: StoryObj = {
  render: (args) => <CheckmarkIcon {...args} />,
  args: {
    size: 27,
    color: '#1CC400',
    className: ''
  }
}

// Fingerprint Icon
export const Fingerprint: StoryObj = {
  render: (args) => <FingerprintIcon {...args} />,
  args: {
    size: 16,
    color: '#4C7EFF',
    className: ''
  }
}

// Face Icon
export const Face: StoryObj = {
  render: (args) => <FaceIcon {...args} />,
  args: {
    size: 16,
    color: '#4C7EFF',
    className: ''
  }
}

// Sign Icon
export const Sign: StoryObj = {
  render: (args) => <SignIcon {...args} />,
  args: {
    size: 18,
    color: '#4C7EFF',
    className: ''
  }
}

// Sign Lock Icon
export const SignLock: StoryObj = {
  render: (args) => <SignLockIcon {...args} />,
  args: {
    size: 18,
    color: '#E93636',
    className: ''
  }
}

// Lock Icon
export const Lock: StoryObj = {
  render: (args) => <LockIcon {...args} />,
  args: {
    size: 8,
    color: '#E93636',
    className: ''
  }
}

// Interactive Icons
export const Interactive: StoryObj = {
  render: () => (
    <div className="p-4">
      <p className="mb-4 text-sm">Icons can be interactive with click handlers:</p>
      <div className="flex items-center gap-4">
        <CopyIcon 
          color="#4C7EFF" 
          className="cursor-pointer hover:opacity-80"
          onClick={() => alert('Copy clicked!')}
        />
        <CheckIcon 
          className="cursor-pointer hover:scale-110"
          onClick={() => alert('Check clicked!')}
        />
        <DeleteIcon 
          color="#F45858"
          className="cursor-pointer hover:opacity-80"
          onClick={() => alert('Delete clicked!')}
        />
      </div>
    </div>
  )
} 