import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../../assets/SriKshetra Residency 03.png"; // adjust path if your assets folder differs
import "./Navbar.css";

/* ---------- Menu data ---------- */
const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Rooms & Suites', href: '/rooms' },
  { label: 'Services', href: '/services' },
  { label: 'Offer', href: '/offer' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Our Happy Clients', href: '/clients' },
  { label: 'FAQ', href: '/faq' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
];

const DESKTOP_MIN = 1280;

/* ---------- Icons ---------- */
const ArrowIcon = () => (
  <svg className="navbar__cta-arrow" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const Navbar = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navRef = useRef(null);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  /* ---------- On every page change: close menu + go to top ---------- */
  useEffect(() => {
    setDrawerOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  /* ---------- Scroll: shrink + progress line ---------- */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(y / max, 1) : 0;
      if (navRef.current) navRef.current.style.setProperty('--progress', progress);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  /* ---------- Lock body scroll when drawer is open ---------- */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  /* ---------- Escape key + resize ---------- */
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setDrawerOpen(false);
    const onResize = () => {
      if (window.innerWidth >= DESKTOP_MIN) setDrawerOpen(false);
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${drawerOpen ? 'navbar--drawer-open' : ''}`}
      >
        <span className="navbar__progress" aria-hidden="true" />

        <div className="navbar__container">
          {/* ===== Logo ===== */}
          <Link to="/" className="navbar__brand" aria-label="SriKshetra Residency, Puri - Home">
            <span className="navbar__logo">
              <img
                src={logo}
                alt="SriKshetra Residency Puri"
                className="navbar__logo-img"
                draggable="false"
              />
            </span>
          </Link>

          {/* ===== Desktop menu ===== */}
          <nav className="navbar__nav" aria-label="Primary">
            <ul className="navbar__menu">
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className="navbar__item">
                  <Link
                    to={item.href}
                    className={`navbar__link ${isActive(item.href) ? 'navbar__link--active' : ''}`}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ===== Right actions ===== */}
          <div className="navbar__actions">
            <Link to="/booking" className="navbar__cta">
              <span>Book Your Stay</span>
              <ArrowIcon />
            </Link>

            <button
              type="button"
              className={`navbar__toggle ${drawerOpen ? 'navbar__toggle--active' : ''}`}
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen((v) => !v)}
            >
              <span className="navbar__toggle-line" />
              <span className="navbar__toggle-line" />
              <span className="navbar__toggle-line" />
            </button>
          </div>
        </div>
      </header>

      {/* ===== Mobile overlay ===== */}
      <div
        className={`navbar__overlay ${drawerOpen ? 'navbar__overlay--show' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* ===== Mobile drawer ===== */}
      <aside
        className={`navbar__drawer ${drawerOpen ? 'navbar__drawer--open' : ''}`}
        aria-hidden={!drawerOpen}
        aria-label="Mobile menu"
      >
        <div className="navbar__drawer-head">
          <span className="navbar__drawer-logo">
            <img src={logo} alt="SriKshetra Residency" className="navbar__drawer-logo-img" />
          </span>
          <button
            type="button"
            className="navbar__drawer-close"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>

        <ul className="navbar__drawer-list">
          {NAV_ITEMS.map((item, index) => (
            <li
              key={item.label}
              className={`navbar__drawer-item ${isActive(item.href) ? 'navbar__drawer-item--active' : ''}`}
              style={{ '--i': index }}
            >
              <Link
                to={item.href}
                className="navbar__drawer-link"
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                <span className="navbar__drawer-label">{item.label}</span>
                <ArrowIcon />
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar__drawer-foot">
          <Link to="/booking" className="navbar__cta navbar__cta--block">
            <span>Book Your Stay</span>
            <ArrowIcon />
          </Link>
          <p className="navbar__drawer-tagline">Stay Closer to the Divine</p>
        </div>
      </aside>

      {/* Spacer so page content starts below the fixed navbar. Remove if hero sits under the navbar. */}
      <div className="navbar__spacer" aria-hidden="true" />
    </>
  );
};

export default Navbar;