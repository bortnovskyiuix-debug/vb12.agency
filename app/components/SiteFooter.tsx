import Link from 'next/link';

export default function SiteFooter() {
  return (
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
          <a href="https://t.me/bortnovskyi_v" target="_blank" rel="noopener noreferrer" className="git-title__link">
            <span>Get in touch</span>
            <img src="/landing/icon-arrow-git.svg" alt="" className="git-title__arrow" />
          </a>
        </h2>

        <ul className="social-links">
          <li>
            <a href="https://www.behance.net/vb12_design" target="_blank" rel="noopener noreferrer">
              Behance <img src="/landing/icon-arrow-up-right.svg" alt="" />
            </a>
          </li>
          <li>
            <a href="https://dribbble.com/" target="_blank" rel="noopener noreferrer">
              Dribbble <img src="/landing/icon-arrow-up-right.svg" alt="" />
            </a>
          </li>
          <li>
            <a href="https://instagram.com/bortnovskyi_v" target="_blank" rel="noopener noreferrer">
              Instagram <img src="/landing/icon-arrow-up-right.svg" alt="" />
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
              Linkedin <img src="/landing/icon-arrow-up-right.svg" alt="" />
            </a>
          </li>
        </ul>
      </div>

      <footer className="footer">
        <div className="footer__left">
          <Link href="/" className="logo-card" aria-label="VB12 — Vlad Bortnovskyi Creative Agency">
            <img src="/landing/vb12-logo-card.svg" alt="VB12 — Vlad Bortnovskyi Creative Agency" />
          </Link>
        </div>

        <div className="footer__right">
          <a href="https://t.me/bortnovskyi_v" target="_blank" rel="noopener noreferrer" className="btn-pill">
            <span>Lets Talk</span>
            <span className="btn-pill__icon">
              <img src="/landing/icon-arrow-up-right.svg" alt="" />
            </span>
          </a>
        </div>
      </footer>
    </section>
  );
}
