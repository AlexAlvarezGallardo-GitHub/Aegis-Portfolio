# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Professional repository standards**: rewritten README, MIT `LICENSE.md`,
  `SECURITY.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `CODE_OF_CONDUCT.md`
  and a pull request template under `.github/`.

## [0.6.0] - 2026-08-07

### Added

- **Evidence gallery** ("The platform, in action"): 15 real screenshots of the
  running application and observability stack with a fullscreen lightbox
  (navigation, counter, keyboard support).
- Evidence metadata in `src/data/evidence.ts` and the `Evidence` navigation link.

### Fixed

- Reveal animation no longer flickers at the viewport edge (`once: true`).

## [0.5.0] - 2026-08-07

### Added

- Live GitHub metrics generated at build time (`github-metrics.json`) for the
  Engineering Dashboard.

## [0.4.0] - 2026-08-06

### Changed

- Hero diagram rebuilt and Aegis branding replaced.
- Removed leftover probe test files.

## [0.3.0] - 2026-08-05

### Added

- Process section, lightbox zoom and LinkedIn link.
- PR validation workflow (build, lint, test).

### Fixed

- GitHub Pages base path casing (`/Aegis-Portfolio/`).
- Reliable anchor navigation in the navbar and mobile menu.

## [0.2.0] - 2026-08-05

### Changed

- Dashboard reads the live `github-metrics.json` at build time; sample data removed.

## [0.1.0] - 2026-08-05

### Added

- Initial engineering portfolio website (Astro, TailwindCSS 4, MDX, Mermaid).
