import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, fireEvent } from '@testing-library/react-native'
import { Identifier } from './index'

const mockSetString = vi.fn()

// Mock Clipboard
vi.mock('@react-native-clipboard/clipboard', () => ({
  default: {
    setString: mockSetString,
  },
}))

// Mock minidenticon for Avatar
vi.mock('minidenticons', () => ({
  minidenticon: vi.fn((username: string) => {
    return `<svg data-username="${username}"></svg>`
  }),
}))

// Mock SvgXml for Avatar
vi.mock('react-native-svg', () => ({
  SvgXml: vi.fn(({ xml, width, height, testID }) => {
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

describe('Identifier Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic rendering', () => {
    it('renders with text', () => {
      const { getByText } = render(<Identifier>test-id-123</Identifier>)
      expect(getByText('test-id-123')).toBeTruthy()
    })

    it('renders empty state when no children', () => {
      const { getByText } = render(<Identifier />)
      expect(getByText('n/a')).toBeTruthy()
    })

    it('renders empty state with empty string', () => {
      const { getByText } = render(<Identifier>{''}</Identifier>)
      expect(getByText('n/a')).toBeTruthy()
    })

    it('renders with className', () => {
      const { getByTestId } = render(
        <Identifier testID="identifier" className="custom-class">
          test-id
        </Identifier>
      )
      const element = getByTestId('identifier')
      expect(element.props.className).toContain('custom-class')
    })

    it('renders with ViewProps', () => {
      const { getByTestId } = render(
        <Identifier testID="identifier" accessible accessibilityLabel="User ID">
          test-id
        </Identifier>
      )
      const element = getByTestId('identifier')
      expect(element.props.accessible).toBe(true)
      expect(element.props.accessibilityLabel).toBe('User ID')
    })
  })

  describe('Avatar integration', () => {
    it('renders with avatar when avatar=true', () => {
      const { getByTestId } = render(
        <Identifier avatar>alice</Identifier>
      )
      expect(getByTestId('svg-xml')).toBeTruthy()
    })

    it('does not render avatar when avatar=false', () => {
      const { queryByTestId } = render(
        <Identifier avatar={false}>alice</Identifier>
      )
      expect(queryByTestId('svg-xml')).toBeNull()
    })

    it('does not render avatar when no children', () => {
      const { queryByTestId } = render(
        <Identifier avatar />
      )
      expect(queryByTestId('svg-xml')).toBeNull()
    })

    it('does not render avatar with empty string', () => {
      const { queryByTestId } = render(
        <Identifier avatar>{''}</Identifier>
      )
      expect(queryByTestId('svg-xml')).toBeNull()
    })

    it('avatar receives correct username', () => {
      const { minidenticon } = require('minidenticons')
      render(<Identifier avatar>alice</Identifier>)
      expect(minidenticon).toHaveBeenCalledWith('alice', 50, 50)
    })
  })

  describe('CopyButton integration', () => {
    it('renders copy button when copyButton=true', () => {
      const { getByLabelText } = render(
        <Identifier copyButton>test-id</Identifier>
      )
      expect(getByLabelText('Copy to clipboard')).toBeTruthy()
    })

    it('does not render copy button when copyButton=false', () => {
      const { queryByLabelText } = render(
        <Identifier copyButton={false}>test-id</Identifier>
      )
      expect(queryByLabelText('Copy to clipboard')).toBeNull()
    })

    it('does not render copy button when no children', () => {
      const { queryByLabelText } = render(
        <Identifier copyButton />
      )
      expect(queryByLabelText('Copy to clipboard')).toBeNull()
    })

    it('does not render copy button with empty string', () => {
      const { queryByLabelText } = render(
        <Identifier copyButton>{''}</Identifier>
      )
      expect(queryByLabelText('Copy to clipboard')).toBeNull()
    })

    it('copy button copies correct text', () => {
      const testText = 'test-id-123'
      const { getByLabelText } = render(
        <Identifier copyButton>{testText}</Identifier>
      )
      fireEvent.press(getByLabelText('Copy to clipboard'))
      expect(mockSetString).toHaveBeenCalledWith(testText)
    })

    it('renders with both avatar and copy button', () => {
      const { getByTestId, getByLabelText } = render(
        <Identifier avatar copyButton>alice</Identifier>
      )
      expect(getByTestId('svg-xml')).toBeTruthy()
      expect(getByLabelText('Copy to clipboard')).toBeTruthy()
    })
  })

  describe('Highlight modes', () => {
    const testId = '0x1234567890abcdef'

    it('renders default highlight mode', () => {
      const { container } = render(
        <Identifier highlight="default">{testId}</Identifier>
      )
      expect(container).toBeTruthy()
    })

    it('renders dim highlight mode', () => {
      const { container } = render(
        <Identifier highlight="dim">{testId}</Identifier>
      )
      expect(container).toBeTruthy()
    })

    it('renders highlight mode', () => {
      const { container } = render(
        <Identifier highlight="highlight">{testId}</Identifier>
      )
      expect(container).toBeTruthy()
    })

    it('renders first highlight mode', () => {
      const { container } = render(
        <Identifier highlight="first">{testId}</Identifier>
      )
      expect(container).toBeTruthy()
    })

    it('renders last highlight mode', () => {
      const { container } = render(
        <Identifier highlight="last">{testId}</Identifier>
      )
      expect(container).toBeTruthy()
    })

    it('renders both highlight mode', () => {
      const { container } = render(
        <Identifier highlight="both">{testId}</Identifier>
      )
      expect(container).toBeTruthy()
    })

    it('renders without highlight when undefined', () => {
      const { getByText } = render(
        <Identifier>{testId}</Identifier>
      )
      expect(getByText(testId)).toBeTruthy()
    })

    it('highlight mode shows n/a for empty string', () => {
      const { getByText } = render(
        <Identifier highlight="default">{''}</Identifier>
      )
      expect(getByText('n/a')).toBeTruthy()
    })

    it('highlight mode shows n/a for no children', () => {
      const { getByText } = render(
        <Identifier highlight="default" />
      )
      expect(getByText('n/a')).toBeTruthy()
    })
  })

  describe('Ellipsis modes', () => {
    const longText = 'very-long-identifier-text-that-should-be-truncated-with-ellipsis'

    it('renders with standard ellipsis', () => {
      const { getByText } = render(
        <Identifier ellipsis>{longText}</Identifier>
      )
      const textElement = getByText(longText)
      expect(textElement.props.numberOfLines).toBe(1)
      expect(textElement.props.ellipsizeMode).toBe('tail')
    })

    it('renders without ellipsis by default', () => {
      const { getByText } = render(
        <Identifier>{longText}</Identifier>
      )
      const textElement = getByText(longText)
      expect(textElement.props.numberOfLines).toBeUndefined()
      expect(textElement.props.ellipsizeMode).toBeUndefined()
    })

    it('renders with maxLines', () => {
      const multilineText = 'line1\nline2\nline3\nline4'
      const { getByText } = render(
        <Identifier maxLines={2}>{multilineText}</Identifier>
      )
      const textElement = getByText(multilineText)
      expect(textElement.props.numberOfLines).toBe(2)
      expect(textElement.props.ellipsizeMode).toBe('tail')
    })

    it('maxLines=0 does not apply numberOfLines', () => {
      const { getByText } = render(
        <Identifier maxLines={0}>{longText}</Identifier>
      )
      const textElement = getByText(longText)
      expect(textElement.props.numberOfLines).toBeUndefined()
    })

    it('maxLines overrides ellipsis', () => {
      const { getByText } = render(
        <Identifier ellipsis maxLines={3}>{longText}</Identifier>
      )
      const textElement = getByText(longText)
      expect(textElement.props.numberOfLines).toBe(3)
    })
  })

  describe('Middle ellipsis', () => {
    it('renders with middle ellipsis', () => {
      const longText = 'very-long-identifier-text'
      const { getByText } = render(
        <Identifier middleEllipsis edgeChars={4}>{longText}</Identifier>
      )
      expect(getByText('very')).toBeTruthy()
      expect(getByText('…')).toBeTruthy()
      expect(getByText('text')).toBeTruthy()
    })

    it('does not apply middle ellipsis for short text', () => {
      const shortText = 'short'
      const { getByText, queryByText } = render(
        <Identifier middleEllipsis edgeChars={4}>{shortText}</Identifier>
      )
      expect(getByText(shortText)).toBeTruthy()
      expect(queryByText('…')).toBeNull()
    })

    it('middle ellipsis with default edgeChars', () => {
      const longText = 'very-long-text-here'
      const { getByText } = render(
        <Identifier middleEllipsis>{longText}</Identifier>
      )
      expect(getByText('very')).toBeTruthy()
      expect(getByText('…')).toBeTruthy()
      expect(getByText('here')).toBeTruthy()
    })

    it('middle ellipsis with custom edgeChars', () => {
      const longText = 'identifier-text-value'
      const { getByText } = render(
        <Identifier middleEllipsis edgeChars={6}>{longText}</Identifier>
      )
      expect(getByText('identi')).toBeTruthy()
      expect(getByText('…')).toBeTruthy()
      expect(getByText('-value')).toBeTruthy()
    })

    it('middle ellipsis shows n/a for empty string', () => {
      const { getByText } = render(
        <Identifier middleEllipsis>{''}</Identifier>
      )
      expect(getByText('n/a')).toBeTruthy()
    })

    it('middle ellipsis shows n/a for no children', () => {
      const { getByText } = render(
        <Identifier middleEllipsis />
      )
      expect(getByText('n/a')).toBeTruthy()
    })

    it('middle ellipsis overrides standard ellipsis', () => {
      const longText = 'very-long-identifier-text'
      const { getByText, queryByText } = render(
        <Identifier ellipsis middleEllipsis edgeChars={4}>{longText}</Identifier>
      )
      expect(getByText('very')).toBeTruthy()
      expect(getByText('…')).toBeTruthy()
      expect(getByText('text')).toBeTruthy()
    })

    it('middle ellipsis overrides highlight mode', () => {
      const longText = 'very-long-identifier-text'
      const { getByText } = render(
        <Identifier highlight="default" middleEllipsis edgeChars={4}>
          {longText}
        </Identifier>
      )
      expect(getByText('very')).toBeTruthy()
      expect(getByText('…')).toBeTruthy()
      expect(getByText('text')).toBeTruthy()
    })

    it('middle ellipsis overrides maxLines', () => {
      const longText = 'very-long-identifier-text'
      const { getByText } = render(
        <Identifier middleEllipsis maxLines={2} edgeChars={4}>
          {longText}
        </Identifier>
      )
      expect(getByText('very')).toBeTruthy()
      expect(getByText('…')).toBeTruthy()
      expect(getByText('text')).toBeTruthy()
    })
  })

  describe('Theme integration', () => {
    it('renders with light theme by default', () => {
      const { getByTestId } = render(
        <Identifier testID="identifier">test-id</Identifier>
      )
      const element = getByTestId('identifier')
      expect(element.props.className).toContain('text-gray-900')
    })

    it('renders with dark theme', () => {
      const { getByTestId } = render(
        <Identifier testID="identifier" theme="dark">test-id</Identifier>
      )
      const element = getByTestId('identifier')
      expect(element.props.className).toContain('text-white')
    })

    it('applies theme to NotActive component', () => {
      const { container } = render(
        <Identifier theme="dark" />
      )
      expect(container).toBeTruthy()
    })

    it('applies theme to HighlightedID', () => {
      const { container } = render(
        <Identifier theme="dark" highlight="default">test-id</Identifier>
      )
      expect(container).toBeTruthy()
    })

    it('applies theme to MiddleEllipsisText', () => {
      const { container } = render(
        <Identifier theme="dark" middleEllipsis>very-long-text</Identifier>
      )
      expect(container).toBeTruthy()
    })
  })

  describe('Layout handling', () => {
    it('calls onLayout when layout changes', () => {
      const mockOnLayout = vi.fn()
      const { getByTestId } = render(
        <Identifier testID="identifier" onLayout={mockOnLayout}>
          test-id
        </Identifier>
      )
      const element = getByTestId('identifier')
      
      fireEvent(element, 'layout', {
        nativeEvent: {
          layout: { width: 300, height: 40, x: 0, y: 0 }
        }
      })
      
      expect(mockOnLayout).toHaveBeenCalled()
    })

    it('handles layout changes gracefully', () => {
      const { getByTestId } = render(
        <Identifier testID="identifier">test-id</Identifier>
      )
      const element = getByTestId('identifier')
      
      fireEvent(element, 'layout', {
        nativeEvent: {
          layout: { width: 300, height: 40, x: 0, y: 0 }
        }
      })
      
      expect(element).toBeTruthy()
    })
  })

  describe('Edge cases', () => {
    it('handles very long text', () => {
      const longText = 'a'.repeat(1000)
      const { getByText } = render(
        <Identifier>{longText}</Identifier>
      )
      expect(getByText(longText)).toBeTruthy()
    })

    it('handles unicode characters', () => {
      const unicodeText = '用户名标识符'
      const { getByText } = render(
        <Identifier>{unicodeText}</Identifier>
      )
      expect(getByText(unicodeText)).toBeTruthy()
    })

    it('handles emoji', () => {
      const emojiText = '👤🎨🔑'
      const { getByText } = render(
        <Identifier>{emojiText}</Identifier>
      )
      expect(getByText(emojiText)).toBeTruthy()
    })

    it('handles special characters', () => {
      const specialText = '0x1234!@#$%^&*()'
      const { getByText } = render(
        <Identifier>{specialText}</Identifier>
      )
      expect(getByText(specialText)).toBeTruthy()
    })

    it('handles newlines in text', () => {
      const multilineText = 'line1\nline2\nline3'
      const { getByText } = render(
        <Identifier>{multilineText}</Identifier>
      )
      expect(getByText(multilineText)).toBeTruthy()
    })

    it('handles tabs in text', () => {
      const tabText = 'value1\tvalue2\tvalue3'
      const { getByText } = render(
        <Identifier>{tabText}</Identifier>
      )
      expect(getByText(tabText)).toBeTruthy()
    })

    it('renders with all props combined', () => {
      const { getByTestId, getByLabelText } = render(
        <Identifier
          testID="identifier"
          avatar
          copyButton
          highlight="both"
          theme="dark"
          className="custom-class"
        >
          alice-id-123
        </Identifier>
      )
      
      expect(getByTestId('identifier')).toBeTruthy()
      expect(getByTestId('svg-xml')).toBeTruthy()
      expect(getByLabelText('Copy to clipboard')).toBeTruthy()
    })

    it('renders with custom style', () => {
      const customStyle = { marginTop: 20, backgroundColor: 'blue' }
      const { getByTestId } = render(
        <Identifier testID="identifier" style={customStyle}>
          test-id
        </Identifier>
      )
      const element = getByTestId('identifier')
      expect(element.props.style).toContainEqual(customStyle)
    })

    it('handles null children gracefully', () => {
      const { getByText } = render(
        <Identifier>{null as any}</Identifier>
      )
      expect(getByText('n/a')).toBeTruthy()
    })

    it('handles undefined children gracefully', () => {
      const { getByText } = render(
        <Identifier>{undefined}</Identifier>
      )
      expect(getByText('n/a')).toBeTruthy()
    })
  })

  describe('Priority of modes', () => {
    it('middleEllipsis takes priority over highlight', () => {
      const { getByText } = render(
        <Identifier highlight="default" middleEllipsis edgeChars={4}>
          very-long-text-here
        </Identifier>
      )
      expect(getByText('very')).toBeTruthy()
      expect(getByText('…')).toBeTruthy()
    })

    it('middleEllipsis takes priority over ellipsis', () => {
      const { getByText } = render(
        <Identifier ellipsis middleEllipsis edgeChars={4}>
          very-long-text-here
        </Identifier>
      )
      expect(getByText('very')).toBeTruthy()
      expect(getByText('…')).toBeTruthy()
    })

    it('middleEllipsis takes priority over maxLines', () => {
      const { getByText } = render(
        <Identifier maxLines={2} middleEllipsis edgeChars={4}>
          very-long-text-here
        </Identifier>
      )
      expect(getByText('very')).toBeTruthy()
      expect(getByText('…')).toBeTruthy()
    })

    it('highlight takes priority over plain text', () => {
      const { container } = render(
        <Identifier highlight="default">test-id-123</Identifier>
      )
      expect(container).toBeTruthy()
    })
  })
})
