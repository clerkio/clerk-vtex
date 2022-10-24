# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Allow product feed to be created when account has up to 55k products. Not tested on accounts with more products than that.

## [1.1.1] - 2022-10-20

### Added

- Allow single binding configuration in the app settings.

### Fixed

- Fixed issue with Product Feed containing products with pricer `0`.

## [1.1.0] - 2021-11-05

### Added

- Start new `product` and `category` feeds after sending the current ones.
- Query Param `skipFeed` that can be applied to feed routes to avoid starting new `product` and `category` feed.
