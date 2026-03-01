import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Badge } from './index'

describe('Badge Component', () => {
  describe('Basic rendering', () => {
    it('renders children correctly', () => {
      const { getByText } = render(<Badge>Test Badge</Badge>)
      expect(getByText('Test Badge')).toBeTruthy()
    })

    it('renders with default variant (default)', () => {
      const { getByText } = render(<Badge>Default</Badge>)
      const badge = getByText('Default').parent
      expect(badge?.props.className).toBeDefined()
    })

    it('renders with default color (blue)', () => {
      const { getByText } = render(<Badge>Blue</Badge>)
      const text = getByText('Blue')
      expect(text.props.className).toContain('text-[#4C7EFF]')
    })

    it('renders with default size (sm)', () => {
      const { getByText } = render(<Badge>Medium</Badge>)
      const badge = getByText('Medium').parent
      expect(badge?.props.className).toContain('px-[34px]')
      expect(badge?.props.className).toContain('py-[10px]')
    })
  })

  describe('Variants', () => {
    describe('Blue color variants', () => {
      it('renders blue default variant', () => {
        const { getByText } = render(<Badge color="blue" variant="default">Blue Default</Badge>)
        const text = getByText('Blue Default')
        expect(text.props.className).toContain('text-[#4C7EFF]')
      })

      it('renders blue flat variant', () => {
        const { getByText } = render(<Badge color="blue" variant="flat">Blue Flat</Badge>)
        const badge = getByText('Blue Flat').parent
        expect(badge?.props.className).toContain('bg-[rgba(76,126,255,0.15)]')
        const text = getByText('Blue Flat')
        expect(text.props.className).toContain('text-[#4C7EFF]')
      })

      it('renders blue solid variant', () => {
        const { getByText } = render(<Badge color="blue" variant="solid">Blue Solid</Badge>)
        const badge = getByText('Blue Solid').parent
        expect(badge?.props.className).toContain('bg-[#4C7EFF]')
        const text = getByText('Blue Solid')
        expect(text.props.className).toContain('text-white')
      })

      it('renders blue bordered variant', () => {
        const { getByText } = render(<Badge color="blue" variant="bordered">Blue Bordered</Badge>)
        const badge = getByText('Blue Bordered').parent
        expect(badge?.props.className).toContain('border-[#4C7EFF]')
        const text = getByText('Blue Bordered')
        expect(text.props.className).toContain('text-[#4C7EFF]')
      })
    })

    describe('White color variants', () => {
      it('renders white default variant', () => {
        const { getByText } = render(<Badge color="white" variant="default">White Default</Badge>)
        const text = getByText('White Default')
        expect(text.props.className).toContain('text-white')
      })

      it('renders white flat variant', () => {
        const { getByText } = render(<Badge color="white" variant="flat">White Flat</Badge>)
        const badge = getByText('White Flat').parent
        expect(badge?.props.className).toContain('bg-[rgba(255,255,255,0.15)]')
        const text = getByText('White Flat')
        expect(text.props.className).toContain('text-white')
      })

      it('renders white solid variant', () => {
        const { getByText } = render(<Badge color="white" variant="solid">White Solid</Badge>)
        const badge = getByText('White Solid').parent
        expect(badge?.props.className).toContain('bg-white')
        const text = getByText('White Solid')
        expect(text.props.className).toContain('text-[#0C1C33]')
      })

      it('renders white bordered variant', () => {
        const { getByText } = render(<Badge color="white" variant="bordered">White Bordered</Badge>)
        const badge = getByText('White Bordered').parent
        expect(badge?.props.className).toContain('border-white')
        const text = getByText('White Bordered')
        expect(text.props.className).toContain('text-white')
      })
    })

    describe('Gray color variants', () => {
      it('renders gray default variant', () => {
        const { getByText } = render(<Badge color="gray" variant="default">Gray Default</Badge>)
        const text = getByText('Gray Default')
        expect(text.props.className).toContain('text-[#0C1C33]')
      })

      it('renders gray flat variant', () => {
        const { getByText } = render(<Badge color="gray" variant="flat">Gray Flat</Badge>)
        const badge = getByText('Gray Flat').parent
        expect(badge?.props.className).toContain('bg-[rgba(12,28,51,0.15)]')
        const text = getByText('Gray Flat')
        expect(text.props.className).toContain('text-[#0C1C33]')
      })

      it('renders gray solid variant', () => {
        const { getByText } = render(<Badge color="gray" variant="solid">Gray Solid</Badge>)
        const badge = getByText('Gray Solid').parent
        expect(badge?.props.className).toContain('bg-[#0C1C33]')
        const text = getByText('Gray Solid')
        expect(text.props.className).toContain('text-white')
      })

      it('renders gray bordered variant', () => {
        const { getByText } = render(<Badge color="gray" variant="bordered">Gray Bordered</Badge>)
        const badge = getByText('Gray Bordered').parent
        expect(badge?.props.className).toContain('border-[#0C1C33]')
        const text = getByText('Gray Bordered')
        expect(text.props.className).toContain('text-[#0C1C33]')
      })
    })

    describe('Light-gray color variants', () => {
      it('renders light-gray default variant', () => {
        const { getByText } = render(<Badge color="light-gray" variant="default">Light Gray Default</Badge>)
        const text = getByText('Light Gray Default')
        expect(text.props.className).toContain('text-[#6B7280]')
      })

      it('renders light-gray flat variant', () => {
        const { getByText } = render(<Badge color="light-gray" variant="flat">Light Gray Flat</Badge>)
        const badge = getByText('Light Gray Flat').parent
        expect(badge?.props.className).toContain('bg-[rgba(12,28,51,0.05)]')
        const text = getByText('Light Gray Flat')
        expect(text.props.className).toContain('text-[#0C1C33]')
      })

      it('renders light-gray solid variant', () => {
        const { getByText } = render(<Badge color="light-gray" variant="solid">Light Gray Solid</Badge>)
        const badge = getByText('Light Gray Solid').parent
        expect(badge?.props.className).toContain('bg-[rgba(12,28,51,0.15)]')
        const text = getByText('Light Gray Solid')
        expect(text.props.className).toContain('text-[#0C1C33]')
      })

      it('renders light-gray bordered variant', () => {
        const { getByText } = render(<Badge color="light-gray" variant="bordered">Light Gray Bordered</Badge>)
        const badge = getByText('Light Gray Bordered').parent
        expect(badge?.props.className).toContain('border-[#6B7280]')
        const text = getByText('Light Gray Bordered')
        expect(text.props.className).toContain('text-[#6B7280]')
      })
    })

    describe('Turquoise color variants', () => {
      it('renders turquoise default variant', () => {
        const { getByText } = render(<Badge color="turquoise" variant="default">Turquoise Default</Badge>)
        const text = getByText('Turquoise Default')
        expect(text.props.className).toContain('text-[#60F6D2]')
      })

      it('renders turquoise flat variant', () => {
        const { getByText } = render(<Badge color="turquoise" variant="flat">Turquoise Flat</Badge>)
        const badge = getByText('Turquoise Flat').parent
        expect(badge?.props.className).toContain('bg-[rgba(96,246,210,0.15)]')
        const text = getByText('Turquoise Flat')
        expect(text.props.className).toContain('text-[#60F6D2]')
      })

      it('renders turquoise solid variant', () => {
        const { getByText } = render(<Badge color="turquoise" variant="solid">Turquoise Solid</Badge>)
        const badge = getByText('Turquoise Solid').parent
        expect(badge?.props.className).toContain('bg-[#60F6D2]')
        const text = getByText('Turquoise Solid')
        expect(text.props.className).toContain('text-[#0C1C33]')
      })

      it('renders turquoise bordered variant', () => {
        const { getByText } = render(<Badge color="turquoise" variant="bordered">Turquoise Bordered</Badge>)
        const badge = getByText('Turquoise Bordered').parent
        expect(badge?.props.className).toContain('border-[#60F6D2]')
        const text = getByText('Turquoise Bordered')
        expect(text.props.className).toContain('text-[#60F6D2]')
      })
    })

    describe('Red color variants', () => {
      it('renders red default variant', () => {
        const { getByText } = render(<Badge color="red" variant="default">Red Default</Badge>)
        const text = getByText('Red Default')
        expect(text.props.className).toContain('text-[#CD2E00]')
      })

      it('renders red flat variant', () => {
        const { getByText } = render(<Badge color="red" variant="flat">Red Flat</Badge>)
        const badge = getByText('Red Flat').parent
        expect(badge?.props.className).toContain('bg-[rgba(205,46,0,0.15)]')
        const text = getByText('Red Flat')
        expect(text.props.className).toContain('text-[#CD2E00]')
      })

      it('renders red solid variant', () => {
        const { getByText } = render(<Badge color="red" variant="solid">Red Solid</Badge>)
        const badge = getByText('Red Solid').parent
        expect(badge?.props.className).toContain('bg-[#CD2E00]')
        const text = getByText('Red Solid')
        expect(text.props.className).toContain('text-white')
      })

      it('renders red bordered variant', () => {
        const { getByText } = render(<Badge color="red" variant="bordered">Red Bordered</Badge>)
        const badge = getByText('Red Bordered').parent
        expect(badge?.props.className).toContain('border-[#CD2E00]')
        const text = getByText('Red Bordered')
        expect(text.props.className).toContain('text-[#CD2E00]')
      })
    })

    describe('Orange color variants', () => {
      it('renders orange default variant', () => {
        const { getByText } = render(<Badge color="orange" variant="default">Orange Default</Badge>)
        const text = getByText('Orange Default')
        expect(text.props.className).toContain('text-[#F98F12]')
      })

      it('renders orange flat variant', () => {
        const { getByText } = render(<Badge color="orange" variant="flat">Orange Flat</Badge>)
        const badge = getByText('Orange Flat').parent
        expect(badge?.props.className).toContain('bg-[rgba(249,143,18,0.15)]')
        const text = getByText('Orange Flat')
        expect(text.props.className).toContain('text-[#F98F12]')
      })

      it('renders orange solid variant', () => {
        const { getByText } = render(<Badge color="orange" variant="solid">Orange Solid</Badge>)
        const badge = getByText('Orange Solid').parent
        expect(badge?.props.className).toContain('bg-[#F98F12]')
        const text = getByText('Orange Solid')
        expect(text.props.className).toContain('text-white')
      })

      it('renders orange bordered variant', () => {
        const { getByText } = render(<Badge color="orange" variant="bordered">Orange Bordered</Badge>)
        const badge = getByText('Orange Bordered').parent
        expect(badge?.props.className).toContain('border-[#F98F12]')
        const text = getByText('Orange Bordered')
        expect(text.props.className).toContain('text-[#F98F12]')
      })
    })
  })

  describe('Sizes', () => {
    it('renders xxs size', () => {
      const { getByText } = render(<Badge size="xxs">Extra Extra Small</Badge>)
      const badge = getByText('Extra Extra Small').parent
      expect(badge?.props.className).toContain('px-1')
      expect(badge?.props.className).toContain('py-1')
      expect(badge?.props.className).toContain('rounded-full')
    })

    it('renders xs size', () => {
      const { getByText } = render(<Badge size="xs">Extra Small</Badge>)
      const badge = getByText('Extra Small').parent
      expect(badge?.props.className).toContain('px-2')
      expect(badge?.props.className).toContain('py-1')
      expect(badge?.props.className).toContain('rounded-full')
    })

    it('renders sm size', () => {
      const { getByText } = render(<Badge size="sm">Small</Badge>)
      const badge = getByText('Small').parent
      expect(badge?.props.className).toContain('px-[34px]')
      expect(badge?.props.className).toContain('py-[10px]')
      expect(badge?.props.className).toContain('rounded-full')
    })

    it('renders xl size', () => {
      const { getByText } = render(<Badge size="xl">Extra Large</Badge>)
      const badge = getByText('Extra Large').parent
      expect(badge?.props.className).toContain('px-9')
      expect(badge?.props.className).toContain('py-4')
      expect(badge?.props.className).toContain('rounded-full')
    })
  })

  describe('Border radius', () => {
    it('renders with default border radius (full)', () => {
      const { getByText } = render(<Badge>Default Radius</Badge>)
      const badge = getByText('Default Radius').parent
      expect(badge?.props.className).toContain('rounded-full')
    })

    it('renders with xs border radius', () => {
      const { getByText } = render(<Badge borderRadius="xs">XS Radius</Badge>)
      const badge = getByText('XS Radius').parent
      expect(badge?.props.className).toContain('rounded-[4px]')
    })

    it('xs border radius overrides size border radius', () => {
      const { getByText } = render(<Badge size="sm" borderRadius="xs">Override</Badge>)
      const badge = getByText('Override').parent
      expect(badge?.props.className).toContain('rounded-[4px]')
      expect(badge?.props.className).not.toContain('rounded-full')
    })
  })

  describe('Interaction', () => {
    it('renders as Pressable when onPress is provided', () => {
      const onPress = jest.fn()
      const { getByText } = render(<Badge onPress={onPress}>Pressable Badge</Badge>)
      const pressable = getByText('Pressable Badge').parent
      expect(pressable).toBeTruthy()
    })

    it('calls onPress when pressed', () => {
      const onPress = jest.fn()
      const { getByText } = render(<Badge onPress={onPress}>Press me</Badge>)
      fireEvent.press(getByText('Press me').parent!)
      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('renders as View when no onPress provided', () => {
      const { getByText } = render(<Badge>Static Badge</Badge>)
      const view = getByText('Static Badge').parent
      expect(view).toBeTruthy()
      expect(view?.type).toBe('View')
    })
  })

  describe('Custom styling', () => {
    it('accepts custom className', () => {
      const { getByText } = render(<Badge className="custom-class">Custom</Badge>)
      const badge = getByText('Custom').parent
      expect(badge?.props.className).toContain('custom-class')
    })

    it('combines default and custom classes', () => {
      const { getByText } = render(
        <Badge variant="solid" size="xs" className="mt-4">Combined</Badge>
      )
      const badge = getByText('Combined').parent
      expect(badge?.props.className).toContain('bg-[#4C7EFF]')
      expect(badge?.props.className).toContain('px-2')
      expect(badge?.props.className).toContain('mt-4')
    })

    it('accepts custom style prop', () => {
      const customStyle = { marginTop: 20 }
      const { getByText } = render(<Badge style={customStyle}>Styled</Badge>)
      const badge = getByText('Styled').parent
      expect(badge?.props.style).toContainEqual(customStyle)
    })
  })

  describe('Children rendering', () => {
    it('renders string children in Text component', () => {
      const { getByText } = render(<Badge>String child</Badge>)
      expect(getByText('String child')).toBeTruthy()
    })

    it('renders custom React node children', () => {
      const { getByTestId } = render(
        <Badge>
          <Text testID="custom-child">Custom Node</Text>
        </Badge>
      )
      expect(getByTestId('custom-child')).toBeTruthy()
    })
  })
})
