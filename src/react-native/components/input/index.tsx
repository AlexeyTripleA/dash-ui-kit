import React, { useState } from 'react'
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/tw'
import { resolveColorScheme } from '../../utils/resolveColorScheme'
import { EyeOpenIcon, EyeClosedIcon } from '../icons'

const inputStyles = cva(
  'w-full font-normal text-sm leading-[17px]',
  {
    variants: {
      colorScheme: {
        default: '',
        brand: '',
        error: '',
        success: '',
        'light-gray': '',
      },
      size: {
        sm: 'px-3 py-2 rounded-[10px]',
        md: 'px-4 py-3 rounded-[12px]',
        xl: 'px-4 py-[18px] rounded-[14px]',
      },
      variant: {
        outlined: 'border',
        filled: 'border-0',
      },
      disabled: {
        false: '',
        true: 'opacity-60',
      },
    },
    compoundVariants: [
      // Outlined variant colors
      {
        variant: 'outlined',
        colorScheme: 'default',
        class: 'border-[rgba(17,17,17,0.32)] bg-white',
      },
      {
        variant: 'outlined',
        colorScheme: 'brand',
        class: 'border-dash-brand/30 bg-white',
      },
      {
        variant: 'outlined',
        colorScheme: 'error',
        class: 'border-red-500 bg-white',
      },
      {
        variant: 'outlined',
        colorScheme: 'success',
        class: 'border-green-500 bg-white',
      },
      {
        variant: 'outlined',
        colorScheme: 'light-gray',
        class: 'border-gray-500/50 bg-white',
      },
      // Filled variant colors
      {
        variant: 'filled',
        colorScheme: 'default',
        class: 'bg-dash-brand/15',
      },
      {
        variant: 'filled',
        colorScheme: 'brand',
        class: 'bg-dash-brand/15',
      },
      {
        variant: 'filled',
        colorScheme: 'error',
        class: 'bg-red-500/15',
      },
      {
        variant: 'filled',
        colorScheme: 'success',
        class: 'bg-green-500/15',
      },
      {
        variant: 'filled',
        colorScheme: 'light-gray',
        class: 'bg-gray-100',
      },
    ],
    defaultVariants: {
      colorScheme: 'default',
      size: 'xl',
      variant: 'outlined',
      disabled: false,
    },
  }
)

type InputVariants = VariantProps<typeof inputStyles>

export interface InputProps extends Omit<TextInputProps, 'editable'>, Omit<InputVariants, 'disabled'> {
  /** Light or dark theme */
  theme?: 'light' | 'dark'
  /** Color scheme override for light theme */
  colorSchemeLight?: 'default' | 'brand' | 'error' | 'success' | 'light-gray'
  /** Color scheme override for dark theme */
  colorSchemeDark?: 'default' | 'brand' | 'error' | 'success' | 'light-gray'
  className?: string
  error?: boolean
  success?: boolean
  disabled?: boolean
  /**
   * Prefix text or React element displayed before the input content
   */
  prefix?: string | React.ReactNode
  /**
   * Style object for the prefix element
   */
  prefixStyle?: TextStyle
  /**
   * Controls visibility toggle for password inputs. When false, the eye icon is hidden.
   * Defaults to true.
   */
  showPasswordToggle?: boolean
  /**
   * Custom container style (overrides Tailwind classes)
   */
  style?: ViewStyle
  /**
   * Custom text style for input text (overrides Tailwind text classes)
   */
  textStyle?: TextStyle
}

/**
 * React Native Input component that adapts to various color schemes, sizes, variants, and states.
 * For password inputs (secureTextEntry), includes a toggleable eye icon.
 * Supports prefix text or elements before input content.
 *
 * @example
 * <Input
 *   secureTextEntry
 *   placeholder="Enter password"
 *   colorScheme="brand"
 *   size="xl"
 *   prefix="https://"
 * />
 */
export const Input: React.FC<InputProps> = ({
  theme = 'light',
  className = '',
  colorScheme,
  colorSchemeLight,
  colorSchemeDark,
  size,
  variant,
  error = false,
  success = false,
  disabled = false,
  secureTextEntry = false,
  prefix,
  prefixStyle,
  showPasswordToggle = true,
  style,
  textStyle,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)

  // Determine color scheme based on state
  const effectiveColorScheme = resolveColorScheme(theme, colorScheme, colorSchemeLight, colorSchemeDark) ?? 'default'
  let finalColorScheme: typeof effectiveColorScheme = effectiveColorScheme
  if (error) finalColorScheme = 'error'
  else if (success) finalColorScheme = 'success'

  const classes = inputStyles({
    colorScheme: finalColorScheme,
    size,
    variant,
    disabled,
  }) + (className ? ` ${className}` : '')

  const isPassword = secureTextEntry
  const shouldShowToggle = isPassword && showPasswordToggle
  const hasPrefix = Boolean(prefix)

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword)
  }

  // Convert Tailwind classes to React Native style objects
  const inputStyle = [cn(classes), style].filter(Boolean)
  const inputTextStyle = [
    {
      color: '#111111',
      fontSize: 14,
      lineHeight: 17,
      fontWeight: '300' as const,
    },
    textStyle,
  ].filter(Boolean)

  // Adjust padding for password toggle button and prefix
  const containerStyle: ViewStyle = {}
  if (shouldShowToggle) containerStyle.paddingRight = 40
  if (hasPrefix) containerStyle.paddingLeft = 70 // Extra space for prefix

  // Default prefix style
  const defaultPrefixStyle: TextStyle = {
    color: 'rgba(17, 17, 17, 0.6)',
    fontSize: 14,
    lineHeight: 17,
  }

  // Render prefix element
  const renderPrefix = () => {
    if (!hasPrefix) return null
    
    return (
      <View
        style={{
          position: 'absolute',
          left: 16,
          height: '100%',
          justifyContent: 'center',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        {typeof prefix === 'string' ? (
          <Text style={[defaultPrefixStyle, prefixStyle]}>
            {prefix}
          </Text>
        ) : (
          prefix
        )}
      </View>
    )
  }

  if (isPassword || hasPrefix) {
    return (
      <View style={{ position: 'relative' }}>
        {renderPrefix()}
        <TextInput
          style={[inputStyle, containerStyle, inputTextStyle]}
          editable={!disabled}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor="rgba(17, 17, 17, 0.6)"
          {...props}
        />
        {shouldShowToggle && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 16,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.5,
            }}
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
          >
            {showPassword
              ? <EyeClosedIcon size={16} color='#0C1C33' />
              : <EyeOpenIcon size={16} color='#0C1C33' />}
          </TouchableOpacity>
        )}
      </View>
    )
  }

  // Regular input without prefix or password
  return (
    <TextInput
      style={[inputStyle, inputTextStyle]}
      editable={!disabled}
      placeholderTextColor="rgba(17, 17, 17, 0.6)"
      {...props}
    />
  )
}

export default Input
