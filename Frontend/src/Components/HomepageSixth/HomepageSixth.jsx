import React, { useEffect, useRef, useState } from "react";
import "./HomepageSixth.css";

const HomepageSixth = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`offers-section ${isVisible ? "offers-visible" : ""}`}
      ref={sectionRef}
    >
      <div className="offers-container">
        {/* SECTION HEADER */}
        <div className="offers-header">
          <div className="offers-heading">
            <div className="offers-ornament">
              <span>✦</span>
              <i></i>
              <span>❧</span>
              <i></i>
              <span>✦</span>
            </div>

            <p className="offers-subtitle">EXCLUSIVE HOTEL OFFERS</p>

            <h2>
              Uncover unbeatable deals,
              <br />
              curated packages
            </h2>
          </div>

          <a href="/offers" className="all-offers-button">
            <span className="btn-text">VIEW ALL OFFERS</span>
            <span className="btn-arrow">→</span>
          </a>
        </div>

        {/* MAIN CONTENT */}
        <div className="offers-content">
          {/* LEFT OFFER CONTENT */}
          <div className="offers-left">
            <p className="offers-description">
              Get 1 night free when you book 3 nights or more.
              Includes welcome drink &amp; pool access.
            </p>

            {/* OFFER COUPON */}
            <div className="offer-coupon">
              <div className="offer-details">
                <p className="offer-discount">30% off</p>

                <h3>Standard rooms</h3>

                <div className="offer-price">
                  <span>₹2,900</span>
                  <em>/ night</em>
                </div>

                <small className="offer-expiry">Valid till 31 Dec</small>

                <a href="/booking" className="book-offer-button">
                  <span className="btn-text">BOOK NOW</span>
                  <span className="btn-arrow">→</span>
                </a>
              </div>

              {/* OFFER TAG */}
              <div className="offer-tag">
                <svg viewBox="0 0 70 100" fill="none">
                  <path
                    d="M28 27C10 15 17 3 33 4C49 5 55 21 40 35L31 45"
                    stroke="#0a5a78"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M23 34L52 29L65 87L13 96L3 43L23 34Z"
                    fill="#f4c776"
                    stroke="#e8892a"
                    strokeWidth="2"
                  />
                  <circle cx="27" cy="39" r="4" fill="#0a5a78" />
                  <text
                    x="37"
                    y="59"
                    textAnchor="middle"
                    fill="#0a5a78"
                    fontSize="10"
                    fontWeight="bold"
                    transform="rotate(-12 37 59)"
                  >
                    HOT
                  </text>
                  <text
                    x="37"
                    y="70"
                    textAnchor="middle"
                    fill="#12303f"
                    fontSize="9"
                    fontWeight="bold"
                    transform="rotate(-12 37 70)"
                  >
                    OFFER
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="offers-image-wrapper">
            <div className="offers-image">
              <img
                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1800&q=90"
                alt="Luxury hotel lounge and interior"
                loading="lazy"
              />

              <div className="offers-image-overlay"></div>

              <div className="image-caption">
                <span>YOUR PERFECT GETAWAY</span>
                <h3>Luxury, Comfort &amp; Memories</h3>
              </div>

              <div className="image-floating-badge">
                <span>EXCLUSIVE</span>
                <strong>30%</strong>
                <small>OFF</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageSixth;