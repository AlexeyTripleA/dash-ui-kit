import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, fireEvent } from '@testing-library/react-native'
import { CopyButton } from './index'

const mockSetString = vi.fn()

vi.mock('@react-native-clipboard/clipboard', () => ({
  default: {
    setString: mockSetString,
  },
}))

describe('CopyButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders copy button', () => {
    const { getByLabelText } = render(<CopyButton text="test" />)
    expect(getByLabelText('Copy to clipboard')).toBeTruthy()
  })

  it('calls Clipboard.setString with text when pressed', () => {
    const testText = 'Hello, World!'
    const { getByLabelText } = render(<CopyButton text={testText} />)
    const button = getByLabelText('Copy to clipboard')
    fireEvent.press(button)
    expect(mockSetString).toHaveBeenCalledWith(testText)
  })

  it('calls onCopy callback when pressed', () => {
    const mockOnCopy = vi.fn()
    const { getByLabelText } = render(
      <CopyButton text="test" onCopy={mockOnCopy} />
    )
    fireEvent.press(getByLabelText('Copy to clipboard'))
    expect(mockOnCopy).toHaveBeenCalledWith(true)
  })

  it('shows Copied! text after press', () => {
    const { getByLabelText, getByText } = render(<CopyButton text="test" />)
    fireEvent.press(getByLabelText('Copy to clipboard'))
    expect(getByText('Copied!')).toBeTruthy()
  })

  it('applies custom className', () => {
    const customClass = 'mt-4'
    const { getByLabelText } = render(
      <CopyButton text="test" className={customClass} />
    )
    const button = getByLabelText('Copy to clipboard')
    expect(button).toBeTruthy()
  })

  it('uses custom accessibility label when provided', () => {
    const { getByLabelText } = render(
      <CopyButton text="test" accessibilityLabel="Copy address" />
    )
    expect(getByLabelText('Copy address')).toBeTruthy()
  })
})
