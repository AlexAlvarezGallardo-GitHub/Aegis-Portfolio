# Aegis — Engineering Portfolio Website

> A world-class engineering portfolio disguised as an enterprise SaaS platform.

This website demonstrates the engineering mindset, architecture decisions and software
craftsmanship behind the Aegis platform. It is **not** meant to sell Aegis the product — it
is meant to sell the engineering. Every page answers a question a technical interviewer
would naturally ask.

## Stack

- **Astro** — static site framework
- **TailwindCSS 4** — styling (dark enterprise theme, `#D4AF37` gold)
- **TypeScript** — language
- **Motion One** — subtle scroll / counter animations
- **MDX** — documentation content
- **Mermaid** — architecture diagrams
- **GitHub Pages** — hosting

## Structure

```
src/
├── components/        # Page sections (Hero, Platform, Architecture, ...)
├── content/
│   └── docs/          # MDX documentation pages
├── content.config.ts  # Content collections
├── data/site.ts       # Curated platform facts
├── layouts/           # Global layout (nav, footer, fonts, scripts)
├── lib/github.ts      # Build-time GitHub API fetcher for the dashboard
├── pages/             # Routes (index, docs/[slug])
└── scripts/           # Client-side scripts (mermaid, reveal, counters)
```

## Development

```bash
npm install
npm run dev        # http://localhost:4321/aegis-portfolio/
npm run build      # static output to dist/
npm run preview
```

## Dashboard data

The **Engineering Dashboard** fetches real statistics from the Aegis repository at build
time. Provide a GitHub token with read access to that repo:

```bash
# local
$env:AEGIS_GITHUB_TOKEN = "github_pat_..."
npm run build
```

In CI the same variable is provided by the `AEGIS_GITHUB_TOKEN` Actions secret. Without a
token the dashboard falls back to sample data.

## Deployment

Pushes to `main` trigger [.github/workflows/deploy.yml](.github/workflows/deploy.yml),
which builds and publishes to GitHub Pages at:

https://alexalvarezgallardo-github.github.io/Aegis-Portfolio/
