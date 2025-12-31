# @ourhaus/ui

Reusable React UI component library for OurHaus. Built with design system tokens, mobile-first, and fully accessible.

## Installation

This package is part of the OurHaus monorepo and is available via the `@ourhaus/ui` namespace.

```typescript
import { Button, Card, Input } from '@ourhaus/ui';
```

## Components

### Primitive Components

Basic building blocks for forms, navigation, and UI elements:

- **Button** - Primary, secondary, outline, and ghost variants with loading states
- **Card** - Flexible container with header, title, and content sub-components
- **Input** - Text input with label, validation states, and help text
- **Textarea** - Multi-line text input with label and validation
- **Badge** - Status indicators and labels in various colors and sizes
- **Select** - Dropdown select with label and validation states
- **Checkbox** - Accessible checkbox with ≥44px touch target
- **Radio** - Radio buttons with RadioGroup wrapper

### Block Components

Reusable blocks for displaying structured content:

- **List** - Lists with default, bordered, and divided variants
- **ListItem** - Individual list items with hover states
- **EmptyState** - Display when there's no content to show
- **SummaryBlock** - Display key statistics and metrics
- **SummaryGrid** - Grid layout for summary blocks

### Layout Components

Structural components for consistent page layouts:

- **Page** - Full page wrapper with background
- **PageHeader** - Consistent page header
- **PageTitle** - Page title component
- **PageContent** - Content area with max-width and responsive padding
- **Section** - Content sections with spacing
- **SectionHeader** - Section header wrapper
- **SectionTitle** - Section title with size variants
- **SectionDescription** - Section description text
- **AppShell** - Main app layout with header, content, and footer
- **AppHeader** - Application header with sticky option
- **AppNav** - Navigation wrapper
- **AppFooter** - Application footer

## Design Principles

### Mobile-First

- Touch targets ≥ 44px for better mobile usability
- Responsive layouts that work on all screen sizes
- Mobile-optimized spacing and typography
- Fluid, scalable components

### Accessibility

- Keyboard navigation support
- Screen reader support with ARIA attributes
- Clear focus indicators
- Semantic HTML elements
- Proper form labels and associations

### Token-Driven

All components consume design tokens from `@ourhaus/brand`:

- Colors from the unified palette
- Consistent spacing scale
- Typography system
- Elevation and shadows

### Composable

- Small, focused components
- Flexible composition patterns
- Reusable across features
- TypeScript types included

## Usage Examples

### Basic Form

```tsx
import { Input, Select, Checkbox, Button } from '@ourhaus/ui';

function MyForm() {
  return (
    <form>
      <Input label="Name" placeholder="Enter your name" fullWidth />
      <Select label="Country" fullWidth>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
      </Select>
      <Checkbox label="Accept terms" />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Page Layout

```tsx
import {
  Page,
  PageHeader,
  PageTitle,
  PageContent,
  Section,
  SectionTitle,
  Card,
} from '@ourhaus/ui';

function MyPage() {
  return (
    <Page>
      <PageHeader>
        <PageTitle>My Page</PageTitle>
      </PageHeader>
      <PageContent maxWidth="xl">
        <Section>
          <SectionTitle>Section Title</SectionTitle>
          <Card>{/* Content */}</Card>
        </Section>
      </PageContent>
    </Page>
  );
}
```

### Summary Blocks

```tsx
import { SummaryBlock, SummaryGrid } from '@ourhaus/ui';

function Dashboard() {
  return (
    <SummaryGrid columns={3}>
      <SummaryBlock
        label="Total Revenue"
        value="$45,231"
        change={{ value: '+20.1%', trend: 'up' }}
        variant="primary"
      />
      <SummaryBlock
        label="Active Users"
        value="2,456"
        change={{ value: '+12%', trend: 'up' }}
        variant="success"
      />
    </SummaryGrid>
  );
}
```

## Component Gallery

Visit `/ui-gallery` in the web app to see all components in action with interactive examples.

## Development

```bash
# Type check
npm run typecheck

# Lint
npm run lint

# Clean
npm run clean
```

## License

Private - Part of OurHaus monorepo
