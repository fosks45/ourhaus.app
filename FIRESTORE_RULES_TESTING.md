# Firestore Security Rules - Test Guide

This guide provides step-by-step instructions for testing OurHaus Firestore security rules using the Firebase Emulator.

## Prerequisites

1. Firebase CLI installed:

   ```bash
   npm install -g firebase-tools
   ```

2. Firebase project initialized (`.firebaserc` file exists)

3. Environment variables set in `apps/web/.env.local`:
   ```
   NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=ourhaus-demo
   NEXT_PUBLIC_FIREBASE_API_KEY=demo-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=localhost
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=demo-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456
   NEXT_PUBLIC_FIREBASE_APP_ID=demo-app
   ```

## Starting the Emulator

```bash
# From repository root
firebase emulators:start
```

This will start:

- Firestore Emulator on `localhost:8080`
- Auth Emulator on `localhost:9099`
- Storage Emulator on `localhost:9199`
- Functions Emulator on `localhost:5001`
- Emulator UI on `localhost:4000`

## Test Scenarios

### Test 1: Event Immutability (Append-Only)

**Objective**: Verify that events cannot be updated or deleted once created.

#### Setup:

1. Open Emulator UI at `http://localhost:4000`
2. Go to Authentication tab
3. Add a test user (e.g., `user1@test.com`, UID: `user1`)
4. Go to Firestore tab
5. Create the following structure:

```
/users/user1
{
  "id": "user1",
  "email": "user1@test.com",
  "householdIds": ["household1"],
  "createdAt": <current timestamp>,
  "updatedAt": <current timestamp>
}

/households/household1
{
  "id": "household1",
  "name": "Test Household",
  "memberIds": ["user1"],
  "primaryContactId": "user1",
  "createdAt": <current timestamp>,
  "updatedAt": <current timestamp>
}

/homes/home1
{
  "id": "home1",
  "address": {
    "street": "123 Test St",
    "city": "Test City",
    "state": "TS",
    "zipCode": "12345",
    "country": "USA"
  },
  "currentOwnerHouseholdId": "household1",
  "createdAt": <current timestamp>,
  "updatedAt": <current timestamp>
}

/homes/home1/access/household1
{
  "householdId": "household1",
  "homeId": "home1",
  "role": "owner",
  "grantedBy": "user1",
  "grantedAt": <current timestamp>,
  "createdAt": <current timestamp>,
  "updatedAt": <current timestamp>
}
```

#### Test Steps:

**Test 1.1: Create Event (Should PASS)**

1. Sign in as `user1@test.com` in your app or via Emulator Auth
2. Create an event:

   ```javascript
   const eventData = {
     homeId: 'home1',
     type: 'maintenance',
     title: 'Fixed leaky faucet',
     description: 'Replaced washer in kitchen faucet',
     date: new Date(),
     createdBy: 'user1',
     createdByHouseholdId: 'household1',
     createdAt: new Date(),
   };

   await addDoc(collection(db, 'homes/home1/events'), eventData);
   ```

3. **Expected Result**: ✅ Event created successfully

**Test 1.2: Update Event (Should FAIL)**

1. Try to update the event created above:
   ```javascript
   await updateDoc(doc(db, 'homes/home1/events', eventId), {
     title: 'Updated title',
   });
   ```
2. **Expected Result**: ❌ `permission-denied` error
3. **Verification**: Event data remains unchanged in Firestore

**Test 1.3: Delete Event (Should FAIL)**

1. Try to delete the event:
   ```javascript
   await deleteDoc(doc(db, 'homes/home1/events', eventId));
   ```
2. **Expected Result**: ❌ `permission-denied` error
3. **Verification**: Event still exists in Firestore

**Test 1.4: Create Correction Event (Should PASS)**

