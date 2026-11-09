
import React, { useEffect, useRef, useState } from "react";
import "./AboutSixth.css";

const statistics = [
  {
    id: 1,
    value: 635,
    suffix: "+",
    label: "Luxury Rooms",
    duration: 2200,
  },
  {
    id: 2,
    value: 85,
    suffix: "k+",
    label: "Happy Guest",
    duration: 2400,
  },
  {
    id: 3,
    value: 2.3,
    suffix: "k+",
    label: "Five Star Ratings",
    duration: 2600,
  },
  {
    id: 4,
    value: 2.8,
    suffix: "m",
    label: "Served Breakfast",
    duration: 2800,
  },
];

const AboutSixth = () => {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [counts, setCounts] = useState(statistics.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const animationFrames = [];

    statistics.forEach((item, index) => {
      const startTime = performance.now();
      const duration = item.duration;

      const animate = (currentTime) => {
        const progress = Math.min(
          (currentTime - startTime) / duration,
          1
        );

        // Smooth ease-out animation
        const easedProgress = 1 - Math.pow(1 - progress, 4);

        const currentValue = item.value * easedProgress;

        setCounts((previous) => {
          const updated = [...previous];
          updated[index] = currentValue;
          return updated;
        });

        if (progress < 1) {
          animationFrames[index] = requestAnimationFrame(animate);
        }
      };

      animationFrames[index] = requestAnimationFrame(animate);
    });

    return () => {
      animationFrames.forEach((frame) => cancelAnimationFrame(frame));
    };
  }, [started]);

  const formatNumber = (value, index) => {
    if (index === 0) {
      return Math.floor(value).toLocaleString("en-US");
    }

    return value.toFixed(1);
  };

  return (
    <section className="about-sixth" ref={sectionRef}>
      <div className="about-sixth__background"></div>
      <div className="about-sixth__overlay"></div>

      <div className="about-sixth__container">
        {statistics.map((item, index) => (
          <div
            className={`about-sixth__item ${
              started ? "about-sixth__item--visible" : ""
            }`}
            key={item.id}
            style={{ "--item-index": index }}
          >
            <h2 className="about-sixth__number">
              {formatNumber(counts[index], index)}
              {item.suffix}
            </h2>

            <p className="about-sixth__label">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSixth;
