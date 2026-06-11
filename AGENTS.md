# Arjun Personal Site Agent Guide

## What This Site Is

This is Arjun Pherwani's design-stable personal website: a static, content-forward portfolio for systems/platform engineering work, project proof, long-form writing, and build-log notes.

The handoff prototype came from Claude Design. The production site lives in this repo root; do not work inside the ignored handoff export.

## Local Dev Commands

Use `pnpm` from a normal shell. In the Codex desktop shell, `/opt/homebrew/bin/pnpm` may be needed because Homebrew is not always on `PATH`.

- `pnpm install` - install dependencies.
- `pnpm dev` - start local development.
- `pnpm build` - typecheck and build static output.
- `pnpm preview` - preview `dist/`.
- `pnpm check` - typecheck, lint, and run pure unit tests.
- `pnpm test:e2e` - browser route, link, and metadata smoke tests.
- `pnpm test:a11y` - browser accessibility checks.
- `pnpm test:visual` - visual snapshots for key pages.

## Design Posture

The design system is intended to be stable. Prefer refinement over redesign. Any visual change should preserve typography, spacing rhythm, color tokens, and page composition unless explicitly requested.

The site uses a warm paper background, near-monochrome text hierarchy, restrained olive/rust accent, dense rows/cards, and typography inspired by Space Grotesk, Newsreader, and IBM Plex Mono. Keep the design quiet, precise, and artifact-led.

Do not introduce broad palette changes, decorative gradients, oversized marketing hero sections, nested cards, or unexplained animation. Visual changes should be traceable to `strategy/DESIGN_SYSTEM.md`.

## Testing Expectations

Treat visual consistency, accessibility, content correctness, and deploy safety as first-class tests.

- Pure tests must not boot a browser or server.
- Browser, visual, and accessibility tests must stay separate.
- Expensive tests should be intentional and named.
- Visual diffs are expected to be reviewed intentionally. Do not update snapshots casually.
- Content links and metadata should fail loudly when a page moves.

## Release And Deploy Checklist

Before publishing:

- `pnpm check`
- `pnpm build`
- `pnpm test:e2e`
- `pnpm test:a11y`
- Review `pnpm test:visual` diffs when layout or CSS changes.
- Confirm environment variables and secrets are not required or are configured.
- Confirm domain, DNS, canonical URLs, sitemap, and robots output.
- Confirm analytics/privacy posture remains tracker-free unless explicitly changed.
- Smoke test the production URL after deploy.
- Add a dated note to `RELEASE_NOTES.md`.

## Agent Workflow Rules

Before starting: identify scope, risky files, assumptions, and pass/fail criteria.

Before changing: inspect existing code and design docs; preserve local style; keep edits scoped.

Before done: report tests run, tests not run, residual risks, and deploy notes.

Do not revert unrelated user changes. If the worktree is dirty, understand the touched files before editing them.

## Do Not Scatter AGENTS.md Everywhere

Keep one clear instruction file at the repo root. Do not add nested `AGENTS.md` files unless the user explicitly asks for a separate subproject with conflicting rules.
