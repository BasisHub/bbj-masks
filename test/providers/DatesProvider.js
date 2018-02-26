module.exports = [
  // Year 
  { date: "2018-02-15 14:01:06", mask: '%Yz', expected: "18" },
  { date: "2018-02-15 14:01:06", mask: '%Ys', expected: "2018" },
  { date: "2018-02-15 14:01:06", mask: '%Yl', expected: "2018" },
  { date: "2018-02-15 14:01:06", mask: '%Yp', expected: String.fromCharCode("2018") },
  { date: "2018-02-15 14:01:06", mask: '%Yd', expected: "2018" },
  { date: "2018-02-15 14:01:06", mask: '%Y', expected: "2018" },

  // month
  { date: "2018-02-15 14:01:06", mask: '%Mz', expected: "02" },
  { date: "2018-02-15 14:01:06", mask: '%Ms', expected: "2" },
  { date: "2018-02-15 14:01:06", mask: '%Ml', expected: "2" },
  { date: "2018-02-15 14:01:06", mask: '%Mp', expected: String.fromCharCode("2") },
  { date: "2018-02-15 14:01:06", mask: '%Md', expected: "2" },
  { date: "2018-02-15 14:01:06", mask: '%M', expected: "2" },

  // day
  { date: "2018-02-15 14:01:06", mask: '%Dz', expected: "15" },
  { date: "2018-02-15 14:01:06", mask: '%Ds', expected: "15" },
  { date: "2018-02-15 14:01:06", mask: '%Dl', expected: "15" },
  { date: "2018-02-15 14:01:06", mask: '%Dp', expected: String.fromCharCode("15") },
  { date: "2018-02-15 14:01:06", mask: '%Dd', expected: "15" },
  { date: "2018-02-15 14:01:06", mask: '%D', expected: "15" },

  // hour 24
  { date: "2018-02-15 14:01:06", mask: '%Hz', expected: "14" },
  { date: "2018-02-15 14:01:06", mask: '%Hs', expected: "14" },
  { date: "2018-02-15 14:01:06", mask: '%Hl', expected: "14" },
  { date: "2018-02-15 14:01:06", mask: '%Hp', expected: String.fromCharCode("14") },
  { date: "2018-02-15 14:01:06", mask: '%Hd', expected: "14" },
  { date: "2018-02-15 14:01:06", mask: '%H', expected: "14" },

  // hour 12
  { date: "2018-02-15 14:01:06", mask: '%hz', expected: "02" },
  { date: "2018-02-15 14:01:06", mask: '%hs', expected: "2" },
  { date: "2018-02-15 14:01:06", mask: '%hl', expected: "2" },
  { date: "2018-02-15 14:01:06", mask: '%hp', expected: String.fromCharCode("2") },
  { date: "2018-02-15 14:01:06", mask: '%hd', expected: "2" },
  { date: "2018-02-15 14:01:06", mask: '%h', expected: "2" },

  // minutes
  { date: "2018-02-15 14:01:06", mask: '%mz', expected: "01" },
  { date: "2018-02-15 14:01:06", mask: '%ms', expected: "1" },
  { date: "2018-02-15 14:01:06", mask: '%ml', expected: "1" },
  { date: "2018-02-15 14:01:06", mask: '%mp', expected: String.fromCharCode("1") },
  { date: "2018-02-15 14:01:06", mask: '%md', expected: "1" },
  { date: "2018-02-15 14:01:06", mask: '%m', expected: "1" },

  // seconds
  { date: "2018-02-15 14:01:06", mask: '%sz', expected: "06" },
  { date: "2018-02-15 14:01:06", mask: '%ss', expected: "6" },
  { date: "2018-02-15 14:01:06", mask: '%sl', expected: "6" },
  { date: "2018-02-15 14:01:06", mask: '%sp', expected: String.fromCharCode("6") },
  { date: "2018-02-15 14:01:06", mask: '%sd', expected: "6" },
  { date: "2018-02-15 14:01:06", mask: '%s', expected: "6" },

  // PM , AM
  { date: "2018-02-15 14:01:06", mask: '%PP', expected: "PM" },
  { date: "2018-02-15 14:01:06", mask: '%P', expected: "PM" },
  { date: "2018-02-15 14:01:06", mask: '%pp', expected: "pm" },
  { date: "2018-02-15 14:01:06", mask: '%p', expected: "pm" },


  //Day number within the year (1-366).
  { date: "2018-02-15 14:01:06", mask: '%Jz', expected: "46" },
  { date: "2018-02-15 14:01:06", mask: '%Js', expected: "46" },
  { date: "2018-02-15 14:01:06", mask: '%Jl', expected: "46" },
  { date: "2018-02-15 14:01:06", mask: '%Jd', expected: "46" },
  { date: "2018-02-15 14:01:06", mask: '%J', expected: "46" },

  // Day of Week
  { date: "2018-02-15 14:01:06", mask: '%Wz', expected: "05" },
  { date: "2018-02-15 14:01:06", mask: '%Ws', expected: "5" },
  { date: "2018-02-15 14:01:06", mask: '%Wl', expected: "5" },
  { date: "2018-02-15 14:01:06", mask: '%Wp', expected: String.fromCharCode("5") },
  { date: "2018-02-15 14:01:06", mask: '%Wd', expected: "5" },
  { date: "2018-02-15 14:01:06", mask: '%W', expected: "5" },


  // Edge Cases
  { date: "2016-2-25 8:00:00", mask: '%Y-%Mz-%Dz %hz:%mz:%sz', expected: "2016-02-25 08:00:00" },
  { date: "2016-2-25 0:0:0", mask: '%Y-%Mz-%Dz %Hz:%mz:%sz', expected: "2016-02-25 00:00:00" },
];
