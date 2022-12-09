## [1.4.2](https://github.com/BasisHub/bbj-masks/compare/v1.4.1...v1.4.2) (2022-12-09)


### Bug Fixes

* `$` is floating correctly, but another `$` also appears at the beginning ([3fb71ba](https://github.com/BasisHub/bbj-masks/commit/3fb71ba64472fd7b4f7765ada6086f6892695163))



## [1.4.1](https://github.com/BasisHub/bbj-masks/compare/v1.4.0...v1.4.1) (2021-05-10)


### Bug Fixes

* **NumberMask:** floatSpecialChars is applied wrongly for "(" & ")" chars ([e62d305](https://github.com/BasisHub/bbj-masks/commit/e62d305e205748fcc1e20b027d29bb350d4a8869))



# [1.4.0](https://github.com/BasisHub/bbj-masks/compare/v1.3.0...v1.4.0) (2021-05-04)



# [1.3.0](https://github.com/BasisHub/bbj-masks/compare/v1.2.1...v1.3.0) (2021-01-25)


### Reverts

* fix(StringMask): space should be the pad char for X & U only ([c973ace](https://github.com/BasisHub/bbj-masks/commit/c973ace3d7cb7f0f8ccca8ceb67f18b117ae67a5))



## [1.2.1](https://github.com/BasisHub/bbj-masks/compare/v1.2.0...v1.2.1) (2021-01-22)


### Bug Fixes

* **StringMask:** space should be the pad char for X & U only ([779638e](https://github.com/BasisHub/bbj-masks/commit/779638ec80e6eec5b16f9dad14e280cb948acaa3))



# [1.2.0](https://github.com/BasisHub/bbj-masks/compare/v1.1.1...v1.2.0) (2020-11-18)


### Features

* add support for inputn like number mask style ([a093004](https://github.com/BasisHub/bbj-masks/commit/a093004c46bb712253bc1453bd4eb0a88063a839))



## [1.1.1](https://github.com/BasisHub/bbj-masks/compare/v1.1.0...v1.1.1) (2020-02-18)


### Bug Fixes

* update to date-fns-tz@1.0.10 to fix chrome 80 tests failing ([440373a](https://github.com/BasisHub/bbj-masks/commit/440373a27593659a34405eafdb86b8fbe4e79adb))



# [1.1.0](https://github.com/BasisHub/bbj-masks/compare/v1.0.0...v1.1.0) (2020-02-05)


### Bug Fixes

* fix worng implementation for NumberMask's forceTrailingZeros option ([a4e623a](https://github.com/BasisHub/bbj-masks/commit/a4e623aafc970873f59b58d14b2c4f70ccf7c802))


### Features

* add mask number loose mode ([9ef4dc1](https://github.com/BasisHub/bbj-masks/commit/9ef4dc11ab3cb5f45704fe38408021f02089a410))
* re-implement str masking to match BBj specs ([69367b4](https://github.com/BasisHub/bbj-masks/commit/69367b475f56037e3f4112211973db434ecdb0b7))
* reimplement num masking to match BBj sepcs ([1cdf3c2](https://github.com/BasisHub/bbj-masks/commit/1cdf3c26aa570df3d2a08ffcbda852df657e90c8))


### BREAKING CHANGES

* currenlty the strings masking can throw errors in case
something went worng during the mask appling process. The string mask
also intrdouced the `loose` mode to ignore error and keep trying to apply
mask till the end of the string.
* number masking will output empty spaces now for bound
signs which can not be matcher instead of nothing