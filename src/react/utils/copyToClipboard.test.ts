import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { copyToClipboard, CopyResult, CopyCallback } from './copyToClipboard'

// Mock navigator.clipboard
const mockWriteText = vi.fn()
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText
  }
})

describe('copyToClipboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should copy text to clipboard successfully and call callback with success result', async () => {
    const testText = 'Hello, World!'
    const mockCallback = vi.fn()
    
    mockWriteText.mockResolvedValueOnce(undefined)
    
    copyToClipboard(testText, mockCallback)
    
    // Wait for promise to resolve
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(mockWriteText).toHaveBeenCalledWith(testText)
    expect(mockCallback).toHaveBeenCalledWith({ status: true })
  })

  it('should handle clipboard write failure and call callback with error result', async () => {
    const testText = 'Hello, World!'
    const mockCallback = vi.fn()
    const testError = new Error('Clipboard access denied')
    
    mockWriteText.mockRejectedValueOnce(testError)
    
    copyToClipboard(testText, mockCallback)
    
    // Wait for promise to reject
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(mockWriteText).toHaveBeenCalledWith(testText)
    expect(mockCallback).toHaveBeenCalledWith({ 
      status: false, 
      message: testError 
    })
  })

  it('should work with default empty string when no text provided', async () => {
    const mockCallback = vi.fn()
    
    mockWriteText.mockResolvedValueOnce(undefined)
    
    copyToClipboard(undefined, mockCallback)
    
    // Wait for promise to resolve
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(mockWriteText).toHaveBeenCalledWith('')
    expect(mockCallback).toHaveBeenCalledWith({ status: true })
  })

  it('should work without callback', async () => {
    const testText = 'Hello, World!'
    
    mockWriteText.mockResolvedValueOnce(undefined)
    
    // Should not throw when no callback provided
    expect(() => copyToClipboard(testText)).not.toThrow()
    
    // Wait for promise to resolve
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(mockWriteText).toHaveBeenCalledWith(testText)
  })

  it('should handle error without callback', async () => {
    const testText = 'Hello, World!'
    const testError = new Error('Clipboard access denied')
    
    mockWriteText.mockRejectedValueOnce(testError)
    
    // Should not throw when no callback provided and error occurs
    expect(() => copyToClipboard(testText)).not.toThrow()
    
    // Wait for promise to reject
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(mockWriteText).toHaveBeenCalledWith(testText)
  })

  it('should use empty string as default for copyText parameter', async () => {
    const mockCallback = vi.fn()
    
    mockWriteText.mockResolvedValueOnce(undefined)
    
    copyToClipboard(undefined, mockCallback)
    
    // Wait for promise to resolve
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(mockWriteText).toHaveBeenCalledWith('')
  })

  it('should handle various error types in callback', async () => {
    const testText = 'Hello, World!'
    const mockCallback = vi.fn()
    
    // Test with string error
    mockWriteText.mockRejectedValueOnce('String error')
    copyToClipboard(testText, mockCallback)
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(mockCallback).toHaveBeenCalledWith({ 
      status: false, 
      message: 'String error' 
    })
    
    // Test with object error
    mockCallback.mockClear()
    const objectError = { code: 'ACCESS_DENIED', message: 'Access denied' }
    mockWriteText.mockRejectedValueOnce(objectError)
    copyToClipboard(testText, mockCallback)
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(mockCallback).toHaveBeenCalledWith({ 
      status: false, 
      message: objectError 
    })
  })
}) 