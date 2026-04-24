'use client';

import { useLottie } from 'lottie-react';

import vbAnimation from '@/app/lottie/vb.json';

export default function Preloader({ onLoopComplete }: { onLoopComplete?: () => void }) {
  const { View } = useLottie({
    animationData: vbAnimation,
    loop: true,
    autoplay: true,
    onLoopComplete,
  });

  return <div className="relative w-70 sm:w-90 md:w-110">{View}</div>;
}
