import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Switch, SwitchOption } from './index'
import { ThemeProvider } from '../../contexts/ThemeContext'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile switch component for selecting between multiple options. Supports individual option disabling, hover states, and responsive sizing with automatic light/dark theme support.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'xl']
    },
    disabled: {
      control: 'boolean'
    },
    onChange: {
      action: 'changed'
    }
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

// Default options for stories
const defaultOptions: SwitchOption[] = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' }
]

const shortOptions: SwitchOption[] = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' }
]

const numericOptions: SwitchOption<number>[] = [
  { label: '1D', value: 1 },
  { label: '7D', value: 7 },
  { label: '30D', value: 30 },
  { label: '1Y', value: 365 }
]

// Controlled Switch component for stories
const ControlledSwitch = (args: any) => {
  const [value, setValue] = useState(args.value || args.options[0]?.value)
  
  return (
    <Switch
      {...args}
      value={value}
      onChange={(newValue) => {
        setValue(newValue)
        args.onChange?.(newValue)
      }}
    />
  )
}

export const Default: Story = {
  render: (args) => <ControlledSwitch {...args} />,
  args: {
    options: defaultOptions,
    value: 'opt1',
    size: 'md'
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic switch with three options in medium size.'
      }
    }
  }
}

export const Small: Story = {
  render: (args) => <ControlledSwitch {...args} />,
  args: {
    options: defaultOptions,
    value: 'opt1',
    size: 'sm'
  }
}

export const Medium: Story = {
  render: (args) => <ControlledSwitch {...args} />,
  args: {
    options: defaultOptions,
    value: 'opt1',
    size: 'md'
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium size switch with dash-main font, 1rem font size and font weight 500.'
      }
    }
  }
}

export const Large: Story = {
  render: (args) => <ControlledSwitch {...args} />,
  args: {
    options: defaultOptions,
    value: 'opt1',
    size: 'xl'
  }
}

export const TwoOptions: Story = {
  render: (args) => <ControlledSwitch {...args} />,
  args: {
    options: shortOptions,
    value: 'yes',
    size: 'md'
  }
}

export const NumericValues: Story = {
  render: (args) => <ControlledSwitch {...args} />,
  args: {
    options: numericOptions,
    value: 7,
    size: 'md'
  },
  parameters: {
    docs: {
      description: {
        story: 'Switch using numeric values for time period selection. Demonstrates generic type support.'
      }
    }
  }
}

export const Disabled: Story = {
  render: (args) => <ControlledSwitch {...args} />,
  args: {
    options: defaultOptions,
    value: 'opt2',
    size: 'md',
    disabled: true
  }
}

export const DisabledOptions: Story = {
  render: (args) => <ControlledSwitch {...args} />,
  args: {
    options: [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2', disabled: true },
      { label: 'Option 3', value: 'opt3' }
    ],
    value: 'opt1',
    size: 'md'
  },
  parameters: {
    docs: {
      description: {
        story: 'Switch with individual disabled options. The middle option cannot be selected and shows visual disabled state.'
      }
    }
  }
}

export const LongText: Story = {
  render: (args) => <ControlledSwitch {...args} />,
  args: {
    options: [
      { label: 'Very Long Option 1', value: 'long1' },
      { label: 'Very Long Option 2', value: 'long2' },
      { label: 'Short', value: 'short' }
    ],
    value: 'long1',
    size: 'md'
  },
  parameters: {
    docs: {
      description: {
        story: 'Switch with long text labels. Text does not wrap thanks to whitespace-nowrap, and flex layout ensures equal width distribution.'
      }
    }
  }
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Small</h3>
        <ControlledSwitch options={defaultOptions} value="opt1" size="sm" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Medium</h3>
        <ControlledSwitch options={defaultOptions} value="opt1" size="md" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Large</h3>
        <ControlledSwitch options={defaultOptions} value="opt1" size="xl" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available sizes: sm (small), md (medium), and xl (large). Each size has proportional padding and border radius.'
      }
    }
  }
}

export const DarkTheme: Story = {
  render: (args) => <ControlledSwitch {...args} />,
  args: {
    options: defaultOptions,
    value: 'opt1',
    size: 'md'
  },
  decorators: [
    (Story) => (
      <ThemeProvider initialTheme="dark">
        <div className="bg-gray-900 p-6 rounded-lg">
          <Story />
        </div>
      </ThemeProvider>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Switch component in dark theme with gray background and white text.'
      }
    }
  }
}

export const ThemeComparison: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Light Theme</h3>
        <ThemeProvider initialTheme="light">
          <ControlledSwitch options={defaultOptions} value="opt2" size="md" />
        </ThemeProvider>
      </div>
      <div className="bg-gray-900 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-2 text-white">Dark Theme</h3>
        <ThemeProvider initialTheme="dark">
          <ControlledSwitch options={defaultOptions} value="opt2" size="md" />
        </ThemeProvider>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of the Switch component in both light and dark themes.'
      }
    }
  }
}

export const Examples: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Time Period Selector</h3>
        <ControlledSwitch options={numericOptions} value={7} size="md" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Boolean Switch</h3>
        <ControlledSwitch options={shortOptions} value="yes" size="md" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">View Mode Toggle</h3>
        <ControlledSwitch 
          options={[
            { label: 'List', value: 'list' },
            { label: 'Grid', value: 'grid' },
            { label: 'Cards', value: 'cards' }
          ]} 
          value="grid" 
          size="sm" 
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">With Disabled Option</h3>
        <ControlledSwitch 
          options={[
            { label: 'Basic', value: 'basic' },
            { label: 'Pro', value: 'pro', disabled: true },
            { label: 'Free', value: 'free' }
          ]} 
          value="basic" 
          size="md" 
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world usage examples: time period selection with numeric values, boolean switches, view mode toggles, and feature availability with disabled options.'
      }
    }
  }
} 