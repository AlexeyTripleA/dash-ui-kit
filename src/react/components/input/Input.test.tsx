import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './index'
import { ThemeProvider } from '../../contexts/ThemeContext'

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  )
}

describe('Input', () => {
  it('renders with placeholder text', () => {
    renderWithTheme(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('accepts user input', async () => {
    const user = userEvent.setup()
    renderWithTheme(<Input placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    await user.type(input, 'Hello World')
    
    expect(input).toHaveValue('Hello World')
  })

  it('calls onChange when value changes', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    renderWithTheme(<Input placeholder="Enter text" onChange={onChange} />)
    
    const input = screen.getByPlaceholderText('Enter text')
    await user.type(input, 'test')
    
    expect(onChange).toHaveBeenCalled()
  })

  it('does not accept input when disabled', async () => {
    const user = userEvent.setup()
    renderWithTheme(<Input placeholder="Enter text" disabled />)
    
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeDisabled()
    
    await user.type(input, 'test')
    expect(input).toHaveValue('')
  })

  it('applies error styles when error prop is true', () => {
    renderWithTheme(<Input placeholder="Enter text" error />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toHaveClass('focus:ring-red-500/20')
  })

  it('applies success styles when success prop is true', () => {
    renderWithTheme(<Input placeholder="Enter text" success />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toHaveClass('focus:ring-green-500/20')
  })

  it('applies custom className', () => {
    renderWithTheme(<Input placeholder="Enter text" className="custom-class" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toHaveClass('custom-class')
  })

  describe('Prefix functionality', () => {
    it('renders with string prefix', () => {
      renderWithTheme(<Input prefix="https://" placeholder="Enter URL" />)
      
      expect(screen.getByText('https://')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Enter URL')).toBeInTheDocument()
    })

    it('renders with React element prefix', () => {
      const prefix = <span data-testid="custom-prefix">$</span>
      renderWithTheme(<Input prefix={prefix} placeholder="Enter amount" />)
      
      expect(screen.getByTestId('custom-prefix')).toBeInTheDocument()
      expect(screen.getByText('$')).toBeInTheDocument()
    })

    it('applies correct padding when prefix is present', () => {
      renderWithTheme(<Input prefix="https://" placeholder="Enter URL" />)
      const input = screen.getByPlaceholderText('Enter URL')
      
      // Should have left padding to accommodate prefix
      expect(input.className).toMatch(/pl-\[/)
    })

    it('positions prefix correctly inside input', () => {
      renderWithTheme(<Input prefix="https://" placeholder="Enter URL" />)
      const prefix = screen.getByText('https://')
      
      expect(prefix).toHaveClass('absolute', 'left-4', 'top-1/2', '-translate-y-1/2')
      expect(prefix).toHaveClass('pointer-events-none', 'select-none')
    })

    it('works with password input and prefix', async () => {
      const user = userEvent.setup()
      renderWithTheme(<Input type="password" prefix="PIN:" placeholder="Enter PIN" />)
      
      const prefix = screen.getByText('PIN:')
      const input = screen.getByPlaceholderText('Enter PIN')
      const toggleButton = screen.getByRole('button')
      
      expect(prefix).toBeInTheDocument()
      expect(input).toHaveAttribute('type', 'password')
      expect(toggleButton).toBeInTheDocument()
      
      // Should have both left padding for prefix and right padding for icon
      expect(input.className).toMatch(/pl-\[/)
      expect(input.className).toMatch(/pr-12/)
      
      // Toggle should still work
      await user.click(toggleButton)
      expect(input).toHaveAttribute('type', 'text')
    })

    it('accepts user input with prefix present', async () => {
      const user = userEvent.setup()
      renderWithTheme(<Input prefix="https://" placeholder="Enter URL" />)
      
      const input = screen.getByPlaceholderText('Enter URL')
      await user.type(input, 'example.com')
      
      expect(input).toHaveValue('example.com')
      expect(screen.getByText('https://')).toBeInTheDocument()
    })

    it('does not interfere with form submission', () => {
      const onSubmit = vi.fn()
      render(
        <ThemeProvider>
          <form onSubmit={onSubmit}>
            <Input prefix="https://" name="url" defaultValue="example.com" />
            <button type="submit">Submit</button>
          </form>
        </ThemeProvider>
      )
      
      const form = screen.getByRole('form')
      fireEvent.submit(form)
      
      // Form should submit with actual input value, not prefix
      expect(onSubmit).toHaveBeenCalled()
    })

    it('works with different color schemes and prefix', () => {
      renderWithTheme(<Input prefix="$" colorScheme="brand" placeholder="Amount" />)
      
      const input = screen.getByPlaceholderText('Amount')
      expect(input).toHaveClass('focus:ring-dash-brand/20')
      expect(screen.getByText('$')).toBeInTheDocument()
    })

    it('works with error state and prefix', () => {
      renderWithTheme(<Input prefix="@" error placeholder="Username" />)
      
      const input = screen.getByPlaceholderText('Username')
      expect(input).toHaveClass('focus:ring-red-500/20')
      expect(screen.getByText('@')).toBeInTheDocument()
    })
  })

  describe('Password input', () => {
    it('renders password type input with eye icon', () => {
      renderWithTheme(<Input type="password" placeholder="Enter password" />)
      
      const input = screen.getByPlaceholderText('Enter password')
      expect(input).toHaveAttribute('type', 'password')
      
      // Eye icon button should be present
      const toggleButton = screen.getByRole('button')
      expect(toggleButton).toBeInTheDocument()
    })

    it('toggles password visibility when eye icon is clicked', async () => {
      const user = userEvent.setup()
      renderWithTheme(<Input type="password" placeholder="Enter password" />)
      
      const input = screen.getByPlaceholderText('Enter password')
      const toggleButton = screen.getByRole('button')
      
      // Initially should be password type
      expect(input).toHaveAttribute('type', 'password')
      
      // Click to show password
      await user.click(toggleButton)
      expect(input).toHaveAttribute('type', 'text')
      
      // Click to hide password again
      await user.click(toggleButton)
      expect(input).toHaveAttribute('type', 'password')
    })

    it('maintains password value during visibility toggle', async () => {
      const user = userEvent.setup()
      renderWithTheme(<Input type="password" placeholder="Enter password" />)
      
      const input = screen.getByPlaceholderText('Enter password')
      const toggleButton = screen.getByRole('button')
      
      // Type password
      await user.type(input, 'secret123')
      expect(input).toHaveValue('secret123')
      
      // Toggle visibility
      await user.click(toggleButton)
      expect(input).toHaveValue('secret123')
      expect(input).toHaveAttribute('type', 'text')
      
      // Toggle back
      await user.click(toggleButton)
      expect(input).toHaveValue('secret123')
      expect(input).toHaveAttribute('type', 'password')
    })

    it('has correct padding for password input to accommodate icon', () => {
      renderWithTheme(<Input type="password" placeholder="Enter password" />)
      const input = screen.getByPlaceholderText('Enter password')
      expect(input).toHaveClass('pr-12')
    })
  })

  describe('Size variants', () => {
    it('applies small size classes', () => {
      renderWithTheme(<Input size="sm" placeholder="Small input" />)
      const input = screen.getByPlaceholderText('Small input')
      expect(input).toHaveClass('dash-block-sm')
    })

    it('applies medium size classes', () => {
      renderWithTheme(<Input size="md" placeholder="Medium input" />)
      const input = screen.getByPlaceholderText('Medium input')
      expect(input).toHaveClass('dash-block-md')
    })

    it('applies extra large size classes', () => {
      renderWithTheme(<Input size="xl" placeholder="XL input" />)
      const input = screen.getByPlaceholderText('XL input')
      expect(input).toHaveClass('dash-block-xl')
    })
  })

  describe('Color schemes', () => {
    it('applies brand color scheme', () => {
      renderWithTheme(<Input colorScheme="brand" placeholder="Brand input" />)
      const input = screen.getByPlaceholderText('Brand input')
      expect(input).toHaveClass('focus:ring-dash-brand/20')
    })

    it('applies default color scheme', () => {
      renderWithTheme(<Input colorScheme="default" placeholder="Default input" />)
      const input = screen.getByPlaceholderText('Default input')
      expect(input).toHaveClass('focus:ring-blue-500/20')
    })
  })

  describe('Different input types', () => {
    it('renders email input correctly', () => {
      renderWithTheme(<Input type="email" placeholder="Enter email" />)
      const input = screen.getByPlaceholderText('Enter email')
      expect(input).toHaveAttribute('type', 'email')
    })

    it('renders number input correctly', () => {
      renderWithTheme(<Input type="number" placeholder="Enter number" />)
      const input = screen.getByPlaceholderText('Enter number')
      expect(input).toHaveAttribute('type', 'number')
    })

    it('renders tel input correctly', () => {
      renderWithTheme(<Input type="tel" placeholder="Enter phone" />)
      const input = screen.getByPlaceholderText('Enter phone')
      expect(input).toHaveAttribute('type', 'tel')
    })
  })
}) 