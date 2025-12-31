'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { getFirebaseApp } from '@ourhaus/firebase';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from 'firebase/firestore';
import { Button } from '@ourhaus/ui/button';
import { Input } from '@ourhaus/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@ourhaus/ui/card';
import { Household, HouseholdMember } from '@ourhaus/shared';

export default function CreateHouseholdPage() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, refreshUserProfile } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('You must be signed in to create a household');
      return;
    }

    if (!name.trim()) {
      setError('Household name is required');
      return;
    }

    setLoading(true);

    try {
      const app = getFirebaseApp();
      const db = getFirestore(app);

      // Create household member object
      const member: HouseholdMember = {
        userId: user.uid,
        role: 'owner',
        joinedAt: new Date(),
      };

      // Create household document
      const householdData: Omit<Household, 'id'> = {
        name: name.trim(),
        memberIds: [user.uid],
        members: {
          [user.uid]: member,
        },
        primaryContactId: user.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const householdRef = await addDoc(
        collection(db, 'households'),
        {
          ...householdData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          members: {
            [user.uid]: {
              ...member,
              joinedAt: serverTimestamp(),
            },
          },
        }
      );

      // Update user profile to include household ID
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        householdIds: arrayUnion(householdRef.id),
        updatedAt: serverTimestamp(),
      });

      // Refresh user profile
      await refreshUserProfile();

      // Redirect to household page
      router.push(`/household/${householdRef.id}`);
    } catch (err: unknown) {
      console.error('Error creating household:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to create household. Please try again.');
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
            <CardTitle className="text-center">Create Your Household</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-error-light text-error-dark text-sm">
                  {error}
                </div>
              )}

              <div className="text-sm text-neutral-600 mb-4">
                A household is a group of people who share access to home
                information. You can invite other members after creating your
                household.
              </div>

              <Input
                type="text"
                label="Household Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="The Smith Family"
                helperText="Give your household a name"
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
                {loading ? 'Creating...' : 'Create Household'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
