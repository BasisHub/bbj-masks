/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/** 
 * DateMask
 * 
 * Handle BBj dates masking 
 * 
 * @author Hyyan Abo Fakher <habofakher@basis.com>
*/
export class DateMask {

  /** 
   * Mask date
   * 
   * Mask the passed date with the passed mask
   * 
   * @param {String} date date as a string
   * @param {String} mask mask as a string
   * 
   * @return {String} a date masked witht the given mask
   */
  maskDate(date, mask) {

    if (!date || !mask) throw new Error('Missing date/mask');

    const dateDetails = this._parseDate(date);
    const translations = this._buildTransilation(dateDetails);

    let result = mask;
    for (var k in translations) {
      result = result.replace(
        new RegExp('(%' + k + ')', 'g'),
        translations[k]
      );
    }

    return result;
  }

  /**
   * Parse the passed date string adn return its detilas
   * 
   * @param {String} date date as a string
   * 
   * @return {Object} 
   */
  _parseDate(date) {

    const dateObject = new Date(date);

    const hours24 = dateObject.getHours();
    let hours12 = hours24 - 12;
    hours12 = hours12 <= 12 ? hours12 : hours24;
    hours12 = hours12 == 0 ? 12 : hours12;

    const dayOfYear = this._getDayOfYear(date);
    // const dayOfWeek = dateObject.getDay() ?

    return {
      "year": dateObject.getFullYear(),
      "month": dateObject.getMonth() + 1,
      "day": dateObject.getDate(),
      "minutes": dateObject.getMinutes(),
      "seconds": dateObject.getSeconds(),
      "hours24": hours24,
      "hours12": hours12,
      "dayOfYear" : dayOfYear,
      "dayOfWeek" : dateObject.getDay() + 1  // Sunday = 1 in BBj but Sunday = 0 in JS
    };
  }

  /**
   * Get a map object which contains all possible forms of masks
   * 
   * @param {Object} dateDetails date details built by `_parseDate`
   * 
   * @return {Object} forms masks
   */
  _buildTransilation(dateDetails) {

    return {

      // year 
      "Yz": dateDetails.year.toString().substr(-2),
      "Ys": dateDetails.year,
      "Yl": dateDetails.year,
      "Yp": String.fromCharCode(dateDetails.year),
      "Yd": dateDetails.year,
      "Y": dateDetails.year,

      // month
      "Mz": String(dateDetails.month).length == 1 ? "0" + dateDetails.month : dateDetails.month,
      "Ms": dateDetails.month,
      "Ml": dateDetails.month,
      "Mp": String.fromCharCode(dateDetails.month),
      "Md": dateDetails.month,
      "M": dateDetails.month,

      // day
      "Dz": String(dateDetails.day).length == 1 ? "0" + dateDetails.day : dateDetails.day,
      "Ds": dateDetails.day,
      "Dl": dateDetails.day,
      "Dp": String.fromCharCode(dateDetails.day),
      "Dd": dateDetails.day,
      "D": dateDetails.day,

      // hour 24
      "Hz": String(dateDetails.hours24).length == 1 ? "0" + dateDetails.hours24 : dateDetails.hours24,
      "Hs": dateDetails.hours24,
      "Hl": dateDetails.hours24,
      "Hp": String.fromCharCode(dateDetails.hours24),
      "Hd": dateDetails.hours24,
      "H": dateDetails.hours24,

      // hour 12
      "hz": String(dateDetails.hours12).length == 1 ? "0" + dateDetails.hours12 : dateDetails.hours12,
      "hs": dateDetails.hours12,
      "hl": dateDetails.hours12,
      "hp": String.fromCharCode(dateDetails.hours12),
      "hd": dateDetails.hours12,
      "h": dateDetails.hours12,

      // minutes
      "mz": String(dateDetails.minutes).length == 1 ? "0" + dateDetails.minutes : dateDetails.minutes,
      "ms": dateDetails.minutes,
      "ml": dateDetails.minutes,
      "mp": String.fromCharCode(dateDetails.minutes),
      "md": dateDetails.minutes,
      "m": dateDetails.minutes,

      // seconds
      "sz": String(dateDetails.seconds).length == 1 ? "0" + dateDetails.seconds : dateDetails.seconds,
      "ss": dateDetails.seconds,
      "sl": dateDetails.seconds,
      "sp": String.fromCharCode(dateDetails.seconds),
      "sd": dateDetails.seconds,
      "s": dateDetails.seconds,

      // AM , PM
      "PP": dateDetails.hours24 > 12 ? "PM" : "PM",
      "P": dateDetails.hours24 > 12 ? "PM" : "AM",
      "pp": dateDetails.hours24 > 12 ? "pm" :"am",
      "p": dateDetails.hours24 > 12 ? "pm" :"am",

      // Day of Year
      "Jz": String(dateDetails.dayOfYear).length == 1 ? "0" + dateDetails.dayOfYear : dateDetails.dayOfYear,
      "Js": dateDetails.dayOfYear,
      "Jl": dateDetails.dayOfYear,
      "Jd": dateDetails.dayOfYear,
      "J": dateDetails.dayOfYear,

      // Day Of Week 
      "Wz": String(dateDetails.dayOfWeek).length == 1 ? "0" + dateDetails.dayOfWeek : dateDetails.dayOfWeek,
      "Ws": dateDetails.dayOfWeek,
      "Wl": dateDetails.dayOfWeek,
      "Wp": String.fromCharCode(dateDetails.dayOfWeek),
      "Wd": dateDetails.dayOfWeek,
      "W": dateDetails.dayOfWeek,
    };
  }

  /**
   * Get the Day number within the year (1-366).
   * 
   * @param {String} date date as a string
   * 
   * @returns {Number}
   */
  _getDayOfYear(date) {

    const now = new Date(date);
    const start = new Date(now.getFullYear(), 0, 0);

    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);

    return day;
  }
}