1. Create a correction event:

   ```javascript
   const correctionData = {
     homeId: 'home1',
     type: 'correction',
     title: 'Correction: Cost was $50, not free',
     correctsEventId: eventId,
     date: new Date(),
     createdBy: 'user1',
     createdByHouseholdId: 'household1',
     createdAt: new Date(),
   };

   await addDoc(collection(db, 'homes/home1/events'), correctionData);
   ```

2. **Expected Result**: ✅ Correction event created successfully

### Test 2: Snapshot Immutability When Sealed

**Objective**: Verify that sealed snapshots cannot be modified or deleted.

#### Setup:

Use the same user and home setup from Test 1.

#### Test Steps:

**Test 2.1: Create Unsealed Snapshot (Should PASS)**

1. Create a snapshot:

   ```javascript
   const snapshotData = {
     homeId: 'home1',
     title: 'Move-in Inspection',
     description: 'Initial home inspection',
     date: new Date(),
     sealed: false, // Must start unsealed
     type: 'move-in',
     createdBy: 'user1',
     createdByHouseholdId: 'household1',
     createdAt: new Date(),
     updatedAt: new Date(),
     rooms: [{ name: 'Living Room', condition: 'Good', notes: 'Fresh paint' }],
   };

   const snapshotRef = await addDoc(
     collection(db, 'homes/home1/snapshots'),
     snapshotData
   );
   ```

2. **Expected Result**: ✅ Snapshot created successfully

**Test 2.2: Update Unsealed Snapshot (Should PASS)**

1. Update the unsealed snapshot:
   ```javascript
   await updateDoc(snapshotRef, {
     description: 'Updated description',
     rooms: [
       {
         name: 'Living Room',
         condition: 'Excellent',
         notes: 'Fresh paint, new carpet',
       },
     ],
   });
   ```
2. **Expected Result**: ✅ Snapshot updated successfully

**Test 2.3: Seal Snapshot (Should PASS)**

1. Seal the snapshot:
   ```javascript
   await updateDoc(snapshotRef, {
     sealed: true,
     sealedAt: serverTimestamp(),
     sealedBy: 'user1',
   });
   ```
2. **Expected Result**: ✅ Snapshot sealed successfully
3. **Verification**: `sealed: true` in Firestore

**Test 2.4: Update Sealed Snapshot (Should FAIL)**

1. Try to update the sealed snapshot:
   ```javascript
   await updateDoc(snapshotRef, {
     description: 'Trying to change after sealing',
   });
   ```
2. **Expected Result**: ❌ `permission-denied` error
3. **Verification**: Snapshot data remains unchanged

**Test 2.5: Unseal Snapshot (Should FAIL)**

1. Try to unseal the snapshot:
   ```javascript
   await updateDoc(snapshotRef, {
     sealed: false,
   });
   ```
2. **Expected Result**: ❌ `permission-denied` error
3. **Verification**: `sealed` remains `true`

**Test 2.6: Delete Sealed Snapshot (Should FAIL)**

1. Try to delete the snapshot:
   ```javascript
   await deleteDoc(snapshotRef);
   ```
2. **Expected Result**: ❌ `permission-denied` error
3. **Verification**: Snapshot still exists in Firestore

**Test 2.7: Delete Unsealed Snapshot (Should FAIL)**

1. Create a new unsealed snapshot
2. Try to delete it:
   ```javascript
   await deleteDoc(newSnapshotRef);
   ```
3. **Expected Result**: ❌ `permission-denied` error
4. **Verification**: Snapshots cannot be deleted, even when unsealed

### Test 3: Access Control

**Objective**: Verify that users can only access homes they have explicit access to.

#### Setup:

1. Create a second user and household:

```
/users/user2
{
  "id": "user2",
  "email": "user2@test.com",
  "householdIds": ["household2"],
  "createdAt": <current timestamp>,
  "updatedAt": <current timestamp>
}

/households/household2
{
  "id": "household2",
  "name": "Test Household 2",
  "memberIds": ["user2"],
  "primaryContactId": "user2",
  "createdAt": <current timestamp>,
  "updatedAt": <current timestamp>
}
```

