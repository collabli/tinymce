# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased

### Added
- Added static `Optionals.is` and `Optionals.equals` methods.

### Removed
- Removed the `.is`, `.equals` and `.equals_` APIs from `Optional`.

### Improved
- The `Optional` type is now covariant with respect to its type argument.
  - In particular, this means that if all `Cat`s are `Animal`s, then all `Optional<Cat>`s are now `Optional<Animal>`s.

## 7.2.0 - 2021-05-06

### Added
- Introduced `Maybe` as an eventual replacement for `Optional`.
- Added `pipe` function to the `Fun` API.

### Changed
- Added type guard predicates to `Arr.find` methods #TINY-7138

## 7.1.0 - 2020-02-02

### Added
- New `Regex` module

## 7.0.0

### Removed
- Removed `Struct`. Please use TypeScript interfaces and functions instead.
