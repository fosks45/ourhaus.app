/**
 * @ourhaus/shared - Firestore Schema v1
 * Core data models for OurHaus Firestore collections
 *
 * Key Invariants:
 * - Events are append-only (create-only, no update/delete)
 * - Sealed snapshots are immutable (create-only, no update/delete)
 * - Homes outlive users; access is controlled via explicit access documents
 */

/**
 * Timestamp type for Firestore
 *
 * In Firestore documents, timestamps are stored as Firestore Timestamp objects.
 * When working with the Firebase SDK:
 * - Reading: Firestore Timestamp objects (use .toDate() to convert to Date)
 * - Writing: Can use Date objects (auto-converted) or serverTimestamp()
 *
 * This type uses Date for simplicity in TypeScript, but be aware that actual
 * Firestore documents contain Timestamp objects with .seconds and .nanoseconds
 */
export type FirestoreTimestamp = Date;

/**
 * Home - The core entity representing a physical property
 * Collection: homes/{homeId}
 *
 * A home's history persists forever, even as ownership changes.
 */
export interface Home {
  id: string;

  // Basic property information
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  // Current ownership household ID (references households collection)
  currentOwnerHouseholdId: string;

  // Metadata
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;

  // Optional display information
  nickname?: string;
  photoURL?: string;
}

/**
 * HomeAccess - Controls who can access a home's data
 * Collection: homes/{homeId}/access/{householdId}
 *
 * Access is granted via explicit documents. When ownership transfers,
 * old access documents must be deleted to revoke access.
 */
export interface HomeAccess {
  householdId: string;
  homeId: string;

  // Access level
  role: 'owner' | 'member' | 'viewer';

  // Granted by (for audit trail)
  grantedBy: string; // userId
  grantedAt: FirestoreTimestamp;

  // Optional expiration (e.g., for temporary contractor access)
  expiresAt?: FirestoreTimestamp;

  // Metadata
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

/**
 * Event - Append-only timeline entries
 * Collection: homes/{homeId}/events/{eventId}
 *
 * INVARIANT: Create-only. Never update or delete.
 * Corrections must be made via new events with a reference to the corrected event.
 */
export interface Event {
  id: string;
  homeId: string;

  // Event classification
  type:
    | 'maintenance'
    | 'repair'
    | 'upgrade'
    | 'inspection'
    | 'document'
    | 'note'
    | 'correction';
  category?: string; // e.g., 'plumbing', 'electrical', 'hvac', etc.

  // Event details
  title: string;
  description?: string;
  date: FirestoreTimestamp; // When the event occurred (may differ from createdAt)

  // Author information
  createdBy: string; // userId
  createdByHouseholdId: string; // householdId at time of creation

  // Metadata
  createdAt: FirestoreTimestamp;

  // Attachments (references to Storage)
  attachments?: {
    name: string;
    url: string;
    contentType: string;
    size: number;
  }[];

  // For corrections: reference to original event
  correctsEventId?: string;

  // For linking to snapshots
  snapshotId?: string;

  // Cost information (optional)
  cost?: {
    amount: number;
    currency: string;
  };

  // Service provider information (optional)
  serviceProvider?: {
    name: string;
    contact?: string;
  };
}

/**
 * Snapshot - Immutable baseline snapshots of home state
 * Collection: homes/{homeId}/snapshots/{snapshotId}
 *
 * INVARIANT: Once sealed, snapshots are immutable (create-only, no update/delete).
 * Snapshots capture the state of a home at a specific point in time (e.g., move-in, inspection).
 */
export interface Snapshot {
  id: string;
  homeId: string;

  // Snapshot metadata
  title: string;
  description?: string;
  date: FirestoreTimestamp; // When the snapshot was taken

  // Snapshot state
  sealed: boolean; // Once true, this snapshot becomes immutable
  sealedAt?: FirestoreTimestamp;
  sealedBy?: string; // userId who sealed it

  // Author information
  createdBy: string; // userId
  createdByHouseholdId: string;

  // Metadata
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp; // Can only be updated while sealed=false

  // Snapshot type (e.g., move-in inspection, transfer baseline)
  type: 'move-in' | 'inspection' | 'transfer' | 'annual' | 'custom';

  // Content-addressed files (hash-based keys for immutability)
  files?: {
    name: string;
    url: string; // Storage path using content hash
    contentType: string;
    size: number;
    hash: string; // SHA-256 or similar
  }[];

  // Room-by-room inventory (simplified)
  rooms?: {
    name: string;
    condition: string;
    notes?: string;
    photos?: string[]; // URLs to storage
  }[];
}

/**
 * Household member role types
 */
export type HouseholdRole = 'owner' | 'editor' | 'viewer';

/**
 * Household member information
 */
export interface HouseholdMember {
  userId: string;
  role: HouseholdRole;
  joinedAt: FirestoreTimestamp;
}

/**
 * Household - Represents a group of users (e.g., a family)
 * Collection: households/{householdId}
 *
 * Households are the unit of access control.
 */
export interface Household {
  id: string;
  name: string;

  // Members (user IDs)
  memberIds: string[];

  // Member details with roles
  members: {
    [userId: string]: HouseholdMember;
  };

  // Primary contact
  primaryContactId: string;

  // Metadata
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

/**
 * User Profile - Extended user information beyond Firebase Auth
 * Collection: users/{userId}
 *
 * Links Firebase Auth users to households and stores profile data.
 *
 * Note: Users should typically belong to 1-2 households. The security rules
 * are optimized to check the first 3 households. If a user needs access to
 * more households, consider restructuring the access control pattern.
 */
export interface UserProfile {
  id: string; // matches Firebase Auth UID
  email: string;
  displayName?: string;
  photoURL?: string;

  // Household membership
  householdIds: string[]; // List of households this user belongs to (max 3 for optimal security rules)

  // Metadata
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;

  // Preferences
  preferences?: {
    notifications: boolean;
    theme?: 'light' | 'dark' | 'auto';
  };
}

/**
 * Household Invitation - Tokenized invitations for joining households
 * Collection: households/{householdId}/invitations/{invitationId}
 *
 * Invitations are time-limited and can be used once.
 */
export interface HouseholdInvitation {
  id: string;
  householdId: string;
  token: string; // Unique token for accepting invitation
  email: string; // Email address invited
  role: HouseholdRole; // Role to be assigned upon acceptance
  invitedBy: string; // userId who created the invitation
  invitedAt: FirestoreTimestamp;
  expiresAt: FirestoreTimestamp; // Invitation expiration
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  acceptedBy?: string; // userId who accepted (if accepted)
  acceptedAt?: FirestoreTimestamp;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}
