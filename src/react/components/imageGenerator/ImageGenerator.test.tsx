import { render, screen } from '@testing-library/react'
import { ImageGenerator } from './index'
import { describe, it, expect, vi } from 'vitest'

// Mock minidenticons
vi.mock('minidenticons', () => ({
  minidenticon: vi.fn((username: string, saturation?: number, lightness?: number) => 
    `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><rect width='16' height='16' fill='#${username.slice(0, 6).padEnd(6, '0')}'/></svg>`
  )
}))

describe('ImageGenerator', () => {
  it('renders with basic props', () => {
    render(<ImageGenerator username='testuser' />)
    
    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('alt', 'testuser')
  })

  it('applies custom className', () => {
    render(<ImageGenerator username='testuser' className='custom-class' />)
    
    const container = screen.getByRole('img').parentElement
    expect(container).toHaveClass('relative')
    expect(container).toHaveClass('inline-block')
    expect(container).toHaveClass('custom-class')
  })



  it('passes through img attributes', () => {
    render(
      <ImageGenerator 
        username='testuser' 
        width={100} 
        height={100} 
        title='Test Image'
        style={{ border: '1px solid red' }}
      />
    )
    
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('width', '100')
    expect(img).toHaveAttribute('height', '100')
    expect(img).toHaveAttribute('title', 'Test Image')
    expect(img).toHaveStyle('border: 1px solid red')
  })

  it('generates data URI from username', () => {
    render(<ImageGenerator username='testuser' />)
    
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src')
    
    const src = img.getAttribute('src')
    expect(src).toMatch(/^data:image\/svg\+xml;utf8,/)
  })

  it('has correct CSS classes', () => {
    render(<ImageGenerator username='testuser' />)
    
    const container = screen.getByRole('img').parentElement
    const img = screen.getByRole('img')
    
    expect(container).toHaveClass('relative', 'inline-block')
    expect(img).toHaveClass('w-full', 'h-full')
  })

  it('handles empty className gracefully', () => {
    render(<ImageGenerator username='testuser' className='' />)
    
    const container = screen.getByRole('img').parentElement
    expect(container).toHaveClass('relative', 'inline-block')
    expect(container?.className).toBe('relative inline-block')
  })

  it('handles undefined className gracefully', () => {
    render(<ImageGenerator username='testuser' />)
    
    const container = screen.getByRole('img').parentElement
    expect(container).toHaveClass('relative', 'inline-block')
  })

  it('passes saturation and lightness to minidenticon', () => {
    const { minidenticon } = require('minidenticons')
    
    render(<ImageGenerator username='testuser' saturation={80} lightness={60} />)
    
    expect(minidenticon).toHaveBeenCalledWith('testuser', 80, 60)
  })

  it('handles missing saturation and lightness', () => {
    const { minidenticon } = require('minidenticons')
    
    render(<ImageGenerator username='testuser' />)
    
    expect(minidenticon).toHaveBeenCalledWith('testuser', undefined, undefined)
  })
}) 