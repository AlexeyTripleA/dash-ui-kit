export interface CopyResult {
  status: boolean
  message?: unknown
}

export type CopyCallback = (result: CopyResult) => void

/**
 * Copy a string to the clipboard and invoke a callback with the result.
 *
 * @param copyText  The text to copy. Defaults to empty string.
 * @param callback  Optional callback that will be called with { status: true } on success,
 *                  or { status: false, message: error } on failure.
 */
export function copyToClipboard (
  copyText: string = '',
  callback?: CopyCallback
): void {
  navigator.clipboard
    .writeText(copyText)
    .then(() => {
      const result: CopyResult = { status: true }
      callback?.(result)
    })
    .catch((err) => {
      const result: CopyResult = { status: false, message: err }
      callback?.(result)
    })
}

export default copyToClipboard 