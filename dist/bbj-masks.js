(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("BBj", [], factory);
	else if(typeof exports === 'object')
		exports["BBj"] = factory();
	else
		root["BBj"] = root["BBj"] || {}, root["BBj"]["Masks"] = factory();
})((typeof self !== 'undefined' ? self : this), () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DateMask/DateMask.js":
/*!**********************************!*\
  !*** ./src/DateMask/DateMask.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IS_DATE_REGEX": () => (/* binding */ IS_DATE_REGEX),
/* harmony export */   "IS_TIME_REGEX": () => (/* binding */ IS_TIME_REGEX),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "fixShortISO": () => (/* binding */ fixShortISO),
/* harmony export */   "getDayOfYear": () => (/* binding */ getDayOfYear),
/* harmony export */   "getTimezoneOrOffset": () => (/* binding */ getTimezoneOrOffset),
/* harmony export */   "getWeekNumber": () => (/* binding */ getWeekNumber),
/* harmony export */   "getWeekStartByLocale": () => (/* binding */ getWeekStartByLocale)
/* harmony export */ });
/* harmony import */ var date_fns_tz_utcToZonedTime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns-tz/utcToZonedTime */ "./node_modules/date-fns-tz/utcToZonedTime/index.js");
/* harmony import */ var date_fns_tz_utcToZonedTime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(date_fns_tz_utcToZonedTime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var weekstart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! weekstart */ "./node_modules/weekstart/dist/es-module/main.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */



var IS_TIME_REGEX = /^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)$/;
var IS_DATE_REGEX = /^(([12]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?))$/;

/**
 * Find out when the first day of the week based on the passed locale
 *
 * @param {locale} locale
 *
 * @return {Number} a number 0 = sunday , 1 = monday , ....
 */
var getWeekStartByLocale = function getWeekStartByLocale(locale) {
  return (0,weekstart__WEBPACK_IMPORTED_MODULE_0__.getWeekStartByLocale)(locale);
};

/**
 *  Get day number in the year of the passed date
 *
 * @param {Date} date
 *
 * @return {Number} day number
 */
var getDayOfYear = function getDayOfYear(date) {
  var start = new Date(date.getFullYear(), 0, 0);
  var diff = date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  return day;
};

/**
 * Takes incomplete iso string and return a complete one
 *
 * @param {String} date incomplete iso string
 *
 * @return {String} complete iso string
 */
var fixShortISO = function fixShortISO(date) {
  var value = date;
  var offset = (value.match(/z$|[+\-]\d\d:\d\d$/i) || [])[0];
  if (!offset) {
    offset = 'Z';
    value += offset;
  }
  if (IS_TIME_REGEX.test(value)) {
    value = "1970-01-01T".concat(value);
  } else if (IS_DATE_REGEX.test(value)) {
    value = "".concat(value.split(offset)[0], "T00:00:00").concat(offset);
  }
  return value;
};

/**
 * Get the browser timezone name , if not supported then the browser
 * timezone offset formatted
 *
 * @return {String} timezone of offset
 */
var getTimezoneOrOffset = function getTimezoneOrOffset() {
  var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!timezone) {
    var pad = function pad(number, length) {
      var str = '' + number;
      while (str.length < length) {
        str = '0' + str;
      }
      return str;
    };
    var offset = new Date().getTimezoneOffset();
    offset = (offset < 0 ? '+' : '-') +
    // Note the reversed sign!
    pad(parseInt(Math.abs(offset / 60)), 2) + pad(Math.abs(offset % 60), 2);
    return offset;
  }
  return timezone;
};

/**
 * Get the Week Number in the passed date
 *
 * @param {Date} date - Date object
 * @param {Number} weekStart A number which defines the first day of the week (0  = sunday , 1 = monday , ...)
 *
 * @returns {Number} the week number
 */
var getWeekNumber = function getWeekNumber(date, weekStart) {
  var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  var dayNum = d.getUTCDay() - (weekStart - 1) || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

/**
 * DateMask
 *
 * A javascript implementation for BBj dates masking
 *
 * @author Hyyan Abo Fakher <habofakher@basis.com>
 */
var DateMask = /*#__PURE__*/function () {
  function DateMask() {
    _classCallCheck(this, DateMask);
  }
  _createClass(DateMask, null, [{
    key: "mask",
    value:
    /**
     * Mask date
     *
     * Mask the passed date with the passed mask
     *
     * @param {String} date date as a string
     * @param {String} mask mask as a string
     * @param {String} [locale=Browser's locale] the language to use ex(en-US). default is to the system language
     * @param {String} [timezone=System timezone] the time zone descriptor (e.g. America/Los_Angeles). default to the system
     *                          timezone
     *
     * @return {String} a date masked with the given mask
     */
    function mask(date, _mask, locale, timezone) {
      if (!date) return '';
      if (!_mask) return date;
      timezone = timezone || getTimezoneOrOffset();
      locale = locale || Intl.DateTimeFormat().resolvedOptions().locale || 'en-US';

      // make sure we have a complete iso string
      date = date instanceof Date ? date : fixShortISO(date);
      var dateObject = date_fns_tz_utcToZonedTime__WEBPACK_IMPORTED_MODULE_1___default()(date, timezone);
      var translation = DateMask._buildTranslation({
        year: dateObject.getFullYear(),
        month: dateObject.getMonth() + 1,
        monthShort: new Intl.DateTimeFormat([locale], {
          month: 'short'
        }).format(dateObject),
        monthLong: new Intl.DateTimeFormat([locale], {
          month: 'long'
        }).format(dateObject),
        day: dateObject.getDate(),
        dayShort: new Intl.DateTimeFormat([locale], {
          weekday: 'short'
        }).format(dateObject),
        dayLong: new Intl.DateTimeFormat([locale], {
          weekday: 'long'
        }).format(dateObject),
        minutes: dateObject.getMinutes(),
        seconds: dateObject.getSeconds(),
        get hours24() {
          return dateObject.getHours();
        },
        get hours12() {
          return this.hours24 % 12 || 12;
        },
        dayOfYear: getDayOfYear(dateObject),
        dayOfWeek: dateObject.getDay() + 1,
        // Sunday = 1 in BBj but Sunday = 0 in JS
        weekNumber: getWeekNumber(dateObject, getWeekStartByLocale(locale)),
        locale: locale,
        timezone: timezone
      });
      var result = _mask;
      for (var k in translation) {
        result = result.replace(new RegExp('(%' + k + ')', 'g'), translation[k]);
      }
      return result;
    }

    /**
     * Get a map object which contains all possible forms of masks
     *
     * @param {Object} dateDetails date
     *
     * @return {Object} forms masks
     */
  }, {
    key: "_buildTranslation",
    value: function _buildTranslation(dateDetails) {
      return {
        // year
        Yz: dateDetails.year.toString().substr(-2),
        Ys: dateDetails.year,
        Yl: dateDetails.year,
        Yp: String.fromCharCode(dateDetails.year),
        Yd: dateDetails.year,
        Y: dateDetails.year,
        // month
        Mz: String(dateDetails.month).length == 1 ? '0' + dateDetails.month : dateDetails.month,
        Ms: dateDetails.monthShort,
        Ml: dateDetails.monthLong,
        Mp: String.fromCharCode(dateDetails.month),
        Md: dateDetails.month,
        M: dateDetails.month,
        // day
        Dz: String(dateDetails.day).length == 1 ? '0' + dateDetails.day : dateDetails.day,
        Ds: dateDetails.dayShort,
        Dl: dateDetails.dayLong,
        Dp: String.fromCharCode(dateDetails.day),
        Dd: dateDetails.day,
        D: dateDetails.day,
        // hour 24
        Hz: String(dateDetails.hours24).length == 1 ? '0' + dateDetails.hours24 : dateDetails.hours24,
        Hs: dateDetails.hours24,
        Hl: dateDetails.hours24,
        Hp: String.fromCharCode(dateDetails.hours24),
        Hd: dateDetails.hours24,
        H: dateDetails.hours24,
        // hour 12
        hz: String(dateDetails.hours12).length == 1 ? '0' + dateDetails.hours12 : dateDetails.hours12,
        hs: dateDetails.hours12,
        hl: dateDetails.hours12,
        hp: String.fromCharCode(dateDetails.hours12),
        hd: dateDetails.hours12,
        h: dateDetails.hours12,
        // minutes
        mz: String(dateDetails.minutes).length == 1 ? '0' + dateDetails.minutes : dateDetails.minutes,
        ms: dateDetails.minutes,
        ml: dateDetails.minutes,
        mp: String.fromCharCode(dateDetails.minutes),
        md: dateDetails.minutes,
        m: dateDetails.minutes,
        // seconds
        sz: String(dateDetails.seconds).length == 1 ? '0' + dateDetails.seconds : dateDetails.seconds,
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
        Jz: String(dateDetails.dayOfYear).length == 1 ? '0' + dateDetails.dayOfYear : dateDetails.dayOfYear,
        Js: dateDetails.dayOfYear,
        Jl: dateDetails.dayOfYear,
        Jd: dateDetails.dayOfYear,
        J: dateDetails.dayOfYear,
        // Day Of Week
        Wz: String(dateDetails.dayOfWeek).length == 1 ? '0' + dateDetails.dayOfWeek : dateDetails.dayOfWeek,
        Ws: dateDetails.dayOfWeek,
        Wl: dateDetails.dayOfWeek,
        Wp: String.fromCharCode(dateDetails.dayOfWeek),
        Wd: dateDetails.dayOfWeek,
        W: dateDetails.dayOfWeek,
        // week number
        wz: String(dateDetails.weekNumber).length == 1 ? '0' + dateDetails.weekNumber : dateDetails.weekNumber,
        ws: dateDetails.weekNumber,
        wl: dateDetails.weekNumber,
        wp: String.fromCharCode(dateDetails.weekNumber),
        wd: dateDetails.weekNumber,
        w: dateDetails.weekNumber
      };
    }
  }]);
  return DateMask;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DateMask);

/***/ }),

