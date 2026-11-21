import React, { useEffect, useRef, useState } from "react";
import "./AboutFourth.css";

const hotelBenefits = [
  "Courtesy of the house",
  "Complimentary breakfast",
  "High speed internet",
  "Deliveries & shipping",
];

const AboutFourth = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Start the animations only when the section is on screen
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
      className={`about-fourth ${visible ? "about-fourth--visible" : ""}`}
      ref={sectionRef}
    >
      <div className="about-fourth__container">
        {/* Left Content */}
        <div className="about-fourth__content">
          {/* Decorative Ornament */}
          <div className="about-fourth__ornament">
            <span></span>
            <b>❧</b>
            <span></span>
          </div>

          <p className="about-fourth__eyebrow">WHY CHOOSE US</p>

          <h2 className="about-fourth__heading">
            Luxury &amp; Comfort Our
            <br className="about-fourth__desktop-break" />
            service always satisfaction
          </h2>

          <p className="about-fourth__description">
            The details of the bathroom set will be stacked in a tray
            placed on the stone table or next to the washbasin in the
            bathroom. Wrapping each detail will be a plastic bag,
            ensuring every guest experiences exceptional comfort
            and thoughtful hospitality.
          </p>

          {/* Benefits */}
          <div className="about-fourth__benefits">
            {hotelBenefits.map((benefit, index) => (
              <div className="about-fourth__benefit" key={index}>
                <span className="about-fourth__check">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12.5L10 17.5L19 7.5" />
                  </svg>
                </span>

                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* Read More Button */}
          <a href="/about" className="about-fourth__button">
            <span className="about-fourth__button-text">READ MORE</span>

            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 12H19M13 6L19 12L13 18" />
            </svg>
          </a>
        </div>

        {/* Right Image */}
        <div className="about-fourth__visual">
          <div className="about-fourth__image-frame">
            <img
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400&q=90"
              alt="Elegant luxury hotel lobby and reception"
              className="about-fourth__image"
              loading="lazy"
            />

            <div className="about-fourth__image-overlay"></div>

            <div className="about-fourth__image-caption">
              <span>THE LUXURY EXPERIENCE</span>
              <p>Where comfort meets elegance.</p>
              <i className="about-fourth__caption-line"></i>
            </div>
          </div>

          {/* Decorative frame behind the image */}
          <div className="about-fourth__corner"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutFourth;