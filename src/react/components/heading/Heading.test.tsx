import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Heading } from './index'

describe.concurrent('Heading', () => {
  it('renders heading with default props', () => {
    render(<Heading>Default Heading</Heading>)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Default Heading')
    expect(heading.tagName).toBe('H1')
  })

  it('renders with different heading levels', () => {
    render(<Heading as="h3">H3 Heading</Heading>)
    
    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H3')
  })

  it('applies correct size classes', () => {
    render(<Heading size="sm">Small Heading</Heading>)
    
    const heading = screen.getByRole('heading')
    expect(heading).toHaveClass('text-sm')
  })

  it('applies 2xl size with special styling', () => {
    render(<Heading size="2xl">Large Heading</Heading>)
    
    const heading = screen.getByRole('heading')
    expect(heading).toHaveClass('text-[2.375rem]', 'leading-[1.3]', 'tracking-[-0.3px]')
  })

  it('applies correct weight classes', () => {
    render(<Heading weight="medium">Medium Weight</Heading>)
    
    const heading = screen.getByRole('heading')
    expect(heading).toHaveClass('font-medium')
  })

  it('applies correct color classes', () => {
    render(<Heading color="blue">Blue Heading</Heading>)
    
    const heading = screen.getByRole('heading')
    expect(heading).toHaveClass('text-blue-600')
  })

  it('applies custom className', () => {
    render(<Heading className="custom-class">Custom Heading</Heading>)
    
    const heading = screen.getByRole('heading')
    expect(heading).toHaveClass('custom-class')
  })

  it('combines multiple props correctly', () => {
    render(
      <Heading 
        as="h2" 
        size="lg" 
        weight="bold" 
        color="red" 
        className="custom"
      >
        Combined Props
      </Heading>
    )
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveClass('text-lg', 'font-bold', 'text-red-600', 'custom')
    expect(heading.tagName).toBe('H2')
  })

  it('renders all heading levels correctly', () => {
    const levels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
    
    levels.forEach((level, index) => {
      render(<Heading as={level} key={level}>Heading {level}</Heading>)
      
      const heading = screen.getByRole('heading', { level: index + 1 })
      expect(heading).toBeInTheDocument()
      expect(heading.tagName).toBe(level.toUpperCase())
    })
  })

  it('renders all size variants correctly', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const
    
    sizes.forEach(size => {
      const { unmount } = render(<Heading size={size}>Size {size}</Heading>)
      
      const heading = screen.getByRole('heading')
      expect(heading).toBeInTheDocument()
      
      unmount()
    })
  })

  it('renders all weight variants correctly', () => {
    const weights = ['normal', 'medium', 'semibold', 'bold', 'extrabold'] as const
    
    weights.forEach(weight => {
      const { unmount } = render(<Heading weight={weight}>Weight {weight}</Heading>)
      
      const heading = screen.getByRole('heading')
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveClass(`font-${weight}`)
      
      unmount()
    })
  })

  it('renders all color variants correctly', () => {
    const colors = ['black', 'gray', 'blue', 'red', 'green'] as const
    
    colors.forEach(color => {
      const { unmount } = render(<Heading color={color}>Color {color}</Heading>)
      
      const heading = screen.getByRole('heading')
      expect(heading).toBeInTheDocument()
      
      const expectedClass = color === 'black' ? 'text-black' : `text-${color}-600`
      expect(heading).toHaveClass(expectedClass)
      
      unmount()
    })
  })

  it('filters out empty className', () => {
    render(<Heading className="">No Custom Class</Heading>)
    
    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
  })

  it('handles complex children content', () => {
    render(
      <Heading>
        Complex <strong>bold</strong> content with <em>emphasis</em>
      </Heading>
    )
    
    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
    expect(heading.querySelector('strong')).toHaveTextContent('bold')
    expect(heading.querySelector('em')).toHaveTextContent('emphasis')
  })
}) 