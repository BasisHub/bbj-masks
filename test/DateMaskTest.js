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

var fixShortISO =
  typeof BBj !== 'undefined'
    ? BBj.Masks.Utils.Dates.fixShortISO
    : require('../src/DateMask/DateMask.js').fixShortISO

describe('DateMask', function() {
  // describe('_detDayOfYear', function() {
  //   it('should returns 46 for 2018-02-15', function() {
  //     assert.equal(DateMask._getDayOfYear('2018-02-15'), 46)
  //   })

  //   it('should returns 47 for 2018-02-16', function() {
  //     assert.equal(DateMask._getDayOfYear('2018-02-16'), 47)
  //   })
  // })

  describe('#fixShortISO', function() {
    // times
    it('can complete TIME without offset', function() {
      assert.equal(fixShortISO('10:00:00'), '1970-01-01T10:00:00Z')
    })

    it('can complete TIME with UTC offset', function() {
      assert.equal(fixShortISO('10:00:00Z'), '1970-01-01T10:00:00Z')
    })

    it('can complete TIME with positive UTC offset', function() {
      assert.equal(fixShortISO('10:00:00+02:00'), '1970-01-01T10:00:00+02:00')
    })

    it('can complete TIME with negative UTC offset', function() {
      assert.equal(fixShortISO('10:00:00-02:00'), '1970-01-01T10:00:00-02:00')
    })

    // dates
    it('can complete DATE without offset', function() {
      assert.equal(fixShortISO('2020-01-01'), '2020-01-01T00:00:00Z')
    })

    it('can complete DATE with UTC offset', function() {
      assert.equal(fixShortISO('2020-01-01Z'), '2020-01-01T00:00:00Z')
    })

    it('can complete DATE with positive UTC offset', function() {
      assert.equal(fixShortISO('2020-01-01+02:00'), '2020-01-01T00:00:00+02:00')
    })

    it('can complete DATE with negative UTC offset', function() {
      assert.equal(fixShortISO('2020-01-01-02:00'), '2020-01-01T00:00:00-02:00')
    })

    // DateTime
    it('can complete DateTime without offset', function() {
      assert.equal(fixShortISO('2020-01-01T00:00:00'), '2020-01-01T00:00:00Z')
    })

    it('return the same DateTime with UTC offset', function() {
      assert.equal(fixShortISO('2020-01-01T00:00:00Z'), '2020-01-01T00:00:00Z')
    })

    it('return the same DateTime with positive UTC offset', function() {
      assert.equal(
        fixShortISO('2020-01-01T00:00:00+02:00'),
        '2020-01-01T00:00:00+02:00'
      )
    })

    it('return the same DateTime with negative UTC offset', function() {
      assert.equal(
        fixShortISO('2020-01-01T00:00:00-02:00'),
        '2020-01-01T00:00:00-02:00'
      )
    })
  })

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
