import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Pressable, Text, View, ViewStyle } from 'react-native'
import { Clipboard } from '../../utils/clipboard'
import { cn } from '../../utils/tw'
import { CopyIcon } from '../icons'

const FEEDBACK_DURATION_MS = 1000

export interface CopyButtonProps {
  /** Text to copy into clipboard */
  text: string
  /** Optional callback that will be called with the copy result */
  onCopy?: (success: boolean) => void
  /** Additional Tailwind classes for styling */
  className?: string
  /** Additional style object */
  style?: ViewStyle
  /** Accessible label for the button */
  accessibilityLabel?: string
}

/**
 * React Native CopyButton component. Copies text to clipboard on press
 * and shows "Copied!" feedback briefly.
 */
export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  onCopy,
  className = '',
  style,
  accessibilityLabel = 'Copy to clipboard',
}) => {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handlePress = useCallback(() => {
    Clipboard.setString(text)
    setCopied(true)
    onCopy?.(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), FEEDBACK_DURATION_MS)
  }, [text, onCopy])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const buttonClasses = `p-0 flex-shrink-0 min-w-0 bg-transparent ${className}`.trim()
  const buttonStyle = cn(buttonClasses)

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) =>
        [buttonStyle, style, pressed && { opacity: 0.7 }].filter(Boolean)
      }
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
    >
      {copied ? (
        <View style={cn('items-center justify-center min-w-4 min-h-4')}>
          <Text style={cn('text-xs text-dash-brand font-medium')}>Copied!</Text>
        </View>
      ) : (
        <CopyIcon color="#0C1C33" size={16} />
      )}
    </Pressable>
  )
}

export default CopyButton
