import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import { Tabs } from './index'
import { ThemeProvider } from '../../contexts/ThemeContext'

const renderWithTheme = (component: React.ReactElement, theme: 'light' | 'dark' = 'light') => {
  return render(
    <ThemeProvider initialTheme={theme}>
      {component}
    </ThemeProvider>
  )
}

const sampleItems = [
  {
    value: 'transactions',
    label: 'Transactions',
    content: <div data-testid="transactions-content">Transaction History</div>
  },
  {
    value: 'tokens',
    label: 'Tokens',
    content: <div data-testid="tokens-content">Token Portfolio</div>
  },
  {
    value: 'settings',
    label: 'Settings',
    content: <div data-testid="settings-content">Settings Panel</div>
  }
]

describe('Tabs', () => {
  test('renders all tab labels', () => {
    renderWithTheme(
      <Tabs items={sampleItems} defaultValue="transactions" />
    )
    
    expect(screen.getByText('Transactions')).toBeInTheDocument()
    expect(screen.getByText('Tokens')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  test('renders default active tab content', () => {
    renderWithTheme(
      <Tabs items={sampleItems} defaultValue="transactions" />
    )
    
    expect(screen.getByTestId('transactions-content')).toBeInTheDocument()
    expect(screen.queryByTestId('tokens-content')).not.toBeInTheDocument()
    expect(screen.queryByTestId('settings-content')).not.toBeInTheDocument()
  })

  test('switches tabs when clicked', () => {
    renderWithTheme(
      <Tabs items={sampleItems} defaultValue="transactions" />
    )
    
    // Initially shows transactions
    expect(screen.getByTestId('transactions-content')).toBeInTheDocument()
    expect(screen.queryByTestId('tokens-content')).not.toBeInTheDocument()
    
    // Click tokens tab
    fireEvent.click(screen.getByText('Tokens'))
    
    // Should switch to tokens content
    expect(screen.queryByTestId('transactions-content')).not.toBeInTheDocument()
    expect(screen.getByTestId('tokens-content')).toBeInTheDocument()
  })

  test('calls onValueChange when tab is selected', () => {
    const onValueChange = vi.fn()
    
    renderWithTheme(
      <Tabs 
        items={sampleItems} 
        defaultValue="transactions"
        onValueChange={onValueChange}
      />
    )
    
    fireEvent.click(screen.getByText('Tokens'))
    
    expect(onValueChange).toHaveBeenCalledWith('tokens')
  })

  test('works in controlled mode', () => {
    const onValueChange = vi.fn()
    
    const { rerender } = renderWithTheme(
      <Tabs 
        items={sampleItems} 
        value="transactions"
        onValueChange={onValueChange}
      />
    )
    
    // Should show transactions content
    expect(screen.getByTestId('transactions-content')).toBeInTheDocument()
    
    // Rerender with different value
    rerender(
      <ThemeProvider initialTheme="light">
        <Tabs 
          items={sampleItems} 
          value="tokens"
          onValueChange={onValueChange}
        />
      </ThemeProvider>
    )
    
    // Should show tokens content
    expect(screen.getByTestId('tokens-content')).toBeInTheDocument()
    expect(screen.queryByTestId('transactions-content')).not.toBeInTheDocument()
  })

  test('handles disabled tabs', () => {
    const itemsWithDisabled = [
      ...sampleItems,
      {
        value: 'disabled',
        label: 'Disabled Tab',
        content: <div data-testid="disabled-content">Disabled Content</div>,
        disabled: true
      }
    ]
    
    renderWithTheme(
      <Tabs items={itemsWithDisabled} defaultValue="transactions" />
    )
    
    const disabledTab = screen.getByText('Disabled Tab')
    expect(disabledTab).toBeDisabled()
    
    // Should not be clickable
    fireEvent.click(disabledTab)
    expect(screen.queryByTestId('disabled-content')).not.toBeInTheDocument()
    expect(screen.getByTestId('transactions-content')).toBeInTheDocument()
  })

  test('applies custom className', () => {
    const { container } = renderWithTheme(
      <Tabs 
        items={sampleItems} 
        defaultValue="transactions"
        className="custom-tabs-class"
      />
    )
    
    const tabsRoot = container.firstChild as HTMLElement
    expect(tabsRoot).toHaveClass('custom-tabs-class')
  })

  test('applies custom listClassName', () => {
    renderWithTheme(
      <Tabs 
        items={sampleItems} 
        defaultValue="transactions"
        listClassName="custom-list-class"
      />
    )
    
    const tabsList = screen.getByRole('tablist')
    expect(tabsList).toHaveClass('custom-list-class')
  })

  test('applies custom triggerClassName', () => {
    renderWithTheme(
      <Tabs 
        items={sampleItems} 
        defaultValue="transactions"
        triggerClassName="custom-trigger-class"
      />
    )
    
    const transactionsTab = screen.getByText('Transactions')
    expect(transactionsTab).toHaveClass('custom-trigger-class')
  })

  test('applies custom contentClassName', () => {
    renderWithTheme(
      <Tabs 
        items={sampleItems} 
        defaultValue="transactions"
        contentClassName="custom-content-class"
      />
    )
    
    const content = screen.getByRole('tabpanel')
    expect(content).toHaveClass('custom-content-class')
  })

  test('renders complex content correctly', () => {
    const complexItems = [
      {
        value: 'complex',
        label: 'Complex Tab',
        content: (
          <div>
            <h3 data-testid="complex-title">Complex Content</h3>
            <button data-testid="complex-button">Action Button</button>
            <ul>
              <li data-testid="list-item-1">Item 1</li>
              <li data-testid="list-item-2">Item 2</li>
            </ul>
          </div>
        )
      }
    ]
    
    renderWithTheme(
      <Tabs items={complexItems} defaultValue="complex" />
    )
    
    expect(screen.getByTestId('complex-title')).toBeInTheDocument()
    expect(screen.getByTestId('complex-button')).toBeInTheDocument()
    expect(screen.getByTestId('list-item-1')).toBeInTheDocument()
    expect(screen.getByTestId('list-item-2')).toBeInTheDocument()
  })

  test('works with dark theme', () => {
    renderWithTheme(
      <Tabs items={sampleItems} defaultValue="transactions" />,
      'dark'
    )
    
    expect(screen.getByTestId('transactions-content')).toBeInTheDocument()
    expect(screen.getByText('Transactions')).toBeInTheDocument()
  })

  test('handles keyboard navigation', () => {
    renderWithTheme(
      <Tabs items={sampleItems} defaultValue="transactions" />
    )
    
    const transactionsTab = screen.getByText('Transactions')
    const tokensTab = screen.getByText('Tokens')
    
    // Focus first tab
    transactionsTab.focus()
    
    // Navigate with arrow keys
    fireEvent.keyDown(transactionsTab, { key: 'ArrowRight' })
    expect(tokensTab).toHaveFocus()
    
    // Select with Enter or Space
    fireEvent.keyDown(tokensTab, { key: 'Enter' })
    expect(screen.getByTestId('tokens-content')).toBeInTheDocument()
  })

  test('maintains accessibility attributes', () => {
    renderWithTheme(
      <Tabs items={sampleItems} defaultValue="transactions" />
    )
    
    const tabsList = screen.getByRole('tablist')
    const tabs = screen.getAllByRole('tab')
    const panel = screen.getByRole('tabpanel')
    
    expect(tabsList).toBeInTheDocument()
    expect(tabs).toHaveLength(3)
    expect(panel).toBeInTheDocument()
    
    // Check aria attributes
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false')
    expect(tabs[2]).toHaveAttribute('aria-selected', 'false')
  })

  test('handles empty items array gracefully', () => {
    renderWithTheme(
      <Tabs items={[]} />
    )
    
    const tabsList = screen.getByRole('tablist')
    expect(tabsList).toBeInTheDocument()
    expect(screen.queryByRole('tab')).not.toBeInTheDocument()
  })

  test('handles single tab', () => {
    const singleItem = [sampleItems[0]]
    
    renderWithTheme(
      <Tabs items={singleItem} defaultValue="transactions" />
    )
    
    expect(screen.getByText('Transactions')).toBeInTheDocument()
    expect(screen.getByTestId('transactions-content')).toBeInTheDocument()
    expect(screen.getAllByRole('tab')).toHaveLength(1)
  })
})


