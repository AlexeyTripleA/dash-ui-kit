import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Pressable, Text, View, ViewStyle, TextStyle } from 'react-native'
import { Clipboard } from '../../utils/clipboard'
import { cn } from '../../utils/tw'
import { CopyIcon } from '../icons'

/** How the last copy attempt ended; 'idle' shows the icon again. */
type CopyState = 'idle' | 'copied' | 'failed'

const FEEDBACK_DURATION_MS = 1000

export interface CopyButtonProps {
  /** Text to copy into clipboard */
  text: string
  /** Optional callback that will be called with the copy result */
  onCopy?: (success: boolean) => void
  /** Additional Tailwind classes for styling */
  className?: string
  /** Custom container style (overrides Tailwind classes) */
  style?: ViewStyle
  /** Custom text style for the feedback text (overrides Tailwind text classes) */
  textStyle?: TextStyle
  /** Accessible label for the button */
  accessibilityLabel?: string
  /** Feedback shown after a successful copy */
  copiedLabel?: string
  /** Feedback shown after a failed copy */
  failedLabel?: string
}

/**
 * React Native CopyButton component. Copies text to clipboard on press
 * and briefly reports whether the copy succeeded.
 */
export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  onCopy,
  className = '',
  style,
  textStyle,
  accessibilityLabel = 'Copy to clipboard',
  copiedLabel = 'Copied!',
  failedLabel = 'Copy failed',
}) => {
  const [state, setState] = useState<CopyState>('idle')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handlePress = useCallback(async () => {
    const success = await Clipboard.setStringAsync(text)

    setState(success ? 'copied' : 'failed')
    onCopy?.(success)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setState('idle'), FEEDBACK_DURATION_MS)
  }, [text, onCopy])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const buttonClasses = `p-0 flex-shrink-0 min-w-0 bg-transparent ${className}`.trim()
  const buttonStyle = [cn(buttonClasses), style].filter(Boolean)

  const failed = state === 'failed'
  const feedbackTextClasses = `text-xs font-medium ${failed ? 'text-red-600' : 'text-dash-brand'}`
  const feedbackTextStyle = [cn(feedbackTextClasses), textStyle].filter(Boolean)

  return (
    <Pressable
      onPress={() => { void handlePress() }}
      style={({ pressed }) =>
        [buttonStyle, pressed && { opacity: 0.7 }].filter(Boolean)
      }
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
    >
      {state !== 'idle' ? (
        <View style={cn('items-center justify-center min-w-4 min-h-4')}>
          <Text style={feedbackTextStyle}>{failed ? failedLabel : copiedLabel}</Text>
        </View>
      ) : (
        <CopyIcon color="#0C1C33" size={16} />
      )}
    </Pressable>
  )
}

export default CopyButton
