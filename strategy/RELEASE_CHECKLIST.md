# Release Checklist

## Preflight

- Scope is clear.
- Risky files are identified.
- Assumptions are written down.
- Pass/fail criteria are known before edits start.

## Local Verification

- `pnpm check`
- `pnpm build`
- `pnpm test:e2e`
- `pnpm test:a11y`
- `pnpm test:visual` when CSS, layout, typography, images, or page composition changes.

## Deploy

- Env vars and secrets reviewed.
- Cloudflare project is Pages, not Workers.
- Cloudflare build command is `pnpm run build` unless dependency installation is intentionally disabled.
- Cloudflare build output directory is `dist`.
- Cloudflare deploy command is blank for the Git-connected Pages flow.
- `npx wrangler deploy` is not configured for this static site.
- Domain and DNS configured.
- Canonical URLs match production.
- `sitemap-index.xml`, generated sitemap entries, `robots.txt`, and `rss.xml` are reachable.
- Analytics/privacy posture reviewed.
- Cache behavior understood.

## Postflight

- Smoke test production Home, Projects, Writing, Build log, About.
- Check one article page and one project page.
- Check RSS and sitemap.
- Add dated `RELEASE_NOTES.md` entry.
- Record residual risk in the final handoff.
