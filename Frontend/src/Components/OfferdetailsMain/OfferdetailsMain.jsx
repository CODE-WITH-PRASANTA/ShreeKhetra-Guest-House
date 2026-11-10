
import React, { useEffect, useRef, useState } from "react";
import "./OfferdetailsMain.css";

const OfferdetailsMain = () => {
  const layoutRef = useRef(null);
  const sidebarRef = useRef(null);
  const termsHeadingRef = useRef(null);

  const [isReleased, setIsReleased] = useState(false);
  const [releaseTop, setReleaseTop] = useState(0);

  // =================================
  // SMART STICKY SIDEBAR
  // =================================

  useEffect(() => {
    const heading = termsHeadingRef.current;
    const layout = layoutRef.current;
    const sidebar = sidebarRef.current;

    if (!heading || !layout || !sidebar) return;

    const observer = new IntersectionObserver(
      ([entry]) => {

        // TERMS HEADING VISIBLE
        if (entry.isIntersecting && !isReleased) {

          const sidebarRect = sidebar.getBoundingClientRect();
          const layoutRect = layout.getBoundingClientRect();

          // Capture exact current sidebar position
          const currentTop =
            sidebarRect.top - layoutRect.top;

          setReleaseTop(currentTop);
          setIsReleased(true);
        }

        // TERMS HEADING GOES BELOW VIEWPORT
        // This happens when scrolling upward
        else if (
          !entry.isIntersecting &&
          entry.boundingClientRect.top > window.innerHeight &&
          isReleased
        ) {
          setIsReleased(false);
        }
      },
      {
        threshold: 0,
      }
    );

    observer.observe(heading);

    return () => observer.disconnect();

  }, [isReleased]);

  // =================================
  // DATA
  // =================================

  const hotelBenefits = [
    "Welcome drink upon arrival",
    "Welcome seasonal fruits in the room upon arrival",
    "30% discount on laundry",
    "25% discount on room service, food, beverages, and afternoon tea",
    "Free fast Wi-Fi (speed can be upgraded for webinars and e-games)",
    "Complimentary canapé deluxe set and free access to the Royal Wing pool",
    "Complimentary upgrade to next available room type (for mini suites bookings only)",
  ];

  const hotelAdvantages = [
    "Transparency - No hidden fees",
    "Complementary Airport pickup",
    "Value for money",
    "Luxurious rooms for your comfort",
    "Easy refund on online booking",
    "Award-winning hotel on TripAdvisor",
  ];

  const terms = [
    "Free cancellation 24 hours before the check-in date.",
    "If cancelled within 24 hours before the check-in date, 1 night will be charged.",
    "In case of a no-show, the total amount will be charged.",
    "The package benefits are non-transferable and cannot be exchanged for cash.",
    "This offer is valid for stays until 31 October 2025 (last night in-house).",
  ];

  // =================================
  // CHECK ICON
  // =================================

  const CheckIcon = () => (
    <span className="OfferdetailsMain__check">
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2.5l2.3 1.4 2.7.2 1.1 2.5 2.1 1.7-.5 2.7.5 2.7-2.1 1.7-1.1 2.5-2.7.2-2.3 1.4-2.3-1.4-2.7-.2-1.1-2.5-2.1-1.7.5-2.7-.5-2.7 2.1-1.7 1.1-2.5 2.7-.2L12 2.5z"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <path
          d="m9 12 2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );

  return (
    <section className="OfferdetailsMain">

      <div className="OfferdetailsMain__container">

        <div
          className="OfferdetailsMain__layout"
          ref={layoutRef}
        >

          {/* =================================
              LEFT CONTENT
          ================================= */}

          <div className="OfferdetailsMain__content">

            {/* INTRODUCTION */}

            <div className="OfferdetailsMain__intro">

              <h1>
                We will make your stay better! This September,
                save a ton of money and receive a free room upgrade.
              </h1>

              <p>
                Use our incredible offer, which is available just for
                weekday nights, to get away to peace and quiet at our
                lowest price to date. Take advantage of the special
                amenities included in this package to enhance your stay
                and feel more comfortable with our flexible cancellation
                policy. Get a complimentary accommodation upgrade for
                your stay. Have a safe and amazing staycation!
              </p>

              <div className="OfferdetailsMain__period">

                <p>
                  <strong>Booking period:</strong> Now - 20 September 2025
                </p>

                <p>
                  <strong>Stay period:</strong> Now - 31 October 2025
                </p>

              </div>

            </div>

            <div className="OfferdetailsMain__divider" />

            {/* HOTEL BENEFITS */}

            <div className="OfferdetailsMain__benefits">

              <h2>Hotel Benefits:</h2>

              <ul>
                {hotelBenefits.map((benefit, index) => (
                  <li key={index}>
                    <CheckIcon />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

            </div>

            {/* =================================
                TERMS AND CONDITIONS
            ================================= */}

            <section className="OfferdetailsMain__terms">

              <div className="OfferdetailsMain__termsContent">

                <div className="OfferdetailsMain__divider" />

                <h2 ref={termsHeadingRef}>
                  Terms and Conditions:
                </h2>

                <ul>
                  {terms.map((term, index) => (
                    <li key={index}>
                      <span className="OfferdetailsMain__dot" />
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>

              </div>

            </section>

          </div>

          {/* =================================
              RIGHT SIDEBAR
              BOTH BOXES MOVE TOGETHER
          ================================= */}

          <aside
            ref={sidebarRef}
            className={`OfferdetailsMain__sidebar ${
              isReleased ? "is-released" : "is-sticky"
            }`}
            style={
              isReleased
                ? { top: `${releaseTop}px` }
                : undefined
            }
          >

            {/* FIRST BOX */}

            <div className="OfferdetailsMain__sideBox">

              <h2>Why Choose At Hotel</h2>

              <span className="OfferdetailsMain__sideLine" />

              <ul>
                {hotelAdvantages.map((item, index) => (
                  <li key={index}>
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

            </div>

            {/* SECOND BOX */}

            <div className="OfferdetailsMain__sideBox OfferdetailsMain__support">

              <h2>Reservation Support</h2>

              <span className="OfferdetailsMain__sideLine" />

              <div className="OfferdetailsMain__contact">

                <a href="tel:+81392353199">
                  Tel: +81 392 353 199
                </a>

                <a href="tel:+41012344568">
                  Fax: +41 (0)123445 68
                </a>

                <a href="mailto:luxivo@gmail.com">
                  luxivo@gmail.com
                </a>

              </div>

              <div className="OfferdetailsMain__address">

                <p>Luxivo Hotel, Navagio Zakynthos</p>

                <p>Greece 1550, Himalaya, Nepal</p>

              </div>

            </div>

          </aside>

        </div>

      </div>

    </section>
  );
};

export default OfferdetailsMain;
