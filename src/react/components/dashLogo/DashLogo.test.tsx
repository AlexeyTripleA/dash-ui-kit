import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DashLogo } from './index'

describe('DashLogo', () => {
  it('renders with default size and color', () => {
    render(<DashLogo data-testid="dash-logo" />)
    const logo = screen.getByTestId('dash-logo')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('width', '30')
    expect(logo).toHaveAttribute('height', '25')
  })

  it('renders with custom size', () => {
    render(<DashLogo size={60} data-testid="dash-logo" />)
    const logo = screen.getByTestId('dash-logo')
    expect(logo).toHaveAttribute('width', '60')
    expect(logo).toHaveAttribute('height', '50') // 60 * (25/30)
  })

  it('renders with custom width and height', () => {
    render(<DashLogo width={90} height={75} data-testid="dash-logo" />)
    const logo = screen.getByTestId('dash-logo')
    expect(logo).toHaveAttribute('width', '90')
    expect(logo).toHaveAttribute('height', '75')
  })

  it('prioritizes width/height over size prop', () => {
    render(<DashLogo size={60} width={100} height={80} data-testid="dash-logo" />)
    const logo = screen.getByTestId('dash-logo')
    expect(logo).toHaveAttribute('width', '100')
    expect(logo).toHaveAttribute('height', '80')
  })

  it('applies custom color to paths', () => {
    const customColor = '#FF6B35'
    const { container } = render(<DashLogo color={customColor} />)
    const paths = container.querySelectorAll('path')
    
    paths.forEach(path => {
      expect(path).toHaveAttribute('fill', customColor)
    })
  })

  it('applies custom className', () => {
    const customClass = 'custom-logo-class'
    render(<DashLogo className={customClass} data-testid="dash-logo" />)
    const logo = screen.getByTestId('dash-logo')
    expect(logo).toHaveClass(customClass)
  })

  it('calls onClick when clicked and is clickable', () => {
    const onClick = vi.fn()
    render(<DashLogo onClick={onClick} data-testid="dash-logo" />)
    const logo = screen.getByTestId('dash-logo')
    
    fireEvent.click(logo)
    expect(onClick).toHaveBeenCalledOnce()
    expect(logo).toHaveStyle({ cursor: 'pointer' })
  })

  it('does not have pointer cursor when onClick is not provided', () => {
    render(<DashLogo data-testid="dash-logo" />)
    const logo = screen.getByTestId('dash-logo')
    expect(logo).toHaveStyle({ cursor: 'default' })
  })

  it('has correct viewBox and aspect ratio', () => {
    render(<DashLogo data-testid="dash-logo" />)
    const logo = screen.getByTestId('dash-logo')
    expect(logo).toHaveAttribute('viewBox', '0 0 30 25')
  })

  it('maintains aspect ratio when using size prop', () => {
    render(<DashLogo size={120} data-testid="dash-logo" />)
    const logo = screen.getByTestId('dash-logo')
    const width = Number(logo.getAttribute('width'))
    const height = Number(logo.getAttribute('height'))
    
    // Original ratio is 30:25 = 1.2
    expect(width / height).toBeCloseTo(1.2, 1)
  })

  it('renders SVG with correct structure', () => {
    const { container } = render(<DashLogo />)
    const svg = container.querySelector('svg')
    const paths = container.querySelectorAll('path')
    
    expect(svg).toBeInTheDocument()
    expect(paths).toHaveLength(2) // Dash logo has 2 paths
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg')
  })
}) 