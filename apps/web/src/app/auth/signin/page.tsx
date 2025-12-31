'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirebaseApp } from '@ourhaus/firebase';
import { Button } from '@ourhaus/ui/button';
import { Input } from '@ourhaus/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@ourhaus/ui/card';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const app = getFirebaseApp();
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/household');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-neutral-50">
      <div className="w-full max-w-md">
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="text-center">Sign In to OurHaus</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-error-light text-error-dark text-sm">
                  {error}
                </div>
              )}

              <Input
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                fullWidth
                required
                disabled={loading}
              />

              <Input
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                fullWidth
                required
                disabled={loading}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>

              <div className="text-center text-sm text-neutral-600">
                Don&apos;t have an account?{' '}
                <Link
                  href="/auth/signup"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
