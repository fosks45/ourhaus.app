# OurHaus

A modern, mobile-first Next.js web application built with TypeScript in a Turborepo monorepo.

## 🏗️ Project Structure

This monorepo contains the following packages and applications:

### Apps

- **apps/web** - Next.js 14 (App Router) web application with Tailwind CSS and PWA support

### Packages

- **packages/brand** - Design system tokens (colors, spacing, typography)
- **packages/ui** - Shared React UI components
- **packages/shared** - Shared TypeScript types and utilities
- **packages/firebase** - Firebase client configuration and setup

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 10+

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build all packages
npm run build

# Lint all packages
npm run lint

# Format code
npm run format
```

### Development

The web app will be available at `http://localhost:3000` when running `npm run dev`.

## 🎨 Design System

The design system is built with a mobile-first approach:

- **Colors**: Primary, secondary, neutral, and semantic color scales
- **Spacing**: Consistent spacing scale from 4px to 256px
- **Typography**: Font families, sizes, weights, line heights, and letter spacing
- **Components**: Reusable React components (Button, Card, etc.)

## 📱 PWA Support

The web app includes Progressive Web App features:

- Offline support
- Installable on mobile devices
- Optimized for mobile-first experience
- App manifest and service worker configuration

## 🏛️ Architecture

- **Turborepo**: Efficient monorepo build system
- **TypeScript**: Strict mode enabled for type safety
- **Next.js 14**: Latest App Router architecture
- **Tailwind CSS**: Utility-first styling with design tokens
- **Firebase**: Backend with Firestore, Auth, Storage, and Cloud Functions

### Firestore Schema

OurHaus uses a carefully designed Firestore schema with strict security rules to enforce:

- **Append-only history**: Events can never be updated or deleted
- **Immutable snapshots**: Sealed baseline snapshots are permanently locked
- **Controlled access**: Home access is granted via explicit access documents

For details, see:

- [FIRESTORE_SCHEMA.md](./FIRESTORE_SCHEMA.md) - Data models and security invariants
- [FIRESTORE_RULES_TESTING.md](./FIRESTORE_RULES_TESTING.md) - Testing guide

## 📦 Package Management

This project uses npm workspaces for monorepo management. Internal packages are referenced using the `@ourhaus/*` namespace.

## 🔒 Environment Variables

Copy `.env.example` to `.env.local` in `apps/web` and configure Firebase credentials for full functionality.

For local development with Firebase Emulator:

```bash
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true
```

## 🧪 Firebase Emulator

For local development and testing:

```bash
# Start Firebase emulators
firebase emulators:start

# Access Emulator UI
open http://localhost:4000
```

This provides local instances of:

- Firestore (port 8080)
- Authentication (port 9099)
- Storage (port 9199)
- Functions (port 5001)

See [FIRESTORE_RULES_TESTING.md](./FIRESTORE_RULES_TESTING.md) for testing security rules.

## 🧪 Tech Stack

- Next.js 14
- TypeScript 5.3
- React 18
- Tailwind CSS 3.4
- Turborepo 1.11
- Firebase 10.7
- next-pwa 5.6
