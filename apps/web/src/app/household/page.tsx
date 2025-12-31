'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { getFirebaseApp } from '@ourhaus/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Button } from '@ourhaus/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@ourhaus/ui/card';
import { EmptyState } from '@ourhaus/ui/empty-state';
import { Household } from '@ourhaus/shared';

export default function HouseholdListPage() {
  const router = useRouter();
  const { user, userProfile, signOut } = useAuth();
  const [households, setHouseholds] = useState<Household[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHouseholds = async () => {
      if (!userProfile || !userProfile.householdIds.length) {
        setLoading(false);
        return;
      }

      try {
        const app = getFirebaseApp();
        const db = getFirestore(app);

        const householdPromises = userProfile.householdIds.map(
          async (householdId) => {
            const householdDoc = await getDoc(
              doc(db, 'households', householdId)
            );
            if (householdDoc.exists()) {
              const data = householdDoc.data();
              return {
                id: householdDoc.id,
                ...data,
              } as Household;
            }
            return null;
          }
        );

        const loadedHouseholds = await Promise.all(householdPromises);
        setHouseholds(
          loadedHouseholds.filter((h) => h !== null) as Household[]
        );
      } catch (err) {
        console.error('Error loading households:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHouseholds();
  }, [userProfile]);

  if (!user) {
    router.push('/auth/signin');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-600">Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 sm:p-8 bg-neutral-50">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">
              My Households
            </h1>
            <p className="text-sm text-neutral-600 mt-1">
              {user.email && `Signed in as ${user.email}`}
            </p>
          </div>
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </div>

        {/* Households List */}
        {households.length === 0 ? (
          <EmptyState
            title="No households yet"
            description="Create a household to get started or accept an invitation from someone else"
            action={
              <div className="flex flex-col gap-2">
                <Button
                  variant="primary"
                  onClick={() => router.push('/household/create')}
                >
                  Create Household
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => router.push('/household/accept')}
                >
                  Accept Invitation
                </Button>
              </div>
            }
          />
        ) : (
          <>
            <div className="grid gap-4">
              {households.map((household) => (
                <Card
                  key={household.id}
                  variant="elevated"
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => router.push(`/household/${household.id}`)}
                >
                  <CardHeader>
                    <CardTitle>{household.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-600">
                      {household.memberIds.length} member
                      {household.memberIds.length !== 1 ? 's' : ''}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={() => router.push('/household/create')}
              >
                Create Another Household
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/household/accept')}
              >
                Accept Invitation
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