/***/ "./src/DateMask/index.js":
/*!*******************************!*\
  !*** ./src/DateMask/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IS_DATE_REGEX": () => (/* reexport safe */ _DateMask__WEBPACK_IMPORTED_MODULE_0__.IS_DATE_REGEX),
/* harmony export */   "IS_TIME_REGEX": () => (/* reexport safe */ _DateMask__WEBPACK_IMPORTED_MODULE_0__.IS_TIME_REGEX),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "fixShortISO": () => (/* reexport safe */ _DateMask__WEBPACK_IMPORTED_MODULE_0__.fixShortISO),
/* harmony export */   "getDayOfYear": () => (/* reexport safe */ _DateMask__WEBPACK_IMPORTED_MODULE_0__.getDayOfYear),
/* harmony export */   "getTimezoneOrOffset": () => (/* reexport safe */ _DateMask__WEBPACK_IMPORTED_MODULE_0__.getTimezoneOrOffset),
/* harmony export */   "getWeekNumber": () => (/* reexport safe */ _DateMask__WEBPACK_IMPORTED_MODULE_0__.getWeekNumber),
/* harmony export */   "getWeekStartByLocale": () => (/* reexport safe */ _DateMask__WEBPACK_IMPORTED_MODULE_0__.getWeekStartByLocale)
/* harmony export */ });
/* harmony import */ var _DateMask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DateMask */ "./src/DateMask/DateMask.js");
/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_DateMask__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/NumberMask/NumberMask.js":
/*!**************************************!*\
  !*** ./src/NumberMask/NumberMask.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
/**
 * NumberMask
 *
 * A javascript implementation for BBj numbers masking
 *
 * @author Hyyan Abo Fakher <habofakher@basis.com>
 */
