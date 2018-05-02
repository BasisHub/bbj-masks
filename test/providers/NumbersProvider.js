(function (root, undefined) {

    var NumbersProvider = [
      { number: 123, mask: '000', expected: "123" },
      { number: 123, mask: '0000', expected: "0123" },
      { number: 1234, mask: '##,##0', expected: "1,234" },
      { number: 12345.67, mask: '-###,###,##0', expected: "12,346" },
      { number: 123456789.123, mask: '#,##0.00', expected: "123456789.123" },
      { number: 123456.789, mask: '###,##0.00', expected: "123,456.79" },
      { number: 123456.7, mask: '###,##0.00', expected: "123,456.70" },
      { number: 123456, mask: '#,##0.00', expected: "123456" },
      { number: 0, mask: '#,##0.00', expected: "0.00" },
      { number: -0.1, mask: '#', expected: "" },
      { number: -0.1, mask: '0', expected: "0" },
      { number: -123456.789, mask: '#,##0.00', expected: "-123456.789" },
      { number: 0, mask: '#,##0.0', expected: "0.0" },
      { number: 0, mask: '#,##0', expected: "0" },
      { number: -0.13, mask: '0.#', expected: "0.1" },
      { number: -123, mask: '#,##0', expected: "123" },
      { number: -123, mask: '#,##0.0', expected: "123.0" },
      { number: -123, mask: '#,##0.00', expected: "123.00" },

      // Numbers with positive sign
      { number: +5000.123456789, mask: '+#,##0.######', expected: "+5,000.123457" },
      { number: 5000.123456789, mask: '+#,##0.######', expected: "+5,000.123457" },
      { number: +5000.123456789, mask: '#,##0.######', expected: "5,000.123457" },
      { number: -5000.123456789, mask: '+#,##0.######', expected: "-5,000.123457" },

      // Numbers with negative sign
      { number: -5000.123456789, mask: '-#,##0.######', expected: "-5,000.123457" },
      { number: 5000.123456789, mask: '-#,##0.######', expected: "5,000.123457" },
      { number: -5000.123456789, mask: '#,##0.######', expected: "5,000.123457" },
      { number: -5000.123456789, mask: '$ #,##0.######', expected: "$ 5,000.123457" },
      { number: -5000.123456789, mask: '$ -#,##0.######', expected: "$ -5,000.123457" },
    ];
  
    if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
      module.exports = NumbersProvider;
    } else if (root) {
      root.NumbersProvider = NumbersProvider;
    }
  }(this));
  