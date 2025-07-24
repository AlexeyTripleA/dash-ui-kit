import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Textarea } from './index'
import { ThemeProvider } from '../../contexts/ThemeContext'

// Mock clipboard API
const mockClipboard = {
  readText: vi.fn()
}
Object.assign(navigator, {
  clipboard: mockClipboard
})

const renderWithTheme = (component: React.ReactElement, theme: 'light' | 'dark' = 'light') => {
  return render(
    <ThemeProvider initialTheme={theme}>
      {component}
    </ThemeProvider>
  )
}

describe('Textarea', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders correctly with default props', () => {
      renderWithTheme(<Textarea />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeInTheDocument()
    })

    it('renders with placeholder text', () => {
      const placeholder = 'Enter your message'
      renderWithTheme(<Textarea placeholder={placeholder} />)
      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
    })

    it('renders with default value', () => {
      const defaultValue = 'Initial text'
      renderWithTheme(<Textarea defaultValue={defaultValue} />)
      expect(screen.getByDisplayValue(defaultValue)).toBeInTheDocument()
    })

    it('renders with specified number of rows', () => {
      renderWithTheme(<Textarea rows={5} />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveAttribute('rows', '5')
    })
  })

  describe('User Interactions', () => {
    it('handles text input correctly', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      renderWithTheme(<Textarea onChange={onChange} />)
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Hello world')
      
      expect(onChange).toHaveBeenCalledWith('Hello world')
      expect(textarea).toHaveValue('Hello world')
    })

    it('calls onChange with updated value', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      renderWithTheme(<Textarea onChange={onChange} />)
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Test')
      
      expect(onChange).toHaveBeenLastCalledWith('Test')
    })
  })

  describe('Paste Button', () => {
    it('shows paste button when showPasteButton is true and no value', () => {
      renderWithTheme(<Textarea showPasteButton={true} />)
      expect(screen.getByText('PASTE')).toBeInTheDocument()
    })

    it('hides paste button when showPasteButton is false', () => {
      renderWithTheme(<Textarea showPasteButton={false} />)
      expect(screen.queryByText('PASTE')).not.toBeInTheDocument()
    })

    it('hides paste button when textarea has value', () => {
      renderWithTheme(<Textarea defaultValue='Some text' />)
      expect(screen.queryByText('PASTE')).not.toBeInTheDocument()
    })

    it('hides paste button when disabled', () => {
      renderWithTheme(<Textarea disabled={true} />)
      expect(screen.queryByText('PASTE')).not.toBeInTheDocument()
    })

    it('handles paste functionality', async () => {
      const onChange = vi.fn()
      const clipboardText = 'Pasted content'
      mockClipboard.readText.mockResolvedValue(clipboardText)
      
      renderWithTheme(<Textarea onChange={onChange} />)
      
      const pasteButton = screen.getByText('PASTE')
      fireEvent.click(pasteButton)
      
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(clipboardText)
      })
    })

    it('handles paste error gracefully', async () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
      mockClipboard.readText.mockRejectedValue(new Error('Clipboard error'))
      
      renderWithTheme(<Textarea />)
      
      const pasteButton = screen.getByText('PASTE')
      fireEvent.click(pasteButton)
      
      await waitFor(() => {
        expect(consoleError).toHaveBeenCalledWith('Failed to read clipboard contents: ', expect.any(Error))
      })
      
      consoleError.mockRestore()
    })
  })

  describe('Validation', () => {
    it('handles boolean validator', async () => {
      const user = userEvent.setup()
      renderWithTheme(<Textarea validator={true} />)
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'test')
      
      // Component should have valid state (no visual indication in basic implementation)
      expect(textarea).toHaveValue('test')
    })

    it('handles function validator', async () => {
      const user = userEvent.setup()
      const validator = vi.fn((value: string) => value.length > 5)
      renderWithTheme(<Textarea validator={validator} />)
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'short')
      
      expect(validator).toHaveBeenCalledWith('short')
      
      await user.clear(textarea)
      await user.type(textarea, 'longer text')
      
      expect(validator).toHaveBeenCalledWith('longer text')
    })
  })

  describe('States', () => {
    it('renders in disabled state', () => {
      renderWithTheme(<Textarea disabled={true} />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeDisabled()
    })

    it('applies error state styling', () => {
      renderWithTheme(<Textarea error={true} />)
      const container = screen.getByRole('textbox').parentElement
      expect(container).toHaveClass('outline-red-500')
    })

    it('applies success state styling', () => {
      renderWithTheme(<Textarea success={true} />)
      const container = screen.getByRole('textbox').parentElement
      expect(container).toHaveClass('outline-green-500')
    })
  })

  describe('Variants and Sizes', () => {
    it('applies small size styling', () => {
      renderWithTheme(<Textarea size='sm' />)
      const container = screen.getByRole('textbox').parentElement
      expect(container).toHaveClass('dash-block-sm')
    })

    it('applies medium size styling', () => {
      renderWithTheme(<Textarea size='md' />)
      const container = screen.getByRole('textbox').parentElement
      expect(container).toHaveClass('dash-block-md')
    })

    it('applies extra large size styling', () => {
      renderWithTheme(<Textarea size='xl' />)
      const container = screen.getByRole('textbox').parentElement
      expect(container).toHaveClass('dash-block-xl')
    })

    it('applies brand color scheme', () => {
      renderWithTheme(<Textarea colorScheme='brand' />)
      const container = screen.getByRole('textbox').parentElement
      expect(container).toHaveClass('outline-dash-brand/30')
    })
  })

  describe('Font Variants', () => {
    it('applies main font class', () => {
      renderWithTheme(<Textarea font='main' />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveClass('font-dash-main')
    })

    it('applies grotesque font class', () => {
      renderWithTheme(<Textarea font='grotesque' />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveClass('font-dash-grotesque')
    })
  })

  describe('Font Weight Variants', () => {
    it('applies light weight class', () => {
      renderWithTheme(<Textarea weight='light' />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveClass('font-light')
    })

    it('applies normal weight class', () => {
      renderWithTheme(<Textarea weight='normal' />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveClass('font-normal')
    })

    it('applies medium weight class', () => {
      renderWithTheme(<Textarea weight='medium' />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveClass('font-medium')
    })

    it('applies semibold weight class', () => {
      renderWithTheme(<Textarea weight='semibold' />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveClass('font-semibold')
    })

    it('applies bold weight class', () => {
      renderWithTheme(<Textarea weight='bold' />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveClass('font-bold')
    })
  })

  describe('Theme Support', () => {
    it('applies light theme styling', () => {
      renderWithTheme(<Textarea />, 'light')
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveClass('text-[#111111]')
    })

    it('applies dark theme styling', () => {
      renderWithTheme(<Textarea />, 'dark')
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveClass('text-white')
    })
  })

  describe('Accessibility', () => {
    it('maintains focus on textarea after paste', async () => {
      mockClipboard.readText.mockResolvedValue('pasted text')
      renderWithTheme(<Textarea />)
      
      const textarea = screen.getByRole('textbox')
      const pasteButton = screen.getByText('PASTE')
      
      textarea.focus()
      fireEvent.click(pasteButton)
      
      await waitFor(() => {
        expect(textarea).toHaveValue('pasted text')
      })
    })

    it('supports custom className', () => {
      const customClass = 'custom-textarea-class'
      renderWithTheme(<Textarea className={customClass} />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveClass(customClass)
    })
  })
}) 