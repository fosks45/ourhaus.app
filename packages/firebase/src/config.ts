/**
 * Firebase Configuration
 * Environment-based Firebase setup with emulator support
 */

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

export interface EmulatorConfig {
  useEmulator: boolean;
  auth?: { host: string; port: number };
  firestore?: { host: string; port: number };
  storage?: { host: string; port: number };
  functions?: { host: string; port: number };
}

/**
 * Get Firebase configuration from environment variables
 * In production, these should be set via deployment platform
 */
export function getFirebaseConfig(): FirebaseConfig {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };
}

/**
 * Get emulator configuration from environment variables
 * Emulators are used for local development
 */
export function getEmulatorConfig(): EmulatorConfig {
  const useEmulator = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true';

  return {
    useEmulator,
    auth: useEmulator ? { host: 'localhost', port: 9099 } : undefined,
    firestore: useEmulator ? { host: 'localhost', port: 8080 } : undefined,
    storage: useEmulator ? { host: 'localhost', port: 9199 } : undefined,
    functions: useEmulator ? { host: 'localhost', port: 5001 } : undefined,
  };
}

/**
 * Validate that all required Firebase config values are present
 */
export function validateFirebaseConfig(config: FirebaseConfig): boolean {
  return Boolean(
    config.apiKey &&
    config.authDomain &&
    config.projectId &&
    config.storageBucket &&
    config.messagingSenderId &&
    config.appId
  );
}
