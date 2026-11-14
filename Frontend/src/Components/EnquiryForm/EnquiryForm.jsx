import React, { useEffect, useState } from "react";
import "./EnquiryForm.css";

/* ==========================================
   ICONS
========================================== */
const Icon = ({ name, size = 16 }) => {
  const paths = {
    home: (
      <>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V20h14V9.5" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
    message: (
      <>
        <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 4a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
        <path d="M8 10h8M8 14h5" />
      </>
    ),
    close: <path d="m18 6-12 12M6 6l12 12" />,
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21a7 7 0 0 1 14 0" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 7 9-7" />
      </>
    ),
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    bed: (
      <>
        <path d="M3 5v14M3 16h18v3M3 11h18v5M7 11V8h5a3 3 0 0 1 3 3" />
        <path d="M15 11h3a3 3 0 0 1 3 3" />
      </>
    ),
    arrowCircle: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m11 8 4 4-4 4M8 12h7" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevronDown: <path d="m6 9 6 6 6-6" />,
    chevronLeft: <path d="m15 18-6-6 6-6" />,
    chevronRight: <path d="m9 18 6-6-6-6" />,
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

/* ==========================================
   DATE HELPERS (all dates are "YYYY-MM-DD")
========================================== */
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

const formatDate = (dateStr) =>
  new Date(dateStr + "T00:00:00").toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

/* ==========================================
   CUSTOM CALENDAR
========================================== */
const Calendar = ({ title, value, min, rangeStart, rangeEnd, onSelect, onClose }) => {
  const today = getToday();
  const seed = new Date((value || min || today) + "T00:00:00");
  const [view, setView] = useState({ y: seed.getFullYear(), m: seed.getMonth() });

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

  return (
    <div className="EnquiryForm-calendar" role="dialog" aria-label={title}>
      <div className="EnquiryForm-calTitle">
        <Icon name="calendar" size={14} />
        <span>{title}</span>
        <button
          type="button"
          className="EnquiryForm-calClose"
          onClick={onClose}
          aria-label="Close calendar"
        >
          <Icon name="close" size={12} />
        </button>
      </div>

      <div className="EnquiryForm-calNav">
        <button
          type="button"
          className="EnquiryForm-calArrow"
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
          className="EnquiryForm-calArrow"
          onClick={() => shift(1)}
          aria-label="Next month"
        >
          <Icon name="chevronRight" size={16} />
        </button>
      </div>

      <div className="EnquiryForm-calGrid EnquiryForm-calWeek">
        {WEEKDAYS.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>

      <div className="EnquiryForm-calGrid">
        {cells.map((day, i) => {
          if (!day) return <span key={`e${i}`} />;
          const iso = toISO(view.y, view.m, day);
          const disabled = iso < min;
          const selected = iso === value;
          const inRange =
            rangeStart && rangeEnd && iso > rangeStart && iso < rangeEnd;
          const cls = [
            "EnquiryForm-day",
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
    </div>
  );
};

/* ==========================================
   FORM
========================================== */
const ROOM_TYPES = [
  "Standard Room",
  "Deluxe Room",
  "Premium Room",
  "Family Room",
  "Suite Room",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  checkIn: "",
  checkOut: "",
  roomType: "",
  message: "",
};

const EnquiryForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [picker, setPicker] = useState(null); // null | "checkIn" | "checkOut"
  const [roomOpen, setRoomOpen] = useState(false);
  const [error, setError] = useState("");

  /* Hide floating call / WhatsApp icons while the form is open */
  useEffect(() => {
    document.body.classList.toggle("enquiry-open", isOpen);
    return () => document.body.classList.remove("enquiry-open");
  }, [isOpen]);

  /* Escape: close popover first, then the form */
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      if (picker) setPicker(null);
      else if (roomOpen) setRoomOpen(false);
      else closeForm();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, picker, roomOpen]);

  const openForm = () => {
    setSubmittedData(null);
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
    setSubmittedData(null);
    setPicker(null);
    setRoomOpen(false);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectRoom = (room) => {
    setFormData((prev) => ({ ...prev, roomType: room }));
    setRoomOpen(false);
    setError("");
  };

  const selectDate = (field, iso) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: iso };
      if (field === "checkIn" && prev.checkOut && prev.checkOut <= iso) {
        next.checkOut = "";
      }
      return next;
    });
    setError("");
    // After picking check-in, jump straight to check-out
    setPicker(field === "checkIn" ? "checkOut" : null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.roomType) return setError("Please select a room type.");
    if (!formData.checkIn) return setError("Please select a check-in date.");
    if (!formData.checkOut) return setError("Please select a check-out date.");
    if (formData.checkOut <= formData.checkIn)
      return setError("Check-out date must be after check-in date.");

    const payload = {
      ...formData,
      website: "ShreeKhetra Guest House",
      submittedAt: new Date().toISOString(),
    };
    setSubmittedData(payload);
    setFormData(initialForm);
    setError("");
    console.log("Enquiry Submitted:", payload);
  };

  const today = getToday();

  return (
    <div className="EnquiryForm">
      {!isOpen && (
        <button
          type="button"
          className="EnquiryForm-trigger"
          onClick={openForm}
          aria-label="Open enquiry form"
        >
          <Icon name="message" size={19} />
          <span>Enquire Now</span>
        </button>
      )}

      {isOpen && (
        <aside
          className="EnquiryForm-panel"
          role="dialog"
          aria-labelledby="EnquiryForm-title"
        >
          <div className="EnquiryForm-header">
            <button
              type="button"
              className="EnquiryForm-close"
              onClick={closeForm}
              aria-label="Close enquiry form"
            >
              <Icon name="close" size={15} />
            </button>

            <div className="EnquiryForm-headerIcon">
              <Icon name="home" size={18} />
            </div>

            <h2 id="EnquiryForm-title">Enquire Now</h2>
            <p>
              Fill in your details and our guest house team will contact you
              soon.
            </p>
            <span className="EnquiryForm-headerLine" />
          </div>

          <div className="EnquiryForm-body">
            {!submittedData ? (
              <form
                className="EnquiryForm-form"
                onSubmit={handleSubmit}
                noValidate={false}
              >
                {/* Full name */}
                <div className="EnquiryForm-box">
                  <span className="EnquiryForm-boxIcon">
                    <Icon name="user" />
                  </span>
                  <div className="EnquiryForm-boxContent">
                    <label htmlFor="ef-name">FULL NAME</label>
                    <input
                      id="ef-name"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      minLength={2}
                      autoComplete="name"
                    />
                  </div>
                </div>

                {/* Room type: custom premium dropdown */}
                <div
                  className={`EnquiryForm-box EnquiryForm-selectBox ${
                    roomOpen ? "is-open" : ""
                  }`}
                >
                  <span className="EnquiryForm-boxIcon">
                    <Icon name="bed" />
                  </span>
                  <button
                    type="button"
                    className="EnquiryForm-boxContent EnquiryForm-selectTrigger"
                    onClick={() => {
                      setPicker(null);
                      setRoomOpen((o) => !o);
                    }}
                    aria-haspopup="listbox"
                    aria-expanded={roomOpen}
                  >
                    <span className="EnquiryForm-fieldLabel">ROOM TYPE</span>
                    <span
                      className={`EnquiryForm-dateText ${
                        formData.roomType ? "filled" : ""
                      }`}
                    >
                      {formData.roomType || "Select room type"}
                    </span>
                  </button>
                  <span className="EnquiryForm-chevron">
                    <Icon name="chevronDown" size={16} />
                  </span>

                  {roomOpen && (
                    <>
                      <div
                        className="EnquiryForm-scrim EnquiryForm-scrim--clear"
                        onClick={() => setRoomOpen(false)}
                      />
                      <ul className="EnquiryForm-menu" role="listbox">
                        {ROOM_TYPES.map((room) => {
                          const active = formData.roomType === room;
                          return (
                            <li key={room} role="option" aria-selected={active}>
                              <button
                                type="button"
                                className={`EnquiryForm-option ${
                                  active ? "is-active" : ""
                                }`}
                                onClick={() => selectRoom(room)}
                              >
                                <span>{room}</span>
                                {active && <Icon name="check" size={14} />}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                </div>

                {/* Check-in / Check-out */}
                <div className="EnquiryForm-row">
                  <button
                    type="button"
                    className={`EnquiryForm-box EnquiryForm-dateBox ${
                      picker === "checkIn" ? "is-active" : ""
                    }`}
                    onClick={() => {
                      setRoomOpen(false);
                      setPicker("checkIn");
                    }}
                    aria-label="Select check-in date"
                  >
                    <span className="EnquiryForm-boxIcon">
                      <Icon name="calendar" />
                    </span>
                    <span className="EnquiryForm-boxContent">
                      <span className="EnquiryForm-fieldLabel">CHECK-IN</span>
                      <span
                        className={`EnquiryForm-dateText ${
                          formData.checkIn ? "filled" : ""
                        }`}
                      >
                        {formData.checkIn
                          ? formatDate(formData.checkIn)
                          : "Select date"}
                      </span>
                    </span>
                  </button>

                  <button
                    type="button"
                    className={`EnquiryForm-box EnquiryForm-dateBox ${
                      picker === "checkOut" ? "is-active" : ""
                    }`}
                    onClick={() => {
                      setRoomOpen(false);
                      if (!formData.checkIn) {
                        setError("Select a check-in date first.");
                        setPicker("checkIn");
                      } else {
                        setPicker("checkOut");
                      }
                    }}
                    aria-label="Select check-out date"
                  >
                    <span className="EnquiryForm-boxIcon">
                      <Icon name="calendar" />
                    </span>
                    <span className="EnquiryForm-boxContent">
                      <span className="EnquiryForm-fieldLabel">CHECK-OUT</span>
                      <span
                        className={`EnquiryForm-dateText ${
                          formData.checkOut ? "filled" : ""
                        }`}
                      >
                        {formData.checkOut
                          ? formatDate(formData.checkOut)
                          : "Select date"}
                      </span>
                    </span>
                  </button>
                </div>

                {/* Email */}
                <div className="EnquiryForm-box">
                  <span className="EnquiryForm-boxIcon">
                    <Icon name="mail" />
                  </span>
                  <div className="EnquiryForm-boxContent">
                    <label htmlFor="ef-email">EMAIL ADDRESS</label>
                    <input
                      id="ef-email"
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div className="EnquiryForm-box">
                  <span className="EnquiryForm-boxIcon">
                    <Icon name="phone" />
                  </span>
                  <div className="EnquiryForm-boxContent">
                    <label htmlFor="ef-phone">MOBILE NUMBER</label>
                    <input
                      id="ef-phone"
                      type="tel"
                      name="phone"
                      placeholder="Enter 10-digit mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      inputMode="numeric"
                      autoComplete="tel"
                      title="Please enter a valid 10-digit mobile number"
                    />
                  </div>
                </div>

                {/* Optional message */}
                <div className="EnquiryForm-box">
                  <span className="EnquiryForm-boxIcon">
                    <Icon name="message" />
                  </span>
                  <div className="EnquiryForm-boxContent">
                    <label htmlFor="ef-msg">SPECIAL REQUEST (OPTIONAL)</label>
                    <input
                      id="ef-msg"
                      type="text"
                      name="message"
                      placeholder="Any specific requirement..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {error && (
                  <p className="EnquiryForm-error" role="alert">
                    {error}
                  </p>
                )}

                <button type="submit" className="EnquiryForm-submit">
                  <span>Book Your Stay</span>
                  <Icon name="arrowCircle" size={17} />
                </button>

                <p className="EnquiryForm-note">
                  <Icon name="shield" size={13} />
                  <span>Instant Confirmation • No Hidden Charges</span>
                </p>
              </form>
            ) : (
              <div className="EnquiryForm-success">
                <div className="EnquiryForm-successBadge">
                  <Icon name="check" size={26} />
                </div>
                <h3>Enquiry Submitted!</h3>
                <p>
                  Thank you, <strong>{submittedData.name}</strong>. Our team
                  will reach out shortly.
                </p>

                <div className="EnquiryForm-summary">
                  <div>
                    <span>Room Type</span>
                    <strong>{submittedData.roomType}</strong>
                  </div>
                  <div>
                    <span>Stay Dates</span>
                    <strong>
                      {formatDate(submittedData.checkIn)} –{" "}
                      {formatDate(submittedData.checkOut)}
                    </strong>
                  </div>
                  <div>
                    <span>Mobile</span>
                    <strong>{submittedData.phone}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="EnquiryForm-submit"
                  onClick={closeForm}
                >
                  <span>Done & Close</span>
                  <Icon name="check" size={17} />
                </button>
              </div>
            )}
          </div>

          {/* Calendar overlay (rendered inside the panel so it is never clipped) */}
          {picker && !submittedData && (
            <div
              className="EnquiryForm-scrim EnquiryForm-scrim--dim"
              onClick={() => setPicker(null)}
            >
              <div onClick={(e) => e.stopPropagation()}>
                {picker === "checkIn" ? (
                  <Calendar
                    key="in"
                    title="Select check-in date"
                    value={formData.checkIn}
                    min={today}
                    rangeStart={formData.checkIn}
                    rangeEnd={formData.checkOut}
                    onSelect={(iso) => selectDate("checkIn", iso)}
                    onClose={() => setPicker(null)}
                  />
                ) : (
                  <Calendar
                    key="out"
                    title="Select check-out date"
                    value={formData.checkOut}
                    min={addDays(formData.checkIn, 1)}
                    rangeStart={formData.checkIn}
                    rangeEnd={formData.checkOut}
                    onSelect={(iso) => selectDate("checkOut", iso)}
                    onClose={() => setPicker(null)}
                  />
                )}
              </div>
            </div>
          )}
        </aside>
      )}
    </div>
  );
};

export default EnquiryForm;