2. Home1 has access granted to household1 only (from previous tests)

#### Test Steps:

**Test 3.1: Authorized User Can Read Home (Should PASS)**

1. Sign in as `user1@test.com`
2. Read home data:
   ```javascript
   const homeDoc = await getDoc(doc(db, 'homes/home1'));
   console.log(homeDoc.data());
   ```
3. **Expected Result**: ✅ Home data returned successfully

**Test 3.2: Unauthorized User Cannot Read Home (Should FAIL)**

1. Sign in as `user2@test.com`
2. Try to read home1:
   ```javascript
   const homeDoc = await getDoc(doc(db, 'homes/home1'));
   ```
3. **Expected Result**: ❌ `permission-denied` error

**Test 3.3: Unauthorized User Cannot Read Events (Should FAIL)**

1. Still signed in as `user2@test.com`
2. Try to read events from home1:
   ```javascript
   const events = await getDocs(collection(db, 'homes/home1/events'));
   ```
3. **Expected Result**: ❌ `permission-denied` error

**Test 3.4: Unauthorized User Cannot Create Events (Should FAIL)**

1. Still signed in as `user2@test.com`
2. Try to create an event for home1:
   ```javascript
   await addDoc(collection(db, 'homes/home1/events'), {
     homeId: 'home1',
     type: 'note',
     title: 'Unauthorized note',
     date: new Date(),
     createdBy: 'user2',
     createdByHouseholdId: 'household2',
     createdAt: new Date(),
   });
   ```
3. **Expected Result**: ❌ `permission-denied` error

**Test 3.5: Grant Access to Second User (Should PASS)**

1. Sign in as `user1@test.com` (owner)
2. Grant access to household2:
   ```javascript
   await setDoc(doc(db, 'homes/home1/access/household2'), {
     householdId: 'household2',
     homeId: 'home1',
     role: 'viewer',
     grantedBy: 'user1',
     grantedAt: serverTimestamp(),
     createdAt: serverTimestamp(),
     updatedAt: serverTimestamp(),
   });
   ```
3. **Expected Result**: ✅ Access granted successfully

**Test 3.6: Newly Authorized User Can Now Read Home (Should PASS)**

1. Sign in as `user2@test.com`
2. Try to read home1 again:
   ```javascript
   const homeDoc = await getDoc(doc(db, 'homes/home1'));
   console.log(homeDoc.data());
   ```
3. **Expected Result**: ✅ Home data returned successfully

### Test 4: Ownership Transfer

**Objective**: Verify access control during ownership transfer.

#### Setup:

Use existing users and households from previous tests.

#### Test Steps:

**Test 4.1: Current State Verification**

1. Verify home1 has access for both household1 and household2
2. Verify `currentOwnerHouseholdId` is "household1"

**Test 4.2: Transfer Ownership**

This should be done via a Cloud Function in production, but for testing:

1. Sign in as `user1@test.com` (current owner)
2. Update home ownership:

   ```javascript
   // Step 1: Update home owner
   await updateDoc(doc(db, 'homes/home1'), {
     currentOwnerHouseholdId: 'household2',
   });

   // Step 2: Update household2 access to owner role
   await updateDoc(doc(db, 'homes/home1/access/household2'), {
     role: 'owner',
   });

   // Step 3: Delete household1 access
   await deleteDoc(doc(db, 'homes/home1/access/household1'));
   ```

**Test 4.3: Old Owner Cannot Access Home (Should FAIL)**

1. Refresh or re-authenticate as `user1@test.com`
2. Try to read home1:
   ```javascript
   const homeDoc = await getDoc(doc(db, 'homes/home1'));
   ```
3. **Expected Result**: ❌ `permission-denied` error

**Test 4.4: New Owner Can Access Home (Should PASS)**

1. Sign in as `user2@test.com` (new owner)
2. Read home1:
   ```javascript
   const homeDoc = await getDoc(doc(db, 'homes/home1'));
   console.log(homeDoc.data());
   ```
