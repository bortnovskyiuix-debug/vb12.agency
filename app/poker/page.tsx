import type { Metadata } from 'next';

import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import './poker.css';

export const metadata: Metadata = {
  title: 'Poker Demos — VB12',
  description:
    'Playable poker product demos by VB12: white-label poker platform and custom poker room design. Lobby, tables, tournaments and motion — designed and built end-to-end.',
  alternates: { canonical: '/poker' },
  openGraph: {
    type: 'website',
    title: 'Poker Demos — VB12',
    description: 'Open a live poker demo or book a private walkthrough with VB12.',
    siteName: 'VB12',
    images: [{ url: '/cover.png', width: 1200, height: 630, alt: 'VB12 Poker Demos' }],
  },
};

const TELEGRAM = 'https://t.me/bortnovskyi_v';
const TWELVE_BET_DEMO = '/demos/twelve-bet/index.html';
const TWELVE_BET_MOTION = '/demos/twelve-bet/brand/12bet/motion/02-born-to-win';

function ArrowIcon() {
  return (
    <span className="demo-btn__icon">
      <img src="/landing/icon-arrow-up-right.svg" alt="" />
    </span>
  );
}

export default function PokerDemos() {
  return (
    <>
      <div className="preloader" aria-hidden="true">
        <div className="preloader__inner" id="lottie-preloader"></div>
      </div>
      <div className="bg-hero" aria-hidden="true"></div>
      <div className="page">
        <SiteHeader />

        <section className="features demos-intro" id="poker-demos" data-scroll-section>
          <header className="features__head">
            <div className="tag-row">
              <span className="badge-num">
                <img src="/landing/star.svg" alt="" className="badge-num__icon" />
              </span>
              <span className="badge-pill">Playable</span>
            </div>
            <div className="title-row">
              <h1 className="section-title">
                <span className="muted">Poker</span> Demos
              </h1>
              <img src="/landing/arrow-feature.svg" alt="" className="section-title__arrow" />
            </div>
            <p className="lead-copy">
              Poker products we design and build end-to-end — lobby, tables, tournaments and motion. Open the live demo
              in your browser or ask us for a private walkthrough.
            </p>
          </header>

          <div className="works-grid works-grid--demos">
            {/* ---------- Twelve Bet: live demo hosted on this site ---------- */}
            <article className="case case--twelvebet reveal-card">
              <video
                className="case__video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={`${TWELVE_BET_MOTION}.jpg`}
              >
                <source src={`${TWELVE_BET_MOTION}.webm`} type="video/webm" />
                <source src={`${TWELVE_BET_MOTION}.mp4`} type="video/mp4" />
              </video>
              <div className="case__overlay case__overlay--demo"></div>
              <div className="case__body">
                <div className="case__head">
                  <span className="case__status">Live demo</span>
                  <h2 className="case__title">
                    Twelve Bet — White-label
                    <br />
                    Poker Platform
                  </h2>
                  <ul className="tag-list">
                    <li>White-label</li>
                    <li>Product Design</li>
                    <li>Frontend</li>
                  </ul>
                </div>
                <div className="case__cta">
                  <a className="demo-btn demo-btn--primary" href={TWELVE_BET_DEMO} target="_blank" rel="noopener">
                    <span>Play demo</span>
                    <ArrowIcon />
                  </a>
                </div>
              </div>
            </article>

            {/* ---------- PokerHouse: demo on request ---------- */}
            <article className="case case--pokerhouse reveal-card">
              <video
                className="case__video lazy-video"
                muted
                loop
                playsInline
                preload="none"
                data-src="/landing/case-pokerhouse.mp4"
                data-type="video/mp4"
              ></video>
              <div className="case__overlay case__overlay--demo"></div>
              <div className="case__body">
                <div className="case__head">
                  <span className="case__status case__status--request">Demo on request</span>
                  <h2 className="case__title">
                    PokerHouse — Online
                    <br />
                    Poker Room
                  </h2>
                  <ul className="tag-list">
                    <li>Product Design</li>
                    <li>Motion Design</li>
                    <li>3D</li>
                  </ul>
                </div>
                <div className="case__cta">
                  <a className="demo-btn demo-btn--primary" href={TELEGRAM} target="_blank" rel="noopener noreferrer">
                    <span>Request demo</span>
                    <ArrowIcon />
                  </a>
                  <a
                    className="demo-btn demo-btn--ghost"
                    href="https://www.behance.net/gallery/243228045/PokerHouse-Poker-Room-Online-Casino-Betting"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>View case</span>
                    <ArrowIcon />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}
