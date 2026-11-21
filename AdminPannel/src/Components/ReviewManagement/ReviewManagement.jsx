import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  Search,
  Star,
  MessagesSquare,
  Clock,
  Award,
  CheckCircle2,
  Eye,
  EyeOff,
  Reply,
  Trash2,
  BedDouble,
  CalendarDays,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  X,
  AlertTriangle,
  AlertCircle,
  Save,
  Quote,
  CheckCheck,
} from "lucide-react";
import heroImg from "../../assets/hero.png";
import loginImg from "../../assets/login.png";
import residencyImg from "../../assets/SriKshetra Residency 03.png";
import "./ReviewManagement.css";

/* ---------------------------------------------------------------
   Demo data – replace with your API response.
   Review photos come from src/assets.
---------------------------------------------------------------- */
const toISO = (d) => {
  const z = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
};
const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return toISO(d);
};

const SEED = [
  { id: 1, name: "Rohit Mishra", room: "Deluxe AC Double Room", date: daysAgo(1), rating: 5, status: "pending", featured: false, reply: "", photo: heroImg,
    comment: "Lovely stay! The room was spotless, the AC worked perfectly and the staff helped us book a cab to the Jagannath Temple early in the morning. The rooftop is a great place to sit in the evening. We will definitely come back with the family next year." },
  { id: 2, name: "Anita Das", room: "Family Suite", date: daysAgo(3), rating: 5, status: "approved", featured: true, reply: "Thank you Anita! We are so happy your family enjoyed the suite. See you again soon.", photo: "",
    comment: "Very spacious suite for four people. The kids loved it and the breakfast was fresh and tasty." },
  { id: 3, name: "Suresh Patnaik", room: "Standard Non-AC Room", date: daysAgo(4), rating: 4, status: "approved", featured: false, reply: "", photo: "",
    comment: "Good value for money and a very friendly owner. The room is simple but clean. Water pressure in the bathroom could be better." },
  { id: 4, name: "Priya Nayak", room: "Sea View Room", date: daysAgo(6), rating: 5, status: "approved", featured: true, reply: "", photo: loginImg,
    comment: "Woke up to the sound of the sea. Beach is a short walk away and the seafood recommendations from the staff were spot on." },
  { id: 5, name: "Amit Kumar", room: "Deluxe AC Double Room", date: daysAgo(8), rating: 3, status: "pending", featured: false, reply: "", photo: "",
    comment: "Room was nice but check-in was delayed by almost an hour. Staff was polite about it though." },
  { id: 6, name: "Sneha Rath", room: "Sea View Room", date: daysAgo(10), rating: 4, status: "approved", featured: false, reply: "Thanks for the feedback, Sneha. We are working on faster check-ins.", photo: residencyImg,
    comment: "Peaceful location and clean rooms. Would love a few more plug points near the bed." },
  { id: 7, name: "Biswajit Sahoo", room: "Standard Non-AC Room", date: daysAgo(12), rating: 2, status: "hidden", featured: false, reply: "", photo: "",
    comment: "Noise from the road in the early morning made it hard to sleep. Otherwise the stay was okay." },
  { id: 8, name: "Meera Joshi", room: "Family Suite", date: daysAgo(15), rating: 5, status: "pending", featured: false, reply: "", photo: "",
    comment: "Celebrated our anniversary here. The staff surprised us with a small cake. Thank you for the warm welcome!" },
  { id: 9, name: "Dipak Behera", room: "Deluxe AC Double Room", date: daysAgo(20), rating: 1, status: "hidden", featured: false, reply: "", photo: "",
    comment: "Hot water was not available on the first day. It was fixed the next morning." },
];

const STATUS = { pending: "Pending", approved: "Approved", hidden: "Hidden" };
const SORTS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "highest", label: "Highest rating" },
  { value: "lowest", label: "Lowest rating" },
];
const PAGE_SIZE = 4;
const LONG_TEXT = 150;

