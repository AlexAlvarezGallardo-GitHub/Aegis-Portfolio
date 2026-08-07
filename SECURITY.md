# Security Policy

Aegis-Portfolio is a static site that presents the engineering behind the Aegis platform. It is deployed to GitHub Pages and has no server-side runtime, but it is maintained with the same security discipline as the rest of the Aegis organization.

## Supported Versions

This repository is continuously developed. Only the latest commit on `main` receives security fixes.

| Version | Supported |
|---------|-----------|
| `main` (latest) | :white_check_mark: |
| Previous releases | :x: |

## Reporting a Vulnerability

Please **do not open a public issue** for security problems.

If you find a vulnerability, use one of these private channels:

1. **GitHub Private Vulnerability Reporting** (preferred) — the repository enables the "Security" tab → "Report a vulnerability" flow.
2. **Email** the maintainer directly: `alexag1999@gmail.com`.

### What to include

- Affected page/component and commit SHA if possible.
- Type of vulnerability and severity assessment.
- Steps to reproduce (minimal, no production data).

### What happens next

- Acknowledgment within **48 hours**.
- Confirmation and triage within **5 business days**.
- A coordinated disclosure timeline is agreed before any public notice.
- The reporter is credited (unless they prefer anonymity).

## Security Practices Applied

| Area | Practice |
|------|----------|
| **Runtime** | Static site served from GitHub Pages — no server, no database, no session state |
| **Dependencies** | `npm audit` and dependency review in the PR validation workflow |
| **Secrets** | No secrets in the repository; the dashboard token is injected at build time via Actions secrets |
| **Content** | All third-party links use `rel="noreferrer"`; no external scripts beyond fonts and badges |
| **Supply chain** | Deployment is automated via GitHub Actions with a pinned Node version |

## Disclosure Policy

This is a personal/portfolio codebase. We follow a responsible-disclosure model: no exploit hunting outside your own deployments, no disclosure to third parties until the maintainer has had a reasonable window to fix the issue.
