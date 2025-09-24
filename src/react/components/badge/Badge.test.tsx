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

    rerender(<Badge size='small'>Small Badge</Badge>)
    expect(screen.getByText('Small Badge')).toHaveClass('px-[35px] py-[10px] text-xs')

    rerender(<Badge size='big'>Big Badge</Badge>)
    expect(screen.getByText('Big Badge')).toHaveClass('px-[35px] py-[15px] text-lg')
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
})