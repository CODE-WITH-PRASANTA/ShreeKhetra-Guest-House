
import React, { useEffect, useState } from "react";
import "./AboutSecond.css";

const hotelPhotos = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&q=85",
    alt: "Luxury resort swimming pool",
    title: "Luxury Resort",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1000&q=85",
    alt: "Beautiful tropical hotel exterior",
    title: "Tropical Escape",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1000&q=85",
    alt: "Elegant luxury hotel bedroom",
    title: "Luxury Rooms",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1000&q=85",
    alt: "Premium hotel suite",
    title: "Premium Suites",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1000&q=85",
    alt: "Beautiful luxury hotel",
    title: "Grand Hospitality",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=1000&q=85",
    alt: "Resort swimming pool and relaxation",
    title: "Relaxing Stay",
  },
];

const AboutSecond = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= hotelPhotos.length) {
          setIsResetting(true);
          return 0;
        }

        setIsResetting(false);
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isResetting) {
      const timeout = setTimeout(() => {
        setIsResetting(false);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [isResetting]);

  const repeatedPhotos = [...hotelPhotos, ...hotelPhotos];

  return (
    <section className="about-second">

      <div className="about-second__carousel">

        <div
          className={`about-second__track ${
            isResetting ? "about-second__track--reset" : ""
          }`}
          style={{
            transform: `translate3d(calc(var(--about-second-step) * -${currentIndex}), 0, 0)`,
          }}
        >
          {repeatedPhotos.map((photo, index) => (
            <div
              className="about-second__slide"
              key={`${photo.id}-${index}`}
            >
              <div className="about-second__image-wrapper">

                <img
                  src={photo.image}
                  alt={photo.alt}
                  className="about-second__image"
                  loading={index < 4 ? "eager" : "lazy"}
                />

                <div className="about-second__overlay">
                  <span>{photo.title}</span>
                  <div className="about-second__overlay-line"></div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};

export default AboutSecond;
