
import React from "react";
import "./AboutFourth.css";

const hotelBenefits = [
  "Courtesy of the house",
  "Complimentary breakfast",
  "High speed internet",
  "Deliveries & shipping",
];

const AboutFourth = () => {
  return (
    <section className="about-fourth">
      <div className="about-fourth__container">

        {/* Left Content */}
        <div className="about-fourth__content">

          {/* Decorative Ornament */}
          <div className="about-fourth__ornament">
            <span></span>
            <b>❧</b>
            <span></span>
          </div>

          <p className="about-fourth__eyebrow">
            WHY CHOOSE US
          </p>

          <h2 className="about-fourth__heading">
            Luxury & Comfort Our
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
              <div
                className="about-fourth__benefit"
                key={index}
              >
                <span className="about-fourth__check">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M12 2.5L14.7 4.1L17.8 4.2L19 7.1L21.5 9L20.9 12L21.5 15L19 16.9L17.8 19.8L14.7 19.9L12 21.5L9.3 19.9L6.2 19.8L5 16.9L2.5 15L3.1 12L2.5 9L5 7.1L6.2 4.2L9.3 4.1L12 2.5Z" />
                    <path d="M8.5 12L10.7 14.2L15.5 9.5" />
                  </svg>
                </span>

                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* Read More Button */}
          <a
            href="/about"
            className="about-fourth__button"
          >
            <span>READ MORE</span>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
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
            </div>

          </div>

          {/* Decorative Corner */}
          <div className="about-fourth__corner"></div>

        </div>

      </div>
    </section>
  );
};

export default AboutFourth;
