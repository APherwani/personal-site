# Arjun Pherwani

Design-stable personal site for Arjun Pherwani: a static, content-forward portfolio for systems and platform engineering work, project proof, long-form writing, and build-log notes.

The production site is built with [Astro](https://astro.build/), TypeScript, and `pnpm`-locked dependencies. It publishes static output, keeps the public content surface intentionally small, and avoids trackers, stock imagery, and placeholder links.

## Current Surface

- Home: identity, current focus, and project cards.
- Projects: short index for public notes and upcoming work.
- Project detail pages: Olive and SelfControl launchd automation.
- Writing: published essays, starting with `Confessions of a Dubious Planner`.
- Build log: reserved for structured notes in the shape `goal -> setup -> worked -> failed -> changed -> next`.
- About: background, current focus, interests, and contact links.
- Resume: current public PDF linked from About and the footer.
- Generated endpoints: `rss.xml`, `robots.txt`, sitemap output, favicon, and social card.

The current public surface includes Olive, SelfControl launchd automation, upcoming Home lab work, and the first writing post. Build-log archives are empty until real public entries are ready.

## Local Development

Install dependencies:

```sh
pnpm install
```

Start the development server:

```sh
npm run dev
```

Build the static site:

```sh
npm run build
```

Preview the built output:

```sh
npm run preview
```

Use `pnpm install` or `corepack pnpm install` for dependency installs so the lockfile stays authoritative. Day-to-day scripts can be run with `npm run ...`.

## Verification

Fast local check:

```sh
npm run check
```

This runs Astro type checking, ESLint, and pure unit tests.

Build verification:

```sh
npm run build
```

Browser smoke tests:

```sh
npm run test:e2e
```

Accessibility checks:

```sh
npm run test:a11y
```

Visual snapshots:

```sh
npm run test:visual
```

Review visual diffs intentionally. Do not update snapshots casually, especially for unrelated content or copy changes.

## Cloudflare Pages Deployment

Deploy this site as a Cloudflare Pages project connected to GitHub. It is a static Astro site, so it does not need the Astro Cloudflare adapter, a Worker, or `wrangler deploy`.

Recommended Pages settings:

- Production branch: `main`
- Root directory: `/`
- Build command: `pnpm run build`
- Build output directory: `dist`
- Deploy command: leave blank
- Environment variables: `PNPM_VERSION=11.1.3`; optionally pin `NODE_VERSION=22.16.0`

Cloudflare Pages installs dependencies before running the build command. If dependency installation is intentionally disabled with `SKIP_DEPENDENCY_INSTALL=1`, then use `pnpm install --frozen-lockfile && pnpm run build` as the build command instead.

If a deploy log says `Executing user deploy command: npx wrangler deploy`, the project is configured for the wrong path. Remove the deploy command or recreate the deployment as a Pages Git integration. For a one-off direct upload outside the Git-connected flow, build locally and run `pnpm dlx wrangler pages deploy dist --project-name personal-site`.

## Project Structure

```text
src/
  components/        Shared Astro UI components
  data/site.ts       Site metadata, nav, project data, feed data, route expectations
  layouts/           Base document layout and metadata
  pages/             Astro routes and generated endpoints
  styles/global.css  Design tokens and global styling
strategy/            Design, content, release, bug, and upcoming-work notes
tests/
  e2e/               Playwright route, link, metadata, a11y, and visual checks
  unit/              Pure data tests
public/              Static favicon and social-card assets
```

## Content Workflow

Most public data starts in `src/data/site.ts`.

When adding or publishing content:

1. Add real content only. Do not publish fake PDFs, repos, dashboards, demos, or placeholder essays.
2. Add an internal link only when the route exists and should be public.
3. Update `routeExpectations` for new public pages that should be covered by route, metadata, link, a11y, and sitemap tests.
4. Keep dates concrete and sortable.
5. Label demo or synthetic screenshots explicitly, and do not publish personal/private data.
6. Make RSS feed items published-only.
7. Add a dated note to `RELEASE_NOTES.md`.

Project detail pages should ship only when there is a durable public artifact, screenshot set, source repo, or write-up. Writing and build-log entries should not appear as published work until they are ready to stand on their own.

## Design Posture

The design system is intended to be stable. Prefer refinement over redesign.

Use `strategy/DESIGN_SYSTEM.md` as the source of truth for typography, spacing, color tokens, page composition, image treatment, and voice. The site should stay quiet, precise, artifact-led, and content-forward.

Avoid broad palette changes, decorative gradients, oversized marketing hero sections, nested cards, casual type-system changes, unexplained animation, and placeholder internal links.

## Release Checklist

Before publishing, follow `strategy/RELEASE_CHECKLIST.md`.

Minimum local release pass:

```sh
npm run check
npm run build
npm run test:e2e
npm run test:a11y
```

Run and review `npm run test:visual` when CSS, layout, typography, images, or page composition changes.

After deploy, smoke test production routes, RSS, robots, sitemap output, canonical URLs, and the tracker-free privacy posture.
