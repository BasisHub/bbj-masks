(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Masks"] = factory();
	else
		root["BBj"] = root["BBj"] || {}, root["BBj"]["Masks"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var DateMask =
/*#__PURE__*/
function () {
  function DateMask() {
    _classCallCheck(this, DateMask);
  }

  _createClass(DateMask, null, [{
    key: "mask",

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
    value: function mask(date, _mask) {
      if (!date) return;
      if (!_mask) return date;

      var dateDetails = DateMask._parseDate(date);

      var translations = DateMask._buildTransilation(dateDetails);

      var result = _mask;

      for (var k in translations) {
        result = result.replace(new RegExp('(%' + k + ')', 'g'), translations[k]);
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

  }, {
    key: "_parseDate",
    value: function _parseDate(date) {
      var dateObject = Date.parse(date);
      if (!(dateObject instanceof Date)) dateObject = new Date(date);
      var hours24 = dateObject.getHours();
      var hours12 = hours24 % 12 || 12;

      var dayOfYear = DateMask._getDayOfYear(date); // const dayOfWeek = dateObject.getDay() ?


      return {
        "year": dateObject.getFullYear(),
        "month": dateObject.getMonth() + 1,
        "day": dateObject.getDate(),
        "minutes": dateObject.getMinutes(),
        "seconds": dateObject.getSeconds(),
        "hours24": hours24,
        "hours12": hours12,
        "dayOfYear": dayOfYear,
        "dayOfWeek": dateObject.getDay() + 1 // Sunday = 1 in BBj but Sunday = 0 in JS

      };
    }
    /**
     * Get a map object which contains all possible forms of masks
     * 
     * @param {Object} dateDetails date details built by `_parseDate`
     * 
     * @return {Object} forms masks
     */

  }, {
    key: "_buildTransilation",
    value: function _buildTransilation(dateDetails) {
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
        "pp": dateDetails.hours24 > 12 ? "pm" : "am",
        "p": dateDetails.hours24 > 12 ? "pm" : "am",
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
        "W": dateDetails.dayOfWeek
      };
    }
    /**
     * Get the Day number within the year (1-366).
     * 
     * @param {String} date date as a string
     * 
     * @returns {Number}
     */

  }, {
    key: "_getDayOfYear",
    value: function _getDayOfYear(date) {
      var now = Date.parse(date);
      if (!(now instanceof Date)) now = new Date(date);
      var start = new Date(now.getFullYear(), 0, 0);
      var diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
      var oneDay = 1000 * 60 * 60 * 24;
      var day = Math.floor(diff / oneDay);
      return day;
    }
  }]);

  return DateMask;
}();

exports.default = DateMask;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
 * Handle BBj numbers masking 
 * 
 * @author Hyyan Abo Fakher <habofakher@basis.com>
*/
var NumberMask =
/*#__PURE__*/
function () {
  function NumberMask() {
    _classCallCheck(this, NumberMask);
  }

  _createClass(NumberMask, null, [{
    key: "mask",

    /**
     * Mask the given number with the given mask according to BBj rules
     * 
     * @param {Number} number the number to format
     * @param {String} mask the mask to use for formatting
     * 
     * @returns {String} the masked number
     */
    value: function mask(number, _mask) {
      var maskLength = _mask.length;
      if (0 === maskLength) return number; // Get magnitude and precision of MASK

      var maskBeforeDecimal = 0;
      var maskAfterDecimal = 0;
      var foundDecimal = false;

      for (var i = 0; i < maskLength; ++i) {
        var m = _mask.charAt(i);

        if (m == '0' || m == '#') {
          if (foundDecimal) ++maskAfterDecimal;else ++maskBeforeDecimal;
        } else if (m == '.') foundDecimal = true;
      }

      var num = NumberMask._round(number, maskAfterDecimal);

      var digits = NumberMask._toCharArray(num); // Get magnitude and precision of NUMBER


      var numLen = digits.length;
      var numBeforeDecimal = 0;
      var numAfterDecimal = 0;
      foundDecimal = false;

      for (var _i = 0; _i < numLen; _i++) {
        if (digits[_i] == '.') foundDecimal = true;else {
          if (foundDecimal) ++numAfterDecimal;else ++numBeforeDecimal;
        }
      } // always ignore mask overflow


      if (numBeforeDecimal > maskBeforeDecimal) return number.toString(); // round if mask is for a lower precision number

      if (numAfterDecimal > maskAfterDecimal) {
        num = NumberMask._round(num, maskAfterDecimal);
        digits = NumberMask._toCharArray(num);
        numLen = digits.length; // Get new magnitude and precision of NUMBER

        numBeforeDecimal = 0;
        numAfterDecimal = 0;
        foundDecimal = false;

        for (var _i2 = 0; _i2 < numLen; _i2++) {
          if (digits[_i2] == '.') foundDecimal = true;else {
            if (foundDecimal) ++numAfterDecimal;else ++numBeforeDecimal;
          }
        } // always ignore mask overflow


        if (numBeforeDecimal > maskBeforeDecimal) {
          return number.toString();
        }
      }

      var isNegative = NumberMask._getSign(num) === -1;
      var emitDecimal = numLen > 0 || _mask.indexOf('0') >= 0;
      var foundZero = false;
      var currency = false;
      var buffer = '';
      foundDecimal = false;

      for (var numPos = 0, maskPos = 0; maskPos < maskLength; maskPos++) {
        var _m = _mask.charAt(maskPos);

        switch (_m) {
          case '0':
            --maskBeforeDecimal;

            if (maskBeforeDecimal < numBeforeDecimal && numPos < numLen) {
              buffer += digits[numPos];
              ++numPos;
            } else {
              buffer += '0';
              foundZero = true;
            }

            break;

          case '#':
            --maskBeforeDecimal;

            if (maskBeforeDecimal < numBeforeDecimal && numPos < numLen) {
              buffer += digits[numPos];
              ++numPos;
            } else {
              if (foundDecimal) buffer += '0';
            }

            break;

          case ',':
            if (foundZero || numPos > 0) buffer += ',';
            break;

          case '-':
          case '(':
          case ')':
            if (isNegative) buffer += _m;
            break;

          case '+':
            buffer += isNegative ? '-' : '+';
            break;

          case '.':
            if (foundDecimal) buffer += _m;else {
              if (emitDecimal) buffer += '.';
              foundDecimal = true;
              ++numPos;
            }
            break;

          case 'C':
            if (maskPos < maskLength - 1 && _mask.charAt(maskPos + 1) == 'R') {
              if (isNegative) buffer += 'CR';
              ++maskPos;
            } else buffer += _m;

            break;

          case 'D':
            if (maskPos < maskLength - 1 && p_mask.charAt(maskPos + 1) == 'R') {
              buffer += isNegative ? "CR" : "DR";
              ++maskPos;
            } else buffer += _m;

            break;

          case 'B':
            buffer += ' ';
            break;

          default:
            buffer += _m;
            break;
        }
      }

      return buffer;
    }
  }, {
    key: "_shift",
    value: function _shift(number, precision, reverseShift) {
      if (reverseShift) precision = -precision;
      var numArray = ("" + number).split("e");
      return +(numArray[0] + "e" + (numArray[1] ? +numArray[1] + precision : precision));
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
        if (string.length > 1 && string.charAt(0) == '0') string = string.substring(1); // The string contains only [0-9] and '.'

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

exports.default = NumberMask;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DateMask", {
  enumerable: true,
  get: function get() {
    return _DateMask.default;
  }
});
Object.defineProperty(exports, "NumberMask", {
  enumerable: true,
  get: function get() {
    return _NumberMask.default;
  }
});
Object.defineProperty(exports, "Types", {
  enumerable: true,
  get: function get() {
    return _Types.default;
  }
});

var _DateMask = _interopRequireDefault(__webpack_require__(0));

var _NumberMask = _interopRequireDefault(__webpack_require__(1));

var _Types = _interopRequireDefault(__webpack_require__(3));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _NumberMask = _interopRequireDefault(__webpack_require__(1));

var _DateMask = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** 
 * Types
 * 
 * Handle BBj masking 
 * 
 * @author Hyyan Abo Fakher <habofakher@basis.com>
*/
var Types =
/*#__PURE__*/
function () {
  function Types() {
    _classCallCheck(this, Types);
  }

  _createClass(Types, null, [{
    key: "number",

    /**
     * Mask a number according to bbj masking rules 
     * 
     * @param {Number} number the number to format
     * @param {String} mask the mask to use 
     * 
     * @return {String} number masked with the given mask
     */
    value: function number(_number, mask) {
      return _NumberMask.default.mask(_number, mask);
    }
    /**
     * Mask a date according to bbj masking rules 
     * 
     * @param {String} number the date to format
     * @param {String} mask the mask to use 
     * 
     * @return {String} number masked with the given mask
     */

  }, {
    key: "date",
    value: function date(_date, mask) {
      return _DateMask.default.mask(_date, mask);
    }
  }]);

  return Types;
}();

exports.default = Types;

/***/ })
/******/ ]);
});
//# sourceMappingURL=bbj-masks.js.map
