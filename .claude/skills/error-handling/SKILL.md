---
name: error-handling
description: Use when working with error boundaries, error.tsx / global-error.tsx / not-found.tsx, customizing the error fallback UI, or wiring error reporting in this Next.js App Router app.
---

# Skill: Error Handling

## What exists

- `app/error.tsx` — segment error boundary (React error boundary auto-wired by Next around route segments). Catches render errors in pages/layouts below the root.
- `app/global-error.tsx` — root boundary. Catches errors in the **root layout** itself; renders its own `<html>`/`<body>`. Runs without the root layout's providers/fonts — keep it self-contained.
- `app/not-found.tsx` — 404 UI (rendered by `notFound()` / unmatched routes). Not an error boundary.
- `app/_shared/components/ui/errorFallback/errorFallback.tsx` — shared fallback UI used by both `error.tsx` and `global-error.tsx`. Shows the error stack in dev only.

## What boundaries catch

`error.tsx` / `global-error.tsx` catch errors thrown during **render** of Server/Client Components in their scope. They do **NOT** catch event-handler or async errors — catch those locally and surface via the toast pattern (`useToast`).

## Add a nested segment boundary

Drop an `error.tsx` in any route folder to scope recovery to that segment:

```tsx
'use client';

import { ErrorFallback } from '@/app/_shared/components/ui/errorFallback/errorFallback';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <ErrorFallback
      error={error}
      onRetry={reset}
      onGoHome={() => (window.location.href = '/')}
    />
  );
}
```

## Error reporting

Log/report inside the `useEffect(() => { ... }, [error])` in `error.tsx` / `global-error.tsx` (e.g. `reportToSentry(error)`).
