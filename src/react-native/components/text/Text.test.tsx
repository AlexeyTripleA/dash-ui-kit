import React from 'react'
import { render } from '@testing-library/react-native'
import { Text } from './index'

describe('Text Component', () => {
  describe('Basic rendering', () => {
    it('renders children correctly', () => {
      const { getByText } = render(<Text>Hello World</Text>)
      expect(getByText('Hello World')).toBeTruthy()
    })

    it('renders with default variant (body)', () => {
      const { getByText } = render(<Text>Default Text</Text>)
      const element = getByText('Default Text')
      expect(element.props.className).toContain('text-base')
    })
  })

  describe('Variants', () => {
    it('renders body variant', () => {
      const { getByText } = render(<Text variant="body">Body text</Text>)
      const element = getByText('Body text')
      expect(element.props.className).toContain('text-base')
    })

    it('renders caption variant', () => {
      const { getByText } = render(<Text variant="caption">Caption text</Text>)
      const element = getByText('Caption text')
      expect(element.props.className).toContain('text-sm')
    })

    it('renders label variant', () => {
      const { getByText } = render(<Text variant="label">Label text</Text>)
      const element = getByText('Label text')
      expect(element.props.className).toContain('text-xs')
    })
  })

  describe('Font weights', () => {
    it('renders regular weight by default', () => {
      const { getByText } = render(<Text>Regular</Text>)
      const element = getByText('Regular')
      expect(element.props.className).toContain('font-normal')
    })

    it('renders medium weight', () => {
      const { getByText } = render(<Text weight="medium">Medium</Text>)
      const element = getByText('Medium')
      expect(element.props.className).toContain('font-medium')
    })

    it('renders semibold weight', () => {
      const { getByText } = render(<Text weight="semibold">Semibold</Text>)
      const element = getByText('Semibold')
      expect(element.props.className).toContain('font-semibold')
    })

    it('renders bold weight', () => {
      const { getByText } = render(<Text weight="bold">Bold</Text>)
      const element = getByText('Bold')
      expect(element.props.className).toContain('font-bold')
    })
  })

  describe('Colors', () => {
    it('renders default color', () => {
      const { getByText } = render(<Text>Default color</Text>)
      const element = getByText('Default color')
      expect(element.props.className).toContain('text-gray-900')
    })

    it('renders blue color', () => {
      const { getByText } = render(<Text color="blue">Blue text</Text>)
      const element = getByText('Blue text')
      expect(element.props.className).toContain('text-dash-brand')
    })

    it('renders red color', () => {
      const { getByText } = render(<Text color="red">Red text</Text>)
      const element = getByText('Red text')
      expect(element.props.className).toContain('text-red-700')
    })
  })

  describe('Text decorations', () => {
    it('renders italic text', () => {
      const { getByText } = render(<Text italic>Italic</Text>)
      const element = getByText('Italic')
      expect(element.props.className).toContain('italic')
    })

    it('renders underlined text', () => {
      const { getByText } = render(<Text underline>Underlined</Text>)
      const element = getByText('Underlined')
      expect(element.props.className).toContain('underline')
    })

    it('renders line-through text', () => {
      const { getByText } = render(<Text lineThrough>Strike</Text>)
      const element = getByText('Strike')
      expect(element.props.className).toContain('line-through')
    })
  })

  describe('Text transforms', () => {
    it('renders uppercase text', () => {
      const { getByText } = render(<Text transform="uppercase">uppercase</Text>)
      const element = getByText('uppercase')
      expect(element.props.className).toContain('uppercase')
    })

    it('renders capitalized text', () => {
      const { getByText } = render(<Text transform="capitalize">capitalized</Text>)
      const element = getByText('capitalized')
      expect(element.props.className).toContain('capitalize')
    })
  })

  describe('Opacity', () => {
    it('renders with full opacity by default', () => {
      const { getByText } = render(<Text>Full opacity</Text>)
      const element = getByText('Full opacity')
      expect(element.props.className).toContain('opacity-100')
    })

    it('renders with custom opacity', () => {
      const { getByText } = render(<Text opacity={60}>60% opacity</Text>)
      const element = getByText('60% opacity')
      expect(element.props.className).toContain('opacity-60')
    })
  })

  describe('Custom className', () => {
    it('accepts custom className', () => {
      const { getByText } = render(<Text className="custom-class">Custom</Text>)
      const element = getByText('Custom')
      expect(element.props.className).toContain('custom-class')
    })

    it('combines default and custom classes', () => {
      const { getByText } = render(
        <Text variant="caption" className="mt-2">
          Combined
        </Text>
      )
      const element = getByText('Combined')
      expect(element.props.className).toContain('text-sm')
      expect(element.props.className).toContain('mt-2')
    })
  })
})
