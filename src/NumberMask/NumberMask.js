/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * NumberMask
 *
 * A javascript implementation for BBj numbers masking 
 *
 * @author Hyyan Abo Fakher <habofakher@basis.com>
 */
class NumberMask {
  /**
   * Mask the given number with the given mask according to BBj rules
   *
   * @param {Number} number the number to format
   * @param {String} mask the mask to use for formatting
   * @param {String} [groupingSeparator=,] - a char which will be used as a grouping separator
   * @param {String} [decimalSeparator=.]  - a char which will be used as a decimal separator
   *
   * @returns {String} the masked number
   */
  static mask(number, mask, groupingSeparator = ',', decimalSeparator = '.') {
    const maskLength = mask.length
    if (0 === maskLength) return number

    // Get magnitude and precision of MASK
    let maskBeforeDecimal = 0
    let maskAfterDecimal = 0
    let foundDecimal = false
    for (let i = 0; i < maskLength; ++i) {
      const m = mask.charAt(i)
      if (m == '0' || m == '#') {
        if (foundDecimal) ++maskAfterDecimal
        else ++maskBeforeDecimal
      } else if (m == '.') foundDecimal = true
    }

    let num = NumberMask._round(number, maskAfterDecimal)
    let digits = NumberMask._toCharArray(num)

    // Get magnitude and precision of NUMBER
    let numLen = digits.length
    let numBeforeDecimal = 0
    let numAfterDecimal = 0
    foundDecimal = false
    for (let i = 0; i < numLen; i++) {
      if (digits[i] == '.') foundDecimal = true
      else {
        if (foundDecimal) ++numAfterDecimal
        else ++numBeforeDecimal
      }
    }

    // always ignore mask overflow
    if (numBeforeDecimal > maskBeforeDecimal) return number.toString()

    // round if mask is for a lower precision number
    if (numAfterDecimal > maskAfterDecimal) {
      num = NumberMask._round(num, maskAfterDecimal)
      digits = NumberMask._toCharArray(num)
      numLen = digits.length

      // Get new magnitude and precision of NUMBER
      numBeforeDecimal = 0
      numAfterDecimal = 0
      foundDecimal = false
      for (let i = 0; i < numLen; i++) {
        if (digits[i] == '.') foundDecimal = true
        else {
          if (foundDecimal) ++numAfterDecimal
          else ++numBeforeDecimal
        }
      }

      // always ignore mask overflow
      if (numBeforeDecimal > maskBeforeDecimal) {
        return number.toString()
      }
    }

    const isNegative = NumberMask._getSign(num) === -1
    let emitDecimal = numLen > 0 || mask.indexOf('0') >= 0
    let foundZero = false
    let currency = false
    let buffer = ''
    foundDecimal = false

    for (let numPos = 0, maskPos = 0; maskPos < maskLength; maskPos++) {
      let m = mask.charAt(maskPos)
      switch (m) {
        case '0':
          --maskBeforeDecimal
          if (maskBeforeDecimal < numBeforeDecimal && numPos < numLen) {
            buffer += digits[numPos]
            ++numPos
          } else {
            buffer += '0'
            foundZero = true
          }
          break

        case '#':
          --maskBeforeDecimal
          if (maskBeforeDecimal < numBeforeDecimal && numPos < numLen) {
            buffer += digits[numPos]
            ++numPos
          } else {
            if (foundDecimal) buffer += '0'
          }
          break

        case ',':
          if (foundZero || numPos > 0) buffer += groupingSeparator
          break

        case '-':
        case '(':
        case ')':
          if (isNegative) buffer += m
          break

        case '+':
          buffer += isNegative ? '-' : '+'
          break

        case '.':
          if (foundDecimal) buffer += m
          else {
            if (emitDecimal) buffer += decimalSeparator
            foundDecimal = true
            ++numPos
          }
          break

        case 'C':
          if (maskPos < maskLength - 1 && mask.charAt(maskPos + 1) == 'R') {
            if (isNegative) buffer += 'CR'
            ++maskPos
          } else buffer += m
          break

        case 'D':
          if (maskPos < maskLength - 1 && p_mask.charAt(maskPos + 1) == 'R') {
            buffer += isNegative ? 'CR' : 'DR'
            ++maskPos
          } else buffer += m
          break

        case 'B':
          buffer += ' '
          break

        default:
          buffer += m
          break
      }
    }

    return buffer
  }

  static _shift(number, precision, reverseShift) {
    if (reverseShift) precision = -precision
    var numArray = ('' + number).split('e')
    return +(
      numArray[0] +
      'e' +
      (numArray[1] ? +numArray[1] + precision : precision)
    )
  }

  static _round(number, precision) {
    return NumberMask._shift(
      Math.round(NumberMask._shift(number, precision, false)),
      precision,
      true
    )
  }

  static _toCharArray(number) {
    const signum = NumberMask._getSign(number)
    let chars = []

    if (signum !== 0) {
      let string = signum < 0 ? `${-1 * number.toString()}` : number.toString()

      if (string.length > 1 && string.charAt(0) == '0')
        string = string.substring(1)

      // The string contains only [0-9] and '.'
      chars = string.split('')
    }

    return chars
  }

  /**
   * Returns the sign of a number
   *
   * @param {Number} x number
   * @returns {Number} A number representing the sign of the given argument.
   *                   If the argument is a positive number, negative number, positive zero
   *                   or negative zero, the function will return 1, -1, 0 or -0 respectively.
   *                   Otherwise, NaN is returned.
   */
  static _getSign(x) {
    return (x > 0) - (x < 0) || +x
  }
}

export default NumberMask