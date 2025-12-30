# OurHaus Packages

This directory contains shared packages used across the OurHaus monorepo.

## Available Packages

### @ourhaus/brand

Design system tokens including:
- **Colors**: Primary, secondary, neutral, and semantic color scales
- **Spacing**: Consistent spacing scale (4px to 256px)
- **Typography**: Font families, sizes, weights, line heights

```typescript
import { colors, spacing, fontSize } from '@ourhaus/brand';
```

### @ourhaus/ui

Reusable React components built with the design system:
- **Button**: Primary, secondary, outline, and ghost variants
- **Card**: Flexible container with header, title, and content sub-components

```typescript
import { Button, Card, CardHeader, CardTitle, CardContent } from '@ourhaus/ui';
```

### @ourhaus/shared

Shared TypeScript types and utilities:
- Base entity interfaces
- API response types
- Pagination types
- Result types

```typescript
import type { User, ApiResponse, PaginatedResponse } from '@ourhaus/shared';
```

### @ourhaus/firebase

Firebase client configuration and initialization:
- Firebase app initialization
- Configuration management
- Environment variable handling

```typescript
import { getFirebaseApp, getFirebaseConfig } from '@ourhaus/firebase';
```

## Usage

All packages are available within the monorepo using the `@ourhaus/*` namespace. They are automatically linked through npm workspaces.

## Development

Each package has its own:
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `src/` - Source files

Run `npm run lint` from the root to check all packages for TypeScript errors.
