import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './index'
import { ThemeProvider } from '../../contexts/ThemeContext'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'xl']
    },
    colorScheme: {
      control: { type: 'select' },
      options: ['default', 'brand', 'error', 'success']
    },
    variant: {
      control: { type: 'select' },
      options: ['outlined']
    },
    font: {
      control: { type: 'select' },
      options: ['main', 'grotesque']
    },
    weight: {
      control: { type: 'select' },
      options: ['light', 'normal', 'medium', 'semibold', 'bold']
    },
    rows: {
      control: { type: 'number', min: 1, max: 10 }
    },
    disabled: {
      control: { type: 'boolean' }
    },
    error: {
      control: { type: 'boolean' }
    },
    success: {
      control: { type: 'boolean' }
    },
    showPasteButton: {
      control: { type: 'boolean' }
    }
  },
  decorators: [
    (Story, context) => (
      <ThemeProvider initialTheme={context.globals.theme === 'dark' ? 'dark' : 'light'}>
        <div style={{ width: '400px' }}>
          <Story />
        </div>
      </ThemeProvider>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
    rows: 3
  }
}

export const WithBrandColorScheme: Story = {
  args: {
    placeholder: 'Enter your message...',
    colorScheme: 'brand',
    rows: 3
  }
}

export const ErrorState: Story = {
  args: {
    placeholder: 'Enter your message...',
    error: true,
    rows: 3
  }
}

export const SuccessState: Story = {
  args: {
    placeholder: 'Enter your message...',
    success: true,
    rows: 3
  }
}

export const SmallSize: Story = {
  args: {
    placeholder: 'Small textarea...',
    size: 'sm',
    rows: 2
  }
}

export const MediumSize: Story = {
  args: {
    placeholder: 'Medium textarea...',
    size: 'md',
    rows: 3
  }
}

export const ExtraLargeSize: Story = {
  args: {
    placeholder: 'Extra large textarea...',
    size: 'xl',
    rows: 4
  }
}

export const GrotequeFont: Story = {
  args: {
    placeholder: 'Space Grotesk font...',
    font: 'grotesque',
    rows: 3
  }
}

export const ManropeFont: Story = {
  args: {
    placeholder: 'Manrope font...',
    font: 'main',
    rows: 3
  }
}

export const WithoutPasteButton: Story = {
  args: {
    placeholder: 'No paste button...',
    showPasteButton: false,
    rows: 3
  }
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea...',
    disabled: true,
    rows: 3
  }
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'This textarea has a default value',
    rows: 3
  }
}

export const WithValidator: Story = {
  args: {
    placeholder: 'Type more than 10 characters for valid state...',
    validator: (value: string) => value.length > 10,
    rows: 3
  }
}

export const MultipleRows: Story = {
  args: {
    placeholder: 'Large textarea with many rows...',
    rows: 6,
    size: 'xl'
  }
}

export const LightWeight: Story = {
  args: {
    placeholder: 'Light weight text...',
    weight: 'light',
    rows: 3
  }
}

export const NormalWeight: Story = {
  args: {
    placeholder: 'Normal weight text...',
    weight: 'normal',
    rows: 3
  }
}

export const MediumWeight: Story = {
  args: {
    placeholder: 'Medium weight text...',
    weight: 'medium',
    rows: 3
  }
}

export const SemiboldWeight: Story = {
  args: {
    placeholder: 'Semibold weight text...',
    weight: 'semibold',
    rows: 3
  }
}

export const BoldWeight: Story = {
  args: {
    placeholder: 'Bold weight text...',
    weight: 'bold',
    rows: 3
  }
} 