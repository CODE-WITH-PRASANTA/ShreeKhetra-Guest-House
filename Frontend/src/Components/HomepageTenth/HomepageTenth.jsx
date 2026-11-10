import React, { useEffect, useRef, useState } from "react";
import "./HomepageTenth.css";

const HomepageTenth = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`hero-tenth-section ${isVisible ? "hero-visible" : ""}`}
      ref={sectionRef}
    >
      {/* Background Image with Overlay */}
      <div className="hero-tenth-bg">
        <img
          src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=2000&q=90"
          alt="Luxury hotel bedroom interior"
          loading="lazy"
        />
        <div className="hero-tenth-overlay"></div>
      </div>

      {/* Main Content Container */}
      <div className="hero-tenth-container">
        
        {/* Left Text Content */}
        <div className="hero-tenth-content">
          <div className="hero-tenth-ornament">
            <span>✦</span>
            <i></i>
            <span>❧</span>
            <i></i>
            <span>✦</span>
          </div>

          <h1 className="hero-tenth-title">
            An excellent destination for <br />
            <span>your vacation</span>
          </h1>

          <p className="hero-tenth-description">
            With the motto of diversifying customer experience is passion, our and customers’ 
            requirements are the driving force for us to have the best service quality.
          </p>

          <div className="hero-tenth-actions">
            <a href="/booking" className="hero-tenth-btn">
              BOOK NOW <span>→</span>
            </a>
          </div>
        </div>

        {/* Right Animated Play Button / Interactive Element */}
        <div className="hero-tenth-right">
          <button
            className={`hero-tenth-play-btn ${isPlaying ? "playing" : ""}`}
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label="Play promotional video"
          >
            <div className="play-pulse-ring"></div>
            <div className="play-pulse-ring-two"></div>
            <div className="play-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.14v13.72a1 1 0 0 0 1.5.87l11-6.86a1 1 0 0 0 0-1.74l-11-6.86a1 1 0 0 0-1.5.87z" />
              </svg>
            </div>
          </button>
          <span className="hero-play-label">Watch Resort Tour</span>
        </div>

      </div>
    </section>
  );
};

export default HomepageTenth;