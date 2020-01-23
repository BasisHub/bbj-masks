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
   * @param {Boolean} [forceTrailingZeros=false] - when true zero are used to fill the left of decimal number , otherwise empty spaces 
   *
   * @returns {String} the masked number
   */
  static mask(
    number,
    mask,
    groupingSeparator = ',',
    decimalSeparator = '.',
    forceTrailingZeros = false
  ) {
    const maskLen = mask.length
    if (0 === maskLen) return number

    // Get magnitude and precision of MASK
    let maskBeforeDecimal = 0
    let maskAfterDecimal = 0
    let foundDecimal = false
    for (let i = 0; i < maskLen; ++i) {
      const m = mask.charAt(i)
      if (m == '0' || m == '#') {
        if (foundDecimal) ++maskAfterDecimal
        else ++maskBeforeDecimal
      } else if (m == '.') foundDecimal = true
    }

    let num = NumberMask._round(number, maskAfterDecimal)
    let bytes = NumberMask._toCharArray(num)

    // Get magnitude and precision of NUMBER
    let inLen = bytes.length
    let numBeforeDecimal = 0
    let numAfterDecimal = 0
    foundDecimal = false
    for (let i = 0; i < inLen; ++i) {
      if (bytes[i] == '.') foundDecimal = true
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
      bytes = NumberMask._toCharArray(num)
      inLen = bytes.length

      // Get new magnitude and precision of NUMBER
      numBeforeDecimal = 0
      numAfterDecimal = 0
      foundDecimal = false
      for (let i = 0; i < inLen; ++i) {
        if (bytes[i] == '.') foundDecimal = true
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

    let fillByte = ' ',
      floatByte = ' '
    let inPos = 0,
      outPos = 0,
      floatPos = 0
    if (mask.charAt(0) == '*') fillByte = '*'

    const fillInit = fillByte
    const isNegative = NumberMask._getSign(num) < 0
    let emitDecimal = inLen > 0 || mask.indexOf('0') >= 0
    let foundZero = false
    let foundDigit = false
    let currency = false
    foundDecimal = false

    let ret = new Array(maskLen)

    for (let maskPos = 0; maskPos < maskLen; ++maskPos) {
      let m = mask.charAt(maskPos)
      switch (m) {
        case '0':
          --maskBeforeDecimal
          if (maskBeforeDecimal < numBeforeDecimal && inPos < inLen) {
            ret[outPos] = bytes[inPos]
            ++inPos
            foundDigit = true
          } else {
            ret[outPos] = '0'
            foundZero = true
          }
          ++outPos
          break

        case '#':
          --maskBeforeDecimal
          if (maskBeforeDecimal < numBeforeDecimal && inPos < inLen) {
            ret[outPos] = bytes[inPos]
            ++inPos
            foundDigit = true
          } else {
            ret[outPos] =
              //foundDecimal &&
              forceTrailingZeros &&
              NumberMask._getSign(num) != 0
                ? '0'
                : fillByte
            if (!foundDecimal) floatPos = maskPos
          }
          ++outPos
          break

        case ',':
          if (foundZero || inPos > 0) ret[outPos] = groupingSeparator
          else {
            ret[outPos] = fillByte
            if (!foundDecimal) floatPos = maskPos
          }
          ++outPos
          break

        case '-':
          if (!foundDigit && floatByte == ' ') {
            if (isNegative) floatByte = '-'
            ret[outPos] = fillByte
            floatPos = foundDecimal ? -1 : maskPos
          } else ret[outPos] = isNegative ? '-' : fillByte
          ++outPos
          break

        case '+':
          if (!foundDigit && floatByte == ' ') {
            floatByte = isNegative ? '-' : '+'
            ret[outPos] = fillByte
            floatPos = foundDecimal ? -1 : maskPos
          } else ret[outPos] = isNegative ? '-' : '+'
          ++outPos
          break

        case '$':
          if (!foundDigit && floatByte == ' ') {
            floatByte = '$'
            ret[outPos] = fillByte
            floatPos = foundDecimal ? -1 : maskPos
          } else {
            ret[outPos] = '$'
          }
          ++outPos
          break

        // case '&':
        //   currency = true
        //   if (!foundDigit && floatByte == ' ') {
        //     floatByte = '&'
        //     ret[outPos] = fillByte
        //     floatPos = foundDecimal ? -1 : maskPos
        //   } else {
        //     ret[outPos] = '&'
        //   }
        //   ++outPos
        //   break

        // case '@':
        //   currency = true
        //   if (!foundDigit && floatByte == ' ') {
        //     floatByte = '@'
        //     ret[outPos] = fillByte
        //     floatPos = foundDecimal ? -1 : maskPos
        //   } else {
        //     ret[outPos] = '@'
        //   }
        //   ++outPos
        //   break

        case '(':
          if (!foundDigit && floatByte == ' ') {
            if (isNegative) floatByte = '('
            ret[outPos] = fillByte
            floatPos = foundDecimal ? -1 : maskPos
          } else {
            if (isNegative) {
              ret[outPos] = '('
            } else {
              ret[outPos] = foundDecimal ? ' ' : fillByte
            }
          }
          ++outPos
          break

        case ')':
          if (isNegative) {
            ret[outPos] = ')'
          } else {
            ret[outPos] = foundDecimal ? ' ' : fillByte
          }
          ++outPos
          break

        case 'C':
          if (maskPos < maskLen - 1 && mask.charAt(maskPos + 1) == 'R') {
            if (isNegative) {
              ret[outPos] = 'C'
              ret[outPos + 1] = 'R'
            } else {
              ret[outPos] = ' '
              ret[outPos + 1] = ' '
            }
            outPos += 2
            ++maskPos
          } else {
            ret[outPos] = 'C'
            ++outPos
          }
          break
        case 'D':
          if (maskPos < maskLen - 1 && mask.charAt(maskPos + 1) == 'R') {
            if (isNegative) {
              ret[outPos] = 'C'
              ret[outPos + 1] = 'R'
            } else {
              ret[outPos] = 'D'
              ret[outPos + 1] = 'R'
            }
            outPos += 2
            ++maskPos
          } else {
            ret[outPos] = 'D'
            ++outPos
          }
          break

        case '*':
          ret[outPos] = '*'
          ++outPos
          break

        case '.':
          ret[outPos] = emitDecimal ? decimalSeparator : fillByte
          fillByte = ' '
          foundDecimal = true
          ++inPos
          ++outPos
          break

        case 'B':
          ret[outPos] = ' '
          ++outPos
          break

        default:
          ret[outPos] = m
          ++outPos
          break
      }
    }

    if (floatByte != ' ') {
      if (floatPos < 0) floatPos = outPos
      while (floatPos >= maskLen) --floatPos
      if (ret[floatPos] == fillInit) ret[floatPos] = floatByte
    }

    return ret.join('')
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
