
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

        <span className="room-image-tag">
          Luxury Stay
        </span>

        <a href="#booking" className="room-image-link">
          View Room <span>↗</span>
        </a>

      </div>


      {/* Room Details */}

      <div className="room-details">

        <div className="room-price-row">

          <div className="room-price">

            <span className="price-amount">
              ₹{room.price.toLocaleString("en-IN")}
            </span>

            <span className="price-duration">
              /Per Night
            </span>

          </div>

          <div className="room-rating">
            ★★★★★
          </div>

        </div>


        <div className="room-divider"></div>


        <h3 className="room-name">
          {room.name}
        </h3>


        {/* Facilities */}

        <div className="room-facilities">

          {features.map((feature, index) => (

            <div className="room-facility" key={index}>

              <span className="facility-icon">
                ✧
              </span>

              <span>{feature}</span>

            </div>

          ))}

        </div>


        <p className="room-description">
          Experience a serene stay in our beautifully
          designed luxury room with exceptional comfort
          and premium hospitality.
        </p>


        <a href="#booking" className="room-book-button">

          <span>Book Now</span>

          <span className="room-book-arrow">
            →
          </span>

        </a>

      </div>

    </article>
  );
};


// ==========================================
// MAIN HOMEPAGE COMPONENT
// ==========================================

const HomepageThrd = () => {

  const [activeIndex, setActiveIndex] = useState(0);

  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const [visible, setVisible] = useState(false);

  const [paused, setPaused] = useState(false);

  const sectionRef = useRef(null);

  const resetRef = useRef(false);


  // Duplicate first four cards for seamless looping

  const sliderRooms = [
    ...rooms,
    ...rooms.slice(0, 4),
  ];


  // Scroll reveal animation

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {

        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }

      },
      { threshold: 0.15 }
    );

    const current = sectionRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => observer.disconnect();

  }, []);


  // Automatic one-card movement

  useEffect(() => {

    if (!visible || paused) return;

    const interval = setInterval(() => {

      setActiveIndex((prev) => {

        if (prev >= rooms.length) return prev;

        return prev + 1;

      });

    }, 3200);

    return () => clearInterval(interval);

  }, [visible, paused]);


  // Seamless infinite reset

  const handleTransitionEnd = (event) => {

    if (
      event.target !== event.currentTarget ||
      event.propertyName !== "transform"
    ) {
      return;
    }

    if (activeIndex === rooms.length) {

      resetRef.current = true;

      setTransitionEnabled(false);

      setActiveIndex(0);

    }

  };


  // Re-enable transition after invisible reset

  useEffect(() => {

    if (resetRef.current && activeIndex === 0) {

      requestAnimationFrame(() => {

        requestAnimationFrame(() => {

          setTransitionEnabled(true);

          resetRef.current = false;

        });

      });

    }

  }, [activeIndex]);


  return (

    <section
      className={`homepage-rooms ${
        visible ? "rooms-visible" : ""
      }`}
      ref={sectionRef}
    >


      {/* Heading */}

      <div className="rooms-heading">

        <div className="rooms-ornament">

          <span></span>

          <div>❧</div>

          <span></span>

        </div>

        <span className="rooms-subtitle">
          COME AND ENJOY
        </span>

        <h2>
          Choose Your Perfect Room &amp; Suites
        </h2>

        <p>
          Discover exceptional comfort, elegant interiors
          and unforgettable luxury experiences.
        </p>

      </div>


      {/* One Card Slider */}

      <div
        className="rooms-slider"

        onMouseEnter={() => setPaused(true)}

        onMouseLeave={() => setPaused(false)}

        onFocusCapture={() => setPaused(true)}

        onBlurCapture={(event) => {

          if (
            !event.currentTarget.contains(event.relatedTarget)
          ) {
            setPaused(false);
          }

        }}
      >

        <div

          className="rooms-slider-track"

          onTransitionEnd={handleTransitionEnd}

          style={{

            transform: `translateX(-${activeIndex * (100 / 12)}%)`,

            transition: transitionEnabled
              ? "transform 1.2s cubic-bezier(0.65, 0, 0.35, 1)"
              : "none",

          }}

        >

          {sliderRooms.map((room, index) => (

            <div

              className="room-card-entrance"

              key={`${room.id}-${index}`}

              style={{
                transitionDelay: `${(index % 4) * 0.1}s`,
              }}

            >

              <RoomCard room={room} />

            </div>

          ))}

        </div>

      </div>


      {/* Pagination */}

      <div className="rooms-pagination">

        <button
          className={`rooms-dot ${
            activeIndex < 4 ? "active" : ""
          }`}
          onClick={() => setActiveIndex(0)}
          aria-label="Show first room group"
        />

        <button
          className={`rooms-dot ${
            activeIndex >= 4 ? "active" : ""
          }`}
          onClick={() => setActiveIndex(4)}
          aria-label="Show second room group"
        />

      </div>

    </section>

  );

};

export default HomepageThrd;
