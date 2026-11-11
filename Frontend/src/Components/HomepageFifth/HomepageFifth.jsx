
import React, { useEffect, useRef, useState } from "react";
import "./HomepageFifth.css";

const services = [
  {
    title: "Spa Salon",
    description:
      "Relax and refresh yourself with our soothing spa treatments and premium wellness services.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none">
        <path d="M32 8c-10 0-18 8-18 18 0 3 1 6 2 8-4 2-6 6-5 10 1 5 5 8 10 8h22c5 0 9-3 10-8 1-4-1-8-5-10 1-2 2-5 2-8 0-10-8-18-18-18Z" />
        <path d="M19 29c2-8 9-13 17-12M20 37c3 3 7 4 12 4s9-1 12-4M24 32h.1M40 32h.1M27 46c3 2 7 2 10 0M27 23c2-4 7-6 12-4" />
        <path d="M15 27c-4 0-7 3-7 7s3 7 7 7M49 27c4 0 7 3 7 7s-3 7-7 7" />
      </svg>
    ),
  },
  {
    title: "Restaurant",
    description:
      "Enjoy delicious meals, freshly prepared dishes and a memorable dining experience.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none">
        <path d="M12 34h40c0 11-8 18-20 18S12 45 12 34Z" />
        <path d="M18 34c0-8 6-14 14-14s14 6 14 14M25 16c2-4 7-6 12-4M32 9c5-2 11 1 13 6M9 34h46M22 52v5h20v-5M27 42h10M16 58h32" />
        <path d="M45 20l5-5M48 25h7" />
      </svg>
    ),
  },
  {
    title: "Swimming Pool",
    description:
      "Take a refreshing dip in our clean and relaxing pool, designed for your comfort.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none">
        <path d="M12 42V20a8 8 0 0 1 16 0v22M36 42V20a8 8 0 0 1 16 0v22" />
        <path d="M18 42V21a2 2 0 0 1 4 0v21M42 42V21a2 2 0 0 1 4 0v21M8 42h48" />
        <path d="M8 49c4 0 4 4 8 4s4-4 8-4 4 4 8 4 4-4 8-4 4 4 8 4 4-4 8-4" />
        <path d="M8 58c4 0 4 3 8 3s4-3 8-3 4 3 8 3 4-3 8-3 4 3 8 3 4-3 8-3" />
      </svg>
    ),
  },
  {
    title: "High Speed Wifi",
    description:
      "Stay connected with reliable high-speed internet throughout your entire stay.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none">
        <rect x="10" y="36" width="44" height="17" rx="3" />
        <path d="M17 36c8-9 22-9 30 0M23 29c5-5 13-5 18 0M29 23c2-2 5-2 7 0M48 36V15a4 4 0 0 1 8 0v21M52 15h4" />
        <circle cx="19" cy="45" r="1.5" />
        <circle cx="27" cy="45" r="1.5" />
        <path d="M35 45h12M18 53v4M46 53v4" />
      </svg>
    ),
  },
];

const HomepageFifth = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`hotel-services-section ${
        isVisible ? "services-visible" : ""
      }`}
      ref={sectionRef}
    >
      <div className="services-background-overlay"></div>

      <div className="services-layout">
        <div className="services-panel">
          <div className="services-heading">
            <div className="services-ornament">
              <span>✦</span>
              <i></i>
              <span>❧</span>
              <i></i>
              <span>✦</span>
            </div>

            <p className="services-subtitle">
              HOTEL SERVICE &amp; FACILITIES
            </p>

            <h2>Our Hotel Services</h2>
          </div>

          <div className="services-list">
            {services.map((service, index) => (
              <div
                className="service-item"
                key={service.title}
                style={{ "--item-index": index }}
              >
                <div className="service-icon">
                  {service.icon}
                </div>

                <div className="service-info">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="services-bottom-line">
            <span></span>
            <p>Experience comfort beyond expectations</p>
            <span></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageFifth;
