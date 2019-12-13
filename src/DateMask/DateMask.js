/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { utcToZonedTime } from 'date-fns-tz'
import { getWeekStartByLocale } from 'weekstart'

const ASCII_CHARS = /[^\x20-\x7E]/g

const getDayOfYear = date => {
  const start = new Date(date.getFullYear(), 0, 0)

  const diff =
    date -
    start +
    (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000
  const oneDay = 1000 * 60 * 60 * 24
  const day = Math.floor(diff / oneDay)

  return day
}

const getWeekNumber = function(date, weekStart) {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  )
  const dayNum = d.getUTCDay() - (weekStart - 1) || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
}

/**
 * DateMask
 *
 * A javascript implementation for BBj dates masking
 *
 * @author Hyyan Abo Fakher <habofakher@basis.com>
 */
class DateMask {
  /**
   * Mask date
   *
   * Mask the passed date with the passed mask
   *
   * @param {String} date date as a string
   * @param {String} mask mask as a string
   * @param {String} locale the language to use ex(en-US). default is to the system language
   * @param {String} timezone the time zone descriptor (e.g. America/Los_Angeles). default to the system
   *                          timezone
   *
   * @return {String} a date masked with the given mask
   */
  static mask(date, mask, locale, timezone) {
    if (!date) return ''
    if (!mask) return date

    timezone = timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
    locale = locale || Intl.DateTimeFormat().resolvedOptions().locale || 'en-US'

    // check time
    if (
      /^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)$/.test(
        date
      )
    ) {
      date = `1970-01-01T${date}`
    }

    const dateObject = utcToZonedTime(date, timezone)
    const translation = DateMask._buildTranslation({
      year: dateObject.getFullYear(),
      month: dateObject.getMonth() + 1,
      monthShort: new Intl.DateTimeFormat([locale], { month: 'short' })
        .format(dateObject)
        .replace(ASCII_CHARS, ''),
      monthLong: new Intl.DateTimeFormat([locale], { month: 'long' })
        .format(dateObject)
        .replace(ASCII_CHARS, ''),
      day: dateObject.getDate(),
      dayShort: new Intl.DateTimeFormat([locale], { weekday: 'short' })
        .format(dateObject)
        .replace(ASCII_CHARS, ''),
      dayLong: new Intl.DateTimeFormat([locale], { weekday: 'long' })
        .format(dateObject)
        .replace(ASCII_CHARS, ''),
      minutes: dateObject.getMinutes(),
      seconds: dateObject.getSeconds(),
      get hours24() {
        return dateObject.getHours()
      },
      get hours12() {
        return this.hours24 % 12 || 12
      },
      dayOfYear: getDayOfYear(dateObject),
      dayOfWeek: dateObject.getDay() + 1, // Sunday = 1 in BBj but Sunday = 0 in JS
      weekNumber: getWeekNumber(dateObject, getWeekStartByLocale(locale)),
      locale,
      timezone
    })

    let result = mask
    for (var k in translation) {
      result = result.replace(new RegExp('(%' + k + ')', 'g'), translation[k])
    }

    return result
  }

  /**
   * Get a map object which contains all possible forms of masks
   *
   * @param {Object} dateDetails date
   *
   * @return {Object} forms masks
   */
  static _buildTranslation(dateDetails) {
    return {
      // year
      Yz: dateDetails.year.toString().substr(-2),
      Ys: dateDetails.year,
      Yl: dateDetails.year,
      Yp: String.fromCharCode(dateDetails.year),
      Yd: dateDetails.year,
      Y: dateDetails.year,

      // month
      Mz:
        String(dateDetails.month).length == 1
          ? '0' + dateDetails.month
          : dateDetails.month,
      Ms: dateDetails.monthShort,
      Ml: dateDetails.monthLong,
      Mp: String.fromCharCode(dateDetails.month),
      Md: dateDetails.month,
      M: dateDetails.month,

      // day
      Dz:
        String(dateDetails.day).length == 1
          ? '0' + dateDetails.day
          : dateDetails.day,
      Ds: dateDetails.dayShort,
      Dl: dateDetails.dayLong,
      Dp: String.fromCharCode(dateDetails.day),
      Dd: dateDetails.day,
      D: dateDetails.day,

      // hour 24
      Hz:
        String(dateDetails.hours24).length == 1
          ? '0' + dateDetails.hours24
          : dateDetails.hours24,
      Hs: dateDetails.hours24,
      Hl: dateDetails.hours24,
      Hp: String.fromCharCode(dateDetails.hours24),
      Hd: dateDetails.hours24,
      H: dateDetails.hours24,

      // hour 12
      hz:
        String(dateDetails.hours12).length == 1
          ? '0' + dateDetails.hours12
          : dateDetails.hours12,
      hs: dateDetails.hours12,
      hl: dateDetails.hours12,
      hp: String.fromCharCode(dateDetails.hours12),
      hd: dateDetails.hours12,
      h: dateDetails.hours12,

      // minutes
      mz:
        String(dateDetails.minutes).length == 1
          ? '0' + dateDetails.minutes
          : dateDetails.minutes,
      ms: dateDetails.minutes,
      ml: dateDetails.minutes,
      mp: String.fromCharCode(dateDetails.minutes),
      md: dateDetails.minutes,
      m: dateDetails.minutes,

      // seconds
      sz:
        String(dateDetails.seconds).length == 1
          ? '0' + dateDetails.seconds
          : dateDetails.seconds,
      ss: dateDetails.seconds,
      sl: dateDetails.seconds,
      sp: String.fromCharCode(dateDetails.seconds),
      sd: dateDetails.seconds,
      s: dateDetails.seconds,

      // AM , PM
      PP: dateDetails.hours24 > 12 ? 'PM' : 'PM',
      P: dateDetails.hours24 > 12 ? 'PM' : 'AM',
      pp: dateDetails.hours24 > 12 ? 'pm' : 'am',
      p: dateDetails.hours24 > 12 ? 'pm' : 'am',

      // Day of Year
      Jz:
        String(dateDetails.dayOfYear).length == 1
          ? '0' + dateDetails.dayOfYear
          : dateDetails.dayOfYear,
      Js: dateDetails.dayOfYear,
      Jl: dateDetails.dayOfYear,
      Jd: dateDetails.dayOfYear,
      J: dateDetails.dayOfYear,

      // Day Of Week
      Wz:
        String(dateDetails.dayOfWeek).length == 1
          ? '0' + dateDetails.dayOfWeek
          : dateDetails.dayOfWeek,
      Ws: dateDetails.dayOfWeek,
      Wl: dateDetails.dayOfWeek,
      Wp: String.fromCharCode(dateDetails.dayOfWeek),
      Wd: dateDetails.dayOfWeek,
      W: dateDetails.dayOfWeek,

      // week number
      wz:
        String(dateDetails.weekNumber).length == 1
          ? '0' + dateDetails.weekNumber
          : dateDetails.weekNumber,
      ws: dateDetails.weekNumber,
      wl: dateDetails.weekNumber,
      wp: String.fromCharCode(dateDetails.weekNumber),
      wd: dateDetails.weekNumber,
      w: dateDetails.weekNumber
    }
  }
}

export default DateMask
