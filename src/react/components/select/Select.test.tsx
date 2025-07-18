import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '../../contexts/ThemeContext'
import { Select } from './index'

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    {children}
  </ThemeProvider>
)

const testOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
]

describe('Select', () => {
  it('renders with placeholder', () => {
    render(
      <Wrapper>
        <Select placeholder="Choose option" options={testOptions} />
      </Wrapper>
    )
    expect(screen.getByText('Choose option')).toBeInTheDocument()
  })

  it('opens dropdown when clicked', async () => {
    const user = userEvent.setup()
    render(
      <Wrapper>
        <Select options={testOptions} />
      </Wrapper>
    )
    
    const trigger = screen.getByRole('combobox')
    await user.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument()
      expect(screen.getByText('Option 2')).toBeInTheDocument()
    })
  })

  it('calls onValueChange when option is selected', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    
    render(
      <Wrapper>
        <Select options={testOptions} onValueChange={onValueChange} />
      </Wrapper>
    )
    
    const trigger = screen.getByRole('combobox')
    await user.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })
    
    await user.click(screen.getByText('Option 1'))
    
    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith('option1')
    })
  })

  it('renders with HTML content in options', async () => {
    const user = userEvent.setup()
    const htmlOptions = [
      {
        value: 'html1',
        label: 'HTML Option',
        content: (
          <div>
            <strong>Bold Text</strong>
            <em>Italic Text</em>
          </div>
        )
      }
    ]
    
    render(
      <Wrapper>
        <Select options={htmlOptions} />
      </Wrapper>
    )
    
    const trigger = screen.getByRole('combobox')
    await user.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Bold Text')).toBeInTheDocument()
      expect(screen.getByText('Italic Text')).toBeInTheDocument()
    })
  })

  it('does not allow selection of disabled options', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    
    render(
      <Wrapper>
        <Select options={testOptions} onValueChange={onValueChange} />
      </Wrapper>
    )
    
    const trigger = screen.getByRole('combobox')
    await user.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Option 3')).toBeInTheDocument()
    })
    
    // Try to click disabled option - should not trigger callback
    const disabledOption = screen.getByText('Option 3')
    await user.click(disabledOption)
    
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('respects disabled prop on entire select', () => {
    render(
      <Wrapper>
        <Select options={testOptions} disabled />
      </Wrapper>
    )
    
    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeDisabled()
  })

  it('renders with controlled value', () => {
    render(
      <Wrapper>
        <Select options={testOptions} value="option2" />
      </Wrapper>
    )
    
    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveAttribute('data-state', 'closed')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('hides arrow when showArrow is false', () => {
    const { container } = render(
      <Wrapper>
        <Select options={testOptions} showArrow={false} />
      </Wrapper>
    )
    
    const icon = container.querySelector('svg')
    expect(icon).not.toBeInTheDocument()
  })

  it('applies error styling when error prop is true', () => {
    render(
      <Wrapper>
        <Select options={testOptions} error />
      </Wrapper>
    )
    
    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveClass('focus:ring-red-500/20')
  })

  it('applies success styling when success prop is true', () => {
    render(
      <Wrapper>
        <Select options={testOptions} success />
      </Wrapper>
    )
    
    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveClass('focus:ring-green-500/20')
  })
}) 