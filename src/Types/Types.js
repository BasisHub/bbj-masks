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
   * Mask a number according to bbj masking rules
   *
   * @param {Number} number the number to format
   * @param {String} mask the mask to use
   * @param {String} groupingSeparator a char which will be used as a grouping separator
   * @param {String} decimalSeparator a char which will be used as a decimal separator
   *
   * @return {String} number masked with the given mask
   */
  static number(number, mask, groupingSeparator = ',', decimalSeparator = '.') {
    return NumberMask.mask(number, mask, groupingSeparator, decimalSeparator)
  }

  /**
   * Mask a date according to bbj masking rules
   *
   * @param {String} date date as a string
   * @param {String} mask mask as a string
   * @param {String} locale the language to use ex(en-US). default is to the system language
   * @param {String} timezone the time zone descriptor (e.g. America/Los_Angeles). default to the system
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
   *
   * @returns {String} the masked string
   */
  static string(str, mask) {
    return StringMask.mask(str, mask)
  }
}

export default Types
