'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';

const MAX_DURATION = 8000;
const FADE_DURATION = 300;

const Preloader = dynamic(() => import('@/app/components/Preloader'), {
  ssr: false,
});

export default function LoaderGate() {
  const [status, setStatus] = useState<'loading' | 'fading' | 'hidden'>('loading');
  const [loopFinished, setLoopFinished] = useState(false);

  const handleLoopComplete = useCallback(() => {
    setLoopFinished(true);
  }, []);

  useEffect(() => {
    if (status === 'fading' || status === 'hidden') {
      document.body.setAttribute('data-ready', 'true');
    }
  }, [status]);

  useEffect(() => {
    if (status !== 'loading') return;
    if (!loopFinished) return;

    setStatus('fading');
    const id = setTimeout(() => setStatus('hidden'), FADE_DURATION);
    return () => clearTimeout(id);
  }, [loopFinished, status]);

  useEffect(() => {
    if (status !== 'loading') return;
    const id = setTimeout(() => {
      setStatus('fading');
      setTimeout(() => setStatus('hidden'), FADE_DURATION);
    }, MAX_DURATION);
    return () => clearTimeout(id);
  }, [status]);

  if (status === 'hidden') return null;

  return (
    <div
      aria-busy={status === 'loading'}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-300 ease-out ${
        status === 'fading' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative z-10">
        <Preloader onLoopComplete={handleLoopComplete} />
      </div>
    </div>
  );
}
