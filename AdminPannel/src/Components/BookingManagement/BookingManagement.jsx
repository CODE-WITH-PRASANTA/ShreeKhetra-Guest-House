import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  CalendarCheck,
  CalendarDays,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  X,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Ban,
  BadgeCheck,
  Clock,
  IndianRupee,
  RotateCcw,
  LogIn,
  LogOut,
  Moon,
  Users,
  Phone,
  Hash,
  ArrowRight,
  Hotel,
  Wallet,
} from "lucide-react";
import "./BookingManagement.css";

/* ---------------------------------------------------------------
   Demo data – replace with your API response.
   status : pending | confirmed | checked-in | checked-out | cancelled
   paid   : amount received so far (payment status is worked out
            from paid vs. total amount)
---------------------------------------------------------------- */
const toISO = (d) => {
  const z = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
};
const addDays = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return toISO(d);
};
const TODAY = toISO(new Date());

const ROOMS = {
  "Deluxe AC Double Room": { rate: 2400, count: 4 },
  "Family Suite": { rate: 3200, count: 2 },
  "Standard Non-AC Room": { rate: 1200, count: 5 },
  "Sea View Room": { rate: 2800, count: 3 },
};
const TOTAL_ROOMS = Object.values(ROOMS).reduce((s, r) => s + r.count, 0);

const nightsBetween = (a, b) =>
  Math.round((new Date(b + "T00:00:00") - new Date(a + "T00:00:00")) / 86400000);

const mk = (id, name, phone, room, inD, outD, guests, status, paid) => {
  const checkIn = addDays(inD);
  const checkOut = addDays(outD);
  const nights = nightsBetween(checkIn, checkOut);
  return { id, code: `BK-${1000 + id}`, name, phone, room, checkIn, checkOut, guests, status, paid, amount: nights * ROOMS[room].rate };
};

const SEED = [
  mk(1, "Rohit Mishra", "9437012345", "Deluxe AC Double Room", 1, 3, 2, "pending", 0),
  mk(2, "Anita Das", "9861098765", "Family Suite", -1, 1, 4, "checked-in", 6400),
  mk(3, "Suresh Patnaik", "9078123456", "Standard Non-AC Room", -6, -4, 1, "checked-out", 2400),
  mk(4, "Priya Nayak", "7381234567", "Sea View Room", 0, 2, 2, "confirmed", 2000),
  mk(5, "Amit Kumar", "9853456789", "Deluxe AC Double Room", 5, 7, 2, "confirmed", 2000),
  mk(6, "Sneha Rath", "9692345678", "Sea View Room", -2, 0, 2, "checked-in", 5600),
  mk(7, "Biswajit Sahoo", "9937654321", "Standard Non-AC Room", -9, -8, 1, "cancelled", 0),
  mk(8, "Meera Joshi", "9124567890", "Family Suite", 9, 12, 3, "pending", 0),
  mk(9, "Dipak Behera", "8280123456", "Deluxe AC Double Room", -12, -10, 2, "checked-out", 4800),
  mk(10, "Kiran Mohanty", "9040987654", "Standard Non-AC Room", 2, 3, 2, "confirmed", 1200),
];

const STATUS = {
  pending: "Pending",
  confirmed: "Confirmed",
  "checked-in": "Checked in",
  "checked-out": "Checked out",
  cancelled: "Cancelled",
};
const SORTS = [
  { value: "latest", label: "Latest check-in" },
  { value: "earliest", label: "Earliest check-in" },
  { value: "highest", label: "Highest amount" },
  { value: "lowest", label: "Lowest amount" },
];
const PAGE_SIZE = 4;

const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const fmt = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
const payState = (b) => (b.paid >= b.amount ? "paid" : b.paid > 0 ? "partial" : "unpaid");
const PAY_LABEL = { paid: "Paid", partial: "Part paid", unpaid: "Unpaid" };

