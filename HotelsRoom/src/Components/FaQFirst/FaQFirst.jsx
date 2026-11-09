
import React, { useEffect, useRef, useState } from "react";
import "./FaqFirst.css";

const faqItems = [
  {
    question: "What time is check-in and check-out?",
    answer:
      "Check-in is from 2:00 PM, and check-out is until 11:00 AM. Early check-in or late check-out is available upon request and subject to availability.",
  },
  {
    question: "Is breakfast included in the room rate?",
    answer:
      "Yes, a delightful breakfast experience is available with selected room packages. Enjoy a variety of freshly prepared dishes, seasonal fruits, and beverages to start your day.",
  },
  {
    question: "What activities are available at the resort?",
    answer:
      "Guests can enjoy swimming, nature walks, sightseeing, indoor games, relaxing spa experiences, and curated local excursions. Our team can help arrange activities during your stay.",
  },
  {
    question: "Can I cancel or change my booking?",
    answer:
      "Yes, booking changes and cancellations are possible depending on your selected reservation policy. Please contact our reservations team for assistance with your booking.",
  },
];

const FaqFirst = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("faq-first-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faq-first" ref={sectionRef}>
      <div className="faq-first-container">

        {/* LEFT IMAGE SECTION */}
        <div className="faq-first-visual">

          <div className="faq-first-image">
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=90"
              alt="Luxury tropical resort swimming pool"
            />
            <div className="faq-first-image-overlay"></div>
          </div>

          {/* FLOATING ROOM SERVICE CARD */}
          <div className="faq-first-service-card">
            <div className="faq-first-card-heading">
              24/7 Room Services
            </div>

            <span className="faq-first-card-line"></span>

            <div className="faq-first-service-list">

              <div className="faq-first-service-item">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9S14.5 18.5 12 21M12 3c-2.5 2.5-3.5 5.5-3.5 9s1 6.5 3.5 9"/>
                </svg>
                <span>Global Escapes</span>
              </div>

              <div className="faq-first-service-item">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M3 21V8l9-5 9 5v13M8 21v-7h8v7M7 9h2m6 0h2M7 12h2m6 0h2"/>
                </svg>
                <span>Executive Room</span>
              </div>

              <div className="faq-first-service-item">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M3 11.5 12 4l9 7.5M5 10v11h14V10M10 21v-7h4v7"/>
                </svg>
                <span>Twin Room</span>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT FAQ SECTION */}
        <div className="faq-first-content">

          <div className="faq-first-heading">

            <div className="faq-first-decoration">
              <span></span>
              <div className="faq-first-ornament">❧</div>
              <span></span>
            </div>

            <p className="faq-first-subtitle">QUICK ANSWERS</p>

            <h2>
              Everything You Need to Know
            </h2>

          </div>

          {/* ACCORDION */}
          <div className="faq-first-accordion">

            {faqItems.map((item, index) => (
              <div
                className={`faq-first-item ${
                  activeIndex === index ? "faq-first-item-active" : ""
                }`}
                key={index}
              >

                <button
                  className="faq-first-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={activeIndex === index}
                >
                  <span>{item.question}</span>

                  <svg
                    className="faq-first-chevron"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="m5 9 7 7 7-7" />
                  </svg>
                </button>

                <div
                  className={`faq-first-answer-wrapper ${
                    activeIndex === index ? "faq-first-answer-open" : ""
                  }`}
                >
                  <div className="faq-first-answer">
                    {item.answer}
                  </div>
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
};

export default FaqFirst;
