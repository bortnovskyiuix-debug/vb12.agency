/* =========================================================
   VB12 — Lusion-style scroll
   - Lenis smooth scroll (inertia)
   - GSAP ScrollTrigger for reveals, parallax, scrub
   ========================================================= */

(function () {
  /* ---------- Preloader: play Lottie animation in full, then dismiss ---------- */
  const initPreloader = () => {
    const host = document.getElementById('lottie-preloader');
    let done = false;
    let lottieAttached = false;

    const finish = () => {
      if (done) return;
      done = true;
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-loaded');
      if (typeof window.__runIntro === 'function') window.__runIntro();
      if (typeof ScrollTrigger !== 'undefined') {
        setTimeout(() => ScrollTrigger.refresh(), 50);
      }
    };

    const tryLottie = () => {
      if (!host || typeof lottie === 'undefined') return false;
      try {
        const anim = lottie.loadAnimation({
          container: host,
          renderer: 'svg',
          loop: false,
          autoplay: true,
          path: '/landing/preloader.json',
        });
        lottieAttached = true;
        anim.addEventListener('complete', finish);
        anim.addEventListener('data_failed', finish);
        return true;
      } catch (e) { return false; }
    };

    // Try lottie immediately, retry until lottie lib is loaded (max 30 tries × 100ms = 3s)
    let tries = 0;
    const attempt = () => {
      if (tryLottie()) return;
      if (++tries < 30) setTimeout(attempt, 100);
      else {
        // Lottie failed entirely — fallback dismiss
        const dismiss = () => setTimeout(finish, 200);
        if (document.readyState === 'complete' || document.readyState === 'interactive') dismiss();
        else window.addEventListener('DOMContentLoaded', dismiss, { once: true });
      }
    };
    attempt();

    // Safety cap: if Lottie attached but never fires "complete" (broken JSON, etc.)
    setTimeout(() => { if (lottieAttached && !done) finish(); }, 10000);
  };

  initPreloader();

  /* ---------- Lazy videos: load + play when near viewport ---------- */
  const initLazyVideos = () => {
    const videos = document.querySelectorAll('video.lazy-video');
    if (!videos.length) return;

    const hydrate = (video) => {
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
      const play = () => video.play().catch(() => {});
      if (video.readyState >= 2) play();
      else video.addEventListener('loadeddata', play, { once: true });
    };

    if (!('IntersectionObserver' in window)) {
      videos.forEach(hydrate);
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          hydrate(e.target);
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '300px 0px' });

    videos.forEach((v) => io.observe(v));
  };

  if (document.readyState !== 'loading') initLazyVideos();
  else document.addEventListener('DOMContentLoaded', initLazyVideos, { once: true });

  const start = () => {
    if (typeof Lenis === 'undefined' || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      // libraries still loading
      return setTimeout(start, 30);
    }

    gsap.registerPlugin(ScrollTrigger);

    /* ---------- Lenis smooth scroll ---------- */
    const lenis = new Lenis({
      duration: 1.25,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    /* ---------- INTRO: page-load animation (runs after preloader) ---------- */
    // Set initial states so nothing flashes before intro
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

    window.__runIntro = () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      // Topbar items fade-in from top
      tl.to(topbarItems, { y: 0, opacity: 1, duration: 0.8, stagger: 0.06 }, 0.05);
      // Hero visual slides in from right
      if (heroVisual) tl.to(heroVisual, { x: 0, opacity: 1, duration: 1.1 }, 0.15);
      // Bolt pops in
      if (heroBolt) tl.to(heroBolt, { scale: 1, opacity: 1, rotation: 0, duration: 0.9, ease: 'back.out(1.4)' }, 0.4);
      // Hero title line by line
      tl.to(heroLines, { yPercent: 0, duration: 1.1, stagger: 0.08 }, 0.2);
      // CTA + stats + START NOW
      const ctaTargets = [heroCta, heroStats, startNow].filter(Boolean);
      if (ctaTargets.length) tl.to(ctaTargets, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 }, 0.6);
    };

    // Auto-run intro if preloader was already dismissed (or fails)
    if (document.body.classList.contains('is-loaded')) {
      window.__runIntro();
    }

    /* ---------- HERO: no scroll-driven movement on visual / title (keeps laptop in sync with showreel) ---------- */

    /* ---------- STATS: count-up ---------- */
    document.querySelectorAll('[data-counter]').forEach((el) => {
      const target = parseInt(el.dataset.counter, 10);
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
      if (showreelCube) tl.fromTo(showreelCube,
        { scale: 0.85, rotate: 0 },
        { scale: 1.05, rotate: 18, ease: 'none' }, 0);
      if (showreelBoltLeft) tl.fromTo(showreelBoltLeft,
        { x: -80, rotate: -20, opacity: 0.5 },
        { x: 0, rotate: -8, opacity: 1, ease: 'none' }, 0);
      if (showreelBoltRight) tl.fromTo(showreelBoltRight,
        { x: 80, rotate: 20, opacity: 0.5 },
        { x: 0, rotate: 6, opacity: 1, ease: 'none' }, 0);
      if (showreelPlay) tl.fromTo(showreelPlay,
        { scale: 0.6 },
        { scale: 1, ease: 'power2.out' }, 0);
    }

    /* ---------- FLOATING ELEMENTS (idle bobbing) ---------- */
    document.querySelectorAll('[data-float]').forEach((el, i) => {
      gsap.to(el, {
        y: '+=14',
        rotation: '+=2',
        duration: 3 + (i % 4) * 0.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });

    /* ---------- PARALLAX (data-parallax="0.2") ---------- */
    document.querySelectorAll('[data-parallax]').forEach((el) => {
      const speed = parseFloat(el.dataset.parallax);
      gsap.fromTo(el,
        { y: 100 * speed },
        {
          y: -100 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
    });

    /* ---------- CASE CARDS (lusion-style scale-in) ---------- */
    gsap.utils.toArray('.reveal-card').forEach((card) => {
      gsap.fromTo(card,
        { y: 80, scale: 0.94, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: 'expo.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
        });
    });

    /* ---------- SECTION TITLES (uppercase huge) reveal — split into words ---------- */
    gsap.utils.toArray('.section-title').forEach((title) => {
      // Split into words for staggered reveal
      const text = title.innerHTML;
      // Wrap each word in a span (preserve nested spans like .muted, .white-on-dark)
      const wordsHTML = text.replace(/(<span[^>]*>[^<]*<\/span>|\S+)/g, (m) => `<span class="word"><span class="word__inner">${m}</span></span>`);
      title.innerHTML = wordsHTML;
      const innerWords = title.querySelectorAll('.word__inner');
      gsap.fromTo(innerWords,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: {
            trigger: title,
            start: 'top 88%',
          },
        });
    });

    /* ---------- LEAD COPY reveal (descriptive paragraphs) ---------- */
    gsap.utils.toArray('.lead-copy, .hero__sub, .problem__title, .srow__name, .srow__copy, .contact-teaser__pill p, .agency-meta, .stat__num, .stat__label, .badge-pill, .case__title, .case__corner').forEach((el) => {
      gsap.fromTo(el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
          },
        });
    });

    /* ---------- TAG LISTS / CHIP LISTS stagger reveal ---------- */
    gsap.utils.toArray('.tag-list, .chip-list, .srow__chips').forEach((list) => {
      const items = list.querySelectorAll('li');
      gsap.fromTo(items,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          stagger: 0.04,
          scrollTrigger: {
            trigger: list,
            start: 'top 92%',
          },
        });
    });

    /* ---------- Service rows: stagger fade in ---------- */
    gsap.utils.toArray('.srow').forEach((row, i) => {
      gsap.fromTo(row,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'expo.out',
          delay: i * 0.05,
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
          },
        });
    });

    /* ---------- Service rows: hover preview that follows cursor ---------- */
    const sList = document.getElementById('services-list');
    const sPreview = document.getElementById('srow-preview');
    if (sList && sPreview) {
      const sImg = sPreview.querySelector('.srow-preview__img');
      const sVid = sPreview.querySelector('.srow-preview__video');

      let px = 0, py = 0;   // target pos (cursor)
      let cx = 0, cy = 0;   // current pos (lerped)
      let visible = false;
      let currentSrc = null;

      const setPreview = (row) => {
        const img = row.dataset.preview;
        const video = row.dataset.previewVideo;
        const src = video || img;
        if (src === currentSrc) return;
        currentSrc = src;

        if (video) {
          sVid.src = video;
          sVid.play().catch(() => {});
          sPreview.classList.remove('is-image');
          sPreview.classList.add('is-video');
        } else if (img) {
          sImg.src = img;
          sPreview.classList.remove('is-video');
          sPreview.classList.add('is-image');
          // pause previously playing video to save resources
          try { sVid.pause(); sVid.removeAttribute('src'); sVid.load(); } catch (e) {}
        }
      };

      const rows = sList.querySelectorAll('.srow');
      rows.forEach((row) => {
        row.addEventListener('mouseenter', () => {
          setPreview(row);
          if (!visible) {
            visible = true;
            sPreview.classList.add('is-visible');
          }
        });
      });

      sList.addEventListener('mouseleave', () => {
        visible = false;
        sPreview.classList.remove('is-visible');
      });

      sList.addEventListener('mousemove', (e) => {
        px = e.clientX;
        py = e.clientY;
        if (cx === 0 && cy === 0) { cx = px; cy = py; }
      });

      const tickPreview = () => {
        cx += (px - cx) * 0.18;
        cy += (py - cy) * 0.18;
        sPreview.style.transform =
          `translate(${cx}px, ${cy}px) translate(-50%, -50%) scale(${visible ? 1 : 0.85})`;
        requestAnimationFrame(tickPreview);
      };
      tickPreview();
    }

    /* ---------- Custom cursor (subtle) ---------- */
    const cursor = document.createElement('div');
    cursor.className = 'cursor-dot';
    document.body.appendChild(cursor);
    const cursorRing = document.createElement('div');
    cursorRing.className = 'cursor-ring';
    document.body.appendChild(cursorRing);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.transform = `translate(${mx}px, ${my}px)`;
    });

    function animateRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      cursorRing.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-ring--hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-ring--hover'));
    });

    /* Watch-cursor mode — black disc with custom label (Showreel / Cases / etc.) */
    const watchTargets = document.querySelectorAll('[data-cursor="watch"]');
    window.__watchAttached = watchTargets.length;
    watchTargets.forEach((el) => {
      const label = el.dataset.cursorLabel || 'Watch<br>Showreell';
      el.addEventListener('mouseenter', () => {
        cursorRing.classList.add('cursor-ring--watch');
        cursorRing.innerHTML = label;
        cursor.style.opacity = '0';
      });
      el.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('cursor-ring--watch');
        cursorRing.innerHTML = '';
        cursor.style.opacity = '';
      });
    });

    /* ---------- Refresh after fonts/images load ---------- */
    window.addEventListener('load', () => ScrollTrigger.refresh());
  };

  document.documentElement.classList.remove('no-js');
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
