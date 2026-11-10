import React, { useState } from 'react';
import logo from "../../assets/SriKshetra Residency 03.png"; // adjust path if your assets folder differs
import "./Footer.css";

/* ---------- Footer data (same 10 sections as the navbar) ---------- */
const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Rooms & Suites', href: '/rooms' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

const USEFUL_LINKS = [
  { label: 'Offer', href: '/offer' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Our Happy Clients', href: '/clients' },
  { label: 'FAQ', href: '/faq' },
  { label: 'News', href: '/news' },
];

const CONTACTS = [
  {
    key: 'phone',
    label: 'Call us anytime',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
    icon: 'phone',
  },
  {
    key: 'mail',
    label: 'Send us an email',
    value: 'info@srikshetraresidency.com',
    href: 'mailto:info@srikshetraresidency.com',
    icon: 'mail',
  },
  {
    key: 'address',
    label: 'Address',
    value: 'Near Jagannath Temple, Puri, Odisha',
    href: '#',
    icon: 'pin',
  },
];

const RECENT_POSTS = [
  { title: 'Rath Yatra stay guide: book early and plan your darshan', date: '08 August, 2026', href: '/news' },
  { title: 'A sunrise walk on Puri Beach before temple darshan', date: '21 July, 2026', href: '/news' },
];

const SOCIALS = [
  { key: 'facebook', label: 'Facebook', href: '#' },
  { key: 'instagram', label: 'Instagram', href: '#' },
  { key: 'youtube', label: 'YouTube', href: '#' },
  { key: 'whatsapp', label: 'WhatsApp', href: '#' },
];

/* ---------- Icons ---------- */
const Icon = ({ name }) => {
  const common = {
    viewBox: '0 0 24 24',
    width: 22,
    height: 22,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };
  switch (name) {
    case 'phone':
      return (
        <svg {...common}>
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      );
    case 'mail':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="M3.5 7l8.5 6 8.5-6" />
        </svg>
      );
    case 'pin':
      return (
        <svg {...common}>
          <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
      );
    case 'send':
      return (
        <svg {...common} width={16} height={16}>
          <path d="M21 3L10 14M21 3l-7 18-4-7-7-4 18-7z" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...common} width={14} height={14}>
          <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
          <path d="M8 3v4M16 3v4M3.5 10h17" />
        </svg>
      );
    case 'arrow':
      return (
        <svg {...common} width={14} height={14} strokeWidth={2.2}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case 'up':
      return (
        <svg {...common} width={20} height={20} strokeWidth={2.2}>
          <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
      );
    case 'facebook':
      return (
        <svg {...common} width={18} height={18}>
          <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg {...common} width={18} height={18}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" />
        </svg>
      );
    case 'youtube':
      return (
        <svg {...common} width={18} height={18}>
          <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
          <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5z" fill="currentColor" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg {...common} width={18} height={18}>
          <path d="M4 20l1.2-4A8 8 0 1 1 8.2 19L4 20z" />
          <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .7a3 3 0 0 1-1.7-1.7l.7-1-1-2L9 9.5z" />
        </svg>
      );
    default:
      return null;
  }
};

/* ---------- Section: contact strip ---------- */
const FooterContactStrip = () => (
  <div className="footer__contact" role="list">
    {CONTACTS.map((c) => (
      <a key={c.key} href={c.href} className="footer__contact-item" role="listitem">
        <span className="footer__contact-icon">
          <Icon name={c.icon} />
        </span>
        <span className="footer__contact-text">
          <span className="footer__contact-label">{c.label}</span>
          <span className="footer__contact-value">{c.value}</span>
        </span>
      </a>
    ))}
  </div>
);

/* ---------- Section: brand + subscribe ---------- */
const FooterBrand = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | done | error

  const onSubmit = (e) => {
    e.preventDefault();
    const ok = /^\S+@\S+\.\S+$/.test(email);
    if (!ok) {
      setStatus('error');
      return;
    }
    // TODO: connect to your newsletter API here
    setStatus('done');
    setEmail('');
  };

  return (
    <div className="footer__brand">
      <a href="/" className="footer__logo" aria-label="SriKshetra Residency, Puri - Home">
        <img src={logo} alt="SriKshetra Residency Puri" className="footer__logo-img" draggable="false" />
      </a>

      <p className="footer__about">
        Pure-veg stay just minutes from Shree Jagannath Temple. Clean rooms, warm service and a calm place to
        return to after darshan.
      </p>

      <form className="footer__subscribe" onSubmit={onSubmit} noValidate>
        <label htmlFor="footer-email" className="footer__sr-only">
          Email address
        </label>
        <input
          id="footer-email"
          type="email"
          className="footer__subscribe-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== 'idle') setStatus('idle');
          }}
          aria-invalid={status === 'error'}
        />
        <button type="submit" className="footer__subscribe-btn">
          <span>Subscribe</span>
          <Icon name="send" />
        </button>
      </form>
      <p className={`footer__subscribe-note footer__subscribe-note--${status}`} role="status">
        {status === 'done' && 'Thank you. You are subscribed to our updates.'}
        {status === 'error' && 'Enter a valid email address, for example name@email.com.'}
      </p>

      <ul className="footer__socials">
        {SOCIALS.map((s) => (
          <li key={s.key}>
            <a href={s.href} className="footer__social" aria-label={s.label}>
              <Icon name={s.key} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ---------- Section: link column ---------- */
const FooterLinks = ({ title, links }) => (
  <nav className="footer__col" aria-label={title}>
    <h3 className="footer__title">{title}</h3>
    <ul className="footer__list">
      {links.map((l) => (
        <li key={l.label}>
          <a href={l.href} className="footer__link">
            <Icon name="arrow" />
            <span>{l.label}</span>
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

/* ---------- Section: recent posts ---------- */
const FooterPosts = () => (
  <div className="footer__col footer__col--posts">
    <h3 className="footer__title">Recent Post</h3>
    <ul className="footer__posts">
      {RECENT_POSTS.map((p, i) => (
        <li key={p.title}>
          <a href={p.href} className="footer__post">
            <span className={`footer__post-thumb footer__post-thumb--${i + 1}`} aria-hidden="true" />
            <span className="footer__post-body">
              <span className="footer__post-date">
                <Icon name="calendar" />
                {p.date}
              </span>
              <span className="footer__post-title">{p.title}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

/* ---------- Section: bottom bar ---------- */
const FooterBottom = () => (
  <div className="footer__bottom">
    <p className="footer__copy">
      &copy; {new Date().getFullYear()} SriKshetra Residency, Puri. All rights reserved.
    </p>
    <ul className="footer__legal">
      <li><a href="/privacy" className="footer__legal-link">Privacy Policy</a></li>
      <li><a href="/terms" className="footer__legal-link">Terms &amp; Conditions</a></li>
    </ul>
  </div>
);

/* ---------- Main component ---------- */
const Footer = () => {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer__bg" aria-hidden="true">
        <span className="footer__orb footer__orb--teal" />
        <span className="footer__orb footer__orb--gold" />
        <span className="footer__grid" />
      </div>

      <div className="footer__container">
        <FooterContactStrip />

        <div className="footer__main">
          <FooterBrand />
          <FooterLinks title="Quick Links" links={QUICK_LINKS} />
          <FooterLinks title="Useful Links" links={USEFUL_LINKS} />
          <FooterPosts />
        </div>
      </div>

      <div className="footer__divider" />

      <div className="footer__container">
        <FooterBottom />
      </div>

      <button type="button" className="footer__top" onClick={toTop} aria-label="Back to top">
        <Icon name="up" />
      </button>
    </footer>
  );
};

export default Footer;