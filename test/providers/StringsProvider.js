;(function(root, undefined) {
  var StringsProvider = [
    // { string: 123, mask: '0000', expected: '0123' },
    { string: "abcdefg", mask: 'XX-XXX-XX', expected: 'ab-cde-fg' },
    { string: "abcdefg", mask: 'AA-AAA-AA', expected: 'AB-CDE-FG' },
    { string: "123", mask: '0.0,0', expected: '1.2,3' },
    { string: "1a2b3c", mask: 'ZZZZZZ', expected: '1A2B3C' },
    { string: "1a2b3c", mask: 'zzzzzz', expected: '1a2b3c' },
    { string: "abc?def,ge|123", mask: 'UUUUUUUUUUUUUU', expected: 'ABC?DEF,GE|123' },
    { string: "DE89370400440532013000", mask: 'AA00U0000U0000U0000U0000U00', expected: 'DE89370400440532013000    ' },
    { string: "4915771513520", mask: '(00) 000 000 000 00', expected: '(49) 157 715 135 20' },

    { string: "123", mask: '0', expected: '123' }, // the mask is shorter than the string
    { string: "111", mask: 'aaa', expected: '   ' },
  ] 

  if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    module.exports = StringsProvider
  } else if (root) {
    root.StringsProvider = StringsProvider
  }
})(this)
