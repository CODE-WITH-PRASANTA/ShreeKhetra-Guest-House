
import React from "react";
import "./AboutThird.css";

const features = [
  {
    id: 1,
    type: "hotel",
    title: "Five Star Hotel",
    description:
      "Our luxury and best hotel & resort for you. Phasellus enim libero, blandit vel sapien vitae.",
  },
  {
    id: 2,
    type: "safety",
    title: "Maintaining Your Safety",
    description:
      "Your safety and well-being are our highest priorities. We follow strict cleaning protocols.",
  },
  {
    id: 3,
    type: "room",
    title: "Change Room",
    description:
      "You will have the right to change the room within 24 hours from the time of booking.",
  },
];

const FeatureIcon = ({ type }) => {
  if (type === "hotel") {
    return (
      <svg viewBox="0 0 80 80" fill="none">
        <path d="M12 34V20L40 7L68 20V34" />
        <path d="M12 66V40C12 37 14 35 17 35H63C66 35 68 37 68 40V66" />
        <path d="M12 53H68M12 66H68" />
        <path d="M19 35V27C19 24 21 22 24 22H31C34 22 36 24 36 27V35" />
        <path d="M44 35V27C44 24 46 22 49 22H56C59 22 61 24 61 27V35" />
        <path d="M19 53V45C19 42 21 40 24 40H31C34 40 36 42 36 45V53" />
        <path d="M44 53V45C44 42 46 40 49 40H56C59 40 61 42 61 45V53" />
        <path d="M62 51H74V66H62M62 58H74" />
        <circle cx="54" cy="18" r="7" />
        <path d="M51 18L53 20L58 15" />
      </svg>
    );
  }

  if (type === "safety") {
    return (
      <svg viewBox="0 0 80 80" fill="none">
        <path d="M40 7L66 17V37C66 53 55 66 40 74C25 66 14 53 14 37V17L40 7Z" />
        <path d="M28 39L36 47L53 30" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 80 80" fill="none">
      <path d="M34 11C34 5 39 1 45 3C50 4 53 9 52 14" />
      <path d="M33 16L28 20C25 22 23 26 23 30V69H55L66 55C68 52 68 48 66 45L50 18C47 14 42 13 38 16L33 20" />
      <path d="M40 20L57 13L72 48C74 52 72 57 68 59L62 62" />
      <path d="M31 28L44 25L51 56C52 60 50 64 46 65L35 68C31 69 27 66 27 62V37C27 33 28 30 31 28Z" />
      <path d="M40 39V50" />
      <circle cx="40" cy="55" r="3" />
      <path d="M32 16C32 10 36 7 41 8" />
    </svg>
  );
};

const AboutThird = () => {
  return (
    <section className="about-third">
      <div className="about-third__container">

        {features.map((feature, index) => (
          <article
            className="about-third__card"
            key={feature.id}
            style={{ "--card-index": index }}
          >
            <div className="about-third__icon-wrap">
              <div className="about-third__icon">
                <FeatureIcon type={feature.type} />
              </div>
              <span className="about-third__icon-decoration"></span>
            </div>

            <h3 className="about-third__title">
              {feature.title}
            </h3>

            <div className="about-third__divider">
              <span></span>
            </div>

            <p className="about-third__description">
              {feature.description}
            </p>

          </article>
        ))}

      </div>
    </section>
  );
};

export default AboutThird;
