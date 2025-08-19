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
  SmartphoneIcon,
  CrossIcon,
  WalletIcon,
  WalletSmallIcon,
  PlusIcon,
  FilterIcon,
  EditIcon,
  DeleteIcon,
  ChevronIcon,
  BurgerMenuIcon,
  KebabMenuIcon,
  CircleProcessIcon,
  CreditsIcon,
  WebIcon,
  ChainSmallIcon,
  SettingsIcon,
  ShieldSmallIcon,
  QuestionMessageIcon
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
  { Component: SmartphoneIcon, name: 'SmartphoneIcon', defaultSize: 12, defaultColor: '#4C7EFF' },
  { Component: CrossIcon, name: 'CrossIcon', defaultSize: 16, defaultColor: '#0C1C33' },
  { Component: WalletIcon, name: 'WalletIcon', defaultSize: 16, defaultColor: '#0C1C33' },
  { Component: WalletSmallIcon, name: 'WalletSmallIcon', defaultSize: 16, defaultColor: '#0C1C33' },
  { Component: PlusIcon, name: 'PlusIcon', defaultSize: 17, defaultColor: '#4C7EFF' },
  { Component: FilterIcon, name: 'FilterIcon', defaultSize: 16, defaultColor: '#0C1C33' },
  { Component: EditIcon, name: 'EditIcon', defaultSize: 16, defaultColor: '#0C1C33' },
  { Component: DeleteIcon, name: 'DeleteIcon', defaultSize: 16, defaultColor: '#0C1C33' },
  { Component: ChevronIcon, name: 'ChevronIcon', defaultSize: 12, defaultColor: '#0C1C33' },
  { Component: BurgerMenuIcon, name: 'BurgerMenuIcon', defaultSize: 24, defaultColor: '#0C1C33' },
  { Component: KebabMenuIcon, name: 'KebabMenuIcon', defaultSize: 2, defaultColor: '#0C1C33' },
  { Component: CircleProcessIcon, name: 'CircleProcessIcon', defaultSize: 20, defaultColor: '#4C7EFF' },
  { Component: CreditsIcon, name: 'CreditsIcon', defaultSize: 14, defaultColor: '#4C7EFF' },
  { Component: WebIcon, name: 'WebIcon', defaultSize: 16, defaultColor: '#4C7EFF' },
  { Component: ChainSmallIcon, name: 'ChainSmallIcon', defaultSize: 17, defaultColor: '#0C1C33' },
  { Component: SettingsIcon, name: 'SettingsIcon', defaultSize: 17, defaultColor: '#0C1C33' },
  { Component: ShieldSmallIcon, name: 'ShieldSmallIcon', defaultSize: 15, defaultColor: '#0C1C33' },
  { Component: QuestionMessageIcon, name: 'QuestionMessageIcon', defaultSize: 17, defaultColor: '#0C1C33' }
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

    it('CrossIcon has correct aspect ratio', () => {
      render(<CrossIcon size={16} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '16')
      expect(svg).toHaveAttribute('height', '17') // 16 * 17 / 16
      expect(svg).toHaveAttribute('viewBox', '0 0 16 17')
      expect(svg.querySelector('path')).toBeInTheDocument()
    })

    it('WalletIcon has correct aspect ratio and renders correctly', () => {
      render(<WalletIcon size={16} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '16')
      expect(svg).toHaveAttribute('height', '16')
      expect(svg).toHaveAttribute('viewBox', '0 0 16 16')
      expect(svg.querySelector('path')).toBeInTheDocument()
    })

    it('WalletSmallIcon has correct aspect ratio and renders correctly', () => {
      render(<WalletSmallIcon size={16} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '16')
      expect(svg).toHaveAttribute('height', '16')
      expect(svg).toHaveAttribute('viewBox', '0 0 16 16')
      expect(svg.querySelector('path')).toBeInTheDocument()
    })

    it('PlusIcon has correct aspect ratio', () => {
      render(<PlusIcon size={17} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '17')
      expect(svg).toHaveAttribute('height', '16') // 17 * 16 / 17
      expect(svg).toHaveAttribute('viewBox', '0 0 17 16')
      expect(svg.querySelector('path')).toBeInTheDocument()
    })

    it('FilterIcon has correct aspect ratio and renders correctly', () => {
      render(<FilterIcon size={16} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '16')
      expect(svg).toHaveAttribute('height', '16')
      expect(svg).toHaveAttribute('viewBox', '0 0 16 16')
      expect(svg.querySelector('path')).toBeInTheDocument()
    })

    it('EditIcon has correct aspect ratio and renders correctly', () => {
      render(<EditIcon size={16} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '16')
      expect(svg).toHaveAttribute('height', '16')
      expect(svg).toHaveAttribute('viewBox', '0 0 16 16')
      expect(svg.querySelector('path')).toBeInTheDocument()
    })

    it('DeleteIcon has correct aspect ratio', () => {
      render(<DeleteIcon size={16} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '16')
      expect(svg).toHaveAttribute('height', '17') // 16 * 17 / 16
      expect(svg).toHaveAttribute('viewBox', '0 0 16 17')
      expect(svg.querySelector('path')).toBeInTheDocument()
    })

    it('ChevronIcon has correct aspect ratio and renders correctly', () => {
      render(<ChevronIcon size={12} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '12')
      expect(svg).toHaveAttribute('height', '12')
      expect(svg).toHaveAttribute('viewBox', '0 0 12 12')
      expect(svg.querySelector('path')).toBeInTheDocument()
    })

    it('BurgerMenuIcon has correct aspect ratio and renders correctly', () => {
      render(<BurgerMenuIcon size={24} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '24')
      expect(svg).toHaveAttribute('height', '24')
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
      expect(svg.querySelector('path')).toBeInTheDocument()
    })

    it('KebabMenuIcon has correct aspect ratio', () => {
      render(<KebabMenuIcon size={12} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '12')
      expect(svg).toHaveAttribute('height', '72') // 12 * 12 / 2
      expect(svg).toHaveAttribute('viewBox', '0 0 2 12')
      const paths = svg.querySelectorAll('path')
      expect(paths).toHaveLength(3)
    })

    it('CircleProcessIcon has correct aspect ratio', () => {
      render(<CircleProcessIcon size={20} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '20')
      expect(svg).toHaveAttribute('height', '21') // 20 * 21 / 20
      expect(svg).toHaveAttribute('viewBox', '0 0 20 21')
      const clipPath = svg.querySelector('clipPath')
      expect(clipPath).toBeInTheDocument()
      const paths = svg.querySelectorAll('path')
      expect(paths.length).toBeGreaterThan(0)
    })

    it('CreditsIcon has correct aspect ratio', () => {
      render(<CreditsIcon size={14} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '14')
      expect(svg).toHaveAttribute('height', '20') // 14 * 20 / 14
      expect(svg).toHaveAttribute('viewBox', '0 0 14 20')
      const clipPath = svg.querySelector('clipPath')
      expect(clipPath).toBeInTheDocument()
      const paths = svg.querySelectorAll('path')
      expect(paths.length).toBeGreaterThan(0)
    })

    it('WebIcon has correct aspect ratio and renders correctly', () => {
      render(<WebIcon size={16} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '16')
      expect(svg).toHaveAttribute('height', '16')
      expect(svg).toHaveAttribute('viewBox', '0 0 16 16')
      expect(svg.querySelector('path')).toBeInTheDocument()
    })

    it('ChainSmallIcon has correct aspect ratio', () => {
      render(<ChainSmallIcon size={17} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '17')
      expect(svg).toHaveAttribute('height', '13') // 17 * 13 / 17
      expect(svg).toHaveAttribute('viewBox', '0 0 17 13')
      expect(svg.querySelector('path')).toBeInTheDocument()
    })

    it('SettingsIcon has correct aspect ratio and renders correctly', () => {
      render(<SettingsIcon size={17} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '17')
      expect(svg).toHaveAttribute('height', '17')
      expect(svg).toHaveAttribute('viewBox', '0 0 17 17')
      expect(svg.querySelector('path')).toBeInTheDocument()
    })

    it('ShieldSmallIcon has correct aspect ratio', () => {
      render(<ShieldSmallIcon size={15} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '15')
      expect(svg).toHaveAttribute('height', '17') // 15 * 17 / 15
      expect(svg).toHaveAttribute('viewBox', '0 0 15 17')
      expect(svg.querySelector('path')).toBeInTheDocument()
    })

    it('QuestionMessageIcon has correct aspect ratio and renders correctly', () => {
      render(<QuestionMessageIcon size={17} />)
      const svg = screen.getByRole('img', { hidden: true })
      
      expect(svg).toHaveAttribute('width', '17')
      expect(svg).toHaveAttribute('height', '17')
      expect(svg).toHaveAttribute('viewBox', '0 0 17 17')
      expect(svg.querySelector('path')).toBeInTheDocument()
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