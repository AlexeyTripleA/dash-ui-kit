import React from 'react'
import { render } from '@testing-library/react-native'
import { Avatar } from './index'

// Mock the minidenticon function to return predictable SVG strings
jest.mock('minidenticons', () => ({
  minidenticon: jest.fn((username: string, saturation: number, lightness: number) => {
    return `<svg data-username="${username}" data-saturation="${saturation}" data-lightness="${lightness}"></svg>`
  }),
}))

// Mock SvgXml component
jest.mock('react-native-svg', () => ({
  SvgXml: jest.fn(({ xml, width, height, testID }) => {
    const MockedSvgXml = require('react-native').View
    return (
      <MockedSvgXml
        testID={testID || 'svg-xml'}
        data-xml={xml}
        data-width={width}
        data-height={height}
      />
    )
  }),
}))

describe('Avatar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Basic rendering', () => {
    it('renders with username', () => {
      const { getByTestId } = render(<Avatar username="alice" testID="avatar" />)
      expect(getByTestId('avatar')).toBeTruthy()
    })

    it('renders SvgXml component', () => {
      const { getByTestId } = render(<Avatar username="alice" />)
      expect(getByTestId('svg-xml')).toBeTruthy()
    })

    it('passes username to minidenticon', () => {
      const { minidenticon } = require('minidenticons')
      render(<Avatar username="alice" />)
      expect(minidenticon).toHaveBeenCalledWith('alice', 50, 50)
    })

    it('renders with default width and height', () => {
      const { getByTestId } = render(<Avatar username="alice" />)
      const svgXml = getByTestId('svg-xml')
      expect(svgXml.props['data-width']).toBe(40)
      expect(svgXml.props['data-height']).toBe(40)
    })
  })

  describe('Username variations', () => {
    it('generates different SVG for different usernames', () => {
      const { minidenticon } = require('minidenticons')
      
      const { rerender } = render(<Avatar username="alice" />)
      expect(minidenticon).toHaveBeenCalledWith('alice', 50, 50)
      
      rerender(<Avatar username="bob" />)
      expect(minidenticon).toHaveBeenCalledWith('bob', 50, 50)
      
      expect(minidenticon).toHaveBeenCalledTimes(2)
    })

    it('generates SVG with special characters in username', () => {
      const { minidenticon } = require('minidenticons')
      render(<Avatar username="user@example.com" />)
      expect(minidenticon).toHaveBeenCalledWith('user@example.com', 50, 50)
    })

    it('generates SVG with empty username', () => {
      const { minidenticon } = require('minidenticons')
      render(<Avatar username="" />)
      expect(minidenticon).toHaveBeenCalledWith('', 50, 50)
    })
  })

  describe('Custom saturation and lightness', () => {
    it('applies custom saturation', () => {
      const { minidenticon } = require('minidenticons')
      render(<Avatar username="alice" saturation={75} />)
      expect(minidenticon).toHaveBeenCalledWith('alice', 75, 50)
    })

    it('applies custom lightness', () => {
      const { minidenticon } = require('minidenticons')
      render(<Avatar username="alice" lightness={60} />)
      expect(minidenticon).toHaveBeenCalledWith('alice', 50, 60)
    })

    it('applies both custom saturation and lightness', () => {
      const { minidenticon } = require('minidenticons')
      render(<Avatar username="alice" saturation={80} lightness={70} />)
      expect(minidenticon).toHaveBeenCalledWith('alice', 80, 70)
    })

    it('handles saturation edge cases (0)', () => {
      const { minidenticon } = require('minidenticons')
      render(<Avatar username="alice" saturation={0} />)
      expect(minidenticon).toHaveBeenCalledWith('alice', 0, 50)
    })

    it('handles saturation edge cases (100)', () => {
      const { minidenticon } = require('minidenticons')
      render(<Avatar username="alice" saturation={100} />)
      expect(minidenticon).toHaveBeenCalledWith('alice', 100, 50)
    })

    it('handles lightness edge cases (0)', () => {
      const { minidenticon } = require('minidenticons')
      render(<Avatar username="alice" lightness={0} />)
      expect(minidenticon).toHaveBeenCalledWith('alice', 50, 0)
    })

    it('handles lightness edge cases (100)', () => {
      const { minidenticon } = require('minidenticons')
      render(<Avatar username="alice" lightness={100} />)
      expect(minidenticon).toHaveBeenCalledWith('alice', 50, 100)
    })
  })

  describe('Custom dimensions', () => {
    it('renders with custom width', () => {
      const { getByTestId } = render(<Avatar username="alice" width={60} />)
      const svgXml = getByTestId('svg-xml')
      expect(svgXml.props['data-width']).toBe(60)
    })

    it('renders with custom height', () => {
      const { getByTestId } = render(<Avatar username="alice" height={60} />)
      const svgXml = getByTestId('svg-xml')
      expect(svgXml.props['data-height']).toBe(60)
    })

    it('renders with custom width and height', () => {
      const { getByTestId } = render(<Avatar username="alice" width={80} height={80} />)
      const svgXml = getByTestId('svg-xml')
      expect(svgXml.props['data-width']).toBe(80)
      expect(svgXml.props['data-height']).toBe(80)
    })

    it('renders with different width and height', () => {
      const { getByTestId } = render(<Avatar username="alice" width={50} height={100} />)
      const svgXml = getByTestId('svg-xml')
      expect(svgXml.props['data-width']).toBe(50)
      expect(svgXml.props['data-height']).toBe(100)
    })

    it('renders with small dimensions', () => {
      const { getByTestId } = render(<Avatar username="alice" width={20} height={20} />)
      const svgXml = getByTestId('svg-xml')
      expect(svgXml.props['data-width']).toBe(20)
      expect(svgXml.props['data-height']).toBe(20)
    })

    it('renders with large dimensions', () => {
      const { getByTestId } = render(<Avatar username="alice" width={200} height={200} />)
      const svgXml = getByTestId('svg-xml')
      expect(svgXml.props['data-width']).toBe(200)
      expect(svgXml.props['data-height']).toBe(200)
    })
  })

  describe('ClassName styling', () => {
    it('applies custom className', () => {
      const { getByTestId } = render(
        <Avatar username="alice" className="custom-class" testID="avatar" />
      )
      const container = getByTestId('avatar')
      expect(container.props.className).toContain('custom-class')
    })

    it('combines className with default classes', () => {
      const { getByTestId } = render(
        <Avatar username="alice" className="mt-4 rounded-full" testID="avatar" />
      )
      const container = getByTestId('avatar')
      expect(container.props.className).toContain('mt-4')
      expect(container.props.className).toContain('rounded-full')
      expect(container.props.className).toContain('relative')
    })

    it('applies empty className correctly', () => {
      const { getByTestId } = render(
        <Avatar username="alice" className="" testID="avatar" />
      )
      const container = getByTestId('avatar')
      expect(container.props.className).toBe('relative')
    })

    it('handles className with multiple classes', () => {
      const { getByTestId } = render(
        <Avatar 
          username="alice" 
          className="shadow-lg border-2 border-blue-500" 
          testID="avatar" 
        />
      )
      const container = getByTestId('avatar')
      expect(container.props.className).toContain('shadow-lg')
      expect(container.props.className).toContain('border-2')
      expect(container.props.className).toContain('border-blue-500')
    })
  })

  describe('ViewProps support', () => {
    it('passes style prop correctly', () => {
      const customStyle = { marginTop: 20, backgroundColor: 'red' }
      const { getByTestId } = render(
        <Avatar username="alice" style={customStyle} testID="avatar" />
      )
      const container = getByTestId('avatar')
      expect(container.props.style).toEqual(customStyle)
    })

    it('passes accessibility props', () => {
      const { getByTestId } = render(
        <Avatar 
          username="alice" 
          testID="avatar"
          accessibilityLabel="User avatar"
          accessibilityRole="image"
        />
      )
      const container = getByTestId('avatar')
      expect(container.props.accessibilityLabel).toBe('User avatar')
      expect(container.props.accessibilityRole).toBe('image')
    })

    it('passes additional View props', () => {
      const { getByTestId } = render(
        <Avatar 
          username="alice" 
          testID="avatar"
          accessible={true}
          accessibilityHint="Double tap to view profile"
        />
      )
      const container = getByTestId('avatar')
      expect(container.props.accessible).toBe(true)
      expect(container.props.accessibilityHint).toBe('Double tap to view profile')
    })

    it('combines style prop with className', () => {
      const customStyle = { marginTop: 20 }
      const { getByTestId } = render(
        <Avatar 
          username="alice" 
          className="shadow-lg" 
          style={customStyle} 
          testID="avatar" 
        />
      )
      const container = getByTestId('avatar')
      expect(container.props.className).toContain('shadow-lg')
      expect(container.props.style).toEqual(customStyle)
    })
  })

  describe('SvgXml integration', () => {
    it('passes SVG string to SvgXml', () => {
      const { getByTestId } = render(<Avatar username="alice" />)
      const svgXml = getByTestId('svg-xml')
      expect(svgXml.props['data-xml']).toContain('data-username="alice"')
      expect(svgXml.props['data-xml']).toContain('data-saturation="50"')
      expect(svgXml.props['data-xml']).toContain('data-lightness="50"')
    })

    it('passes correct dimensions to SvgXml', () => {
      const { getByTestId } = render(<Avatar username="alice" width={100} height={100} />)
      const svgXml = getByTestId('svg-xml')
      expect(svgXml.props['data-width']).toBe(100)
      expect(svgXml.props['data-height']).toBe(100)
    })

    it('SvgXml receives updated SVG when username changes', () => {
      const { getByTestId, rerender } = render(<Avatar username="alice" />)
      let svgXml = getByTestId('svg-xml')
      expect(svgXml.props['data-xml']).toContain('data-username="alice"')
      
      rerender(<Avatar username="bob" />)
      svgXml = getByTestId('svg-xml')
      expect(svgXml.props['data-xml']).toContain('data-username="bob"')
    })
  })

  describe('useMemo optimization', () => {
    it('does not regenerate SVG on unrelated prop changes', () => {
      const { minidenticon } = require('minidenticons')
      
      const { rerender } = render(
        <Avatar username="alice" saturation={50} lightness={50} className="class1" />
      )
      expect(minidenticon).toHaveBeenCalledTimes(1)
      
      // Change only className (unrelated to SVG generation)
      rerender(
        <Avatar username="alice" saturation={50} lightness={50} className="class2" />
      )
      
      // Should not call minidenticon again
      expect(minidenticon).toHaveBeenCalledTimes(1)
    })

    it('does not regenerate SVG on style prop changes', () => {
      const { minidenticon } = require('minidenticons')
      
      const { rerender } = render(
        <Avatar username="alice" style={{ marginTop: 10 }} />
      )
      expect(minidenticon).toHaveBeenCalledTimes(1)
      
      rerender(
        <Avatar username="alice" style={{ marginTop: 20 }} />
      )
      
      expect(minidenticon).toHaveBeenCalledTimes(1)
    })

    it('does not regenerate SVG on width/height changes', () => {
      const { minidenticon } = require('minidenticons')
      
      const { rerender } = render(
        <Avatar username="alice" width={40} height={40} />
      )
      expect(minidenticon).toHaveBeenCalledTimes(1)
      
      rerender(
        <Avatar username="alice" width={80} height={80} />
      )
      
      // Width/height don't affect SVG generation, only SvgXml rendering
      expect(minidenticon).toHaveBeenCalledTimes(1)
    })

    it('regenerates SVG when username changes', () => {
      const { minidenticon } = require('minidenticons')
      
      const { rerender } = render(<Avatar username="alice" />)
      expect(minidenticon).toHaveBeenCalledTimes(1)
      
      rerender(<Avatar username="bob" />)
      expect(minidenticon).toHaveBeenCalledTimes(2)
    })

    it('regenerates SVG when saturation changes', () => {
      const { minidenticon } = require('minidenticons')
      
      const { rerender } = render(<Avatar username="alice" saturation={50} />)
      expect(minidenticon).toHaveBeenCalledTimes(1)
      
      rerender(<Avatar username="alice" saturation={75} />)
      expect(minidenticon).toHaveBeenCalledTimes(2)
    })

    it('regenerates SVG when lightness changes', () => {
      const { minidenticon } = require('minidenticons')
      
      const { rerender } = render(<Avatar username="alice" lightness={50} />)
      expect(minidenticon).toHaveBeenCalledTimes(1)
      
      rerender(<Avatar username="alice" lightness={70} />)
      expect(minidenticon).toHaveBeenCalledTimes(2)
    })

    it('regenerates SVG only when memoized dependencies change', () => {
      const { minidenticon } = require('minidenticons')
      
      const { rerender } = render(
        <Avatar 
          username="alice" 
          saturation={50} 
          lightness={50}
          className="class1"
          style={{ marginTop: 10 }}
          width={40}
        />
      )
      expect(minidenticon).toHaveBeenCalledTimes(1)
      
      // Change multiple unrelated props
      rerender(
        <Avatar 
          username="alice" 
          saturation={50} 
          lightness={50}
          className="class2 class3"
          style={{ marginTop: 20, padding: 5 }}
          width={80}
        />
      )
      expect(minidenticon).toHaveBeenCalledTimes(1)
      
      // Now change a memoized dependency
      rerender(
        <Avatar 
          username="bob" 
          saturation={50} 
          lightness={50}
          className="class2 class3"
          style={{ marginTop: 20, padding: 5 }}
          width={80}
        />
      )
      expect(minidenticon).toHaveBeenCalledTimes(2)
    })
  })

  describe('Edge cases', () => {
    it('handles very long username', () => {
      const longUsername = 'a'.repeat(1000)
      const { minidenticon } = require('minidenticons')
      render(<Avatar username={longUsername} />)
      expect(minidenticon).toHaveBeenCalledWith(longUsername, 50, 50)
    })

    it('handles unicode characters in username', () => {
      const { minidenticon } = require('minidenticons')
      render(<Avatar username="用户名" />)
      expect(minidenticon).toHaveBeenCalledWith('用户名', 50, 50)
    })

    it('handles emoji in username', () => {
      const { minidenticon } = require('minidenticons')
      render(<Avatar username="👤🎨" />)
      expect(minidenticon).toHaveBeenCalledWith('👤🎨', 50, 50)
    })

    it('renders with zero dimensions', () => {
      const { getByTestId } = render(<Avatar username="alice" width={0} height={0} />)
      const svgXml = getByTestId('svg-xml')
      expect(svgXml.props['data-width']).toBe(0)
      expect(svgXml.props['data-height']).toBe(0)
    })

    it('combines all custom props together', () => {
      const { minidenticon } = require('minidenticons')
      const { getByTestId } = render(
        <Avatar 
          username="alice"
          saturation={80}
          lightness={60}
          width={100}
          height={100}
          className="custom-avatar"
          style={{ borderRadius: 50 }}
          testID="avatar"
          accessibilityLabel="User profile picture"
        />
      )
      
      expect(minidenticon).toHaveBeenCalledWith('alice', 80, 60)
      
      const container = getByTestId('avatar')
      expect(container.props.className).toContain('custom-avatar')
      expect(container.props.style).toEqual({ borderRadius: 50 })
      expect(container.props.accessibilityLabel).toBe('User profile picture')
      
      const svgXml = getByTestId('svg-xml')
      expect(svgXml.props['data-width']).toBe(100)
      expect(svgXml.props['data-height']).toBe(100)
    })
  })
})
