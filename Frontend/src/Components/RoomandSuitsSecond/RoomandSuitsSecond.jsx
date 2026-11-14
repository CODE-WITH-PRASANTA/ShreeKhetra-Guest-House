import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./RoomandSuitsSecond.css";

/* ==========================================
   ROOM DATA
========================================== */

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

/* ==========================================
   SMALL SVG ICONS
========================================== */

const Icon = ({ name, size = 16 }) => {
  const paths = {
    area: (
      <>
        <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
      </>
    ),
    bed: (
      <>
        <path d="M3 5v14M3 16h18v3M3 11h18v5M7 11V8h5a3 3 0 0 1 3 3" />
        <path d="M15 11h3a3 3 0 0 1 3 3" />
      </>
    ),
    bath: (
      <>
        <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3z" />
        <path d="M6 12V6a2 2 0 0 1 2-2h1M7 19l-1 2M17 19l1 2" />
      </>
    ),
    arrow: <path d="M7 17 17 7M8 7h9v9" />,
    plus: <path d="M12 5v14M5 12h14" />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
};

/* ==========================================
   COMPONENT
========================================== */

const ROOMS_PER_PAGE = 8;

const RoomandSuitsSecond = () => {
  const [activeFilter, setActiveFilter] = useState("Show All");
  const [currentPage, setCurrentPage] = useState(1);
  const [openId, setOpenId] = useState(null); // tap-to-expand on touch devices
  const filtersRef = useRef(null);

  const filteredRooms =
    activeFilter === "Show All"
      ? rooms
      : rooms.filter((room) => room.category === activeFilter);

  const totalPages = Math.ceil(filteredRooms.length / ROOMS_PER_PAGE);

  const currentRooms = filteredRooms.slice(
    (currentPage - 1) * ROOMS_PER_PAGE,
    currentPage * ROOMS_PER_PAGE
  );

  const countFor = (filter) =>
    filter === "Show All"
      ? rooms.length
      : rooms.filter((room) => room.category === filter).length;

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
    setOpenId(null);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    setOpenId(null);
    filtersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // On touch screens there is no hover, so a tap expands the card.
  const handleCardClick = (event, id) => {
    if (!window.matchMedia("(hover: none)").matches) return;
    if (event.target.closest("a")) return;
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="RoomandSuitsSecond">
      <div className="RoomandSuitsSecond-container">
        {/* SECTION HEADING */}
        <div className="RoomandSuitsSecond-heading">
          <span className="RoomandSuitsSecond-headingDecoration">
            ───── ❧ ─────
          </span>
          <span className="RoomandSuitsSecond-subtitle">LUXURY COMFORT</span>
          <h2>Featured Rooms &amp; Suits</h2>
        </div>

        {/* FILTER BUTTONS */}
        <div
          className="RoomandSuitsSecond-filters"
          ref={filtersRef}
          role="group"
          aria-label="Filter rooms by category"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`RoomandSuitsSecond-filter ${
                activeFilter === filter ? "is-active" : ""
              }`}
              onClick={() => handleFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              <span>{filter}</span>
              <span className="RoomandSuitsSecond-filterCount">
                {countFor(filter)}
              </span>
            </button>
          ))}
        </div>

        {/* ROOM GRID */}
        <div className="RoomandSuitsSecond-grid">
          {currentRooms.map((room) => (
            <article
              className={`RoomandSuitsSecond-card ${
                openId === room.id ? "is-open" : ""
              }`}
              key={room.id}
              onClick={(e) => handleCardClick(e, room.id)}
            >
              <img
                src={room.image}
                alt={room.title}
                className="RoomandSuitsSecond-image"
                loading="lazy"
                decoding="async"
              />

              <div className="RoomandSuitsSecond-overlay" />

              {/* TOP BADGES */}
              <div className="RoomandSuitsSecond-top">
                <span className="RoomandSuitsSecond-category">
                  {room.category}
                </span>
                <span
                  className="RoomandSuitsSecond-rating"
                  aria-label={`${room.rating} out of 5 stars`}
                >
                  {"★".repeat(room.rating)}
                </span>
              </div>

              {/* INFORMATION PANEL */}
              <div className="RoomandSuitsSecond-info">
                <div className="RoomandSuitsSecond-headline">
                  <div className="RoomandSuitsSecond-headlineText">
                    <h3 className="RoomandSuitsSecond-title">{room.title}</h3>

                    <div className="RoomandSuitsSecond-price">
                      <span className="RoomandSuitsSecond-priceLabel">
                        From
                      </span>
                      <span className="RoomandSuitsSecond-priceValue">
                        {room.price}
                      </span>
                      <span className="RoomandSuitsSecond-pricePeriod">
                        / {room.period}
                      </span>
                    </div>
                  </div>

                  <span className="RoomandSuitsSecond-toggle" aria-hidden="true">
                    <Icon name="plus" size={15} />
                  </span>
                </div>

                {/* EXPANDING DETAILS */}
                <div className="RoomandSuitsSecond-details">
                  <div className="RoomandSuitsSecond-detailsInner">
                    <p className="RoomandSuitsSecond-description">
                      {room.description}
                    </p>

                    <ul className="RoomandSuitsSecond-specs">
                      <li>
                        <Icon name="area" size={15} />
                        <span>{room.area}</span>
                      </li>
                      <li>
                        <Icon name="bed" size={15} />
                        <span>{room.beds}</span>
                      </li>
                      <li>
                        <Icon name="bath" size={15} />
                        <span>{room.bathrooms}</span>
                      </li>
                    </ul>

                    <div className="RoomandSuitsSecond-amenities">
                      {room.features.map((feature) => (
                        <span key={feature}>{feature}</span>
                      ))}
                    </div>

                    <Link
                      to={`/rooms/${room.id}`}
                      className="RoomandSuitsSecond-button"
                      aria-label={`View details of ${room.title}`}
                    >
                      <span>VIEW DETAILS</span>
                      <span className="RoomandSuitsSecond-arrow">
                        <Icon name="arrow" size={17} />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <nav className="RoomandSuitsSecond-pagination" aria-label="Room pages">
            <button
              type="button"
              className="RoomandSuitsSecond-pageArrow"
              onClick={() => goToPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ‹
            </button>

            <div className="RoomandSuitsSecond-pageNumbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    type="button"
                    key={page}
                    className={`RoomandSuitsSecond-pageNumber ${
                      currentPage === page ? "is-active" : ""
                    }`}
                    onClick={() => goToPage(page)}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              className="RoomandSuitsSecond-pageArrow"
              onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              ›
            </button>
          </nav>
        )}

        {/* EMPTY RESULT */}
        {filteredRooms.length === 0 && (
          <div className="RoomandSuitsSecond-empty">
            No rooms available in this category.
          </div>
        )}
      </div>
    </section>
  );
};

export default RoomandSuitsSecond;