var NumberMask = /*#__PURE__*/function () {
  function NumberMask() {
    _classCallCheck(this, NumberMask);
  }
  _createClass(NumberMask, null, [{
    key: "mask",
    value:
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
    function mask(number, _mask) {
      var groupingSeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ',';
      var decimalSeparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.';
      var forceTrailingZeros = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var loose = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
      var ignoreFillChar = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var trimSpaces = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
      var floatSpecialChars = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : true;
      var groupingSeparatorPlaceholder = '__GROUPING__SEPARATOR__PLACEHOLDER__';
      var decimalSeparatorPlaceholder = '__DECIMAL__SEPARATOR__PLACEHOLDER__';
      var maskLen = _mask.length;
      if (0 === maskLen) {
        if (loose) return str;
        // friendly silent fail
        else throw {
          name: 'MaskError',
          message: "MaskError: Mask is empty"
        };
      }

      // Get magnitude and precision of MASK
      var maskBeforeDecimal = 0;
      var maskAfterDecimal = 0;
      var foundDecimal = false;
      for (var i = 0; i < maskLen; ++i) {
        var m = _mask.charAt(i);
        if (m == '0' || m == '#') {
          if (foundDecimal) ++maskAfterDecimal;else ++maskBeforeDecimal;
        } else if (m == '.') foundDecimal = true;
      }
      var num = NumberMask._round(number, maskAfterDecimal);
      var bytes = NumberMask._toCharArray(num);

      // Get magnitude and precision of NUMBER
      var inLen = bytes.length;
      var numBeforeDecimal = 0;
      var numAfterDecimal = 0;
      foundDecimal = false;
      for (var _i = 0; _i < inLen; ++_i) {
        if (bytes[_i] == '.') foundDecimal = true;else {
          if (foundDecimal) ++numAfterDecimal;else ++numBeforeDecimal;
        }
      }

      // always ignore mask overflow
      if (numBeforeDecimal > maskBeforeDecimal) {
        if (loose) return number.toString();
        // friendly silent fail
        else throw {
          name: 'MaskError',
          message: "MaskError: Number is too large for mask"
        };
      }

      // round if mask is for a lower precision number
      if (numAfterDecimal > maskAfterDecimal) {
        num = NumberMask._round(num, maskAfterDecimal);
        bytes = NumberMask._toCharArray(num);
        inLen = bytes.length;

        // Get new magnitude and precision of NUMBER
        numBeforeDecimal = 0;
        numAfterDecimal = 0;
        foundDecimal = false;
        for (var _i2 = 0; _i2 < inLen; ++_i2) {
          if (bytes[_i2] == '.') foundDecimal = true;else {
            if (foundDecimal) ++numAfterDecimal;else ++numBeforeDecimal;
          }
        }

        // always ignore mask overflow
        if (numBeforeDecimal > maskBeforeDecimal) {
          if (loose) return number.toString();
          // friendly silent fail
          else throw {
            name: 'MaskError',
            message: "MaskError: Number is too large for mask"
          };
        }
      }
      var fillByte = ' ',
        floatByte = ' ';
      var inPos = 0,
        outPos = 0,
        floatPos = 0;
      if (_mask.charAt(0) == '*' && ignoreFillChar === false) fillByte = '*';
      var fillInit = fillByte;
      var isNegative = NumberMask._getSign(num) < 0;
      var emitDecimal = inLen > 0 || _mask.indexOf('0') >= 0;
      var foundZero = false;
      var foundDigit = false;
      foundDecimal = false;
      var ret = new Array(maskLen);
      for (var maskPos = 0; maskPos < maskLen; ++maskPos) {
        var _m = _mask.charAt(maskPos);
        switch (_m) {
          case '0':
            --maskBeforeDecimal;
            if (maskBeforeDecimal < numBeforeDecimal && inPos < inLen) {
              ret[outPos] = bytes[inPos];
              ++inPos;
              foundDigit = true;
            } else {
              ret[outPos] = '0';
              foundZero = true;
            }
            ++outPos;
            break;
          case '#':
            --maskBeforeDecimal;
            if (maskBeforeDecimal < numBeforeDecimal && inPos < inLen) {
              ret[outPos] = bytes[inPos];
              ++inPos;
              foundDigit = true;
            } else {
              ret[outPos] = foundDecimal && forceTrailingZeros && NumberMask._getSign(num) != 0 ? '0' : fillByte;
              if (!foundDecimal) floatPos = maskPos;
            }
            ++outPos;
            break;
          case ',':
            if (foundZero || inPos > 0) ret[outPos] = groupingSeparatorPlaceholder;else {
              ret[outPos] = fillByte;
              if (!foundDecimal) floatPos = maskPos;
            }
            ++outPos;
            break;
          case '-':
            if (!foundDigit && floatByte == ' ' && floatSpecialChars) {
              if (isNegative) floatByte = '-';
              ret[outPos] = fillByte;
              floatPos = foundDecimal ? -1 : maskPos;
            } else ret[outPos] = isNegative ? '-' : fillByte;
            ++outPos;
            break;
          case '+':
            if (!foundDigit && floatByte == ' ' && floatSpecialChars) {
              floatByte = isNegative ? '-' : '+';
              ret[outPos] = fillByte;
              floatPos = foundDecimal ? -1 : maskPos;
            } else ret[outPos] = isNegative ? '-' : '+';
            ++outPos;
            break;
          case '$':
            if (!foundDigit && floatByte == ' ' && floatSpecialChars) {
              floatByte = '$';
              ret[outPos] = fillByte;
              floatPos = foundDecimal ? -1 : maskPos;
            } else {
              ret[outPos] = '$';
            }
            // ret[outPos] = '$'
            ++outPos;
            break;
          case '(':
            if (!foundDigit && floatByte == ' ' && floatSpecialChars) {
              if (isNegative) floatByte = '(';
              ret[outPos] = fillByte;
              floatPos = foundDecimal ? -1 : maskPos;
            } else {
              if (isNegative) {
                ret[outPos] = '(';
              } else {
                ret[outPos] = foundDecimal ? ' ' : fillByte;
              }
            }

            // if(floatSpecialChars) {
            //   if (!foundDigit && (floatByte == ' ')) {
            //     if (isNegative) floatByte = '('
            //     ret[outPos] = fillByte
            //     floatPos = foundDecimal ? -1 : maskPos
            //   } else {
            //     if (isNegative) {
            //       ret[outPos] = '('
            //     } else {
            //       ret[outPos] = foundDecimal ? ' ' : fillByte
            //     }
            //   }
            // } else {
            //   ret[outPos] = '('
            // }

            ++outPos;
            break;
          case ')':
            if (isNegative) {
              ret[outPos] = ')';
            } else {
              ret[outPos] = foundDecimal ? ' ' : fillByte;
            }

            // if(floatSpecialChars) {
            //   if (isNegative) {
            //     ret[outPos] = ')'
            //   } else {
            //     ret[outPos] = foundDecimal ? ' ' : fillByte
            //   }
            // } else {
            //   ret[outPos] = ')'
            // }

            ++outPos;
            break;
          case 'C':
            if (maskPos < maskLen - 1 && _mask.charAt(maskPos + 1) == 'R') {
              if (isNegative) {
                ret[outPos] = 'C';
                ret[outPos + 1] = 'R';
              } else {
                ret[outPos] = ' ';
                ret[outPos + 1] = ' ';
              }
              outPos += 2;
              ++maskPos;
            } else {
              ret[outPos] = 'C';
              ++outPos;
            }
            break;
          case 'D':
            if (maskPos < maskLen - 1 && _mask.charAt(maskPos + 1) == 'R') {
              if (isNegative) {
                ret[outPos] = 'C';
                ret[outPos + 1] = 'R';
              } else {
                ret[outPos] = 'D';
                ret[outPos + 1] = 'R';
              }
              outPos += 2;
              ++maskPos;
            } else {
              ret[outPos] = 'D';
              ++outPos;
            }
            break;
          case '*':
            ret[outPos] = '*';
            ++outPos;
            break;
          case '.':
            ret[outPos] = emitDecimal ? decimalSeparatorPlaceholder : fillByte;
            fillByte = ' ';
            foundDecimal = true;
            ++inPos;
            ++outPos;
            break;
          case 'B':
            ret[outPos] = ' ';
            ++outPos;
            break;
          default:
            ret[outPos] = _m;
            ++outPos;
            break;
        }
      }
      if (floatByte != ' ') {
        if (floatPos < 0) floatPos = outPos;
        while (floatPos >= maskLen) --floatPos;
        if (ret[floatPos] == fillInit) ret[floatPos] = floatByte;
      }
      ret = ret.join('');
      if (trimSpaces) ret = ret.replace(/\s/g, '');
      ret = ret.replaceAll(groupingSeparatorPlaceholder, groupingSeparator);
      ret = ret.replaceAll(decimalSeparatorPlaceholder, decimalSeparator);
      return ret;
    }
  }, {
    key: "_shift",
    value: function _shift(number, precision, reverseShift) {
      if (reverseShift) precision = -precision;
      var numArray = ('' + number).split('e');
      return +(numArray[0] + 'e' + (numArray[1] ? +numArray[1] + precision : precision));
    }
  }, {
    key: "_round",
    value: function _round(number, precision) {
      return NumberMask._shift(Math.round(NumberMask._shift(number, precision, false)), precision, true);
    }
  }, {
    key: "_toCharArray",
    value: function _toCharArray(number) {
      var signum = NumberMask._getSign(number);
      var chars = [];
      if (signum !== 0) {
        var string = signum < 0 ? "".concat(-1 * number.toString()) : number.toString();
        if (string.length > 1 && string.charAt(0) == '0') string = string.substring(1);

        // The string contains only [0-9] and '.'
        chars = string.split('');
      }
      return chars;
    }

    /**
     * Returns the sign of a number
     *
     * @param {Number} x number
     * @returns {Number} A number representing the sign of the given argument.
     *                   If the argument is a positive number, negative number, positive zero
     *                   or negative zero, the function will return 1, -1, 0 or -0 respectively.
     *                   Otherwise, NaN is returned.
     */
  }, {
    key: "_getSign",
    value: function _getSign(x) {
      return (x > 0) - (x < 0) || +x;
    }
  }]);
  return NumberMask;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NumberMask);

/***/ }),

/***/ "./src/NumberMask/index.js":
/*!*********************************!*\
  !*** ./src/NumberMask/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _NumberMask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NumberMask */ "./src/NumberMask/NumberMask.js");
/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_NumberMask__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/StringMask/StringMask.js":
/*!**************************************!*\
  !*** ./src/StringMask/StringMask.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var isNumberRegex = /^\d+$/;
var isWhitespaceRegex = /\s/;
var punctuationList = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~';

/**
 * Check if the given string is in lower case
 *
 * @param {String} str
 */
