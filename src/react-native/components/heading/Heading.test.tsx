import React from 'react'
import { render } from '@testing-library/react-native'
import { Heading } from './index'

describe('Heading Component', () => {
  describe('Basic rendering', () => {
    it('renders children correctly', () => {
      const { getByText } = render(<Heading>Test Heading</Heading>)
      expect(getByText('Test Heading')).toBeTruthy()
    })

    it('renders with default level (1)', () => {
      const { getByText } = render(<Heading>Heading 1</Heading>)
      const element = getByText('Heading 1')
      expect(element.props.className).toContain('text-4xl')
    })

    it('renders with default weight (extrabold)', () => {
      const { getByText } = render(<Heading>Bold Heading</Heading>)
      const element = getByText('Bold Heading')
      expect(element.props.className).toContain('font-extrabold')
    })
  })

  describe('Heading levels', () => {
    it('renders level 1 heading', () => {
      const { getByText } = render(<Heading level={1}>H1</Heading>)
      const element = getByText('H1')
      expect(element.props.className).toContain('text-4xl')
    })

    it('renders level 2 heading', () => {
      const { getByText } = render(<Heading level={2}>H2</Heading>)
      const element = getByText('H2')
      expect(element.props.className).toContain('text-3xl')
    })

    it('renders level 3 heading', () => {
      const { getByText } = render(<Heading level={3}>H3</Heading>)
      const element = getByText('H3')
      expect(element.props.className).toContain('text-2xl')
    })

    it('renders level 4 heading', () => {
      const { getByText } = render(<Heading level={4}>H4</Heading>)
      const element = getByText('H4')
      expect(element.props.className).toContain('text-xl')
    })

    it('renders level 5 heading', () => {
      const { getByText } = render(<Heading level={5}>H5</Heading>)
      const element = getByText('H5')
      expect(element.props.className).toContain('text-lg')
    })

    it('renders level 6 heading', () => {
      const { getByText } = render(<Heading level={6}>H6</Heading>)
      const element = getByText('H6')
      expect(element.props.className).toContain('text-base')
    })
  })

  describe('Font weights', () => {
    it('renders normal weight', () => {
      const { getByText } = render(<Heading weight="normal">Normal</Heading>)
      const element = getByText('Normal')
      expect(element.props.className).toContain('font-normal')
    })

    it('renders medium weight', () => {
      const { getByText } = render(<Heading weight="medium">Medium</Heading>)
      const element = getByText('Medium')
      expect(element.props.className).toContain('font-medium')
    })

    it('renders semibold weight', () => {
      const { getByText } = render(<Heading weight="semibold">Semibold</Heading>)
      const element = getByText('Semibold')
      expect(element.props.className).toContain('font-semibold')
    })

    it('renders bold weight', () => {
      const { getByText } = render(<Heading weight="bold">Bold</Heading>)
      const element = getByText('Bold')
      expect(element.props.className).toContain('font-bold')
    })

    it('renders extrabold weight', () => {
      const { getByText } = render(<Heading weight="extrabold">Extrabold</Heading>)
      const element = getByText('Extrabold')
      expect(element.props.className).toContain('font-extrabold')
    })
  })

  describe('Colors', () => {
    it('renders default color', () => {
      const { getByText } = render(<Heading>Default</Heading>)
      const element = getByText('Default')
      expect(element.props.className).toContain('text-gray-900')
    })

    it('renders black color', () => {
      const { getByText } = render(<Heading color="black">Black</Heading>)
      const element = getByText('Black')
      expect(element.props.className).toContain('text-black')
    })

    it('renders gray color', () => {
      const { getByText } = render(<Heading color="gray">Gray</Heading>)
      const element = getByText('Gray')
      expect(element.props.className).toContain('text-gray-600')
    })

    it('renders blue color', () => {
      const { getByText } = render(<Heading color="blue">Blue</Heading>)
      const element = getByText('Blue')
      expect(element.props.className).toContain('text-blue-600')
    })

    it('renders red color', () => {
      const { getByText } = render(<Heading color="red">Red</Heading>)
      const element = getByText('Red')
      expect(element.props.className).toContain('text-red-600')
    })

    it('renders green color', () => {
      const { getByText } = render(<Heading color="green">Green</Heading>)
      const element = getByText('Green')
      expect(element.props.className).toContain('text-green-600')
    })
  })

  describe('Custom className', () => {
    it('accepts custom className', () => {
      const { getByText } = render(<Heading className="custom-class">Custom</Heading>)
      const element = getByText('Custom')
      expect(element.props.className).toContain('custom-class')
    })

    it('combines default and custom classes', () => {
      const { getByText } = render(
        <Heading level={2} weight="bold" className="mb-4">
          Combined
        </Heading>
      )
      const element = getByText('Combined')
      expect(element.props.className).toContain('text-3xl')
      expect(element.props.className).toContain('font-bold')
      expect(element.props.className).toContain('mb-4')
    })
  })
})
