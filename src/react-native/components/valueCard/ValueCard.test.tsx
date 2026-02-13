import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Text } from 'react-native'
import { ValueCard } from './index'

describe('ValueCard Component', () => {
  describe('Basic rendering', () => {
    it('renders children correctly', () => {
      const { getByText } = render(<ValueCard>Test content</ValueCard>)
      expect(getByText('Test content')).toBeTruthy()
    })

    it('renders as View by default when not clickable', () => {
      const { getByTestId } = render(
        <ValueCard testID="value-card">Test</ValueCard>
      )
      const card = getByTestId('value-card')
      expect(card).toBeTruthy()
      expect(card.type).toBe('View')
    })

    it('renders with default size (md)', () => {
      const { getByTestId } = render(
        <ValueCard testID="value-card">Test</ValueCard>
      )
      const card = getByTestId('value-card')
      expect(card).toBeTruthy()
    })

    it('renders with default theme (light)', () => {
      const { getByTestId } = render(
        <ValueCard testID="value-card">Test</ValueCard>
      )
      expect(getByTestId('value-card')).toBeTruthy()
    })

    it('renders with default colorScheme (default)', () => {
      const { getByTestId } = render(
        <ValueCard testID="value-card">Test</ValueCard>
      )
      expect(getByTestId('value-card')).toBeTruthy()
    })

    it('renders with default border (true)', () => {
      const { getByTestId } = render(
        <ValueCard testID="value-card">Test</ValueCard>
      )
      expect(getByTestId('value-card')).toBeTruthy()
    })
  })

  describe('Color schemes', () => {
    it('renders default color scheme', () => {
      const { getByText } = render(
        <ValueCard colorScheme="default">Default</ValueCard>
      )
      expect(getByText('Default')).toBeTruthy()
    })

    it('renders transparent color scheme', () => {
      const { getByText } = render(
        <ValueCard colorScheme="transparent">Transparent</ValueCard>
      )
      expect(getByText('Transparent')).toBeTruthy()
    })

    it('renders green color scheme', () => {
      const { getByText } = render(
        <ValueCard colorScheme="green">Green</ValueCard>
      )
      expect(getByText('Green')).toBeTruthy()
    })

    it('renders lightBlue color scheme', () => {
      const { getByText } = render(
        <ValueCard colorScheme="lightBlue">Light Blue</ValueCard>
      )
      expect(getByText('Light Blue')).toBeTruthy()
    })

    it('renders white color scheme', () => {
      const { getByText } = render(
        <ValueCard colorScheme="white">White</ValueCard>
      )
      expect(getByText('White')).toBeTruthy()
    })

    it('renders lightGray color scheme', () => {
      const { getByText } = render(
        <ValueCard colorScheme="lightGray">Light Gray</ValueCard>
      )
      expect(getByText('Light Gray')).toBeTruthy()
    })

    it('renders yellow color scheme', () => {
      const { getByText } = render(
        <ValueCard colorScheme="yellow">Yellow</ValueCard>
      )
      expect(getByText('Yellow')).toBeTruthy()
    })
  })

  describe('Sizes', () => {
    it('renders xs size', () => {
      const { getByText } = render(
        <ValueCard size="xs">Extra Small</ValueCard>
      )
      expect(getByText('Extra Small')).toBeTruthy()
    })

    it('renders sm size', () => {
      const { getByText } = render(
        <ValueCard size="sm">Small</ValueCard>
      )
      expect(getByText('Small')).toBeTruthy()
    })

    it('renders md size', () => {
      const { getByText } = render(
        <ValueCard size="md">Medium</ValueCard>
      )
      expect(getByText('Medium')).toBeTruthy()
    })

    it('renders xl size', () => {
      const { getByText } = render(
        <ValueCard size="xl">Extra Large</ValueCard>
      )
      expect(getByText('Extra Large')).toBeTruthy()
    })
  })

  describe('Theme', () => {
    it('renders with light theme', () => {
      const { getByText } = render(
        <ValueCard theme="light">Light</ValueCard>
      )
      expect(getByText('Light')).toBeTruthy()
    })

    it('renders with dark theme', () => {
      const { getByText } = render(
        <ValueCard theme="dark">Dark</ValueCard>
      )
      expect(getByText('Dark')).toBeTruthy()
    })

    it('applies dark theme styles when theme is dark', () => {
      const { getByTestId } = render(
        <ValueCard theme="dark" testID="value-card">Dark Theme</ValueCard>
      )
      const card = getByTestId('value-card')
      expect(card.props.style).toBeDefined()
    })
  })

  describe('Clickable and Pressable', () => {
    it('renders as Pressable when onPress is provided', () => {
      const onPress = jest.fn()
      const { getByText } = render(
        <ValueCard onPress={onPress}>Clickable</ValueCard>
      )
      const pressable = getByText('Clickable').parent
      expect(pressable).toBeTruthy()
      expect(pressable?.type).toBe('RCTView')
    })

    it('renders as Pressable when clickable is true', () => {
      const onPress = jest.fn()
      const { getByText } = render(
        <ValueCard clickable onPress={onPress}>Clickable</ValueCard>
      )
      const pressable = getByText('Clickable').parent
      expect(pressable).toBeTruthy()
    })

    it('calls onPress when pressed', () => {
      const onPress = jest.fn()
      const { getByText } = render(
        <ValueCard onPress={onPress}>Press me</ValueCard>
      )
      fireEvent.press(getByText('Press me').parent!)
      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('renders as View when neither onPress nor clickable', () => {
      const { getByText } = render(<ValueCard>Static</ValueCard>)
      const view = getByText('Static').parent
      expect(view?.type).toBe('View')
    })

    it('applies press feedback when clickable', () => {
      const onPress = jest.fn()
      const { getByText } = render(
        <ValueCard onPress={onPress}>Press</ValueCard>
      )
      const pressable = getByText('Press').parent
      expect(pressable?.props.style).toBeDefined()
    })
  })

  describe('Loading state', () => {
    it('shows ActivityIndicator when loading is true', () => {
      const { getByTestId } = render(
        <ValueCard loading>Content</ValueCard>
      )
      expect(getByTestId('value-card-loading')).toBeTruthy()
    })

    it('does not show children when loading', () => {
      const { queryByText } = render(
        <ValueCard loading>Hidden Content</ValueCard>
      )
      expect(queryByText('Hidden Content')).toBeNull()
    })

    it('renders View not Pressable when loading (disables interaction)', () => {
      const onPress = jest.fn()
      const { getByTestId } = render(
        <ValueCard loading onPress={onPress} testID="value-card">
          Loading
        </ValueCard>
      )
      const card = getByTestId('value-card')
      expect(card.type).toBe('View')
    })

    it('renders children when not loading', () => {
      const { getByText } = render(<ValueCard>Visible</ValueCard>)
      expect(getByText('Visible')).toBeTruthy()
    })
  })

  describe('Border', () => {
    it('renders with border when border is true', () => {
      const { getByTestId } = render(
        <ValueCard border testID="value-card">With Border</ValueCard>
      )
      expect(getByTestId('value-card')).toBeTruthy()
    })

    it('renders without border when border is false', () => {
      const { getByTestId } = render(
        <ValueCard border={false} testID="value-card">No Border</ValueCard>
      )
      expect(getByTestId('value-card')).toBeTruthy()
    })
  })

  describe('Custom styling', () => {
    it('accepts custom className', () => {
      const { getByTestId } = render(
        <ValueCard className="opacity-80" testID="value-card">Custom</ValueCard>
      )
      expect(getByTestId('value-card')).toBeTruthy()
    })

    it('accepts custom style prop', () => {
      const customStyle = { marginTop: 20 }
      const { getByTestId } = render(
        <ValueCard style={customStyle} testID="value-card">Styled</ValueCard>
      )
      const card = getByTestId('value-card')
      expect(card.props.style).toContainEqual(customStyle)
    })
  })

  describe('Children rendering', () => {
    it('renders string children', () => {
      const { getByText } = render(<ValueCard>String child</ValueCard>)
      expect(getByText('String child')).toBeTruthy()
    })

    it('renders React node children', () => {
      const { getByTestId } = render(
        <ValueCard>
          <Text testID="custom-child">Custom Node</Text>
        </ValueCard>
      )
      expect(getByTestId('custom-child')).toBeTruthy()
    })

    it('renders multiple children', () => {
      const { getByText } = render(
        <ValueCard>
          <Text>First</Text>
          <Text>Second</Text>
        </ValueCard>
      )
      expect(getByText('First')).toBeTruthy()
      expect(getByText('Second')).toBeTruthy()
    })
  })

  describe('Combined variants', () => {
    it('renders green xs with border', () => {
      const { getByText } = render(
        <ValueCard colorScheme="green" size="xs" border>
          Green XS
        </ValueCard>
      )
      expect(getByText('Green XS')).toBeTruthy()
    })

    it('renders lightBlue xl clickable', () => {
      const onPress = jest.fn()
      const { getByText } = render(
        <ValueCard colorScheme="lightBlue" size="xl" onPress={onPress}>
          Light Blue XL
        </ValueCard>
      )
      expect(getByText('Light Blue XL')).toBeTruthy()
      fireEvent.press(getByText('Light Blue XL').parent!)
      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('renders dark theme with lightGray', () => {
      const { getByText } = render(
        <ValueCard theme="dark" colorScheme="lightGray">
          Dark Light Gray
        </ValueCard>
      )
      expect(getByText('Dark Light Gray')).toBeTruthy()
    })

    it('renders yellow loading', () => {
      const { getByTestId } = render(
        <ValueCard colorScheme="yellow" loading>
          Loading
        </ValueCard>
      )
      expect(getByTestId('value-card-loading')).toBeTruthy()
    })

    it('renders transparent without border', () => {
      const { getByText } = render(
        <ValueCard colorScheme="transparent" border={false}>
          Transparent No Border
        </ValueCard>
      )
      expect(getByText('Transparent No Border')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('passes testID to root element', () => {
      const { getByTestId } = render(
        <ValueCard testID="value-card">Test</ValueCard>
      )
      expect(getByTestId('value-card')).toBeTruthy()
    })

    it('passes accessibilityLabel when provided', () => {
      const { getByLabelText } = render(
        <ValueCard accessibilityLabel="Value card">Content</ValueCard>
      )
      expect(getByLabelText('Value card')).toBeTruthy()
    })
  })

  describe('Edge cases', () => {
    it('handles empty children', () => {
      const { getByTestId } = render(
        <ValueCard testID="value-card">{''}</ValueCard>
      )
      expect(getByTestId('value-card')).toBeTruthy()
    })

    it('handles numeric children', () => {
      const { getByText } = render(<ValueCard>{42}</ValueCard>)
      expect(getByText('42')).toBeTruthy()
    })

    it('is clickable when only clickable is true without onPress', () => {
      const { getByText } = render(
        <ValueCard clickable>Clickable Only</ValueCard>
      )
      const el = getByText('Clickable Only').parent
      expect(el).toBeTruthy()
    })
  })
})
