import type { Meta, StoryObj } from '@storybook/react'
import { ProgressStepBar } from './index'
import { ThemeProvider } from '../../contexts/ThemeContext'

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
      <ThemeProvider>
        <div style={{ width: '400px' }}>
          <Story />
        </div>
      </ThemeProvider>
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
  decorators: [
    (Story) => (
      <ThemeProvider initialTheme="dark">
        <div className="bg-gray-900 p-6 rounded-lg" style={{ width: '400px' }}>
          <Story />
        </div>
      </ThemeProvider>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'ProgressStepBar in dark theme with gray background.'
      }
    }
  }
}

export const ThemeComparison: Story = {
  render: () => (
    <div className="space-y-6 flex flex-col items-center">
      <div className="text-center">
        <h3 className="text-sm font-medium mb-4">Light theme</h3>
        <ThemeProvider initialTheme="light">
          <div style={{ width: '400px' }}>
            <ProgressStepBar currentStep={3} totalSteps={5} />
          </div>
        </ThemeProvider>
      </div>
      <div className="bg-gray-900 p-4 rounded-lg text-center" style={{ width: '432px' }}>
        <h3 className="text-sm font-medium mb-4 text-white">Dark theme</h3>
        <ThemeProvider initialTheme="dark">
          <div style={{ width: '400px' }}>
            <ProgressStepBar currentStep={3} totalSteps={5} />
          </div>
        </ThemeProvider>
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