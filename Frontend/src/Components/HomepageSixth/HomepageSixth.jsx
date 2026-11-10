
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
              curated packages,
            </h2>
          </div>

          <a href="/offers" className="all-offers-button">
            VIEW ALL OFFERS
            <span>→</span>
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
                  <span>$250</span>
                  <small>Expiry: 31 Aug</small>
                </div>

                <a href="/booking" className="book-offer-button">
                  BOOK NOW
                  <span>→</span>
                </a>
              </div>

              {/* OFFER TAG */}
              <div className="offer-tag">
                <svg viewBox="0 0 70 100" fill="none">
                  <path
                    d="M28 27C10 15 17 3 33 4C49 5 55 21 40 35L31 45"
                    stroke="#9b8876"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M23 34L52 29L65 87L13 96L3 43L23 34Z"
                    fill="#d9c5a9"
                    stroke="#b39c80"
                    strokeWidth="2"
                  />
                  <circle cx="27" cy="39" r="4" fill="#8b7660" />
                  <text
                    x="37"
                    y="59"
                    textAnchor="middle"
                    fill="#bd3f30"
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
                    fill="#292929"
                    fontSize="9"
                    fontWeight="bold"
                    transform="rotate(-12 37 70)"
                  >
                    OFFER
                  </text>
                </svg>
              </div>

              <div className="coupon-corner"></div>
            </div>

            {/* SOCIAL PROOF */}
            <div className="offers-social-proof">

              <div className="guest-avatars">
                <img
                  src="https://i.pravatar.cc/100?img=11"
                  alt="Hotel guest"
                  loading="lazy"
                />
                <img
                  src="https://i.pravatar.cc/100?img=47"
                  alt="Hotel guest"
                  loading="lazy"
                />
                <img
                  src="https://i.pravatar.cc/100?img=12"
                  alt="Hotel guest"
                  loading="lazy"
                />

                <div className="guest-count">50+</div>
              </div>

              <div className="guest-rating">
                <div className="rating-stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <p>Guest reviews</p>
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