/**
 * Custom dropdown (replaces the native <select>) – lives inside this file.
 * Props: value, onChange(newValue), options (["A"] or [{value,label}]),
 *        placeholder, icon, invalid, className, ariaLabel
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
    }, 160);
  }, []);

  const openMenu = () => {
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  };
  const choose = (item) => {
    onChange?.(item.value);
    close();
  };

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
        if (isOpen) { e.preventDefault(); e.stopPropagation(); close(); }
        break;
      case "Tab":
        if (isOpen) close();
        break;
      default:
    }
  };

  return (
    <div ref={rootRef} className={`bm-dd ${isOpen ? "is-open" : ""} ${className}`}>
      <button
        type="button"
        className={`bm-dd-trigger ${invalid ? "is-invalid" : ""}`}
        onClick={() => (isOpen ? close() : openMenu())}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        {Icon && <Icon size={18} className="bm-dd-icon" />}
        <span className={`bm-dd-value ${selected ? "" : "is-placeholder"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={18} className="bm-dd-chevron" />
      </button>

      {open && (
        <ul ref={panelRef} className={`bm-dd-panel ${closing ? "is-closing" : ""}`} role="listbox">
          {items.map((item, i) => (
            <li
              key={item.value}
              data-i={i}
              role="option"
              aria-selected={item.value === value}
              className={`bm-dd-option ${item.value === value ? "is-selected" : ""} ${i === active ? "is-active" : ""}`}
              style={{ "--i": Math.min(i, 9) }}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(item)}
            >
              <span className="bm-dd-option-label">{item.label}</span>
              {item.value === value && <Check size={16} className="bm-dd-check" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/* ---------- Small components ---------- */

const StatCard = ({ icon: Icon, label, value, tone, index }) => (
  <div className={`bm-stat bm-stat--${tone}`} style={{ "--i": index }}>
    <div className="bm-stat-icon">
      <Icon size={20} />
    </div>
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  </div>
);

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="bm-overlay" onMouseDown={onClose}>
      <div className="bm-modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
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
    <div className={`bm-toast bm-toast--${toast.type}`} role="status">
      {toast.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
      <span>{toast.message}</span>
      <button type="button" onClick={onClose} aria-label="Close">
        <X size={16} />
      </button>
    </div>
  );
};

const BookingCard = ({ b, index, onStatus, onPaid, onCancel }) => {
  const nights = nightsBetween(b.checkIn, b.checkOut);
  const pay = payState(b);
  const due = b.amount - b.paid;
  const live = b.status !== "cancelled";

  return (
    <article className={`bm-card bm-card--${b.status}`} style={{ "--i": index }}>
      <header className="bm-card-head">
        <span className="bm-avatar">{b.name.charAt(0)}</span>
        <div className="bm-who">
          <strong>{b.name}</strong>
          <div className="bm-meta">
            <span>
              <Hash size={13} /> {b.code}
            </span>
            <span>
              <Phone size={13} /> {b.phone}
            </span>
          </div>
        </div>
        <div className="bm-side">
          <span className={`bm-badge bm-badge--${b.status}`}>{STATUS[b.status]}</span>
          {live && <span className={`bm-pay bm-pay--${pay}`}>{PAY_LABEL[pay]}</span>}
        </div>
      </header>

      <div className="bm-stay">
        <div className="bm-stay-cell">
          <span>
            <LogIn size={14} /> Check-in
          </span>
          <strong>{fmt(b.checkIn)}</strong>
        </div>
        <div className="bm-stay-mid">
          <span>
            <Moon size={13} /> {nights} {nights === 1 ? "night" : "nights"}
          </span>
          <ArrowRight size={18} />
        </div>
        <div className="bm-stay-cell bm-stay-cell--end">
          <span>
            <LogOut size={14} /> Check-out
          </span>
          <strong>{fmt(b.checkOut)}</strong>
        </div>
      </div>

      <div className="bm-info">
        <span>
          <BedDouble size={14} /> {b.room}
        </span>
        <span>
          <Users size={14} /> {b.guests} {b.guests === 1 ? "guest" : "guests"}
        </span>
        {live && b.checkIn === TODAY && <span className="bm-tag">Arriving today</span>}
        {live && b.checkOut === TODAY && <span className="bm-tag bm-tag--out">Leaving today</span>}
      </div>

      <div className="bm-money">
        <div>
          <span>Total</span>
          <strong>{inr(b.amount)}</strong>
        </div>
        <div>
          <span>Paid</span>
          <strong className="is-green">{inr(b.paid)}</strong>
        </div>
        <div>
          <span>Balance due</span>
          <strong className={live && due > 0 ? "is-red" : ""}>{live ? inr(due) : "—"}</strong>
        </div>
      </div>

      <footer className="bm-actions">
        {b.status === "pending" && (
          <button type="button" className="bm-act bm-act--main" onClick={() => onStatus(b, "confirmed")}>
            <BadgeCheck size={15} /> Confirm
          </button>
        )}
        {b.status === "confirmed" && (
          <button type="button" className="bm-act bm-act--main" onClick={() => onStatus(b, "checked-in")}>
            <LogIn size={15} /> Check in
          </button>
        )}
        {b.status === "checked-in" && (
          <button type="button" className="bm-act bm-act--main" onClick={() => onStatus(b, "checked-out")}>
            <LogOut size={15} /> Check out
          </button>
        )}
        {live && due > 0 && (
          <button type="button" className="bm-act" onClick={() => onPaid(b)}>
            <Wallet size={15} /> Mark as paid
          </button>
        )}
        {b.status === "cancelled" && (
          <button type="button" className="bm-act" onClick={() => onStatus(b, "pending")}>
            <RotateCcw size={15} /> Reopen
          </button>
        )}
        {(b.status === "pending" || b.status === "confirmed") && (
          <button type="button" className="bm-act bm-act--danger bm-act--end" onClick={() => onCancel(b)}>
            <Ban size={15} /> Cancel booking
          </button>
        )}
      </footer>
    </article>
  );
};

