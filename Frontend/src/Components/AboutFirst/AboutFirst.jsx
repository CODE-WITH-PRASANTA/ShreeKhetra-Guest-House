import React, { useEffect, useRef, useState } from "react";
import "./AboutFirst.css";

const highlights = [
  { value: "1989", label: "Redefining hospitality since" },
  { value: "5★", label: "Luxury rooms, suites & dining" },
  { value: "24/7", label: "Warm, personalized service" },
];

const AboutFirst = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`about-first ${visible ? "about-first--visible" : ""}`}
      ref={sectionRef}
    >
      <div className="about-first__container">
        {/* Decorative Ornament */}
        <div className="about-first__ornament about-first__reveal">
          <span className="about-first__ornament-line"></span>
          <span className="about-first__ornament-symbol">❧</span>
          <span className="about-first__ornament-line"></span>
        </div>

        {/* Small Heading */}
        <p className="about-first__subtitle about-first__reveal">
          WELCOME TO OUR LUXIVO HOTEL
        </p>

        {/* Main Heading */}
        <h1 className="about-first__heading about-first__reveal">
          We always care about your experience
        </h1>

        {/* Description card */}
        <div className="about-first__content about-first__reveal">
          <span className="about-first__quote" aria-hidden="true">
            “
          </span>

          <p className="about-first__lead">
            Welcome to Luxivo, your sanctuary of elegance, comfort, and
            unforgettable experiences. Nestled between turquoise waters and
            lush tropical landscapes, our resort offers more than just a
            stay — it’s a journey into relaxation, indulgence, and discovery.
          </p>

          <p>
            Since 1989, we have been dedicated to redefining hospitality,
            blending world-class amenities with warm, personalized service.
            From our luxurious rooms and suites to our award-winning dining,
            private beach, and rejuvenating spa, every detail is designed
            to make your time with us truly exceptional.
          </p>

          <p>
            Whether you’re here for a romantic escape, a family getaway,
            or a wellness retreat, Luxivo is where cherished memories
            are made and dreams come to life.
          </p>
        </div>

        {/* Highlights */}
        <div className="about-first__highlights">
          {highlights.map((item, index) => (
            <div
              className="about-first__highlight"
              key={item.value}
              style={{ "--about-delay": `${0.55 + index * 0.15}s` }}
            >
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Manager Signature */}
        <div className="about-first__signature about-first__reveal">
          <div className="about-first__signature-name">Samantha</div>

          <p className="about-first__manager">
            Dave Bautista
            <span>General Manager, Luxivo Hotel</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutFirst;