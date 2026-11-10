import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RoomandSuitsSecond.css";

const rooms = [
  {
    id: 1,
    title: "Royal Prestige Suite",
    price: "₹12,500",
    period: "Per Night",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85",
    description:
      "Experience timeless elegance with a royal bedroom, luxurious interiors, and exceptional comfort.",
    features: ["King Bed", "Private Balcony", "Luxury Bath"],
    category: "Luxury Room",
    rating: 5,
    area: "350 sqm",
    beds: "1 King Bed",
    bathrooms: "2 Bathrooms",
  },
  {
    id: 2,
    title: "Exclusive Weekend Getaway",
    price: "₹9,500",
    period: "Per Night",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85",
    description:
      "A peaceful escape featuring premium bedding, beautiful views, and intimate luxury.",
    features: ["King Bed", "City View", "Breakfast"],
    category: "Luxury Room",
    rating: 5,
    area: "250 sqm",
    beds: "3 Beds",
    bathrooms: "3 Bathrooms",
  },
  {
    id: 3,
    title: "Deluxe Family Rooms",
    price: "₹8,000",
    period: "Per Night",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
    description:
      "Spacious accommodation designed for families with elegant interiors and relaxing surroundings.",
    features: ["Family Space", "Twin Bed", "Garden View"],
    category: "Deluxe Room",
    rating: 5,
    area: "180 sqm",
    beds: "2 Beds",
    bathrooms: "2 Bathrooms",
  },
  {
    id: 4,
    title: "Luxury Signature Suites",
    price: "₹15,000",
    period: "Per Night",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
    description:
      "Discover sophisticated living with premium furnishings, spacious interiors, and exclusive amenities.",
    features: ["Luxury Suite", "Living Area", "Premium Bath"],
    category: "Suits Room",
    rating: 5,
    area: "300 sqm",
    beds: "2 King Beds",
    bathrooms: "3 Bathrooms",
  },
  {
    id: 5,
    title: "Signature Suites Room",
    price: "₹11,000",
    period: "Per Night",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    description:
      "Relax in a beautifully designed suite featuring contemporary furniture and elegant details.",
    features: ["King Bed", "Lounge Area", "Private Terrace"],
    category: "Suits Room",
    rating: 5,
    area: "220 sqm",
    beds: "1 King Bed",
    bathrooms: "2 Bathrooms",
  },
  {
    id: 6,
    title: "Executive Comfort Room",
    price: "₹7,500",
    period: "Per Night",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85",
    description:
      "A refined retreat offering modern comfort, thoughtful amenities, and a calm atmosphere.",
    features: ["Work Desk", "King Bed", "Wi-Fi"],
    category: "Luxury Room",
    rating: 5,
    area: "160 sqm",
    beds: "1 King Bed",
    bathrooms: "1 Bathroom",
  },
  {
    id: 7,
    title: "Tropical Garden Room",
    price: "₹9,000",
    period: "Per Night",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    description:
      "Enjoy a refreshing stay surrounded by natural beauty, warm interiors, and peaceful garden views.",
    features: ["Garden View", "King Bed", "Private Balcony"],
    category: "Twine Rooms",
    rating: 5,
    area: "200 sqm",
    beds: "2 Beds",
    bathrooms: "2 Bathrooms",
  },
  {
    id: 8,
    title: "Exclusive Deluxe Room",
    price: "₹10,500",
    period: "Per Night",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=85",
    description:
      "An elegant deluxe experience with luxurious finishes, ambient lighting, and premium comfort.",
    features: ["Luxury Interior", "King Bed", "Premium Amenities"],
    category: "Deluxe Room",
    rating: 5,
    area: "190 sqm",
    beds: "1 King Bed",
    bathrooms: "2 Bathrooms",
  },
];

const filters = [
  "Show All",
  "Luxury Room",
  "Suits Room",
  "Deluxe Room",
  "Twine Rooms",
];

