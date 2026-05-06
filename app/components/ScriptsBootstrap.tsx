'use client';

import { useEffect } from 'react';

export default function ScriptsBootstrap() {
  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;

    import('@/app/lib/landing-effects').then(({ initLandingEffects }) => {
      if (cancelled) return;
      dispose = initLandingEffects();
    });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return null;
}
