'use client';

import { useFirebase } from './firebase-provider';

export function FirebaseStatus() {
  const { isConfigured, isInitialized, isUsingEmulator, error } = useFirebase();

  if (!isConfigured) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
        <div className="flex items-start gap-3">
          <span className="text-yellow-600 text-lg">⚠️</span>
          <div>
            <p className="font-medium text-yellow-800">
              Firebase Not Configured
            </p>
            <p className="text-yellow-700 mt-1">
              Add Firebase credentials to <code>.env.local</code> to enable
              Firebase features.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm">
        <div className="flex items-start gap-3">
          <span className="text-red-600 text-lg">❌</span>
          <div>
            <p className="font-medium text-red-800">Firebase Error</p>
            <p className="text-red-700 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isInitialized) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm">
        <div className="flex items-start gap-3">
          <span className="text-green-600 text-lg">✓</span>
          <div>
            <p className="font-medium text-green-800">
              Firebase Connected
              {isUsingEmulator && ' (Emulator Mode)'}
            </p>
            <p className="text-green-700 mt-1">
              {isUsingEmulator
                ? 'Connected to local Firebase emulators for development'
                : 'Connected to production Firebase services'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm">
      <div className="flex items-start gap-3">
        <span className="text-gray-600 text-lg">⏳</span>
        <div>
          <p className="font-medium text-gray-800">Initializing Firebase...</p>
        </div>
      </div>
    </div>
  );
}
