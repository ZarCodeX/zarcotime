
---

### `CHANGELOG.md`
```md
# Changelog

All notable changes to this project will be documented in this file.

## [1.0.1] - 2025-08-27
### Added
- Intl.RelativeTimeFormat support (locale-aware output when available).
- CLI flags: `--locale`, `--style`, `--now`, `--numeric`.
- ESM entry (`esm/index.js`) and `exports` mapping in `package.json`.
- TypeScript declaration file (`types/index.d.ts`).
- Improved tests and edge case coverage.
- Repository metadata (bugs, homepage).
- CI workflow (GitHub Actions) to run tests on push/PR.
- README improvements and badges.
- ESLint + Prettier config files and rollup build config placeholder.
- Issue and PR templates, contributing guide, and dependabot config.

### Changed
- Updated package metadata and keywords.

### Fixed
- CLI handling of `now` and better error messages.
