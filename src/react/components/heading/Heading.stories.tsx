import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from './index'

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    weight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'semibold', 'bold', 'extrabold'],
    },
    color: {
      control: { type: 'select' },
      options: ['black', 'gray', 'blue', 'red', 'green'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Heading>

export const Default: Story = {
  args: {
    children: 'Default Heading',
  },
}

export const H1: Story = {
  args: {
    as: 'h1',
    children: 'Main Page Title',
  },
}

export const H2: Story = {
  args: {
    as: 'h2',
    children: 'Section Heading',
  },
}

export const H3: Story = {
  args: {
    as: 'h3',
    children: 'Subsection Heading',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading size="xs">Extra Small (xs)</Heading>
      <Heading size="sm">Small (sm)</Heading>
      <Heading size="md">Medium (md)</Heading>
      <Heading size="lg">Large (lg)</Heading>
      <Heading size="xl">Extra Large (xl)</Heading>
      <Heading size="2xl">2X Large (2xl)</Heading>
      <Heading size="3xl">3X Large (3xl)</Heading>
    </div>
  ),
}

export const AllWeights: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading weight="normal">Normal Weight</Heading>
      <Heading weight="medium">Medium Weight</Heading>
      <Heading weight="semibold">Semibold Weight</Heading>
      <Heading weight="bold">Bold Weight</Heading>
      <Heading weight="extrabold">Extrabold Weight</Heading>
    </div>
  ),
}

export const AllColors: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading color="black">Black Color</Heading>
      <Heading color="gray">Gray Color</Heading>
      <Heading color="blue">Blue Color</Heading>
      <Heading color="red">Red Color</Heading>
      <Heading color="green">Green Color</Heading>
    </div>
  ),
}

export const SmallHeading: Story = {
  args: {
    size: 'sm',
    weight: 'medium',
    color: 'gray',
    children: 'Small gray heading',
  },
}

export const LargeHeading: Story = {
  args: {
    size: '3xl',
    weight: 'extrabold',
    color: 'black',
    children: 'Large black heading',
  },
}

export const ColoredHeadings: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading color="blue" size="2xl">Primary Action Title</Heading>
      <Heading color="red" size="lg" weight="bold">Error or Warning</Heading>
      <Heading color="green" size="md" weight="semibold">Success Message</Heading>
      <Heading color="gray" size="sm" weight="medium">Subtitle or Caption</Heading>
    </div>
  ),
}

export const HeadingHierarchy: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <Heading as="h1" size="3xl" weight="extrabold">
        Main Article Title
      </Heading>
      <Heading as="h2" size="xl" weight="bold" color="gray">
        Chapter Heading
      </Heading>
      <Heading as="h3" size="lg" weight="semibold">
        Section Title
      </Heading>
      <Heading as="h4" size="md" weight="medium">
        Subsection Heading
      </Heading>
      <Heading as="h5" size="sm" weight="medium" color="gray">
        Minor Heading
      </Heading>
      <Heading as="h6" size="xs" weight="medium" color="gray">
        Smallest Heading
      </Heading>
    </div>
  ),
}

export const CustomStyling: Story = {
  args: {
    as: 'h2',
    size: 'xl',
    weight: 'bold',
    color: 'blue',
    className: 'underline decoration-2 underline-offset-4',
    children: 'Custom Styled Heading',
  },
}

export const ResponsiveHeading: Story = {
  args: {
    size: '2xl',
    weight: 'extrabold',
    className: 'text-center sm:text-left md:text-center lg:text-left',
    children: 'Responsive Aligned Heading',
  },
}

export const LongHeading: Story = {
  args: {
    size: 'lg',
    weight: 'bold',
    children: 'This is a very long heading that might wrap to multiple lines depending on the container width and screen size',
  },
}

export const WithSpecialCharacters: Story = {
  args: {
    size: 'xl',
    weight: 'semibold',
    children: 'Heading with "Quotes" & Special—Characters!',
  },
}

export const Playground: Story = {
  args: {
    as: 'h1',
    size: '2xl',
    weight: 'extrabold',
    color: 'black',
    children: 'Playground Heading',
    className: '',
  },
} 