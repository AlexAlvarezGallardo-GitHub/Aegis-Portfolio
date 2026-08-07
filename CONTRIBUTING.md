# Contributing to Aegis-Portfolio

Thank you for your interest in contributing to Aegis-Portfolio. This guide defines how to
contribute, what is expected from you, and how your changes are reviewed and merged.

This website is the public face of the [Aegis](https://github.com/AlexAlvarezGallardo-GitHub/Aegis)
engineering work. Content here must be accurate, evidence-driven and consistent with the
platform it presents.

---

## Table of Contents

1. [Development Requirements](#development-requirements)
2. [Project Conventions](#project-conventions)
3. [Branches](#branches)
4. [Commit Messages](#commit-messages)
5. [Pull Requests](#pull-requests)
6. [Running Quality Gates](#running-quality-gates)
7. [Definition of Done](#definition-of-done)
8. [AI-Assisted Development](#ai-assisted-development)
9. [Getting Help](#getting-help)

---

## Development Requirements

| Tool | Purpose |
|------|---------|
| Node.js | 20+ |
| npm | 10+ |

### First-time setup

```bash
npm install
```

---

## Project Conventions

- **Astro + TypeScript** — components live under `src/components/`, pages under `src/pages/`.
- **Content-driven** — curated facts live in `src/data/`, docs in `src/content/docs/`.
- **Mermaid, not ASCII** — architecture and flow diagrams use ` ```mermaid ` blocks.
- **Evidence-based** — every claim links to the Aegis repository or a captured screenshot.
- **No secrets** — nothing is committed; the dashboard token is injected at build time.

---

## Branches

- `main` is the only long-lived branch and must always be deployable.
- Create feature branches from `main` and merge via pull request.
- Branch naming: `<type>/<short-description>` (lowercase kebab-case).

| Type | Use for |
|------|---------|
| `feature/` | New sections, components or pages |
| `fix/` | Bug fixes |
| `chore/` | Maintenance, dependencies, tooling |
| `docs/` | Documentation-only changes |

---

## Commit Messages

Format: `<type>(<scope>): <description>`

```text
feat(frontend): add evidence gallery section
fix(frontend): stop reveal animation from flickering
docs: document the dashboard data pipeline
```

- **Types**: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `ci`, `perf`, `security`
- **Scopes**: `frontend`, `infra`, `portfolio`
- Description: lowercase, imperative mood, no period, max 72 chars.
- Reference issues in the footer: `Closes #42`.

---

## Pull Requests

- **One PR per change.** Keep PRs small and focused.
- PR title follows the same `<type>(<scope>): <description>` format as commits.
- PR body **must** include the sections from `.github/pull_request_template.md`:
  Summary, Changes, Testing, and Checklist.
- At least **one approval** is required before merging.
- All CI checks must pass.
- Merge with **squash** to keep history clean.

> The PR validation workflow runs `npm run build` on every pull request.
> A PR that fails validation cannot be merged.

---

## Running Quality Gates

```bash
npm run build      # production build (validates templates and content collections)
```

For content changes, verify the built site locally:

```bash
npm run build && npm run preview
```

---

## Definition of Done

A change is considered done when **all** of the following are true:

- [ ] Build passes (`npm run build`)
- [ ] Content is accurate and links to the Aegis repository where it makes claims
- [ ] Diagrams use Mermaid, not ASCII
- [ ] No secrets or personal data committed
- [ ] Responsive behavior verified for new UI (desktop + mobile)
- [ ] Documentation kept in sync (README, changelog)

---

## AI-Assisted Development

Aegis is built through an **AI-assisted engineering workflow with human ownership** of
architecture, validation and technical decisions. If you use AI tools:

- **You are responsible** for every line of code merged, even AI-generated ones.
- Validate AI output against the project conventions.
- Never paste secrets, tokens or personal data into AI prompts.
- AI-generated changes must pass the same quality gates as hand-written ones.

---

## Getting Help

- Issues: [GitHub Issues](https://github.com/AlexAlvarezGallardo-GitHub/Aegis-Portfolio/issues)
- Security reports: see [`SECURITY.md`](SECURITY.md)
- Platform details: [Aegis](https://github.com/AlexAlvarezGallardo-GitHub/Aegis)

Please be respectful and constructive. This is a portfolio reference architecture,
not a commercial product — feedback that improves engineering quality is always welcome.
