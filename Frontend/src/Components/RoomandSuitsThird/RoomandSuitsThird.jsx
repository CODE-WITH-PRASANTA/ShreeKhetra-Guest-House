
import React, { useEffect, useRef, useState } from "react";
import "./RoomandSuitsThird.css";

const RoomandSuitsThird = () => {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const statistics = [
    {
      target: 635,
      suffix: "+",
      label: "Luxury Rooms",
      format: (value) => Math.floor(value).toLocaleString("en-IN"),
    },
    {
      target: 85,
      suffix: "k+",
      label: "Happy Guest",
      format: (value) => Math.floor(value),
    },
    {
      target: 2.3,
      suffix: "k+",
      label: "Five Star Ratings",
      format: (value) => value.toFixed(1),
    },
    {
      target: 2.8,
      suffix: "m",
      label: "Served Breakfast",
      format: (value) => value.toFixed(1),
    },
  ];

  const startAnimation = () => {
    setStarted((previous) => {
      if (previous) return previous;
      return true;
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const duration = 2200;
    const startTime = performance.now();
    let animationFrame;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 4);

      setCounts(
        statistics.map((item) => item.target * easeOut)
      );

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [started]);

  return (
    <section
      className="RoomSuitsThird-section"
      ref={sectionRef}
      onMouseEnter={startAnimation}
      onTouchStart={startAnimation}
      onFocusCapture={startAnimation}
      onClick={startAnimation}
      aria-label="Hotel achievements and statistics"
    >
      <div className="RoomSuitsThird-overlay"></div>

      <div className="RoomSuitsThird-container">
        <div className="RoomSuitsThird-grid">
          {statistics.map((item, index) => (
            <div
              className="RoomSuitsThird-item"
              key={item.label}
              style={{ "--item-index": index }}
            >
              <div className="RoomSuitsThird-number">
                {item.format(counts[index])}
                {item.suffix}
              </div>

              <h3 className="RoomSuitsThird-label">
                {item.label}
              </h3>

              <div className="RoomSuitsThird-line"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomandSuitsThird;
