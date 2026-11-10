
import React from "react";
import "./GallarySecond.css";

const galleryImages = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=85",
    alt: "Luxury hotel bedroom with elegant interior",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85",
    alt: "Premium luxury hotel suite",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=85",
    alt: "Elegant hotel room",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=85",
    alt: "Luxury tropical hotel resort pool",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=900&q=85",
    alt: "Beautiful modern hotel bedroom",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=900&q=85",
    alt: "Contemporary luxury hotel interior",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85",
    alt: "Luxury hotel swimming pool",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=85",
    alt: "Premium hotel accommodation",
  },
];

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="25"
    height="25"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
  </svg>
);

const GallarySecond = () => {
  const duplicatedImages = [...galleryImages, ...galleryImages];

  return (
    <section className="GallarySecond-section">
      <div className="GallarySecond-heading">
        <span className="GallarySecond-line"></span>

        <h2>Follow Instagram</h2>

        <span className="GallarySecond-line"></span>
      </div>

      <div className="GallarySecond-slider">
        <div className="GallarySecond-track">
          {duplicatedImages.map((item, index) => (
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="GallarySecond-card"
              key={`${item.id}-${index}`}
              aria-label={`View ${item.alt} on Instagram`}
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
              />

              <div className="GallarySecond-overlay">
                <div className="GallarySecond-instagram">
                  <InstagramIcon />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallarySecond;
