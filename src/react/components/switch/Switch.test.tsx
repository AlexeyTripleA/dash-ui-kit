import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ThemeProvider } from '../../contexts/ThemeContext'
import Switch, { SwitchOption } from './index'

const MockThemeProvider = ({ children, theme = 'light' }: { children: React.ReactNode, theme?: 'light' | 'dark' }) => (
  <ThemeProvider initialTheme={theme}>
    {children}
  </ThemeProvider>
)

const defaultOptions: SwitchOption[] = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' }
]

describe('Switch', () => {
  it('renders all options', () => {
    const onChange = vi.fn()
    render(
      <MockThemeProvider>
        <Switch
          options={defaultOptions}
          value="opt1"
          onChange={onChange}
        />
      </MockThemeProvider>
    )

    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.getByText('Option 3')).toBeInTheDocument()
  })

  it('highlights the selected option', () => {
    const onChange = vi.fn()
    render(
      <MockThemeProvider>
        <Switch
          options={defaultOptions}
          value="opt2"
          onChange={onChange}
        />
      </MockThemeProvider>
    )

    const selectedButton = screen.getByText('Option 2')
    expect(selectedButton).toHaveClass('bg-dash-brand')
    expect(selectedButton).toHaveClass('text-white')
  })

  it('calls onChange when an option is clicked', () => {
    const onChange = vi.fn()
    render(
      <MockThemeProvider>
        <Switch
          options={defaultOptions}
          value="opt1"
          onChange={onChange}
        />
      </MockThemeProvider>
    )

    fireEvent.click(screen.getByText('Option 2'))
    expect(onChange).toHaveBeenCalledWith('opt2')
  })

  it('does not call onChange when disabled', () => {
    const onChange = vi.fn()
    render(
      <MockThemeProvider>
        <Switch
          options={defaultOptions}
          value="opt1"
          onChange={onChange}
          disabled
        />
      </MockThemeProvider>
    )

    fireEvent.click(screen.getByText('Option 2'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('applies disabled styles when disabled', () => {
    const onChange = vi.fn()
    const { container } = render(
      <MockThemeProvider>
        <Switch
          options={defaultOptions}
          value="opt1"
          onChange={onChange}
          disabled
        />
      </MockThemeProvider>
    )

    const switchContainer = container.firstChild as HTMLElement
    expect(switchContainer).toHaveClass('opacity-60')
    expect(switchContainer).toHaveClass('cursor-not-allowed')
  })

  it('applies correct size classes', () => {
    const onChange = vi.fn()
    const { rerender, container } = render(
      <MockThemeProvider>
        <Switch
          options={defaultOptions}
          value="opt1"
          onChange={onChange}
          size="sm"
        />
      </MockThemeProvider>
    )

    let switchContainer = container.firstChild as HTMLElement
    expect(switchContainer).toHaveClass('p-1')
    expect(switchContainer).toHaveClass('rounded-xl')

    rerender(
      <MockThemeProvider>
        <Switch
          options={defaultOptions}
          value="opt1"
          onChange={onChange}
          size="xl"
        />
      </MockThemeProvider>
    )

    switchContainer = container.firstChild as HTMLElement
    expect(switchContainer).toHaveClass('p-3')
    expect(switchContainer).toHaveClass('rounded-3xl')
  })

  it('works with numeric values', () => {
    const numericOptions: SwitchOption<number>[] = [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
      { label: 'Three', value: 3 }
    ]
    const onChange = vi.fn()

    render(
      <MockThemeProvider>
        <Switch
          options={numericOptions}
          value={1}
          onChange={onChange}
        />
      </MockThemeProvider>
    )

    fireEvent.click(screen.getByText('Two'))
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('applies custom className', () => {
    const onChange = vi.fn()
    const { container } = render(
      <MockThemeProvider>
        <Switch
          options={defaultOptions}
          value="opt1"
          onChange={onChange}
          className="custom-class"
        />
      </MockThemeProvider>
    )

    const switchContainer = container.firstChild as HTMLElement
    expect(switchContainer).toHaveClass('custom-class')
  })

  it('renders correctly in light theme', () => {
    const onChange = vi.fn()
    const { container } = render(
      <MockThemeProvider theme="light">
        <Switch
          options={defaultOptions}
          value="opt1"
          onChange={onChange}
        />
      </MockThemeProvider>
    )

    const switchContainer = container.firstChild as HTMLElement
    expect(switchContainer).toHaveClass('bg-white')
    expect(switchContainer).toHaveClass('border')
    expect(switchContainer).toHaveClass('border-gray-100')
    expect(switchContainer).not.toHaveClass('outline')
  })

  it('renders correctly in dark theme', () => {
    const onChange = vi.fn()
    const { container } = render(
      <MockThemeProvider theme="dark">
        <Switch
          options={defaultOptions}
          value="opt1"
          onChange={onChange}
        />
      </MockThemeProvider>
    )

    const switchContainer = container.firstChild as HTMLElement
    expect(switchContainer).toHaveClass('bg-dash-primary-dark-blue/10')
    expect(switchContainer).toHaveClass('outline')
    expect(switchContainer).toHaveClass('outline-white/15')
    expect(switchContainer).toHaveClass('shadow-dash-brand/10')
  })

  it('handles disabled individual options', () => {
    const optionsWithDisabled: SwitchOption[] = [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2', disabled: true },
      { label: 'Option 3', value: 'opt3' }
    ]
    const onChange = vi.fn()

    render(
      <MockThemeProvider>
        <Switch
          options={optionsWithDisabled}
          value="opt1"
          onChange={onChange}
        />
      </MockThemeProvider>
    )

    const disabledButton = screen.getByText('Option 2')
    expect(disabledButton).toHaveClass('cursor-not-allowed')
    expect(disabledButton).toHaveClass('opacity-50')
    expect(disabledButton).toBeDisabled()

    fireEvent.click(disabledButton)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('applies cursor pointer to active options', () => {
    const onChange = vi.fn()
    render(
      <MockThemeProvider>
        <Switch
          options={defaultOptions}
          value="opt1"
          onChange={onChange}
        />
      </MockThemeProvider>
    )

    const activeButton = screen.getByText('Option 1')
    expect(activeButton).toHaveClass('cursor-pointer')
  })

  it('handles combination of disabled switch and disabled option', () => {
    const optionsWithDisabled: SwitchOption[] = [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2', disabled: true },
      { label: 'Option 3', value: 'opt3' }
    ]
    const onChange = vi.fn()

    render(
      <MockThemeProvider>
        <Switch
          options={optionsWithDisabled}
          value="opt1"
          onChange={onChange}
          disabled
        />
      </MockThemeProvider>
    )

    // All buttons should be disabled
    const button1 = screen.getByText('Option 1')
    const button2 = screen.getByText('Option 2')
    const button3 = screen.getByText('Option 3')

    expect(button1).toBeDisabled()
    expect(button2).toBeDisabled()
    expect(button3).toBeDisabled()

    // No clicks should work
    fireEvent.click(button1)
    fireEvent.click(button2)
    fireEvent.click(button3)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('preserves whitespace-nowrap to prevent text wrapping', () => {
    const longOptions: SwitchOption[] = [
      { label: 'Very Long Option 1', value: 'long1' },
      { label: 'Very Long Option 2', value: 'long2' }
    ]
    const onChange = vi.fn()

    render(
      <MockThemeProvider>
        <Switch
          options={longOptions}
          value="long1"
          onChange={onChange}
        />
      </MockThemeProvider>
    )

    const button = screen.getByText('Very Long Option 1')
    expect(button).toHaveClass('whitespace-nowrap')
  })
}) 