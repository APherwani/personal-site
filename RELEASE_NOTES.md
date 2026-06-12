# Release Notes

Use dated sections. Include content additions, design changes, SEO/schema changes, accessibility fixes, deploy/process changes, and notable test updates.

## 2026-06-12

- Documented the Cloudflare Pages deployment settings and the `wrangler deploy` misconfiguration to avoid sending the static Astro site through the Workers setup path.
- Renamed the first writing post route to `/writing/confessions-of-a-dubious-planner/` and added a Cloudflare Pages redirect from the old planner-and-elephant slug.
- Added the current résumé PDF and linked it from About and the footer.
- Replaced the unconfigured `hello@arjunpherwani.dev` contact address with `arjunpherwani@outlook.com`.
- Added Zero Game as a public project page with its GitHub repo, project icon, route coverage, and link checks.

## 2026-06-11

- Published the first writing post, "Confessions of a Dubious Planner," with RSS and sitemap coverage.
- Added public project pages for Olive and SelfControl launchd automation.
- Added Olive demo-seed screenshots from the local app and linked the public SelfControl automation repo.
- Scrubbed previously seeded project, writing, and build-log content from the live routes.
- Kept the home lab as upcoming work in progress until its notes are ready.
- Updated route, link, metadata, accessibility, and visual tests to enforce the smaller public surface.
- Initialized the personal site as a Git-backed Astro static project.
- Ported the Claude Design handoff into a production Astro structure, then reduced the public content surface to Home, Projects, Writing, Build log, and About.
- Added root agent guidance, strategy docs, release checklist, and a test split for pure, browser, accessibility, and visual checks.
- Added SEO metadata, sitemap integration, robots output, and RSS feed scaffolding.
- Removed broken résumé PDF navigation from the shipped footer until a real asset exists.