3. **Expected Result**: ✅ Home data returned successfully

**Test 4.5: New Owner Can Grant Access (Should PASS)**

1. Still signed in as `user2@test.com`
2. Grant viewer access back to household1:
   ```javascript
   await setDoc(doc(db, 'homes/home1/access/household1'), {
     householdId: 'household1',
     homeId: 'home1',
     role: 'viewer',
     grantedBy: 'user2',
     grantedAt: serverTimestamp(),
     createdAt: serverTimestamp(),
     updatedAt: serverTimestamp(),
   });
   ```
3. **Expected Result**: ✅ Access granted successfully

## Test Results Template

| Test ID | Test Description               | Expected Result           | Actual Result | Status |
| ------- | ------------------------------ | ------------------------- | ------------- | ------ |
| 1.1     | Create Event                   | PASS - Event created      |               |        |
| 1.2     | Update Event                   | FAIL - permission-denied  |               |        |
| 1.3     | Delete Event                   | FAIL - permission-denied  |               |        |
| 1.4     | Create Correction Event        | PASS - Event created      |               |        |
| 2.1     | Create Unsealed Snapshot       | PASS - Snapshot created   |               |        |
| 2.2     | Update Unsealed Snapshot       | PASS - Snapshot updated   |               |        |
| 2.3     | Seal Snapshot                  | PASS - Snapshot sealed    |               |        |
| 2.4     | Update Sealed Snapshot         | FAIL - permission-denied  |               |        |
| 2.5     | Unseal Snapshot                | FAIL - permission-denied  |               |        |
| 2.6     | Delete Sealed Snapshot         | FAIL - permission-denied  |               |        |
| 2.7     | Delete Unsealed Snapshot       | FAIL - permission-denied  |               |        |
| 3.1     | Authorized User Read Home      | PASS - Home data returned |               |        |
| 3.2     | Unauthorized User Read Home    | FAIL - permission-denied  |               |        |
| 3.3     | Unauthorized User Read Events  | FAIL - permission-denied  |               |        |
| 3.4     | Unauthorized User Create Event | FAIL - permission-denied  |               |        |
| 3.5     | Grant Access                   | PASS - Access granted     |               |        |
| 3.6     | Newly Authorized User Read     | PASS - Home data returned |               |        |
| 4.1     | Ownership Transfer             | PASS - Ownership changed  |               |        |
| 4.2     | Old Owner Access Revoked       | FAIL - permission-denied  |               |        |
| 4.3     | New Owner Has Access           | PASS - Home data returned |               |        |
| 4.4     | New Owner Can Grant Access     | PASS - Access granted     |               |        |

## Troubleshooting

### Issue: "permission-denied" on valid operations

**Solution**:

1. Check that user profile exists in `/users/{userId}`
2. Verify `householdIds` array in user profile
3. Verify household membership in `/households/{householdId}`
4. Verify access document exists in `/homes/{homeId}/access/{householdId}`
5. Check emulator logs in terminal for detailed error messages

### Issue: Security rules not updating

**Solution**:

1. Stop emulator (`Ctrl+C`)
2. Restart with `firebase emulators:start`
3. Security rules are reloaded on emulator start

### Issue: Can't connect to emulator

**Solution**:

1. Verify `NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true` in `.env.local`
2. Check emulator is running on correct ports
3. Check browser console for connection errors

## Notes

- The Firebase Emulator provides a complete offline environment for testing
- Data in the emulator is ephemeral and lost when stopped
- The Emulator UI at `localhost:4000` provides a visual interface for inspecting data
- Security rules are enforced in the emulator just like in production
- Test early and often during development

## Next Steps

After manual testing:

1. Consider creating automated security rules tests using `@firebase/rules-unit-testing`
2. Integrate tests into CI/CD pipeline
3. Document any discovered edge cases
4. Implement Cloud Functions for critical operations (ownership transfer, baseline sealing)
