'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@ourhaus/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@ourhaus/ui/card';
import { FirebaseStatus } from '@/components/firebase-status';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push('/household');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-600">Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 sm:p-8 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center py-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-600 mb-4">
            OurHaus
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary">
            Version-controlled home history for everyone
          </p>
        </header>

        {/* Firebase Status */}
        <FirebaseStatus />

        {/* Welcome Card */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Welcome to OurHaus</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              OurHaus helps you track and manage your home&apos;s history with
              your household members. Keep all maintenance records, documents,
              and important information in one place.
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>Collaborate with unlimited household members</li>
              <li>Role-based access control (Owner, Editor, Viewer)</li>
              <li>Time-limited invitations for security</li>
              <li>Version-controlled home history</li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-8">
          <Link href="/auth/signup">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
          </Link>
          <Link href="/auth/signin">
            <Button variant="outline" size="lg">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
