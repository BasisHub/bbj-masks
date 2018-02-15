/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import * as NumberMask from 'number-format.js/lib/format.js';
import {DateMask} from './DateMask.js';

/** 
 * Masks
 * 
 * Handle BBj dates and number masking 
 * 
 * @author Hyyan Abo Fakher <habofakher@basis.com>
*/
export class Masks {

  /**
   * Mask a number according to bbj masking rules 
   * 
   * @param {Number} number the number to format
   * @param {String} mask the mask to use 
   * 
   * @return {String} number masked with the given mask
   * 
   * {@link https://github.com/Mottie/javascript-number-formatter}
   */
  static maskNumber(number, mask) {
    return NumberMask(mask, number);
  }

  /**
   * Mask a date according to bbj masking rules 
   * 
   * @param {String} number the date to format
   * @param {String} mask the mask to use 
   * 
   * @return {String} number masked with the given mask
   */
  static maskDate(date, mask) {
    return new DateMask().maskDate(date, mask);
  }
};
