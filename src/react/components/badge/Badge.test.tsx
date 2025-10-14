import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './index'

describe('Badge', () => {
  it('renders with provided text', () => {
    render(<Badge>Label</Badge>)
    expect(screen.getByText('Label')).toBeInTheDocument()
  })

  it('renders with default props', () => {
    render(<Badge>Default Badge</Badge>)
    const badge = screen.getByText('Default Badge')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('text-[#4C7EFF]') // default blue color
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Badge variant='solid'>Solid Badge</Badge>)
    expect(screen.getByText('Solid Badge')).toHaveClass('bg-[#4C7EFF]')

    rerender(<Badge variant='flat'>Flat Badge</Badge>)
    expect(screen.getByText('Flat Badge')).toHaveClass('bg-[rgba(76,126,255,0.15)]')

    rerender(<Badge variant='bordered'>Bordered Badge</Badge>)
    expect(screen.getByText('Bordered Badge')).toHaveClass('outline-[#4C7EFF]')

    rerender(<Badge variant='default'>Default Badge</Badge>)
    expect(screen.getByText('Default Badge')).toHaveClass('text-[#4C7EFF]')
  })

  it('renders with different colors', () => {
    const { rerender } = render(<Badge color='blue'>Blue Badge</Badge>)
    expect(screen.getByText('Blue Badge')).toHaveClass('text-[#4C7EFF]')

    rerender(<Badge color='red'>Red Badge</Badge>)
    expect(screen.getByText('Red Badge')).toHaveClass('text-[#CD2E00]')

    rerender(<Badge color='orange'>Orange Badge</Badge>)
    expect(screen.getByText('Orange Badge')).toHaveClass('text-[#F98F12]')

    rerender(<Badge color='turquoise'>Turquoise Badge</Badge>)
    expect(screen.getByText('Turquoise Badge')).toHaveClass('text-[#60F6D2]')

    rerender(<Badge color='white'>White Badge</Badge>)
    expect(screen.getByText('White Badge')).toHaveClass('text-white')

    rerender(<Badge color='gray'>Gray Badge</Badge>)
    expect(screen.getByText('Gray Badge')).toHaveClass('text-[#0C1C33]')

    rerender(<Badge color='light-gray'>Light Gray Badge</Badge>)
    expect(screen.getByText('Light Gray Badge')).toHaveClass('text-[#6B7280]')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Badge size='xxs'>XXS Badge</Badge>)
    expect(screen.getByText('XXS Badge')).toHaveClass('px-1 py-1 text-xs')

    rerender(<Badge size='xs'>XS Badge</Badge>)
    expect(screen.getByText('XS Badge')).toHaveClass('px-[0.5rem] py-[0.25rem] text-xs')

    rerender(<Badge size='sm'>SM Badge</Badge>)
    expect(screen.getByText('SM Badge')).toHaveClass('px-[2.125rem] py-[0.625rem] text-xs')

    rerender(<Badge size='xl'>XL Badge</Badge>)
    expect(screen.getByText('XL Badge')).toHaveClass('px-[2.25rem] py-4 text-lg')
  })

  it('combines variant and color correctly', () => {
    const { rerender } = render(
      <Badge variant='solid' color='red'>
        Red Solid Badge
      </Badge>
    )
    const badge = screen.getByText('Red Solid Badge')
    expect(badge).toHaveClass('bg-[#CD2E00]')
    expect(badge).toHaveClass('text-white')

    rerender(
      <Badge variant='flat' color='turquoise'>
        Turquoise Flat Badge
      </Badge>
    )
    const flatBadge = screen.getByText('Turquoise Flat Badge')
    expect(flatBadge).toHaveClass('bg-[rgba(96,246,210,0.15)]')
    expect(flatBadge).toHaveClass('text-[#60F6D2]')
  })

  it('applies custom className', () => {
    render(<Badge className='custom-class'>Custom Badge</Badge>)
    expect(screen.getByText('Custom Badge')).toHaveClass('custom-class')
  })

  it('renders as span element', () => {
    render(<Badge>Span Badge</Badge>)
    const badge = screen.getByText('Span Badge')
    expect(badge.tagName).toBe('SPAN')
  })

  it('has correct base classes', () => {
    render(<Badge>Base Badge</Badge>)
    const badge = screen.getByText('Base Badge')
    expect(badge).toHaveClass('inline-flex')
    expect(badge).toHaveClass('items-center')
    expect(badge).toHaveClass('justify-center')
    expect(badge).toHaveClass('rounded-full')
    expect(badge).toHaveClass('font-medium')
    expect(badge).toHaveClass('transition-colors')
  })

  it('renders React nodes as children', () => {
    render(
      <Badge>
        <span>Complex</span> Content
      </Badge>
    )
    expect(screen.getByText('Complex')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies default border radius from size', () => {
    render(<Badge size='sm'>Default Radius</Badge>)
    expect(screen.getByText('Default Radius')).toHaveClass('rounded-full')
  })

  it('overrides border radius when borderRadius prop is provided', () => {
    render(<Badge size='sm' borderRadius='xs'>Custom Radius</Badge>)
    const badge = screen.getByText('Custom Radius')
    expect(badge).toHaveClass('rounded-[0.25rem]')
  })

  it('combines size, variant, color and borderRadius correctly', () => {
    render(
      <Badge size='xs' variant='solid' color='blue' borderRadius='xs'>
        Combined Badge
      </Badge>
    )
    const badge = screen.getByText('Combined Badge')
    expect(badge).toHaveClass('px-[0.5rem]')
    expect(badge).toHaveClass('py-[0.25rem]')
    expect(badge).toHaveClass('bg-[#4C7EFF]')
    expect(badge).toHaveClass('rounded-[0.25rem]')
  })
})