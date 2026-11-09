
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

      <circle
        cx="17.5"
        cy="6.5"
        r="0.8"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
};

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

/* =========================================
   ABOUT NINETH COMPONENT
========================================= */

const AboutNineth = () => {
  const instagramLink = "https://www.instagram.com/";

  // Duplicate images to create continuous animation.
  const duplicatedImages = [
    ...galleryImages,
    ...galleryImages,
  ];

  return (
    <section className="about-nineth">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="about-nineth-heading">

        <span className="about-nineth-eyebrow">
          OUR LIFESTYLE
        </span>

        <a
          href={instagramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="about-nineth-title"
        >
          <span>Follow Instagram</span>

          <span className="about-nineth-title-icon">
            <InstagramIcon size={15} />
          </span>
        </a>

        <p className="about-nineth-subtitle">
          Discover our world of beautiful spaces and
          timeless luxury.
        </p>

      </div>

      {/* =====================================
          INFINITE GALLERY
      ===================================== */}

      <div className="about-nineth-gallery">

        <div className="about-nineth-track">

          {duplicatedImages.map((item, index) => (

            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="about-nineth-card"
              key={`${item.id}-${index}`}
              aria-label={`View ${item.alt} on Instagram`}
            >

              {/* IMAGE */}

              <img
                src={item.image}
                alt={item.alt}
                loading={index < galleryImages.length ? "eager" : "lazy"}
                draggable="false"
              />

              {/* =================================
                  HOVER OVERLAY
              ================================= */}

              <div className="about-nineth-overlay">

                <span className="about-nineth-instagram-button">

                  <InstagramIcon size={24} />

                </span>

                <span className="about-nineth-overlay-text">
                  VIEW ON INSTAGRAM
                </span>

              </div>

              {/* =================================
                  IMAGE BOTTOM DETAILS
              ================================= */}

              <div className="about-nineth-image-detail">

                <span>
                  CURATED LIVING
                </span>

                <span className="about-nineth-detail-icon">
                  <InstagramIcon size={13} />
                </span>

              </div>

            </a>

          ))}

        </div>

      </div>

      {/* =====================================
          BOTTOM LUXURY DETAIL
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
