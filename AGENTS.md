# Working rules for this branch

This branch (`v2-astro`) is a **ground-up rebuild in Astro**. The Next.js site it
replaces is not here — it lives on `main` and at the tag `v1-nextjs-site`.
Do not copy patterns from it out of habit; the stack, the default language and
the design tokens are all different.

## Before writing code

These versions ship breaking changes that predate most training data. Read the
relevant guide in the installed package's own docs before using an API:

- Astro — `node_modules/astro/dist/` and the project's `astro.config.*`
- Tailwind — v4 uses CSS-first config (`@theme`), not `tailwind.config.js`

Heed deprecation notices printed during `dev` and `build` instead of ignoring them.

## Ground truth

- `CLAUDE.md` — the brief. Layout, copy, tokens and page structure come from it.
- `reference/ichibot-website-draft.html` — the approved visual draft. Open it in a
  browser and match it; it is the spec for layout and interactions, not a suggestion.
- `reference/BRIEF_v3_3_situs_nextjs_lama.md` — the brief for the *old* site. Kept
  for content archaeology only. It is not the plan for this branch.

## Not to be invented

The brief's "Open items" list is binding: deployment times, client quotes, result
numbers, logo files, dashboard screenshots, protocol list and contact details are
unknown. Leave a visible placeholder and flag it. Never fill these with plausible
guesses — they are claims about real companies.
