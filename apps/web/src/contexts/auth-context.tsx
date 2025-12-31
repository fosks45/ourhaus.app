'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getFirebaseApp } from '@ourhaus/firebase';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { UserProfile } from '@ourhaus/shared';

interface AuthContextValue {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  userProfile: null,
  loading: true,
  signOut: async () => {},
  refreshUserProfile: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUserProfile = useCallback(async () => {
    if (!user) {
      setUserProfile(null);
      return;
    }

    try {
      const app = getFirebaseApp();
      const db = getFirestore(app);
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserProfile({
          id: userDoc.id,
          email: data.email,
          displayName: data.displayName,
          photoURL: data.photoURL,
          householdIds: data.householdIds || [],
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          preferences: data.preferences,
        });
      } else {
        // Create user profile if it doesn't exist
        const newProfile: Omit<UserProfile, 'createdAt' | 'updatedAt'> = {
          id: user.uid,
          email: user.email || '',
          displayName: user.displayName || undefined,
          photoURL: user.photoURL || undefined,
          householdIds: [],
          preferences: {
            notifications: true,
            theme: 'auto',
          },
        };

        await setDoc(userDocRef, {
          ...newProfile,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        setUserProfile({
          ...newProfile,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      const app = getFirebaseApp();
      const auth = getAuth(app);
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  useEffect(() => {
    const app = getFirebaseApp();
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(true);

      if (firebaseUser) {
        await refreshUserProfile();
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [refreshUserProfile]);

  useEffect(() => {
    if (user) {
      refreshUserProfile();
    }
  }, [user, refreshUserProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signOut: handleSignOut,
        refreshUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
