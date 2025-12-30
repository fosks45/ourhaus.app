'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  getFirebaseApp,
  isFirebaseConfigured,
  getEmulatorConfig,
} from '@ourhaus/firebase';

interface FirebaseContextValue {
  isConfigured: boolean;
  isInitialized: boolean;
  isUsingEmulator: boolean;
  error: string | null;
}

const FirebaseContext = createContext<FirebaseContextValue>({
  isConfigured: false,
  isInitialized: false,
  isUsingEmulator: false,
  error: null,
});

export function useFirebase() {
  return useContext(FirebaseContext);
}

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [contextValue, setContextValue] = useState<FirebaseContextValue>({
    isConfigured: false,
    isInitialized: false,
    isUsingEmulator: false,
    error: null,
  });

  useEffect(() => {
    try {
      const configured = isFirebaseConfigured();
      const emulatorConfig = getEmulatorConfig();

      if (configured) {
        // Initialize Firebase app
        getFirebaseApp();

        setContextValue({
          isConfigured: true,
          isInitialized: true,
          isUsingEmulator: emulatorConfig.useEmulator,
          error: null,
        });

        console.log('✓ Firebase initialized successfully');
        if (emulatorConfig.useEmulator) {
          console.log('🔧 Using Firebase emulators for local development');
        }
      } else {
        setContextValue({
          isConfigured: false,
          isInitialized: false,
          isUsingEmulator: false,
          error: 'Firebase configuration is incomplete',
        });

        console.warn(
          'Firebase is not configured. Add Firebase credentials to .env.local'
        );
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setContextValue({
        isConfigured: false,
        isInitialized: false,
        isUsingEmulator: false,
        error: errorMessage,
      });

      console.error('Failed to initialize Firebase:', err);
    }
  }, []);

  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
    </FirebaseContext.Provider>
  );
}
