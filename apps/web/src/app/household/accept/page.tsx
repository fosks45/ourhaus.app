'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { getFirebaseApp } from '@ourhaus/firebase';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from 'firebase/firestore';
import { Button } from '@ourhaus/ui/button';
import { Input } from '@ourhaus/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@ourhaus/ui/card';
import { HouseholdInvitation, HouseholdMember } from '@ourhaus/shared';

export default function AcceptInvitationPage() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, refreshUserProfile } = useAuth();

  const handleAccept = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('You must be signed in to accept an invitation');
      return;
    }

    if (!token.trim()) {
      setError('Invitation token is required');
      return;
    }

    setLoading(true);

    try {
      const app = getFirebaseApp();
      const db = getFirestore(app);

      // Find invitation by token
      // Note: This searches all households - in production, consider indexing
      const householdsSnapshot = await getDocs(collection(db, 'households'));
      let foundInvitation: (HouseholdInvitation & { path: string }) | null =
        null;

      for (const householdDoc of householdsSnapshot.docs) {
        const invitationsQuery = query(
          collection(db, 'households', householdDoc.id, 'invitations'),
          where('token', '==', token.trim()),
          where('status', '==', 'pending')
        );
        const invitationsSnapshot = await getDocs(invitationsQuery);

        if (!invitationsSnapshot.empty && invitationsSnapshot.docs[0]) {
          const invitationDoc = invitationsSnapshot.docs[0];
          const invitationData = invitationDoc.data();
          foundInvitation = {
            id: invitationDoc.id,
            householdId: invitationData.householdId,
            token: invitationData.token,
            email: invitationData.email,
            role: invitationData.role,
            invitedBy: invitationData.invitedBy,
            invitedAt: invitationData.invitedAt?.toDate() || new Date(),
            expiresAt: invitationData.expiresAt?.toDate() || new Date(),
            status: invitationData.status,
            acceptedBy: invitationData.acceptedBy,
            acceptedAt: invitationData.acceptedAt?.toDate(),
            createdAt: invitationData.createdAt?.toDate() || new Date(),
            updatedAt: invitationData.updatedAt?.toDate() || new Date(),
            path: `households/${householdDoc.id}/invitations/${invitationDoc.id}`,
          };
          break;
        }
      }

      if (!foundInvitation) {
        setError('Invalid or expired invitation token');
        return;
      }

      // Check if invitation is expired
      if (foundInvitation.expiresAt < new Date()) {
        setError('This invitation has expired');
        return;
      }

      // Check if email matches (optional - can be removed if you want to allow any user)
      if (foundInvitation.email.toLowerCase() !== user.email?.toLowerCase()) {
        setError('This invitation was sent to a different email address');
        return;
      }

      // Add user to household
      const householdRef = doc(db, 'households', foundInvitation.householdId);

      const member: HouseholdMember = {
        userId: user.uid,
        role: foundInvitation.role,
        joinedAt: new Date(),
      };

      await updateDoc(householdRef, {
        memberIds: arrayUnion(user.uid),
        [`members.${user.uid}`]: {
          ...member,
          joinedAt: serverTimestamp(),
        },
        updatedAt: serverTimestamp(),
      });

      // Update user profile
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        householdIds: arrayUnion(foundInvitation.householdId),
        updatedAt: serverTimestamp(),
      });

      // Mark invitation as accepted
      const invitationRef = doc(db, foundInvitation.path);
      await updateDoc(invitationRef, {
        status: 'accepted',
        acceptedBy: user.uid,
        acceptedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Refresh user profile
      await refreshUserProfile();

      alert('Successfully joined household!');
      router.push(`/household/${foundInvitation.householdId}`);
    } catch (err) {
      console.error('Error accepting invitation:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to accept invitation. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    router.push('/auth/signin');
    return null;
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-neutral-50">
      <div className="w-full max-w-md">
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="text-center">
              Accept Household Invitation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAccept} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-error-light text-error-dark text-sm">
                  {error}
                </div>
              )}

              <div className="text-sm text-neutral-600 mb-4">
                Enter the invitation token you received to join a household.
              </div>

              <Input
                type="text"
                label="Invitation Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="abc123xyz"
                helperText="Ask the person who invited you for this token"
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
                {loading ? 'Accepting...' : 'Accept Invitation'}
              </Button>

              <div className="text-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push('/household/create')}
                  type="button"
                >
                  Create New Household Instead
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
