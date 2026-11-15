import React, { useEffect, useRef, useState } from "react";
import "./AboutSixth.css";

const statistics = [
  { id: 1, value: 635, decimals: 0, suffix: "+", label: "Luxury Rooms", duration: 2200 },
  { id: 2, value: 85, decimals: 0, suffix: "k+", label: "Happy Guests", duration: 2400 },
  { id: 3, value: 2.3, decimals: 1, suffix: "k+", label: "Five Star Ratings", duration: 2600 },
  { id: 4, value: 2.8, decimals: 1, suffix: "m", label: "Served Breakfast", duration: 2800 },
];

const formatNumber = (value, decimals) =>
  Number(value).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

const AboutSixth = () => {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [counts, setCounts] = useState(statistics.map(() => 0));

  /* Start when the section scrolls into view */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* Count-up animation */
  useEffect(() => {
    if (!started) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCounts(statistics.map((s) => s.value));
      return undefined;
    }

    const startTime = performance.now();
    const longest = Math.max(...statistics.map((s) => s.duration));
    let frame;

    const tick = (now) => {
      const elapsed = now - startTime;

      setCounts(
        statistics.map((s) => {
          const progress = Math.min(elapsed / s.duration, 1);
          return s.value * (1 - Math.pow(1 - progress, 4)); // smooth ease-out
        })
      );

      if (elapsed < longest) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started]);

  return (
    <section className="about-sixth" ref={sectionRef}>
      <div className="about-sixth__background" aria-hidden="true"></div>
      <div className="about-sixth__overlay" aria-hidden="true"></div>

      <div className="about-sixth__container">
        {statistics.map((item, index) => (
          <div
            className={`about-sixth__item ${
              started ? "about-sixth__item--visible" : ""
            }`}
            key={item.id}
            style={{ "--item-index": index }}
          >
            <h2
              className="about-sixth__number"
              aria-label={`${formatNumber(item.value, item.decimals)}${item.suffix}`}
            >
              <span aria-hidden="true">
                {formatNumber(counts[index], item.decimals)}
                <span className="about-sixth__suffix">{item.suffix}</span>
              </span>
            </h2>

            <p className="about-sixth__label">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSixth;