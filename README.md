# Williams in Technology

A responsive community product concept built with React 19, TypeScript, Next.js App Router conventions, Tailwind CSS 4 and accessible Radix/shadcn primitives. The included Vinext adapter builds the application for the Sites Cloudflare Workers runtime.

## Run and verify

Use Node 22.13+ and the pinned pnpm version in package.json. Install with `pnpm install --frozen-lockfile`, run with `pnpm dev`, and build with `pnpm build`. Managed previews use the supplied Sites runtime wrapper.

- `node node_modules/typescript/bin/tsc --noEmit`
- `node scripts/check-product.mjs`

The product checks cover all six brief queries, combined city/expertise constraints, no-results behavior, locally approved search results, and conservative referral extraction.

## Product surfaces

- `/`: editorial Commons, interactive network and Ask → Match → Offer.
- `/network`: 12 fictional profiles, four startups, filters, mentorship and introduction drafts.
- `/signal`: ten sample opportunities, jobs, internships, founder requests, asks, offers and community posts; saves and approved submissions.
- `/gatherings`: four proposed events with local RSVP states and venue/timezone details.
- `/resources`: six sample community guides and one clearly marked official Williams reading link.
- `/design-system`: implemented type/color/control states plus an interactive 390px/768px responsive preview.

Command search is keyboard accessible with Cmd/Ctrl+K. It searches all five entity classes and opens routed detail panels. Use `?open=<entity-id>` to deep-link a profile, startup, signal, event or resource. Page links use standard browser navigation. Detail panels synchronize with browser history through `lib/useDetailState.ts`; opening one creates a shareable URL, closing removes the query, and browser Back updates the panel.

## Architecture and boundaries

`types/domain.ts` describes entities and relationships. `data/seed.ts` contains fictional fixtures. `components/` is organized by reusable product module; `features/pages/` composes routes. `lib/search.ts` applies deterministic intent, city and topic matching. `lib/extractSignal.ts` is a local rules-based parser, not an AI service. `lib/demoStore.ts` manages versioned browser-local persistence and tab synchronization.

Sharing always requires explicit permission, followed by editable extraction review and a separate approval action. A statement such as “happy to talk” does not confirm a referral. Confirmed referrals require a separate check. Unknown fields remain unset. No WhatsApp access, silent monitoring, live moderation, messages, applications, payments or backend writes are implemented. Search indexes only fixtures and locally approved posts.

All saves, draft introductions, interest notes, local posts and RSVPs remain in the current browser. Local storage is a demo convenience and must be replaced with authenticated, authorized persistence for production. If browser storage is blocked, the demo falls back to memory for the current session. The footer resets demo data.

## Design and assets

The current design follows https://www.williams.edu/: purple #500082, deep purple #280050, gold #FFCE47, magenta #B1008E, white space, pill actions, slab headings, and asymmetric images. Its official stylesheet uses EphSlab, EphGothic and Sharp Earth. This source uses the openly licensed Roboto Slab as a similar headline face, Manrope for UI and IBM Plex Mono for metadata. The proprietary college fonts are not redistributed. Tokens and responsive states are documented at `/design-system`. CSS/SVG animations communicate network relationships, step selection, loading, extraction and feed insertion. All motion honors `prefers-reduced-motion`; no animation framework is needed for these interactions.

Five original AI-generated editorial assets are optimized as WebP in `public/art/`; prompts and provenance are in `public/art/prompts.md`. These are concept images, not photographs documenting real Williams people or events. The earlier Figma companion contains the original concept studies; the current redesign is implemented in this repository and `/design-system`:
https://www.figma.com/design/satV4X8ZqWR0ztJljNy8ib

The original Lovable draft is preserved at https://lovable.dev/projects/1d407d09-af9d-4d8a-9234-6ba7ca397a92 . Its workspace exhausted credits before completing the build; this checkout is the completed runnable implementation. No GitHub repository was available to connect during this build. Sites maintains this source in its own Git repository.

## Production continuation

1. Add membership identity, profile ownership, per-entity authorization and moderator roles.
2. Replace the browser store with normalized persistence for profiles, expertise, asks/offers, startups, opportunities, events, resources, introductions, saved items and RSVPs.
3. Give submissions durable consent/source records and explicit draft → review → approved → withdrawn states, with audit history and deletion.
4. Run any future extraction model on explicitly submitted text on the server, validate the structured result, and keep human field review and approval before indexing.
5. Add structured search indexes (plus optional semantic ranking), capacity-safe event registrations, rate limits and notification preferences.
6. Review real member content, imagery permissions and brand language with Williams in Technology before a public launch.

## Source export

The source ZIP includes the application, assets, lockfile and build configuration. It excludes dependencies, generated output, credentials and local runtime state. Its hosting configuration is portable and omits the private Site identifier. Unzip, run `pnpm install --frozen-lockfile`, then `pnpm dev`. To use a standard Next.js development server, run `pnpm exec next dev`.

To upload to GitHub, create an empty private repository, then run `git init`, `git add .`, `git commit -m "Williams in Technology"`, `git branch -M main`, `git remote add origin YOUR_REPOSITORY_URL`, and `git push -u origin main`.
