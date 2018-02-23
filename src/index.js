/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


import NumberMask from 'number-format.js/lib/format.js';
import { default as DateMask } from './modules/DateMask.js';


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
export function number(number, mask) {
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
export function date(date, mask) {
    return new DateMask().maskDate(date, mask);
}
