import React, { useEffect, useState } from "react";
import "./AboutSeven.css";

/* ---------- Icons ---------- */
const Icon = ({ name, size = 18 }) => {
  const paths = {
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2.5" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    chevronDown: <path d="m6 9 6 6 6-6" />,
    chevronLeft: <path d="m15 18-6-6 6-6" />,
    chevronRight: <path d="m9 18 6-6-6-6" />,
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
  Math.round((new Date(b + "T00:00:00") - new Date(a + "T00:00:00")) / 86400000);

const formatDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

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
    <div className="as7-calendar">
      <div className="as7-cal-title">
        <Icon name="calendar" size={15} />
        <span>{title}</span>
        <button
          type="button"
          className="as7-cal-close"
          onClick={onClose}
          aria-label="Close calendar"
        >
          <Icon name="close" size={13} />
        </button>
      </div>

      <div className="as7-cal-nav">
        <button
          type="button"
          className="as7-cal-arrow"
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
          className="as7-cal-arrow"
          onClick={() => shift(1)}
          aria-label="Next month"
        >
          <Icon name="chevronRight" size={16} />
        </button>
      </div>

      <div className="as7-cal-grid as7-cal-week">
        {WEEKDAYS.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>

      <div className="as7-cal-grid as7-cal-days" key={`${view.y}-${view.m}`}>
        {cells.map((day, i) => {
          if (!day) return <span key={`e${i}`} />;
          const iso = toISO(view.y, view.m, day);
          const disabled = iso < min;
          const selected = iso === value;
          const inRange = rangeStart && rangeEnd && iso > rangeStart && iso < rangeEnd;
          const cls = [
            "as7-day",
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
              style={{ "--i": i }}
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

      <div className="as7-cal-foot">
        <span className="as7-cal-dot" aria-hidden="true" />
        {nights > 0
          ? `${nights} ${nights === 1 ? "night" : "nights"} selected`
          : "Select your stay dates"}
      </div>
    </div>
  );
};

/* ---------- Date field trigger (button that opens the calendar) ---------- */
const DateTrigger = ({ id, value, open, onClick }) => (
  <button
    type="button"
    id={id}
    className={`as7-date-trigger ${open ? "is-active" : ""} ${value ? "filled" : ""}`}
    onClick={onClick}
    aria-haspopup="dialog"
    aria-expanded={open}
  >
    <span className="as7-date-icon">
      <Icon name="calendar" size={16} />
    </span>
    <span className="as7-date-value">{value ? formatDate(value) : "Select date"}</span>
    <span className="as7-date-chevron">
      <Icon name="chevronDown" size={15} />
    </span>
  </button>
);

/* =========================================================
   MAIN COMPONENT
========================================================= */
const initialForm = {
  name: "",
  email: "",
  checkIn: "",
  checkOut: "",
  message: "",
};

const AboutSeven = () => {
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [picker, setPicker] = useState(null); // null | "checkIn" | "checkOut"
  const [error, setError] = useState("");

  const today = getToday();

  /* Escape closes the calendar */
  useEffect(() => {
    if (!picker) return undefined;
    const onKey = (e) => e.key === "Escape" && setPicker(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [picker]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectCheckIn = (iso) => {
    setFormData((prev) => ({
      ...prev,
      checkIn: iso,
      // if check-in moves past check-out, clear check-out
      checkOut: prev.checkOut && prev.checkOut <= iso ? "" : prev.checkOut,
    }));
    setError("");
    setPicker("checkOut"); // jump straight to check-out
  };

  const selectCheckOut = (iso) => {
    setFormData((prev) => ({ ...prev, checkOut: iso }));
    setError("");
    setPicker(null);
  };

  const openCheckOut = () => {
    if (!formData.checkIn) {
      setError("Please select your check-in date first.");
      setPicker("checkIn");
    } else {
      setPicker("checkOut");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.checkIn) {
      setError("Please select your check-in date.");
      setPicker("checkIn");
      return;
    }
    if (!formData.checkOut) {
      setError("Please select your check-out date.");
      setPicker("checkOut");
      return;
    }

    // TODO: send formData to your backend / email service here
    console.log("Contact enquiry:", formData);

    setError("");
    setSubmitted(true);
    setFormData(initialForm);
  };

  return (
    <section className="about-seven-section">
      {/* ================= LEFT IMAGE ================= */}
      <div className="about-seven-image">
        <img
          src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1800&q=90"
          alt="Premium luxury hotel bedroom"
        />

        <div className="about-seven-image-overlay"></div>

        {/* Phone Card */}
        <div className="about-seven-phone-card">
          <span className="about-seven-phone-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
            </svg>
          </span>

          <p>Call us for any inquiry</p>

          <a href="tel:98276581673">98276581673</a>

          <div className="about-seven-decoration" aria-hidden="true">
            <span></span>
            <i>❧</i>
            <span></span>
          </div>
        </div>
      </div>

      {/* ================= CONTACT FORM ================= */}
      <div className="about-seven-form-wrapper">
        <div className="about-seven-form-card">
          <span className="about-seven-subtitle">
            <span className="about-seven-subtitle-dot" aria-hidden="true"></span>
            CONTACT US
          </span>

          <h2>
            We’re Here to Make Your
            <br />
            Stay Unforgettable
          </h2>

          <span className="about-seven-title-line" aria-hidden="true"></span>

          <p className="about-seven-description">
            Have questions, need help with a reservation, or want to plan a
            custom experience? Our team is just a message away.
          </p>

          {submitted ? (
            <div className="about-seven-success">
              <span>✓</span>

              <h3>Thank You!</h3>

              <p>
                Your inquiry has been submitted successfully. Our team will
                contact you soon.
              </p>

              <button type="button" onClick={() => setSubmitted(false)}>
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <>
              <form className="about-seven-form" onSubmit={handleSubmit}>
                {/* Name */}
                <div className="about-seven-field">
                  <label htmlFor="about-seven-name">Name</label>

                  <input
                    type="text"
                    id="about-seven-name"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="about-seven-field">
                  <label htmlFor="about-seven-email">Email</label>

                  <input
                    type="email"
                    id="about-seven-email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>

                {/* Check In */}
                <div className="about-seven-field">
                  <label htmlFor="about-seven-checkin">Check In</label>

                  <DateTrigger
                    id="about-seven-checkin"
                    value={formData.checkIn}
                    open={picker === "checkIn"}
                    onClick={() => setPicker("checkIn")}
                  />
                </div>

                {/* Check Out */}
                <div className="about-seven-field">
                  <label htmlFor="about-seven-checkout">Check Out</label>

                  <DateTrigger
                    id="about-seven-checkout"
                    value={formData.checkOut}
                    open={picker === "checkOut"}
                    onClick={openCheckOut}
                  />
                </div>

                {/* Message */}
                <div className="about-seven-field about-seven-message">
                  <label htmlFor="about-seven-message">Message</label>

                  <textarea
                    id="about-seven-message"
                    name="message"
                    placeholder="Write Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    required
                  ></textarea>
                </div>

                {error && (
                  <p className="about-seven-error" role="alert">
                    {error}
                  </p>
                )}

                {/* Submit */}
                <button type="submit" className="about-seven-submit">
                  <span className="about-seven-submit-text">CHECK AVAILABILITY</span>
                  <span className="about-seven-submit-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </form>

              {/* Calendar overlay (always mounted so it can open and close smoothly) */}
              <div
                className={`as7-scrim ${picker ? "is-open" : ""}`}
                onClick={() => setPicker(null)}
                aria-hidden={!picker}
              >
                <div
                  className={`as7-pop ${picker === "checkIn" ? "is-open" : ""}`}
                  role="dialog"
                  aria-label="Select check-in date"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Calendar
                    open={picker === "checkIn"}
                    title="Select check-in date"
                    value={formData.checkIn}
                    min={today}
                    rangeStart={formData.checkIn}
                    rangeEnd={formData.checkOut}
                    onSelect={selectCheckIn}
                    onClose={() => setPicker(null)}
                  />
                </div>

                <div
                  className={`as7-pop ${picker === "checkOut" ? "is-open" : ""}`}
                  role="dialog"
                  aria-label="Select check-out date"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Calendar
                    open={picker === "checkOut"}
                    title="Select check-out date"
                    value={formData.checkOut}
                    min={addDays(formData.checkIn || today, 1)}
                    rangeStart={formData.checkIn}
                    rangeEnd={formData.checkOut}
                    onSelect={selectCheckOut}
                    onClose={() => setPicker(null)}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSeven;