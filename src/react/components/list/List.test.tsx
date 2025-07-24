import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { List } from './index'
import { ThemeProvider } from '../../contexts/ThemeContext'

const mockItems = [
  { text: 'First item', description: 'Description for first item' },
  { text: 'Second item' },
  { text: 'Third item', description: 'Description for third item' }
]

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider initialTheme='light'>
      {component}
    </ThemeProvider>
  )
}

describe.concurrent('List', () => {
  it('renders list items correctly', () => {
    renderWithTheme(<List items={mockItems} />)
    
    expect(screen.getByText('First item')).toBeInTheDocument()
    expect(screen.getByText('Second item')).toBeInTheDocument()
    expect(screen.getByText('Third item')).toBeInTheDocument()
  })

  it('renders descriptions when provided', () => {
    renderWithTheme(<List items={mockItems} />)
    
    expect(screen.getByText('Description for first item')).toBeInTheDocument()
    expect(screen.getByText('Description for third item')).toBeInTheDocument()
    expect(screen.queryByText('Description for second item')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = renderWithTheme(
      <List items={mockItems} className='custom-class' />
    )
    
    const listElement = container.querySelector('ul')
    expect(listElement).toHaveClass('custom-class')
  })

  it('renders with different sizes', () => {
    renderWithTheme(<List items={[{ text: 'Test item' }]} size='lg' />)
    
    expect(screen.getByText('Test item')).toBeInTheDocument()
  })

  it('renders check icons by default', () => {
    const { container } = renderWithTheme(<List items={mockItems} />)
    
    const icons = container.querySelectorAll('svg')
    expect(icons).toHaveLength(mockItems.length)
  })
}) 