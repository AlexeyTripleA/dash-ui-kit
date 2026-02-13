import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { cva } from 'class-variance-authority'
import { cn } from '../../utils/tw'

const tabsRootStyles = cva('flex-col w-full', {
  variants: {
    theme: {
      light: '',
      dark: '',
    },
  },
  defaultVariants: {
    theme: 'light',
  },
})

const tabsListStyles = cva('flex-row relative', {
  variants: {
    theme: {
      light: '',
      dark: '',
    },
  },
  defaultVariants: {
    theme: 'light',
  },
})

const tabsTriggerStyles = cva(
  [
    'flex-row items-center justify-center relative',
    'font-light transition-all',
  ],
  {
    variants: {
      theme: {
        light: '',
        dark: '',
      },
      active: {
        true: '',
        false: '',
      },
      size: {
        sm: 'text-sm px-0 pr-3 pb-2',
        lg: 'text-xl px-0 pr-4 pb-3',
        xl: 'text-2xl px-0 pr-[14px] pb-[10px]',
      },
    },
    compoundVariants: [
      {
        theme: 'light',
        active: true,
        class: 'text-dash-primary-dark-blue',
      },
      {
        theme: 'light',
        active: false,
        class: 'text-[rgba(12,28,51,0.35)]',
      },
      {
        theme: 'dark',
        active: true,
        class: 'text-white',
      },
      {
        theme: 'dark',
        active: false,
        class: 'text-gray-400',
      },
    ],
    defaultVariants: {
      theme: 'light',
      active: false,
      size: 'xl',
    },
  }
)

const tabsContentStyles = cva('', {
  variants: {
    theme: {
      light: '',
      dark: '',
    },
    size: {
      sm: 'mt-2',
      lg: 'mt-3',
      xl: 'mt-4',
    },
  },
  defaultVariants: {
    theme: 'light',
    size: 'xl',
  },
})

export interface TabItem {
  /** Unique identifier for the tab */
  value: string
  /** Label text to display */
  label: string
  /** Content to render when tab is active */
  content: React.ReactNode
  /** Whether this tab is disabled */
  disabled?: boolean
}

export interface TabsProps {
  /** Array of tab items */
  items: TabItem[]
  /** Currently active tab value (controlled) */
  value?: string
  /** Default active tab value (uncontrolled) */
  defaultValue?: string
  /** Callback when active tab changes */
  onValueChange?: (value: string) => void
  /** Size variant */
  size?: 'sm' | 'lg' | 'xl'
  /** Theme variant */
  theme?: 'light' | 'dark'
  /** Additional CSS classes for the root container */
  className?: string
  /** Additional CSS classes for the tabs list */
  listClassName?: string
  /** Additional CSS classes for tab triggers */
  triggerClassName?: string
  /** Additional CSS classes for tab content */
  contentClassName?: string
  /** Additional style object for the root container */
  style?: ViewStyle
  /** Additional style object for the tabs list */
  listStyle?: ViewStyle
  /** Additional style object for tab triggers */
  triggerStyle?: ViewStyle
  /** Additional style object for tab content */
  contentStyle?: ViewStyle
}

/**
 * React Native Tabs component with sleek underline style matching Figma design.
 * Features horizontal scrolling, light/dark theme support, and touch interactions.
 */
export const Tabs: React.FC<TabsProps> = ({
  items,
  value,
  defaultValue,
  onValueChange,
  size = 'xl',
  theme = 'light',
  className = '',
  listClassName = '',
  triggerClassName = '',
  contentClassName = '',
  style,
  listStyle,
  triggerStyle,
  contentStyle,
}) => {
  const [internalValue, setInternalValue] = useState(
    defaultValue || items[0]?.value || ''
  )

  // Use controlled value if provided, otherwise use internal state
  const currentValue = value !== undefined ? value : internalValue

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  const rootClasses =
    tabsRootStyles({ theme }) + (className ? ` ${className}` : '')
  const listClasses =
    tabsListStyles({ theme }) + (listClassName ? ` ${listClassName}` : '')
  const contentClasses =
    tabsContentStyles({ theme, size }) +
    (contentClassName ? ` ${contentClassName}` : '')

  const rootStyle = [cn(rootClasses), style].filter(Boolean)
  const listStyleCombined = [cn(listClasses), listStyle].filter(Boolean)
  const contentStyleCombined = [cn(contentClasses), contentStyle].filter(
    Boolean
  )

  // Border color based on theme
  const borderColor =
    theme === 'light' ? 'rgba(12, 28, 51, 0.15)' : 'rgba(156, 163, 175, 0.5)'
  const activeBorderColor = '#4C7EFF'

  return (
    <View style={rootStyle}>
      {/* Tabs List */}
      <View style={{ position: 'relative' }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={listStyleCombined}
          contentContainerStyle={{ flexDirection: 'row' }}
        >
          {items.map((item) => {
            const isActive = currentValue === item.value
            const triggerClasses =
              tabsTriggerStyles({
                theme,
                active: isActive,
                size,
              }) + (triggerClassName ? ` ${triggerClassName}` : '')

            const triggerStyleCombined = [
              cn(triggerClasses),
              triggerStyle,
            ].filter(Boolean)

            // Get text size based on size prop
            let fontSize = 24 // xl
            let lineHeight = 33 // xl (1.366)
            if (size === 'sm') {
              fontSize = 14
              lineHeight = 18 // 1.25
            } else if (size === 'lg') {
              fontSize = 20
              lineHeight = 26 // 1.3
            }

            // Text color based on theme and active state
            let textColor = 'rgba(12, 28, 51, 0.35)' // light inactive
            if (theme === 'light' && isActive) {
              textColor = '#0C1C33' // light active
            } else if (theme === 'dark' && isActive) {
              textColor = '#FFFFFF' // dark active
            } else if (theme === 'dark' && !isActive) {
              textColor = 'rgba(156, 163, 175, 1)' // dark inactive
            }

            const textStyle: TextStyle = {
              fontSize,
              lineHeight,
              color: textColor,
              fontWeight: isActive ? '500' : '300',
            }

            return (
              <TouchableOpacity
                key={item.value}
                disabled={item.disabled}
                onPress={() => !item.disabled && handleValueChange(item.value)}
                activeOpacity={0.8}
                style={triggerStyleCombined}
              >
                <Text style={textStyle}>{item.label}</Text>
                {/* Active indicator */}
                {isActive && (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: -4,
                      right: size === 'sm' ? 12 : size === 'lg' ? 16 : 14,
                      height: 1,
                      backgroundColor: activeBorderColor,
                      zIndex: 10,
                    }}
                  />
                )}
              </TouchableOpacity>
            )
          })}
        </ScrollView>
        {/* Bottom border */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            backgroundColor: borderColor,
          }}
        />
      </View>

      {/* Tabs Content */}
      {items.map((item) => {
        if (currentValue !== item.value) return null

        return (
          <View key={item.value} style={contentStyleCombined}>
            {item.content}
          </View>
        )
      })}
    </View>
  )
}

export default Tabs
