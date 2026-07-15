'use client';

import { useEffect } from 'react';
import { ErrorFallback } from '@/app/_shared/components/ui/errorFallback/errorFallback';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <ErrorFallback
      error={error}
      onRetry={reset}
      onGoHome={() => (window.location.href = '/')}
    />
  );
}
