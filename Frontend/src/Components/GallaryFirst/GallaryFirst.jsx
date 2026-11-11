
import React, { useEffect, useRef, useState } from "react";
import "./GallaryFirst.css";

const galleryImages = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=85",
    title: "Luxury Deluxe Room",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85",
    title: "Elegant Modern Suite",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
    title: "Premium Living Suite",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=85",
    title: "Presidential Bedroom",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=1000&q=85",
    title: "Luxury Comfort Room",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=1000&q=85",
    title: "Contemporary Suite",
  },
];

const GallaryFirst = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`GallaryFirst-section ${
        visible ? "GallaryFirst-visible" : ""
      }`}
      ref={sectionRef}
    >
      <div className="GallaryFirst-container">

        {/* Section Heading */}
        <div className="GallaryFirst-heading">

          <div className="GallaryFirst-heading-left">
            <div className="GallaryFirst-decoration">
              <span></span>
              <span className="GallaryFirst-ornament">❧</span>
              <span></span>
            </div>

            <p className="GallaryFirst-subtitle">
              GALLERY PHOTOS
            </p>

            <h2>
              Our Modern Spaces
            </h2>
          </div>

          <div className="GallaryFirst-heading-right">
            <p>
              Take a visual tour of our beautifully designed rooms,
              serene amenities, and stylish modern home interiors.
              Every detail is crafted to offer you the ultimate in
              comfort and elegance.
            </p>
          </div>

        </div>

        {/* Gallery Grid */}
        <div className="GallaryFirst-grid">

          {galleryImages.map((item, index) => (
            <div
              className={`GallaryFirst-card GallaryFirst-card-${item.id}`}
              key={item.id}
              style={{ "--delay": `${index * 120}ms` }}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
              />

              <div className="GallaryFirst-overlay">
                <div className="GallaryFirst-overlay-content">
                  <span className="GallaryFirst-overlay-line"></span>
                  <h3>{item.title}</h3>
                  <p>Luxury & Comfort</p>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default GallaryFirst;