var isLowerCase = function isLowerCase(str) {
  return str == str.toLowerCase() && str != str.toUpperCase();
};

/**
 * Check if the given string is in upper case
 *
 * @param {String} str
 */
var isUpperCase = function isUpperCase(str) {
  return str == str.toUpperCase() && str != str.toLowerCase();
};
var passOrThrowError = function passOrThrowError(loose, ret, i, str) {
  if (!loose) {
    var _char = str.charAt(i);
    var pos = i + 1;
    throw {
      name: 'StringMaskError',
      message: "StringMaskError: error applying mask at position \"".concat(pos, "\" , char \"").concat(_char, "\""),
      pos: pos,
      "char": _char
    };
  } else ret[i] = ' ';
};

/**
 * NumberMask
 *
 * A javascript implementation for BBj numbers masking
 *
 * @author Hyyan Abo Fakher <habofakher@basis.com>
 */
var StringMask = /*#__PURE__*/function () {
  function StringMask() {
    _classCallCheck(this, StringMask);
  }
  _createClass(StringMask, null, [{
    key: "mask",
    value:
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
    function mask(str, _mask) {
      var loose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      str = String(str);
      _mask = String(_mask);
      var maskLen = _mask.length;
      var strLen = str.length;
      if (strLen > maskLen) {
        if (loose) return str;
        // friendly silent fail
        else throw {
          name: 'MaskIsTooShortError',
          message: "MaskIsTooShortError: Mask is shorter than the passed string"
        };
      }
      var ret = new Array(maskLen);
      var pos = 0; // to keep track of the current position in the str
      var maskByte = '';
      for (var i = 0; i < maskLen; i++) {
        maskByte = _mask.charAt(i);
        switch (maskByte) {
          case 'X':
            // match any character
            ret[i] = pos < strLen ? str.charAt(pos) : ' ';
            ++pos;
            break;
          case 'A':
            // match letter; force upper case
            if (pos < strLen) {
              var _byte = str.charAt(pos);
              if (isUpperCase(_byte)) ret[i] = _byte;else if (isLowerCase(_byte)) ret[i] = _byte.toUpperCase();else passOrThrowError(loose, ret, i, str);
            } else ret[i] = ' ';
            ++pos;
            break;
          case 'a':
            // match letter
            if (pos < strLen) {
              var _byte2 = str.charAt(pos);
              if (isUpperCase(_byte2) || isLowerCase(_byte2)) ret[i] = _byte2;else passOrThrowError(loose, ret, i, str);
            } else ret[i] = ' ';
            ++pos;
            break;
          case '0':
            // match digit
            if (pos < strLen) {
              var _byte3 = str.charAt(pos);
              if (isNumberRegex.test(_byte3)) ret[i] = _byte3;else passOrThrowError(loose, ret, i, str);
            } else ret[i] = ' ';
            ++pos;
            break;
          case 'Z':
            // match letter or digit; force upper case
            if (pos < strLen) {
              var _byte4 = str.charAt(pos);
              if (isUpperCase(_byte4) || isNumberRegex.test(_byte4)) ret[i] = _byte4;else if (isLowerCase(_byte4)) ret[i] = _byte4.toUpperCase();else passOrThrowError(loose, ret, i, str);
            } else ret[i] = ' ';
            ++pos;
            break;
          case 'z':
            // match letter or digit
            if (pos < strLen) {
              var _byte5 = str.charAt(pos);
              if (isUpperCase(_byte5) || isLowerCase(_byte5) || isNumberRegex.test(_byte5)) ret[i] = _byte5;else passOrThrowError(loose, ret, i, str);
            } else ret[i] = ' ';
            ++pos;
            break;
            break;
          case 'U':
            // match letter (force upper case), digit, whitespace or punctuation.
            if (pos < strLen) {
              var _byte6 = str.charAt(pos);
              if (isLowerCase(_byte6)) ret[i] = _byte6.toUpperCase();else if (isUpperCase(_byte6) || isNumberRegex.test(_byte6) || isWhitespaceRegex.test(_byte6) || punctuationList.indexOf(_byte6) > -1) ret[i] = _byte6;else passOrThrowError(loose, ret, i, str);
            } else ret[i] = ' ';
            ++pos;
            break;
          default:
            ret[i] = maskByte;
            break;
        }
      }
      if (pos < strLen) {
        if (!loose) {
          throw {
            name: 'MaskError',
            message: 'Mask cannot be applied'
          };
        }
      }
      return ret.join('');
    }
  }]);
  return StringMask;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StringMask);

/***/ }),

/***/ "./src/StringMask/index.js":
/*!*********************************!*\
  !*** ./src/StringMask/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _StringMask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StringMask */ "./src/StringMask/StringMask.js");
/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_StringMask__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/Types/Types.js":
/*!****************************!*\
  !*** ./src/Types/Types.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _NumberMask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../NumberMask */ "./src/NumberMask/index.js");
/* harmony import */ var _DateMask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DateMask */ "./src/DateMask/index.js");
/* harmony import */ var _StringMask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../StringMask */ "./src/StringMask/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */





/**
 * Types
 *
 * BBj masks factory
 *
 * @author Hyyan Abo Fakher <habofakher@basis.com>
 */
var Types = /*#__PURE__*/function () {
  function Types() {
    _classCallCheck(this, Types);
  }
  _createClass(Types, null, [{
    key: "number",
    value:
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
    function number(_number, mask) {
      var groupingSeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ',';
      var decimalSeparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.';
      var forceTrailingZeros = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var loose = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
      var ignoreFillChar = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var trimSpaces = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
      var floatSpecialChars = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : true;
      return _NumberMask__WEBPACK_IMPORTED_MODULE_0__["default"].mask(_number, mask, groupingSeparator, decimalSeparator, forceTrailingZeros, loose, ignoreFillChar, trimSpaces, floatSpecialChars);
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
  }, {
    key: "date",
    value: function date(_date, mask, locale, timezone) {
      return _DateMask__WEBPACK_IMPORTED_MODULE_1__["default"].mask(_date, mask, locale, timezone);
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
  }, {
    key: "string",
    value: function string(str, mask) {
      var loose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return _StringMask__WEBPACK_IMPORTED_MODULE_2__["default"].mask(str, mask, loose);
    }
  }]);
  return Types;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Types);

/***/ }),

/***/ "./src/Types/index.js":
/*!****************************!*\
  !*** ./src/Types/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Types */ "./src/Types/Types.js");
/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Types__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds/index.js ***!
  \*****************************************************************************/
/***/ ((module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = getTimezoneOffsetInMilliseconds;

/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}

module.exports = exports.default;

/***/ }),

/***/ "./node_modules/date-fns/_lib/toInteger/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/_lib/toInteger/index.js ***!
  \*******************************************************/
/***/ ((module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = toInteger;

function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

module.exports = exports.default;

/***/ }),

/***/ "./node_modules/weekstart/dist/es-module/api.js":
/*!******************************************************!*\
  !*** ./node_modules/weekstart/dist/es-module/api.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getWeekStartByLocale": () => (/* binding */ getWeekStartByLocale),
/* harmony export */   "getWeekStartByRegion": () => (/* binding */ getWeekStartByRegion)
/* harmony export */ });
function getWeekStartByRegion(regionCode, regionDayMap) {
    var code = regionDayMap[typeof regionCode === 'string' ? regionCode.toUpperCase() : regionCode];
    return typeof code === 'number' ? code : 1;
}

