(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("BBj", [], factory);
	else if(typeof exports === 'object')
		exports["BBj"] = factory();
	else
		root["BBj"] = root["BBj"] || {}, root["BBj"]["Masks"] = root["BBj"]["Masks"] || {}, root["BBj"]["Masks"]["String"] = factory();
})((typeof self !== 'undefined' ? self : this), () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
  !*** ./src/StringMask/index.js ***!
  \*********************************/
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
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=string-mask.js.map