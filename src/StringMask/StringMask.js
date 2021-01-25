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

const passOrThrowError = (loose, ret, i, str) => {
  if (!loose) {
    const char = str.charAt(i)
    const pos = i + 1
    throw {
      name: 'StringMaskError',
      message: `StringMaskError: error applying mask at position "${pos}" , char "${char}"`,
      pos,
      char
    }
  } else ret[i] = ' '
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
   * @param {Boolean} [loose=true] when true , errors will be ignored and the method will try at apply the mask
   *                anyway , otherwise it will stop at first error and throw it.
   * 
   * @throws {MaskIsTooShortError}
   * @throws {StringMaskError}
   * @throws {MaskError}
   * 
   * @returns {String} the masked string
   */
  static mask(str, mask, loose = true) {
    str = String(str)
    mask = String(mask)
    const maskLen = mask.length
    const strLen = str.length

    if (strLen > maskLen) {
      if (loose) return str
      // friendly silent fail
      else
        throw {
          name: 'MaskIsTooShortError',
          message: `MaskIsTooShortError: Mask is shorter than the passed string`
        }
    }

    const ret = new Array(maskLen)
    let pos = 0 // to keep track of the current position in the str
    let maskByte = ''

    for (let i = 0; i < maskLen; i++) {
      maskByte = mask.charAt(i)
      switch (maskByte) {
        case 'X': // match any character
          ret[i] = pos < strLen ? str.charAt(pos) : ' '
          ++pos
          break

        case 'A': // match letter; force upper case
          if (pos < strLen) {
            const byte = str.charAt(pos)
            if (isUpperCase(byte)) ret[i] = byte
            else if (isLowerCase(byte)) ret[i] = byte.toUpperCase()
            else passOrThrowError(loose, ret, i, str)
          } else ret[i] = ' '
          ++pos
          break

        case 'a': // match letter
          if (pos < strLen) {
            const byte = str.charAt(pos)
            if (isUpperCase(byte) || isLowerCase(byte)) ret[i] = byte
            else passOrThrowError(loose, ret, i, str)
          } else ret[i] = ' '
          ++pos
          break
        case '0': // match digit
          if (pos < strLen) {
            const byte = str.charAt(pos)
            if (isNumberRegex.test(byte)) ret[i] = byte
            else passOrThrowError(loose, ret, i, str)
          } else ret[i] = ' '
          ++pos
          break
        case 'Z': // match letter or digit; force upper case
          if (pos < strLen) {
            const byte = str.charAt(pos)
            if (isUpperCase(byte) || isNumberRegex.test(byte)) ret[i] = byte
            else if (isLowerCase(byte)) ret[i] = byte.toUpperCase()
            else passOrThrowError(loose, ret, i, str)
          } else ret[i] = ' '
          ++pos
          break
        case 'z': // match letter or digit
          if (pos < strLen) {
            const byte = str.charAt(pos)
            if (
              isUpperCase(byte) ||
              isLowerCase(byte) ||
              isNumberRegex.test(byte)
            )
              ret[i] = byte
            else passOrThrowError(loose, ret, i, str)
          } else ret[i] = ' '
          ++pos
          break

          break
        case 'U': // match letter (force upper case), digit, whitespace or punctuation.
          if (pos < strLen) {
            const byte = str.charAt(pos)
            if (isLowerCase(byte)) ret[i] = byte.toUpperCase()
            else if (
              isUpperCase(byte) ||
              isNumberRegex.test(byte) ||
              isWhitespaceRegex.test(byte) ||
              punctuationList.indexOf(byte) > -1
            )
              ret[i] = byte
            else passOrThrowError(loose, ret, i, str)
          } else ret[i] = ' '
          ++pos
          break
        default:
          ret[i] = maskByte
          break
      }
    }

    if (pos < strLen) {
      if (!loose) {
        throw { name: 'MaskError', message: 'Mask cannot be applied' }
      }
    }

    return ret.join('')
  }
}

export default StringMask
