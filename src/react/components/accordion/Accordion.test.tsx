import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import { Accordion } from './index'
import { ThemeProvider } from '../../contexts/ThemeContext'

const renderWithTheme = (component: React.ReactElement, theme: 'light' | 'dark' = 'light') => {
  return render(
    <ThemeProvider initialTheme={theme}>
      {component}
    </ThemeProvider>
  )
}

const sampleContent = (
  <div data-testid="test-content">
    <div>Test Label: Test Value</div>
    <div>Another Label: Another Value</div>
  </div>
)

describe('Accordion', () => {
  test('renders with title', () => {
    renderWithTheme(
      <Accordion title="Test Accordion">{sampleContent}</Accordion>
    )
    
    expect(screen.getByText('Test Accordion')).toBeInTheDocument()
  })

  test('renders closed by default', () => {
    renderWithTheme(
      <Accordion title="Test Accordion">{sampleContent}</Accordion>
    )
    
    // Content should not be visible initially
    expect(screen.queryByTestId('test-content')).not.toBeInTheDocument()
  })

  test('renders open when defaultOpen is true', () => {
    renderWithTheme(
      <Accordion title="Test Accordion" defaultOpen={true}>{sampleContent}</Accordion>
    )
    
    // Content should be visible
    expect(screen.getByTestId('test-content')).toBeInTheDocument()
    expect(screen.getByText('Test Label: Test Value')).toBeInTheDocument()
  })

  test('toggles content when clicked', () => {
    renderWithTheme(
      <Accordion title="Test Accordion">{sampleContent}</Accordion>
    )
    
    const trigger = screen.getByText('Test Accordion')
    
    // Initially closed
    expect(screen.queryByTestId('test-content')).not.toBeInTheDocument()
    
    // Click to open
    fireEvent.click(trigger)
    expect(screen.getByTestId('test-content')).toBeInTheDocument()
    
    // Click to close
    fireEvent.click(trigger)
    expect(screen.queryByTestId('test-content')).not.toBeInTheDocument()
  })

  test('calls onOpenChange when state changes', () => {
    const onOpenChange = vi.fn()
    
    renderWithTheme(
      <Accordion 
        title="Test Accordion" 
        onOpenChange={onOpenChange}
      >
        {sampleContent}
      </Accordion>
    )
    
    const trigger = screen.getByText('Test Accordion')
    
    // Click to open
    fireEvent.click(trigger)
    expect(onOpenChange).toHaveBeenCalledWith(true)
    
    // Click to close
    fireEvent.click(trigger)
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  test('works in controlled mode', () => {
    const onOpenChange = vi.fn()
    
    const { rerender } = renderWithTheme(
      <Accordion 
        title="Test Accordion" 
        open={false}
        onOpenChange={onOpenChange}
      >
        {sampleContent}
      </Accordion>
    )
    
    // Should be closed
    expect(screen.queryByTestId('test-content')).not.toBeInTheDocument()
    
    // Rerender with open=true
    rerender(
      <ThemeProvider initialTheme="light">
        <Accordion 
          title="Test Accordion" 
          open={true}
          onOpenChange={onOpenChange}
        >
          {sampleContent}
        </Accordion>
      </ThemeProvider>
    )
    
    // Should be open
    expect(screen.getByTestId('test-content')).toBeInTheDocument()
  })

  test('renders custom children', () => {
    const customContent = <div data-testid="custom-content">Custom Content</div>
    
    renderWithTheme(
      <Accordion title="Test Accordion" defaultOpen={true}>
        {customContent}
      </Accordion>
    )
    
    // Should render custom content
    expect(screen.getByTestId('custom-content')).toBeInTheDocument()
  })

  test('renders multiple content elements', () => {
    const multipleContent = (
      <div>
        <div data-testid="small-content">Small Content</div>
        <div data-testid="medium-content">Medium Content</div>
      </div>
    )
    
    renderWithTheme(
      <Accordion title="Test Accordion" defaultOpen={true}>
        {multipleContent}
      </Accordion>
    )
    
    expect(screen.getByTestId('small-content')).toBeInTheDocument()
    expect(screen.getByTestId('medium-content')).toBeInTheDocument()
  })

  test('applies custom className', () => {
    const { container } = renderWithTheme(
      <Accordion 
        title="Test Accordion" 
        className="custom-class"
      >
        {sampleContent}
      </Accordion>
    )
    
    const accordion = container.firstChild as HTMLElement
    expect(accordion).toHaveClass('custom-class')
  })

  test('renders chevron icon', () => {
    renderWithTheme(
      <Accordion title="Test Accordion">{sampleContent}</Accordion>
    )
    
    // Check for SVG chevron icon
    const chevron = screen.getByRole('button').querySelector('svg')
    expect(chevron).toBeInTheDocument()
  })

  test('works with dark theme', () => {
    renderWithTheme(
      <Accordion title="Test Accordion" defaultOpen={true}>
        {sampleContent}
      </Accordion>,
      'dark'
    )
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument()
  })

  test('handles complex React content', () => {
    const complexContent = (
      <div>
        <span data-testid="complex-content">Complex React Content</span>
        <button>Button inside</button>
      </div>
    )
    
    renderWithTheme(
      <Accordion title="Test Accordion" defaultOpen={true}>
        {complexContent}
      </Accordion>
    )
    
    expect(screen.getByTestId('complex-content')).toBeInTheDocument()
    expect(screen.getByText('Button inside')).toBeInTheDocument()
  })
})
