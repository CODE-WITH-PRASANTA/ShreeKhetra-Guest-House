import React, { useEffect, useRef, useState } from "react";
import "./AboutSecond.css";

const hotelPhotos = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&q=85",
    alt: "Luxury resort swimming pool",
    title: "Luxury Resort",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1000&q=85",
    alt: "Beautiful tropical hotel exterior",
    title: "Tropical Escape",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1000&q=85",
    alt: "Elegant luxury hotel bedroom",
    title: "Luxury Rooms",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1000&q=85",
    alt: "Premium hotel suite",
    title: "Premium Suites",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1000&q=85",
    alt: "Beautiful luxury hotel",
    title: "Grand Hospitality",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=1000&q=85",
    alt: "Resort swimming pool and relaxation",
    title: "Relaxing Stay",
  },
];

const total = hotelPhotos.length;

const AboutSecond = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // Only run the slider while the section is actually on screen
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Move one card every 2 seconds (paused on hover / touch,
  // and not started at all for people who prefer reduced motion)
  useEffect(() => {
    if (isPaused || !inView) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((previous) => (previous >= total ? previous : previous + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, inView]);

  // Seamless loop: once the copy of the first card is reached,
  // jump back to the real first card with no animation
  const handleTransitionEnd = (event) => {
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== "transform") return;

    if (currentIndex >= total) {
      setIsResetting(true);
      setCurrentIndex(0);
    }
  };

  // Turn the animation back on after the invisible jump
  useEffect(() => {
    if (!isResetting) return;

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsResetting(false));
    });

    return () => cancelAnimationFrame(frame);
  }, [isResetting]);

  const repeatedPhotos = [...hotelPhotos, ...hotelPhotos];

  return (
    <section className="about-second" ref={sectionRef}>
      <div
        className="about-second__carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          className={`about-second__track ${
            isResetting ? "about-second__track--reset" : ""
          }`}
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translate3d(calc(var(--about-second-step) * -${currentIndex}), 0, 0)`,
          }}
        >
          {repeatedPhotos.map((photo, index) => (
            <div className="about-second__slide" key={`${photo.id}-${index}`}>
              <div className="about-second__image-wrapper">
                <img
                  src={photo.image}
                  alt={photo.alt}
                  className="about-second__image"
                  decoding="async"
                  loading={index < 3 ? "eager" : "lazy"}
                />

                <span className="about-second__chip">
                  {String((index % total) + 1).padStart(2, "0")}
                </span>

                <div className="about-second__overlay">
                  <span className="about-second__title">{photo.title}</span>
                  <div className="about-second__overlay-line"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSecond;