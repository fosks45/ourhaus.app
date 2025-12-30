# OurHaus: Repository Custom Instructions for GitHub Copilot

You are working in the OurHaus repository (ourhaus.app). OurHaus is a "version-controlled home history" webapp.
It stores a home's data long-term, supports ownership transfer, and supports immutable sealed baseline snapshots.

## Non-negotiables
- Homes outlive users: access changes, but the home's history remains.
- Append-only history: never rewrite or delete timeline events. Corrections are NEW events.
- Baseline sealing: once a baseline snapshot is sealed, it must be immutable forever.
- Ownership transfer: upon transfer completion, all previous household members must lose access.
- Evidence-first: prefer attaching documents/photos to records when relevant.

## Tech stack (POC)
- Next.js (App Router) + TypeScript
- Firebase: Auth, Firestore, Storage, Cloud Functions, Cloud Scheduler
- Tailwind CSS
- Monorepo (Turborepo): apps/web + shared packages (ui, brand, shared, firebase)

## Architecture preferences
- Prefer small, composable modules and explicit types over clever abstractions.
- Keep domain types in packages/shared. Avoid Firebase types leaking into shared domain models.
- All critical mutations (baseline sealing, transfer, invitations, reminders) should go through Cloud Functions.
- Firestore writes from the client should be limited to safe operations; never allow client to mutate immutable collections.

## Data and immutability rules
- Firestore "events" (timeline commits): create-only. No update/delete.
- Sealed baseline snapshots: create-only. No update/delete.
- Files linked to baseline should be content-addressed (hash-based keys) and never overwritten.

## Security rules expectations
- Use the principle of least privilege.
- Access is granted via explicit home access docs (e.g., homes/{homeId}/access/{householdId}).
- Transfer completion must revoke old access docs and invalidate share/contractor access.

## Code style
- TypeScript strict.
- Prefer zod schemas for runtime validation where needed.
- No inline Tailwind one-offs outside the design system patterns; use shared components from packages/ui.
- Ensure mobile-first UI with excellent desktop layout.

## Testing/quality
- Validate security-critical flows with tests (or at least documented manual test steps):
  - baseline sealing immutability
  - ownership transfer revocation
  - event append-only constraints
- Add clear comments for security and data invariants.

## Output expectations
When generating code:
- Update or add relevant docs.
- Keep changes minimal and focused.
- Provide a short "How to test" section in PR descriptions.
