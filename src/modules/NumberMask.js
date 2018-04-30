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
export default class NumberMask {

  maskNumber(number, mask) {

    const maskLength = mask.length;
    if (0 === maskLength) return number;

    // Get magnitude and precision of MASK
    let maskBeforeDecimal = 0;
    let maskAfterDecimal = 0;
    let foundDecimal = false;
    for (let i = 0; i < maskLength; ++i) {
      const m = mask.charAt(i);
      if (m == '0' || m == '#') {
        if (foundDecimal)++maskAfterDecimal;
        else ++maskBeforeDecimal;
      } else if (m == '.') foundDecimal = true;
    }

    let num = this.__round(number, maskAfterDecimal);
    let digits = this.__toCharArray(num);

    // Get magnitude and precision of NUMBER
    let numLen = digits.length;
    let numBeforeDecimal = 0;
    let numAfterDecimal = 0;
    foundDecimal = false;
    for (let i = 0; i < numLen; i++) {
      if (digits[i] == '.') foundDecimal = true;
      else {
        if (foundDecimal)++numAfterDecimal;
        else ++numBeforeDecimal;
      }
    }

    // always ignore mask overflow
    if (numBeforeDecimal > maskBeforeDecimal) return number.toString();

    // round if mask is for a lower precision number
    if (numAfterDecimal > maskAfterDecimal) {

      num = this.__round(num, maskAfterDecimal);
      digits = this.__toCharArray(num);
      numLen = digits.length;

      // Get new magnitude and precision of NUMBER
      numBeforeDecimal = 0;
      numAfterDecimal = 0;
      foundDecimal = false;
      for (let i = 0; i < numLen; i++) {
        if (digits[i] == '.') foundDecimal = true;
        else {
          if (foundDecimal)++numAfterDecimal;
          else ++numBeforeDecimal;
        }
      }

      // always ignore mask overflow
      if (numBeforeDecimal > maskBeforeDecimal) {
        return number.toString();
      }
    }

    const isNegative = Math.sign(num) === -1;
    let emitDecimal = numLen > 0 || mask.indexOf('0') >= 0;
    let foundZero = false;
    let currency = false;
    let buffer = '';
    foundDecimal = false;

    for (let numPos = 0, maskPos = 0; maskPos < maskLength; maskPos++) {

      let m = mask.charAt(maskPos);
      switch (m) {
        case '0':
          --maskBeforeDecimal;
          if (maskBeforeDecimal < numBeforeDecimal && numPos < numLen) {
            buffer += digits[numPos];
            ++numPos;
          }
          else {
            buffer += '0';
            foundZero = true;
          }
          break;

        case '#':
          --maskBeforeDecimal;
          if (maskBeforeDecimal < numBeforeDecimal && numPos < numLen) {
            buffer += digits[numPos];
            ++numPos;
          }
          else {
            if (foundDecimal) buffer += '0';
          }
          break;

        case ',':
          if (foundZero || numPos > 0) buffer += ',';
          break;

        case '-':
        case '(':
        case ')':
          if (isNegative) buffer += m;
          break;

        case '+':
          buffer += isNegative ? '-' : '+';
          break;

        case '.':
          if (foundDecimal) buffer += m;
          else {
            if (emitDecimal) buffer += '.';
            foundDecimal = true;
            ++numPos;
          }
          break;

        // case '&':
        // case '@':
        //   currency = true;
        //   buffer += m;
        //   break;

        case 'C':
          if (maskPos < maskLength - 1 && mask.charAt(maskPos + 1) == 'R') {
            if (isNegative) buffer += 'CR';
            ++maskPos;
          } else buffer += m;
          break;

        case 'D':
          if (maskPos < maskLength - 1 && p_mask.charAt(maskPos + 1) == 'R') {
            buffer += isNegative ? "CR" : "DR";
            ++maskPos;
          } else buffer += m;
          break;

        case 'B':
          buffer += ' ';
          break;

        default:
          buffer += m;
          break;
      }
    }

    return buffer;
  }

  __shift(number, precision, reverseShift) {
    
    if (reverseShift) precision = -precision;
    var numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
  }

  __round(number, precision) {

    return this.__shift(
      Math.round(this.__shift(number, precision, false)),
      precision,
      true
    );
  }

  __toCharArray(number) {

    const signum = Math.sign(number);
    let chars = [];

    if (signum !== 0) {

      let string = signum < 0 ?
        `${-1 * number.toString()}`
        : number.toString();

      if (string.length > 1 && string.charAt(0) == '0')
        string = string.substring(1);

      // The string contains only [0-9] and '.'
      chars = (string).split('');
    }

    return chars;
  }
}


