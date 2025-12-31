# Firestore Schema v1

This document describes the OurHaus Firestore data model, security rules, and invariants.

## Overview

OurHaus uses Firestore to store home history data with these core principles:

- **Homes outlive users**: A home's history persists through ownership changes
- **Append-only events**: Timeline events can never be updated or deleted
- **Immutable snapshots**: Once sealed, baseline snapshots cannot be modified
- **Controlled access**: Access is granted via explicit `access` documents

## Collections

### Top-Level Collections

- `users/{userId}` - User profiles linked to Firebase Auth
- `households/{householdId}` - Groups of users (families, households)
- `homes/{homeId}` - Physical properties with persistent history

### Subcollections

- `homes/{homeId}/access/{householdId}` - Access control for homes
- `homes/{homeId}/events/{eventId}` - Append-only timeline events
- `homes/{homeId}/snapshots/{snapshotId}` - Immutable baseline snapshots

## Data Models

> **Note on Timestamps**: All schemas use `FirestoreTimestamp` (TypeScript alias for `Date`). In actual Firestore documents, timestamps are stored as Firestore `Timestamp` objects with `.seconds` and `.nanoseconds` properties. Use `.toDate()` when reading from Firestore, and `serverTimestamp()` or `Date` objects when writing.

### User Profile

**Collection**: `users/{userId}`

```typescript
interface UserProfile {
  id: string; // matches Firebase Auth UID
  email: string;
  displayName?: string;
  photoURL?: string;
  householdIds: string[]; // List of households this user belongs to
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
  preferences?: {
    notifications: boolean;
    theme?: 'light' | 'dark' | 'auto';
  };
}
```

**Security Rules**:

- ✅ Users can read/update their own profile
- ✅ Users can create their profile (once, linked to Auth UID)
- ❌ Users cannot delete profiles
- ❌ Users cannot read other users' profiles

### Household

**Collection**: `households/{householdId}`

```typescript
interface Household {
  id: string;
  name: string;
  memberIds: string[]; // User IDs
  primaryContactId: string;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}
```

**Security Rules**:

- ✅ Members can read their household
- ✅ Members can update their household (TODO: move to Cloud Functions)
- ❌ Households cannot be deleted

### Home

**Collection**: `homes/{homeId}`

```typescript
interface Home {
  id: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  currentOwnerHouseholdId: string;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
  nickname?: string;
  photoURL?: string;
}
```

**Security Rules**:

- ✅ Users with access can read home data
- ✅ Only owners can update homes
- ❌ Homes cannot be deleted (homes outlive users)

**Invariant**: Homes persist forever. When ownership transfers, the `currentOwnerHouseholdId` changes, but the home's history remains intact.

### Home Access

**Collection**: `homes/{homeId}/access/{householdId}`

```typescript
interface HomeAccess {
  householdId: string;
  homeId: string;
  role: 'owner' | 'member' | 'viewer';
  grantedBy: string; // userId
  grantedAt: FirestoreTimestamp;
  expiresAt?: FirestoreTimestamp; // Optional expiration
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}
```

**Security Rules**:

- ✅ Users with home access can read all access documents
- ✅ Only home owners can create/update/delete access documents
- ⚠️ **Critical**: During ownership transfer, old access documents must be deleted

**Access Control Pattern**:

1. User's `householdIds` are stored in their `UserProfile`
2. Security rules check if any of the user's households have an `access` document for the home
3. Access can have optional expiration (e.g., for temporary contractor access)

### Event (Append-Only)

**Collection**: `homes/{homeId}/events/{eventId}`

```typescript
interface Event {
  id: string;
  homeId: string;
  type:
    | 'maintenance'
    | 'repair'
    | 'upgrade'
    | 'inspection'
    | 'document'
    | 'note'
    | 'correction';
  category?: string;
  title: string;
  description?: string;
  date: FirestoreTimestamp;
  createdBy: string;
  createdByHouseholdId: string;
  createdAt: FirestoreTimestamp;
  attachments?: Array<{
    name: string;
    url: string;
    contentType: string;
    size: number;
  }>;
  correctsEventId?: string; // For corrections
  snapshotId?: string; // Link to snapshot
  cost?: {
    amount: number;
    currency: string;
  };
  serviceProvider?: {
    name: string;
    contact?: string;
  };
}
```

