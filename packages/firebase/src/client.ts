/**
 * Firebase Client Initialization
 * Singleton pattern for Firebase app instance
 */

import { FirebaseApp, initializeApp, getApps, getApp } from 'firebase/app';
import { getFirebaseConfig, validateFirebaseConfig } from './config';

let firebaseApp: FirebaseApp | null = null;

/**
 * Initialize or get existing Firebase app instance
 */
export function getFirebaseApp(): FirebaseApp {
  // Return existing instance if available
  if (firebaseApp) {
    return firebaseApp;
  }

  // Check if app is already initialized
  const existingApps = getApps();
  if (existingApps.length > 0) {
    firebaseApp = getApp();
    return firebaseApp;
  }

  // Initialize new app
  const config = getFirebaseConfig();

  if (!validateFirebaseConfig(config)) {
    console.warn(
      'Firebase config is incomplete. Firebase features will not work.'
    );
    // Return a placeholder - in a real app, you might want to throw an error
    // or return a mock instance for development
  }

  firebaseApp = initializeApp(config);
  return firebaseApp;
}

/**
 * Reset Firebase app instance (useful for testing)
 */
export function resetFirebaseApp(): void {
  firebaseApp = null;
}
