import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
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

  it('calls Clipboard.setString with text when pressed', async () => {
    const testText = 'Hello, World!'
    const { getByLabelText } = render(<CopyButton text={testText} />)
    const button = getByLabelText('Copy to clipboard')
    fireEvent.press(button)
    await waitFor(() => expect(mockSetString).toHaveBeenCalledWith(testText))
  })

  it('calls onCopy callback when pressed', async () => {
    const mockOnCopy = vi.fn()
    const { getByLabelText } = render(
      <CopyButton text="test" onCopy={mockOnCopy} />
    )
    fireEvent.press(getByLabelText('Copy to clipboard'))
    await waitFor(() => expect(mockOnCopy).toHaveBeenCalledWith(true))
  })

  it('shows Copied! text after press', async () => {
    const { getByLabelText, findByText } = render(<CopyButton text="test" />)
    fireEvent.press(getByLabelText('Copy to clipboard'))
    expect(await findByText('Copied!')).toBeTruthy()
  })

  it('shows failure text and reports it when the clipboard write throws', async () => {
    const mockOnCopy = vi.fn()
    mockSetString.mockImplementationOnce(() => {
      throw new Error('clipboard unavailable')
    })

    const { getByLabelText, findByText } = render(
      <CopyButton text="test" onCopy={mockOnCopy} />
    )
    fireEvent.press(getByLabelText('Copy to clipboard'))

    expect(await findByText('Copy failed')).toBeTruthy()
    expect(mockOnCopy).toHaveBeenCalledWith(false)
  })

  it('uses custom feedback labels when provided', async () => {
    const { getByLabelText, findByText } = render(
      <CopyButton text="test" copiedLabel="Saved" />
    )
    fireEvent.press(getByLabelText('Copy to clipboard'))
    expect(await findByText('Saved')).toBeTruthy()
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
