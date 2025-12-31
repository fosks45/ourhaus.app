/**
 * Firebase Client Initialization
 * Singleton pattern for Firebase app instance with emulator support
 */

import { FirebaseApp, initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirebaseConfig,
  validateFirebaseConfig,
  getEmulatorConfig,
} from './config';

let firebaseApp: FirebaseApp | null = null;
let emulatorsInitialized = false;

/**
 * Initialize Firebase emulators if enabled
 * This must be called after app initialization but before using services
 */
function initializeEmulators(app: FirebaseApp): void {
  if (emulatorsInitialized) {
    return;
  }

  const emulatorConfig = getEmulatorConfig();

  if (!emulatorConfig.useEmulator) {
    return;
  }

  console.log('🔧 Connecting to Firebase emulators...');

  // Connect Auth emulator
  if (emulatorConfig.auth) {
    import('firebase/auth')
      .then(({ getAuth, connectAuthEmulator }) => {
        const auth = getAuth(app);
        const url = `http://${emulatorConfig.auth!.host}:${emulatorConfig.auth!.port}`;
        connectAuthEmulator(auth, url, { disableWarnings: true });
        console.log(`✓ Auth emulator: ${url}`);
      })
      .catch((err) => {
        console.error('Failed to connect to Auth emulator:', err);
      });
  }

  // Connect Firestore emulator
  if (emulatorConfig.firestore) {
    import('firebase/firestore')
      .then(({ getFirestore, connectFirestoreEmulator }) => {
        const db = getFirestore(app);
        connectFirestoreEmulator(
          db,
          emulatorConfig.firestore!.host,
          emulatorConfig.firestore!.port
        );
        console.log(
          `✓ Firestore emulator: ${emulatorConfig.firestore!.host}:${emulatorConfig.firestore!.port}`
        );
      })
      .catch((err) => {
        console.error('Failed to connect to Firestore emulator:', err);
      });
  }

  // Connect Storage emulator
  if (emulatorConfig.storage) {
    import('firebase/storage')
      .then(({ getStorage, connectStorageEmulator }) => {
        const storage = getStorage(app);
        connectStorageEmulator(
          storage,
          emulatorConfig.storage!.host,
          emulatorConfig.storage!.port
        );
        console.log(
          `✓ Storage emulator: ${emulatorConfig.storage!.host}:${emulatorConfig.storage!.port}`
        );
      })
      .catch((err) => {
        console.error('Failed to connect to Storage emulator:', err);
      });
  }

  // Connect Functions emulator
  if (emulatorConfig.functions) {
    import('firebase/functions')
      .then(({ getFunctions, connectFunctionsEmulator }) => {
        const functions = getFunctions(app);
        connectFunctionsEmulator(
          functions,
          emulatorConfig.functions!.host,
          emulatorConfig.functions!.port
        );
        console.log(
          `✓ Functions emulator: ${emulatorConfig.functions!.host}:${emulatorConfig.functions!.port}`
        );
      })
      .catch((err) => {
        console.error('Failed to connect to Functions emulator:', err);
      });
  }

  emulatorsInitialized = true;
}

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
    initializeEmulators(firebaseApp);
    return firebaseApp;
  }

  // Initialize new app
  const config = getFirebaseConfig();

  if (!validateFirebaseConfig(config)) {
    console.warn(
      'Firebase config is incomplete. Firebase features will not work. Please set Firebase environment variables in .env.local'
    );
    throw new Error(
      'Firebase configuration is incomplete. Check console for details.'
    );
  }

  firebaseApp = initializeApp(config);
  initializeEmulators(firebaseApp);

  return firebaseApp;
}

/**
 * Check if Firebase is configured and ready to use
 */
export function isFirebaseConfigured(): boolean {
  const config = getFirebaseConfig();
  return validateFirebaseConfig(config);
}

/**
 * Reset Firebase app instance (useful for testing)
 */
export function resetFirebaseApp(): void {
  firebaseApp = null;
  emulatorsInitialized = false;
}