const fmt = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

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
    <div ref={rootRef} className={`rv-dd ${isOpen ? "is-open" : ""} ${className}`}>
      <button
        type="button"
        className={`rv-dd-trigger ${invalid ? "is-invalid" : ""}`}
        onClick={() => (isOpen ? close() : openMenu())}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        {Icon && <Icon size={18} className="rv-dd-icon" />}
        <span className={`rv-dd-value ${selected ? "" : "is-placeholder"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={18} className="rv-dd-chevron" />
      </button>

      {open && (
        <ul ref={panelRef} className={`rv-dd-panel ${closing ? "is-closing" : ""}`} role="listbox">
          {items.map((item, i) => (
            <li
              key={item.value}
              data-i={i}
              role="option"
              aria-selected={item.value === value}
              className={`rv-dd-option ${item.value === value ? "is-selected" : ""} ${i === active ? "is-active" : ""}`}
              style={{ "--i": Math.min(i, 9) }}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(item)}
            >
              <span className="rv-dd-option-label">{item.label}</span>
              {item.value === value && <Check size={16} className="rv-dd-check" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/* ---------- Small components ---------- */

/**
 * Star rating – supports half stars (e.g. 4.5).
 * Each star is filled by 0, 50 or 100 % depending on the rating.
 */
const Stars = ({ rating, size = 16 }) => (
  <span className="rv-stars" role="img" aria-label={`${rating} out of 5 stars`}>
    {[0, 1, 2, 3, 4].map((i) => {
      const fill = Math.max(0, Math.min(1, rating - i)); // 0, 0.5 or 1
      return (
        <span key={i} className="rv-star" style={{ "--s": i, width: size, height: size }}>
          <Star size={size} className="rv-star-bg" />
          {fill > 0 && (
            <span className="rv-star-fg" style={{ width: `${fill * 100}%` }}>
              <Star size={size} fill="currentColor" />
            </span>
          )}
        </span>
      );
    })}
  </span>
);

const StatCard = ({ icon: Icon, label, value, tone, index }) => (
  <div className={`rv-stat rv-stat--${tone}`} style={{ "--i": index }}>
    <div className="rv-stat-icon">
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
    <div className="rv-overlay" onMouseDown={onClose}>
      <div className="rv-modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
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
    <div className={`rv-toast rv-toast--${toast.type}`} role="status">
      {toast.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
      <span>{toast.message}</span>
      <button type="button" onClick={onClose} aria-label="Close">
        <X size={16} />
      </button>
    </div>
  );
};

const ReviewCard = ({ r, index, onStatus, onFeature, onReply, onDelete }) => {
  const [open, setOpen] = useState(false);
  const long = r.comment.length > LONG_TEXT;

  return (
    <article className={`rv-card rv-card--${r.status}`} style={{ "--i": index }}>
      {r.featured && (
        <span className="rv-ribbon">
          <Award size={14} /> Featured
        </span>
      )}

      <header className="rv-card-head">
        <span className="rv-avatar">{r.name.charAt(0)}</span>
        <div className="rv-who">
          <strong>{r.name}</strong>
          <div className="rv-meta">
            <span>
              <BedDouble size={13} /> {r.room}
            </span>
            <span>
              <CalendarDays size={13} /> {fmt(r.date)}
            </span>
          </div>
        </div>
        <div className="rv-side">
          <Stars rating={r.rating} />
          <span className={`rv-badge rv-badge--${r.status}`}>{STATUS[r.status]}</span>
        </div>
      </header>

      <div className="rv-body">
        <Quote size={18} className="rv-quote" />
        <div>
          <p className={`rv-text ${open || !long ? "is-open" : ""}`}>{r.comment}</p>
          {long && (
            <button type="button" className="rv-more" onClick={() => setOpen((v) => !v)}>
              {open ? "Show less" : "Read more"}
            </button>
          )}
        </div>
        {r.photo && <img className="rv-photo" src={r.photo} alt="Guest photo" loading="lazy" />}
      </div>

      {r.reply && (
        <div className="rv-reply">
          <strong>
            <Reply size={14} /> Reply from Srikhetra Guest House
          </strong>
          <p>{r.reply}</p>
        </div>
      )}

      <footer className="rv-actions">
        {r.status !== "approved" && (
          <button type="button" className="rv-act rv-act--main" onClick={() => onStatus(r.id, "approved")}>
            <CheckCircle2 size={15} /> Approve
          </button>
        )}
        {r.status !== "hidden" && (
          <button type="button" className="rv-act" onClick={() => onStatus(r.id, "hidden")}>
            <EyeOff size={15} /> Hide
          </button>
        )}
        {r.status === "hidden" && (
          <button type="button" className="rv-act" onClick={() => onStatus(r.id, "pending")}>
            <Eye size={15} /> Restore
          </button>
        )}
        {r.status === "approved" && (
          <button
            type="button"
            className={`rv-act rv-act--feature ${r.featured ? "is-on" : ""}`}
            onClick={() => onFeature(r.id)}
          >
            <Award size={15} /> {r.featured ? "Unfeature" : "Feature"}
          </button>
        )}
        <button type="button" className="rv-act" onClick={() => onReply(r)}>
          <Reply size={15} /> {r.reply ? "Edit reply" : "Reply"}
        </button>
        <button type="button" className="rv-act rv-act--danger rv-act--end" onClick={() => onDelete(r)} title="Delete review">
          <Trash2 size={15} />
        </button>
      </footer>
    </article>
  );
};

/* ---------- Main component ---------- */

const ReviewManagement = () => {
  const [reviews, setReviews] = useState(SEED);
  const [query, setQuery] = useState("");
  const [rating, setRating] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [animKey, setAnimKey] = useState(0);
  const [replying, setReplying] = useState(null); // { id, name, text, had }
  const [deleting, setDeleting] = useState(null);
  const [toast, setToast] = useState(null);

  const replay = () => setAnimKey((k) => k + 1);

  const stats = useMemo(() => {
    const total = reviews.length;
    const avg = total ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0;
    return {
      total,
      avg: avg.toFixed(1),
      // nearest half star, e.g. 4.4 -> 4.5, 4.2 -> 4
      avgStars: Math.round(avg * 2) / 2,
      pending: reviews.filter((r) => r.status === "pending").length,
      featured: reviews.filter((r) => r.featured).length,
      replied: reviews.filter((r) => r.reply).length,
      counts: [5, 4, 3, 2, 1].map((n) => reviews.filter((r) => r.rating === n).length),
    };
  }, [reviews]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = reviews.filter(
      (r) =>
        (rating === "all" || r.rating === Number(rating)) &&
        (status === "all" || r.status === status) &&
        (!q || r.name.toLowerCase().includes(q) || r.comment.toLowerCase().includes(q))
    );
    const sorters = {
      newest: (a, b) => b.date.localeCompare(a.date),
      oldest: (a, b) => a.date.localeCompare(b.date),
      highest: (a, b) => b.rating - a.rating,
      lowest: (a, b) => a.rating - b.rating,
    };
    return [...list].sort(sorters[sort]);
  }, [reviews, query, rating, status, sort]);

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
    setRating("all");
    setStatus("all");
    setSort("newest");
    setPage(1);
    replay();
  };
  const filtersActive = query || rating !== "all" || status !== "all";

  /* ---- actions ---- */
  const patch = (id, changes) =>
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, ...changes } : r)));

  const changeStatus = (id, to) => {
    // TODO: await axios.put(`/api/reviews/${id}/status`, { status: to })
    patch(id, { status: to, ...(to !== "approved" ? { featured: false } : {}) });
    const msg = {
      approved: "Review approved and published.",
      hidden: "Review hidden from the website.",
      pending: "Review moved to pending.",
    };
    setToast({ type: "success", message: msg[to] });
  };

  const toggleFeature = (id) => {
    const r = reviews.find((x) => x.id === id);
    patch(id, { featured: !r.featured });
    setToast({ type: "success", message: r.featured ? "Removed from featured." : "Review featured on the website." });
  };

  const approveAll = () => {
    if (!stats.pending) {
      setToast({ type: "error", message: "No pending reviews to approve." });
      return;
    }
    // TODO: await axios.put("/api/reviews/approve-all")
    setReviews((prev) => prev.map((r) => (r.status === "pending" ? { ...r, status: "approved" } : r)));
    setToast({ type: "success", message: `${stats.pending} reviews approved.` });
  };

  const saveReply = (e) => {
    e.preventDefault();
    const text = replying.text.trim();
    if (!text) {
      setToast({ type: "error", message: "Please write a reply first." });
      return;
    }
    // TODO: await axios.put(`/api/reviews/${replying.id}/reply`, { reply: text })
    patch(replying.id, { reply: text });
    setToast({ type: "success", message: "Reply saved." });
    setReplying(null);
  };

  const removeReply = () => {
    patch(replying.id, { reply: "" });
    setToast({ type: "success", message: "Reply removed." });
    setReplying(null);
  };

  const confirmDelete = () => {
    // TODO: await axios.delete(`/api/reviews/${deleting.id}`)
    setReviews((prev) => prev.filter((r) => r.id !== deleting.id));
    setToast({ type: "success", message: "Review deleted." });
    setDeleting(null);
  };

  const starsLabel = (n) => `${n} ${n === 1 ? "star" : "stars"}`;

  return (
    <div className="rv-page">
      {/* Banner */}
      <div className="rv-banner">
        <div className="rv-banner-icon">
          <MessagesSquare size={26} />
        </div>
        <div className="rv-banner-text">
          <h2>Review Management</h2>
          <p>Approve, reply to and feature guest reviews of Srikhetra Guest House</p>
        </div>
        <button type="button" className="rv-btn rv-btn--white" onClick={approveAll}>
          <CheckCheck size={18} /> Approve all pending
        </button>
      </div>

      {/* Stats */}
      <div className="rv-stats">
        <StatCard index={0} icon={MessagesSquare} label="Total reviews" value={stats.total} tone="blue" />
        <StatCard index={1} icon={Star} label="Average rating" value={stats.avg} tone="amber" />
        <StatCard index={2} icon={Clock} label="Waiting for approval" value={stats.pending} tone="violet" />
        <StatCard index={3} icon={Award} label="Featured" value={stats.featured} tone="green" />
      </div>

      {/* Toolbar */}
      <div className="rv-toolbar">
        <div className="rv-search">
          <Search size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => pick(setQuery)(e.target.value)}
            placeholder="Search by guest name or review text..."
          />
          {query && (
            <button type="button" onClick={() => pick(setQuery)("")} aria-label="Clear search">
              <X size={16} />
            </button>
          )}
        </div>
        <Dropdown
          className="rv-filter"
          icon={Star}
          value={rating}
          onChange={pick(setRating)}
          ariaLabel="Filter by rating"
          options={[
            { value: "all", label: "All ratings" },
            ...[5, 4, 3, 2, 1].map((n) => ({ value: String(n), label: starsLabel(n) })),
          ]}
        />
        <Dropdown
          className="rv-filter"
          icon={Filter}
          value={status}
          onChange={pick(setStatus)}
          ariaLabel="Filter by status"
          options={[
            { value: "all", label: "All status" },
            ...Object.entries(STATUS).map(([value, label]) => ({ value, label })),
          ]}
        />
        <Dropdown
          className="rv-filter"
          icon={ArrowUpDown}
          value={sort}
          onChange={pick(setSort)}
          ariaLabel="Sort reviews"
          options={SORTS}
        />
      </div>

      <div className="rv-layout">
        {/* Rating summary */}
        <aside className="rv-summary">
          <div className="rv-summary-top">
            <strong className="rv-avg">{stats.avg}</strong>
            <div>
              <Stars rating={stats.avgStars} size={18} />
              <span>Based on {stats.total} reviews</span>
            </div>
          </div>

          <div className="rv-bars">
            {[5, 4, 3, 2, 1].map((n, i) => {
              const pct = stats.total ? (stats.counts[i] / stats.total) * 100 : 0;
              return (
                <button
                  key={n}
                  type="button"
                  className={`rv-bar ${rating === String(n) ? "is-active" : ""}`}
                  onClick={() => pick(setRating)(rating === String(n) ? "all" : String(n))}
                  title={`Show ${starsLabel(n)} reviews`}
                >
                  <span className="rv-bar-label">
                    {n} <Star size={13} fill="currentColor" />
                  </span>
                  <span className="rv-bar-track">
                    <span className="rv-bar-fill" style={{ "--w": `${pct}%`, "--d": `${0.5 + i * 0.1}s` }} />
                  </span>
                  <span className="rv-bar-count">{stats.counts[i]}</span>
                </button>
              );
            })}
          </div>

          <div className="rv-replied">
            <div>
              <span>Replied</span>
              <strong>
                {stats.replied} of {stats.total}
              </strong>
            </div>
            <div className="rv-replied-track">
              <span style={{ "--w": `${stats.total ? (stats.replied / stats.total) * 100 : 0}%` }} />
            </div>
          </div>
        </aside>

        {/* Reviews */}
        <section className="rv-results">
          <div className="rv-resultline">
            <h3>Guest reviews</h3>
            <span>
              {filtered.length} {filtered.length === 1 ? "review" : "reviews"}
            </span>
            {filtersActive && (
              <button type="button" className="rv-clear" onClick={clearFilters}>
                <X size={14} /> Clear filters
              </button>
            )}
          </div>

          {visible.length ? (
            <div key={animKey} className="rv-list">
              {visible.map((r, i) => (
                <ReviewCard
                  key={r.id}
                  r={r}
                  index={i}
                  onStatus={changeStatus}
                  onFeature={toggleFeature}
                  onReply={(x) => setReplying({ id: x.id, name: x.name, text: x.reply, had: !!x.reply })}
                  onDelete={setDeleting}
                />
              ))}
            </div>
          ) : (
            <div className="rv-empty">
              <div className="rv-empty-icon">
                <MessagesSquare size={30} />
              </div>
              <h3>No reviews found</h3>
              <p>Try a different search or filter.</p>
              <button type="button" className="rv-btn rv-btn--primary" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}

          {filtered.length > PAGE_SIZE && (
            <div className="rv-pager">
              <span>
                Showing {(current - 1) * PAGE_SIZE + 1}–{Math.min(current * PAGE_SIZE, filtered.length)} of{" "}
                {filtered.length}
              </span>
              <div className="rv-pager-btns">
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

      {/* Reply modal */}
      {replying && (
        <Modal onClose={() => setReplying(null)}>
          <form onSubmit={saveReply}>
            <div className="rv-modal-head">
              <h3>
                <Reply size={18} /> Reply to {replying.name}
              </h3>
              <button type="button" onClick={() => setReplying(null)} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <div className="rv-modal-body">
              <label>
                Your reply (shown publicly under the review)
                <textarea
                  rows={5}
                  maxLength={300}
                  autoFocus
                  value={replying.text}
                  onChange={(e) => setReplying({ ...replying, text: e.target.value })}
                  placeholder="Thank the guest and answer their feedback..."
                />
              </label>
              <span className="rv-counter">{replying.text.length}/300</span>
            </div>
            <div className="rv-modal-foot">
              {replying.had && (
                <button type="button" className="rv-btn rv-btn--ghost" onClick={removeReply}>
                  <Trash2 size={16} /> Remove reply
                </button>
              )}
              <button type="button" className="rv-btn rv-btn--outline" onClick={() => setReplying(null)}>
                Cancel
              </button>
              <button type="submit" className="rv-btn rv-btn--primary">
                <Save size={16} /> Save reply
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete modal */}
      {deleting && (
        <Modal onClose={() => setDeleting(null)}>
          <div className="rv-modal-body rv-confirm">
            <div className="rv-confirm-icon">
              <AlertTriangle size={28} />
            </div>
            <h3>Delete this review?</h3>
            <p>The review by {deleting.name} will be removed permanently. This cannot be undone.</p>
            <div className="rv-modal-foot rv-modal-foot--center">
              <button type="button" className="rv-btn rv-btn--outline" onClick={() => setDeleting(null)}>
                Keep review
              </button>
              <button type="button" className="rv-btn rv-btn--danger" onClick={confirmDelete}>
                <Trash2 size={16} /> Delete review
              </button>
            </div>
          </div>
        </Modal>
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};

export default ReviewManagement;