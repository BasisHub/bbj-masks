/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const isNumberRegex = /^\d+$/
const isWhitespaceRegex = /\s/
const punctuationList = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~'

/**
 * Check if the given string is in lower case
 *
 * @param {String} str
 */
const isLowerCase = str => {
  return str == str.toLowerCase() && str != str.toUpperCase()
}

/**
 * Check if the given string is in upper case
 *
 * @param {String} str
 */
const isUpperCase = str => {
  return str == str.toUpperCase() && str != str.toLowerCase()
}

/**
 * NumberMask
 *
 * A javascript implementation for BBj numbers masking
 *
 * @author Hyyan Abo Fakher <habofakher@basis.com>
 */
class StringMask {
  /**
   * Mask the given string with the given mask according to BBj rules
   *
   * @param {String} str the string to mask
   * @param {String} mask the mask to use for formatting
   *
   * @returns {String} the masked string
   */
  static mask(str, mask) {
    str = String(str)
    mask = String(mask)
    const maskLen = mask.length
    const strLen = str.length

    if (strLen > maskLen) return str // friendly silent fail

    const result = new Array(maskLen)
    let strPos = 0 // to keep track of the current position in the str
    let maskByte = ''
    let strByte = ''

    for (let i = 0; i < maskLen; i++) {
      maskByte = mask.charAt(i)
      strByte = str.charAt(strPos)
      switch (maskByte) {
        case 'X': // match any character
          result[i] = strPos < strLen ? strByte : ' '
          ++strPos
          break

        case 'A': // match letter; force upper case
          result[i] =
            strPos < strLen && (isLowerCase(strByte) || isUpperCase(strByte))
              ? strByte.toUpperCase() // force upper case
              : ' '
          ++strPos
          break

        case 'a': // match letter
          result[i] =
            strPos < strLen && (isLowerCase(strByte) || isUpperCase(strByte))
              ? strByte
              : ' '
          ++strPos
          break
        case '0': // match digit
          result[i] =
            strPos < strLen && isNumberRegex.test(strByte) ? strByte : ' '
          ++strPos
          break
        case 'Z': // match letter or digit; force upper case
          result[i] =
            strPos < strLen &&
            (isNumberRegex.test(strByte) ||
              isLowerCase(strByte) ||
              isUpperCase(strByte))
              ? strByte.toUpperCase() // force upper case
              : ' '
          ++strPos
          break
        case 'z': // match letter or digit
          result[i] =
            strPos < strLen &&
            (isNumberRegex.test(strByte) ||
              isLowerCase(strByte) ||
              isUpperCase(strByte))
              ? strByte
              : ' '
          ++strPos
          break
        case 'U': // match letter (force upper case), digit, whitespace or punctuation.
          if (isLowerCase(strByte)) {
            result[i] = strByte.toUpperCase()
          } else if (
            isUpperCase(strByte) ||
            isNumberRegex.test(strByte) ||
            isWhitespaceRegex.test(strByte) ||
            punctuationList.indexOf(strByte) > -1
          ) {
            result[i] = strByte
          } else {
            result[i] = ' '
          }
          ++strPos
          break
        default:
            result[i] = maskByte
          break
      }
    }

    return result.join('')
  }
}

export default StringMask
