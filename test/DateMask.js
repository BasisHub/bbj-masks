/*
 * This file is part of bbj-masks lib.
 * (c) Basis Europe <eu@basis.com>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require('assert');
const DateMask = require("../src/DateMask.js").default;
const datesProvider = require("./providers/DatesProvider.js");

describe('maskDate', () => {

  it('throws an error if date is not passed', () => {
    assert.throws(() => {
      new DateMask().maskDate(null, '');
    }, Error, /Missing date\/maskdsfsdf/);
  });

  it('throws an error if mask is not passed', () => {
    assert.throws(() => {
      new DateMask().maskDate(new Date().toString(), '');
    }, Error, /Missing date\/maskdsfsdf/);
  });

  describe('_parseDate returns data details as object', () => {

    const date = "2018-02-15 14:01:06"
    const expected = {
      "year": 2018,
      "month": 2,
      "day": 15,
      "minutes": 1,
      "seconds": 6,
      "hours24": 14,
      "hours12": 2
    };

    const parsed = new DateMask()._parseDate(date);

    for (const key in parsed) {

      it(`${key} in (${date}) is ${expected[key]}`, () => {
        if (expected.hasOwnProperty(key)) {
          assert.equal(parsed[key], expected[key]);
        }
      })
    }
  });

  describe("_detDayOfYear", () => {

    it('returns 46 for 2018-02-15', () => {
      assert.equal(new DateMask()._getDayOfYear("2018-02-15"), 46);
    })

    it('returns 46 for 2018-02-16', () => {
      assert.equal(new DateMask()._getDayOfYear("2018-02-16"), 47);
    })
  });

  describe('Accepts all bbj date masks', function () {

    for (let x = 0; x < datesProvider.length; x++) {

      const item = datesProvider[x];
      it(
        `date = ${item.date} , format = ${item.mask} , masked = ${item.expected}`,
        () => {

          assert.equal(
            new DateMask().maskDate(item.date, item.mask),
            item.expected
          );
        }
      );
    }
  });

});
