import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Button } from './index'

describe('Button Component', () => {
  describe('Basic rendering', () => {
    it('renders children correctly', () => {
      const { getByText } = render(<Button>Click me</Button>)
      expect(getByText('Click me')).toBeTruthy()
    })

    it('renders with default variant (solid)', () => {
      const { getByText } = render(<Button>Default</Button>)
      const button = getByText('Default').parent
      expect(button?.props.className).toContain('bg-dash-brand')
    })

    it('renders with default size (md)', () => {
      const { getByText } = render(<Button>Medium</Button>)
      const button = getByText('Medium').parent
      expect(button?.props.className).toContain('px-4')
      expect(button?.props.className).toContain('py-3')
    })
  })

  describe('Variants', () => {
    it('renders solid variant', () => {
      const { getByText } = render(<Button variant="solid">Solid</Button>)
      const button = getByText('Solid').parent
      expect(button?.props.className).toContain('bg-dash-brand')
    })

    it('renders outline variant', () => {
      const { getByText } = render(<Button variant="outline">Outline</Button>)
      const button = getByText('Outline').parent
      expect(button?.props.className).toContain('border')
      expect(button?.props.className).toContain('bg-transparent')
    })

    it('renders ghost variant', () => {
      const { getByText } = render(<Button variant="ghost">Ghost</Button>)
      const button = getByText('Ghost').parent
      expect(button?.props.className).toContain('bg-transparent')
    })
  })

  describe('Color schemes', () => {
    it('renders brand color', () => {
      const { getByText } = render(<Button colorScheme="brand">Brand</Button>)
      const button = getByText('Brand').parent
      expect(button?.props.className).toContain('bg-dash-brand')
    })

    it('renders mint color', () => {
      const { getByText } = render(<Button colorScheme="mint">Mint</Button>)
      const button = getByText('Mint').parent
      expect(button?.props.className).toContain('bg-dash-mint')
    })

    it('renders gray color', () => {
      const { getByText } = render(<Button colorScheme="gray">Gray</Button>)
      const button = getByText('Gray').parent
      expect(button?.props.className).toContain('bg-gray-200')
    })

    it('renders red color', () => {
      const { getByText } = render(<Button colorScheme="red">Red</Button>)
      const button = getByText('Red').parent
      expect(button?.props.className).toContain('bg-red-200')
    })

    it('renders lightBlue color', () => {
      const { getByText } = render(<Button colorScheme="lightBlue">Light Blue</Button>)
      const button = getByText('Light Blue').parent
      expect(button?.props.className).toContain('bg-dash-brand/10')
    })

    it('renders lightGray color', () => {
      const { getByText } = render(<Button colorScheme="lightGray">Light Gray</Button>)
      const button = getByText('Light Gray').parent
      expect(button?.props.className).toContain('bg-gray-100')
    })
  })

  describe('Sizes', () => {
    it('renders small size', () => {
      const { getByText } = render(<Button size="sm">Small</Button>)
      const button = getByText('Small').parent
      expect(button?.props.className).toContain('px-3')
      expect(button?.props.className).toContain('py-2')
    })

    it('renders medium size', () => {
      const { getByText } = render(<Button size="md">Medium</Button>)
      const button = getByText('Medium').parent
      expect(button?.props.className).toContain('px-4')
      expect(button?.props.className).toContain('py-3')
    })

    it('renders large size', () => {
      const { getByText } = render(<Button size="lg">Large</Button>)
      const button = getByText('Large').parent
      expect(button?.props.className).toContain('px-6')
      expect(button?.props.className).toContain('py-4')
    })

    it('renders xl size', () => {
      const { getByText } = render(<Button size="xl">Extra Large</Button>)
      const button = getByText('Extra Large').parent
      expect(button?.props.className).toContain('px-6')
      expect(button?.props.className).toContain('py-4')
    })
  })

  describe('States', () => {
    it('renders disabled state', () => {
      const { getByText } = render(<Button disabled>Disabled</Button>)
      const button = getByText('Disabled').parent
      expect(button?.props.className).toContain('opacity-50')
      expect(button?.props.accessibilityState?.disabled).toBe(true)
    })

    it('renders loading state', () => {
      const { getByTestId } = render(<Button loading>Loading</Button>)
      expect(getByTestId('activity-indicator')).toBeTruthy()
    })

    it('hides text content when loading', () => {
      const { queryByText } = render(<Button loading>Loading Text</Button>)
      expect(queryByText('Loading Text')).toBeFalsy()
    })

    it('disables button when loading', () => {
      const onPress = jest.fn()
      const { getByTestId } = render(
        <Button loading onPress={onPress}>
          Loading
        </Button>
      )
      const button = getByTestId('activity-indicator').parent?.parent
      expect(button?.props.accessibilityState?.disabled).toBe(true)
    })
  })

  describe('Interaction', () => {
    it('calls onPress when clicked', () => {
      const onPress = jest.fn()
      const { getByText } = render(<Button onPress={onPress}>Press me</Button>)
      fireEvent.press(getByText('Press me').parent!)
      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('does not call onPress when disabled', () => {
      const onPress = jest.fn()
      const { getByText } = render(
        <Button disabled onPress={onPress}>
          Disabled
        </Button>
      )
      fireEvent.press(getByText('Disabled').parent!)
      expect(onPress).not.toHaveBeenCalled()
    })

    it('does not call onPress when loading', () => {
      const onPress = jest.fn()
      const { getByTestId } = render(
        <Button loading onPress={onPress}>
          Loading
        </Button>
      )
      const button = getByTestId('activity-indicator').parent?.parent
      fireEvent.press(button!)
      expect(onPress).not.toHaveBeenCalled()
    })
  })

  describe('Custom className', () => {
    it('accepts custom className', () => {
      const { getByText } = render(<Button className="custom-class">Custom</Button>)
      const button = getByText('Custom').parent
      expect(button?.props.className).toContain('custom-class')
    })

    it('combines default and custom classes', () => {
      const { getByText } = render(
        <Button variant="outline" size="sm" className="mt-4">
          Combined
        </Button>
      )
      const button = getByText('Combined').parent
      expect(button?.props.className).toContain('border')
      expect(button?.props.className).toContain('px-3')
      expect(button?.props.className).toContain('mt-4')
    })
  })

  describe('theme-specific colorScheme', () => {
    it('uses colorSchemeLight when theme is light', () => {
      const { getByText } = render(
        <Button theme="light" colorScheme="brand" colorSchemeLight="mint">Light</Button>
      )
      const button = getByText('Light').parent
      expect(button?.props.className).toContain('bg-dash-mint')
      expect(button?.props.className).not.toContain('bg-dash-brand')
    })

    it('uses colorSchemeDark when theme is dark', () => {
      const { getByText } = render(
        <Button theme="dark" colorScheme="brand" colorSchemeDark="mint">Dark</Button>
      )
      const button = getByText('Dark').parent
      expect(button?.props.className).toContain('bg-dash-mint')
      expect(button?.props.className).not.toContain('bg-dash-brand')
    })

    it('falls back to colorScheme when no theme-specific prop set', () => {
      const { getByText } = render(
        <Button theme="light" colorScheme="mint">Fallback</Button>
      )
      const button = getByText('Fallback').parent
      expect(button?.props.className).toContain('bg-dash-mint')
    })
  })

  describe('Text colors', () => {
    it('renders white text for brand solid button', () => {
      const { getByText } = render(
        <Button variant="solid" colorScheme="brand">
          Brand
        </Button>
      )
      const text = getByText('Brand')
      expect(text.props.className).toContain('text-white')
    })

    it('renders black text for mint solid button', () => {
      const { getByText } = render(
        <Button variant="solid" colorScheme="mint">
          Mint
        </Button>
      )
      const text = getByText('Mint')
      expect(text.props.className).toContain('text-black')
    })

    it('renders brand text for outline brand button', () => {
      const { getByText } = render(
        <Button variant="outline" colorScheme="brand">
          Outline
        </Button>
      )
      const text = getByText('Outline')
      expect(text.props.className).toContain('text-dash-brand')
    })
  })
})
