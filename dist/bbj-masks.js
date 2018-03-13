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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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

  _createClass(DateMask, [{
    key: "maskDate",

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
    value: function maskDate(date, mask) {
      if (!date) return;
      if (!mask) return date;

      var dateDetails = this._parseDate(date);

      var translations = this._buildTransilation(dateDetails);

      var result = mask;

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

      var dayOfYear = this._getDayOfYear(date); // const dayOfWeek = dateObject.getDay() ?


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
      var now = new Date(date);
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
Object.defineProperty(exports, "DateMask", {
  enumerable: true,
  get: function get() {
    return _DateMask.default;
  }
});
Object.defineProperty(exports, "Types", {
  enumerable: true,
  get: function get() {
    return _Types.default;
  }
});

var _DateMask = _interopRequireDefault(__webpack_require__(0));

var _Types = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _format = _interopRequireDefault(__webpack_require__(3));

var _DateMask = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** 
 * DateMask
 * 
 * Handle BBj dates masking 
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
     * 
     * {@link https://github.com/Mottie/javascript-number-formatter}
     */
    value: function number(_number, mask) {
      return (0, _format.default)(mask, _number);
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
      return new _DateMask.default().maskDate(_date, mask);
    }
  }]);

  return Types;
}();

exports.default = Types;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * javascript-number-formatter
 * Lightweight & Fast JavaScript Number Formatter
 *
 * @preserve IntegraXor Web SCADA - JavaScript Number Formatter (http://www.integraxor.com/)
 * @author KPL
 * @maintainer Rob Garrison
 * @copyright 2018 ecava
 * @license MIT
 * @link http://mottie.github.com/javascript-number-formatter/
 * @version 1.1.11
 */
/*jshint browser:true */
/* global define, module */
(function (root, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module === 'object') {
		module.exports = factory();
	} else {
		root.format = factory();
	}
}(this, function () {

	return function (mask, value) {
		'use strict';
		if (!mask || isNaN(+value)) {
			return value; // return as it is.
		}

		var isNegative, result, decimal, group, posLeadZero, posTrailZero, posSeparator,
			part, szSep, integer, maskHasNegativeSign, maskHasPositiveSign,

			// find prefix/suffix
			len = mask.length,
			start = mask.search(/[0-9\-\+#]/),
			prefix = start > 0 ? mask.substring(0, start) : '',
			// reverse string: not an ideal method if there are surrogate pairs
			str = mask.split('').reverse().join(''),
			end = str.search(/[0-9\-\+#]/),
			offset = len - end,
			substr = mask.substring(offset, offset + 1),
			indx = offset + ((substr === '.' || (substr === ',')) ? 1 : 0),
			suffix = end > 0 ? mask.substring(indx, len) : '';

		// mask with prefix & suffix removed
		mask = mask.substring(start, indx);

		maskHasNegativeSign = mask.charAt(0) === '-';
		maskHasPositiveSign = mask.charAt(0) === '+';

		// convert any string to number according to formation sign.
		isNegative = value < 0 ? (value = -value) : 0; // process only abs(), and turn on flag.

		// search for separator for grp & decimal, anything not digit, not +/- sign, not #.
		result = mask.match(/[^\d\-\+#]/g);
		decimal = (result && result[result.length - 1]) || '.'; // treat the right most symbol as decimal
		group = (result && result[1] && result[0]) || ',';  // treat the left most symbol as group separator

		// split the decimal for the format string if any.
		mask = mask.split(decimal);
		// Fix the decimal first, toFixed will auto fill trailing zero.
		value = value.toFixed(mask[1] && mask[1].length);
		value = +(value) + ''; // convert number to string to trim off *all* trailing decimal zero(es)

		// fill back any trailing zero according to format
		posTrailZero = mask[1] && mask[1].lastIndexOf('0'); // look for last zero in format
		part = value.split('.');
		// integer will get !part[1]
		if (!part[1] || (part[1] && part[1].length <= posTrailZero)) {
			value = (+value).toFixed(posTrailZero + 1);
		}
		szSep = mask[0].split(group); // look for separator
		mask[0] = szSep.join(''); // join back without separator for counting the pos of any leading 0.

		posLeadZero = mask[0] && mask[0].indexOf('0');
		if (posLeadZero > -1) {
			while (part[0].length < (mask[0].length - posLeadZero)) {
				part[0] = '0' + part[0];
			}
		} else if (+part[0] === 0) {
			part[0] = '';
		}

		value = value.split('.');
		value[0] = part[0];

		// process the first group separator from decimal (.) only, the rest ignore.
		// get the length of the last slice of split result.
		posSeparator = (szSep[1] && szSep[szSep.length - 1].length);
		if (posSeparator) {
			integer = value[0];
			str = '';
			offset = integer.length % posSeparator;
			len = integer.length;
			for (indx = 0; indx < len; indx++) {
				str += integer.charAt(indx); // ie6 only support charAt for sz.
				// -posSeparator so that won't trail separator on full length
				/*jshint -W018 */
				if (!((indx - offset + 1) % posSeparator) && indx < len - posSeparator) {
					str += group;
				}
			}
			value[0] = str;
		}
		value[1] = (mask[1] && value[1]) ? decimal + value[1] : '';

		// remove negative sign if result is zero
		result = value.join('');
		if (result === '0' || result === '') {
			// remove negative sign if result is zero
			isNegative = false;
		}

		// put back any negation, combine integer and fraction, and add back prefix & suffix
		return prefix +
			(
				(
					!isNegative && maskHasPositiveSign ? '+' :
						isNegative && maskHasPositiveSign ? '-' :
							(isNegative && maskHasNegativeSign) ? '-' : ''
				) + result
			) +
			suffix;
	};

}));


/***/ })
/******/ ]);
});
//# sourceMappingURL=bbj-masks.js.map