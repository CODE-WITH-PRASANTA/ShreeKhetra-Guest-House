
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
      className={`about-fifth ${
        isVisible ? "about-fifth--visible" : ""
      }`}
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

          <span className="about-fifth__eyebrow">
            LUXURY COMFORT
          </span>

          <h2>
            Featured rooms <span>&</span> suites
          </h2>

          <p>
            Discover exceptional comfort, timeless elegance and
            thoughtfully designed spaces for an unforgettable stay.
          </p>

          <div className="about-fifth__heading-line"></div>

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
              </div>

              {/* INFORMATION PANEL */}

              <div className="about-fifth__content">

                {/* ROOM TITLE */}

                <h3>{room.title}</h3>

                {/* PRICE */}

                <div className="about-fifth__price">
                  <strong>{room.price}</strong>
                  <small>/ NIGHT</small>
                </div>

                {/* ROOM DETAILS */}

                <div className="about-fifth__details">

                  <span>
                    <span className="about-fifth__detail-icon">
                      ◇
                    </span>
                    {room.size}
                  </span>

                  <span>
                    <span className="about-fifth__detail-icon">
                      ♙
                    </span>
                    {room.beds}
                  </span>

                  <span>
                    <span className="about-fifth__detail-icon">
                      ♧
                    </span>
                    {room.guests}
                  </span>

                </div>

                {/* BUTTON */}

                <div className="about-fifth__card-bottom">

                  <a
                    href={room.link}
                    className="about-fifth__button"
                  >
                    VIEW DETAILS

                    <span className="about-fifth__arrow">
                      →
                    </span>
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
