
import React, { useEffect, useRef, useState } from "react";
import "./HomepageSeventh.css";

const testimonials = [
  {
    id: 1,
    name: "Brooklyn Simmons",
    role: "CEO, AB Tech",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "I was here for a conference, but it felt more like a vacation. The meeting facilities were top notch, and I still had time to relax by the pool. Best business trip ever!",
  },
  {
    id: 2,
    name: "Sarah Taylor",
    role: "CEO, AB Tech",
    image: "https://i.pravatar.cc/150?img=47",
    review:
      "The rooms were beautiful, the staff was incredibly welcoming, and every detail was thoughtfully arranged. I had a wonderful and relaxing stay.",
  },
  {
    id: 3,
    name: "Amanda Nicole",
    role: "CEO, AB Tech",
    image: "https://i.pravatar.cc/150?img=11",
    review:
      "A truly memorable experience! The hospitality was excellent, the food was delicious, and the peaceful atmosphere made our vacation unforgettable.",
  },
  {
    id: 4,
    name: "Brooklyn Simmons",
    role: "CEO, AB Tech",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "I was here for a conference, but it felt more like a vacation. The meeting facilities were top notch, and I still had time to relax by the pool. Best business trip ever!",
  },
  {
    id: 5,
    name: "Michael Anderson",
    role: "Business Consultant",
    image: "https://i.pravatar.cc/150?img=13",
    review:
      "From check-in to checkout, everything was perfect. The rooms were spotless, the service was outstanding, and the staff made us feel at home.",
  },
  {
    id: 6,
    name: "Emily Johnson",
    role: "Travel Blogger",
    image: "https://i.pravatar.cc/150?img=44",
    review:
      "Such a lovely property with amazing hospitality. The comfortable rooms and beautiful surroundings made this one of my favourite hotel stays.",
  },
  {
    id: 7,
    name: "David Wilson",
    role: "Entrepreneur",
    image: "https://i.pravatar.cc/150?img=14",
    review:
      "Excellent service, comfortable accommodation, and a peaceful environment. I would definitely recommend this hotel to friends and colleagues.",
  },
  {
    id: 8,
    name: "Sophia Martin",
    role: "Designer",
    image: "https://i.pravatar.cc/150?img=49",
    review:
      "Everything exceeded my expectations. The atmosphere was relaxing, the staff were friendly, and the entire experience felt truly special.",
  },
];

const QuoteIcon = () => (
  <svg
    viewBox="0 0 55 45"
    className="testimonial-quote-icon"
    aria-hidden="true"
  >
    <path
      d="M22 4C9 4 3 14 3 26v15h19V22H13c0-7 3-10 9-11V4Zm29 0C38 4 32 14 32 26v15h19V22H42c0-7 3-10 9-11V4Z"
      fill="currentColor"
    />
  </svg>
);

const TestimonialCard = ({ item }) => (
  <article className="testimonial-card">
    <div className="testimonial-card-top">
      <QuoteIcon />

      <div className="testimonial-stars" aria-label="5 out of 5 stars">
        ★★★★★
      </div>
    </div>

    <p className="testimonial-review">{item.review}</p>

    <div className="testimonial-user">
      <img src={item.image} alt={item.name} loading="lazy" />

      <div className="testimonial-user-info">
        <h3>{item.name}</h3>
        <p>{item.role}</p>
      </div>
    </div>
  </article>
);

const HomepageSeventh = () => {
  const viewportRef = useRef(null);
  const timerRef = useRef(null);
  const indexRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [isPaused, setIsPaused] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const totalCards = testimonials.length;
  const gap = 24;

  // Responsive card width calculation
  useEffect(() => {
    const updateDimensions = () => {
      if (!viewportRef.current) return;

      const width = viewportRef.current.clientWidth;
      const screenWidth = window.innerWidth;

      let visible = 4;

      if (screenWidth <= 600) {
        visible = 1;
      } else if (screenWidth <= 1000) {
        visible = 2;
      }

      setVisibleCards(visible);
      setCardWidth((width - gap * (visible - 1)) / visible);
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);

    if (viewportRef.current) {
      resizeObserver.observe(viewportRef.current);
    }

    window.addEventListener("resize", updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Keep index in sync
  useEffect(() => {
    indexRef.current = activeIndex;
  }, [activeIndex]);

  // Automatic one-card-at-a-time movement
  useEffect(() => {
    if (isPaused || !cardWidth) return;

    timerRef.current = setTimeout(() => {
      setActiveIndex((previous) => previous + 1);
    }, 2000);

    return () => clearTimeout(timerRef.current);
  }, [activeIndex, isPaused, cardWidth]);

  // Seamless infinite loop
  const handleTransitionEnd = () => {
    if (activeIndex >= totalCards) {
      setTransitionEnabled(false);
      setActiveIndex(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }
  };

  // Duplicate enough cards for the infinite loop
  const displayCards = [
    ...testimonials,
    ...testimonials.slice(0, visibleCards),
  ];

  const translateX = activeIndex * (cardWidth + gap);

  return (
    <section className="homepage-testimonials">
      <div className="testimonial-container">

        {/* SECTION HEADING */}
        <div className="testimonial-heading">
          <div className="testimonial-ornament">
            <span>✦</span>
            <i></i>
            <span>❧</span>
            <i></i>
            <span>✦</span>
          </div>

          <p className="testimonial-subtitle">TESTIMONIAL</p>

          <h2>
            Our Valuable Customers
            <br />
            ratings &amp; Reviews
          </h2>
        </div>

        {/* TESTIMONIAL SLIDER */}
        <div
          className="testimonial-viewport"
          ref={viewportRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div
            className="testimonial-track"
            onTransitionEnd={handleTransitionEnd}
            style={{
              gap: `${gap}px`,
              transform: `translateX(-${translateX}px)`,
              transition: transitionEnabled
                ? "transform 850ms cubic-bezier(0.65, 0, 0.35, 1)"
                : "none",
            }}
          >
            {displayCards.map((item, index) => (
              <div
                className="testimonial-slide"
                key={`${item.id}-${index}`}
                style={{
                  width: `${cardWidth}px`,
                  flex: `0 0 ${cardWidth}px`,
                }}
              >
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HomepageSeventh;