**Security Rules**:

- ✅ Users with home access can read events
- ✅ Users with home access can create events
- ❌ **INVARIANT: Events cannot be updated**
- ❌ **INVARIANT: Events cannot be deleted**

**Why Append-Only?**

Events form a permanent, auditable timeline. If a mistake is made, create a new event with `type: 'correction'` and reference the original via `correctsEventId`.

### Snapshot (Immutable When Sealed)

**Collection**: `homes/{homeId}/snapshots/{snapshotId}`

```typescript
interface Snapshot {
  id: string;
  homeId: string;
  title: string;
  description?: string;
  date: FirestoreTimestamp;
  sealed: boolean; // Once true, snapshot becomes immutable
  sealedAt?: FirestoreTimestamp;
  sealedBy?: string;
  createdBy: string;
  createdByHouseholdId: string;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
  type: 'move-in' | 'inspection' | 'transfer' | 'annual' | 'custom';
  files?: Array<{
    name: string;
    url: string;
    contentType: string;
    size: number;
    hash: string; // Content hash for immutability
  }>;
  rooms?: Array<{
    name: string;
    condition: string;
    notes?: string;
    photos?: string[];
  }>;
}
```

**Security Rules**:

- ✅ Users with home access can read snapshots
- ✅ Users with home access can create snapshots (must start with `sealed: false`)
- ✅ Users can update snapshots **only if `sealed: false`**
- ✅ When sealing, can only set `sealed: true` and add `sealedAt`, `sealedBy`
- ❌ **INVARIANT: Sealed snapshots cannot be updated**
- ❌ **INVARIANT: Snapshots cannot be deleted**

**Snapshot Lifecycle**:

1. **Draft**: User creates snapshot with `sealed: false`
2. **Editing**: User can update snapshot content (add files, rooms, etc.)
3. **Sealing**: User sets `sealed: true` (one-way operation)
4. **Immutable**: Snapshot can never be modified again

**Content-Addressed Files**:

Files in sealed snapshots should use content-based storage keys (e.g., SHA-256 hash) to prevent overwriting. This ensures files remain immutable even if Storage permissions allow overwrites.

## Security Invariants

### 1. Append-Only Events

**Invariant**: Once created, events can never be updated or deleted.

**Test Cases**:

```javascript
// ✅ PASS: Create event
await addDoc(collection(db, `homes/${homeId}/events`), eventData);

// ❌ FAIL: Update event (should be denied)
await updateDoc(doc(db, `homes/${homeId}/events/${eventId}`), {
  title: 'New Title',
});
// Expected: permission-denied

// ❌ FAIL: Delete event (should be denied)
await deleteDoc(doc(db, `homes/${homeId}/events/${eventId}`));
// Expected: permission-denied
```

**Correction Pattern**:

```javascript
// Create a correction event
await addDoc(collection(db, `homes/${homeId}/events`), {
  type: 'correction',
  title: 'Correction: Updated cost',
  description: 'Correcting the cost of the previous event',
  correctsEventId: originalEventId,
  date: new Date(),
  // ... other required fields
});
```

### 2. Immutable Sealed Snapshots

**Invariant**: Once `sealed: true`, snapshots cannot be modified or deleted.

**Test Cases**:

```javascript
// ✅ PASS: Create unsealed snapshot
const snapshotRef = await addDoc(collection(db, `homes/${homeId}/snapshots`), {
  sealed: false,
  // ... other fields
});

// ✅ PASS: Update unsealed snapshot
await updateDoc(snapshotRef, { title: 'Updated Title' });

// ✅ PASS: Seal snapshot
await updateDoc(snapshotRef, {
  sealed: true,
  sealedAt: serverTimestamp(),
  sealedBy: currentUserId,
});

// ❌ FAIL: Update sealed snapshot (should be denied)
await updateDoc(snapshotRef, { title: 'New Title' });
// Expected: permission-denied

// ❌ FAIL: Unseal snapshot (should be denied)
await updateDoc(snapshotRef, { sealed: false });
// Expected: permission-denied

// ❌ FAIL: Delete sealed snapshot (should be denied)
await deleteDoc(snapshotRef);
// Expected: permission-denied
```

