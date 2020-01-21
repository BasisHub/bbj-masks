# [2.0.0](https://github.com/BasisHub/bbj-masks/compare/v1.8.0...v2.0.0) (2020-01-21)


### Bug Fixes

* Cannot detect default timezone in IE11 ([5da9288](https://github.com/BasisHub/bbj-masks/commit/5da92884d5c303b9d7674ce00ed2ec252b0e594f))
* Date format has invisible characters in IE11 ([147a617](https://github.com/BasisHub/bbj-masks/commit/147a61716fb478ea294aa0685ff34caed4b525c9))
* date mask cannot complete short iso strings ([d3b2ca3](https://github.com/BasisHub/bbj-masks/commit/d3b2ca35ee330fc1f3542a4968d65b3986a60f8b))
* DateMaks.mask does check if date is instance of Date before passing ([0a5601d](https://github.com/BasisHub/bbj-masks/commit/0a5601d03913f2799db0aa5e1e236cde1f10fd09))
* fixShortISO cannot handle offset in short dates ([fca30e3](https://github.com/BasisHub/bbj-masks/commit/fca30e3efb0054ca2604120c2ebfdaa64e4e95b5))
* IE11 - getTimezoneOrOffset() -> "offset" is read-only ([10c6181](https://github.com/BasisHub/bbj-masks/commit/10c6181cdfdaccd1bea59924cbdcfca80ec96d93))


### Features

* add strings format support ([4e594e9](https://github.com/BasisHub/bbj-masks/commit/4e594e9201c1cd2a0be4b72cc06231d917c7c4b9))
* add support for time strings formatting ([67bf95e](https://github.com/BasisHub/bbj-masks/commit/67bf95ef9ad703d20c9e04227d79aba5fe0a0016))
* add support for week numbers ([024d29d](https://github.com/BasisHub/bbj-masks/commit/024d29d2112e39f2a14b652129b7cdd2aaa1f09a))
* Parse date with timezone and locale ([103126c](https://github.com/BasisHub/bbj-masks/commit/103126c0c0bccd5c13aa9fab41817422c5fb0038))

## v1.8.0 - 22/08/2018

- Add License

## v1.7.0 - 22/08/2018

- Remove Datejs from deps to resolve the license issue

## v1.6.0 - 28/06/2018

- Change output file names in dist
- Define `bbj-masks.bundle.js` as main file in `package.json`

## v1.5.1 - 09/05/2018

- Fix group and decimal separators are not passed to the formatter in `BBj.Masks.Types`

## v1.5.0 - 09/05/2018

- Add the ability to replace the group and decimal separators for masked numbers

## v1.4.0 - 02/05/2018

- Remove [javascript-number-formatter] dependency
- Implement BBj number masking
- Improve tests
- Fix ie11 issue `Date can not be parsed`

## v1.3.2 - 19/04/2018

- Update to [hyyan/javascript-number-formatter#v2.0.1](https://github.com/hyyan/javascript-number-formatter)#v2.0.0 for numbers formatting

## v1.3.1 - 13/03/2018

- Use [hyyan/javascript-number-formatter](https://github.com/hyyan/javascript-number-formatter)#v2.0.0 for numbers formatting

## v1.3.0 - 05/03/2018

- Move masks static functions To `Types` class

## v1.2.4 - 26/02/2018

- Add `DateJs` as optional deps for IE11

## v1.2.3 - 26/02/2018

- Fix 24 hours are wrongly formatted

## v1.2.2 - 23/02/2018

- Improved webpack config to handle `BBj` namespace correclty

## v1.2.1 - 22/02/2018

- Update `package.json` with the correct version

## v1.2.0 - 21/02/2018

- Update `package.json` with the correct main file

## v1.1.0 - 16/02/2018

- Remove error checking on `maskDate`

## v1.0.0 - 16/02/2018

- First release
