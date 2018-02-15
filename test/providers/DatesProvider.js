const date = "2018-02-15 14:01:06"
module.exports = [
  // Year 
  { date, mask: '%Yz', expected: "18" },
  { date, mask: '%Ys', expected: "2018" },
  { date, mask: '%Yl', expected: "2018" },
  { date, mask: '%Yp', expected: String.fromCharCode("2018") },
  { date, mask: '%Yd', expected: "2018" },
  { date, mask: '%Y', expected: "2018" },

  // month
  { date, mask: '%Mz', expected: "02" },
  { date, mask: '%Ms', expected: "2" },
  { date, mask: '%Ml', expected: "2" },
  { date, mask: '%Mp', expected: String.fromCharCode("2") },
  { date, mask: '%Md', expected: "2" },
  { date, mask: '%M', expected: "2" },

  // day
  { date, mask: '%Dz', expected: "15" },
  { date, mask: '%Ds', expected: "15" },
  { date, mask: '%Dl', expected: "15" },
  { date, mask: '%Dp', expected: String.fromCharCode("15") },
  { date, mask: '%Dd', expected: "15" },
  { date, mask: '%D', expected: "15" },

  // hour 24
  { date, mask: '%Hz', expected: "14" },
  { date, mask: '%Hs', expected: "14" },
  { date, mask: '%Hl', expected: "14" },
  { date, mask: '%Hp', expected: String.fromCharCode("14") },
  { date, mask: '%Hd', expected: "14" },
  { date, mask: '%H', expected: "14" },

  // hour 12
  { date, mask: '%hz', expected: "02" },
  { date, mask: '%hs', expected: "2" },
  { date, mask: '%hl', expected: "2" },
  { date, mask: '%hp', expected: String.fromCharCode("2") },
  { date, mask: '%hd', expected: "2" },
  { date, mask: '%h', expected: "2" },

  // minutes
  { date, mask: '%mz', expected: "01" },
  { date, mask: '%ms', expected: "1" },
  { date, mask: '%ml', expected: "1" },
  { date, mask: '%mp', expected: String.fromCharCode("1") },
  { date, mask: '%md', expected: "1" },
  { date, mask: '%m', expected: "1" },

  // seconds
  { date, mask: '%sz', expected: "06" },
  { date, mask: '%ss', expected: "6" },
  { date, mask: '%sl', expected: "6" },
  { date, mask: '%sp', expected: String.fromCharCode("6") },
  { date, mask: '%sd', expected: "6" },
  { date, mask: '%s', expected: "6" },

  // PM , AM
  { date, mask: '%PP', expected: "PM" },
  { date, mask: '%P', expected: "PM" },
  { date, mask: '%pp', expected: "pm" },
  { date, mask: '%p', expected: "pm" },

  	
  //Day number within the year (1-366).
  { date, mask: '%Jz', expected: "46" },
  { date, mask: '%Js', expected: "46" },
  { date, mask: '%Jl', expected: "46" },
  { date, mask: '%Jd', expected: "46" },
  { date, mask: '%J', expected: "46" },

  // Day of Week
  { date, mask: '%Wz', expected: "05" },
  { date, mask: '%Ws', expected: "5" },
  { date, mask: '%Wl', expected: "5" },
  { date, mask: '%Wp', expected: String.fromCharCode("5") },
  { date, mask: '%Wd', expected: "5" },
  { date, mask: '%W', expected: "5" },
];
