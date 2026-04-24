'use client';

import { useEffect, useState } from 'react';

export function useReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.body.dataset.ready === 'true') {
      setReady(true);
      return;
    }

    const observer = new MutationObserver(() => {
      if (document.body.dataset.ready === 'true') {
        setReady(true);
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-ready'],
    });

    return () => observer.disconnect();
  }, []);

  return ready;
}
