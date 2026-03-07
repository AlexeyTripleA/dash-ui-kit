import React from 'react'
import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ThemeProvider } from '../contexts/ThemeContext'
import { useColorScheme } from './useColorScheme'

const lightWrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(ThemeProvider, { initialTheme: 'light' }, children)

const darkWrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(ThemeProvider, { initialTheme: 'dark' }, children)

describe('useColorScheme', () => {
  it('returns colorScheme when no theme-specific props provided (light theme)', () => {
    const { result } = renderHook(
      () => useColorScheme('brand'),
      { wrapper: lightWrapper }
    )
    expect(result.current).toBe('brand')
  })

  it('returns colorScheme when no theme-specific props provided (dark theme)', () => {
    const { result } = renderHook(
      () => useColorScheme('brand'),
      { wrapper: darkWrapper }
    )
    expect(result.current).toBe('brand')
  })

  it('returns colorSchemeLight when theme is light', () => {
    const { result } = renderHook(
      () => useColorScheme('brand', 'mint', undefined),
      { wrapper: lightWrapper }
    )
    expect(result.current).toBe('mint')
  })

  it('returns colorSchemeDark when theme is dark', () => {
    const { result } = renderHook(
      () => useColorScheme('brand', undefined, 'gray'),
      { wrapper: darkWrapper }
    )
    expect(result.current).toBe('gray')
  })

  it('ignores colorSchemeDark when theme is light, returns undefined when no colorScheme', () => {
    const { result } = renderHook(
      () => useColorScheme(undefined, undefined, 'gray'),
      { wrapper: lightWrapper }
    )
    expect(result.current).toBeUndefined()
  })

  it('ignores colorSchemeLight when theme is dark, returns undefined when no colorScheme', () => {
    const { result } = renderHook(
      () => useColorScheme(undefined, 'mint', undefined),
      { wrapper: darkWrapper }
    )
    expect(result.current).toBeUndefined()
  })

  it('falls back to colorScheme when theme-specific prop is undefined (light)', () => {
    const { result } = renderHook(
      () => useColorScheme('red', undefined, undefined),
      { wrapper: lightWrapper }
    )
    expect(result.current).toBe('red')
  })
})
