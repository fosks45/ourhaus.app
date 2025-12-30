# Contributing to OurHaus

Thank you for your interest in contributing to OurHaus!

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `cd apps/web && npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

- **apps/web** - Main Next.js application
- **packages/brand** - Design system tokens
- **packages/ui** - Reusable React components
- **packages/shared** - Shared TypeScript types
- **packages/firebase** - Firebase configuration

## Development Workflow

1. Create a new branch for your feature
2. Make your changes
3. Run linting: `npm run lint`
4. Build the project: `npm run build`
5. Format your code: `npm run format`
6. Commit your changes
7. Create a pull request

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