function getWeekStartByLocale(locale, langRegionMap, regionDayMap) {
    if (locale) {
        var data = locale.toLowerCase().split(/[-_]/);
        var language = data[0];
        var country;
        if (data[1] && data[1].length === 4) {
            language += "_" + (data[1]);
            country = data[2];
        } else {
            country = data[1];
        }
        if (!country) {
            country = langRegionMap[language];
        }
        if (country) {
            return getWeekStartByRegion(country.match(/^\d+$/) ? Number(country) : country, regionDayMap);
        }
    }
    return 1;
}


//# sourceMappingURL=api.js.map


/***/ }),

/***/ "./node_modules/weekstart/dist/es-module/langRegionMap.js":
/*!****************************************************************!*\
  !*** ./node_modules/weekstart/dist/es-module/langRegionMap.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var langRegionMap = {
    en: 'US',
    zh: 'CN',
    zh_hans: 'CN',
    hans: 'CN',
    wuu: 'CN',
    hsn: 'CN',
    hak: 'CN',
    nan: 'CN',
    gan: 'CN',
    hi: 'IN',
    te: 'IN',
    mr: 'IN',
    ta: 'IN',
    gu: 'IN',
    kn: 'IN',
    or: 'IN',
    ml: 'IN',
    pa_guru: 'IN',
    bho: 'IN',
    awa: 'IN',
    as: 'IN',
    mwr: 'IN',
    mai: 'IN',
    mag: 'IN',
    bgc: 'IN',
    hne: 'IN',
    dcc: 'IN',
    dz: 'BT',
    tn: 'BW',
    am: 'ET',
    om: 'ET',
    quc: 'GT',
    id: 'ID',
    jv: 'ID',
    su: 'ID',
    mad: 'ID',
    ms_arab: 'ID',
    ga: 'IE',
    he: 'IL',
    jam: 'JM',
    ja: 'JP',
    km: 'KH',
    ko: 'KR',
    lo: 'LA',
    mh: 'MH',
    my: 'MM',
    mt: 'MT',
    ne: 'NP',
    fil: 'PH',
    ceb: 'PH',
    ilo: 'PH',
    ur: 'PK',
    pa: 'PK',
    pa_arab: 'PK',
    arab: 'PK',
    lah: 'PK',
    ps: 'PK',
    sd: 'PK',
    sd_arab: 'PK',
    skr: 'PK',
    gn: 'PY',
    th: 'TH',
    tts: 'TH',
    aeb: 'TN',
    zh_hant: 'TW',
    hant: 'TW',
    sm: 'WS',
    zu: 'ZA',
    sn: 'ZW',
    arq: 'DZ',
    ar: 'EG',
    arz: 'EG',
    fa: 'IR',
    az_arab: 'IR',
    ary: 'MA',
    bn: 'BD',
    rkt: 'BD',
    dv: 'MV'
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (langRegionMap);
//# sourceMappingURL=langRegionMap.js.map


/***/ }),

/***/ "./node_modules/weekstart/dist/es-module/main.js":
/*!*******************************************************!*\
  !*** ./node_modules/weekstart/dist/es-module/main.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getWeekStartByLocale": () => (/* binding */ getWeekStartByLocale$1),
/* harmony export */   "getWeekStartByRegion": () => (/* binding */ getWeekStartByRegion$1)
/* harmony export */ });
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ "./node_modules/weekstart/dist/es-module/api.js");
/* harmony import */ var _langRegionMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./langRegionMap.js */ "./node_modules/weekstart/dist/es-module/langRegionMap.js");
/* harmony import */ var _regionDayMap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./regionDayMap.js */ "./node_modules/weekstart/dist/es-module/regionDayMap.js");




function getWeekStartByRegion$1(regionCode) {
    return (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getWeekStartByRegion)(regionCode, _regionDayMap_js__WEBPACK_IMPORTED_MODULE_2__["default"]);
}

function getWeekStartByLocale$1(locale) {
    return (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getWeekStartByLocale)(locale, _langRegionMap_js__WEBPACK_IMPORTED_MODULE_1__["default"], _regionDayMap_js__WEBPACK_IMPORTED_MODULE_2__["default"]);
}


//# sourceMappingURL=main.js.map


/***/ }),

/***/ "./node_modules/weekstart/dist/es-module/regionDayMap.js":
/*!***************************************************************!*\
  !*** ./node_modules/weekstart/dist/es-module/regionDayMap.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var regionDayMap = {
    AG: 0,
    ATG: 0,
    28: 0,
    AR: 0,
    ARG: 0,
    32: 0,
    AS: 0,
    ASM: 0,
    16: 0,
    AU: 0,
    AUS: 0,
    36: 0,
    BR: 0,
    BRA: 0,
    76: 0,
    BS: 0,
    BHS: 0,
    44: 0,
    BT: 0,
    BTN: 0,
    64: 0,
    BW: 0,
    BWA: 0,
    72: 0,
    BZ: 0,
    BLZ: 0,
    84: 0,
    CA: 0,
    CAN: 0,
    124: 0,
    CN: 0,
    CHN: 0,
    156: 0,
    CO: 0,
    COL: 0,
    170: 0,
    DM: 0,
    DMA: 0,
    212: 0,
    DO: 0,
    DOM: 0,
    214: 0,
    ET: 0,
    ETH: 0,
    231: 0,
    GT: 0,
    GTM: 0,
    320: 0,
    GU: 0,
    GUM: 0,
    316: 0,
    HK: 0,
    HKG: 0,
    344: 0,
    HN: 0,
    HND: 0,
    340: 0,
    ID: 0,
    IDN: 0,
    360: 0,
    IE: 0,
    IRL: 0,
    372: 0,
    IL: 0,
    ISR: 0,
    376: 0,
    IN: 0,
    IND: 0,
    356: 0,
    JM: 0,
    JAM: 0,
    388: 0,
    JP: 0,
    JPN: 0,
    392: 0,
    KE: 0,
    KEN: 0,
    404: 0,
    KH: 0,
    KHM: 0,
    116: 0,
    KR: 0,
    KOR: 0,
    410: 0,
    LA: 0,
    LA0: 0,
    418: 0,
    MH: 0,
    MHL: 0,
    584: 0,
    MM: 0,
    MMR: 0,
    104: 0,
    MO: 0,
    MAC: 0,
    446: 0,
    MT: 0,
    MLT: 0,
    470: 0,
    MX: 0,
    MEX: 0,
    484: 0,
    MZ: 0,
    MOZ: 0,
    508: 0,
    NI: 0,
    NIC: 0,
    558: 0,
    NP: 0,
    NPL: 0,
    524: 0,
    NZ: 0,
    NZL: 0,
    554: 0,
    PA: 0,
    PAN: 0,
    591: 0,
    PE: 0,
    PER: 0,
    604: 0,
    PH: 0,
    PHL: 0,
    608: 0,
    PK: 0,
    PAK: 0,
    586: 0,
    PR: 0,
    PRI: 0,
    630: 0,
    PY: 0,
    PRY: 0,
    600: 0,
    SA: 0,
    SAU: 0,
    682: 0,
    SG: 0,
    SGP: 0,
    702: 0,
    SV: 0,
    SLV: 0,
    222: 0,
    TH: 0,
    THA: 0,
    764: 0,
    TN: 0,
    TUN: 0,
    788: 0,
    TT: 0,
    TTO: 0,
    780: 0,
    TW: 0,
    TWN: 0,
    158: 0,
    UM: 0,
    UMI: 0,
    581: 0,
    US: 0,
    USA: 0,
    840: 0,
    VE: 0,
    VEN: 0,
    862: 0,
    VI: 0,
    VIR: 0,
    850: 0,
    WS: 0,
    WSM: 0,
    882: 0,
    YE: 0,
    YEM: 0,
    887: 0,
    ZA: 0,
    ZAF: 0,
    710: 0,
    ZW: 0,
    ZWE: 0,
    716: 0,
    AE: 6,
    ARE: 6,
    784: 6,
    AF: 6,
    AFG: 6,
    4: 6,
    BH: 6,
    BHR: 6,
    48: 6,
    DJ: 6,
    DJI: 6,
    262: 6,
    DZ: 6,
    DZA: 6,
    12: 6,
    EG: 6,
    EGY: 6,
    818: 6,
    IQ: 6,
    IRQ: 6,
    368: 6,
    IR: 6,
    IRN: 6,
    364: 6,
    JO: 6,
    JOR: 6,
    400: 6,
    KW: 6,
    KWT: 6,
    414: 6,
    LY: 6,
    LBY: 6,
    434: 6,
    MA: 6,
    MAR: 6,
    504: 6,
    OM: 6,
    OMN: 6,
    512: 6,
    QA: 6,
    QAT: 6,
    634: 6,
    SD: 6,
    SDN: 6,
    729: 6,
    SY: 6,
    SYR: 6,
    760: 6,
    BD: 5,
    BGD: 5,
    50: 5,
    MV: 5,
    MDV: 5,
    462: 5
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (regionDayMap);
//# sourceMappingURL=regionDayMap.js.map


/***/ }),

