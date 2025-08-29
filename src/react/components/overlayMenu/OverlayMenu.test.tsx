import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider } from '../../contexts/ThemeContext'
import { OverlayMenu } from './index'

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

const mockItems = [
  {
    id: 'item1',
    content: 'Item 1',
    onClick: jest.fn()
  },
  {
    id: 'item2',
    content: 'Item 2',
    onClick: jest.fn()
  },
  {
    id: 'item3',
    content: 'Item 3',
    onClick: jest.fn(),
    disabled: true
  }
]

describe('OverlayMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders with default props', () => {
    render(
      <TestWrapper>
        <OverlayMenu />
      </TestWrapper>
    )
    
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders with placeholder text', () => {
    render(
      <TestWrapper>
        <OverlayMenu placeholder="Custom placeholder" />
      </TestWrapper>
    )
    
    expect(screen.getByText('Custom placeholder')).toBeInTheDocument()
  })

  it('renders with custom trigger content', () => {
    render(
      <TestWrapper>
        <OverlayMenu 
          triggerContent={<span>Custom trigger</span>}
        />
      </TestWrapper>
    )
    
    expect(screen.getByText('Custom trigger')).toBeInTheDocument()
  })

  it('opens menu when trigger is clicked', async () => {
    render(
      <TestWrapper>
        <OverlayMenu 
          items={mockItems}
          overlayLabel="Test Menu"
        />
      </TestWrapper>
    )
    
    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Test Menu')).toBeInTheDocument()
      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
      expect(screen.getByText('Item 3')).toBeInTheDocument()
    })
  })

  it('calls onClick when menu item is clicked', async () => {
    render(
      <TestWrapper>
        <OverlayMenu items={mockItems} />
      </TestWrapper>
    )
    
    // Open menu
    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument()
    })
    
    // Click menu item
    fireEvent.click(screen.getByText('Item 1'))
    
    expect(mockItems[0].onClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick for disabled items', async () => {
    render(
      <TestWrapper>
        <OverlayMenu items={mockItems} />
      </TestWrapper>
    )
    
    // Open menu
    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Item 3')).toBeInTheDocument()
    })
    
    // Click disabled item
    fireEvent.click(screen.getByText('Item 3'))
    
    expect(mockItems[2].onClick).not.toHaveBeenCalled()
  })

  it('closes menu when backdrop is clicked', async () => {
    render(
      <TestWrapper>
        <OverlayMenu 
          items={mockItems}
          overlayLabel="Test Menu"
        />
      </TestWrapper>
    )
    
    // Open menu
    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Test Menu')).toBeInTheDocument()
    })
    
    // Click backdrop
    const backdrop = document.querySelector('.fixed.inset-0')
    expect(backdrop).toBeInTheDocument()
    fireEvent.click(backdrop!)
    
    await waitFor(() => {
      expect(screen.queryByText('Test Menu')).not.toBeInTheDocument()
    })
  })

  it('closes menu after item click', async () => {
    render(
      <TestWrapper>
        <OverlayMenu 
          items={mockItems}
          overlayLabel="Test Menu"
        />
      </TestWrapper>
    )
    
    // Open menu
    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Test Menu')).toBeInTheDocument()
    })
    
    // Click menu item
    fireEvent.click(screen.getByText('Item 1'))
    
    await waitFor(() => {
      expect(screen.queryByText('Test Menu')).not.toBeInTheDocument()
    })
  })

  it('applies different sizes correctly', () => {
    const { rerender } = render(
      <TestWrapper>
        <OverlayMenu size="sm" />
      </TestWrapper>
    )
    
    let trigger = screen.getByRole('button')
    expect(trigger).toHaveClass('dash-block-sm')
    
    rerender(
      <TestWrapper>
        <OverlayMenu size="md" />
      </TestWrapper>
    )
    
    trigger = screen.getByRole('button')
    expect(trigger).toHaveClass('dash-block-md')
    
    rerender(
      <TestWrapper>
        <OverlayMenu size="xl" />
      </TestWrapper>
    )
    
    trigger = screen.getByRole('button')
    expect(trigger).toHaveClass('dash-block-xl')
  })

  it('applies different color schemes correctly', () => {
    const { rerender } = render(
      <TestWrapper>
        <OverlayMenu colorScheme="brand" border />
      </TestWrapper>
    )
    
    let trigger = screen.getByRole('button')
    expect(trigger).toHaveClass('outline-dash-brand/30')
    
    rerender(
      <TestWrapper>
        <OverlayMenu colorScheme="error" border />
      </TestWrapper>
    )
    
    trigger = screen.getByRole('button')
    expect(trigger).toHaveClass('outline-red-500')
    
    rerender(
      <TestWrapper>
        <OverlayMenu colorScheme="success" border />
      </TestWrapper>
    )
    
    trigger = screen.getByRole('button')
    expect(trigger).toHaveClass('outline-green-500')
  })

  it('handles error state correctly', () => {
    render(
      <TestWrapper>
        <OverlayMenu error border />
      </TestWrapper>
    )
    
    const trigger = screen.getByRole('button')
    expect(trigger).toHaveClass('outline-red-500')
  })

  it('handles success state correctly', () => {
    render(
      <TestWrapper>
        <OverlayMenu success border />
      </TestWrapper>
    )
    
    const trigger = screen.getByRole('button')
    expect(trigger).toHaveClass('outline-green-500')
  })

  it('can be disabled', () => {
    render(
      <TestWrapper>
        <OverlayMenu disabled items={mockItems} />
      </TestWrapper>
    )
    
    const trigger = screen.getByRole('button')
    expect(trigger).toBeDisabled()
    expect(trigger).toHaveClass('opacity-60', 'cursor-not-allowed')
    
    // Menu should not open when disabled
    fireEvent.click(trigger)
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
  })

  it('hides arrow when showArrow is false', () => {
    render(
      <TestWrapper>
        <OverlayMenu showArrow={false} />
      </TestWrapper>
    )
    
    const arrow = document.querySelector('svg')
    expect(arrow).not.toBeInTheDocument()
  })

  it('shows arrow when showArrow is true', () => {
    render(
      <TestWrapper>
        <OverlayMenu showArrow={true} />
      </TestWrapper>
    )
    
    const arrow = document.querySelector('svg')
    expect(arrow).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <TestWrapper>
        <OverlayMenu className="custom-class" />
      </TestWrapper>
    )
    
    const trigger = screen.getByRole('button')
    expect(trigger).toHaveClass('custom-class')
  })

  it('handles complex content in menu items', async () => {
    const complexItems = [
      {
        id: 'complex',
        content: (
          <div className="flex items-center space-x-2">
            <span>🚀</span>
            <div>
              <div>Complex Item</div>
              <div className="text-xs text-gray-500">With subtitle</div>
            </div>
          </div>
        ),
        onClick: jest.fn()
      }
    ]

    render(
      <TestWrapper>
        <OverlayMenu items={complexItems} />
      </TestWrapper>
    )
    
    // Open menu
    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Complex Item')).toBeInTheDocument()
      expect(screen.getByText('With subtitle')).toBeInTheDocument()
      expect(screen.getByText('🚀')).toBeInTheDocument()
    })
  })

  it('applies border styles correctly', () => {
    const { rerender } = render(
      <TestWrapper>
        <OverlayMenu border={true} />
      </TestWrapper>
    )
    
    let trigger = screen.getByRole('button')
    expect(trigger).toHaveClass('outline', 'outline-1')
    
    rerender(
      <TestWrapper>
        <OverlayMenu border={false} />
      </TestWrapper>
    )
    
    trigger = screen.getByRole('button')
    expect(trigger).not.toHaveClass('outline')
  })

  it('renders overlay label when provided', async () => {
    render(
      <TestWrapper>
        <OverlayMenu 
          items={mockItems}
          overlayLabel="Custom Label"
        />
      </TestWrapper>
    )
    
    // Open menu
    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Custom Label')).toBeInTheDocument()
    })
  })

  it('does not render overlay label when not provided', async () => {
    render(
      <TestWrapper>
        <OverlayMenu items={mockItems} />
      </TestWrapper>
    )
    
    // Open menu
    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument()
    })
    
    // Should not have any label
    expect(screen.queryByText('Custom Label')).not.toBeInTheDocument()
  })
})