### 3. Access Control

**Invariant**: Users can only access homes they have explicit access to.

**Test Cases**:

```javascript
// Setup: User A belongs to Household A, User B belongs to Household B
// Home X has access granted to Household A only

// ✅ PASS: User A can read Home X
await getDoc(doc(db, `homes/${homeXId}`));

// ❌ FAIL: User B cannot read Home X (should be denied)
await getDoc(doc(db, `homes/${homeXId}`));
// Expected: permission-denied

// ❌ FAIL: User B cannot read Home X events (should be denied)
await getDocs(collection(db, `homes/${homeXId}/events`));
// Expected: permission-denied
```

### 4. Ownership Transfer

**Invariant**: When ownership transfers, old household access must be revoked.

**Transfer Process** (handled by Cloud Function):

1. Update `home.currentOwnerHouseholdId` to new owner
2. Create new access document for new owner household
3. **Delete all old access documents** (revoke previous household access)
4. Invalidate any temporary/contractor access

**Test Case**:

```javascript
// Before transfer: Household A has access
// After transfer: Household B has access

// ✅ PASS: After transfer, Household B owner can access home
await getDoc(doc(db, `homes/${homeId}`));

// ❌ FAIL: After transfer, Household A cannot access home (should be denied)
await getDoc(doc(db, `homes/${homeId}`));
// Expected: permission-denied
```

## Testing with Firebase Emulator

### Setup

1. Install Firebase CLI:

   ```bash
   npm install -g firebase-tools
   ```

2. Initialize Firebase project (if not already done):

   ```bash
   firebase init
   ```

3. Start emulators:

   ```bash
   firebase emulators:start
   ```

4. Access Emulator UI at `http://localhost:4000`

### Running Security Rules Tests

Create test scenarios in `tests/firestore.rules.test.ts` (TODO):

```bash
npm run test:rules
```

### Manual Testing

1. Set environment variable in `apps/web/.env.local`:

   ```
   NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true
   ```

2. Start the web app:

   ```bash
   npm run dev
   ```

3. The app will connect to local emulators automatically

4. Use Emulator UI to:
   - View Firestore data
   - Test security rules
   - Monitor requests

### Test Scenarios

#### Scenario 1: Event Immutability

1. Create a home and add an access document for your household
2. Create an event via the app or Emulator UI
3. Attempt to update the event → Should fail
4. Attempt to delete the event → Should fail

#### Scenario 2: Snapshot Sealing

1. Create an unsealed snapshot
2. Update the snapshot → Should succeed
3. Seal the snapshot
4. Attempt to update the sealed snapshot → Should fail
5. Attempt to delete the sealed snapshot → Should fail

#### Scenario 3: Unauthorized Access

1. Create a home with access for Household A
2. Sign in as a user from Household B
3. Attempt to read the home → Should fail
4. Attempt to create events for the home → Should fail
5. Attempt to read events from the home → Should fail

## Future Enhancements

- [ ] Add Cloud Functions for critical mutations (baseline sealing, ownership transfer)
- [ ] Add automated security rules tests
- [ ] Add indexes for common query patterns
- [ ] Add field-level validation (e.g., email format, required fields)
- [ ] Add rate limiting for writes
- [ ] Add audit logging for sensitive operations

## Migration Notes

When deploying security rules changes:

1. Test thoroughly in emulator first
2. Deploy to staging environment
3. Run smoke tests
4. Deploy to production during low-traffic window
5. Monitor for security rule errors in Firebase Console

## References

- [Firestore Security Rules Documentation](https://firebase.google.com/docs/firestore/security/get-started)
- [OurHaus Custom Instructions](../.github/copilot-instructions.md)
- [Firestore Schema Types](../packages/shared/src/firestore-schema.ts)
