# BBj Masks

[![Build Status](https://travis-ci.com/BasisHub/bbj-masks.svg?branch=master)](https://travis-ci.com/BasisHub/bbj-masks)
![GitHub](https://img.shields.io/github/license/BasisHub/bbj-masks)
![GitHub file size in bytes](https://img.shields.io/github/size/BasisHub/bbj-masks/dist/bbj-masks.min.js)
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/BasisHub/bbj-masks)

[Browse API](https://basishub.github.io/bbj-masks/docs/api/) <br>

A small JavaScript library to format Dates , Numbers & Strings using BBj supported masks.

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Opera |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                                    last 2 versions                                                                                                   |                                                                                                 last 2 versions                                                                                                  |                                                                                               last 2 versions                                                                                                |                                                                                               last 2 versions                                                                                                |                                                                                             last 2 versions                                                                                              |

## Install

```
$ npm install BasisHub/bbj-masks
$ yarn add BasisHub/bbj-masks
```

## Usage

```js
const formattedNumber = BBj.Masks.Types.number(
  -5000.123456789,
  '$ -#,##0.######'
) // -> $ -5,000.123457

const formattedDate = BBj.Masks.Types.date(
  '2018-02-15T14:01:06Z',
  '%Yz - %Mz - %Dz'
) // -> 18 - 02 - 15

const formattedString = BBj.Masks.Types.string('abcdefg', 'XX-XXX-XX') // -> ab-cde-fg
```

**With ES6 modules**

```js
import Types, { NumberMask, DateMask, StringMask } from 'bbj-masks'

Types.number(-5000.123456789, '$ -#,##0.######')
Types.date('2018-02-15T14:01:06Z', '%Yz - %Mz - %Dz')
Types.string('abcdefg', 'XX-XXX-XX')

NumberMask.mask(-5000.123456789, '$ -#,##0.######')

DateMask.mask('2018-02-15T14:01:06Z', '%Yz - %Mz - %Dz')

StringMask.mask('abcdefg', 'XX-XXX-XX')
```

## [Date Masks](https://documentation.basis.com/BASISHelp/WebHelp/commands/date_function_bbj.htm)

| Mask | Supported | Description                                                                                                                                                                                                                        |
| :--: | :-------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  %Y  |     ✓     | Year                                                                                                                                                                                                                               |
|  %M  |     ✓     | Month                                                                                                                                                                                                                              |
|  %D  |     ✓     | Day                                                                                                                                                                                                                                |
|  %H  |     ✓     | Hour (24-hour clock)                                                                                                                                                                                                               |
|  %h  |     ✓     | Hour (12-hour clock)                                                                                                                                                                                                               |
|  %m  |     ✓     | Minute                                                                                                                                                                                                                             |
|  %s  |     ✓     | Second                                                                                                                                                                                                                             |
|  %t  |     ×     | Millisecond (thousandths of a second). Available in BBj 18.0 and higher.                                                                                                                                                           |
|  %P  |     ✓     | AM/PM                                                                                                                                                                                                                              |
|  %p  |     ✓     | am/pm                                                                                                                                                                                                                              |
|  %J  |     ✓     | Day number within the year (1-366). (This format is unique to BBj.)                                                                                                                                                                |
|  %W  |     ✓     | Day number within the week (1-7, Sunday=1). This format is unique to BBj.                                                                                                                                                          |
|  %w  |     ✓     | Week number within the year (1-53, differs by locale)                                                                                                                                                                              |
|  %d  |     ×     | Day number within the week (1-7, differs by locale). Available in BBj 16.0 and higher                                                                                                                                              |
|  %y  |     ×     | Base year of the current week, available in BBj 16.0 and higher. The first few days of January may fall into the last week of the previous year. The last few days of December may fall into the first week of the following year. |

| Modifier | Supported | Description                   |
| :------: | :-------: | :---------------------------- |
|    %z    |     ✓     | Zero-fill                     |
|    %s    |     ✓     | Short text                    |
|    %l    |     ✓     | Long text                     |
|    %p    |     ✓     | Packed number (in CHR() form) |
|    %d    |     ✓     | Decimal (default format)      |

## [Number Masks](https://documentation.basis.com/BASISHelp/WebHelp/usr/numeric_output.htm)

| Mask | Supported | Description                                                                                                                                                                                                                                                                                                                                                                                                          |
| :--: | :-------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  0   |     ✓     | A zero is always replaced by a digit(0..9).                                                                                                                                                                                                                                                                                                                                                                          |
|  #   |     ✓     | The pound sign is used to suppress leading zeroes. It is replaced by the fill character for leading zeroes to the left of the decimal point. For trailing zeros to the right of the decimal point it is replaced by a space or a zero (see [forceTrailingZeros option](https://basishub.github.io/bbj-masks/docs/api/class/src/NumberMask/NumberMask.js~NumberMask.html)). Any other time it is replaced by a digit. |
|  ,   |     ✓     | To the left of the decimal point, the comma is replaced by the fill character if no digits have yet been placed. Any other time, it results in a comma.                                                                                                                                                                                                                                                              |
|  \*  |     ✓     | The asterisk "\*" is inserted into the number.                                                                                                                                                                                                                                                                                                                                                                       |
|  .   |     ✓     | The decimal point is replaced by a decimal point if any digits appear in the output mask. Otherwise, it is replaced by the fill character. After the decimal point, the fill character becomes a space.                                                                                                                                                                                                              |
|  \$  |     ✓     | The dollar sign always results in a dollar sign.                                                                                                                                                                                                                                                                                                                                                                     |
|  (   |     ✓     | left parenthesis results in a "(" if the number is negative, or the fill character if positive.                                                                                                                                                                                                                                                                                                                      |
|  )   |     ✓     | A right parenthesis results in a ")" if the number is negative, or the fill character if positive.                                                                                                                                                                                                                                                                                                                   |
|  )   |     ✓     | A right parenthesis results in a ")" if the number is negative, or the fill character if positive.                                                                                                                                                                                                                                                                                                                   |
|  CR  |     ✓     | The characters "CR" are inserted into the number if the number is negative. Two spaces are inserted if the number is positive.                                                                                                                                                                                                                                                                                       |
|  DR  |     ✓     | The characters "CR" are inserted into the number if the number is negative. The characters "DR" are inserted if the number is positive.                                                                                                                                                                                                                                                                              |
|  B   |     ✓     | The upper case "B" always becomes a space. Any other character is simply copied to the result.positive.                                                                                                                                                                                                                                                                                                              |

## [String Masks](https://documentation.basis.com/BASISHelp/WebHelp/commands2/str_function.htm)

| Mask | Supported | Description                                                                                                            |
| :--: | :-------: | :--------------------------------------------------------------------------------------------------------------------- |
|  X   |     ✓     | Any printable character.                                                                                               |
|  a   |     ✓     | Any alphabetic character.                                                                                              |
|  A   |     ✓     | Any alphabetic character. Converts lower-case alphabetic characters to upper case.                                     |
|  0   |     ✓     | Any digit.                                                                                                             |
|  z   |     ✓     | Any digit or alphabetic character.                                                                                     |
|  Z   |     ✓     | Any digit or alphabetic character. Converts lower-case alphabetic characters to upper case.                            |
|  U   |     ✓     | Any digit , alphabetic character , whitespace or punctuation. Converts lower-case alphabetic characters to upper case. |

## License

Licensed under the [MIT License](https://github.com/BasisHub/bbj-masks/blob/master/LICENSE).
