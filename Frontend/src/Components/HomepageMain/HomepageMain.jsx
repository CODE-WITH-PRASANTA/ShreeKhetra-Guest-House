import React, { useEffect, useRef, useState } from "react";
import "./HomepageMain.css";

const SLIDE_MS = 4000; // keep in sync with --slide-ms in the CSS

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=90",
    subtitle: "Unique Palace & Luxury Hotel",
    title: "Discover Your Next Luxurious Hotel",
    description:
      "Experience extraordinary comfort, elegant spaces and unforgettable moments with us.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=2000&q=90",
    subtitle: "Experience Pure Elegance",
    title: "A Beautiful Stay Beyond Expectations",
    description:
      "Relax in beautifully designed rooms where every detail is made for your comfort.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=90",
    subtitle: "Luxury Meets Nature",
    title: "Escape Into Your Dream Destination",
    description:
      "Discover peaceful surroundings, exceptional hospitality and beautiful experiences.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=2000&q=90",
    subtitle: "Unforgettable Hospitality",
    title: "Your Perfect Holiday Begins Here",
    description:
      "Make every moment special with premium amenities and personalized service.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=90",
    subtitle: "The Art Of Luxury Living",
    title: "Indulge In Comfort And Sophistication",
    description:
      "Enjoy a perfect blend of modern luxury, relaxation and timeless hospitality.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2000&q=90",
    subtitle: "Your Home Away From Home",
    title: "Create Memories That Last Forever",
    description:
      "From peaceful mornings to beautiful evenings, experience something extraordinary.",
  },
];

/* ---------- Dropdown options ---------- */
const ROOM_OPTIONS = [
  { value: "1", label: "01 Room" },
  { value: "2", label: "02 Rooms" },
  { value: "3", label: "03 Rooms" },
  { value: "4", label: "04 Rooms" },
  { value: "5", label: "05 Rooms" },
];

const ADULT_OPTIONS = [
  { value: "1", label: "01 Adult" },
  { value: "2", label: "02 Adults" },
  { value: "3", label: "03 Adults" },
  { value: "4", label: "04 Adults" },
  { value: "5", label: "05 Adults" },
  { value: "6", label: "06 Adults" },
];

const CHILD_OPTIONS = [
  { value: "0", label: "0 Child" },
  { value: "1", label: "1 Child" },
  { value: "2", label: "2 Children" },
  { value: "3", label: "3 Children" },
  { value: "4", label: "4 Children" },
];

/* ---------- Icons ---------- */
const Icon = ({ name, size = 18 }) => {
  const paths = {
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2.5" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    bed: (
      <>
        <path d="M3 5v14M3 16h18v3M3 11h18v5M7 11V8h5a3 3 0 0 1 3 3" />
        <path d="M15 11h3a3 3 0 0 1 3 3" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
        <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18.5 14.2A6.5 6.5 0 0 1 21.5 20" />
      </>
    ),
    moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
    chevronDown: <path d="m6 9 6 6 6-6" />,
    chevronLeft: <path d="m15 18-6-6 6-6" />,
    chevronRight: <path d="m9 18 6-6-6-6" />,
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="m18 6-12 12M6 6l12 12" />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
};

/* ---------- Date helpers (all dates are "YYYY-MM-DD") ---------- */
const pad = (n) => String(n).padStart(2, "0");
const toISO = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;

const getToday = () => {
  const d = new Date();
  return toISO(d.getFullYear(), d.getMonth(), d.getDate());
};

const addDays = (iso, n) => {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + n);
  return toISO(d.getFullYear(), d.getMonth(), d.getDate());
};

const diffNights = (a, b) =>
  Math.round(
    (new Date(b + "T00:00:00") - new Date(a + "T00:00:00")) / 86400000
  );

const formatDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatParts = (iso) => {
  const d = new Date(iso + "T00:00:00");
  return {
    day: pad(d.getDate()),
    month: d.toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
    weekday: d.toLocaleDateString("en-IN", { weekday: "long" }),
  };
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

/* =========================================================
   CUSTOM SELECT (smooth premium dropdown)
========================================================= */
const Select = ({ id, ariaLabel, value, options, open, onToggle, onChange, end }) => {
  const current = options.find((o) => o.value === value);

  const handleKeyDown = (e) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();

    if (!open) {
      onToggle();
      return;
    }

    const items = Array.from(e.currentTarget.querySelectorAll(".hp-option"));
    const idx = items.indexOf(document.activeElement);
    let next;
    if (e.key === "ArrowDown") {
      next = items[(idx + 1) % items.length];
    } else {
      next = idx === -1 ? items[items.length - 1] : items[(idx - 1 + items.length) % items.length];
    }
    if (next) next.focus();
  };

  return (
    <div
      className={`hp-select ${end ? "hp-select--end" : ""} ${open ? "is-open" : ""}`}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        id={id}
        className="hp-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={onToggle}
      >
        <span className="hp-value filled">{current ? current.label : ""}</span>
        <span className="hp-chevron">
          <Icon name="chevronDown" size={16} />
        </span>
      </button>

      <ul className="hp-menu" role="listbox" aria-hidden={!open}>
        {options.map((o, i) => {
          const active = o.value === value;
          return (
            <li key={o.value} role="option" aria-selected={active} style={{ "--i": i }}>
              <button
                type="button"
                tabIndex={open ? 0 : -1}
                className={`hp-option ${active ? "is-active" : ""}`}
                onClick={() => onChange(o.value)}
              >
                <span>{o.label}</span>
                {active && <Icon name="check" size={15} />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/* =========================================================
   EMBOSSED CALENDAR
========================================================= */
const Calendar = ({ open, title, value, min, rangeStart, rangeEnd, onSelect, onClose }) => {
  const today = getToday();

  const seed = () => {
    const d = new Date((value || min || today) + "T00:00:00");
    return { y: d.getFullYear(), m: d.getMonth() };
  };

  const [view, setView] = useState(seed);

  // Every time the calendar opens, jump to the relevant month
  useEffect(() => {
    if (open) setView(seed());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const minDate = new Date(min + "T00:00:00");
  const canGoPrev =
    view.y > minDate.getFullYear() ||
    (view.y === minDate.getFullYear() && view.m > minDate.getMonth());

  const shift = (delta) =>
    setView((v) => {
      const d = new Date(v.y, v.m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

  const firstDay = new Date(view.y, view.m, 1).getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const nights = rangeStart && rangeEnd ? diffNights(rangeStart, rangeEnd) : 0;

  return (
    <div className="hp-calendar">
      <div className="hp-cal-title">
        <Icon name="calendar" size={15} />
        <span>{title}</span>
        <button
          type="button"
          className="hp-cal-close"
          onClick={onClose}
          aria-label="Close calendar"
        >
          <Icon name="close" size={13} />
        </button>
      </div>

      <div className="hp-cal-nav">
        <button
          type="button"
          className="hp-cal-arrow"
          onClick={() => shift(-1)}
          disabled={!canGoPrev}
          aria-label="Previous month"
        >
          <Icon name="chevronLeft" size={16} />
        </button>
        <strong>
          {MONTHS[view.m]} {view.y}
        </strong>
        <button
          type="button"
          className="hp-cal-arrow"
          onClick={() => shift(1)}
          aria-label="Next month"
        >
          <Icon name="chevronRight" size={16} />
        </button>
      </div>

      <div className="hp-cal-grid hp-cal-week">
        {WEEKDAYS.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>

      <div className="hp-cal-grid">
        {cells.map((day, i) => {
          if (!day) return <span key={`e${i}`} />;
          const iso = toISO(view.y, view.m, day);
          const disabled = iso < min;
          const selected = iso === value;
          const inRange = rangeStart && rangeEnd && iso > rangeStart && iso < rangeEnd;
          const cls = [
            "hp-day",
            selected && "is-selected",
            inRange && "is-range",
            iso === today && "is-today",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={iso}
              type="button"
              className={cls}
              disabled={disabled}
              onClick={() => onSelect(iso)}
              aria-label={formatDate(iso)}
              aria-pressed={selected}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="hp-cal-foot">
        <span className="hp-cal-dot" aria-hidden="true" />
        {nights > 0
          ? `${nights} ${nights === 1 ? "night" : "nights"} selected`
          : "Select your stay dates"}
      </div>
    </div>
  );
};

/* Date field = trigger + calendar popover */
const DatePicker = ({
  id,
  title,
  value,
  min,
  placeholder,
  rangeStart,
  rangeEnd,
  open,
  align = "left",
  onToggle,
  onSelect,
  onClose,
}) => (
  <div className="hp-date">
    <button
      type="button"
      id={id}
      className="hp-trigger"
      aria-haspopup="dialog"
      aria-expanded={open}
      onClick={onToggle}
    >
      <span className={`hp-value ${value ? "filled" : ""}`}>
        {value ? formatDate(value) : placeholder}
      </span>
      <span className={`hp-chevron ${open ? "is-open" : ""}`}>
        <Icon name="chevronDown" size={16} />
      </span>
    </button>

    <div
      className={`hp-pop hp-pop--${align} ${open ? "is-open" : ""}`}
      role="dialog"
      aria-label={title}
      aria-hidden={!open}
    >
      <Calendar
        open={open}
        title={title}
        value={value}
        min={min}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        onSelect={onSelect}
        onClose={onClose}
      />
    </div>
  </div>
);

/* =========================================================
   MAIN COMPONENT
========================================================= */
const HomepageMain = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState("1");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");

  const [openMenu, setOpenMenu] = useState(null); // checkIn | checkOut | rooms | adults | children | null
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(null); // success details

  const doneRef = useRef(null);
  const today = getToday();

  /* ---------- Hero slider (restarts when a dash is clicked) ---------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearTimeout(timer);
  }, [activeSlide]);

  /* ---------- Close dropdowns on outside click ---------- */
  useEffect(() => {
    if (!openMenu) return;
    const onDown = (e) => {
      if (!e.target.closest("[data-hp-field]")) setOpenMenu(null);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [openMenu]);

  /* ---------- Escape key ---------- */
  useEffect(() => {
    if (!openMenu && !booking) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (booking) closeSuccess();
      else setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openMenu, booking]);

  /* ---------- Success popup: lock scroll, hide floating icons, focus ---------- */
  useEffect(() => {
    document.body.classList.toggle("booking-open", !!booking);
    document.body.style.overflow = booking ? "hidden" : "";
    if (booking && doneRef.current) doneRef.current.focus();
    return () => {
      document.body.classList.remove("booking-open");
      document.body.style.overflow = "";
    };
  }, [booking]);

  const toggleMenu = (key) => setOpenMenu((prev) => (prev === key ? null : key));

  const handleCheckInSelect = (iso) => {
    setCheckIn(iso);
    if (checkOut && iso >= checkOut) setCheckOut("");
    setError("");
    setOpenMenu("checkOut"); // jump straight to check-out
  };

  const handleCheckOutSelect = (iso) => {
    setCheckOut(iso);
    setError("");
    setOpenMenu(null);
  };

  const pick = (setter) => (value) => {
    setter(value);
    setOpenMenu(null);
  };

  const closeSuccess = () => {
    setBooking(null);
    setCheckIn("");
    setCheckOut("");
    setRooms("1");
    setAdults("2");
    setChildren("0");
  };

  /* ---------- Submit ---------- */
  const handleBooking = (e) => {
    e.preventDefault();

    if (!checkIn) {
      setError("Please select your check-in date.");
      setOpenMenu("checkIn");
      return;
    }
    if (!checkOut) {
      setError("Please select your check-out date.");
      setOpenMenu("checkOut");
      return;
    }
    if (checkOut <= checkIn) {
      setError("Check-out date must be after check-in date.");
      setOpenMenu("checkOut");
      return;
    }

    const details = {
      id: `BK-${(Date.now().toString(36) + Math.random().toString(36).slice(2, 4))
        .toUpperCase()
        .slice(-7)}`,
      checkIn,
      checkOut,
      nights: diffNights(checkIn, checkOut),
      rooms,
      adults,
      children,
    };

    // TODO: send `details` to your backend / booking API here
    console.log("Booking Details:", details);

    setError("");
    setOpenMenu(null);
    setBooking(details);
  };

  /* ---------- Success popup text ---------- */
  const roomsText = booking
    ? `${booking.rooms} ${Number(booking.rooms) === 1 ? "Room" : "Rooms"}`
    : "";
  const guestsText = booking
    ? `${booking.adults} ${Number(booking.adults) === 1 ? "Adult" : "Adults"}` +
      (Number(booking.children) > 0
        ? `, ${booking.children} ${Number(booking.children) === 1 ? "Child" : "Children"}`
        : "")
    : "";

  const inParts = booking ? formatParts(booking.checkIn) : null;
  const outParts = booking ? formatParts(booking.checkOut) : null;

  return (
    <div className="homepage-main">
      {/* ================= HERO ================= */}
      <section className="homepage-hero">
        <div className="hero-background">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${activeSlide === index ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          ))}
        </div>

        <div className="hero-overlay" />

        <div className="hero-content" key={activeSlide}>
          <span className="hero-subtitle">
            <span className="hero-subtitle-dot" aria-hidden="true" />
            {slides[activeSlide].subtitle}
          </span>

          <h1 className="hero-title">{slides[activeSlide].title}</h1>

          <p className="hero-description">{slides[activeSlide].description}</p>

          <div className="hero-actions">
            <a href="#booking" className="hero-button">
              <span>Explore Rooms</span>
              <span className="hero-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="hero-bottom">
          <div className="hero-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={activeSlide === index ? "true" : undefined}
                className={`hero-indicator ${activeSlide === index ? "selected" : ""}`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>

          <div className="hero-slide-number">
            <span className="slide-current">0{activeSlide + 1}</span>
            <span className="slide-divider" />
            <span>0{slides.length}</span>
          </div>
        </div>
      </section>

      {/* ================= BOOKING ================= */}
      <section className="booking-section" id="booking">
        <form className="booking-container" onSubmit={handleBooking} noValidate>
          <div className="booking-head">
            <span className="booking-eyebrow">Check Availability</span>
            <p>Select your dates and guests to find the perfect room.</p>
          </div>

          <div className="booking-grid">
            {/* Check In */}
            <div
              className={`booking-field ${openMenu === "checkIn" ? "is-open" : ""}`}
              data-hp-field
            >
              <label htmlFor="checkIn">Check In</label>
              <div className="booking-input-wrapper">
                <span className="booking-icon">
                  <Icon name="calendar" />
                </span>
                <DatePicker
                  id="checkIn"
                  title="Select check-in date"
                  placeholder="Select date"
                  value={checkIn}
                  min={today}
                  rangeStart={checkIn}
                  rangeEnd={checkOut}
                  open={openMenu === "checkIn"}
                  align="left"
                  onToggle={() => toggleMenu("checkIn")}
                  onSelect={handleCheckInSelect}
                  onClose={() => setOpenMenu(null)}
                />
              </div>
            </div>

            {/* Check Out */}
            <div
              className={`booking-field ${openMenu === "checkOut" ? "is-open" : ""}`}
              data-hp-field
            >
              <label htmlFor="checkOut">Check Out</label>
              <div className="booking-input-wrapper">
                <span className="booking-icon">
                  <Icon name="calendar" />
                </span>
                <DatePicker
                  id="checkOut"
                  title="Select check-out date"
                  placeholder="Select date"
                  value={checkOut}
                  min={addDays(checkIn || today, 1)}
                  rangeStart={checkIn}
                  rangeEnd={checkOut}
                  open={openMenu === "checkOut"}
                  align="out"
                  onToggle={() => toggleMenu("checkOut")}
                  onSelect={handleCheckOutSelect}
                  onClose={() => setOpenMenu(null)}
                />
              </div>
            </div>

            {/* Rooms */}
            <div
              className={`booking-field ${openMenu === "rooms" ? "is-open" : ""}`}
              data-hp-field
            >
              <label htmlFor="rooms">Rooms</label>
              <div className="booking-input-wrapper">
                <span className="booking-icon">
                  <Icon name="bed" />
                </span>
                <Select
                  id="rooms"
                  ariaLabel="Rooms"
                  value={rooms}
                  options={ROOM_OPTIONS}
                  open={openMenu === "rooms"}
                  onToggle={() => toggleMenu("rooms")}
                  onChange={pick(setRooms)}
                />
              </div>
            </div>

            {/* Guests */}
            <div
              className={`booking-field ${
                openMenu === "adults" || openMenu === "children" ? "is-open" : ""
              }`}
              data-hp-field
            >
              <label htmlFor="adults">Guests</label>
              <div className="booking-input-wrapper booking-guests">
                <span className="booking-icon">
                  <Icon name="users" />
                </span>

                <Select
                  id="adults"
                  ariaLabel="Adults"
                  value={adults}
                  options={ADULT_OPTIONS}
                  open={openMenu === "adults"}
                  onToggle={() => toggleMenu("adults")}
                  onChange={pick(setAdults)}
                />

                <span className="guest-divider" aria-hidden="true" />

                <Select
                  id="children"
                  ariaLabel="Children"
                  value={children}
                  options={CHILD_OPTIONS}
                  open={openMenu === "children"}
                  onToggle={() => toggleMenu("children")}
                  onChange={pick(setChildren)}
                  end
                />
              </div>
            </div>

            {/* Button */}
            <div className="booking-submit">
              <button type="submit">
                <span>CHECK NOW</span>
                <span className="booking-arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          {error && (
            <p className="booking-error" role="alert">
              {error}
            </p>
          )}
        </form>
      </section>

      {/* ================= SUCCESS POPUP ================= */}
      {booking && (
        <div className="hp-success-scrim" onClick={closeSuccess}>
          <div
            className="hp-success"
            role="dialog"
            aria-modal="true"
            aria-labelledby="hp-success-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="hp-success-close"
              onClick={closeSuccess}
              aria-label="Close"
            >
              <Icon name="close" size={15} />
            </button>

            <div className="hp-success-top">
              <span className="hp-spark hp-spark--1" aria-hidden="true" />
              <span className="hp-spark hp-spark--2" aria-hidden="true" />
              <span className="hp-spark hp-spark--3" aria-hidden="true" />
              <span className="hp-spark hp-spark--4" aria-hidden="true" />

              <div className="hp-success-badge">
                <svg viewBox="0 0 24 24" width="44" height="44" aria-hidden="true">
                  <path
                    d="M5 12.5l4.5 4.5L19 7.5"
                    pathLength="1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h2 id="hp-success-title">Booking Successful!</h2>
              <p>
                Thank you for booking with us. Our team will contact you shortly
                to confirm your stay.
              </p>

              <div className="hp-success-ref">
                <span>Booking ID</span>
                <strong>{booking.id}</strong>
              </div>
            </div>

            <div className="hp-success-body">
              <div className="hp-success-dates">
                <div className="hp-date-card">
                  <span className="hp-date-label">Check In</span>
                  <strong className="hp-date-day">{inParts.day}</strong>
                  <span className="hp-date-month">{inParts.month}</span>
                  <span className="hp-date-week">{inParts.weekday}</span>
                </div>

                <div className="hp-nights">
                  <Icon name="moon" size={15} />
                  <span>
                    {booking.nights} {booking.nights === 1 ? "Night" : "Nights"}
                  </span>
                </div>

                <div className="hp-date-card">
                  <span className="hp-date-label">Check Out</span>
                  <strong className="hp-date-day">{outParts.day}</strong>
                  <span className="hp-date-month">{outParts.month}</span>
                  <span className="hp-date-week">{outParts.weekday}</span>
                </div>
              </div>

              <ul className="hp-success-list">
                <li>
                  <span className="hp-list-icon">
                    <Icon name="bed" size={16} />
                  </span>
                  <span className="hp-list-label">Rooms</span>
                  <strong>{roomsText}</strong>
                </li>
                <li>
                  <span className="hp-list-icon">
                    <Icon name="users" size={16} />
                  </span>
                  <span className="hp-list-label">Guests</span>
                  <strong>{guestsText}</strong>
                </li>
              </ul>

              <button
                type="button"
                ref={doneRef}
                className="hp-success-done"
                onClick={closeSuccess}
              >
                <span>Done</span>
                <Icon name="check" size={17} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomepageMain;