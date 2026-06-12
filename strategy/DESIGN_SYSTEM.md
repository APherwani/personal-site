# Design System

## Intent

This is a design-stable personal site, not a theme playground. The handoff direction is paper-light, near-monochrome, precise, and artifact-led. Design changes should feel like tightening the existing system.

## Typography

- Display: Space Grotesk style, used for navigation hierarchy, headings, cards, and row titles.
- Prose: Newsreader style, used for body text and long-form reading.
- Metadata: IBM Plex Mono style, used for dates, labels, tags, status, and footers.
- Avoid viewport-scaled type. Use explicit sizes with responsive breakpoints.
- Keep letter spacing neutral unless a small uppercase metadata label needs air.

## Colors

- `--paper`: warm off-white page background.
- `--card`: subtly raised warm white surface.
- `--ink`: warm near-black.
- `--ink-soft`: secondary body text.
- `--faint`: metadata text.
- `--rule`: hairline borders.
- `--accent`: restrained olive/rust signal.
- `--accent-deep`: active/hover accent.
- `--accent-wash`: faint accent fill.
- `--ok` and `--hold`: status-specific signals.

Use the accent sparingly for state, current navigation, underlines, and important metadata. Do not turn the site into a single-hue accent exercise.

Dark mode is part of the same system, not a redesign. Preserve the warm paper-to-charcoal relationship, the olive/rust accent family, and the same component hierarchy. Any new surface color should be added as a token and checked in both themes.

## Spacing And Composition

- Max wide measure: about `1080px`.
- Prose measure: about `660px`.
- Rows and cards should be dense but breathable.
- Page sections are unframed layouts or full-width bands. Cards are for repeated items or specific framed artifacts.
- Do not nest cards inside cards.
- Preserve the homepage composition: compact hero, proof-of-work cards, then recent writing/log columns.

## Motion

Motion should be small and purposeful: link color, arrow movement, status affordance. Avoid decorative animation.

Respect `prefers-reduced-motion`.

## Image Treatment

Images should show actual artifacts or UI states. Use thin borders, restrained radii, and captions with clear synthetic-data language when appropriate. Avoid stock imagery and purely atmospheric visuals.

Personal portraits should stay small, documentary, and secondary to the work. The About sidebar is the default placement; do not turn the homepage into a portrait hero unless explicitly requested.

## Voice

Direct, specific, and practical. It is okay to be opinionated, but avoid hype. Project copy should describe artifacts and constraints. Writing copy should distinguish opinion from advice.

## Pages

- Home: identity, current focus, featured proof, latest writing, latest build-log notes.
- Projects: short artifact index.
- Project detail: what it is, what it models/builds, architecture, status.
- Writing: published essays plus planned topics clearly marked.
- Build log: structured entries in the fixed shape `goal -> setup -> worked -> failed -> changed -> next`.
- About: concise background, current focus, links.

## What Not To Change

- Do not redesign the page architecture without explicit request.
- Do not swap the type system casually.
- Do not change color tokens casually.
- Do not update visual snapshots casually.
- Do not ship placeholder internal links.
