import React, { useEffect, useRef, useState } from "react";
import "./AboutFifth.css";

const rooms = [
  {
    id: 1,
    title: "Deluxe Family Rooms",
    price: "₹8,500",
    size: "250 SQ.M",
    beds: "3 Beds",
    guests: "2–4 Guests",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=90",
    link: "#room-details",
  },
  {
    id: 2,
    title: "Royal Prestige Suite",
    price: "₹12,500",
    size: "320 SQ.M",
    beds: "2 Beds",
    guests: "2–3 Guests",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=90",
    link: "#room-details",
  },
  {
    id: 3,
    title: "Exclusive Weekend Getaway",
    price: "₹15,000",
    size: "400 SQ.M",
    beds: "2 Beds",
    guests: "2–4 Guests",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=90",
    link: "#room-details",
  },
  {
    id: 4,
    title: "Luxury Signature Suites",
    price: "₹18,500",
    size: "500 SQ.M",
    beds: "3 Beds",
    guests: "2–5 Guests",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=90",
    link: "#room-details",
  },
];

/* Small line icons for the room details */

const SizeIcon = () => (
  <svg viewBox="0 0 24 24" className="about-fifth__detail-icon" aria-hidden="true">
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </svg>
);

const BedIcon = () => (
  <svg viewBox="0 0 24 24" className="about-fifth__detail-icon" aria-hidden="true">
    <path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" />
    <circle cx="7" cy="11" r="1.6" />
  </svg>
);

const GuestIcon = () => (
  <svg viewBox="0 0 24 24" className="about-fifth__detail-icon" aria-hidden="true">
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20c0-3.6 2.7-6 6-6s6 2.4 6 6M16 5.2a3.2 3.2 0 0 1 0 5.6M18 14.4c1.8.8 3 2.7 3 5.6" />
  </svg>
);

const AboutFifth = () => {
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
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`about-fifth ${isVisible ? "about-fifth--visible" : ""}`}
      ref={sectionRef}
    >
      <div className="about-fifth__container">
        {/* SECTION HEADING */}
        <div className="about-fifth__heading">
          <div className="about-fifth__ornament">
            <span></span>
            <span className="about-fifth__ornament-icon">✧</span>
            <span></span>
          </div>

          <span className="about-fifth__eyebrow">LUXURY COMFORT</span>

          <h2>
            Featured rooms <span>&amp;</span> suites
          </h2>

          <p>
            Discover exceptional comfort, timeless elegance and
            thoughtfully designed spaces for an unforgettable stay.
          </p>
        </div>

        {/* ROOM CARDS */}
        <div className="about-fifth__grid">
          {rooms.map((room, index) => (
            <article
              className="about-fifth__card"
              key={room.id}
              style={{ "--card-index": index }}
            >
              {/* ROOM IMAGE */}
              <div className="about-fifth__image-wrap">
                <img
                  src={room.image}
                  alt={room.title}
                  className="about-fifth__image"
                  loading="lazy"
                />
                <span className="about-fifth__image-tint"></span>
              </div>

              <span className="about-fifth__tag">Luxury Stay</span>

              {/* INFORMATION PANEL */}
              <div className="about-fifth__content">
                <span
                  className="about-fifth__stars"
                  role="img"
                  aria-label="5 out of 5 stars"
                >
                  ★★★★★
                </span>

                <h3>{room.title}</h3>

                {/* ROOM DETAILS */}
                <div className="about-fifth__details">
                  <span>
                    <SizeIcon />
                    {room.size}
                  </span>

                  <span>
                    <BedIcon />
                    {room.beds}
                  </span>

                  <span>
                    <GuestIcon />
                    {room.guests}
                  </span>
                </div>

                {/* PRICE + BUTTON */}
                <div className="about-fifth__card-bottom">
                  <div className="about-fifth__price">
                    <strong>{room.price}</strong>
                    <small>/ NIGHT</small>
                  </div>

                  <a
                    href={room.link}
                    className="about-fifth__button"
                    aria-label={`View details of ${room.title}`}
                  >
                    <span className="about-fifth__button-text">
                      VIEW DETAILS
                    </span>
                    <span className="about-fifth__arrow">→</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* SECTION FOOTER */}
        <div className="about-fifth__footer">
          <span></span>
          <p>EXPERIENCE THE ART OF LUXURY HOSPITALITY</p>
          <span></span>
        </div>
      </div>
    </section>
  );
};

export default AboutFifth;