/***/ "./node_modules/date-fns-tz/_lib/newDateUTC/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns-tz/_lib/newDateUTC/index.js ***!
  \***********************************************************/
/***/ ((module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = newDateUTC;

/**
 * Use instead of `new Date(Date.UTC(...))` to support years below 100 which doesn't work
 * otherwise due to the nature of the
 * [`Date` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#interpretation_of_two-digit_years.
 *
 * For `Date.UTC(...)`, use `newDateUTC(...).getTime()`.
 */
function newDateUTC(fullYear, month, day, hour, minute, second, millisecond) {
  var utcDate = new Date(0);
  utcDate.setUTCFullYear(fullYear, month, day);
  utcDate.setUTCHours(hour, minute, second, millisecond);
  return utcDate;
}

module.exports = exports.default;

/***/ }),

/***/ "./node_modules/date-fns-tz/_lib/tzParseTimezone/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns-tz/_lib/tzParseTimezone/index.js ***!
  \****************************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = tzParseTimezone;

var _index = _interopRequireDefault(__webpack_require__(/*! ../tzTokenizeDate/index.js */ "./node_modules/date-fns-tz/_lib/tzTokenizeDate/index.js"));

var _index2 = _interopRequireDefault(__webpack_require__(/*! ../newDateUTC/index.js */ "./node_modules/date-fns-tz/_lib/newDateUTC/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_HOUR = 3600000;
var MILLISECONDS_IN_MINUTE = 60000;
var patterns = {
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-]\d{2}):?(\d{2})$/
}; // Parse various time zone offset formats to an offset in milliseconds

function tzParseTimezone(timezoneString, date, isUtcDate) {
  var token;
  var absoluteOffset; // Empty string

  if (!timezoneString) {
    return 0;
  } // Z


  token = patterns.timezoneZ.exec(timezoneString);

  if (token) {
    return 0;
  }

  var hours; // ±hh

  token = patterns.timezoneHH.exec(timezoneString);

  if (token) {
    hours = parseInt(token[1], 10);

    if (!validateTimezone(hours)) {
      return NaN;
    }

    return -(hours * MILLISECONDS_IN_HOUR);
  } // ±hh:mm or ±hhmm


  token = patterns.timezoneHHMM.exec(timezoneString);

  if (token) {
    hours = parseInt(token[1], 10);
    var minutes = parseInt(token[2], 10);

    if (!validateTimezone(hours, minutes)) {
      return NaN;
    }

    absoluteOffset = Math.abs(hours) * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE;
    return hours > 0 ? -absoluteOffset : absoluteOffset;
  } // IANA time zone


  if (isValidTimezoneIANAString(timezoneString)) {
    date = new Date(date || Date.now());
    var utcDate = isUtcDate ? date : toUtcDate(date);
    var offset = calcOffset(utcDate, timezoneString);
    var fixedOffset = isUtcDate ? offset : fixOffset(date, offset, timezoneString);
    return -fixedOffset;
  }

  return NaN;
}

