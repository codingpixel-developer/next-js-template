'use client';

import { useEffect } from 'react';
import { ErrorFallback } from '@/app/_shared/components/ui/errorFallback/errorFallback';
import './globals.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <ErrorFallback
          error={error}
          onRetry={reset}
          onGoHome={() => (window.location.href = '/')}
        />
      </body>
    </html>
  );
}
