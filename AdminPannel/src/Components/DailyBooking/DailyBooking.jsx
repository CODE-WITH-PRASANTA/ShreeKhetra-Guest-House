import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  Search,
  Plus,
  CalendarCheck,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  LogIn,
  LogOut,
  BedDouble,
  Users,
  Phone,
  IndianRupee,
  Wallet,
  Moon,
  Eye,
  X,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Save,
  User,
  Filter,
  ClipboardList,
} from "lucide-react";
import heroImg from "../../assets/hero.png";
import loginImg from "../../assets/login.png";
import residencyImg from "../../assets/SriKshetra Residency 03.png";
import "./DailyBooking.css";

/* ---------------------------------------------------------------
   Rooms (images come from src/assets). Replace with your API data.
---------------------------------------------------------------- */
const ROOMS = [
  { name: "Deluxe AC Double Room", rate: 2500, img: residencyImg },
  { name: "Sea View Room", rate: 3200, img: heroImg },
  { name: "Family Suite", rate: 3800, img: loginImg },
  { name: "Standard Non-AC Room", rate: 1500, img: residencyImg },
];
const roomOf = (name) => ROOMS.find((r) => r.name === name) || ROOMS[0];

const STATUS = {
  pending: "Pending",
  confirmed: "Confirmed",
  "checked-in": "Checked in",
  "checked-out": "Checked out",
  cancelled: "Cancelled",
};

// what the main action button does for each status
const NEXT_ACTION = {
  pending: { to: "confirmed", label: "Confirm", icon: CheckCircle2 },
  confirmed: { to: "checked-in", label: "Check in", icon: LogIn },
  "checked-in": { to: "checked-out", label: "Check out", icon: LogOut },
};

const PAGE_SIZE = 5;

/* ---------- date helpers (all dates are yyyy-mm-dd strings) ---------- */
const toISO = (d) => {
  const z = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
};
const TODAY = toISO(new Date());
const addDays = (iso, n) => {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + n);
  return toISO(d);
};
const nightsBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);
const fmt = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
const fmtLong = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
const rupee = (n) => "₹" + Number(n).toLocaleString("en-IN");

const payState = (b) => (b.paid >= b.amount ? "paid" : b.paid > 0 ? "partial" : "unpaid");
const PAY_LABEL = { paid: "Paid", partial: "Part paid", unpaid: "Unpaid" };

const stageOf = (b, date) =>
  b.checkIn === date ? "Arriving" : b.checkOut === date ? "Departing" : "Staying";

// Demo data – replace with your API response
const mk = (id, name, phone, room, inOff, outOff, guests, status, paidPct) => {
  const checkIn = addDays(TODAY, inOff);
  const checkOut = addDays(TODAY, outOff);
  const amount = roomOf(room).rate * nightsBetween(checkIn, checkOut);
  return { id, name, phone, room, checkIn, checkOut, guests, status, amount, paid: Math.round(amount * paidPct) };
};
const SEED = [
  mk(1, "Rohit Mishra", "9437012345", "Deluxe AC Double Room", 0, 2, 2, "confirmed", 0.4),
  mk(2, "Anita Das", "9861098765", "Family Suite", -1, 1, 4, "checked-in", 1),
  mk(3, "Suresh Patnaik", "9078123456", "Standard Non-AC Room", -2, 0, 1, "checked-in", 1),
  mk(4, "Priya Nayak", "9437654321", "Sea View Room", 0, 3, 2, "pending", 0),
  mk(5, "Amit Kumar", "9853012233", "Deluxe AC Double Room", 1, 3, 2, "confirmed", 0.5),
  mk(6, "Sneha Rath", "9776045566", "Deluxe AC Double Room", -1, 0, 2, "checked-out", 1),
  mk(7, "Biswajit Sahoo", "9937088990", "Standard Non-AC Room", 0, 1, 1, "confirmed", 0),
  mk(8, "Meera Joshi", "9124567890", "Family Suite", 0, 2, 3, "cancelled", 0),
];

/**
 * Custom dropdown (replaces the native <select>) – lives inside this file.
 *
 * Props
 *  value        current value
 *  onChange     (newValue) => void
 *  options      ["A","B"]  or  [{ value, label }]
 *  placeholder  text when nothing is selected
 *  icon         a lucide-react icon component (optional)
 *  invalid      shows a red border
 *  className    extra class for width / spacing
 */
