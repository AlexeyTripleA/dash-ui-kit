import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Text } from 'react-native'
import { Tabs, TabItem } from './index'

const mockItems: TabItem[] = [
  {
    value: 'tab1',
    label: 'Tab 1',
    content: <Text>Content 1</Text>,
  },
  {
    value: 'tab2',
    label: 'Tab 2',
    content: <Text>Content 2</Text>,
  },
  {
    value: 'tab3',
    label: 'Tab 3',
    content: <Text>Content 3</Text>,
  },
]

const mockItemsWithDisabled: TabItem[] = [
  ...mockItems,
  {
    value: 'tab4',
    label: 'Tab 4',
    content: <Text>Content 4</Text>,
    disabled: true,
  },
]

describe('Tabs Component', () => {
  describe('Basic rendering', () => {
    it('renders all tab labels', () => {
      const { getByText } = render(<Tabs items={mockItems} />)
      expect(getByText('Tab 1')).toBeTruthy()
      expect(getByText('Tab 2')).toBeTruthy()
      expect(getByText('Tab 3')).toBeTruthy()
    })

    it('renders the first tab content by default', () => {
      const { getByText } = render(<Tabs items={mockItems} />)
      expect(getByText('Content 1')).toBeTruthy()
    })

    it('does not render non-active tab content', () => {
      const { queryByText } = render(<Tabs items={mockItems} />)
      expect(queryByText('Content 2')).toBeFalsy()
      expect(queryByText('Content 3')).toBeFalsy()
    })
  })

  describe('Controlled mode', () => {
    it('renders tab content based on controlled value', () => {
      const { getByText, queryByText } = render(
        <Tabs items={mockItems} value="tab2" />
      )
      expect(getByText('Content 2')).toBeTruthy()
      expect(queryByText('Content 1')).toBeFalsy()
      expect(queryByText('Content 3')).toBeFalsy()
    })

    it('calls onValueChange when tab is clicked', () => {
      const onValueChange = jest.fn()
      const { getByText } = render(
        <Tabs items={mockItems} value="tab1" onValueChange={onValueChange} />
      )
      fireEvent.press(getByText('Tab 2'))
      expect(onValueChange).toHaveBeenCalledWith('tab2')
    })

    it('does not change tab when controlled without onValueChange', () => {
      const { getByText, queryByText } = render(
        <Tabs items={mockItems} value="tab1" />
      )
      fireEvent.press(getByText('Tab 2'))
      expect(getByText('Content 1')).toBeTruthy()
      expect(queryByText('Content 2')).toBeFalsy()
    })
  })

  describe('Uncontrolled mode', () => {
    it('changes tab content on click', () => {
      const { getByText, queryByText } = render(<Tabs items={mockItems} />)
      
      // Initially shows tab 1
      expect(getByText('Content 1')).toBeTruthy()
      
      // Click tab 2
      fireEvent.press(getByText('Tab 2'))
      expect(getByText('Content 2')).toBeTruthy()
      expect(queryByText('Content 1')).toBeFalsy()
      
      // Click tab 3
      fireEvent.press(getByText('Tab 3'))
      expect(getByText('Content 3')).toBeTruthy()
      expect(queryByText('Content 2')).toBeFalsy()
    })

    it('respects defaultValue', () => {
      const { getByText, queryByText } = render(
        <Tabs items={mockItems} defaultValue="tab2" />
      )
      expect(getByText('Content 2')).toBeTruthy()
      expect(queryByText('Content 1')).toBeFalsy()
    })

    it('calls onValueChange when tab changes', () => {
      const onValueChange = jest.fn()
      const { getByText } = render(
        <Tabs items={mockItems} onValueChange={onValueChange} />
      )
      fireEvent.press(getByText('Tab 2'))
      expect(onValueChange).toHaveBeenCalledWith('tab2')
    })
  })

  describe('Disabled tabs', () => {
    it('does not change tab when clicking disabled tab', () => {
      const { getByText, queryByText } = render(
        <Tabs items={mockItemsWithDisabled} />
      )
      
      // Initially shows tab 1
      expect(getByText('Content 1')).toBeTruthy()
      
      // Click disabled tab 4
      fireEvent.press(getByText('Tab 4'))
      
      // Still shows tab 1
      expect(getByText('Content 1')).toBeTruthy()
      expect(queryByText('Content 4')).toBeFalsy()
    })

    it('does not call onValueChange for disabled tabs', () => {
      const onValueChange = jest.fn()
      const { getByText } = render(
        <Tabs items={mockItemsWithDisabled} onValueChange={onValueChange} />
      )
      
      fireEvent.press(getByText('Tab 4'))
      expect(onValueChange).not.toHaveBeenCalled()
    })
  })

  describe('Sizes', () => {
    it('renders small size', () => {
      const { getByText } = render(<Tabs items={mockItems} size="sm" />)
      const tab = getByText('Tab 1')
      expect(tab.props.style.fontSize).toBe(14)
    })

    it('renders large size', () => {
      const { getByText } = render(<Tabs items={mockItems} size="lg" />)
      const tab = getByText('Tab 1')
      expect(tab.props.style.fontSize).toBe(20)
    })

    it('renders xl size (default)', () => {
      const { getByText } = render(<Tabs items={mockItems} size="xl" />)
      const tab = getByText('Tab 1')
      expect(tab.props.style.fontSize).toBe(24)
    })
  })

  describe('Themes', () => {
    it('renders light theme (default)', () => {
      const { getByText } = render(<Tabs items={mockItems} />)
      const activeTab = getByText('Tab 1')
      expect(activeTab.props.style.color).toBe('#0C1C33')
    })

    it('renders dark theme', () => {
      const { getByText } = render(<Tabs items={mockItems} theme="dark" />)
      const activeTab = getByText('Tab 1')
      expect(activeTab.props.style.color).toBe('#FFFFFF')
    })

    it('renders inactive tab with correct color in light theme', () => {
      const { getByText } = render(<Tabs items={mockItems} theme="light" />)
      const inactiveTab = getByText('Tab 2')
      expect(inactiveTab.props.style.color).toBe('rgba(12, 28, 51, 0.35)')
    })

    it('renders inactive tab with correct color in dark theme', () => {
      const { getByText } = render(<Tabs items={mockItems} theme="dark" />)
      const inactiveTab = getByText('Tab 2')
      expect(inactiveTab.props.style.color).toBe('rgba(156, 163, 175, 1)')
    })
  })

  describe('Custom classes and styles', () => {
    it('accepts custom className for root', () => {
      const { getByText } = render(
        <Tabs items={mockItems} className="custom-root" />
      )
      const content = getByText('Content 1')
      const root = content.parent?.parent?.parent
      expect(root?.props.className).toContain('custom-root')
    })

    it('accepts custom className for list', () => {
      const { getByText } = render(
        <Tabs items={mockItems} listClassName="custom-list" />
      )
      const tab = getByText('Tab 1')
      const list = tab.parent?.parent?.parent?.parent
      expect(list?.props.className).toContain('custom-list')
    })

    it('accepts custom className for trigger', () => {
      const { getByText } = render(
        <Tabs items={mockItems} triggerClassName="custom-trigger" />
      )
      const tab = getByText('Tab 1')
      expect(tab.parent?.props.className).toContain('custom-trigger')
    })

    it('accepts custom className for content', () => {
      const { getByText } = render(
        <Tabs items={mockItems} contentClassName="custom-content" />
      )
      const content = getByText('Content 1')
      expect(content.parent?.props.className).toContain('custom-content')
    })
  })

  describe('Active indicator', () => {
    it('shows active indicator for current tab', () => {
      const { getByText } = render(<Tabs items={mockItems} />)
      const activeTab = getByText('Tab 1').parent
      
      // Find the indicator view (last child with backgroundColor)
      const children = activeTab?.props.children
      const indicator = Array.isArray(children) 
        ? children.find(child => child?.props?.style?.backgroundColor === '#4C7EFF')
        : null
      
      expect(indicator).toBeTruthy()
    })

    it('does not show active indicator for inactive tabs', () => {
      const { getByText } = render(<Tabs items={mockItems} />)
      const inactiveTab = getByText('Tab 2').parent
      
      // Check that there's no indicator
      const children = inactiveTab?.props.children
      const indicator = Array.isArray(children)
        ? children.find(child => child?.props?.style?.backgroundColor === '#4C7EFF')
        : null
      
      expect(indicator).toBeFalsy()
    })
  })

  describe('Edge cases', () => {
    it('handles empty items array', () => {
      const { container } = render(<Tabs items={[]} />)
      expect(container).toBeTruthy()
    })

    it('handles single tab', () => {
      const singleItem: TabItem[] = [
        {
          value: 'only',
          label: 'Only Tab',
          content: <Text>Only Content</Text>,
        },
      ]
      const { getByText } = render(<Tabs items={singleItem} />)
      expect(getByText('Only Tab')).toBeTruthy()
      expect(getByText('Only Content')).toBeTruthy()
    })

    it('handles complex content', () => {
      const complexItems: TabItem[] = [
        {
          value: 'complex',
          label: 'Complex',
          content: (
            <Text>
              <Text>Nested</Text>
              <Text>Content</Text>
            </Text>
          ),
        },
      ]
      const { getByText } = render(<Tabs items={complexItems} />)
      expect(getByText('Nested')).toBeTruthy()
      expect(getByText('Content')).toBeTruthy()
    })
  })
})
