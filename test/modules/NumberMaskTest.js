/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var assert = typeof chai !== "undefined" ? chai.assert : require('assert');
var NumberMask = typeof BBj !== "undefined" ? BBj.Masks.NumberMask : require("../../src/modules/NumberMask.js").default;
var numbersProvider = typeof NumbersProvider !== "undefined" ? NumbersProvider : require("../providers/NumbersProvider.js");

describe('NumberMask', function () {

  describe('Accepts all bbj number masks', function () {

    numbersProvider.forEach(function (item) {
      describe(
        "number = " + item.number + ", mask = " + item.mask,
        function () {
          it('should returns ' + (item.expected ? item.expected : 'nothing'), function () {
            assert.deepEqual(
              new NumberMask().maskNumber(item.number, item.mask),
              item.expected
            );
          });
        }
      );
    });
    
  });

});
