
import React, { useEffect, useRef, useState } from "react";
import "./HomepageEighth.css";

const galleryImages = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=85",
    title: "Luxury Bedroom",
    category: "Guest Rooms",
    className: "gallery-item-one",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=85",
    title: "Elegant Interior",
    category: "Luxury Living",
    className: "gallery-item-two",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
    title: "Modern Living Space",
    category: "Hotel Interiors",
    className: "gallery-item-three",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1400&q=85",
    title: "Premium Suite",
    category: "Luxury Rooms",
    className: "gallery-item-four",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=85",
    title: "Comfortable Stay",
    category: "Guest Rooms",
    className: "gallery-item-five",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85",
    title: "Contemporary Suite",
    category: "Hotel Interiors",
    className: "gallery-item-six",
  },
];

const HomepageEighth = () => {
  const sectionRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Reveal gallery when it enters the screen
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("gallery-visible");
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Close image preview with Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }

      if (event.key === "ArrowRight" && selectedImage) {
        const currentIndex = galleryImages.findIndex(
          (item) => item.id === selectedImage.id
        );

        const nextIndex = (currentIndex + 1) % galleryImages.length;
        setSelectedImage(galleryImages[nextIndex]);
      }

      if (event.key === "ArrowLeft" && selectedImage) {
        const currentIndex = galleryImages.findIndex(
          (item) => item.id === selectedImage.id
        );

        const previousIndex =
          (currentIndex - 1 + galleryImages.length) %
          galleryImages.length;

        setSelectedImage(galleryImages[previousIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <section className="homepage-gallery" ref={sectionRef}>
      <div className="gallery-container">

        {/* GALLERY HEADER */}
        <div className="gallery-header">

          <div className="gallery-heading">
            <div className="gallery-ornament">
              <span>✦</span>
              <i></i>
              <span>❧</span>
              <i></i>
              <span>✦</span>
            </div>

            <p className="gallery-subtitle">GALLERY PHOTOS</p>

            <h2>Our Modern Spaces</h2>
          </div>

          <div className="gallery-description">
            <p>
              Take a visual tour of our beautifully designed rooms,
              serene amenities, and stylish modern home interiors.
              Every detail is crafted to offer you the ultimate in
              comfort and elegance.
            </p>
          </div>

        </div>

        {/* GALLERY GRID */}
        <div className="gallery-grid">
          {galleryImages.map((item, index) => (
            <div
              className={`gallery-item ${item.className}`}
              key={item.id}
              style={{ "--gallery-delay": `${index * 120}ms` }}
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
              />

              <div className="gallery-image-overlay">
                <div className="gallery-image-info">
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                </div>

                <div className="gallery-zoom-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                    <path d="M11 8v6M8 11h6" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* IMAGE LIGHTBOX */}
        {selectedImage && (
          <div
            className="gallery-lightbox"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="gallery-lightbox-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image preview"
            >
              ×
            </button>

            <button
              className="gallery-lightbox-prev"
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();

                const currentIndex = galleryImages.findIndex(
                  (item) => item.id === selectedImage.id
                );

                const previousIndex =
                  (currentIndex - 1 + galleryImages.length) %
                  galleryImages.length;

                setSelectedImage(galleryImages[previousIndex]);
              }}
            >
              &#10094;
            </button>

            <div
              className="gallery-lightbox-content"
              onClick={(event) => event.stopPropagation()}
            >
              <img src={selectedImage.image} alt={selectedImage.title} />

              <div className="gallery-lightbox-caption">
                <span>{selectedImage.category}</span>
                <h3>{selectedImage.title}</h3>
              </div>
            </div>

            <button
              className="gallery-lightbox-next"
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation();

                const currentIndex = galleryImages.findIndex(
                  (item) => item.id === selectedImage.id
                );

                const nextIndex =
                  (currentIndex + 1) % galleryImages.length;

                setSelectedImage(galleryImages[nextIndex]);
              }}
            >
              &#10095;
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default HomepageEighth;
