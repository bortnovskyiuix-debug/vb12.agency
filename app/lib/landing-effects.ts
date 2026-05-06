import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import lottie, { type AnimationItem } from 'lottie-web';

type Cleanup = () => void;

const PRELOADER_TIMEOUT_MS = 8000;

export function initLandingEffects(): Cleanup {
  gsap.registerPlugin(ScrollTrigger);

  const cleanups: Cleanup[] = [];
  const observers: IntersectionObserver[] = [];
  const rafIds: number[] = [];
  let cancelled = false;

  const safeRaf = (loop: () => void) => {
    const tick = () => {
      if (cancelled) return;
      loop();
      rafIds.push(requestAnimationFrame(tick));
    };
    rafIds.push(requestAnimationFrame(tick));
  };

  document.documentElement.classList.remove('no-js');

  /* ---------- Preloader: loop Lottie until window 'load', then dismiss ---------- */
  const preloaderHost = document.getElementById('lottie-preloader');
  let lottieAnim: AnimationItem | null = null;
  let preloaderDone = false;

  const finishPreloader = () => {
    if (preloaderDone) return;
    preloaderDone = true;
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-loaded');
    runIntro();
    setTimeout(() => ScrollTrigger.refresh(), 50);
  };

  if (preloaderHost) {
    try {
      lottieAnim = lottie.loadAnimation({
        container: preloaderHost,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/landing/preloader.json',
      });
    } catch {
      // ignore — fallback dismiss runs anyway
    }
  }

  const onWindowLoad = () => setTimeout(finishPreloader, 0);
  if (document.readyState === 'complete') {
    setTimeout(finishPreloader, 0);
  } else {
    window.addEventListener('load', onWindowLoad, { once: true });
    cleanups.push(() => window.removeEventListener('load', onWindowLoad));
  }
  const preloaderTimeout = window.setTimeout(finishPreloader, PRELOADER_TIMEOUT_MS);
  cleanups.push(() => window.clearTimeout(preloaderTimeout));

  /* ---------- Lazy videos: load + play when near viewport ---------- */
  const lazyVideos = document.querySelectorAll<HTMLVideoElement>('video.lazy-video');
  if (lazyVideos.length) {
    const hydrate = (video: HTMLVideoElement) => {
      if (video.dataset.hydrated) return;
      video.dataset.hydrated = '1';
      const src = video.dataset.src;
      const type = video.dataset.type || 'video/mp4';
      if (!src) return;
      const source = document.createElement('source');
      source.src = src;
      source.type = type;
      video.appendChild(source);
      video.preload = 'auto';
      video.load();
      const play = () => void video.play().catch(() => {});
      if (video.readyState >= 2) play();
      else video.addEventListener('loadeddata', play, { once: true });
    };

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              hydrate(e.target as HTMLVideoElement);
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: '300px 0px' }
      );
      lazyVideos.forEach(v => io.observe(v));
      observers.push(io);
    } else {
      lazyVideos.forEach(hydrate);
    }
  }

  /* ---------- Lenis smooth scroll ---------- */
  const lenis = new Lenis({
    duration: 1.25,
    smoothWheel: true,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    lerp: 0.1,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  });

  const onLenisScroll = () => ScrollTrigger.update();
  lenis.on('scroll', onLenisScroll);

  const lenisRafTick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(lenisRafTick);
  gsap.ticker.lagSmoothing(0);
  cleanups.push(() => {
    gsap.ticker.remove(lenisRafTick);
    lenis.destroy();
  });

  /* ---------- INTRO: hero/topbar entry ---------- */
  const heroLines = document.querySelectorAll('.hero .reveal-line > span');
  const topbarItems = document.querySelectorAll('.topbar > *');
  const heroCta = document.querySelector('.hero__cta');
  const heroStats = document.querySelector('.hero__stats');
  const startNow = document.querySelector('.start-now');
  const heroVisual = document.querySelector('.hero__visual');
  const heroBolt = document.querySelector('.hero__bolt');

  gsap.set(heroLines, { yPercent: 110 });
  gsap.set(topbarItems, { y: -30, opacity: 0 });
  gsap.set([heroCta, heroStats, startNow].filter(Boolean), { y: 30, opacity: 0 });
  if (heroVisual) gsap.set(heroVisual, { x: 80, opacity: 0 });
  if (heroBolt) gsap.set(heroBolt, { scale: 0.4, opacity: 0, rotation: -30 });

  function runIntro() {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.to(topbarItems, { y: 0, opacity: 1, duration: 0.8, stagger: 0.06 }, 0.05);
    if (heroVisual) tl.to(heroVisual, { x: 0, opacity: 1, duration: 1.1 }, 0.15);
    if (heroBolt) tl.to(heroBolt, { scale: 1, opacity: 1, rotation: 0, duration: 0.9, ease: 'back.out(1.4)' }, 0.4);
    tl.to(heroLines, { yPercent: 0, duration: 1.1, stagger: 0.08 }, 0.2);
    const ctaTargets = [heroCta, heroStats, startNow].filter(Boolean);
    if (ctaTargets.length) tl.to(ctaTargets, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 }, 0.6);
  }

  if (document.body.classList.contains('is-loaded')) runIntro();

  /* ---------- STATS: count-up ---------- */
  document.querySelectorAll<HTMLElement>('[data-counter]').forEach(el => {
    const target = parseInt(el.dataset.counter || '0', 10);
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.v) + '+';
          },
        });
      },
    });
  });

  /* ---------- SHOWREEL: pinned scrub ---------- */
  const showreel = document.querySelector('.showreel');
  const showreelCube = document.querySelector('.showreel__cube');
  const showreelBoltLeft = document.querySelector('.showreel__bolt--left');
  const showreelBoltRight = document.querySelector('.showreel__bolt--right');
  const showreelPlay = document.querySelector('.showreel__play');
  if (showreel && (showreelCube || showreelBoltLeft || showreelBoltRight || showreelPlay)) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: showreel,
        start: 'top top+=80',
        end: '+=600',
        scrub: 0.6,
        pin: false,
      },
    });
    if (showreelCube) tl.fromTo(showreelCube, { scale: 0.85, rotate: 0 }, { scale: 1.05, rotate: 18, ease: 'none' }, 0);
    if (showreelBoltLeft)
      tl.fromTo(
        showreelBoltLeft,
        { x: -80, rotate: -20, opacity: 0.5 },
        { x: 0, rotate: -8, opacity: 1, ease: 'none' },
        0
      );
    if (showreelBoltRight)
      tl.fromTo(
        showreelBoltRight,
        { x: 80, rotate: 20, opacity: 0.5 },
        { x: 0, rotate: 6, opacity: 1, ease: 'none' },
        0
      );
    if (showreelPlay) tl.fromTo(showreelPlay, { scale: 0.6 }, { scale: 1, ease: 'power2.out' }, 0);
  }

  /* ---------- FLOATING ELEMENTS (idle bobbing) ---------- */
  document.querySelectorAll<HTMLElement>('[data-float]').forEach((el, i) => {
    gsap.to(el, {
      y: '+=14',
      rotation: '+=2',
      duration: 3 + (i % 4) * 0.4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  });

  /* ---------- PARALLAX ---------- */
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(el => {
    const speed = parseFloat(el.dataset.parallax || '0');
    gsap.fromTo(
      el,
      { y: 100 * speed },
      {
        y: -100 * speed,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );
  });

  /* ---------- CASE CARDS ---------- */
  gsap.utils.toArray<HTMLElement>('.reveal-card').forEach(card => {
    gsap.fromTo(
      card,
      { y: 80, scale: 0.94, opacity: 0 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1.1,
        ease: 'expo.out',
        immediateRender: false,
        scrollTrigger: { trigger: card, start: 'top 88%' },
      }
    );
  });

  /* ---------- SECTION TITLES word-by-word reveal ---------- */
  gsap.utils.toArray<HTMLElement>('.section-title').forEach(title => {
    if (title.dataset.split === '1') return;
    title.dataset.split = '1';
    const text = title.innerHTML;
    title.innerHTML = text.replace(
      /(<span[^>]*>[^<]*<\/span>|\S+)/g,
      m => `<span class="word"><span class="word__inner">${m}</span></span>`
    );
    const innerWords = title.querySelectorAll('.word__inner');
    gsap.fromTo(
      innerWords,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: { trigger: title, start: 'top 88%' },
      }
    );
  });

  /* ---------- LEAD COPY reveal ---------- */
  gsap.utils
    .toArray<HTMLElement>(
      '.lead-copy, .hero__sub, .problem__title, .srow__name, .srow__copy, .contact-teaser__pill p, .agency-meta, .stat__num, .stat__label, .badge-pill, .case__title, .case__corner'
    )
    .forEach(el => {
      gsap.fromTo(
        el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 92%' },
        }
      );
    });

  /* ---------- TAG / CHIP LISTS stagger ---------- */
  gsap.utils.toArray<HTMLElement>('.tag-list, .chip-list, .srow__chips').forEach(list => {
    const items = list.querySelectorAll('li');
    gsap.fromTo(
      items,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'expo.out',
        stagger: 0.04,
        scrollTrigger: { trigger: list, start: 'top 92%' },
      }
    );
  });

  /* ---------- Service rows: stagger fade in ---------- */
  gsap.utils.toArray<HTMLElement>('.srow').forEach((row, i) => {
    gsap.fromTo(
      row,
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'expo.out',
        delay: i * 0.05,
        scrollTrigger: { trigger: row, start: 'top 90%' },
      }
    );
  });

  /* ---------- Service rows: hover preview that follows cursor ---------- */
  const sList = document.getElementById('services-list');
  const sPreview = document.getElementById('srow-preview');
  if (sList && sPreview) {
    const sImg = sPreview.querySelector<HTMLImageElement>('.srow-preview__img');
    const sVid = sPreview.querySelector<HTMLVideoElement>('.srow-preview__video');

    let px = 0,
      py = 0;
    let cx = 0,
      cy = 0;
    let visible = false;
    let currentSrc: string | null = null;

    const setPreview = (row: HTMLElement) => {
      const img = row.dataset.preview;
      const video = row.dataset.previewVideo;
      const src = video || img || null;
      if (src === currentSrc) return;
      currentSrc = src;

      if (video && sVid) {
        sVid.src = video;
        void sVid.play().catch(() => {});
        sPreview.classList.remove('is-image');
        sPreview.classList.add('is-video');
      } else if (img && sImg) {
        sImg.src = img;
        sPreview.classList.remove('is-video');
        sPreview.classList.add('is-image');
        try {
          sVid?.pause();
          sVid?.removeAttribute('src');
          sVid?.load();
        } catch {
          // ignore
        }
      }
    };

    const onRowEnter = (row: HTMLElement) => () => {
      setPreview(row);
      if (!visible) {
        visible = true;
        sPreview.classList.add('is-visible');
      }
    };
    const rowHandlers: Array<[HTMLElement, () => void]> = [];
    sList.querySelectorAll<HTMLElement>('.srow').forEach(row => {
      const h = onRowEnter(row);
      row.addEventListener('mouseenter', h);
      rowHandlers.push([row, h]);
    });
    cleanups.push(() => rowHandlers.forEach(([row, h]) => row.removeEventListener('mouseenter', h)));

    const onListLeave = () => {
      visible = false;
      sPreview.classList.remove('is-visible');
    };
    const onListMove = (e: MouseEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (cx === 0 && cy === 0) {
        cx = px;
        cy = py;
      }
    };
    sList.addEventListener('mouseleave', onListLeave);
    sList.addEventListener('mousemove', onListMove);
    cleanups.push(() => {
      sList.removeEventListener('mouseleave', onListLeave);
      sList.removeEventListener('mousemove', onListMove);
    });

    safeRaf(() => {
      cx += (px - cx) * 0.18;
      cy += (py - cy) * 0.18;
      sPreview.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%) scale(${visible ? 1 : 0.85})`;
    });
  }

  /* ---------- Custom cursor ---------- */
  const cursor = document.createElement('div');
  cursor.className = 'cursor-dot';
  document.body.appendChild(cursor);
  const cursorRing = document.createElement('div');
  cursorRing.className = 'cursor-ring';
  document.body.appendChild(cursorRing);
  cleanups.push(() => {
    cursor.remove();
    cursorRing.remove();
  });

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let rx = mx;
  let ry = my;

  const onMouseMove = (e: MouseEvent) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.transform = `translate(${mx}px, ${my}px)`;
  };
  document.addEventListener('mousemove', onMouseMove);
  cleanups.push(() => document.removeEventListener('mousemove', onMouseMove));

  safeRaf(() => {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorRing.style.transform = `translate(${rx}px, ${ry}px)`;
  });

  const hoverHandlers: Array<[Element, () => void, () => void]> = [];
  document.querySelectorAll('a, button, [role="button"]').forEach(el => {
    const onEnter = () => cursorRing.classList.add('cursor-ring--hover');
    const onLeave = () => cursorRing.classList.remove('cursor-ring--hover');
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    hoverHandlers.push([el, onEnter, onLeave]);
  });
  cleanups.push(() =>
    hoverHandlers.forEach(([el, onEnter, onLeave]) => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    })
  );

  /* Watch-cursor mode (Showreel / Cases) */
  const watchHandlers: Array<[Element, () => void, () => void]> = [];
  document.querySelectorAll<HTMLElement>('[data-cursor="watch"]').forEach(el => {
    const label = el.dataset.cursorLabel || 'Watch<br>Showreell';
    const onEnter = () => {
      cursorRing.classList.add('cursor-ring--watch');
      cursorRing.innerHTML = label;
      cursor.style.opacity = '0';
    };
    const onLeave = () => {
      cursorRing.classList.remove('cursor-ring--watch');
      cursorRing.innerHTML = '';
      cursor.style.opacity = '';
    };
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    watchHandlers.push([el, onEnter, onLeave]);
  });
  cleanups.push(() =>
    watchHandlers.forEach(([el, onEnter, onLeave]) => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    })
  );

  /* ---------- Refresh after fonts/images load ---------- */
  const onLoadRefresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', onLoadRefresh);
  cleanups.push(() => window.removeEventListener('load', onLoadRefresh));

  /* ---------- Cleanup ---------- */
  return () => {
    cancelled = true;
    rafIds.forEach(id => cancelAnimationFrame(id));
    observers.forEach(io => io.disconnect());
    cleanups.forEach(fn => {
      try {
        fn();
      } catch {
        // ignore
      }
    });
    ScrollTrigger.getAll().forEach(t => t.kill());
    if (lottieAnim) {
      try {
        lottieAnim.destroy();
      } catch {
        // ignore
      }
    }
  };
}
