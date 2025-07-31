import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import {
  ArrowIcon,
  CopyIcon,
  SuccessIcon,
  ErrorIcon,
  QueuedIcon,
  PooledIcon,
  BroadcastedIcon,
  CalendarIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  CheckIcon,
  KeyIcon,
  ProtectedMessageIcon,
  SmartphoneIcon
} from './index'

// Test suite for all icons
const icons = [
  { Component: ArrowIcon, name: 'ArrowIcon', defaultSize: 14, defaultColor: 'white' },
  { Component: CopyIcon, name: 'CopyIcon', defaultSize: 16, defaultColor: 'white' },
  { Component: SuccessIcon, name: 'SuccessIcon', defaultSize: 18, defaultColor: '#1CC400' },
  { Component: ErrorIcon, name: 'ErrorIcon', defaultSize: 18, defaultColor: '#F45858' },
  { Component: QueuedIcon, name: 'QueuedIcon', defaultSize: 18, defaultColor: '#F4A358' },
  { Component: PooledIcon, name: 'PooledIcon', defaultSize: 18, defaultColor: '#008DE4' },
  { Component: BroadcastedIcon, name: 'BroadcastedIcon', defaultSize: 18, defaultColor: '#008DE4' },
  { Component: CalendarIcon, name: 'CalendarIcon', defaultSize: 14, defaultColor: 'currentColor' },
  { Component: EyeOpenIcon, name: 'EyeOpenIcon', defaultSize: 16, defaultColor: 'currentColor' },
  { Component: EyeClosedIcon, name: 'EyeClosedIcon', defaultSize: 16, defaultColor: 'currentColor' },
  { Component: CheckIcon, name: 'CheckIcon', defaultSize: 20, defaultColor: '#4C7EFF' },
  { Component: KeyIcon, name: 'KeyIcon', defaultSize: 16, defaultColor: '#4C7EFF' },
  { Component: ProtectedMessageIcon, name: 'ProtectedMessageIcon', defaultSize: 16, defaultColor: '#4C7EFF' },
  { Component: SmartphoneIcon, name: 'SmartphoneIcon', defaultSize: 12, defaultColor: '#4C7EFF' }
]