const Dropdown = ({
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  icon: Icon,
  invalid = false,
  className = "",
  ariaLabel,
}) => {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef(null);
  const panelRef = useRef(null);

  const items = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  const selectedIndex = items.findIndex((o) => o.value === value);
  const selected = items[selectedIndex];
  const isOpen = open && !closing;

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 160); // matches the close animation time
  }, []);

  const openMenu = () => {
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  };

  const choose = (item) => {
    onChange?.(item.value);
    close();
  };

  // close when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) close();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [isOpen, close]);

  // keep the highlighted option visible while using the keyboard
  useEffect(() => {
    if (!isOpen || active < 0) return;
    panelRef.current?.querySelector(`[data-i="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, isOpen]);

  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) openMenu();
        else setActive((a) => (a + 1) % items.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!isOpen) openMenu();
        else setActive((a) => (a - 1 + items.length) % items.length);
        break;
      case "Home":
        if (isOpen) { e.preventDefault(); setActive(0); }
        break;
      case "End":
        if (isOpen) { e.preventDefault(); setActive(items.length - 1); }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (!isOpen) openMenu();
        else if (active >= 0) choose(items[active]);
        break;
      case "Escape":
        if (isOpen) { e.preventDefault(); close(); }
        break;
      case "Tab":
        if (isOpen) close();
        break;
      default:
    }
  };

  return (
    <div ref={rootRef} className={`db-dd ${isOpen ? "is-open" : ""} ${className}`}>
      <button
        type="button"
        className={`db-dd-trigger ${invalid ? "is-invalid" : ""}`}
        onClick={() => (isOpen ? close() : openMenu())}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        {Icon && <Icon size={18} className="db-dd-icon" />}
        <span className={`db-dd-value ${selected ? "" : "is-placeholder"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={18} className="db-dd-chevron" />
      </button>

      {open && (
        <ul ref={panelRef} className={`db-dd-panel ${closing ? "is-closing" : ""}`} role="listbox">
          {items.map((item, i) => (
            <li
              key={item.value}
              data-i={i}
              role="option"
              aria-selected={item.value === value}
              className={`db-dd-option ${item.value === value ? "is-selected" : ""} ${i === active ? "is-active" : ""}`}
              style={{ "--i": Math.min(i, 9) }}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(item)}
            >
              <span className="db-dd-option-label">{item.label}</span>
              {item.value === value && <Check size={16} className="db-dd-check" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


/* ---------- Small components ---------- */

const StatCard = ({ icon: Icon, label, value, tone, index }) => (
  <div className={`db-stat db-stat--${tone}`} style={{ "--i": index }}>
    <div className="db-stat-icon">
      <Icon size={20} />
    </div>
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  </div>
);

const Modal = ({ children, onClose, wide }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="db-overlay" onMouseDown={onClose}>
      <div
        className={`db-modal ${wide ? "db-modal--wide" : ""}`}
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
};

const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [toast, onClose]);
  if (!toast) return null;
  return (
    <div className={`db-toast db-toast--${toast.type}`} role="status">
      {toast.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
      <span>{toast.message}</span>
      <button type="button" onClick={onClose} aria-label="Close">
        <X size={16} />
      </button>
    </div>
  );
};

const BookingRow = ({ b, index, date, onAction, onView, onCancel }) => {
  const room = roomOf(b.room);
  const next = NEXT_ACTION[b.status];
  const pay = payState(b);
  const nights = nightsBetween(b.checkIn, b.checkOut);

  return (
    <article className={`db-row ${b.status === "cancelled" ? "is-cancelled" : ""}`} style={{ "--i": index }}>
      <div className="db-guest" data-label="Guest">
        <span className="db-avatar">{b.name.charAt(0)}</span>
        <div>
          <strong>{b.name}</strong>
          <span>
            <Phone size={13} /> {b.phone}
          </span>
        </div>
      </div>

      <div className="db-room" data-label="Room">
        <img src={room.img} alt="" loading="lazy" />
        <div>
          <strong>{b.room}</strong>
          <span>
            <Users size={13} /> {b.guests} {b.guests > 1 ? "guests" : "guest"}
          </span>
        </div>
      </div>

      <div className="db-stay" data-label="Stay">
        <strong>
          {fmt(b.checkIn)} – {fmt(b.checkOut)}
        </strong>
        <span>
          <Moon size={13} /> {nights} {nights > 1 ? "nights" : "night"}
          {b.status !== "cancelled" && (
            <em className={`db-stage db-stage--${stageOf(b, date).toLowerCase()}`}>{stageOf(b, date)}</em>
          )}
        </span>
      </div>

      <div className="db-pay" data-label="Payment">
        <strong>{rupee(b.amount)}</strong>
        <span className={`db-pill db-pill--${pay}`}>{PAY_LABEL[pay]}</span>
      </div>

      <div className="db-state" data-label="Status">
        <span className={`db-badge db-badge--${b.status}`}>{STATUS[b.status]}</span>
      </div>

      <div className="db-actions">
        {next && (
          <button type="button" className="db-act db-act--main" onClick={() => onAction(b.id, next.to)}>
            <next.icon size={15} /> {next.label}
          </button>
        )}
        <button type="button" className="db-act" onClick={() => onView(b)} title="View details">
          <Eye size={15} />
        </button>
        {(b.status === "pending" || b.status === "confirmed") && (
          <button type="button" className="db-act db-act--danger" onClick={() => onCancel(b)} title="Cancel booking">
            <XCircle size={15} />
          </button>
        )}
      </div>
    </article>
  );
};

/* ---------- Main component ---------- */

const emptyForm = (date) => ({
  name: "",
  phone: "",
  room: ROOMS[0].name,
  checkIn: date,
  checkOut: addDays(date, 1),
  guests: "2",
  advance: "",
});

const DailyBooking = () => {
  const [bookings, setBookings] = useState(SEED);
  const [date, setDate] = useState(TODAY);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [roomFilter, setRoomFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [animKey, setAnimKey] = useState(0);
  const [detail, setDetail] = useState(null);
  const [cancelling, setCancelling] = useState(null);
  const [form, setForm] = useState(null); // add-booking form
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const replay = () => setAnimKey((k) => k + 1);

  const dayBookings = useMemo(
    () => bookings.filter((b) => b.checkIn <= date && date <= b.checkOut),
    [bookings, date]
  );

  const stats = useMemo(() => {
    const live = dayBookings.filter((b) => b.status !== "cancelled");
    return {
      arrivals: live.filter((b) => b.checkIn === date).length,
      departures: live.filter((b) => b.checkOut === date).length,
      inHouse: live.filter((b) => b.status === "checked-in").length,
      collected: live.reduce((s, b) => s + b.paid, 0),
    };
  }, [dayBookings, date]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dayBookings.filter(
      (b) =>
        (status === "all" || b.status === status) &&
        (roomFilter === "all" || b.room === roomFilter) &&
        (!q || b.name.toLowerCase().includes(q) || b.phone.includes(q))
    );
  }, [dayBookings, query, status, roomFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  /* ---- filters ---- */
  const changeDate = (iso) => {
    if (!iso) return;
    setDate(iso);
    setPage(1);
    replay();
  };
  const pick = (setter) => (v) => {
    setter(v);
    setPage(1);
    replay();
  };
  const goPage = (p) => {
    setPage(p);
    replay();
  };
  const clearFilters = () => {
    setQuery("");
    setStatus("all");
    setRoomFilter("all");
    setPage(1);
    replay();
  };

  /* ---- booking actions ---- */
  const updateBooking = (id, patch) =>
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));

  const changeStatus = (id, to) => {
    // TODO: await axios.put(`/api/bookings/${id}/status`, { status: to })
    updateBooking(id, { status: to });
    setDetail((d) => (d && d.id === id ? { ...d, status: to } : d));
    const msg = {
      confirmed: "Booking confirmed.",
      "checked-in": "Guest checked in.",
      "checked-out": "Guest checked out.",
    };
    setToast({ type: "success", message: msg[to] });
  };

  const markPaid = (b) => {
    updateBooking(b.id, { paid: b.amount });
    setDetail({ ...b, paid: b.amount });
    setToast({ type: "success", message: "Payment marked as paid." });
  };

  const confirmCancel = () => {
    // TODO: await axios.put(`/api/bookings/${cancelling.id}/cancel`)
    updateBooking(cancelling.id, { status: "cancelled" });
    setToast({ type: "success", message: "Booking cancelled." });
    setCancelling(null);
  };

  /* ---- add booking ---- */
  const openForm = () => {
    setForm(emptyForm(date));
    setErrors({});
  };
  const setField = (name, value) => {
    setForm((f) => {
      const next = { ...f, [name]: value };
      if (name === "checkIn" && next.checkOut <= value) next.checkOut = addDays(value, 1);
      return next;
    });
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const formNights = form ? Math.max(0, nightsBetween(form.checkIn, form.checkOut)) : 0;
  const formTotal = form ? formNights * roomOf(form.room).rate : 0;

  const saveBooking = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Enter guest name.";
    if (!/^\d{10}$/.test(form.phone)) err.phone = "Enter a 10-digit phone number.";
    if (!form.checkIn) err.checkIn = "Select check-in date.";
    if (!form.checkOut || form.checkOut <= form.checkIn) err.checkOut = "Check-out must be after check-in.";
    setErrors(err);
    if (Object.keys(err).length) return;

    const booking = {
      id: Math.max(0, ...bookings.map((b) => b.id)) + 1,
      name: form.name.trim(),
      phone: form.phone,
      room: form.room,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      guests: Number(form.guests),
      status: "confirmed",
      amount: formTotal,
      paid: Math.min(Number(form.advance) || 0, formTotal),
    };
    // TODO: await axios.post("/api/bookings", booking)
    setBookings((prev) => [booking, ...prev]);
    setForm(null);
    setDate(booking.checkIn);
    setPage(1);
    replay();
    setToast({ type: "success", message: "Booking added successfully." });
  };

  const isToday = date === TODAY;

  return (
    <div className="db-page">
      {/* Banner */}
      <div className="db-banner">
        <div className="db-banner-icon">
          <CalendarCheck size={26} />
        </div>
        <div className="db-banner-text">
          <h2>Daily Bookings</h2>
          <p>Track arrivals, departures and stays of Srikhetra Guest House</p>
        </div>
        <button type="button" className="db-btn db-btn--white" onClick={openForm}>
          <Plus size={18} /> New Booking
        </button>
      </div>

      {/* Stats */}
      <div className="db-stats">
        <StatCard index={0} icon={LogIn} label="Arrivals" value={stats.arrivals} tone="blue" />
        <StatCard index={1} icon={LogOut} label="Departures" value={stats.departures} tone="amber" />
        <StatCard index={2} icon={BedDouble} label="In-house rooms" value={stats.inHouse} tone="green" />
        <StatCard index={3} icon={Wallet} label="Collected" value={rupee(stats.collected)} tone="violet" />
      </div>

      {/* Toolbar */}
      <div className="db-toolbar">
        <div className="db-datebar">
          <button type="button" onClick={() => changeDate(addDays(date, -1))} aria-label="Previous day">
            <ChevronLeft size={18} />
          </button>
          <label className="db-date">
            <CalendarDays size={17} />
            <input type="date" value={date} onChange={(e) => changeDate(e.target.value)} />
          </label>
          <button type="button" onClick={() => changeDate(addDays(date, 1))} aria-label="Next day">
            <ChevronRight size={18} />
          </button>
          <button type="button" className={`db-today ${isToday ? "is-on" : ""}`} onClick={() => changeDate(TODAY)}>
            Today
          </button>
        </div>

        <div className="db-search">
          <Search size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => pick(setQuery)(e.target.value)}
            placeholder="Search guest name or phone..."
          />
          {query && (
            <button type="button" onClick={() => pick(setQuery)("")} aria-label="Clear search">
              <X size={16} />
            </button>
          )}
        </div>

        <Dropdown
          className="db-filter"
          icon={Filter}
          value={status}
          onChange={pick(setStatus)}
          options={[
            { value: "all", label: "All status" },
            ...Object.entries(STATUS).map(([value, label]) => ({ value, label })),
          ]}
        />
        <Dropdown
          className="db-filter"
          icon={BedDouble}
          value={roomFilter}
          onChange={pick(setRoomFilter)}
          options={[{ value: "all", label: "All rooms" }, ...ROOMS.map((r) => r.name)]}
        />
      </div>

      {/* Day heading */}
      <div className="db-dayline" key={date}>
        <h3>{fmtLong(date)}</h3>
        {isToday && <span className="db-chip">Today</span>}
        <span className="db-count">
          {filtered.length} {filtered.length === 1 ? "booking" : "bookings"}
        </span>
      </div>

      {/* Table */}
      {visible.length ? (
        <div className="db-table">
          <div className="db-head">
            <span>Guest</span>
            <span>Room</span>
            <span>Stay</span>
            <span>Payment</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          <div key={animKey} className="db-rows">
            {visible.map((b, i) => (
              <BookingRow
                key={b.id}
                b={b}
                index={i}
                date={date}
                onAction={changeStatus}
                onView={setDetail}
                onCancel={setCancelling}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="db-empty">
          <div className="db-empty-icon">
            <ClipboardList size={30} />
          </div>
          <h3>No bookings for this day</h3>
          <p>Try another date or filter, or add a new booking.</p>
          <div className="db-empty-actions">
            <button type="button" className="db-btn db-btn--outline" onClick={clearFilters}>
              Clear filters
            </button>
            <button type="button" className="db-btn db-btn--primary" onClick={openForm}>
              <Plus size={16} /> New Booking
            </button>
          </div>
        </div>
      )}

      {/* Pagination */}
      {filtered.length > PAGE_SIZE && (
        <div className="db-pager">
          <span>
            Showing {(current - 1) * PAGE_SIZE + 1}–{Math.min(current * PAGE_SIZE, filtered.length)} of{" "}
            {filtered.length}
          </span>
          <div className="db-pager-btns">
            <button type="button" disabled={current === 1} onClick={() => goPage(current - 1)} aria-label="Previous page">
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} type="button" className={p === current ? "is-active" : ""} onClick={() => goPage(p)}>
                {p}
              </button>
            ))}
            <button type="button" disabled={current === totalPages} onClick={() => goPage(current + 1)} aria-label="Next page">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Details modal */}
      {detail && (
        <Modal onClose={() => setDetail(null)}>
          <div className="db-detail-top">
            <img src={roomOf(detail.room).img} alt="" />
            <button type="button" className="db-detail-close" onClick={() => setDetail(null)} aria-label="Close">
              <X size={18} />
            </button>
            <div className="db-detail-title">
              <h3>{detail.name}</h3>
              <span className={`db-badge db-badge--${detail.status}`}>{STATUS[detail.status]}</span>
            </div>
          </div>
          <div className="db-detail-grid">
            <div><span>Phone</span><strong>{detail.phone}</strong></div>
            <div><span>Room</span><strong>{detail.room}</strong></div>
            <div><span>Check-in</span><strong>{fmtLong(detail.checkIn)}</strong></div>
            <div><span>Check-out</span><strong>{fmtLong(detail.checkOut)}</strong></div>
            <div><span>Nights</span><strong>{nightsBetween(detail.checkIn, detail.checkOut)}</strong></div>
            <div><span>Guests</span><strong>{detail.guests}</strong></div>
            <div><span>Total amount</span><strong>{rupee(detail.amount)}</strong></div>
            <div>
              <span>Balance due</span>
              <strong className={detail.amount - detail.paid > 0 ? "is-due" : "is-clear"}>
                {rupee(detail.amount - detail.paid)}
              </strong>
            </div>
          </div>
          <div className="db-modal-foot">
            {detail.amount - detail.paid > 0 && detail.status !== "cancelled" && (
              <button type="button" className="db-btn db-btn--outline" onClick={() => markPaid(detail)}>
                <IndianRupee size={16} /> Mark as paid
              </button>
            )}
            {NEXT_ACTION[detail.status] && (
              <button
                type="button"
                className="db-btn db-btn--primary"
                onClick={() => changeStatus(detail.id, NEXT_ACTION[detail.status].to)}
              >
                {React.createElement(NEXT_ACTION[detail.status].icon, { size: 16 })}
                {NEXT_ACTION[detail.status].label}
              </button>
            )}
          </div>
        </Modal>
      )}

      {/* Cancel modal */}
      {cancelling && (
        <Modal onClose={() => setCancelling(null)}>
          <div className="db-modal-body db-confirm">
            <div className="db-confirm-icon">
              <AlertTriangle size={28} />
            </div>
            <h3>Cancel this booking?</h3>
            <p>
              The booking of {cancelling.name} ({fmt(cancelling.checkIn)} – {fmt(cancelling.checkOut)}) will be
              marked as cancelled.
            </p>
            <div className="db-modal-foot db-modal-foot--center">
              <button type="button" className="db-btn db-btn--outline" onClick={() => setCancelling(null)}>
                Keep booking
              </button>
              <button type="button" className="db-btn db-btn--danger" onClick={confirmCancel}>
                <XCircle size={16} /> Cancel booking
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* New booking modal */}
      {form && (
        <Modal onClose={() => setForm(null)} wide>
          <form onSubmit={saveBooking} noValidate>
            <div className="db-modal-head">
              <h3>
                <Plus size={18} /> New Booking
              </h3>
              <button type="button" onClick={() => setForm(null)} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <div className="db-modal-body">
              <div className="db-modal-row">
                <div className="db-field">
                  <span>Guest name</span>
                  <div className={`db-input ${errors.name ? "is-invalid" : ""}`}>
                    <User size={17} />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setField("name", e.target.value)}
                      placeholder="e.g. Rohit Mishra"
                      autoFocus
                    />
                  </div>
                  {errors.name && <small className="db-error">{errors.name}</small>}
                </div>
                <div className="db-field">
                  <span>Phone</span>
                  <div className={`db-input ${errors.phone ? "is-invalid" : ""}`}>
                    <Phone size={17} />
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={form.phone}
                      onChange={(e) => setField("phone", e.target.value.replace(/\D/g, ""))}
                      placeholder="10-digit number"
                    />
                  </div>
                  {errors.phone && <small className="db-error">{errors.phone}</small>}
                </div>
              </div>

              <div className="db-modal-row">
                <div className="db-field">
                  <span>Room</span>
                  <Dropdown
                    icon={BedDouble}
                    value={form.room}
                    onChange={(v) => setField("room", v)}
                    options={ROOMS.map((r) => ({ value: r.name, label: `${r.name} · ${rupee(r.rate)}` }))}
                  />
                </div>
                <div className="db-field">
                  <span>Guests</span>
                  <Dropdown
                    icon={Users}
                    value={form.guests}
                    onChange={(v) => setField("guests", v)}
                    options={["1", "2", "3", "4", "5", "6"].map((n) => ({
                      value: n,
                      label: `${n} ${n === "1" ? "guest" : "guests"}`,
                    }))}
                  />
                </div>
              </div>

              <div className="db-modal-row">
                <div className="db-field">
                  <span>Check-in</span>
                  <div className={`db-input ${errors.checkIn ? "is-invalid" : ""}`}>
                    <CalendarDays size={17} />
                    <input type="date" value={form.checkIn} onChange={(e) => setField("checkIn", e.target.value)} />
                  </div>
                  {errors.checkIn && <small className="db-error">{errors.checkIn}</small>}
                </div>
                <div className="db-field">
                  <span>Check-out</span>
                  <div className={`db-input ${errors.checkOut ? "is-invalid" : ""}`}>
                    <CalendarDays size={17} />
                    <input
                      type="date"
                      min={addDays(form.checkIn || TODAY, 1)}
                      value={form.checkOut}
                      onChange={(e) => setField("checkOut", e.target.value)}
                    />
                  </div>
                  {errors.checkOut && <small className="db-error">{errors.checkOut}</small>}
                </div>
              </div>

              <div className="db-modal-row">
                <div className="db-field">
                  <span>Advance paid (₹)</span>
                  <div className="db-input">
                    <IndianRupee size={17} />
                    <input
                      type="number"
                      min="0"
                      value={form.advance}
                      onChange={(e) => setField("advance", e.target.value)}
                      placeholder="Optional"
                    />
                  </div>
                </div>
                <div className="db-total">
                  <span>
                    {formNights} {formNights === 1 ? "night" : "nights"} total
                  </span>
                  <strong>{rupee(formTotal)}</strong>
                </div>
              </div>
            </div>
            <div className="db-modal-foot">
              <button type="button" className="db-btn db-btn--outline" onClick={() => setForm(null)}>
                Cancel
              </button>
              <button type="submit" className="db-btn db-btn--primary">
                <Save size={16} /> Save booking
              </button>
            </div>
          </form>
        </Modal>
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};

export default DailyBooking;