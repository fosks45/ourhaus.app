import { Button } from '@ourhaus/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@ourhaus/ui/card';

export default function HomePage() {
  return (
    <main className="min-h-screen p-4 sm:p-8 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center py-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-600 mb-4">
            OurHaus
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary">
            Your digital home - Built with Next.js, TypeScript, and Tailwind
          </p>
        </header>

        {/* Welcome Card */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Welcome to OurHaus</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This is a mobile-first, PWA-ready Next.js application built with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>Next.js 14 with App Router</li>
              <li>TypeScript (strict mode)</li>
              <li>Tailwind CSS for styling</li>
              <li>Turborepo monorepo structure</li>
              <li>Design system with shared tokens</li>
              <li>PWA capabilities</li>
            </ul>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card variant="outlined">
            <CardHeader>
              <CardTitle className="text-lg">📦 Packages</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <ul className="space-y-1">
                <li>@ourhaus/brand - Design tokens</li>
                <li>@ourhaus/ui - UI components</li>
                <li>@ourhaus/shared - Types</li>
                <li>@ourhaus/firebase - Firebase setup</li>
              </ul>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader>
              <CardTitle className="text-lg">🎨 Design System</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                Centralized design tokens for colors, spacing, and typography
                ensure consistency across the application.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-8">
          <Button variant="primary" size="lg">
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </main>
  );
}
