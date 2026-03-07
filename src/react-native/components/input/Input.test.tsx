import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Input } from './index'

describe('Input', () => {
  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Enter text" />
      )
      expect(getByPlaceholderText('Enter text')).toBeTruthy()
    })

    it('renders with custom value', () => {
      const { getByDisplayValue } = render(
        <Input value="Test value" onChangeText={() => {}} />
      )
      expect(getByDisplayValue('Test value')).toBeTruthy()
    })
  })

  describe('Variants', () => {
    it('renders outlined variant', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Outlined" variant="outlined" />
      )
      expect(getByPlaceholderText('Outlined')).toBeTruthy()
    })

    it('renders filled variant', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Filled" variant="filled" />
      )
      expect(getByPlaceholderText('Filled')).toBeTruthy()
    })
  })

  describe('Sizes', () => {
    it('renders sm size', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Small" size="sm" />
      )
      expect(getByPlaceholderText('Small')).toBeTruthy()
    })

    it('renders md size', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Medium" size="md" />
      )
      expect(getByPlaceholderText('Medium')).toBeTruthy()
    })

    it('renders xl size (default)', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Extra Large" size="xl" />
      )
      expect(getByPlaceholderText('Extra Large')).toBeTruthy()
    })
  })

  describe('Color Schemes', () => {
    it('renders default color scheme', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Default" colorScheme="default" />
      )
      expect(getByPlaceholderText('Default')).toBeTruthy()
    })

    it('renders brand color scheme', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Brand" colorScheme="brand" />
      )
      expect(getByPlaceholderText('Brand')).toBeTruthy()
    })

    it('renders error color scheme when error prop is true', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Error" error />
      )
      expect(getByPlaceholderText('Error')).toBeTruthy()
    })

    it('renders success color scheme when success prop is true', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Success" success />
      )
      expect(getByPlaceholderText('Success')).toBeTruthy()
    })

    it('renders light-gray color scheme', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Light Gray" colorScheme="light-gray" />
      )
      expect(getByPlaceholderText('Light Gray')).toBeTruthy()
    })
  })

  describe('theme-specific colorScheme', () => {
    it('uses colorSchemeLight when theme is light', () => {
      // colorSchemeLight="brand" with theme="light" should produce same style as explicit colorScheme="brand"
      const { getByPlaceholderText: getOverride } = render(
        <Input placeholder="Override" theme="light" colorScheme="default" colorSchemeLight="brand" />
      )
      const { getByPlaceholderText: getExplicit } = render(
        <Input placeholder="Explicit" colorScheme="brand" />
      )
      expect(getOverride('Override').props.style).toEqual(getExplicit('Explicit').props.style)
    })

    it('uses colorSchemeDark when theme is dark', () => {
      // colorSchemeDark="brand" with theme="dark" should produce different style than theme="dark" with default
      const { getByPlaceholderText: getOverride } = render(
        <Input placeholder="Override" theme="dark" colorScheme="default" colorSchemeDark="brand" />
      )
      const { getByPlaceholderText: getDefault } = render(
        <Input placeholder="Default" theme="dark" colorScheme="default" />
      )
      expect(getOverride('Override').props.style).not.toEqual(getDefault('Default').props.style)
    })

    it('falls back to colorScheme when no theme-specific prop set', () => {
      // Without overrides, colorScheme is always used regardless of theme
      const { getByPlaceholderText: getLight } = render(
        <Input placeholder="Light" theme="light" colorScheme="brand" />
      )
      const { getByPlaceholderText: getExplicit } = render(
        <Input placeholder="Explicit" colorScheme="brand" />
      )
      expect(getLight('Light').props.style).toEqual(getExplicit('Explicit').props.style)
    })
  })

  describe('States', () => {
    it('renders disabled state', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Disabled" disabled />
      )
      const input = getByPlaceholderText('Disabled')
      expect(input.props.editable).toBe(false)
    })

    it('renders enabled state by default', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Enabled" />
      )
      const input = getByPlaceholderText('Enabled')
      expect(input.props.editable).toBe(true)
    })
  })

  describe('Password Input', () => {
    it('renders password input with eye icon', () => {
      const { getByPlaceholderText, UNSAFE_getByType } = render(
        <Input placeholder="Password" secureTextEntry />
      )
      expect(getByPlaceholderText('Password')).toBeTruthy()
      // Check that there's a TouchableOpacity (eye icon button)
      expect(UNSAFE_getByType('TouchableOpacity')).toBeTruthy()
    })

    it('toggles password visibility when eye icon is pressed', () => {
      const { getByPlaceholderText, UNSAFE_getByType } = render(
        <Input placeholder="Password" secureTextEntry />
      )
      const input = getByPlaceholderText('Password')
      const toggleButton = UNSAFE_getByType('TouchableOpacity')

      // Initially secure
      expect(input.props.secureTextEntry).toBe(true)

      // Press toggle button
      fireEvent.press(toggleButton)

      // Now not secure
      expect(input.props.secureTextEntry).toBe(false)

      // Press again
      fireEvent.press(toggleButton)

      // Secure again
      expect(input.props.secureTextEntry).toBe(true)
    })

    it('does not render eye icon when showPasswordToggle is false', () => {
      const { queryByTestId, UNSAFE_queryByType } = render(
        <Input placeholder="Password" secureTextEntry showPasswordToggle={false} />
      )
      // TouchableOpacity should not be present
      expect(UNSAFE_queryByType('TouchableOpacity')).toBeNull()
    })

    it('hides password text initially', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Password" secureTextEntry value="secret123" onChangeText={() => {}} />
      )
      const input = getByPlaceholderText('Password')
      expect(input.props.secureTextEntry).toBe(true)
    })
  })

  describe('User Interaction', () => {
    it('calls onChangeText when text changes', () => {
      const handleChange = jest.fn()
      const { getByPlaceholderText } = render(
        <Input placeholder="Type here" onChangeText={handleChange} />
      )
      const input = getByPlaceholderText('Type here')

      fireEvent.changeText(input, 'New text')

      expect(handleChange).toHaveBeenCalledWith('New text')
    })

    it('calls onFocus when input is focused', () => {
      const handleFocus = jest.fn()
      const { getByPlaceholderText } = render(
        <Input placeholder="Focus me" onFocus={handleFocus} />
      )
      const input = getByPlaceholderText('Focus me')

      fireEvent(input, 'focus')

      expect(handleFocus).toHaveBeenCalled()
    })

    it('calls onBlur when input loses focus', () => {
      const handleBlur = jest.fn()
      const { getByPlaceholderText } = render(
        <Input placeholder="Blur me" onBlur={handleBlur} />
      )
      const input = getByPlaceholderText('Blur me')

      fireEvent(input, 'blur')

      expect(handleBlur).toHaveBeenCalled()
    })
  })

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Custom" className="my-custom-class" />
      )
      expect(getByPlaceholderText('Custom')).toBeTruthy()
    })

    it('applies custom style object', () => {
      const customStyle = { backgroundColor: 'red' }
      const { getByPlaceholderText } = render(
        <Input placeholder="Styled" style={customStyle} />
      )
      const input = getByPlaceholderText('Styled')
      expect(input.props.style).toContainEqual(customStyle)
    })

    it('applies custom textStyle', () => {
      const customTextStyle = { fontSize: 20 }
      const { getByPlaceholderText } = render(
        <Input placeholder="Text Styled" textStyle={customTextStyle} />
      )
      const input = getByPlaceholderText('Text Styled')
      expect(input.props.style).toContainEqual(customTextStyle)
    })
  })

  describe('Compound Variants', () => {
    it('renders outlined default correctly', () => {
      const { getByPlaceholderText } = render(
        <Input
          placeholder="Outlined Default"
          variant="outlined"
          colorScheme="default"
        />
      )
      expect(getByPlaceholderText('Outlined Default')).toBeTruthy()
    })

    it('renders filled brand correctly', () => {
      const { getByPlaceholderText } = render(
        <Input
          placeholder="Filled Brand"
          variant="filled"
          colorScheme="brand"
        />
      )
      expect(getByPlaceholderText('Filled Brand')).toBeTruthy()
    })

    it('error state overrides colorScheme', () => {
      const { getByPlaceholderText } = render(
        <Input
          placeholder="Error Override"
          colorScheme="brand"
          error
        />
      )
      expect(getByPlaceholderText('Error Override')).toBeTruthy()
    })

    it('success state overrides colorScheme', () => {
      const { getByPlaceholderText } = render(
        <Input
          placeholder="Success Override"
          colorScheme="brand"
          success
        />
      )
      expect(getByPlaceholderText('Success Override')).toBeTruthy()
    })
  })
})
