import React from "react";
import "./AboutEight.css";

const testimonials = [
  {
    id: 1,
    name: "Brooklyn Simmons",
    role: "Luxury Guest",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=85",
    rating: 5,
    message:
      "An absolutely unforgettable experience. The rooms were elegant, the atmosphere was peaceful, and every detail felt thoughtfully designed. The hospitality made our stay truly special.",
  },
  {
    id: 2,
    name: "Sarah Taylor",
    role: "Resort Guest",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=85",
    rating: 5,
    message:
      "A beautiful escape from everyday life. The luxurious interiors, warm welcome, and exceptional service made our vacation feel like a dream. We cannot wait to return.",
  },
  {
    id: 3,
    name: "James Anderson",
    role: "Business Traveler",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=85",
    rating: 5,
    message:
      "Perfectly located and beautifully maintained. Everything was comfortable, peaceful, and exceptionally clean. The team made our business trip feel effortless.",
  },
  {
    id: 4,
    name: "Emily Wilson",
    role: "Vacation Guest",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=85",
    rating: 5,
    message:
      "The most relaxing stay we have had in years. The beautiful surroundings, thoughtful service, and comfortable rooms created the perfect luxury getaway.",
  },
  {
    id: 5,
    name: "Michael Roberts",
    role: "Premium Guest",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=85",
    rating: 5,
    message:
      "Exceptional hospitality from beginning to end. Every corner feels sophisticated, and the staff genuinely care about making guests feel welcome. Highly recommended.",
  },
];

/* ---------- Icons ---------- */
const StarIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
    <path
      d="m12 2.8 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.6l-5.8 3.1 1.1-6.5L2.6 9.6l6.5-.9L12 2.8z"
      fill="currentColor"
    />
  </svg>
);

const QuoteIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path
      d="M7.2 6C4.9 7.2 3.5 9.4 3.5 12.3V18h6.1v-6H6.4c.1-1.6.9-2.7 2.3-3.4L7.2 6zm9.5 0c-2.3 1.2-3.7 3.4-3.7 6.3V18h6.1v-6h-3.2c.1-1.6.9-2.7 2.3-3.4L16.7 6z"
      fill="currentColor"
    />
  </svg>
);

/* ---------- Single card ---------- */
const TestimonialCard = ({ testimonial }) => {
  return (
    <article className="about-eight-card">
      {/* big faint quote in the corner */}
      <span className="about-eight-ghost" aria-hidden="true">
        ”
      </span>

      <div className="about-eight-card-top">
        <span className="about-eight-quote" aria-hidden="true">
          <QuoteIcon />
        </span>

        <div
          className="about-eight-stars"
          role="img"
          aria-label={`${testimonial.rating} out of 5 stars`}
        >
          {Array.from({ length: testimonial.rating }, (_, index) => (
            <span key={index}>
              <StarIcon />
            </span>
          ))}
        </div>
      </div>

      <p className="about-eight-message">{testimonial.message}</p>

      <span className="about-eight-divider" aria-hidden="true"></span>

      <div className="about-eight-author">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          width="52"
          height="52"
          loading="lazy"
        />

        <div className="about-eight-author-info">
          <h3>{testimonial.name}</h3>
          <span>{testimonial.role}</span>
        </div>
      </div>
    </article>
  );
};

/* ---------- Section ---------- */
const AboutEight = () => {
  return (
    <section className="about-eight-section">
      {/* Decorative background */}
      <div className="about-eight-pattern" aria-hidden="true"></div>
      <span className="about-eight-glow about-eight-glow--teal" aria-hidden="true"></span>
      <span className="about-eight-glow about-eight-glow--gold" aria-hidden="true"></span>

      {/* Section Heading */}
      <div className="about-eight-heading">
        <span className="about-eight-subtitle">
          <span className="about-eight-subtitle-dot" aria-hidden="true"></span>
          TESTIMONIAL
        </span>

        <h2>Check Our Client Feedback</h2>

        <span className="about-eight-title-line" aria-hidden="true"></span>

        <p className="about-eight-heading-description">
          Discover the unforgettable experiences of our valued guests.
        </p>
      </div>

      {/* Infinite Testimonial Slider */}
      <div className="about-eight-slider" aria-label="Guest testimonials">
        <div className="about-eight-track">
          {/* First group */}
          <div className="about-eight-group">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/* Duplicate group for seamless infinite scrolling */}
          <div className="about-eight-group" aria-hidden="true">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={`duplicate-${testimonial.id}`}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutEight;