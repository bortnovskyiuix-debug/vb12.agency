import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="topbar">
      <div className="topbar__left">
        <Link href="/" className="logo-card logo-card--lg" aria-label="VB12 — Vlad Bortnovskyi Creative Agency">
          <img src="/landing/vb12-logo-card.svg" alt="VB12 — Vlad Bortnovskyi Creative Agency" />
        </Link>
      </div>

      <ul className="social-icons" aria-label="Social media">
        <li>
          <a href="https://www.behance.net/vb12_design" target="_blank" rel="noopener noreferrer" aria-label="Behance">
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
          <a href="https://t.me/bortnovskyi_v" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
            <img src="/landing/icon-tg.svg" alt="" />
          </a>
        </li>
      </ul>

      <a href="tel:0960001212" className="phone-link">
        <img src="/landing/icon-phone.svg" alt="" />
        <span>(096) 000-12-12</span>
      </a>

      <a href="https://t.me/bortnovskyi_v" target="_blank" rel="noopener noreferrer" className="btn-pill">
        <span>Lets Talk</span>
        <span className="btn-pill__icon">
          <img src="/landing/icon-arrow-up-right.svg" alt="" />
        </span>
      </a>
    </header>
  );
}
