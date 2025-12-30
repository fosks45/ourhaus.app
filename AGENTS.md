# AGENTS.md — OurHaus Agent Guide

OurHaus is a webapp that stores the long-lived, version-controlled history of a home.
Key guarantees: append-only timeline, immutable sealed baseline, transferable ownership with revocation.

## Setup commands
- Install deps: `pnpm install`
- Run web app: `pnpm --filter web dev`
- Typecheck: `pnpm typecheck`
- Lint: `pnpm lint`
- Build: `pnpm --filter web build`

## Repo structure
- `apps/web`: Next.js webapp
- `packages/ui`: shared UI components (token-driven, consistent)
- `packages/brand`: design tokens (colors/spacing/typography/radii)
- `packages/shared`: domain types and zod schemas (no Firebase imports)
- `packages/firebase`: Firebase client/admin utilities

## Design system rules (important)
- Tokens are the single source of truth: use semantic tokens (bg/text/border/primary/etc.).
- UI components must be sourced from `packages/ui` where possible.
- Avoid ad-hoc styling in feature code. If a pattern repeats, promote it into `packages/ui`.

## Data model (conceptual)
- Home (asset) + Household (current owners) + User (account)
- Rooms, Systems, Appliances, Projects
- Documents (manuals/certs/drawings/photos)
- Events = append-only timeline ("commits")
- Snapshots = baseline and later snapshots for fast reads

## Invariants you must never break
1) Timeline events are append-only (create-only).
2) Sealed baseline snapshots are immutable forever.
3) Ownership transfer must revoke ALL prior household access immediately.
4) Client code must not have a backdoor to update/delete immutable records.

## Firebase guidance
- Security-sensitive workflows must be Cloud Functions:
  - baseline sealing
  - ownership transfer completion
  - invitation acceptance
  - reminder sending
- Security Rules must enforce:
  - events: deny update/delete
  - snapshots: deny update/delete after sealing
  - access: only current owners can grant/revoke

## When working on tasks
- Prefer incremental PRs.
- Include a short checklist:
  - Security considerations
  - Data migrations/compat
  - Manual test steps
- If uncertain about a schema decision, document assumptions in the PR.

## “How to test” template (include in PRs)
- Steps:
  1. …
  2. …
- Expected:
  - …
- Edge cases:
  - …