/* ---------- Main component ---------- */

const emptyForm = () => ({
  name: "",
  phone: "",
  room: Object.keys(ROOMS)[0],
  checkIn: TODAY,
  checkOut: addDays(1),
  guests: "2",
  advance: "",
  error: "",
});

const BookingManagement = () => {
  const [bookings, setBookings] = useState(SEED);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [room, setRoom] = useState("all");
  const [quick, setQuick] = useState("all"); // all | arrivals | departures
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [animKey, setAnimKey] = useState(0);
  const [form, setForm] = useState(null);
  const [cancelling, setCancelling] = useState(null);
  const [toast, setToast] = useState(null);

  const replay = () => setAnimKey((k) => k + 1);

  const stats = useMemo(() => {
    const live = bookings.filter((b) => b.status !== "cancelled");
    const counts = Object.keys(STATUS).reduce(
      (o, k) => ({ ...o, [k]: bookings.filter((b) => b.status === k).length }),
      {}
    );
    return {
      total: bookings.length,
      counts,
      inHouse: counts["checked-in"],
      pending: counts.pending,
      revenue: live.reduce((s, b) => s + b.paid, 0),
      due: live.reduce((s, b) => s + Math.max(0, b.amount - b.paid), 0),
      arrivals: live.filter((b) => b.checkIn === TODAY).length,
      departures: live.filter((b) => b.checkOut === TODAY).length,
      occupancy: Math.round((counts["checked-in"] / TOTAL_ROOMS) * 100),
    };
  }, [bookings]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = bookings.filter(
      (b) =>
        (status === "all" || b.status === status) &&
        (room === "all" || b.room === room) &&
        (quick === "all" ||
          (b.status !== "cancelled" &&
            (quick === "arrivals" ? b.checkIn === TODAY : b.checkOut === TODAY))) &&
        (!q || b.name.toLowerCase().includes(q) || b.code.toLowerCase().includes(q) || b.phone.includes(q))
    );
    const sorters = {
      latest: (a, b) => b.checkIn.localeCompare(a.checkIn),
      earliest: (a, b) => a.checkIn.localeCompare(b.checkIn),
      highest: (a, b) => b.amount - a.amount,
      lowest: (a, b) => a.amount - b.amount,
    };
    return [...list].sort(sorters[sort]);
  }, [bookings, query, status, room, quick, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  /* ---- filters ---- */
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
    setRoom("all");
    setQuick("all");
    setSort("latest");
    setPage(1);
    replay();
  };
  const filtersActive = query || status !== "all" || room !== "all" || quick !== "all";

  /* ---- actions ---- */
  const patch = (id, changes) =>
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...changes } : b)));

  const changeStatus = (b, to) => {
    // TODO: await axios.put(`/api/bookings/${b.id}/status`, { status: to })
    patch(b.id, { status: to });
    const msg = {
      confirmed: `Booking ${b.code} confirmed.`,
      "checked-in": `${b.name} checked in.`,
      "checked-out": `${b.name} checked out.`,
      pending: `Booking ${b.code} reopened as pending.`,
    };
    setToast({ type: "success", message: msg[to] });
  };

  const markPaid = (b) => {
    // TODO: await axios.put(`/api/bookings/${b.id}/payment`, { paid: b.amount })
    patch(b.id, { paid: b.amount });
    setToast({ type: "success", message: `${inr(b.amount - b.paid)} received for ${b.code}.` });
  };

  const confirmCancel = () => {
    // TODO: await axios.put(`/api/bookings/${cancelling.id}/cancel`)
    patch(cancelling.id, { status: "cancelled" });
    setToast({ type: "success", message: `Booking ${cancelling.code} cancelled.` });
    setCancelling(null);
  };

  /* ---- new booking ---- */
  const formNights = form ? nightsBetween(form.checkIn, form.checkOut) : 0;
  const formTotal = form && formNights > 0 ? formNights * ROOMS[form.room].rate : 0;

  const submitForm = (e) => {
    e.preventDefault();
    const fail = (error) => setForm({ ...form, error });
    const phone = form.phone.replace(/\s+/g, "");
    const guests = Number(form.guests);
    const advance = Number(form.advance || 0);

    if (form.name.trim().length < 2) return fail("Enter the guest name.");
    if (!/^\d{10}$/.test(phone)) return fail("Enter a 10-digit mobile number.");
    if (!form.checkIn || !form.checkOut) return fail("Choose check-in and check-out dates.");
    if (formNights < 1) return fail("Check-out must be after check-in.");
    if (!guests || guests < 1 || guests > 6) return fail("Guests must be between 1 and 6.");
    if (advance < 0 || advance > formTotal) return fail(`Advance must be between ₹0 and ${inr(formTotal)}.`);

    // TODO: await axios.post("/api/bookings", { ...form })
    const next = Math.max(0, ...bookings.map((b) => b.id)) + 1;
    setBookings((prev) => [
      {
        id: next,
        code: `BK-${1000 + next}`,
        name: form.name.trim(),
        phone,
        room: form.room,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests,
        status: "confirmed",
        paid: advance,
        amount: formTotal,
      },
      ...prev,
    ]);
    setToast({ type: "success", message: `Booking BK-${1000 + next} created for ${form.name.trim()}.` });
    setForm(null);
    clearFilters();
  };

  const setField = (key) => (e) => setForm({ ...form, [key]: e.target.value, error: "" });

  const roomOptions = [
    { value: "all", label: "All rooms" },
    ...Object.keys(ROOMS).map((r) => ({ value: r, label: r })),
  ];
  const statusOptions = [
    { value: "all", label: "All status" },
    ...Object.entries(STATUS).map(([value, label]) => ({ value, label })),
  ];
  const formRoomOptions = Object.entries(ROOMS).map(([value, r]) => ({
    value,
    label: `${value} · ${inr(r.rate)}/night`,
  }));

  return (
    <div className="bm-page">
      {/* Banner */}
      <div className="bm-banner">
        <div className="bm-banner-icon">
          <CalendarCheck size={26} />
        </div>
        <div className="bm-banner-text">
          <h2>Booking Management</h2>
          <p>Confirm, check in, check out and track payments for Srikhetra Guest House</p>
        </div>
        <button type="button" className="bm-btn bm-btn--white" onClick={() => setForm(emptyForm())}>
          <Plus size={18} /> New booking
        </button>
      </div>

      {/* Stats */}
      <div className="bm-stats">
        <StatCard index={0} icon={CalendarCheck} label="Total bookings" value={stats.total} tone="blue" />
        <StatCard index={1} icon={Users} label="Guests in house" value={stats.inHouse} tone="green" />
        <StatCard index={2} icon={Clock} label="Waiting for confirmation" value={stats.pending} tone="violet" />
        <StatCard index={3} icon={IndianRupee} label="Payments received" value={inr(stats.revenue)} tone="amber" />
      </div>

      {/* Toolbar */}
      <div className="bm-toolbar">
        <div className="bm-search">
          <Search size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => pick(setQuery)(e.target.value)}
            placeholder="Search by guest, booking ID or phone..."
          />
          {query && (
            <button type="button" onClick={() => pick(setQuery)("")} aria-label="Clear search">
              <X size={16} />
            </button>
          )}
        </div>
        <Dropdown className="bm-filter" icon={Filter} value={status} onChange={pick(setStatus)} options={statusOptions} ariaLabel="Filter by status" />
        <Dropdown className="bm-filter" icon={BedDouble} value={room} onChange={pick(setRoom)} options={roomOptions} ariaLabel="Filter by room" />
        <Dropdown className="bm-filter" icon={ArrowUpDown} value={sort} onChange={pick(setSort)} options={SORTS} ariaLabel="Sort bookings" />
      </div>

      <div className="bm-layout">
        {/* Summary */}
        <aside className="bm-summary">
          <h3>Today at the guest house</h3>
          <div className="bm-today">
            <button
              type="button"
              className={quick === "arrivals" ? "is-active" : ""}
              onClick={() => pick(setQuick)(quick === "arrivals" ? "all" : "arrivals")}
              title="Show today's arrivals"
            >
              <LogIn size={18} />
              <strong>{stats.arrivals}</strong>
              <span>Arrivals</span>
            </button>
            <button
              type="button"
              className={quick === "departures" ? "is-active" : ""}
              onClick={() => pick(setQuick)(quick === "departures" ? "all" : "departures")}
              title="Show today's departures"
            >
              <LogOut size={18} />
              <strong>{stats.departures}</strong>
              <span>Departures</span>
            </button>
          </div>

          <div className="bm-occ">
            <div>
              <span>
                <Hotel size={15} /> Occupancy
              </span>
              <strong>
                {stats.inHouse} of {TOTAL_ROOMS} rooms · {stats.occupancy}%
              </strong>
            </div>
            <div className="bm-occ-track">
              <span style={{ "--w": `${stats.occupancy}%` }} />
            </div>
          </div>

          <h3 className="bm-summary-title2">Bookings by status</h3>
          <div className="bm-bars">
            {Object.entries(STATUS).map(([key, label], i) => {
              const pct = stats.total ? (stats.counts[key] / stats.total) * 100 : 0;
              return (
                <button
                  key={key}
                  type="button"
                  className={`bm-bar ${status === key ? "is-active" : ""}`}
                  onClick={() => pick(setStatus)(status === key ? "all" : key)}
                  title={`Show ${label.toLowerCase()} bookings`}
                >
                  <span className="bm-bar-label">{label}</span>
                  <span className="bm-bar-track">
                    <span className={`bm-bar-fill bm-bar-fill--${key}`} style={{ "--w": `${pct}%`, "--d": `${0.5 + i * 0.1}s` }} />
                  </span>
                  <span className="bm-bar-count">{stats.counts[key]}</span>
                </button>
              );
            })}
          </div>

          <div className="bm-due">
            <span>Balance still to collect</span>
            <strong>{inr(stats.due)}</strong>
          </div>
        </aside>

        {/* Bookings */}
        <section className="bm-results">
          <div className="bm-resultline">
            <h3>Bookings</h3>
            <span>
              {filtered.length} {filtered.length === 1 ? "booking" : "bookings"}
            </span>
            {filtersActive && (
              <button type="button" className="bm-clear" onClick={clearFilters}>
                <X size={14} /> Clear filters
              </button>
            )}
          </div>

          {visible.length ? (
            <div key={animKey} className="bm-list">
              {visible.map((b, i) => (
                <BookingCard key={b.id} b={b} index={i} onStatus={changeStatus} onPaid={markPaid} onCancel={setCancelling} />
              ))}
            </div>
          ) : (
            <div className="bm-empty">
              <div className="bm-empty-icon">
                <CalendarDays size={30} />
              </div>
              <h3>No bookings found</h3>
              <p>Try a different search or filter.</p>
              <button type="button" className="bm-btn bm-btn--primary" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}

          {filtered.length > PAGE_SIZE && (
            <div className="bm-pager">
              <span>
                Showing {(current - 1) * PAGE_SIZE + 1}–{Math.min(current * PAGE_SIZE, filtered.length)} of{" "}
                {filtered.length}
              </span>
              <div className="bm-pager-btns">
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
        </section>
      </div>

      {/* New booking modal */}
      {form && (
        <Modal onClose={() => setForm(null)}>
          <form onSubmit={submitForm} noValidate>
            <div className="bm-modal-head">
              <h3>
                <Plus size={18} /> New booking
              </h3>
              <button type="button" onClick={() => setForm(null)} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <div className="bm-modal-body">
              <div className="bm-row">
                <label>
                  Guest name
                  <input type="text" autoFocus value={form.name} onChange={setField("name")} placeholder="e.g. Rohit Mishra" />
                </label>
                <label>
                  Mobile number
                  <input type="tel" inputMode="numeric" maxLength={10} value={form.phone} onChange={setField("phone")} placeholder="10-digit number" />
                </label>
              </div>

              <div className="bm-field">
                <span>Room</span>
                <Dropdown
                  icon={BedDouble}
                  value={form.room}
                  onChange={(v) => setForm({ ...form, room: v, error: "" })}
                  options={formRoomOptions}
                  ariaLabel="Room"
                />
              </div>

              <div className="bm-row">
                <label>
                  Check-in
                  <input type="date" value={form.checkIn} min={TODAY} onChange={setField("checkIn")} />
                </label>
                <label>
                  Check-out
                  <input type="date" value={form.checkOut} min={form.checkIn || TODAY} onChange={setField("checkOut")} />
                </label>
              </div>

              <div className="bm-row">
                <label>
                  Guests
                  <input type="number" min="1" max="6" value={form.guests} onChange={setField("guests")} />
                </label>
                <label>
                  Advance paid (₹)
                  <input type="number" min="0" value={form.advance} onChange={setField("advance")} placeholder="0" />
                </label>
              </div>

              <div className="bm-total">
                <span>
                  {formNights > 0
                    ? `${formNights} ${formNights === 1 ? "night" : "nights"} × ${inr(ROOMS[form.room].rate)}`
                    : "Choose valid dates"}
                </span>
                <strong>{inr(formTotal)}</strong>
              </div>

              {form.error && (
                <p className="bm-error">
                  <AlertCircle size={15} /> {form.error}
                </p>
              )}
            </div>
            <div className="bm-modal-foot">
              <button type="button" className="bm-btn bm-btn--outline" onClick={() => setForm(null)}>
                Cancel
              </button>
              <button type="submit" className="bm-btn bm-btn--primary">
                <CheckCircle2 size={16} /> Create booking
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Cancel booking modal */}
      {cancelling && (
        <Modal onClose={() => setCancelling(null)}>
          <div className="bm-modal-body bm-confirm">
            <div className="bm-confirm-icon">
              <AlertTriangle size={28} />
            </div>
            <h3>Cancel this booking?</h3>
            <p>
              Booking {cancelling.code} for {cancelling.name} ({fmt(cancelling.checkIn)} – {fmt(cancelling.checkOut)}) will be
              cancelled. You can reopen it later.
            </p>
            <div className="bm-modal-foot bm-modal-foot--center">
              <button type="button" className="bm-btn bm-btn--outline" onClick={() => setCancelling(null)}>
                Keep booking
              </button>
              <button type="button" className="bm-btn bm-btn--danger" onClick={confirmCancel}>
                <Ban size={16} /> Cancel booking
              </button>
            </div>
          </div>
        </Modal>
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};

export default BookingManagement;