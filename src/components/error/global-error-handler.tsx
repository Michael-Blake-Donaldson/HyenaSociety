'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function GlobalErrorHandler({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error('[ERROR BOUNDARY]', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0b0b0d] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-900/40 border border-red-700 rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="w-12 h-12 text-red-400" />
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>

          <p className="text-gray-300 text-sm mb-6">
            We encountered an unexpected error. Please try again.
          </p>

          {error.digest && (
            <p className="text-gray-500 text-xs font-mono mb-6 bg-black/50 p-3 rounded break-all">
              Error ID: {error.digest}
            </p>
          )}

          <div className="space-y-3">
            <button
              onClick={reset}
              className="w-full px-6 py-2 bg-[#c8f000] text-black font-semibold rounded-lg hover:bg-[#b8df00] transition"
            >
              Try Again
            </button>

            <a
              href="/"
              className="block w-full px-6 py-2 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-gray-500 transition"
            >
              Go to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
