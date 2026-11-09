
import React, { useEffect, useRef, useState } from "react";
import "./OurClients.css";

const clients = [
  {
    id: 1,
    name: "Olivia Anderson",
    role: "Luxury Travel Guest",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=90",
    rating: 5,
    review:
      "An absolutely wonderful experience. The hospitality, beautifully designed rooms and attention to every little detail made our stay truly unforgettable.",
    location: "London, United Kingdom",
  },
  {
    id: 2,
    name: "James Mitchell",
    role: "Business Traveller",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=90",
    rating: 5,
    review:
      "From the moment I arrived, everything was exceptional. The staff were professional, the rooms were immaculate and the service exceeded expectations.",
    location: "New York, USA",
  },
  {
    id: 3,
    name: "Sophia Williams",
    role: "Family Vacation Guest",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&q=90",
    rating: 5,
    review:
      "Our family had an amazing stay. The atmosphere was peaceful, the dining experience was fantastic and the entire team made us feel at home.",
    location: "Dubai, UAE",
  },
  {
    id: 4,
    name: "Alexander Brown",
    role: "International Guest",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=90",
    rating: 5,
    review:
      "A perfect combination of elegance and comfort. Every member of the team made an effort to make our experience special. We will definitely return.",
    location: "Toronto, Canada",
  },
  {
    id: 5,
    name: "Isabella Martin",
    role: "Premium Suite Guest",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&q=90",
    rating: 5,
    review:
      "The interiors, peaceful surroundings and thoughtful hospitality were outstanding. This is easily one of the finest hotel experiences we have enjoyed.",
    location: "Paris, France",
  },
];

const OurClients = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % clients.length);
  };

  const previousSlide = () => {
    setActiveIndex((prev) => (prev - 1 + clients.length) % clients.length);
  };

  const visibleClients = [
    clients[activeIndex],
    clients[(activeIndex + 1) % clients.length],
    clients[(activeIndex + 2) % clients.length],
  ];

  return (
    <section
      className={`our-clients ${visible ? "our-clients--visible" : ""}`}
      ref={sectionRef}
    >
      {/* Decorative background */}
      <div className="our-clients__background-circle our-clients__background-circle--one"></div>
      <div className="our-clients__background-circle our-clients__background-circle--two"></div>

      <div className="our-clients__container">
        {/* SECTION HEADING */}
        <div className="our-clients__heading">
          <div className="our-clients__ornament">
            <span></span>
            <span className="our-clients__ornament-icon">❧</span>
            <span></span>
          </div>

          <p className="our-clients__eyebrow">OUR HAPPY CLIENTS</p>

          <h2>
            What Our Guests
            <span> Say About Us</span>
          </h2>

          <p className="our-clients__subtitle">
            Beautiful experiences, unforgettable memories and heartfelt
            stories from the guests who make our hotel special.
          </p>

          <div className="our-clients__heading-line"></div>
        </div>

        {/* TRUST STATISTICS */}
        <div className="our-clients__stats">
          <div className="our-clients__stat">
            <div className="our-clients__stat-icon">★</div>
            <div>
              <h3>4.9<span>/5</span></h3>
              <p>Guest Satisfaction</p>
            </div>
          </div>

          <div className="our-clients__stat-divider"></div>

          <div className="our-clients__stat">
            <div className="our-clients__stat-icon">♡</div>
            <div>
              <h3>98<span>%</span></h3>
              <p>Happy Guests</p>
            </div>
          </div>

          <div className="our-clients__stat-divider"></div>

          <div className="our-clients__stat">
            <div className="our-clients__stat-icon">✦</div>
            <div>
              <h3>1200<span>+</span></h3>
              <p>Guest Experiences</p>
            </div>
          </div>
        </div>

        {/* TESTIMONIAL CARDS */}
        <div className="our-clients__cards">
          {visibleClients.map((client, index) => (
            <article
              className="our-clients__card"
              key={client.id}
              style={{ "--client-index": index }}
            >
              <div className="our-clients__card-top">
                <div className="our-clients__quote-mark">“</div>

                <div className="our-clients__stars" aria-label={`${client.rating} out of 5 stars`}>
                  {"★".repeat(client.rating)}
                </div>
              </div>

              <p className="our-clients__review">
                {client.review}
              </p>

              <div className="our-clients__card-bottom">
                <div className="our-clients__client-info">
                  <div className="our-clients__avatar">
                    <img src={client.image} alt={client.name} loading="lazy" />
                  </div>

                  <div className="our-clients__client-details">
                    <h3>{client.name}</h3>
                    <p>{client.role}</p>
                  </div>
                </div>

                <div className="our-clients__verified" title="Guest testimonial">
                  <span>✓</span>
                </div>
              </div>

              <div className="our-clients__location">
                <span>⌖</span>
                {client.location}
              </div>

              <div className="our-clients__card-decoration"></div>
            </article>
          ))}
        </div>

        {/* SLIDER CONTROLS */}
        <div className="our-clients__controls">
          <div className="our-clients__dots">
            {clients.map((client, index) => (
              <button
                key={client.id}
                className={`our-clients__dot ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show testimonial ${index + 1}`}
                aria-current={activeIndex === index ? "true" : undefined}
              />
            ))}
          </div>

          <div className="our-clients__arrows">
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous testimonials"
            >
              <span>←</span>
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next testimonials"
            >
              <span>→</span>
            </button>
          </div>
        </div>

        {/* BOTTOM MESSAGE */}
        <div className="our-clients__bottom">
          <span></span>
          <p>YOUR COMFORT IS OUR GREATEST REWARD</p>
          <span></span>
        </div>
      </div>
    </section>
  );
};

export default OurClients;
