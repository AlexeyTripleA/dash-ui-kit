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
  CheckIcon
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