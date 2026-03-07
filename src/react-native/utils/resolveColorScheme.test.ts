import { resolveColorScheme } from './resolveColorScheme'

describe('resolveColorScheme', () => {
  describe('fallback to colorScheme', () => {
    it('returns colorScheme when no overrides in light theme', () => {
      expect(resolveColorScheme('light', 'brand')).toBe('brand')
    })

    it('returns colorScheme when no overrides in dark theme', () => {
      expect(resolveColorScheme('dark', 'mint')).toBe('mint')
    })

    it('returns colorScheme when overrides are undefined in light theme', () => {
      expect(resolveColorScheme('light', 'gray', undefined, undefined)).toBe('gray')
    })

    it('returns colorScheme when overrides are undefined in dark theme', () => {
      expect(resolveColorScheme('dark', 'gray', undefined, undefined)).toBe('gray')
    })

    it('returns undefined when colorScheme is undefined and no overrides', () => {
      expect(resolveColorScheme('light', undefined)).toBeUndefined()
    })
  })

  describe('colorSchemeLight override', () => {
    it('returns colorSchemeLight when theme is light', () => {
      expect(resolveColorScheme('light', 'brand', 'mint', 'gray')).toBe('mint')
    })

    it('returns colorSchemeLight even when colorScheme matches', () => {
      expect(resolveColorScheme('light', 'mint', 'mint', 'gray')).toBe('mint')
    })

    it('ignores colorSchemeLight when theme is dark', () => {
      expect(resolveColorScheme('dark', 'brand', 'mint', undefined)).toBe('brand')
    })

    it('does not use colorSchemeDark when theme is light', () => {
      expect(resolveColorScheme('light', 'brand', undefined, 'gray')).toBe('brand')
    })
  })

  describe('colorSchemeDark override', () => {
    it('returns colorSchemeDark when theme is dark', () => {
      expect(resolveColorScheme('dark', 'brand', 'mint', 'gray')).toBe('gray')
    })

    it('returns colorSchemeDark even when colorScheme matches', () => {
      expect(resolveColorScheme('dark', 'gray', 'mint', 'gray')).toBe('gray')
    })

    it('ignores colorSchemeDark when theme is light', () => {
      expect(resolveColorScheme('light', 'brand', undefined, 'gray')).toBe('brand')
    })

    it('does not use colorSchemeLight when theme is dark', () => {
      expect(resolveColorScheme('dark', 'brand', 'mint', undefined)).toBe('brand')
    })
  })
})
