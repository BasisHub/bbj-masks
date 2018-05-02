/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import NumberMask from './NumberMask.js';
import DateMask from './DateMask.js';

/** 
 * Types
 * 
 * Handle BBj masking 
 * 
 * @author Hyyan Abo Fakher <habofakher@basis.com>
*/
export default class Types {

  /**
   * Mask a number according to bbj masking rules 
   * 
   * @param {Number} number the number to format
   * @param {String} mask the mask to use 
   * 
   * @return {String} number masked with the given mask
   */
  static number(number, mask) {
    return NumberMask.maskNumber(number,mask);
  }

  /**
   * Mask a date according to bbj masking rules 
   * 
   * @param {String} number the date to format
   * @param {String} mask the mask to use 
   * 
   * @return {String} number masked with the given mask
   */
  static date(date, mask) {
    return DateMask.maskDate(date, mask);
  }

}