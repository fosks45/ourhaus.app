# OurHaus Web App

The main Next.js application for OurHaus.

## Features

- **Next.js 14** with App Router
- **TypeScript** in strict mode
- **Tailwind CSS** with design system tokens
- **PWA** support (installable, offline-capable)
- **Mobile-first** responsive design
- **Design system** integration

## Development

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Project Structure

```
apps/web/
├── src/
│   └── app/              # Next.js App Router
│       ├── layout.tsx    # Root layout
│       ├── page.tsx      # Home page
│       └── globals.css   # Global styles
├── public/               # Static assets
│   ├── manifest.json     # PWA manifest
│   ├── icon-*.png        # PWA icons
│   └── favicon.ico       # Favicon
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## PWA Features

The app is configured as a Progressive Web App:

- Installable on mobile and desktop
- Offline support via service worker
- Optimized icons for various platforms
- App manifest for native-like experience

PWA features are disabled in development mode and enabled in production.

> **Note**: The icon files (icon-192x192.png, icon-512x512.png, apple-touch-icon.png, favicon.ico) currently contain SVG placeholders. For production, replace these with actual PNG/ICO files using a tool like [realfavicongenerator.net](https://realfavicongenerator.net/) or similar icon generation services.

## Design System

The app uses design tokens from `@ourhaus/brand` and components from `@ourhaus/ui`:

```typescript
// Using design tokens in Tailwind
<div className="bg-primary-600 text-white p-4 rounded-lg">
  Content
</div>

// Using UI components
import { Button, Card } from '@ourhaus/ui';
```

## Deployment

Build the app for production:

```bash
npm run build
```

The built app will be in the `.next` directory. Deploy to your preferred platform (Vercel, Netlify, etc.).
