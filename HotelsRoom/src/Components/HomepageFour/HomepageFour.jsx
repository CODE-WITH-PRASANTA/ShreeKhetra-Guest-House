
import React, { useEffect, useRef, useState } from "react";
import "./HomepageFour.css";

const HomepageFour = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`why-section ${isVisible ? "why-visible" : ""}`}
      ref={sectionRef}
    >
      <div className="why-container">

        {/* LEFT CONTENT */}
        <div className="why-content">

          <div className="why-subtitle">
            <span className="ornament">❧ ───────── ❧</span>
            <p>WHY CHOOSE US</p>
          </div>

          <h2 className="why-heading">
            Why We are the Best
            <br />
            Place for Your Vacation
          </h2>

          <p className="why-description">
            Your safety and well-being are our highest priorities. We follow
            strict cleaning protocols, enhanced security measures, and
            round-the-clock monitoring to ensure you enjoy complete peace.
          </p>

          {/* FEATURES */}
          <div className="why-features">

            <div className="why-feature">
              <div className="feature-icon">
                <svg viewBox="0 0 64 64" fill="none">
                  <path d="M8 55h48M15 55V31l17-13 17 13v24" />
                  <path d="M23 55V40h18v15M27 13l5-7 5 7M32 6v11" />
                  <path d="M8 27l7-10 7 10M4 27h22M46 31h10v24" />
                  <path d="M50 38h3M50 44h3M50 50h3M25 45h4M35 45h4" />
                </svg>
              </div>
              <span>
                Luxury
                <br />
                Accommodation
              </span>
            </div>

            <div className="why-feature">
              <div className="feature-icon">
                <svg viewBox="0 0 64 64" fill="none">
                  <path d="M6 29L32 7l26 22M11 25v32h42V25" />
                  <path d="M18 39h28v12H18zM23 39v-5h18v5" />
                  <path d="M14 57v-6M50 57v-6M25 16h14" />
                  <path d="M42 18l5-5 5 5M47 13v10" />
                  <path d="M22 45h5M37 45h5" />
                </svg>
              </div>
              <span>Private Island</span>
            </div>

          </div>

          <div className="why-divider"></div>

          <div className="why-highlight">
            <span className="highlight-arrow">→</span>
            <p>
              These characteristics prioritize comfort and quality.
            </p>
          </div>

          <a href="/about" className="why-button">
            DISCOVER MORE
            <span>→</span>
          </a>

        </div>

        {/* RIGHT IMAGE CARDS */}
        <div className="why-visuals">

          <div className="why-image-card why-image-one">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85"
              alt="Luxury hotel restaurant"
            />
          </div>

          <div className="why-image-card why-image-two">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85"
              alt="Luxury hotel interior"
            />

            <div className="customer-badge">
              <h3>4k+</h3>
              <p>
                Happy
                <br />
                Customer
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HomepageFour;
