
import React, { useEffect, useRef, useState } from "react";
import FooterImg from "../../assets/Footerphoto.jpg";
import "./RoomandSuitsFourth.css";

const OfferIcon = ({ type }) => {
  const common = {
    width: 52,
    height: 52,
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (type) {
    case "airport":
      return (
        <svg {...common}>
          <rect x="5" y="29" width="52" height="22" rx="5" />
          <path d="M10 29v-7a4 4 0 0 1 4-4h24l8 11" />
          <path d="M15 18h18" />
          <rect x="10" y="34" width="8" height="7" rx="1" />
          <rect x="22" y="34" width="8" height="7" rx="1" />
          <rect x="34" y="34" width="8" height="7" rx="1" />
          <path d="M47 35h5v6h-5z" />
          <circle cx="17" cy="53" r="4" fill="white" />
          <circle cx="46" cy="53" r="4" fill="white" />
          <path d="M8 46h48" />
          <path d="m37 8 17 9-3 3-12-4-7 6-3-2 5-8-5-3z" />
          <path d="m36 12-5-5 2-2 7 4" />
        </svg>
      );

    case "frontdesk":
      return (
        <svg {...common}>
          <rect x="12" y="5" width="39" height="53" rx="5" />
          <rect x="24" y="13" width="27" height="11" rx="5" />
          <circle cx="38" cy="18.5" r="3.5" />
          <path d="M25 30h13v20H25z" />
          <path d="M42 29v21" />
          <path d="M46 30c5 3 5 7 0 10" />
          <path d="M50 28c7 4 7 11 0 15" />
          <rect x="5" y="39" width="26" height="12" rx="2" />
          <circle cx="11" cy="45" r="2" />
          <path d="M15 45h9" />
        </svg>
      );

    case "smart":
      return (
        <svg {...common}>
          <rect x="11" y="6" width="39" height="53" rx="5" />
          <rect x="23" y="14" width="27" height="11" rx="5" />
          <circle cx="37" cy="19.5" r="3.5" />
          <rect x="24" y="31" width="13" height="19" rx="1" />
          <path d="M42 31v19" />
          <rect x="5" y="38" width="28" height="14" rx="2" />
          <circle cx="12" cy="45" r="2" />
          <path d="M17 45h10" />
          <path d="M52 34c5 3 5 8 0 11" />
          <path d="M56 30c7 5 7 14 0 19" />
        </svg>
      );

    case "service":
      return (
        <svg {...common}>
          <path d="M9 27h46" />
          <path d="M12 27c0-12 8-19 20-19s20 7 20 19" />
          <path d="M16 27v5h32v-5" />
          <path d="M25 37c-2 7-9 10-13 15l-4 4 4 4 6-1 5-6c7-5 10-11 11-16" />
          <path d="M37 36c-1 5-4 10-9 13" />
          <path d="M40 36c-1 4-3 7-5 9" />
          <path d="M19 19h26" />
          <circle cx="32" cy="5" r="2" />
        </svg>
      );

    default:
      return null;
  }
};

const offers = [
  {
    id: 1,
    type: "airport",
    title: "Airport Transfer",
    description:
      "Hassle-free pick-up and drop-off services for a smooth travel experience, and round-the-clock monitoring to ensure.",
    side: "left",
  },
  {
    id: 2,
    type: "frontdesk",
    title: "24/7 Front Desk Assistance",
    description:
      "Our friendly staff is available around the clock to assist you with check-ins, concierge services, bookings, and inquiries.",
    side: "right",
  },
  {
    id: 3,
    type: "smart",
    title: "Smart Room Access",
    description:
      "Experience keyless entry and smart controls for lights, temperature, and entertainment, all at your fingertips.",
    side: "left",
  },
  {
    id: 4,
    type: "service",
    title: "Room Service",
    description:
      "Relax and dine in the comfort of your room with our 24/7 room service offering a variety of dishes and beverages.",
    side: "right",
  },
];

const RoomandSuitsFourth = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const leftOffers = offers.filter((item) => item.side === "left");
  const rightOffers = offers.filter((item) => item.side === "right");

  const renderOffer = (item, index) => (
    <article
      className={`RoomFourth__offer RoomFourth__offer--${item.side} ${
        visible ? "RoomFourth__offer--visible" : ""
      }`}
      key={item.id}
      style={{ "--offer-delay": `${index * 180}ms` }}
    >
      <div className="RoomFourth__icon">
        <OfferIcon type={item.type} />
      </div>

      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </article>
  );

  return (
    <section
      className={`RoomFourth ${visible ? "RoomFourth--visible" : ""}`}
      ref={sectionRef}
    >
      <div className="RoomFourth__container">
        <div className="RoomFourth__heading">
          <span>Improving Your Visit With</span>
          <span>Special Offers</span>
        </div>

        <div className="RoomFourth__content">
          <div className="RoomFourth__column RoomFourth__column--left">
            {leftOffers.map((item, index) => renderOffer(item, index))}
          </div>

          <div className="RoomFourth__image-wrapper">
            <div className="RoomFourth__image-frame">
              <img
                src={FooterImg}
                alt="Beautiful New York City skyline featuring the Empire State Building"
              />
              <div className="RoomFourth__image-shine"></div>
            </div>
          </div>

          <div className="RoomFourth__column RoomFourth__column--right">
            {rightOffers.map((item, index) => renderOffer(item, index))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomandSuitsFourth;
