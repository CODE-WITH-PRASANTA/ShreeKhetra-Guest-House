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

const TestimonialCard = ({ testimonial }) => {
  return (
    <article className="about-eight-card">
      <div className="about-eight-card-top">
        <span className="about-eight-quote" aria-hidden="true">
          “
        </span>

        <div
          className="about-eight-stars"
          aria-label={`${testimonial.rating} out of 5 stars`}
        >
          {Array.from({ length: testimonial.rating }, (_, index) => (
            <span key={index}>★</span>
          ))}
        </div>
      </div>

      <p className="about-eight-message">
        {testimonial.message}
      </p>

      <div className="about-eight-author">
        <img
          src={testimonial.image}
          alt={testimonial.name}
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

const AboutEgiht = () => {
  return (
    <section className="about-eight-section">
      {/* Section Heading */}
      <div className="about-eight-heading">
        <div className="about-eight-decoration">
          <span></span>
          <i aria-hidden="true">❧</i>
          <span></span>
        </div>

        <span className="about-eight-subtitle">
          TESTIMONIAL
        </span>

        <h2>Check Our Client Feedback</h2>

        <p className="about-eight-heading-description">
          Discover the unforgettable experiences of our valued guests.
        </p>
      </div>

      {/* Infinite Testimonial Slider */}
      <div
        className="about-eight-slider"
        aria-label="Guest testimonials"
      >
        <div className="about-eight-track">
          {/* First group */}
          <div className="about-eight-group">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
              />
            ))}
          </div>

          {/* Duplicate group for seamless infinite scrolling */}
          <div
            className="about-eight-group"
            aria-hidden="true"
          >
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

export default AboutEgiht;