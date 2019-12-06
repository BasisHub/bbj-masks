/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var assert = typeof chai !== 'undefined' ? chai.assert : require('assert')
var StringMask =
  typeof BBj !== 'undefined'
    ? BBj.Masks.StringMask
    : require('../src/StringMask/StringMask.js').default
var StringsProvider =
  typeof StringsProvider !== 'undefined'
    ? StringsProvider
    : require('./providers/StringsProvider.js')

describe('StringMask', function() {
  describe('Accepts all bbj string masks', function() {
    StringsProvider.forEach(function(item) {
      describe(
        'string = ' + item.string + ', mask = ' + item.mask + "'",
        function() {
          it(
            'should returns ' + (item.expected ? item.expected : 'nothing'),
            function() {
              assert.deepEqual(
                StringMask.mask(item.string, item.mask),
                item.expected
              )
            }
          )
        }
      )
    }) // end loop
  })
})
