'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { getFirebaseApp } from '@ourhaus/firebase';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  addDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  serverTimestamp,
  deleteField,
} from 'firebase/firestore';
import { Button } from '@ourhaus/ui/button';
import { Input } from '@ourhaus/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@ourhaus/ui/card';
import { Badge } from '@ourhaus/ui/badge';
import { EmptyState } from '@ourhaus/ui/empty-state';
import {
  Household,
  HouseholdInvitation,
  HouseholdRole,
  UserProfile,
} from '@ourhaus/shared';
import { Select } from '@ourhaus/ui/select';

export default function HouseholdDetailPage() {
  const params = useParams();
  const householdId = params.householdId as string;
  const router = useRouter();
  const { user, userProfile, refreshUserProfile } = useAuth();

  const [household, setHousehold] = useState<Household | null>(null);
  const [members, setMembers] = useState<{ [key: string]: UserProfile }>({});
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<HouseholdRole>('viewer');
  const [inviting, setInviting] = useState(false);
  const [error, setError] = useState('');

  const loadHousehold = async () => {
    if (!householdId) return;

    try {
      const app = getFirebaseApp();
      const db = getFirestore(app);

      // Load household
      const householdDoc = await getDoc(doc(db, 'households', householdId));
      if (!householdDoc.exists()) {
        setError('Household not found');
        return;
      }

      const householdData = householdDoc.data() as Omit<Household, 'id'>;
      setHousehold({
        id: householdDoc.id,
        ...householdData,
      });

      // Load member profiles
      const memberProfiles: { [key: string]: UserProfile } = {};
      for (const memberId of householdData.memberIds) {
        const memberDoc = await getDoc(doc(db, 'users', memberId));
        if (memberDoc.exists()) {
          const memberData = memberDoc.data();
          memberProfiles[memberId] = {
            id: memberDoc.id,
            email: memberData.email,
            displayName: memberData.displayName,
            photoURL: memberData.photoURL,
            householdIds: memberData.householdIds || [],
            createdAt: memberData.createdAt?.toDate() || new Date(),
            updatedAt: memberData.updatedAt?.toDate() || new Date(),
            preferences: memberData.preferences,
          };
        }
      }
      setMembers(memberProfiles);
    } catch (err) {
      console.error('Error loading household:', err);
      setError('Failed to load household');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHousehold();
  }, [householdId]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!household || !user) return;

    if (!inviteEmail.trim()) {
      setError('Email is required');
      return;
    }

    setInviting(true);

    try {
      const app = getFirebaseApp();
      const db = getFirestore(app);

      // Generate a random token
      const token = Math.random().toString(36).substring(2, 15);

      // Create invitation
      const invitationData: Omit<HouseholdInvitation, 'id'> = {
        householdId: household.id,
        token,
        email: inviteEmail.trim().toLowerCase(),
        role: inviteRole,
        invitedBy: user.uid,
        invitedAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await addDoc(
        collection(db, 'households', household.id, 'invitations'),
        {
          ...invitationData,
          invitedAt: serverTimestamp(),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }
      );

      alert(
        `Invitation sent to ${inviteEmail}! Share this token with them: ${token}`
      );
      setInviteEmail('');
    } catch (err) {
      console.error('Error creating invitation:', err);
      setError('Failed to create invitation');
    } finally {
      setInviting(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!household || !user) return;

    // Can't remove yourself
    if (memberId === user.uid) {
      alert('You cannot remove yourself from the household');
      return;
    }

    // Only owner can remove members
    const currentUserRole = household.members[user.uid]?.role;
    if (currentUserRole !== 'owner') {
      alert('Only owners can remove members');
      return;
    }

    if (!confirm('Are you sure you want to remove this member?')) {
      return;
    }

    try {
      const app = getFirebaseApp();
      const db = getFirestore(app);

      // Remove member from household
      const householdRef = doc(db, 'households', household.id);
      await updateDoc(householdRef, {
        memberIds: arrayRemove(memberId),
        [`members.${memberId}`]: deleteField(),
        updatedAt: serverTimestamp(),
      });

      // Remove household from user's profile
      const userRef = doc(db, 'users', memberId);
      await updateDoc(userRef, {
        householdIds: arrayRemove(household.id),
        updatedAt: serverTimestamp(),
      });

      // Reload household
      await loadHousehold();
      alert('Member removed successfully');
    } catch (err) {
      console.error('Error removing member:', err);
      alert('Failed to remove member');
    }
  };

  const getRoleBadgeVariant = (role: HouseholdRole) => {
    switch (role) {
      case 'owner':
        return 'primary';
      case 'editor':
        return 'secondary';
      case 'viewer':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

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

  if (!household) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EmptyState
          title="Household not found"
          description="The household you're looking for doesn't exist"
          action={
            <Button variant="primary" onClick={() => router.push('/')}>
              Go Home
            </Button>
          }
        />
      </div>
    );
  }

  const currentUserRole = household.members[user.uid]?.role;
  const canInvite = currentUserRole === 'owner' || currentUserRole === 'editor';

  return (
    <main className="min-h-screen p-4 sm:p-8 bg-neutral-50">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">
              {household.name}
            </h1>
            <p className="text-sm text-neutral-600 mt-1">
              Manage your household members
            </p>
          </div>
          <Button variant="outline" onClick={() => router.push('/')}>
            Back to Home
          </Button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-error-light text-error-dark text-sm">
            {error}
          </div>
        )}

        {/* Members List */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Members ({household.memberIds.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {household.memberIds.length === 0 ? (
              <EmptyState
                title="No members yet"
                description="Start by inviting members to your household"
              />
            ) : (
              <div className="space-y-3">
                {household.memberIds.map((memberId) => {
                  const member = members[memberId];
                  const memberRole = household.members[memberId]?.role;

                  if (!member) return null;

                  return (
                    <div
                      key={memberId}
                      className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 bg-white"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-neutral-900">
                            {member.displayName || member.email}
                          </p>
                          {memberRole && (
                            <Badge
                              variant={getRoleBadgeVariant(memberRole)}
                              size="sm"
                            >
                              {memberRole}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-neutral-600">
                          {member.email}
                        </p>
                      </div>

                      {currentUserRole === 'owner' && memberId !== user.uid && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveMember(memberId)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Invite Members */}
        {canInvite && (
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Invite Members</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleInvite} className="space-y-4">
                <Input
                  type="email"
                  label="Email Address"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="friend@example.com"
                  helperText="They'll receive an invitation token to join"
                  fullWidth
                  required
                  disabled={inviting}
                />

                <Select
                  label="Role"
                  value={inviteRole}
                  onChange={(e) =>
                    setInviteRole(e.target.value as HouseholdRole)
                  }
                  fullWidth
                  disabled={inviting}
                >
                  <option value="viewer">Viewer - Can view only</option>
                  <option value="editor">
                    Editor - Can view and edit content
                  </option>
                  <option value="owner">
                    Owner - Full control including member management
                  </option>
                </Select>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={inviting}
                  className="w-full sm:w-auto"
                >
                  {inviting ? 'Sending...' : 'Send Invitation'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
