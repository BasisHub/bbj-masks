; (function (root, undefined) {
  var NumbersProvider = [    
    { number: 123, mask: '000', expected: '123' },
    { number: 123, mask: '0000', expected: '0123' },
    { number: 1234, mask: '##,##0', expected: ' 1,234' },
    { number: 12345.67, mask: '-###,###,##0', expected: '      12,346' },
    { number: 123456789.123, mask: '#,##0.00', expected: '123456789.123' },
    { number: 123456.789, mask: '###,##0.00', expected: '123,456.79' },
    { number: 123456.7, mask: '###,##0.00', expected: '123,456.70' },
    { number: 123456, mask: '#,##0.00', expected: '123456' },
    { number: 0, mask: '#,##0.00', expected: '    0.00' },
    { number: -0.1, mask: '#', expected: ' ' },
    { number: -0.1, mask: '0', expected: '0' },
    { number: -123456.789, mask: '#,##0.00', expected: '-123456.789' },
    { number: 0, mask: '#,##0.0', expected: '    0.0' },
    { number: 0, mask: '#,##0', expected: '    0' },
    { number: -0.13, mask: '0.#', expected: '0.1' },
    { number: -123, mask: '#,##0', expected: '  123' },
    { number: -123, mask: '#,##0.0', expected: '  123.0' },
    { number: -123, mask: '#,##0.00', expected: '  123.00' },

    // Numbers with positive sign
    {
      number: +5000.123456789,
      mask: '+#,##0.######',
      expected: '+5,000.123457'
    },
    {
      number: 5000.123456789,
      mask: '+#,##0.######',
      expected: '+5,000.123457'
    },
    { number: +5000.123456789, mask: '#,##0.######', expected: '5,000.123457' },
    {
      number: -5000.123456789,
      mask: '+#,##0.######',
      expected: '-5,000.123457'
    },

    // Numbers with negative sign
    {
      number: -5000.123456789,
      mask: '-#,##0.######',
      expected: '-5,000.123457'
    },
    {
      number: 5000.123456789,
      mask: '-#,##0.######',
      expected: ' 5,000.123457'
    },
    { number: -5000.123456789, mask: '#,##0.######', expected: '5,000.123457' },
    {
      number: -5000.123456789,
      mask: '$ #,##0.######',
      expected: '$ 5,000.123457'
    },
    {
      number: -5000.123456789,
      mask: '$ -#,##0.######',
      expected: '$ -5,000.123457'
    },

    // separators
    {
      number: 1234,
      mask: '##,##0',
      groupingSep: '.',
      decimalSeparator: ',',
      expected: ' 1.234'
    },
    {
      number: -5000.123456789,
      mask: '+#,##0.######',
      groupingSep: '.',
      decimalSeparator: ',',
      expected: '-5.000,123457'
    },

    // force trailing Zero
    {
      number: .10,
      mask: '#.##',
      expected: ' .1 ',
      forceTrailingZeros: false
    },    
    {
      number: .10,
      mask: '#.##',
      expected: ' .10',
      forceTrailingZeros: true
    },

    {
      number: 1234,
      mask: '0',
      throwError: /Number is too large/
    },
    {
      number: 1234,
      mask: '',
      throwError: /Mask is empty/
    },

    // ignoreFillChar
    // floatSpecialChars
    // trimSpaces
    {
      number: -12345.00,
      mask: '*-$###,###,###.##',
      expected: '*-$12,345.00',
      trimSpaces: true,
      ignoreFillChar: true,
      forceTrailingZeros: true,
      floatSpecialChars: false
    },
    {
      number: 12345.00,
      mask: '*-$###,###,###.##',
      expected: '*$12,345.00',
      trimSpaces: true,
      ignoreFillChar: true,
      forceTrailingZeros: true,
      floatSpecialChars: false
    },    
    {
      number: 123.45,
      mask: '*-$###,###,###.##',
      expected: '*$123.45',
      trimSpaces: true,
      ignoreFillChar: true,
      forceTrailingZeros: true,
      floatSpecialChars: false
    },   
    {
      number: -123.45,
      mask: '*-$###,###,###.##',
      expected: '*-$123.45',
      trimSpaces: true,
      ignoreFillChar: true,
      forceTrailingZeros: true,
      floatSpecialChars: false
    },        
    {
      number: -12345.00,
      mask: '($###,###,###.##)',
      expected: '($12,345.00)',
      trimSpaces: true,
      ignoreFillChar: true,
      forceTrailingZeros: true,
      floatSpecialChars: false
    },
    {
      number: 12345.00,
      mask: '($###,###,###.##)',
      expected: '$12,345.00',
      trimSpaces: true,
      ignoreFillChar: true,
      forceTrailingZeros: true,
      floatSpecialChars: false
    },   
    {
      number: -12345.00,
      mask: '($###,###,###.##)',
      expected: '($12,345.00)',
      trimSpaces: true,
      ignoreFillChar: true,
      forceTrailingZeros: true,
      floatSpecialChars: false
    },   
    {
      number: -123.45,
      mask: '($###,###,###.##)',
      expected: '($123.45)',
      trimSpaces: true,
      ignoreFillChar: true,
      forceTrailingZeros: true,
      floatSpecialChars: false
    }, 
    {
      number: 123.45,
      mask: '($###,###,###.##)',
      expected: '$123.45',
      trimSpaces: true,
      ignoreFillChar: true,
      forceTrailingZeros: true,
      floatSpecialChars: false
    },                
  ]

  if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    module.exports = NumbersProvider
  } else if (root) {
    root.NumbersProvider = NumbersProvider
  }
})(this)