describe('Icons', () => {
  describe('Basic rendering', () => {
    icons.forEach(({ Component, name, defaultSize, defaultColor }) => {
      it(`renders ${name} with default props`, () => {
        render(<Component />)
        const svg = screen.getByRole('img', { hidden: true })
        
        expect(svg).toBeInTheDocument()
        expect(svg).toHaveAttribute('width', defaultSize.toString())
        expect(svg).toHaveAttribute('height', expect.any(String))
        expect(svg).toHaveAttribute('color', defaultColor)
      })
    })
  })

  describe('Custom props', () => {
    it('applies custom size prop', () => {
      render(<ArrowIcon size={32} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '32')
      expect(svg).toHaveAttribute('height', '32')
    })

    it('applies custom color prop', () => {
      render(<SuccessIcon color="#FF0000" />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('color', '#FF0000')
    })

    it('applies custom className prop', () => {
      render(<CopyIcon className="custom-class" />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveClass('custom-class')
    })

    it('combines multiple custom props', () => {
      render(<ErrorIcon size={24} color="#00FF00" className="test-icon" />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '24')
      expect(svg).toHaveAttribute('height', '24')
      expect(svg).toHaveAttribute('color', '#00FF00')
      expect(svg).toHaveClass('test-icon')
    })
  })

  describe('Click handlers', () => {
    it('calls onClick handler when icon is clicked', () => {
      const handleClick = vi.fn()
      render(<QueuedIcon onClick={handleClick} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      fireEvent.click(svg)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not crash when no onClick handler is provided', () => {
      render(<PooledIcon />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(() => fireEvent.click(svg)).not.toThrow()
    })
  })

  describe('Specific icon behaviors', () => {
    it('ArrowIcon maintains aspect ratio', () => {
      render(<ArrowIcon size={28} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '28')
      expect(svg).toHaveAttribute('height', '28')
      expect(svg).toHaveAttribute('viewBox', '0 0 9 14')
    })

    it('EyeOpenIcon has correct aspect ratio', () => {
      render(<EyeOpenIcon size={16} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '16')
      expect(svg).toHaveAttribute('height', '10') // 16 * 10 / 16
      expect(svg).toHaveAttribute('viewBox', '0 0 16 10')
    })

    it('CalendarIcon maintains correct aspect ratio', () => {
      render(<CalendarIcon size={24} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '24')
      expect(svg).toHaveAttribute('height', '28') // 24 * 14 / 12
      expect(svg).toHaveAttribute('viewBox', '0 0 12 14')
    })

    it('CheckIcon renders with background circle', () => {
      render(<CheckIcon />)
      const svg = screen.getByRole('img', { hidden: true })
      const circle = svg.querySelector('circle')
      const path = svg.querySelector('path')
      
      expect(circle).toBeInTheDocument()
      expect(path).toBeInTheDocument()
      expect(circle).toHaveAttribute('r', '10')
    })

    it('CopyIcon includes clip paths', () => {
      render(<CopyIcon />)
      const svg = screen.getByRole('img', { hidden: true })
      const defs = svg.querySelector('defs')
      const clipPaths = svg.querySelectorAll('clipPath')
      
      expect(defs).toBeInTheDocument()
      expect(clipPaths).toHaveLength(3)
    })

    it('EyeClosedIcon includes strike-through line', () => {
      render(<EyeClosedIcon />)
      const svg = screen.getByRole('img', { hidden: true })
      const line = svg.querySelector('line')
      
      expect(line).toBeInTheDocument()
      expect(line).toHaveAttribute('x1', '1')
      expect(line).toHaveAttribute('y1', '15')
      expect(line).toHaveAttribute('x2', '15')
      expect(line).toHaveAttribute('y2', '1')
    })

    it('KeyIcon has correct aspect ratio and renders correctly', () => {
      render(<KeyIcon size={32} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '32')
      expect(svg).toHaveAttribute('height', '32')
      expect(svg).toHaveAttribute('viewBox', '0 0 16 16')
      expect(svg.querySelector('path')).toBeInTheDocument()
    })

    it('ProtectedMessageIcon has correct aspect ratio', () => {
      render(<ProtectedMessageIcon size={16} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '16')
      expect(svg).toHaveAttribute('height', '15') // 16 * 15 / 16
      expect(svg).toHaveAttribute('viewBox', '0 0 16 15')
    })

    it('SmartphoneIcon has correct aspect ratio', () => {
      render(<SmartphoneIcon size={12} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '12')
      expect(svg).toHaveAttribute('height', '16') // 12 * 16 / 12
      expect(svg).toHaveAttribute('viewBox', '0 0 12 16')
    })
  })

  describe('Accessibility', () => {
    it('icons are accessible to screen readers', () => {
      render(<SuccessIcon />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toBeInTheDocument()
    })

    it('clickable icons can be focused', () => {
      const handleClick = vi.fn()
      render(<BroadcastedIcon onClick={handleClick} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      svg.focus()
      expect(document.activeElement).toBe(svg)
    })
  })

  describe('Status icons group', () => {
    const statusIcons = [
      { Component: SuccessIcon, name: 'SuccessIcon', expectedColor: '#1CC400' },
      { Component: ErrorIcon, name: 'ErrorIcon', expectedColor: '#F45858' },
      { Component: QueuedIcon, name: 'QueuedIcon', expectedColor: '#F4A358' },
      { Component: PooledIcon, name: 'PooledIcon', expectedColor: '#008DE4' },
      { Component: BroadcastedIcon, name: 'BroadcastedIcon', expectedColor: '#008DE4' }
    ]

    statusIcons.forEach(({ Component, name, expectedColor }) => {
      it(`${name} has correct default color for status indication`, () => {
        render(<Component />)
        const svg = screen.getByRole('img', { hidden: true })
        
        expect(svg).toHaveAttribute('color', expectedColor)
      })

      it(`${name} includes background shape for status indication`, () => {
        render(<Component />)
        const svg = screen.getByRole('img', { hidden: true })
        const background = svg.querySelector('rect, circle')
        
        expect(background).toBeInTheDocument()
      })
    })
  })

  describe('Edge cases', () => {
    it('handles zero size gracefully', () => {
      render(<ArrowIcon size={0} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '0')
      expect(svg).toHaveAttribute('height', '0')
    })

    it('handles very large size values', () => {
      render(<CheckIcon size={1000} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '1000')
      expect(svg).toHaveAttribute('height', '1000')
    })

    it('handles empty string className', () => {
      render(<CalendarIcon className="" />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toBeInTheDocument()
    })

    it('handles transparent color', () => {
      render(<EyeOpenIcon color="transparent" />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('color', 'transparent')
    })
  })
}) 