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

**Primitive Components:**

- **Button**: Primary, secondary, outline, and ghost variants with loading states
- **Card**: Flexible container with header, title, and content sub-components
- **Input/Textarea**: Form inputs with labels, validation, and help text
- **Badge**: Status indicators in various colors and sizes
- **Select**: Dropdown with validation states
- **Checkbox/Radio**: Accessible form controls with ≥44px touch targets

**Block Components:**

- **List**: Lists with bordered, divided, and default variants
- **EmptyState**: Content placeholder with icon and action
- **SummaryBlock**: Statistics and metrics display

**Layout Components:**

- **Page**: Full page layouts with header and content areas
- **Section**: Content sections with headers and descriptions
- **AppShell**: Application layout with navigation

```typescript
import {
  Button,
  Card,
  Input,
  Badge,
  List,
  EmptyState,
  Page,
} from '@ourhaus/ui';
```

See the [UI Gallery](/ui-gallery) for live examples.

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
