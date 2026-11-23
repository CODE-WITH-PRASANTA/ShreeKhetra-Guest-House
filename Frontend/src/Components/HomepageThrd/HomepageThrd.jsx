import React, { useEffect, useRef, useState } from "react";
import "./HomepageThrd.css";

const rooms = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=90",
    price: 2900,
    name: "Deluxe Family Room",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=90",
    price: 3900,
    name: "Exclusive Deluxe Rooms",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=90",
    price: 4900,
    name: "Industry Experience Hotel",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1000&q=90",
    price: 6500,
    name: "Luxury Signature Suites",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=90",
    price: 3500,
    name: "Premium Comfort Room",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1611892441796-ae6af0ec2f2f?auto=format&fit=crop&w=1000&q=90",
    price: 4500,
    name: "Royal Executive Suite",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=90",
    price: 5500,
    name: "Elegant Luxury Room",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=90",
    price: 7500,
    name: "Presidential Royal Suite",
  },
];

// ==========================================
// ROOM CARD COMPONENT
// ==========================================

const RoomCard = ({ room }) => {
  const features = [
    "Pick & Drop Service",
    "Swimming Pool",
    "City Tour Guide",
    "Fibre Internet",
  ];

  return (
    <article className="room-card">
      {/* Room Image */}
      <div className="room-image-wrapper">
        <img
          src={room.image}
          alt={room.name}
          className="room-image"
          loading="lazy"
        />

        <div className="room-image-overlay"></div>

        <span className="room-image-tag">Luxury Stay</span>

        {/* Price badge on the image */}
        <div className="room-price-badge">
          <span className="price-amount">
            ₹{room.price.toLocaleString("en-IN")}
          </span>
          <span className="price-duration">/ night</span>
        </div>

        <a href="#booking" className="room-image-link">
          View Room <span>↗</span>
        </a>
      </div>

      {/* Room Details */}
      <div className="room-details">
        <div className="room-title-row">
          <h3 className="room-name">{room.name}</h3>
          <div className="room-rating">★★★★★</div>
        </div>

        <div className="room-divider"></div>

        {/* Facilities */}
        <div className="room-facilities">
          {features.map((feature, index) => (
            <div className="room-facility" key={index}>
              <span className="facility-icon">✧</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <a href="#booking" className="room-book-button">
          <span>Book Now</span>
          <span className="room-book-arrow">→</span>
        </a>
      </div>
    </article>
  );
};

// ==========================================
// MAIN HOMEPAGE COMPONENT
// ==========================================

const HomepageThrd = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const current = sectionRef.current;
    if (current) observer.observe(current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`homepage-rooms ${visible ? "rooms-visible" : ""}`}
      ref={sectionRef}
    >
      {/* Heading */}
      <div className="rooms-heading">
        <div className="rooms-ornament">
          <span></span>
          <div>❧</div>
          <span></span>
        </div>

        <span className="rooms-subtitle">COME AND ENJOY</span>

        <h2>Choose Your Perfect Room &amp; Suites</h2>

        <p>
          Discover exceptional comfort, elegant interiors
          and unforgettable luxury experiences.
        </p>
      </div>

      {/* Grid: 4 cards on top row, 4 cards on bottom row */}
      <div className="rooms-grid">
        {rooms.map((room, index) => (
          <div
            className="room-card-entrance"
            key={room.id}
            style={{ transitionDelay: `${(index % 4) * 0.1 + Math.floor(index / 4) * 0.15}s` }}
          >
            <RoomCard room={room} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomepageThrd;