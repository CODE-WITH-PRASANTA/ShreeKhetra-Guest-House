
import React, { useEffect, useRef, useState } from "react";
import "./ServiceFirst.css";

/* =========================================
   FACILITY ICONS
========================================= */

const FacilityIcon = ({ type }) => {
  const common = {
    width: 54,
    height: 54,
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (type) {
    case "air":
      return (
        <svg {...common}>
          <rect x="8" y="12" width="48" height="25" rx="4" />
          <path d="M14 29h36M20 44c0 5-2 8-6 11M29 44v12M38 44v12M47 44c0 5 2 8 6 11" />
          <circle cx="45" cy="20" r="1" fill="currentColor" />
          <circle cx="50" cy="20" r="1" fill="currentColor" />
        </svg>
      );

    case "wifi":
      return (
        <svg {...common}>
          <rect x="5" y="38" width="54" height="16" rx="4" />
          <path d="M12 38V10h4l2 28M48 38V10h4l2 28M24 20c5-5 11-5 16 0M20 26c7-7 17-7 24 0M27 32c3-3 7-3 10 0M13 46h3M22 46h3M31 46h3M40 46h3" />
        </svg>
      );

    case "lock":
      return (
        <svg {...common}>
          <rect x="9" y="8" width="39" height="48" rx="4" />
          <path d="M20 17h4v4h-4zM30 17h4v4h-4zM40 17h2v4h-2zM20 27h4v4h-4zM30 27h4v4h-4zM40 27h2v4h-2zM20 37h4v4h-4zM30 37h4v4h-4zM40 37h2v4h-2zM24 49h28" />
          <path d="M49 20c4-4 8-4 12 0M52 25c2-2 4-2 6 0" />
        </svg>
      );

    case "gym":
      return (
        <svg {...common}>
          <path d="M9 48h44M14 48l5-9h25l6 9M22 39l14-29M36 10l5 2-5 8M18 39l-3-4M42 39l-4-3M9 48c-3 0-5 2-5 5s2 5 5 5h45c3 0 5-2 5-5s-2-5-5-5" />
        </svg>
      );

    case "food":
      return (
        <svg {...common}>
          <circle cx="32" cy="34" r="17" />
          <circle cx="32" cy="34" r="12" />
          <path d="M9 9v18M5 9v9M13 9v9M9 27v28M54 9c-5 5-6 12-6 18v7h8V9h-2zM56 34v21" />
        </svg>
      );

    case "pool":
      return (
        <svg {...common}>
          <path d="M9 27h46M14 27V17a9 9 0 0118 0v10M34 27V17a9 9 0 0118 0v10" />
          <path d="M20 27V18M26 27V18M40 27V18M46 27V18M7 38c5-4 9 4 14 0s9 4 14 0 9 4 14 0 7 2 8 0M7 47c5-4 9 4 14 0s9 4 14 0 9 4 14 0 7 2 8 0M7 56c5-4 9 4 14 0s9 4 14 0 9 4 14 0 7 2 8 0" />
        </svg>
      );

    default:
      return null;
  }
};

/* =========================================
   FACILITY OVERVIEW DATA
========================================= */

const facilities = [
  { icon: "air", title: "Air Conditioning", subtitle: "Perfect climate, always" },
  { icon: "wifi", title: "High-Speed Wi-Fi", subtitle: "Stay effortlessly connected" },
  { icon: "lock", title: "Smart Room Access", subtitle: "Seamless & secure entry" },
  { icon: "gym", title: "Fitness Centre", subtitle: "Wellness at your pace" },
  { icon: "food", title: "Fine Dining", subtitle: "A taste of something special" },
  { icon: "pool", title: "Swimming Pool", subtitle: "A refreshing escape" },
];

/* =========================================
   DETAILED FACILITY DATA
========================================= */

const detailedFacilities = [
  {
    number: "01",
    category: "SWIMMING & RELAXATION",
    title: "An Oasis of Calm, Above the Ordinary",
    description:
      "Step into a world of pure relaxation at our beautifully designed indoor swimming pool. Surrounded by elegant architecture, soothing ambient lighting and tranquil views, it is the perfect place to unwind, refresh your senses and enjoy a peaceful escape.",
    image:
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Luxury hotel swimming pool with elegant surroundings",
    features: [
      "Beautifully maintained indoor swimming pool",
      "Comfortable poolside relaxation loungers",
      "Peaceful ambience with elegant lighting",
      "A refreshing experience for every guest",
    ],
    imagePosition: "left",
    tag: "RELAX & RECHARGE",
  },
  {
    number: "02",
    category: "FITNESS & WELLNESS",
    title: "Your Personal Space for Strength & Balance",
    description:
      "Maintain your wellness routine in our thoughtfully equipped fitness centre. Featuring modern training equipment, spacious workout areas and a welcoming atmosphere, our gym makes it easy to stay active and energized throughout your stay.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Premium modern hotel fitness centre with gym equipment",
    features: [
      "Modern cardio and strength equipment",
      "Spacious and comfortable workout areas",
      "A clean and refreshing fitness environment",
      "Designed for beginners and fitness enthusiasts",
    ],
    imagePosition: "right",
    tag: "MOVE WITH PURPOSE",
  },
  {
    number: "03",
    category: "DINING EXPERIENCE",
    title: "Exceptional Dining, Beautifully Served",
    description:
      "Discover the pleasure of memorable dining in an inviting and sophisticated setting. From relaxed morning breakfasts to delightful meals throughout the day, our restaurant brings together delicious flavours, warm hospitality and an atmosphere worth returning to.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Elegant luxury hotel restaurant with fine dining tables",
    features: [
      "Delicious breakfast and dining selections",
      "Elegant and comfortable dining atmosphere",
      "Warm, attentive hospitality",
      "Memorable meals for every occasion",
    ],
    imagePosition: "left",
    tag: "SAVOUR THE MOMENT",
  },
];

/* =========================================
   MAIN COMPONENT
========================================= */

const ServiceFirst = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`service-first ${visible ? "service-first--visible" : ""}`}
      ref={sectionRef}
    >
      {/* =================================
          FACILITIES OVERVIEW
      ================================= */}

      <div className="service-first__overview">

        <div className="service-first__heading">
          <div className="service-first__ornament">
            <span />
            <span className="service-first__ornament-symbol">❧</span>
            <span />
          </div>

          <p className="service-first__eyebrow">
            HOTEL FACILITIES
          </p>

          <h2>
            Comfort and Convenience
            <br />
            <span>You’ll Love</span>
          </h2>

          <p className="service-first__intro">
            Thoughtfully curated spaces and exceptional amenities,
            designed to make every moment of your stay unforgettable.
          </p>
        </div>

        <div className="service-first__facility-grid">
          {facilities.map((item, index) => (
            <div
              className="service-first__facility-card"
              key={item.title}
              style={{ "--card-delay": `${index * 100}ms` }}
            >
              <div className="service-first__facility-icon">
                <FacilityIcon type={item.icon} />
              </div>

              <div className="service-first__facility-line">
                <span />
              </div>

              <h3>{item.title}</h3>

              <p>{item.subtitle}</p>

              <div className="service-first__card-bottom">
                <span>DISCOVER COMFORT</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* =================================
          DETAILED FACILITIES
      ================================= */}

      <div className="service-first__details">

        <div className="service-first__details-heading">
          <span>EXPERIENCE MORE</span>

          <h2>
            Every Detail, Designed
            <br />
            <em>Around You.</em>
          </h2>

          <p>
            From moments of relaxation to experiences that energize,
            discover the thoughtful facilities that make your stay special.
          </p>

          <div className="service-first__heading-line" />
        </div>

        {detailedFacilities.map((item, index) => (
          <article
            className={`service-first__detail-row ${
              item.imagePosition === "right"
                ? "service-first__detail-row--reverse"
                : ""
            }`}
            key={item.number}
            style={{ "--row-delay": `${index * 150}ms` }}
          >

            {/* IMAGE */}

            <div className="service-first__image-wrap">
              <div className="service-first__image">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  loading="lazy"
                />

                <div className="service-first__image-overlay" />

                <div className="service-first__image-caption">
                  <span>THE ART OF HOSPITALITY</span>
                  <span>{item.number} / 03</span>
                </div>
              </div>

              <div className="service-first__image-decoration" />
            </div>

            {/* CONTENT */}

            <div className="service-first__detail-content">

              <div className="service-first__number">
                {item.number}
              </div>

              <div className="service-first__detail-top">
                <span className="service-first__category">
                  {item.category}
                </span>

                <span className="service-first__category-line" />
              </div>

              <div className="service-first__detail-title">
                <span className="service-first__small-label">
                  EXPERIENCE {item.number}
                </span>

                <h3>{item.title}</h3>
              </div>

              <div className="service-first__vertical-divider">
                <span />
              </div>

              <p className="service-first__description">
                {item.description}
              </p>

              <div className="service-first__features">
                {item.features.map((feature, featureIndex) => (
                  <div
                    className="service-first__feature"
                    key={featureIndex}
                  >
                    <span className="service-first__feature-check">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="service-first__detail-bottom">
                <span className="service-first__detail-tag">
                  {item.tag}
                </span>

                <button
                  type="button"
                  className="service-first__arrow-button"
                  aria-label={`Discover ${item.category}`}
                  onClick={() => {
                    const target = document.querySelector(
                      ".service-first__details-heading"
                    );
                    target?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="21"
                    height="21"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

            </div>

          </article>
        ))}

      </div>

    </section>
  );
};

export default ServiceFirst;
