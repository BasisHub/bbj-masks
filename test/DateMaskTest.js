/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var assert = typeof chai !== 'undefined' ? chai.assert : require('assert')
var DateMask =
  typeof BBj !== 'undefined'
    ? BBj.Masks.DateMask
    : require('../src/DateMask/DateMask.js').default
var datesProvider =
  typeof DatesProvider !== 'undefined'
    ? DatesProvider
    : require('./providers/DatesProvider.js')

describe('DateMask', function() {
  // describe('_detDayOfYear', function() {
  //   it('should returns 46 for 2018-02-15', function() {
  //     assert.equal(DateMask._getDayOfYear('2018-02-15'), 46)
  //   })

  //   it('should returns 47 for 2018-02-16', function() {
  //     assert.equal(DateMask._getDayOfYear('2018-02-16'), 47)
  //   })
  // })

  describe('Accepts all bbj date masks', function() {
    datesProvider.forEach(function(item) {
      describe(
        'date =' +
          item.date +
          ', mask = ' +
          item.mask +
          ', locale = ' +
          item.locale +
          ', timezone = ' +
          (item.timezone || 'Europe/Berlin'),
        function() {
          it(
            'should returns ' + (item.expected ? item.expected : 'nothing'),
            function() {
              assert.equal(
                DateMask.mask(
                  item.date,
                  item.mask,
                  item.locale || 'en-US',
                  item.timezone || 'Europe/Berlin'
                ),
                item.expected
              )
            }
          )
        }
      )
    })
  })
})
