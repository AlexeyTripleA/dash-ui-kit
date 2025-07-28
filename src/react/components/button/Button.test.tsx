import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './index'

describe('Button', () => {
  it('renders with provided text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Test</Button>)
    fireEvent.click(screen.getByText('Test'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not respond to clicks when disabled', () => {
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Nope</Button>)
    fireEvent.click(screen.getByText('Nope'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders with lightGray color scheme', () => {
    render(<Button colorScheme="lightGray">Light Gray Button</Button>)
    const button = screen.getByText('Light Gray Button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'button')
  })

  it('renders with outline variant and lightGray color scheme', () => {
    render(
      <Button variant="outline" colorScheme="lightGray">
        Outline Light Gray
      </Button>
    )
    const button = screen.getByText('Outline Light Gray')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('dash-btn-outline')
  })
})
