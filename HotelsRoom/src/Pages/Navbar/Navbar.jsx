import React, { useState, useEffect } from 'react';
import logo from "../../assets/SriKshetra Residency 03.png"; // adjust path if your assets folder differs
import "./Navbar.css";

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

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isActive = (href) =>
    href === '/' ? currentPath === '/' : currentPath.startsWith(href);

  /* Shrink on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  /* Escape key + close drawer on desktop resize */
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

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__container">
          {/* Logo */}
          <a href="/" className="navbar__brand" aria-label="SriKshetra Residency, Puri - Home">
            <span className="navbar__logo-plate">
              <img
                src={logo}
                alt="SriKshetra Residency Puri"
                className="navbar__logo-img"
                draggable="false"
              />
            </span>
          </a>

          {/* Desktop menu */}
          <nav className="navbar__nav" aria-label="Primary">
            <ul className="navbar__menu">
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className="navbar__item">
                  <a
                    href={item.href}
                    className={`navbar__link ${isActive(item.href) ? 'navbar__link--active' : ''}`}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="navbar__actions">
            <a href="/booking" className="navbar__cta">Book Your Stay</a>

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

      {/* Mobile overlay */}
      <div
        className={`navbar__overlay ${drawerOpen ? 'navbar__overlay--show' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
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
          {NAV_ITEMS.map((item) => (
            <li
              key={item.label}
              className={`navbar__drawer-item ${isActive(item.href) ? 'navbar__drawer-item--active' : ''}`}
            >
              <a href={item.href} className="navbar__drawer-link" onClick={closeDrawer}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__drawer-foot">
          <a href="/booking" className="navbar__cta navbar__cta--block" onClick={closeDrawer}>
            Book Your Stay
          </a>
        </div>
      </aside>

      {/* Spacer so page content starts below the fixed navbar. Remove if hero sits under the navbar. */}
      <div className="navbar__spacer" aria-hidden="true" />
    </>
  );
};

export default Navbar;