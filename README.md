<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white&labelColor=1a1a2e">
  <img alt="Astro" src="https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white&labelColor=1a1a2e">
</picture>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=1a1a2e">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=1a1a2e">
</picture>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white&labelColor=1a1a2e">
  <img alt="GitHub Pages" src="https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white&labelColor=1a1a2e">
</picture>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&labelColor=1a1a2e">
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&labelColor=1a1a2e">
</picture>

---

# **Aegis-Portfolio** — Engineering Portfolio

> **A world-class engineering portfolio disguised as an enterprise SaaS platform. Every page answers the question a technical interviewer would naturally ask.**

This website presents the engineering behind the [Aegis platform](https://github.com/AlexAlvarezGallardo-GitHub/Aegis): the architecture, the decisions, the process and the evidence. It is not meant to sell Aegis the product — it is meant to sell the engineering. It demonstrates how a single engineer designs, specifies, builds, tests, ships and operates a distributed system with production rigor.

Live at **https://alexalvarezgallardo-github.github.io/Aegis-Portfolio/**

---

## Table of Contents

- [What's inside](#whats-inside)
- [Stack](#stack)
- [Project structure](#project-structure)
- [Development](#development)
- [Quality gates](#quality-gates)
- [Dashboard data](#dashboard-data)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## What's inside

The portfolio is organized as a single scrollable experience backed by real evidence:

| Section | Shows |
|---------|-------|
| **Platform** | What Aegis is — the product, its capabilities and design principles |
| **Architecture** | Hexagonal services, Kafka event backbone, transactional outbox, design rules and the technology stack |
| **Engineering** | The *why* behind every technology choice (ADRs) |
| **AI Platform** | The AI-assisted engineering workflow that built it |
| **Process & Velocity** | The real six-week timeline and the engineering knowledge loop |
| **Infrastructure** | CI/CD, containerization, GitOps delivery and supply-chain security |
| **Observability** | OpenTelemetry, Tempo, Prometheus, Loki and Grafana |
| **Security** | Session hardening, RBAC, secret scanning and signed supply chain |
| **Engineering Dashboard** | Live GitHub metrics from the Aegis repository |
| **Evidence** | Real screenshots of the running application and observability stack |
| **Documentation** | Architecture, ADRs, OpenAPI contracts, standards, setup and deployment |
| **Roadmap** | Shipped, in-flight and planned work |

Every claim is backed by a link to the source repository or a captured screenshot — nothing is asserted without evidence.

## Stack

- **Astro** — static site framework
- **TailwindCSS 4** — styling (dark enterprise theme, `#D4AF37` gold)
- **TypeScript** — language
- **Motion One** — scroll and counter animations
- **MDX** — documentation content
- **Mermaid** — architecture diagrams
- **GitHub Pages** — hosting

## Project structure

```
src/
├── components/          # Page sections (Hero, Platform, Architecture, Evidence, ...)
├── content/
│   └── docs/            # MDX documentation pages
├── content.config.ts    # Content collections
├── data/
│   ├── site.ts          # Curated platform facts
│   └── evidence.ts      # Evidence gallery metadata
├── layouts/             # Global layout (nav, footer, fonts, scripts)
├── lib/github.ts        # Build-time GitHub API fetcher for the dashboard
├── pages/               # Routes (index, docs/[slug])
├── scripts/             # Client-side scripts (mermaid, reveal, counters, lightbox)
└── styles/              # Global styles
```

## Development

```bash
npm install
npm run dev        # http://localhost:4321/aegis-portfolio/
npm run build      # static output to dist/
npm run preview    # serve the built site locally
```

## Quality gates

The PR validation workflow (`.github/workflows/pr-validation.yml`) runs a production build on every pull request:

```bash
npm run build
```

The build must pass before a PR can be merged.

## Dashboard data

The **Engineering Dashboard** fetches real statistics from the Aegis repository at build time. Provide a GitHub token with read access to that repo:

```bash
# local
$env:AEGIS_GITHUB_TOKEN = "github_pat_..."
npm run build
```

In CI the same variable is provided by the `AEGIS_GITHUB_TOKEN` Actions secret. Without a token the dashboard falls back to sample data.

## Deployment

Pushes to `main` trigger [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds and publishes the site to GitHub Pages.

---

## Contributing

- **Contributing guide** → [`CONTRIBUTING.md`](CONTRIBUTING.md)
- **Changelog** → [`CHANGELOG.md`](CHANGELOG.md)
- **Security policy** → [`SECURITY.md`](SECURITY.md)
- **License** → [`LICENSE.md`](LICENSE.md)

### Related repositories

| Repository | Purpose |
|------------|---------|
| [Aegis](https://github.com/AlexAlvarezGallardo-GitHub/Aegis) | The platform this portfolio showcases |
| [Aegis-GitOps](https://github.com/AlexAlvarezGallardo-GitHub/Aegis-GitOps) | Deployment configuration via GitOps |
