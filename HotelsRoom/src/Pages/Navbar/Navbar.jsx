import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import logo from "../../assets/SriKshetra Residency 03.png"; // adjust path if your assets folder differs
import "./Navbar.css";

/* ---------- Menu data (no dropdowns) ---------- */
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

const pad = (n) => String(n + 1).padStart(2, '0');

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pill, setPill] = useState({ left: 0, width: 0, show: false });

  const navRef = useRef(null);
  const menuRef = useRef(null);
  const plateRef = useRef(null);
  const itemRefs = useRef([]);

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isActive = (href) =>
    href === '/' ? currentPath === '/' : currentPath.startsWith(href);
  const activeIndex = NAV_ITEMS.findIndex((i) => isActive(i.href));

  /* ---------- Sliding pill ---------- */
  const movePillTo = useCallback((index) => {
    const el = itemRefs.current[index];
    if (!el) {
      setPill((p) => ({ ...p, show: false }));
      return;
    }
    setPill({ left: el.offsetLeft, width: el.offsetWidth, show: true });
  }, []);

  const resetPill = useCallback(() => movePillTo(activeIndex), [movePillTo, activeIndex]);

  useLayoutEffect(() => {
    resetPill();
    const onResize = () => resetPill();
    window.addEventListener('resize', onResize);
    // re-measure once fonts finish loading
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(resetPill);
    return () => window.removeEventListener('resize', onResize);
  }, [resetPill, scrolled]);

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
  }, []);

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

  /* ---------- 3D logo tilt ---------- */
  const handleTilt = useCallback((e) => {
    const el = plateRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-y * 18).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(x * 24).toFixed(2)}deg`);
    el.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`);
  }, []);

  const resetTilt = useCallback(() => {
    const el = plateRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--gx', '50%');
    el.style.setProperty('--gy', '50%');
  }, []);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <header
        ref={navRef}
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${drawerOpen ? 'navbar--drawer-open' : ''}`}
      >
        <span className="navbar__progress" aria-hidden="true" />

        <div className="navbar__container">
          {/* ===== Brand / Logo ===== */}
          <a href="/" className="navbar__brand" aria-label="SriKshetra Residency, Puri - Home">
            <span className="navbar__logo-stage">
              <span
                ref={plateRef}
                className="navbar__logo-plate"
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
              >
                <img
                  src={logo}
                  alt="SriKshetra Residency Puri"
                  className="navbar__logo-img"
                  draggable="false"
                />
                <span className="navbar__logo-glare" aria-hidden="true" />
              </span>
            </span>
          </a>

          {/* ===== Desktop menu ===== */}
          <nav className="navbar__nav" aria-label="Primary">
            <ul className="navbar__menu" ref={menuRef} onMouseLeave={resetPill}>
              <span
                className={`navbar__pill ${pill.show ? 'navbar__pill--show' : ''}`}
                style={{ transform: `translateX(${pill.left}px)`, width: pill.width }}
                aria-hidden="true"
              />
              {NAV_ITEMS.map((item, index) => (
                <li
                  key={item.label}
                  className="navbar__item"
                  ref={(el) => (itemRefs.current[index] = el)}
                  onMouseEnter={() => movePillTo(index)}
                >
                  <a
                    href={item.href}
                    className={`navbar__link ${isActive(item.href) ? 'navbar__link--active' : ''}`}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    onFocus={() => movePillTo(index)}
                    onBlur={resetPill}
                  >
                    <span className="navbar__link-text">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ===== Right actions ===== */}
          <div className="navbar__actions">
            <a href="/booking" className="navbar__cta">
              <span className="navbar__cta-text">Book Your Stay</span>
              <ArrowIcon />
              <span className="navbar__cta-shine" aria-hidden="true" />
            </a>

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
        onClick={closeDrawer}
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
            onClick={closeDrawer}
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
              <a href={item.href} className="navbar__drawer-link" onClick={closeDrawer}>
                <span className="navbar__drawer-num">{pad(index)}</span>
                <span className="navbar__drawer-label">{item.label}</span>
                <ArrowIcon />
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__drawer-foot">
          <a href="/booking" className="navbar__cta navbar__cta--block" onClick={closeDrawer}>
            <span className="navbar__cta-text">Book Your Stay</span>
            <ArrowIcon />
            <span className="navbar__cta-shine" aria-hidden="true" />
          </a>
          <p className="navbar__drawer-tagline">Stay Closer to the Divine</p>
        </div>
      </aside>

      {/* Spacer so page content starts below the fixed navbar. Remove if hero sits under the navbar. */}
      <div className="navbar__spacer" aria-hidden="true" />
    </>
  );
};

export default Navbar;