# Contributing to OurHaus

Thank you for your interest in contributing to OurHaus!

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `cd apps/web && npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

### Git Hooks

This project uses Husky and lint-staged to enforce code quality. After running `npm install`, the following git hooks are automatically configured:

- **Pre-commit**: Runs on every commit
  - Automatically formats staged files with Prettier
  - Runs ESLint on staged TypeScript files and auto-fixes issues where possible
  - Blocks commits if there are unfixable lint errors

- **Pre-push**: Runs before every push
  - Runs full lint check across all packages (`npm run lint`)
  - Runs TypeScript type checking (`npm run typecheck`)
  - Runs Prettier format check (`npm run format:check`)
  - Blocks push if any checks fail

These hooks ensure that only properly formatted, linted, and type-safe code enters the repository.

## Project Structure

- **apps/web** - Main Next.js application
- **packages/brand** - Design system tokens
- **packages/ui** - Reusable React components
- **packages/shared** - Shared TypeScript types
- **packages/firebase** - Firebase configuration

## Development Workflow

1. Create a new branch for your feature
2. Make your changes
3. Stage your changes: `git add .`
4. Commit your changes (pre-commit hook will automatically format and lint staged files)
5. Push your changes (pre-push hook will run full checks)
6. Create a pull request

**Note**: If the pre-commit hook fails, fix the reported issues and try committing again. If the pre-push hook fails, run `npm run check` locally to see all errors and fix them before pushing.

## Code Style

- Use TypeScript strict mode
- Follow existing naming conventions
- Use design tokens from `@ourhaus/brand`
- Write mobile-first responsive code
- Keep components small and focused

## Adding New Features

### Adding a New Component

1. Create the component in `packages/ui/src/`
2. Export it from `packages/ui/src/index.tsx`
3. Use design tokens for styling
4. Add TypeScript types

### Adding a New Design Token

1. Add the token to the appropriate file in `packages/brand/src/`
2. Export it from `packages/brand/src/index.ts`
3. Update Tailwind config if needed

## Commit Messages

Use clear, descriptive commit messages:

- `feat: add new button variant`
- `fix: resolve mobile layout issue`
- `docs: update README`
- `refactor: simplify card component`

## Questions?

Feel free to open an issue for discussion!
