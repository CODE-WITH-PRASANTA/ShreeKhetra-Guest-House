import React, { useEffect, useRef, useState } from "react";
import "./HomepageTenth.css";

// Paste your YouTube / Vimeo EMBED link here, for example:
// "https://www.youtube.com/embed/YOUR_VIDEO_ID"
const VIDEO_URL = "";

const stats = [
  { value: "30+", label: "Years of Hospitality" },
  { value: "4k+", label: "Happy Guests" },
  { value: "100%", label: "Pure-Veg Stay" },
];

const HomepageTenth = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Scroll reveal
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

  // Close video with Escape + stop page scrolling behind it
  useEffect(() => {
    if (!isPlaying) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsPlaying(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying]);

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
            With the motto of diversifying customer experience is passion,
            our and customers’ requirements are the driving force for us to
            have the best service quality.
          </p>

          <div className="hero-tenth-actions">
            <a href="/booking" className="hero-tenth-btn">
              <span className="hero-btn-text">BOOK NOW</span>
              <span className="hero-btn-arrow">→</span>
            </a>
          </div>

          {/* Quick stats */}
          <div className="hero-tenth-stats">
            {stats.map((item) => (
              <div className="hero-stat" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Play Button */}
        <div className="hero-tenth-right">
          <button
            className="hero-tenth-play-btn"
            onClick={() => setIsPlaying(true)}
            aria-label="Play resort tour video"
          >
            <span className="play-pulse-ring"></span>
            <span className="play-pulse-ring-two"></span>
            <span className="play-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.14v13.72a1 1 0 0 0 1.5.87l11-6.86a1 1 0 0 0 0-1.74l-11-6.86a1 1 0 0 0-1.5.87z" />
              </svg>
            </span>
          </button>
          <span className="hero-play-label">Watch Resort Tour</span>
        </div>
      </div>

      {/* VIDEO MODAL */}
      {isPlaying && (
        <div
          className="hero-modal"
          onClick={() => setIsPlaying(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Resort tour video"
        >
          <button
            className="hero-modal-close"
            onClick={() => setIsPlaying(false)}
            aria-label="Close video"
          >
            ×
          </button>

          <div
            className="hero-modal-box"
            onClick={(event) => event.stopPropagation()}
          >
            {VIDEO_URL ? (
              <iframe
                src={`${VIDEO_URL}${VIDEO_URL.includes("?") ? "&" : "?"}autoplay=1`}
                title="Resort tour video"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="hero-modal-empty">
                <h3>Resort tour coming soon</h3>
                <p>Add your video embed link in VIDEO_URL to play it here.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default HomepageTenth;