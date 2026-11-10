
import React from "react";
import "./AboutFirst.css";

const AboutFirst = () => {
  return (
    <section className="about-first">
      <div className="about-first__container">

        {/* Decorative Ornament */}
        <div className="about-first__ornament">
          <span className="about-first__ornament-line"></span>
          <span className="about-first__ornament-symbol">❧</span>
          <span className="about-first__ornament-line"></span>
        </div>

        {/* Small Heading */}
        <p className="about-first__subtitle">
          WELCOME TO OUR LUXIVO HOTEL
        </p>

        {/* Main Heading */}
        <h1 className="about-first__heading">
          We always care about your experience
        </h1>

        {/* Description */}
        <div className="about-first__content">

          <p>
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
            or a wellness retreat, [Resort Name] is where cherished memories
            are made and dreams come to life.
          </p>

        </div>

        {/* Manager Signature */}
        <div className="about-first__signature">
          <div className="about-first__signature-name">
            Samantha
          </div>

          <p className="about-first__manager">
            Dave Bautista - General Manager luxvio Hotel
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutFirst;
