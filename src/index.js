/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import NumberMask from './NumberMask'
import {
  getDayOfYear,
  getWeekNumber,
  getWeekStartByLocale,
  default as DateMask
} from './DateMask'

import StringMask from './StringMask'
import Types from './Types'

const Utils = {
  Dates: {
    getDayOfYear,
    getWeekNumber,
    getWeekStartByLocale
  }
}

export { NumberMask, DateMask, StringMask, Types, Utils }
