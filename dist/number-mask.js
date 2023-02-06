(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("BBj", [], factory);
	else if(typeof exports === 'object')
		exports["BBj"] = factory();
	else
		root["BBj"] = root["BBj"] || {}, root["BBj"]["Masks"] = root["BBj"]["Masks"] || {}, root["BBj"]["Masks"]["Number"] = factory();
})((typeof self !== 'undefined' ? self : this), () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
            if (foundZero || inPos > 0) ret[outPos] = groupingSeparator;else {
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
            ret[outPos] = emitDecimal ? decimalSeparator : fillByte;
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
/*!*********************************!*\
  !*** ./src/NumberMask/index.js ***!
  \*********************************/
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
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=number-mask.js.map