function toUtcDate(date) {
  return (0, _index2.default)(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}

function calcOffset(date, timezoneString) {
  var tokens = (0, _index.default)(date, timezoneString); // ms dropped because it's not provided by tzTokenizeDate

  var asUTC = (0, _index2.default)(tokens[0], tokens[1] - 1, tokens[2], tokens[3] % 24, tokens[4], tokens[5], 0).getTime();
  var asTS = date.getTime();
  var over = asTS % 1000;
  asTS -= over >= 0 ? over : 1000 + over;
  return asUTC - asTS;
}

function fixOffset(date, offset, timezoneString) {
  var localTS = date.getTime(); // Our UTC time is just a guess because our offset is just a guess

  var utcGuess = localTS - offset; // Test whether the zone matches the offset for this ts

  var o2 = calcOffset(new Date(utcGuess), timezoneString); // If so, offset didn't change, and we're done

  if (offset === o2) {
    return offset;
  } // If not, change the ts by the difference in the offset


  utcGuess -= o2 - offset; // If that gives us the local time we want, we're done

  var o3 = calcOffset(new Date(utcGuess), timezoneString);

  if (o2 === o3) {
    return o2;
  } // If it's different, we're in a hole time. The offset has changed, but we don't adjust the time


  return Math.max(o2, o3);
}

function validateTimezone(hours, minutes) {
  return -23 <= hours && hours <= 23 && (minutes == null || 0 <= minutes && minutes <= 59);
}

var validIANATimezoneCache = {};

function isValidTimezoneIANAString(timeZoneString) {
  if (validIANATimezoneCache[timeZoneString]) return true;

  try {
    new Intl.DateTimeFormat(undefined, {
      timeZone: timeZoneString
    });
    validIANATimezoneCache[timeZoneString] = true;
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = exports.default;

/***/ }),

/***/ "./node_modules/date-fns-tz/_lib/tzPattern/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns-tz/_lib/tzPattern/index.js ***!
  \**********************************************************/
/***/ ((module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

/** Regex to identify the presence of a time zone specifier in a date string */
var tzPattern = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
var _default = tzPattern;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./node_modules/date-fns-tz/_lib/tzTokenizeDate/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns-tz/_lib/tzTokenizeDate/index.js ***!
  \***************************************************************/
/***/ ((module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = tzTokenizeDate;

/**
 * Returns the [year, month, day, hour, minute, seconds] tokens of the provided
 * `date` as it will be rendered in the `timeZone`.
 */
function tzTokenizeDate(date, timeZone) {
  var dtf = getDateTimeFormat(timeZone);
  return dtf.formatToParts ? partsOffset(dtf, date) : hackyOffset(dtf, date);
}

var typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};

function partsOffset(dtf, date) {
  try {
    var formatted = dtf.formatToParts(date);
    var filled = [];

    for (var i = 0; i < formatted.length; i++) {
      var pos = typeToPos[formatted[i].type];

      if (pos >= 0) {
        filled[pos] = parseInt(formatted[i].value, 10);
      }
    }

    return filled;
  } catch (error) {
    if (error instanceof RangeError) {
      return [NaN];
    }

    throw error;
  }
}

function hackyOffset(dtf, date) {
  var formatted = dtf.format(date).replace(/\u200E/g, '');
  var parsed = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(formatted); // var [, fMonth, fDay, fYear, fHour, fMinute, fSecond] = parsed
  // return [fYear, fMonth, fDay, fHour, fMinute, fSecond]

  return [parsed[3], parsed[1], parsed[2], parsed[4], parsed[5], parsed[6]];
} // Get a cached Intl.DateTimeFormat instance for the IANA `timeZone`. This can be used
// to get deterministic local date/time output according to the `en-US` locale which
// can be used to extract local time parts as necessary.


var dtfCache = {};

function getDateTimeFormat(timeZone) {
  if (!dtfCache[timeZone]) {
    // New browsers use `hourCycle`, IE and Chrome <73 does not support it and uses `hour12`
    var testDateFormatted = new Intl.DateTimeFormat('en-US', {
      hour12: false,
      timeZone: 'America/New_York',
      year: 'numeric',
      month: 'numeric',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(new Date('2014-06-25T04:00:00.123Z'));
    var hourCycleSupported = testDateFormatted === '06/25/2014, 00:00:00' || testDateFormatted === '‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00';
    dtfCache[timeZone] = hourCycleSupported ? new Intl.DateTimeFormat('en-US', {
      hour12: false,
      timeZone: timeZone,
      year: 'numeric',
      month: 'numeric',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }) : new Intl.DateTimeFormat('en-US', {
      hourCycle: 'h23',
      timeZone: timeZone,
      year: 'numeric',
      month: 'numeric',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  return dtfCache[timeZone];
}

module.exports = exports.default;

/***/ }),

/***/ "./node_modules/date-fns-tz/toDate/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns-tz/toDate/index.js ***!
  \**************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = toDate;

var _index = _interopRequireDefault(__webpack_require__(/*! date-fns/_lib/toInteger/index.js */ "./node_modules/date-fns/_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(__webpack_require__(/*! date-fns/_lib/getTimezoneOffsetInMilliseconds/index.js */ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds/index.js"));

var _index3 = _interopRequireDefault(__webpack_require__(/*! ../_lib/tzParseTimezone/index.js */ "./node_modules/date-fns-tz/_lib/tzParseTimezone/index.js"));

var _index4 = _interopRequireDefault(__webpack_require__(/*! ../_lib/tzPattern/index.js */ "./node_modules/date-fns-tz/_lib/tzPattern/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_HOUR = 3600000;
var MILLISECONDS_IN_MINUTE = 60000;
var DEFAULT_ADDITIONAL_DIGITS = 2;
var patterns = {
  dateTimePattern: /^([0-9W+-]+)(T| )(.*)/,
  datePattern: /^([0-9W+-]+)(.*)/,
  plainTime: /:/,
  // year tokens
  YY: /^(\d{2})$/,
  YYY: [/^([+-]\d{2})$/, // 0 additional digits
  /^([+-]\d{3})$/, // 1 additional digit
  /^([+-]\d{4})$/ // 2 additional digits
  ],
  YYYY: /^(\d{4})/,
  YYYYY: [/^([+-]\d{4})/, // 0 additional digits
  /^([+-]\d{5})/, // 1 additional digit
  /^([+-]\d{6})/ // 2 additional digits
  ],
  // date tokens
  MM: /^-(\d{2})$/,
  DDD: /^-?(\d{3})$/,
  MMDD: /^-?(\d{2})-?(\d{2})$/,
  Www: /^-?W(\d{2})$/,
  WwwD: /^-?W(\d{2})-?(\d{1})$/,
  HH: /^(\d{2}([.,]\d*)?)$/,
  HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
  HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
  // time zone tokens (to identify the presence of a tz)
  timeZone: _index4.default
};
/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 * If the function cannot parse the string or the values are invalid, it returns Invalid Date.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 * All *date-fns* functions will throw `RangeError` if `options.additionalDigits` is not 0, 1, 2 or undefined.
 *
 * @param {Date|String|Number} argument - the value to convert
 * @param {OptionsWithTZ} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @param {String} [options.timeZone=''] - used to specify the IANA time zone offset of a date String.
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * var result = toDate('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * var result = toDate('+02014101', {additionalDigits: 1})
 * //=> Fri Apr 11 2014 00:00:00
 */

function toDate(argument, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  if (argument === null) {
    return new Date(NaN);
  }

  var options = dirtyOptions || {};
  var additionalDigits = options.additionalDigits == null ? DEFAULT_ADDITIONAL_DIGITS : (0, _index.default)(options.additionalDigits);

  if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
    throw new RangeError('additionalDigits must be 0, 1 or 2');
  } // Clone the date


  if (argument instanceof Date || typeof argument === 'object' && Object.prototype.toString.call(argument) === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || Object.prototype.toString.call(argument) === '[object Number]') {
    return new Date(argument);
  } else if (!(typeof argument === 'string' || Object.prototype.toString.call(argument) === '[object String]')) {
    return new Date(NaN);
  }

  var dateStrings = splitDateString(argument);
  var parseYearResult = parseYear(dateStrings.date, additionalDigits);
  var year = parseYearResult.year;
  var restDateString = parseYearResult.restDateString;
  var date = parseDate(restDateString, year);

  if (isNaN(date)) {
    return new Date(NaN);
  }

  if (date) {
    var timestamp = date.getTime();
    var time = 0;
    var offset;

    if (dateStrings.time) {
      time = parseTime(dateStrings.time);

      if (isNaN(time)) {
        return new Date(NaN);
      }
    }

    if (dateStrings.timeZone || options.timeZone) {
      offset = (0, _index3.default)(dateStrings.timeZone || options.timeZone, new Date(timestamp + time));

      if (isNaN(offset)) {
        return new Date(NaN);
      }
    } else {
      // get offset accurate to hour in time zones that change offset
      offset = (0, _index2.default)(new Date(timestamp + time));
      offset = (0, _index2.default)(new Date(timestamp + time + offset));
    }

    return new Date(timestamp + time + offset);
  } else {
    return new Date(NaN);
  }
}

function splitDateString(dateString) {
  var dateStrings = {};
  var parts = patterns.dateTimePattern.exec(dateString);
  var timeString;

  if (!parts) {
    parts = patterns.datePattern.exec(dateString);

    if (parts) {
      dateStrings.date = parts[1];
      timeString = parts[2];
    } else {
      dateStrings.date = null;
      timeString = dateString;
    }
  } else {
    dateStrings.date = parts[1];
    timeString = parts[3];
  }

  if (timeString) {
    var token = patterns.timeZone.exec(timeString);

    if (token) {
      dateStrings.time = timeString.replace(token[1], '');
      dateStrings.timeZone = token[1].trim();
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings;
}

function parseYear(dateString, additionalDigits) {
  var patternYYY = patterns.YYY[additionalDigits];
  var patternYYYYY = patterns.YYYYY[additionalDigits];
  var token; // YYYY or ±YYYYY

  token = patterns.YYYY.exec(dateString) || patternYYYYY.exec(dateString);

  if (token) {
    var yearString = token[1];
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    };
  } // YY or ±YYY


  token = patterns.YY.exec(dateString) || patternYYY.exec(dateString);

  if (token) {
    var centuryString = token[1];
    return {
      year: parseInt(centuryString, 10) * 100,
      restDateString: dateString.slice(centuryString.length)
    };
  } // Invalid ISO-formatted year


  return {
    year: null
  };
}

function parseDate(dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) {
    return null;
  }

  var token;
  var date;
  var month;
  var week; // YYYY

  if (dateString.length === 0) {
    date = new Date(0);
    date.setUTCFullYear(year);
    return date;
  } // YYYY-MM


  token = patterns.MM.exec(dateString);

  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;

    if (!validateDate(year, month)) {
      return new Date(NaN);
    }

    date.setUTCFullYear(year, month);
    return date;
  } // YYYY-DDD or YYYYDDD


  token = patterns.DDD.exec(dateString);

  if (token) {
    date = new Date(0);
    var dayOfYear = parseInt(token[1], 10);

    if (!validateDayOfYearDate(year, dayOfYear)) {
      return new Date(NaN);
    }

    date.setUTCFullYear(year, 0, dayOfYear);
    return date;
  } // yyyy-MM-dd or YYYYMMDD


  token = patterns.MMDD.exec(dateString);

  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    var day = parseInt(token[2], 10);

    if (!validateDate(year, month, day)) {
      return new Date(NaN);
    }

    date.setUTCFullYear(year, month, day);
    return date;
  } // YYYY-Www or YYYYWww


  token = patterns.Www.exec(dateString);

  if (token) {
    week = parseInt(token[1], 10) - 1;

    if (!validateWeekDate(year, week)) {
      return new Date(NaN);
    }

    return dayOfISOWeekYear(year, week);
  } // YYYY-Www-D or YYYYWwwD


  token = patterns.WwwD.exec(dateString);

  if (token) {
    week = parseInt(token[1], 10) - 1;
    var dayOfWeek = parseInt(token[2], 10) - 1;

    if (!validateWeekDate(year, week, dayOfWeek)) {
      return new Date(NaN);
    }

    return dayOfISOWeekYear(year, week, dayOfWeek);
  } // Invalid ISO-formatted date


  return null;
}

function parseTime(timeString) {
  var token;
  var hours;
  var minutes; // hh

  token = patterns.HH.exec(timeString);

  if (token) {
    hours = parseFloat(token[1].replace(',', '.'));

    if (!validateTime(hours)) {
      return NaN;
    }

    return hours % 24 * MILLISECONDS_IN_HOUR;
  } // hh:mm or hhmm


  token = patterns.HHMM.exec(timeString);

  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseFloat(token[2].replace(',', '.'));

    if (!validateTime(hours, minutes)) {
      return NaN;
    }

    return hours % 24 * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE;
  } // hh:mm:ss or hhmmss


  token = patterns.HHMMSS.exec(timeString);

  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseInt(token[2], 10);
    var seconds = parseFloat(token[3].replace(',', '.'));

    if (!validateTime(hours, minutes, seconds)) {
      return NaN;
    }

    return hours % 24 * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE + seconds * 1000;
  } // Invalid ISO-formatted time


  return null;
}

function dayOfISOWeekYear(isoWeekYear, week, day) {
  week = week || 0;
  day = day || 0;
  var date = new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = week * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
} // Validation functions


var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}

function validateDate(year, month, date) {
  if (month < 0 || month > 11) {
    return false;
  }

  if (date != null) {
    if (date < 1) {
      return false;
    }

    var isLeapYear = isLeapYearIndex(year);

    if (isLeapYear && date > DAYS_IN_MONTH_LEAP_YEAR[month]) {
      return false;
    }

    if (!isLeapYear && date > DAYS_IN_MONTH[month]) {
      return false;
    }
  }

  return true;
}

function validateDayOfYearDate(year, dayOfYear) {
  if (dayOfYear < 1) {
    return false;
  }

  var isLeapYear = isLeapYearIndex(year);

  if (isLeapYear && dayOfYear > 366) {
    return false;
  }

  if (!isLeapYear && dayOfYear > 365) {
    return false;
  }

  return true;
}

function validateWeekDate(year, week, day) {
  if (week < 0 || week > 52) {
    return false;
  }

  if (day != null && (day < 0 || day > 6)) {
    return false;
  }

  return true;
}

function validateTime(hours, minutes, seconds) {
  if (hours != null && (hours < 0 || hours >= 25)) {
    return false;
  }

  if (minutes != null && (minutes < 0 || minutes >= 60)) {
    return false;
  }

  if (seconds != null && (seconds < 0 || seconds >= 60)) {
    return false;
  }

  return true;
}

module.exports = exports.default;

/***/ }),

/***/ "./node_modules/date-fns-tz/utcToZonedTime/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns-tz/utcToZonedTime/index.js ***!
  \**********************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = utcToZonedTime;

var _index = _interopRequireDefault(__webpack_require__(/*! ../_lib/tzParseTimezone/index.js */ "./node_modules/date-fns-tz/_lib/tzParseTimezone/index.js"));

var _index2 = _interopRequireDefault(__webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns-tz/toDate/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name utcToZonedTime
 * @category Time Zone Helpers
 * @summary Get a date/time representing local time in a given time zone from the UTC date
 *
 * @description
 * Returns a date instance with values representing the local time in the time zone
 * specified of the UTC time from the date provided. In other words, when the new date
 * is formatted it will show the equivalent hours in the target time zone regardless
 * of the current system time zone.
 *
 * @param {Date|String|Number} date - the date with the relevant UTC time
 * @param {String} timeZone - the time zone to get local time for, can be an offset or IANA time zone
 * @param {OptionsWithTZ} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date} the new date with the equivalent time in the time zone
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // In June 10am UTC is 6am in New York (-04:00)
 * const result = utcToZonedTime('2014-06-25T10:00:00.000Z', 'America/New_York')
 * //=> Jun 25 2014 06:00:00
 */
function utcToZonedTime(dirtyDate, timeZone, options) {
  var date = (0, _index2.default)(dirtyDate, options);
  var offsetMilliseconds = (0, _index.default)(timeZone, date, true);
  var d = new Date(date.getTime() - offsetMilliseconds);
  var resultDate = new Date(0);
  resultDate.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  resultDate.setHours(d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
  return resultDate;
}

module.exports = exports.default;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DateMask": () => (/* reexport safe */ _DateMask__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "NumberMask": () => (/* reexport safe */ _NumberMask__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "StringMask": () => (/* reexport safe */ _StringMask__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "Types": () => (/* reexport safe */ _Types__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "Utils": () => (/* binding */ Utils),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _NumberMask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NumberMask */ "./src/NumberMask/index.js");
/* harmony import */ var _DateMask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DateMask */ "./src/DateMask/index.js");
/* harmony import */ var _StringMask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StringMask */ "./src/StringMask/index.js");
/* harmony import */ var _Types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Types */ "./src/Types/index.js");
/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */





var Utils = {
  Dates: {
    getDayOfYear: _DateMask__WEBPACK_IMPORTED_MODULE_1__.getDayOfYear,
    getWeekNumber: _DateMask__WEBPACK_IMPORTED_MODULE_1__.getWeekNumber,
    getWeekStartByLocale: _DateMask__WEBPACK_IMPORTED_MODULE_1__.getWeekStartByLocale,
    IS_DATE_REGEX: _DateMask__WEBPACK_IMPORTED_MODULE_1__.IS_DATE_REGEX,
    IS_TIME_REGEX: _DateMask__WEBPACK_IMPORTED_MODULE_1__.IS_TIME_REGEX,
    fixShortISO: _DateMask__WEBPACK_IMPORTED_MODULE_1__.fixShortISO,
    getTimezoneOrOffset: _DateMask__WEBPACK_IMPORTED_MODULE_1__.getTimezoneOrOffset
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Types__WEBPACK_IMPORTED_MODULE_3__["default"]);

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bbj-masks.js.map