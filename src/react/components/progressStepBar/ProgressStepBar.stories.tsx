import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ProgressStepBar } from './index'

const meta = {
  title: 'Components/ProgressStepBar',
  component: ProgressStepBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Component for displaying a progress bar as steps.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Current step (0-based index)'
    },
    totalSteps: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Total number of steps'
    },
    color: {
      control: 'select',
      options: ['blue', 'red', 'orange'],
      description: 'Color variant of the progress bar'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
  args: {
    currentStep: 2,
    totalSteps: 4
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ProgressStepBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentStep: 2,
    totalSteps: 4
  }
}

export const FirstStep: Story = {
  args: {
    currentStep: 1,
    totalSteps: 5
  }
}

export const MiddleStep: Story = {
  args: {
    currentStep: 3,
    totalSteps: 6
  }
}

export const LastStep: Story = {
  args: {
    currentStep: 4,
    totalSteps: 4
  }
}

export const ManySteps: Story = {
  args: {
    currentStep: 5,
    totalSteps: 8
  }
}

export const NoProgress: Story = {
  args: {
    currentStep: 0,
    totalSteps: 4
  }
}

export const WithCustomClass: Story = {
  args: {
    currentStep: 2,
    totalSteps: 4,
    className: 'max-w-md'
  }
}

export const DarkTheme: Story = {
  args: {
    currentStep: 3,
    totalSteps: 5
  },
  parameters: {
    globals: {
      theme: 'dark'
    },
    docs: {
      description: {
        story: 'ProgressStepBar in dark theme with gray background.'
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-6 rounded-lg" style={{ width: '400px' }}>
        <Story />
      </div>
    )
  ]
}

export const ThemeComparison: Story = {
  render: () => (
    <div className="space-y-6 flex flex-col items-center">
      <div className="text-center">
        <h3 className="text-sm font-medium mb-4">Light theme</h3>
        <div style={{ width: '400px' }}>
          <ProgressStepBar currentStep={3} totalSteps={5} />
        </div>
      </div>
      <div className="bg-gray-900 p-4 rounded-lg text-center" style={{ width: '432px' }}>
        <h3 className="text-sm font-medium mb-4 text-white">Dark theme (use theme switcher)</h3>
        <div style={{ width: '400px' }}>
          <ProgressStepBar currentStep={3} totalSteps={5} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of ProgressStepBar in light and dark themes.'
      }
    }
  }
}

export const RedColor: Story = {
  args: {
    currentStep: 2,
    totalSteps: 4,
    color: 'red'
  },
  parameters: {
    docs: {
      description: {
        story: 'ProgressStepBar with red color variant.'
      }
    }
  }
}

export const RedColorDarkTheme: Story = {
  args: {
    currentStep: 3,
    totalSteps: 5,
    color: 'red'
  },
  parameters: {
    globals: {
      theme: 'dark'
    },
    docs: {
      description: {
        story: 'ProgressStepBar with red color in dark theme.'
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-6 rounded-lg" style={{ width: '400px' }}>
        <Story />
      </div>
    )
  ]
}

export const OrangeColor: Story = {
  args: {
    currentStep: 2,
    totalSteps: 4,
    color: 'orange'
  },
  parameters: {
    docs: {
      description: {
        story: 'ProgressStepBar with orange color variant.'
      }
    }
  }
}

export const ColorComparison: Story = {
  render: () => (
    <div className="space-y-6 flex flex-col items-center">
      <div className="text-center">
        <h3 className="text-sm font-medium mb-4">Blue (default)</h3>
        <div style={{ width: '400px' }}>
          <ProgressStepBar currentStep={3} totalSteps={5} color="blue" />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-sm font-medium mb-4">Red</h3>
        <div style={{ width: '400px' }}>
          <ProgressStepBar currentStep={3} totalSteps={5} color="red" />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-sm font-medium mb-4">Orange</h3>
        <div style={{ width: '400px' }}>
          <ProgressStepBar currentStep={3} totalSteps={5} color="orange" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all color variants.'
      }
    }
  }
} 