import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ThemeProvider } from '../../contexts/ThemeContext'
import { OverlaySelect } from './index'

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    {children}
  </ThemeProvider>
)

const basicOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true },
]

const optionsWithButtons = [
  {
    value: 'wallet1',
    label: 'Main Wallet',
    buttons: [
      { label: 'Edit', onClick: vi.fn() },
      { label: 'Delete', onClick: vi.fn(), variant: 'danger' as const }
    ]
  },
  {
    value: 'wallet2',
    label: 'Savings Wallet',
    buttons: [
      { label: 'Edit', onClick: vi.fn() },
      { label: 'Delete', onClick: vi.fn(), variant: 'danger' as const }
    ]
  },
]

describe('OverlaySelect', () => {
  it('renders with placeholder', () => {
    render(
      <Wrapper>
        <OverlaySelect
          options={basicOptions}
          placeholder='Select an option...'
        />
      </Wrapper>
    )

    expect(screen.getByText('Select an option...')).toBeInTheDocument()
  })

  it('renders with overlay label when provided', async () => {
    const user = userEvent.setup()
    
    render(
      <Wrapper>
        <OverlaySelect
          options={basicOptions}
          placeholder='Select an option...'
          overlayLabel='Your wallet'
        />
      </Wrapper>
    )

    const trigger = screen.getByRole('button')
    await user.click(trigger)

    expect(screen.getByText('Your wallet')).toBeInTheDocument()
  })

  it('opens and closes dropdown on click', async () => {
    const user = userEvent.setup()
    
    render(
      <Wrapper>
        <OverlaySelect
          options={basicOptions}
          placeholder='Select an option...'
        />
      </Wrapper>
    )

    const trigger = screen.getByRole('button')
    
    // Open dropdown
    await user.click(trigger)
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    
    // Close dropdown by clicking trigger again
    await user.click(trigger)
    await waitFor(() => {
      expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
    })
  })

  it('closes dropdown when clicking backdrop', async () => {
    const user = userEvent.setup()
    
    render(
      <Wrapper>
        <OverlaySelect
          options={basicOptions}
          placeholder='Select an option...'
        />
      </Wrapper>
    )

    const trigger = screen.getByRole('button')
    await user.click(trigger)
    
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    
    // Click backdrop (fixed inset-0 div)
    const backdrop = document.querySelector('.fixed.inset-0')
    expect(backdrop).toBeInTheDocument()
    
    fireEvent.click(backdrop!)
    
    await waitFor(() => {
      expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
    })
  })

  it('selects option when clicked', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    
    render(
      <Wrapper>
        <OverlaySelect
          options={basicOptions}
          placeholder='Select an option...'
          onValueChange={onValueChange}
        />
      </Wrapper>
    )

    const trigger = screen.getByRole('button')
    await user.click(trigger)
    
    const option = screen.getByText('Option 2')
    await user.click(option)
    
    expect(onValueChange).toHaveBeenCalledWith('option2')
  })

  it('displays selected value', () => {
    render(
      <Wrapper>
        <OverlaySelect
          options={basicOptions}
          value='option2'
        />
      </Wrapper>
    )

    expect(screen.getByText('Option 2')).toBeInTheDocument()
  })

  it('renders disabled state correctly', () => {
    render(
      <Wrapper>
        <OverlaySelect
          options={basicOptions}
          disabled={true}
          placeholder='Select an option...'
        />
      </Wrapper>
    )

    const trigger = screen.getByRole('button')
    expect(trigger).toBeDisabled()
  })

  it('renders add button when showAddButton is true', async () => {
    const user = userEvent.setup()
    const onAddClick = vi.fn()
    
    render(
      <Wrapper>
        <OverlaySelect
          options={basicOptions}
          placeholder='Select an option...'
          showAddButton={true}
          addButtonLabel='Add new item'
          onAddClick={onAddClick}
        />
      </Wrapper>
    )

    const trigger = screen.getByRole('button')
    await user.click(trigger)
    
    const addButton = screen.getByText('Add new item')
    expect(addButton).toBeInTheDocument()
    
    await user.click(addButton)
    expect(onAddClick).toHaveBeenCalled()
  })

  it('renders option buttons and handles clicks', async () => {
    const user = userEvent.setup()
    const editHandler = vi.fn()
    const deleteHandler = vi.fn()
    
    const optionsWithHandlers = [
      {
        value: 'wallet1',
        label: 'Main Wallet',
        buttons: [
          { label: 'Edit', onClick: editHandler },
          { label: 'Delete', onClick: deleteHandler, variant: 'danger' as const }
        ]
      }
    ]
    
    render(
      <Wrapper>
        <OverlaySelect
          options={optionsWithHandlers}
          placeholder='Select wallet...'
        />
      </Wrapper>
    )

    const trigger = screen.getByRole('button')
    await user.click(trigger)
    
    const editButton = screen.getByText('Edit')
    const deleteButton = screen.getByText('Delete')
    
    expect(editButton).toBeInTheDocument()
    expect(deleteButton).toBeInTheDocument()
    
    await user.click(editButton)
    expect(editHandler).toHaveBeenCalledWith('wallet1')
    
    await user.click(deleteButton)
    expect(deleteHandler).toHaveBeenCalledWith('wallet1')
  })

  it('prevents option selection when option is disabled', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    
    render(
      <Wrapper>
        <OverlaySelect
          options={basicOptions}
          placeholder='Select an option...'
          onValueChange={onValueChange}
        />
      </Wrapper>
    )

    const trigger = screen.getByRole('button')
    await user.click(trigger)
    
    const disabledOption = screen.getByText('Option 4')
    await user.click(disabledOption)
    
    // Should not call onValueChange for disabled option
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('renders with custom content in options', async () => {
    const user = userEvent.setup()
    const optionsWithContent = [
      {
        value: 'user1',
        label: 'John Doe',
        content: (
          <div data-testid='custom-content'>
            <div>John Doe</div>
            <div>john@example.com</div>
          </div>
        )
      }
    ]
    
    render(
      <Wrapper>
        <OverlaySelect
          options={optionsWithContent}
          placeholder='Select user...'
        />
      </Wrapper>
    )

    const trigger = screen.getByRole('button')
    await user.click(trigger)
    
    expect(screen.getByTestId('custom-content')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('applies correct color schemes', () => {
    const { rerender } = render(
      <Wrapper>
        <OverlaySelect
          options={basicOptions}
          colorScheme='brand'
          placeholder='Select an option...'
        />
      </Wrapper>
    )

    let trigger = screen.getByRole('button')
    expect(trigger).toHaveClass('focus:ring-dash-brand/20')

    rerender(
      <Wrapper>
        <OverlaySelect
          options={basicOptions}
          error={true}
          placeholder='Select an option...'
        />
      </Wrapper>
    )

    trigger = screen.getByRole('button')
    expect(trigger).toHaveClass('focus:ring-red-500/20')
  })

  it('applies correct sizes', () => {
    const { rerender } = render(
      <Wrapper>
        <OverlaySelect
          options={basicOptions}
          size='sm'
          placeholder='Select an option...'
        />
      </Wrapper>
    )

    let trigger = screen.getByRole('button')
    expect(trigger).toHaveClass('dash-block-sm')

    rerender(
      <Wrapper>
        <OverlaySelect
          options={basicOptions}
          size='xl'
          placeholder='Select an option...'
        />
      </Wrapper>
    )

    trigger = screen.getByRole('button')
    expect(trigger).toHaveClass('dash-block-xl')
  })

  it('hides arrow when showArrow is false', () => {
    render(
      <Wrapper>
        <OverlaySelect
          options={basicOptions}
          showArrow={false}
          placeholder='Select an option...'
        />
      </Wrapper>
    )

    const trigger = screen.getByRole('button')
    const svg = trigger.querySelector('svg')
    expect(svg).not.toBeInTheDocument()
  })

  it('rotates arrow when dropdown is open', async () => {
    const user = userEvent.setup()
    
    render(
      <Wrapper>
        <OverlaySelect
          options={basicOptions}
          placeholder='Select an option...'
        />
      </Wrapper>
    )

    const trigger = screen.getByRole('button')
    const arrow = trigger.querySelector('svg')
    
    expect(arrow).not.toHaveClass('rotate-180')
    
    await user.click(trigger)
    
    expect(arrow).toHaveClass('rotate-180')
  })
})
