'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import lottie from 'lottie-web';

declare global {
  interface Window {
    gsap?: typeof gsap;
    ScrollTrigger?: typeof ScrollTrigger;
    Lenis?: typeof Lenis;
    lottie?: typeof lottie;
    __scrollJsLoaded?: boolean;
  }
}

export default function ScriptsBootstrap() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    window.gsap = gsap;
    window.ScrollTrigger = ScrollTrigger;
    window.Lenis = Lenis;
    window.lottie = lottie;

    if (window.__scrollJsLoaded) return;
    window.__scrollJsLoaded = true;
    const script = document.createElement('script');
    script.src = '/scroll.js';
    script.async = false;
    document.body.appendChild(script);
  }, []);

  return null;
}
