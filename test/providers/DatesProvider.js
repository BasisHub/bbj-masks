;(function(root, undefined) {
  var DatesProvider = [
    // Year
    { date: '2018-02-15T14:01:06Z', mask: '%Yz', expected: '18' },
    { date: '2018-02-15T14:01:06Z', mask: '%Ys', expected: '2018' },
    { date: '2018-02-15T14:01:06Z', mask: '%Yl', expected: '2018' },
    {
      date: '2018-02-15T14:01:06Z',
      mask: '%Yp',
      expected: String.fromCharCode('2018')
    },
    { date: '2018-02-15T14:01:06Z', mask: '%Yd', expected: '2018' },
    { date: '2018-02-15T14:01:06Z', mask: '%Y', expected: '2018' },

    // month
    { date: '2018-02-15T14:01:06Z', mask: '%Mz', expected: '02' },
    { date: '2018-02-15T14:01:06Z', mask: '%Ms', expected: 'Feb' },
    { date: '2018-02-15T14:01:06Z', mask: '%Ml', expected: 'February' },
    {
      date: '2018-02-15T14:01:06Z',
      mask: '%Mp',
      expected: String.fromCharCode('2')
    },
    { date: '2018-02-15T14:01:06Z', mask: '%Md', expected: '2' },
    { date: '2018-02-15T14:01:06Z', mask: '%M', expected: '2' },

    // day
    { date: '2018-02-15T14:01:06Z', mask: '%Dz', expected: '15' },
    { date: '2018-02-15T14:01:06Z', mask: '%Ds', expected: 'Thu' },
    { date: '2018-02-15T14:01:06Z', mask: '%Dl', expected: 'Thursday' },
    {
      date: '2018-02-15T14:01:06Z',
      mask: '%Dp',
      expected: String.fromCharCode('15')
    },
    { date: '2018-02-15T14:01:06Z', mask: '%Dd', expected: '15' },
    { date: '2018-02-15T14:01:06Z', mask: '%D', expected: '15' },

    // hour 24
    { date: '2018-02-15T14:01:06Z', mask: '%Hz', expected: '15' }, // Timezone is Europe/Berlin
    { date: '2018-02-15T14:01:06Z', mask: '%Hs', expected: '15' }, // Timezone is Europe/Berlin
    { date: '2018-02-15T14:01:06Z', mask: '%Hl', expected: '15' }, // Timezone is Europe/Berlin
    {
      date: '2018-02-15T14:01:06Z',
      mask: '%Hp',
      expected: String.fromCharCode('15') // Timezone is Europe/Berlin
    },
    { date: '2018-02-15T14:01:06Z', mask: '%Hd', expected: '15' }, // Timezone is Europe/Berlin
    { date: '2018-02-15T14:01:06Z', mask: '%H', expected: '15' }, // Timezone is Europe/Berlin

    // hour 12
    { date: '2018-02-15T14:01:06Z', mask: '%hz', expected: '03' }, // Timezone is Europe/Berlin
    { date: '2018-02-15T14:01:06Z', mask: '%hs', expected: '3' }, // Timezone is Europe/Berlin
    { date: '2018-02-15T14:01:06Z', mask: '%hl', expected: '3' }, // Timezone is Europe/Berlin
    {
      date: '2018-02-15T14:01:06Z',
      mask: '%hp',
      expected: String.fromCharCode('3') // Timezone is Europe/Berlin
    },
    { date: '2018-02-15T14:01:06Z', mask: '%hd', expected: '3' }, // Timezone is Europe/Berlin
    { date: '2018-02-15T14:01:06Z', mask: '%h', expected: '3' }, // Timezone is Europe/Berlin

    // minutes
    { date: '2018-02-15T14:01:06Z', mask: '%mz', expected: '01' },
    { date: '2018-02-15T14:01:06Z', mask: '%ms', expected: '1' },
    { date: '2018-02-15T14:01:06Z', mask: '%ml', expected: '1' },
    {
      date: '2018-02-15T14:01:06Z',
      mask: '%mp',
      expected: String.fromCharCode('1')
    },
    { date: '2018-02-15T14:01:06Z', mask: '%md', expected: '1' },
    { date: '2018-02-15T14:01:06Z', mask: '%m', expected: '1' },

    // seconds
    { date: '2018-02-15T14:01:06Z', mask: '%sz', expected: '06' },
    { date: '2018-02-15T14:01:06Z', mask: '%ss', expected: '6' },
    { date: '2018-02-15T14:01:06Z', mask: '%sl', expected: '6' },
    {
      date: '2018-02-15T14:01:06Z',
      mask: '%sp',
      expected: String.fromCharCode('6')
    },
    { date: '2018-02-15T14:01:06Z', mask: '%sd', expected: '6' },
    { date: '2018-02-15T14:01:06Z', mask: '%s', expected: '6' },

    // PM , AM
    { date: '2018-02-15T14:01:06Z', mask: '%PP', expected: 'PM' },
    { date: '2018-02-15T14:01:06Z', mask: '%P', expected: 'PM' },
    { date: '2018-02-15T14:01:06Z', mask: '%pp', expected: 'pm' },
    { date: '2018-02-15T14:01:06Z', mask: '%p', expected: 'pm' },

    //Day number within the year (1-366).
    { date: '2018-02-15T14:01:06Z', mask: '%Jz', expected: '46' },
    { date: '2018-02-15T14:01:06Z', mask: '%Js', expected: '46' },
    { date: '2018-02-15T14:01:06Z', mask: '%Jl', expected: '46' },
    { date: '2018-02-15T14:01:06Z', mask: '%Jd', expected: '46' },
    { date: '2018-02-15T14:01:06Z', mask: '%J', expected: '46' },

    // Day of Week
    { date: '2018-02-15T14:01:06Z', mask: '%Wz', expected: '05' },
    { date: '2018-02-15T14:01:06Z', mask: '%Ws', expected: '5' },
    { date: '2018-02-15T14:01:06Z', mask: '%Wl', expected: '5' },
    {
      date: '2018-02-15T14:01:06Z',
      mask: '%Wp',
      expected: String.fromCharCode('5')
    },
    { date: '2018-02-15T14:01:06Z', mask: '%Wd', expected: '5' },
    { date: '2018-02-15T14:01:06Z', mask: '%W', expected: '5' },

    // Edge Cases
    {
      date: '2016-02-25T08:00:00Z',
      mask: '%Y-%Mz-%Dz %hz:%mz:%sz',
      expected: '2016-02-25 09:00:00' // Timezone is Europe/Berlin
    },
    {
      date: '2013-10-23T23:22:00.0+02:00',
      mask: '%Y-%Mz-%Dz %Hz:%mz:%sz',
      expected: '2013-10-23 23:22:00'
    },
    {
      date: '2013-10-23T23:22:00.0+02:00',
      mask: '%Y-%Mz-%Dz %Hz:%mz:%sz',
      expected: '2013-10-24 00:22:00',
      timezone: 'Asia/Damascus'
    },

    // Week number
    { date: '2019-12-15TZ', mask: '%wz', expected: '50', locale: 'de' },
    { date: '2019-12-15Z', mask: '%ws', expected: '50', locale: 'de' },
    { date: '2019-12-15Z', mask: '%wl', expected: '50', locale: 'de' },
    {
      date: '2019-12-15Z',
      mask: '%wp',
      expected: String.fromCharCode('50'),
      locale: 'de'
    },
    { date: '2019-12-15Z', mask: '%wd', expected: '50', locale: 'de' },
    { date: '2019-12-15Z', mask: '%w', expected: '50', locale: 'de' },

    // Week number edge cases
    { date: '2019-12-28Z', mask: '%w', expected: '52', locale: 'en' },
    { date: '2019-12-29Z', mask: '%w', expected: '1', locale: 'en' },
    { date: '2019-12-30Z', mask: '%w', expected: '1', locale: 'en' },

    { date: '2019-12-28Z', mask: '%w', expected: '52', locale: 'de' },
    { date: '2019-12-29Z', mask: '%w', expected: '52', locale: 'de' },
    { date: '2019-12-30Z', mask: '%w', expected: '1', locale: 'de' }
  ]

  if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    module.exports = DatesProvider
  } else if (root) {
    root.DatesProvider = DatesProvider
  }
})(this)
