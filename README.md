# BBj Masks

[![pipeline status](https://git.storesandbox.de/hyyan/bbj-masks/badges/master/pipeline.svg)](https://git.storesandbox.de/hyyan/bbj-masks/commits/master)

A library to format Javascript Dates & Numbers using BBj supported masks.

## Usage 

Include the library file 

```js 
 <script src="dist/bbj-masks.min.js"></script>
```

The you can use it as the following code shows

```js
const formattedNumber = BBj.Masks.number(1234567.890 , "#,##0.####")
console.log(formattedNumber) // -> 1,234,567.89

const formattedDate = BBj.Masks.date('2018-02-15 14:01:06' , "%Yz - %Mz - %Dz")
console.log(formattedDate) // -> 18 - 02 - 15
```

## Difference Between BBj & JS

### Dates

| Mask          | Supported     | Description|  Note|
|:-------------: |:-------------:|:----------|:--------:|
| %Y      | ✓ |Year|
| %M      | ✓ |Month| `s` and  `l` modifiers are not supported
| %D      | ✓ |Day| `s` and  `l` modifiers are not supported
| %H      | ✓ |Hour (24-hour clock)|
| %h      | ✓ |Hour (12-hour clock)|
| %m      | ✓ |Minute|
| %s      | ✓ |Second|
| %t      | × |Millisecond (thousandths of a second). Available in BBj 18.0 and higher.|
| %P      | ✓ |AM/PM|
| %p      | ✓ |am/pm|
| %J      | ✓ |	Day number within the year (1-366). (This format is unique to BBj.)|
| %W      | ✓ |Day number within the week (1-7, Sunday=1). This format is unique to BBj.
| %w      | × |Week number within the year (1-53, differs by locale)|
| %d      | × |Day number within the week (1-7, differs by locale). Available in BBj 16.0 and higher
| %y      | × |	Base year of the current week, available in BBj 16.0 and higher. The first few days of January may fall into the last week of the previous year. The last few days of December may fall into the first week of the following year.|

| Modifier          | Supported     | Description| Note|
|:-------------: |:-------------:|:----------|:--------:|
| %z      | ✓ |Zero-fill|
| %s      | ✓ |Short text|
| %l      | ✓ |Long text|
| %p      | ✓ |Packed number (in CHR() form)|
| %d      | ✓ |Decimal (default format)|


## Numbers 

| Mask          | Supported     | Description|
|:-------------: |:-------------:|:----------|
| 0      | ✓ |A zero is always replaced by a digit(0..9).|
| #      | ✓ |The pound sign is used to suppress leading zeroes. It is replaced by the fill character for leading zeroes to the left of the decimal point. For trailing zeros to the right of the decimal point it is replaced by a space or a zero (see SETOPTS Byte 4, Bit $04$ for more detail). Any other time it is replaced by a digit. See SETOPTS for more information.|
| ,      | ✓ |To the left of the decimal point, the comma is replaced by the fill character if no digits have yet been placed. Any other time, it results in a comma.|
| *      | ✓ |The asterisk "*" is inserted into the number.|
| .      | ✓ |The decimal point is replaced by a decimal point if any digits appear in the output mask. Otherwise, it is replaced by the fill character. After the decimal point, the fill character becomes a space.|
| $      | ✓ |The dollar sign always results in a dollar sign.|
| (      | × |left parenthesis results in a "(" if the number is negative, or the fill character if positive.|
| )      | × |A right parenthesis results in a ")" if the number is negative, or the fill character if positive.|
| )      | × |A right parenthesis results in a ")" if the number is negative, or the fill character if positive.|
| CR      | × |	The characters "CR" are inserted into the number if the number is negative. Two spaces are inserted if the number is positive.|
| DR      | × |	The characters "CR" are inserted into the number if the number is negative. The characters "DR" are inserted if the number is positive.|
| B      | × | The upper case "B" always becomes a space. Any other character is simply copied to the result.positive.|

[See Examples Table](http://mottie.github.io/javascript-number-formatter/)

## Commands 

* Install deps : `yarn install`
* Run Tests : `yarn Test`
* Build : `yarn build`

