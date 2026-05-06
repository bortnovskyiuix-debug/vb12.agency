export default function Home() {
  return (
    <>
      {/* ========== PRELOADER ========== */}
      <div className="preloader" aria-hidden="true">
        <div className="preloader__inner" id="lottie-preloader"></div>
      </div>
      <div className="page">
        {/* ========== Top hero gradient ========== */}
        <div className="bg-hero" aria-hidden="true"></div>

        {/* ========== HEADER ========== */}
        <header className="topbar">
          <div className="topbar__left">
            <a
              href="/"
              className="logo-card logo-card--lg"
              aria-label="VB12 — Vlad Bortnovskyi Creative Agency"
            >
              <img
                src="/landing/vb12-logo-card.svg"
                alt="VB12 — Vlad Bortnovskyi Creative Agency"
              />
            </a>
          </div>

          <ul className="social-icons" aria-label="Social media">
            <li>
              <a
                href="https://www.behance.net/vb12_design"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Behance"
              >
                <img src="/landing/icon-be.svg" alt="" />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/bortnovskyi_v"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <img src="/landing/icon-ig.svg" alt="" />
              </a>
            </li>
            <li>
              <a
                href="https://t.me/bortnovskyi_v"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <img src="/landing/icon-tg.svg" alt="" />
              </a>
            </li>
          </ul>

          <a href="tel:0960001212" className="phone-link">
            <img src="/landing/icon-phone.svg" alt="" />
            <span>(096) 000-12-12</span>
          </a>

          <a
            href="https://t.me/bortnovskyi_v"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill"
          >
            <span>Lets Talk</span>
            <span className="btn-pill__icon">
              <img src="/landing/icon-arrow-up-right.svg" alt="" />
            </span>
          </a>
        </header>

        {/* ========== HERO ========== */}
        <section className="hero" data-scroll-section>
          <div className="hero__copy">
            <h1 className="hero__title">
              <span className="reveal-line">
                <span className="hero__title-line">
                  We Create <span className="muted">Smart</span>
                </span>
              </span>
              <span className="reveal-line">
                <span className="hero__title-line">
                  <span className="muted">Solutions</span> for
                </span>
              </span>
              <span className="reveal-line">
                <span className="hero__title-line">
                  Bold Brands
                  <svg className="hero__sparkle" viewBox="0 0 32 32" aria-hidden="true">
                    <path
                      d="M16 0L18.5 13.5L32 16L18.5 18.5L16 32L13.5 18.5L0 16L13.5 13.5L16 0Z"
                      fill="#2365FA"
                    />
                  </svg>
                </span>
              </span>
            </h1>
            <p className="hero__sub reveal-line">
              <span>
                We design and build <strong>digital products</strong> that look clean and{' '}
                <strong>work hard</strong>
              </span>
            </p>

            <a
              href="https://t.me/bortnovskyi_v"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta hero__cta"
            >
              <span className="btn-cta__inner">
                <span className="btn-cta__text">
                  <span className="btn-cta__title">Get in touch</span>
                  <span className="btn-cta__sub">Write In Our Telegram</span>
                </span>
                <span className="btn-cta__icon">
                  <img src="/landing/icon-arrow-up-right.svg" alt="" />
                </span>
              </span>
            </a>
          </div>

          <div className="hero__visual">
            <video
              className="hero__visual-img"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/landing/hero-mockup.png"
            >
              <source src="/landing/hero-mockup.webm" type="video/webm" />
              <source src="/landing/hero-mockup.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Stats inside hero */}
          <div className="hero__stats">
            <div className="stat">
              <p className="stat__num" data-counter="400">
                400+
              </p>
              <p className="stat__label">Create projects</p>
            </div>
            <div className="stat">
              <p className="stat__num" data-counter="70">
                70+
              </p>
              <p className="stat__label">Create projects</p>
            </div>
          </div>

          <a href="#" className="start-now" aria-label="Start now">
            <svg viewBox="0 0 120 120" className="start-now__rotor" aria-hidden="true">
              <defs>
                <path
                  id="start-text-path"
                  d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
                />
              </defs>
              <text fill="#020408" fontSize="11" fontWeight="600" letterSpacing="2">
                <textPath href="#start-text-path">
                  START NOW · START NOW · START NOW ·
                </textPath>
              </text>
            </svg>
            <span className="start-now__arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 4v16m0 0l-7-7m7 7l7-7"
                  stroke="#020408"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </section>

        {/* ========== SHOWREEL ========== */}
        <section className="showreel" data-scroll-section>
          <div className="showreel__frame" data-cursor="watch">
            <video
              className="showreel__video lazy-video"
              muted
              loop
              playsInline
              preload="none"
              data-src="/landing/bg-video.webm"
              data-type="video/webm"
            ></video>
          </div>
        </section>

        {/* ========== FEATURED WORKS ========== */}
        <section className="features" id="works" data-scroll-section>
          <header className="features__head">
            <div className="tag-row">
              <span className="badge-num">
                <img src="/landing/star.svg" alt="" className="badge-num__icon" />
              </span>
              <span className="badge-pill">No NDA</span>
            </div>
            <div className="title-row">
              <h2 className="section-title">
                <span className="muted">Features</span> Works
              </h2>
              <img src="/landing/arrow-feature.svg" alt="" className="section-title__arrow" />
            </div>
          </header>

          <div className="works-grid">
            <a
              className="case case--giftoland case--wide reveal-card"
              href="https://www.behance.net/gallery/243358395/GiftoLand-Plinko-Game-Telegram-Mini-App-NFT"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="watch"
              data-cursor-label="Watch<br>Case"
            >
              <video
                className="case__video lazy-video"
                muted
                loop
                playsInline
                preload="none"
                data-src="/landing/case-giftoland.webm"
                data-type="video/webm"
              ></video>
              <div className="case__overlay"></div>
              <div className="case__body">
                <div className="case__head">
                  <h3 className="case__title">
                    Giftoland - Next-Gen
                    <br />
                    Telegram Mini App
                  </h3>
                  <ul className="tag-list">
                    <li>UX/UI Design</li>
                    <li>Branding</li>
                    <li>Animation</li>
                  </ul>
                </div>
              </div>
            </a>

            <article className="case case--rakeless reveal-card">
              <video
                className="case__video lazy-video"
                muted
                loop
                playsInline
                preload="none"
                data-src="/landing/case-rakeless.webm"
                data-type="video/webm"
              ></video>
              <div className="case__overlay"></div>
              <div className="case__body">
                <div className="case__head">
                  <h3 className="case__title">
                    RakeLess - Online
                    <br />
                    Poker Room
                  </h3>
                  <ul className="tag-list">
                    <li>Product Design</li>
                    <li>Branding</li>
                    <li>Motion Design</li>
                    <li>3D</li>
                  </ul>
                </div>
                <div className="case__cta">
                  <span className="case__soon">Coming soon</span>
                </div>
              </div>
            </article>

            <article className="case case--hoolies reveal-card">
              <video
                className="case__video lazy-video"
                muted
                loop
                playsInline
                preload="none"
                data-src="/landing/case-hoolies.webm"
                data-type="video/webm"
              ></video>
              <div className="case__overlay"></div>
              <div className="case__body">
                <div className="case__head">
                  <h3 className="case__title">
                    Hoolies - AI Shilling
                    <br />
                    Agents Service
                  </h3>
                  <ul className="tag-list">
                    <li>Product Design</li>
                    <li>Branding</li>
                    <li>Animation</li>
                  </ul>
                </div>
                <div className="case__cta">
                  <span className="case__soon">Coming soon</span>
                </div>
              </div>
            </article>

            <a
              className="case case--pokerhouse case--wide reveal-card"
              href="https://www.behance.net/gallery/243228045/PokerHouse-Poker-Room-Online-Casino-Betting"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="watch"
              data-cursor-label="Watch<br>Case"
            >
              <video
                className="case__video lazy-video"
                muted
                loop
                playsInline
                preload="none"
                data-src="/landing/case-pokerhouse.mp4"
                data-type="video/mp4"
              ></video>
              <div className="case__overlay"></div>
              <div className="case__body">
                <div className="case__head">
                  <h3 className="case__title">
                    PokerHouse - Online
                    <br />
                    Poker Room
                  </h3>
                  <ul className="tag-list">
                    <li>Product Design</li>
                    <li>Branding</li>
                    <li>Motion Design</li>
                    <li>3D</li>
                  </ul>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* ========== SERVICES ========== */}
        <section className="services" id="services" data-scroll-section>
          <header className="services__head">
            <div className="services__head-left">
              <div className="tag-row">
                <span className="badge-num">
                  <img src="/landing/star.svg" alt="" className="badge-num__icon" />
                </span>
                <span className="badge-pill">Our Service</span>
              </div>
              <a href="#services" className="title-row">
                <h2 className="section-title">Our Services</h2>
                <img
                  src="/landing/arrow-section.svg"
                  alt=""
                  className="section-title__arrow"
                />
              </a>
            </div>
            <div className="services__head-right">
              <svg
                className="services__globe"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="40" cy="40" r="38" stroke="#2365FA" strokeWidth="1.2" />
                <ellipse cx="40" cy="40" rx="38" ry="14" stroke="#2365FA" strokeWidth="1.2" />
                <ellipse cx="40" cy="40" rx="14" ry="38" stroke="#2365FA" strokeWidth="1.2" />
                <line x1="2" y1="40" x2="78" y2="40" stroke="#2365FA" strokeWidth="1.2" />
                <line x1="40" y1="2" x2="40" y2="78" stroke="#2365FA" strokeWidth="1.2" />
              </svg>
              <p className="services__lead">
                Digital Solutions That Are
                <br />
                Transforming The Industry
              </p>
            </div>
          </header>

          <ul className="services__list" id="services-list">
            <li
              className="srow srow--active"
              data-preview-video="/landing/service-webdesign.webm"
            >
              <h3 className="srow__name">Web &amp; App Design</h3>
              <span className="srow__dot" aria-hidden="true"></span>
              <p className="srow__copy">
                High-End Digital Experiences Crafted To Elevate Perception, Simplify Decisions,
                And Maximize Conversion.
              </p>
              <ul className="srow__chips">
                <li>UX/UI Design</li>
                <li>Product Design</li>
                <li>Brand Identity</li>
                <li>Web Design</li>
              </ul>
            </li>

            <li className="srow" data-preview="/landing/laptop-3d.png">
              <h3 className="srow__name">Development</h3>
              <span className="srow__dot" aria-hidden="true"></span>
              <p className="srow__copy">
                We Can Craft Practically Anything, From Websites On CMS To Custom Software
                Products
              </p>
              <ul className="srow__chips">
                <li>Web Development</li>
                <li>Mobile Development</li>
                <li>Software Development</li>
              </ul>
            </li>

            <li className="srow" data-preview-video="/landing/service-video.mp4">
              <h3 className="srow__name">Custom Animation</h3>
              <span className="srow__dot" aria-hidden="true"></span>
              <p className="srow__copy">
                Captivating Motion That Brings Ideas To Life And Turns Complex Concepts Into
                Engaging Stories.
              </p>
              <ul className="srow__chips">
                <li>UI Animation</li>
                <li>Motion Design</li>
                <li>Lottie</li>
                <li>After Effects</li>
              </ul>
            </li>

            <li className="srow" data-preview="/landing/cube-3d.png">
              <h3 className="srow__name">2D/3D Graphics</h3>
              <span className="srow__dot" aria-hidden="true"></span>
              <p className="srow__copy">
                Striking Visuals Designed To Strengthen Brand Recognition And Leave A Lasting
                Impression.
              </p>
              <ul className="srow__chips">
                <li>Illustration</li>
                <li>3D Modeling</li>
                <li>Visual Identity</li>
                <li>Graphic Design</li>
              </ul>
            </li>

            <li className="srow" data-preview="/landing/bolt-3d-2.png">
              <h3 className="srow__name">Pitchdeck</h3>
              <span className="srow__dot" aria-hidden="true"></span>
              <p className="srow__copy">
                Persuasive Presentations Structured To Communicate Value And Close Deals With
                Confidence.
              </p>
              <ul className="srow__chips">
                <li>Pitch Decks</li>
                <li>Investor Decks</li>
                <li>Presentations</li>
                <li>Startup Decks</li>
              </ul>
            </li>
          </ul>

          <div className="srow-preview" id="srow-preview" aria-hidden="true">
            <img className="srow-preview__img" alt="" />
            <video className="srow-preview__video" muted loop playsInline></video>
          </div>
        </section>

        {/* ========== TEAM ========== */}
        <section className="team" id="team" data-scroll-section>
          <header className="team__head">
            <div className="team__head-left">
              <div className="tag-row">
                <span className="badge-num">
                  <img src="/landing/star.svg" alt="" className="badge-num__icon" />
                </span>
                <span className="badge-pill">Our Team</span>
              </div>
              <div className="title-row">
                <h2 className="section-title">Our Team</h2>
                <img
                  src="/landing/arrow-section.svg"
                  alt=""
                  className="section-title__arrow"
                />
              </div>
            </div>
            <p className="team__lead">
              Experience The Expertise Of Our Professionals As They Bring Your Ideas To
              Fruition.
            </p>
          </header>

          <div className="team__grid">
            <article className="team-card">
              <img
                src="/landing/team-shape.svg"
                alt=""
                className="team-card__shape"
                loading="lazy"
                decoding="async"
              />
              <div className="team-card__photo team-card__photo--1" aria-hidden="true"></div>
              <div className="team-card__body">
                <h3 className="team-card__name">Vlad Bortnovskyi</h3>
                <div className="team-card__roles">
                  <span className="team-card__role">CEO</span>
                  <span className="team-card__role">Art Director</span>
                </div>
              </div>
            </article>

            <article className="team-card">
              <img
                src="/landing/team-shape.svg"
                alt=""
                className="team-card__shape"
                loading="lazy"
                decoding="async"
              />
              <div className="team-card__photo team-card__photo--2" aria-hidden="true"></div>
              <div className="team-card__body">
                <h3 className="team-card__name">Daria Ludan</h3>
                <span className="team-card__role">UX/UI Designer</span>
              </div>
            </article>

            <article className="team-card">
              <img
                src="/landing/team-shape.svg"
                alt=""
                className="team-card__shape"
                loading="lazy"
                decoding="async"
              />
              <div className="team-card__photo team-card__photo--3" aria-hidden="true"></div>
              <div className="team-card__body">
                <h3 className="team-card__name">Yulia Night</h3>
                <span className="team-card__role">Product Designer</span>
              </div>
            </article>

            <article className="team-card">
              <img
                src="/landing/team-shape.svg"
                alt=""
                className="team-card__shape"
                loading="lazy"
                decoding="async"
              />
              <div className="team-card__photo team-card__photo--4" aria-hidden="true"></div>
              <div className="team-card__body">
                <h3 className="team-card__name">Konstantin Shumov</h3>
                <span className="team-card__role">Motion Designer</span>
              </div>
            </article>
          </div>
        </section>

        {/* ========== GET IN TOUCH FOOTER ========== */}
        <section className="get-in-touch" id="contact" data-scroll-section>
          <div className="bg-soft" aria-hidden="true"></div>

          <img
            src="/landing/atom-3d.png"
            alt=""
            className="get-in-touch__atom"
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />

          <div className="get-in-touch__top">
            <h2 className="git-title">
              <a
                href="https://t.me/bortnovskyi_v"
                target="_blank"
                rel="noopener noreferrer"
                className="git-title__link"
              >
                <span>Get in touch</span>
                <img src="/landing/icon-arrow-git.svg" alt="" className="git-title__arrow" />
              </a>
            </h2>

            <ul className="social-links">
              <li>
                <a
                  href="https://www.behance.net/vb12_design"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Behance <img src="/landing/icon-arrow-up-right.svg" alt="" />
                </a>
              </li>
              <li>
                <a
                  href="https://dribbble.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dribbble <img src="/landing/icon-arrow-up-right.svg" alt="" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/bortnovskyi_v"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram <img src="/landing/icon-arrow-up-right.svg" alt="" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linkedin <img src="/landing/icon-arrow-up-right.svg" alt="" />
                </a>
              </li>
            </ul>
          </div>

          <footer className="footer">
            <div className="footer__left">
              <a
                href="/"
                className="logo-card"
                aria-label="VB12 — Vlad Bortnovskyi Creative Agency"
              >
                <img
                  src="/landing/vb12-logo-card.svg"
                  alt="VB12 — Vlad Bortnovskyi Creative Agency"
                />
              </a>
            </div>

            <div className="footer__right">
              <button type="button" className="lang-select" aria-label="Language">
                <span>Eng</span>
                <img
                  src="/landing/icon-angle-left.svg"
                  alt=""
                  className="lang-select__chevron"
                />
              </button>

              <a
                href="https://t.me/bortnovskyi_v"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill"
              >
                <span>Lets Talk</span>
                <span className="btn-pill__icon">
                  <img src="/landing/icon-arrow-up-right.svg" alt="" />
                </span>
              </a>
            </div>
          </footer>
        </section>
      </div>
    </>
  );
}
