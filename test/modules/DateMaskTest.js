/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var assert = typeof chai !== "undefined" ? chai.assert : require('assert');
var DateMask = typeof BBj !== "undefined" ? BBj.Masks.DateMask : require("../../src/modules/DateMask.js").default;
var datesProvider = typeof DatesProvider !== "undefined" ? DatesProvider : require("../providers/DatesProvider.js");

describe('DateMask', function () {

  describe('_parseDate returns data details as object', function () {

    var date = "2018-02-15 14:01:06"
    var expected = {
      "year": 2018,
      "month": 2,
      "day": 15,
      "minutes": 1,
      "seconds": 6,
      "hours24": 14,
      "hours12": 2
    };

    var parsed = new DateMask()._parseDate(date);

    for (var key in parsed) {

      if (expected.hasOwnProperty(key)) {
        it(key + " in (" + date + ") is " + expected[key], function () {
          if (expected.hasOwnProperty(key)) {
            assert.equal(parsed[key], expected[key]);
          }
        })
      }
    }
  });

  describe("_detDayOfYear", function () {

    it('returns 46 for 2018-02-15', function () {
      assert.equal(new DateMask()._getDayOfYear("2018-02-15"), 46);
    })

    it('returns 47 for 2018-02-16', function () {
      assert.equal(new DateMask()._getDayOfYear("2018-02-16"), 47);
    })
  });

  describe('Accepts all bbj date masks', function () {

    datesProvider.forEach(function (item) {
      describe(
        "date =" + item.date + ", mask = " + item.mask,
        function () {
          it('should returns ' + (item.expected ? item.expected : 'nothing'), function () {
            assert.equal(
              new DateMask().maskDate(item.date, item.mask),
              item.expected
            );
          });
        }
      );
    });
  });

});
