import React, { useEffect, useRef, useState } from "react";
import "./HomepageSec.css";

const HomepageSec = () => {
  const sectionRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [experience, setExperience] = useState(0);

  // =====================================
  // SCROLL REVEAL
  // =====================================

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) observer.observe(currentSection);

    return () => observer.disconnect();
  }, []);

  // =====================================
  // EXPERIENCE COUNTER ANIMATION
  // =====================================

  useEffect(() => {
    if (!visible) return;

    let startTime = null;
    const duration = 2200;
    let animationFrame;

    const animateCounter = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 4);

      setExperience(Math.floor(easedProgress * 30));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateCounter);
      } else {
        setExperience(30);
      }
    };

    animationFrame = requestAnimationFrame(animateCounter);

    return () => cancelAnimationFrame(animationFrame);
  }, [visible]);

  // =====================================
  // FEATURES
  // =====================================

  const features = [
    "Exclusive Deals & Discounts",
    "Instant Online Booking System",
    "Pure-Veg Kitchen & Stay",
    "Minutes from Jagannath Temple",
  ];

  return (
    <section
      className={`homepage-about ${visible ? "about-visible" : ""}`}
      ref={sectionRef}
    >
      <div className="about-container">
        {/* =====================================
             LEFT SIDE IMAGE COLLAGE
        ====================================== */}

        <div className="about-visual">
          {/* Main Hotel Image */}
          <div className="about-main-image">
            <img
              src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=90"
              alt="Luxury hotel bedroom"
            />
            <div className="image-overlay"></div>
            <div className="image-shine"></div>
          </div>

          {/* 30 Years Experience Badge */}
          <div className="experience-badge">
            <span className="experience-number">{experience}+</span>
            <span className="experience-years">years</span>
            <span className="experience-text">Experience</span>
            <div className="badge-decoration"></div>
          </div>

          {/* Second Resort Image */}
          <div className="about-secondary-image">
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=90"
              alt="Luxury resort swimming pool"
            />
            <div className="image-overlay"></div>
            <div className="image-shine"></div>
          </div>

          {/* Guest Rating Card (avatars removed) */}
          <div className="about-review">
            <div className="review-score">
              <span className="review-score-number">4.9</span>
              <span className="review-score-out">/ 5</span>
            </div>

            <div className="review-divider"></div>

            <div className="review-info">
              <div className="review-stars">★★★★★</div>
              <p>100k+ Guest Reviews</p>
            </div>
          </div>

          {/* Decorative Background Circle */}
          <div className="about-circle-decoration"></div>
        </div>

        {/* =====================================
             RIGHT SIDE CONTENT
        ====================================== */}

        <div className="about-content">
          {/* Ornament */}
          <div className="about-ornament reveal-item">
            <span></span>
            <div>❧</div>
            <span></span>
          </div>

          {/* About Label */}
          <span className="about-label reveal-item">ABOUT US</span>

          {/* Heading */}
          <h2 className="about-heading reveal-item">
            Effortlessly Simplifying
            <br className="desktop-break" />
            Your Stays in Luxurious
            <br className="desktop-break" />
            Resort
          </h2>

          {/* Description */}
          <p className="about-description reveal-item">
            Immerse yourself in luxury and freshness with stunning
            ocean views and beach just a few steps away. Enjoy the
            sweet breath of the sea with elegant and luxurious rooms,
            opposite the beach voted by Forbes magazine.
          </p>

          {/* Service Cards */}
          <div className="about-service-cards">
            <div className="about-service-card reveal-item">
              <div className="service-icon">
                <svg viewBox="0 0 64 64" fill="none">
                  <path
                    d="M13 53H53M20 53V12L31 17V53M31 20H44L52 53M17 12H25M12 53V23M44 20V53"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <span>
                Luxury
                <br />
                Services
              </span>
            </div>

            <div className="about-service-card reveal-item">
              <div className="service-icon">
                <svg viewBox="0 0 64 64" fill="none">
                  <path
                    d="M32 7L46 12V26C46 37 38 44 32 47C26 44 18 37 18 26V12L32 7Z"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M26 25L30 29L38 20"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="32"
                    cy="49"
                    r="5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M13 57C13 49 21 45 27 45M51 57C51 49 43 45 37 45M8 55C8 49 12 46 17 46M56 55C56 49 52 46 47 46"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <span>
                Trusted
                <br />
                Care
              </span>
            </div>
          </div>

          {/* Features List */}
          <div className="about-features">
            {features.map((feature, index) => (
              <div
                className="about-feature reveal-item"
                key={index}
                style={{ "--item-delay": `${1.25 + index * 0.15}s` }}
              >
                <span className="feature-icon">✧</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Discover Rooms Button */}
          <a href="#booking" className="about-discover-button reveal-item">
            <span>Discover Rooms</span>
            <span className="discover-arrow">→</span>
            <span className="button-shine"></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomepageSec;