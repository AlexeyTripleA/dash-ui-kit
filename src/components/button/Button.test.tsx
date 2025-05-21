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
})
