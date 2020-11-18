/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import NumberMask from '../NumberMask'
import DateMask from '../DateMask'
import StringMask from '../StringMask'

/**
 * Types
 *
 * BBj masks factory
 *
 * @author Hyyan Abo Fakher <habofakher@basis.com>
 */
class Types {
  /**
   * Mask the given number with the given mask according to BBj rules
   *
   * @param {Number} number the number to format
   * @param {String} mask the mask to use for formatting
   * @param {String} [groupingSeparator=,] - a char which will be used as a grouping separator
   * @param {String} [decimalSeparator=.]  - a char which will be used as a decimal separator
   * @param {Boolean} [forceTrailingZeros=false] - Affects the output by switching the way a mask with "#" characters in the trailing positions is filled.
   *                                              for example, the function `NumberMask.mask(.10:"#.##")` returns ` .10` instead of ` .1 `
   * @param {Boolean} [loose=true] when true , errors will be ignored and the method will try at apply the mask
   *                anyway , otherwise it will stop at first error and throw it.
   * @param {Boolean} [ignoreFillChar=false] - when true , then the fill char will always be an empty space 
   *                                         event if the mask start with a `*` 
   * @param {Boolean} [trimSpaces=false] - When true , the final masked value will not contain any spaces 
   * @param {Boolean} [floatSpecialChars=true] - When true , then if any of  "-", "+", "$", and "(".  characters 
   *                                            is present in the mask, the first one encountered will be moved
   *                                            to the last position where a "#" or "," was replaced by the fill
   *                                            character. If no such position exists, the float character is 
   *                                            left where it
   *
   * @throws {MaskError} only if loose is disabled
   * 
   * @returns {String} the masked number
   */
  static number(
    number,
    mask,
    groupingSeparator = ',',
    decimalSeparator = '.',
    forceTrailingZeros = false,
    loose = true,
    ignoreFillChar = false,
    trimSpaces = false,
    floatSpecialChars = true
  ) {
    return NumberMask.mask(
      number,
      mask,
      groupingSeparator,
      decimalSeparator,
      forceTrailingZeros,
      loose,
      ignoreFillChar,
      trimSpaces,
      floatSpecialChars
    )
  }

  /**
   * Mask a date according to bbj masking rules
   *
   * @param {String} date date as a string
   * @param {String} mask mask as a string
   * @param {String} [locale=Browser's locale] the language to use ex(en-US). default is to the system language
   * @param {String} [timezone=System timezone] the time zone descriptor (e.g. America/Los_Angeles). default to the system
   *                          timezone
   *
   * @return {String} number masked with the given mask
   */
  static date(date, mask, locale, timezone) {
    return DateMask.mask(date, mask, locale, timezone)
  }

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
  static string(str, mask, loose = true) {
    return StringMask.mask(str, mask, loose)
  }
}

export default Types