const RoomandSuitsSecond = () => {
  const [activeFilter, setActiveFilter] = useState("Show All");
  const [currentPage, setCurrentPage] = useState(1);

  const roomsPerPage = 8;

  const filteredRooms =
    activeFilter === "Show All"
      ? rooms
      : rooms.filter((room) => room.category === activeFilter);

  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

  const currentRooms = filteredRooms.slice(
    (currentPage - 1) * roomsPerPage,
    currentPage * roomsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  return (
    <section className="room-suits-second">
      <div className="room-suits-second-container">
        {/* SECTION HEADING */}

        <div className="room-suits-second-heading">
          <span className="room-suits-second-heading-decoration">
            ───── ❧ ─────
          </span>

          <span className="room-suits-second-subtitle">
            LUXURY COMFORT
          </span>

          <h2>Featured Rooms &amp; Suits</h2>
        </div>

        {/* FILTER BUTTONS */}

        <div className="room-suits-second-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`room-suits-second-filter ${
                activeFilter === filter ? "active" : ""
              }`}
              onClick={() => {
                setActiveFilter(filter);
                setCurrentPage(1);
              }}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* ROOM GRID */}

        <div className="room-suits-second-grid">
          {currentRooms.map((room) => (
            <article
              className="room-suits-second-card"
              key={room.id}
            >
              {/* ROOM IMAGE */}

              <img
                src={room.image}
                alt={room.title}
                className="room-suits-second-image"
                loading="lazy"
              />

              {/* IMAGE OVERLAY */}

              <div className="room-suits-second-image-overlay" />

              {/* ROOM INFORMATION */}

              <div className="room-suits-second-info">
                {/* CATEGORY */}

                <span className="room-suits-second-category">
                  {room.category}
                </span>

                {/* RATING */}

                <div
                  className="room-suits-second-rating"
                  aria-label={`${room.rating} out of 5 stars`}
                >
                  {"★".repeat(room.rating)}
                </div>

                {/* TITLE */}

                <h3 className="room-suits-second-title">
                  {room.title}
                </h3>

                {/* PRICE */}

                <div className="room-suits-second-price">
                  <span className="room-suits-second-price-label">
                    Starting from
                  </span>

                  <div className="room-suits-second-price-row">
                    <span className="room-suits-second-price-value">
                      {room.price}
                    </span>

                    <span className="room-suits-second-price-period">
                      /{room.period}
                    </span>
                  </div>
                </div>

                {/* HIDDEN DETAILS */}

                <div className="room-suits-second-details">
                  <div className="room-suits-second-details-inner">
                    {/* ROOM DESCRIPTION */}

                    <p className="room-suits-second-description">
                      {room.description}
                    </p>

                    {/* ROOM FEATURES */}

                    <div className="room-suits-second-features">
                      <span>
                        <span className="room-feature-icon">⌁</span>
                        {room.area}
                      </span>

                      <span>
                        <span className="room-feature-icon">▱</span>
                        {room.beds}
                      </span>

                      <span>
                        <span className="room-feature-icon">♧</span>
                        {room.bathrooms}
                      </span>
                    </div>

                    {/* EXTRA AMENITIES */}

                    <div className="room-suits-second-amenities">
                      {room.features.map((feature, index) => (
                        <span key={index}>{feature}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* VIEW DETAILS BUTTON */}

                <Link
                  to={`/rooms/${room.id}`}
                  className="room-suits-second-button"
                  aria-label={`View details of ${room.title}`}
                >
                  <span>VIEW DETAILS</span>

                  <span className="room-suits-second-arrow">
                    ↗
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CENTERED PAGINATION */}

        {totalPages > 1 && (
          <div
            className="room-suits-second-pagination"
            aria-label="Room pages"
          >
            <button
              type="button"
              className="room-pagination-arrow"
              onClick={() =>
                setCurrentPage((page) => Math.max(page - 1, 1))
              }
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ‹
            </button>

            <div className="room-pagination-numbers">
              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  type="button"
                  key={page}
                  className={`room-pagination-number ${
                    currentPage === page ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(page)}
                  aria-current={
                    currentPage === page ? "page" : undefined
                  }
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="room-pagination-arrow"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(page + 1, totalPages)
                )
              }
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        )}

        {/* EMPTY FILTER RESULT */}

        {filteredRooms.length === 0 && (
          <div className="room-suits-second-empty">
            No rooms available in this category.
          </div>
        )}
      </div>
    </section>
  );
};

export default RoomandSuitsSecond;