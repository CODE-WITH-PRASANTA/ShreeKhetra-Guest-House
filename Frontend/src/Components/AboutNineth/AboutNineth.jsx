import React from "react";
import "./AboutNineth.css";

/* =========================================
   CUSTOM INSTAGRAM SVG ICON
   No external icon package required
========================================= */

const InstagramIcon = ({ size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
};

const ArrowIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* =========================================
   GALLERY IMAGES
========================================= */

const galleryImages = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
    alt: "Luxury outdoor hotel terrace",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=85",
    alt: "Elegant hotel bedroom",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85",
    alt: "Premium modern bedroom",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=900&q=85",
    alt: "Luxury contemporary hotel interior",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=900&q=85",
    alt: "Beautiful luxury bedroom",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
    alt: "Luxury hotel living space",
  },
];

/* Replace with your real Instagram page link */
const INSTAGRAM_LINK = "https://www.instagram.com/";

/* =========================================
   SINGLE PHOTO CARD
========================================= */

const GalleryCard = ({ item, hidden = false }) => (
  <a
    href={INSTAGRAM_LINK}
    target="_blank"
    rel="noopener noreferrer"
    className="about-nineth-card"
    aria-label={`View ${item.alt} on Instagram`}
    tabIndex={hidden ? -1 : undefined}
  >
    <div className="about-nineth-frame">
      <img
        src={item.image}
        alt={item.alt}
        width="340"
        height="240"
        loading={hidden ? "lazy" : "eager"}
        draggable="false"
      />

      {/* Always-visible label */}
      <span className="about-nineth-tag" aria-hidden="true">
        <InstagramIcon size={13} />
        CURATED LIVING
      </span>

      {/* Hover overlay */}
      <div className="about-nineth-overlay" aria-hidden="true">
        <span className="about-nineth-instagram-button">
          <InstagramIcon size={24} />
        </span>

        <span className="about-nineth-overlay-text">VIEW ON INSTAGRAM</span>
      </div>
    </div>
  </a>
);

/* =========================================
   ABOUT NINETH COMPONENT
========================================= */

const AboutNineth = () => {
  return (
    <section className="about-nineth">
      {/* Decorative background */}
      <div className="about-nineth-pattern" aria-hidden="true"></div>
      <span className="about-nineth-glow about-nineth-glow--teal" aria-hidden="true"></span>
      <span className="about-nineth-glow about-nineth-glow--gold" aria-hidden="true"></span>

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="about-nineth-heading">
        <span className="about-nineth-eyebrow">
          <span className="about-nineth-eyebrow-dot" aria-hidden="true"></span>
          OUR LIFESTYLE
        </span>

        <a
          href={INSTAGRAM_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="about-nineth-title"
        >
          <span>Follow Instagram</span>

          <span className="about-nineth-title-icon">
            <InstagramIcon size={22} />
          </span>
        </a>

        <span className="about-nineth-title-line" aria-hidden="true"></span>

        <p className="about-nineth-subtitle">
          Discover our world of beautiful spaces and timeless luxury.
        </p>
      </div>

      {/* =====================================
          INFINITE GALLERY
      ===================================== */}

      <div className="about-nineth-gallery" aria-label="Instagram gallery">
        <div className="about-nineth-track">
          {/* First group */}
          <div className="about-nineth-group">
            {galleryImages.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>

          {/* Duplicate group for a seamless loop */}
          <div className="about-nineth-group" aria-hidden="true">
            {galleryImages.map((item) => (
              <GalleryCard key={`dup-${item.id}`} item={item} hidden />
            ))}
          </div>
        </div>
      </div>

      {/* =====================================
          BOTTOM DETAIL + BUTTON
      ===================================== */}

      <div className="about-nineth-bottom">
        <span className="about-nineth-bottom-line" />

        <span className="about-nineth-bottom-text">
          INSPIRED BY BEAUTIFUL LIVING
        </span>

        <span className="about-nineth-bottom-line" />
      </div>

     
    </section>
  );
};

export default AboutNineth;