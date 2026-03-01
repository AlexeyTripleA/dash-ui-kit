"use client";

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Copy a string to the clipboard and invoke a callback with the result.
 *
 * @param copyText  The text to copy. Defaults to empty string.
 * @param callback  Optional callback that will be called with { status: true } on success,
 *                  or { status: false, message: error } on failure.
 */
function copyToClipboard(copyText = '', callback) {
  navigator.clipboard.writeText(copyText).then(() => {
    const result = {
      status: true
    };
    callback === null || callback === void 0 ? void 0 : callback(result);
  }).catch(err => {
    const result = {
      status: false,
      message: err
    };
    callback === null || callback === void 0 ? void 0 : callback(result);
  });
}

exports.copyToClipboard = copyToClipboard;
exports.default = copyToClipboard;
//# sourceMappingURL=copyToClipboard.cjs.js.map
