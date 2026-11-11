
import React from "react";
import "./Offers.css";

const offersData = [
  {
    id: 1,
    title: "Make A Date To Catch Up On Missed Celebrations And Enjoy",
    image: "",
    rating: "4.9",
    reviews: "Reviews",
    description:
      "Enjoy a 30-hour stay with room upgrade, buffet breakfast, in-room afternoon tea and more. Rates start from $29. With the holiday season fast approaching, ensure your room is booked so that you can concentrate.",
    price: "₹350",
    expiry: "Expiry: 31 Aug",
    buttonText: "VIEW OFFER",
    imageAlt: "Luxury celebration suite with elegant bedroom and city views",
  },
  {
    id: 2,
    title: "Deluxe Bed Rooms Benefit From A 25% Discount When Booking In August",
    image: "https://luxivo-nextjs.pages.dev/assets/images/innerpage/gallery/offer-img2.jpg",
    rating: "4.9",
    reviews: "Reviews",
    description:
      "Enjoy a 30-hour stay with room upgrade, buffet breakfast, in-room afternoon tea and more. Rates start from $29. With the holiday season fast approaching, ensure your room is booked so that you can concentrate.",
    price: "₹350",
    expiry: "Expiry: 31 Aug",
    buttonText: "VIEW OFFER",
    imageAlt: "Premium deluxe hotel bedroom with beautiful city views",
  },
  {
    id: 3,
    title: "25% Meeting Room Make A Date To Catch Up On Missed Celebrations",
    image: "https://luxivo-nextjs.pages.dev/assets/images/innerpage/gallery/offer-img3.jpg",
    rating: "4.9",
    reviews: "Reviews",
    description:
      "Enjoy a 30-hour stay with room upgrade, buffet breakfast, in-room afternoon tea and more. Rates start from $29. With the holiday season fast approaching, ensure your room is booked so that you can concentrate.",
    price: "₹350",
    expiry: "Expiry: 31 Aug",
    buttonText: "VIEW OFFER",
    imageAlt: "Luxury hotel meeting room with elegant interior and large windows",
  },
];

const Offers = () => {
  return (
    <section className="Offers-section">

      <div className="Offers-container">

        {/* SECTION HEADING */}
        <div className="Offers-header">
          <span className="Offers-subtitle">SPECIAL HOTEL OFFERS</span>

          <h2 className="Offers-heading">
            Our Creative Staff Specializes In Creating
            Affordable, Unforgettable Vacation Packages.
            Enjoy Our Alluring Deals For You And Your Loved Ones.
          </h2>

          <div className="Offers-heading-decoration">
            <span></span>
            <span></span>
          </div>
        </div>

        {/* OFFERS LIST */}
        <div className="Offers-list">

          {offersData.map((offer, index) => (
            <article
              className={`Offers-card ${
                index % 2 !== 0 ? "Offers-card-reverse" : ""
              }`}
              key={offer.id}
            >

              {/* IMAGE */}
              <div className="Offers-image-box">
                <img
                  src={offer.image}
                  alt={offer.imageAlt}
                  className="Offers-image"
                  loading="lazy"
                />

                <div className="Offers-image-overlay"></div>

                <span className="Offers-image-number">
                  0{offer.id}
                </span>
              </div>

              {/* CONTENT */}
              <div className="Offers-content">

                <h3 className="Offers-title">
                  {offer.title}
                </h3>

                <div className="Offers-title-line"></div>

                {/* RATING */}
                <div className="Offers-rating">
                  <div
                    className="Offers-stars"
                    aria-label="5 out of 5 stars"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>

                  <span className="Offers-review">
                    {offer.rating} {offer.reviews}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className="Offers-description">
                  {offer.description}
                </p>

                {/* BOTTOM DETAILS */}
                <div className="Offers-footer">

                  <div className="Offers-price-details">
                    <span className="Offers-price">
                      {offer.price}
                    </span>

                    <span className="Offers-expiry">
                      {offer.expiry}
                    </span>
                  </div>

                  <a
                    href="/booking"
                    className="Offers-button"
                    aria-label={`View offer: ${offer.title}`}
                  >
                    <span>{offer.buttonText}</span>
                    <span className="Offers-button-arrow">→</span>
                  </a>

                </div>

              </div>

            </article>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Offers;
