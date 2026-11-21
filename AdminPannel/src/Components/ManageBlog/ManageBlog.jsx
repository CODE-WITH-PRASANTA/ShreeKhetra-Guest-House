import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  LayoutGrid,
  List,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  CalendarDays,
  FolderOpen,
  FileText,
  CheckCircle2,
  FileClock,
  Newspaper,
  X,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  AlertCircle,
  Save,
  ChevronDown,
  Check,
} from "lucide-react";
import heroImg from "../../assets/hero.png";
import loginImg from "../../assets/login.png";
import residencyImg from "../../assets/SriKshetra Residency 03.png";
import "./ManageBlog.css";

/* ---------------------------------------------------------------
   Images from your assets folder (src/assets)
---------------------------------------------------------------- */

const ASSET_IMAGES = [residencyImg, heroImg, loginImg];
const img = (i) => ASSET_IMAGES[i % ASSET_IMAGES.length];

const CATEGORIES = [
  "Travel Guide",
  "Puri Jagannath Temple",
  "Beach & Nature",
  "Food & Culture",
  "Guest House News",
  "Festivals",
];

// Demo data – replace with your API response
const SEED = [
  { id: 1, title: "Best time to visit Puri Jagannath Temple", category: "Puri Jagannath Temple", status: "published", date: "2026-11-10", views: 1240, excerpt: "Plan your darshan around festivals, crowds and weather for a peaceful visit." },
  { id: 2, title: "Rath Yatra: a complete guide for first-time visitors", category: "Festivals", status: "published", date: "2026-10-28", views: 2310, excerpt: "Dates, routes, where to stand and how to stay safe in the crowd." },
  { id: 3, title: "Top 5 seafood dishes to try near Puri beach", category: "Food & Culture", status: "draft", date: "2026-11-15", views: 0, excerpt: "From fresh crab curry to prawn fry, here is what locals eat." },
  { id: 4, title: "A quiet sunrise walk at Puri Sea Beach", category: "Beach & Nature", status: "published", date: "2026-09-19", views: 870, excerpt: "Why early mornings are the best time to enjoy the shoreline." },
  { id: 5, title: "Why guests love our rooftop view", category: "Guest House News", status: "draft", date: "2026-11-18", views: 0, excerpt: "A look at the new seating area and sunset views at Srikhetra." },
  { id: 6, title: "Konark Sun Temple day trip from Puri", category: "Travel Guide", status: "published", date: "2026-08-30", views: 1560, excerpt: "How to reach, timings, tickets and the best photo spots." },
  { id: 7, title: "Chandan Yatra: what to expect", category: "Festivals", status: "published", date: "2026-08-12", views: 640, excerpt: "A 21-day festival of boat rides and rituals at Narendra Tank." },
].map((b, i) => ({ ...b, cover: img(i) }));

const PAGE_SIZE = 6;

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

/* ---------- Small components ---------- */

const StatCard = ({ icon: Icon, label, value, tone, index }) => (
  <div className={`mb-stat mb-stat--${tone}`} style={{ "--i": index }}>
    <div className="mb-stat-icon">
      <Icon size={20} />
    </div>
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  </div>
);

const BlogCard = ({ blog, index, onEdit, onDelete, onToggle }) => (
  <article className="mb-item" style={{ "--i": index }}>
    <div className="mb-item-media">
      {blog.cover ? (
        <img src={blog.cover} alt={blog.title} loading="lazy" />
      ) : (
        <div className="mb-item-noimg">
          <ImageOff size={26} />
        </div>
      )}
      <span className={`mb-badge mb-badge--${blog.status}`}>
        {blog.status === "published" ? "Published" : "Draft"}
      </span>
      <span className="mb-item-cat">{blog.category}</span>
    </div>

    <div className="mb-item-body">
      <h3 title={blog.title}>{blog.title}</h3>
      <p>{blog.excerpt}</p>
      <div className="mb-item-meta">
        <span>
          <CalendarDays size={14} /> {fmtDate(blog.date)}
        </span>
        <span>
          <Eye size={14} /> {blog.views.toLocaleString("en-IN")}
        </span>
      </div>
    </div>

    <div className="mb-item-actions">
      <button type="button" className="mb-icon-btn" onClick={() => onToggle(blog.id)} title={blog.status === "published" ? "Move to draft" : "Publish"}>
        {blog.status === "published" ? <EyeOff size={16} /> : <CheckCircle2 size={16} />}
        <span>{blog.status === "published" ? "Unpublish" : "Publish"}</span>
      </button>
      <button type="button" className="mb-icon-btn mb-icon-btn--edit" onClick={() => onEdit(blog)} title="Edit">
        <Pencil size={16} /> <span>Edit</span>
      </button>
      <button type="button" className="mb-icon-btn mb-icon-btn--delete" onClick={() => onDelete(blog)} title="Delete">
        <Trash2 size={16} /> <span>Delete</span>
      </button>
    </div>
  </article>
);

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
    <div ref={rootRef} className={`mb-dd ${isOpen ? "is-open" : ""} ${className}`}>
      <button
        type="button"
        className={`mb-dd-trigger ${invalid ? "is-invalid" : ""}`}
        onClick={() => (isOpen ? close() : openMenu())}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        {Icon && <Icon size={18} className="mb-dd-icon" />}
        <span className={`mb-dd-value ${selected ? "" : "is-placeholder"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={18} className="mb-dd-chevron" />
      </button>

      {open && (
        <ul ref={panelRef} className={`mb-dd-panel ${closing ? "is-closing" : ""}`} role="listbox">
          {items.map((item, i) => (
            <li
              key={item.value}
              data-i={i}
              role="option"
              aria-selected={item.value === value}
              className={`mb-dd-option ${item.value === value ? "is-selected" : ""} ${i === active ? "is-active" : ""}`}
              style={{ "--i": Math.min(i, 9) }}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(item)}
            >
              <span className="mb-dd-option-label">{item.label}</span>
              {item.value === value && <Check size={16} className="mb-dd-check" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="mb-overlay" onMouseDown={onClose}>
      <div className="mb-modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
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
    <div className={`mb-toast mb-toast--${toast.type}`} role="status">
      {toast.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
      <span>{toast.message}</span>
      <button type="button" onClick={onClose} aria-label="Close">
        <X size={16} />
      </button>
    </div>
  );
};

/* ---------- Main component ---------- */

const ManageBlog = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState(SEED);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [toast, setToast] = useState(null);
  const [animKey, setAnimKey] = useState(0); // re-plays card animation on filter change

  const stats = useMemo(
    () => ({
      total: blogs.length,
      published: blogs.filter((b) => b.status === "published").length,
      draft: blogs.filter((b) => b.status === "draft").length,
      views: blogs.reduce((s, b) => s + b.views, 0),
    }),
    [blogs]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogs.filter(
      (b) =>
        (category === "all" || b.category === category) &&
        (status === "all" || b.status === status) &&
        (!q || b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q))
    );
  }, [blogs, query, category, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const changeFilter = (setter) => (e) => {
    setter(e.target.value);
    setPage(1);
    setAnimKey((k) => k + 1);
  };

  const pick = (setter) => (v) => {
    setter(v);
    setPage(1);
    setAnimKey((k) => k + 1);
  };

  const goPage = (p) => {
    setPage(p);
    setAnimKey((k) => k + 1);
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setStatus("all");
    setPage(1);
    setAnimKey((k) => k + 1);
  };

  /* ---- actions ---- */
  const toggleStatus = (id) => {
    setBlogs((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: b.status === "published" ? "draft" : "published" } : b
      )
    );
    const b = blogs.find((x) => x.id === id);
    setToast({
      type: "success",
      message: b.status === "published" ? "Blog moved to drafts." : "Blog published.",
    });
  };

  const confirmDelete = () => {
    // TODO: await axios.delete(`/api/blogs/${deleting.id}`)
    setBlogs((prev) => prev.filter((b) => b.id !== deleting.id));
    setToast({ type: "success", message: "Blog deleted." });
    setDeleting(null);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    if (!editing.title.trim()) {
      setToast({ type: "error", message: "Title cannot be empty." });
      return;
    }
    // TODO: await axios.put(`/api/blogs/${editing.id}`, editing)
    setBlogs((prev) => prev.map((b) => (b.id === editing.id ? editing : b)));
    setToast({ type: "success", message: "Blog updated successfully." });
    setEditing(null);
  };

  return (
    <div className="mb-page">
      {/* Banner */}
      <div className="mb-banner">
        <div className="mb-banner-icon">
          <Newspaper size={26} />
        </div>
        <div className="mb-banner-text">
          <h2>Manage Blogs</h2>
          <p>Edit, publish or remove blogs of Srikhetra Guest House</p>
        </div>
        <button type="button" className="mb-btn mb-btn--white" onClick={() => navigate("/admin/blog/add")}>
          <Plus size={18} /> Add Blog
        </button>
      </div>

      {/* Stats */}
      <div className="mb-stats">
        <StatCard index={0} icon={FileText} label="Total Blogs" value={stats.total} tone="blue" />
        <StatCard index={1} icon={CheckCircle2} label="Published" value={stats.published} tone="green" />
        <StatCard index={2} icon={FileClock} label="Drafts" value={stats.draft} tone="amber" />
        <StatCard index={3} icon={Eye} label="Total Views" value={stats.views.toLocaleString("en-IN")} tone="violet" />
      </div>

      {/* Toolbar */}
      <div className="mb-toolbar">
        <div className="mb-search">
          <Search size={18} />
          <input
            type="text"
            value={query}
            onChange={changeFilter(setQuery)}
            placeholder="Search blogs by title or summary..."
          />
          {query && (
            <button type="button" onClick={() => { setQuery(""); setPage(1); }} aria-label="Clear search">
              <X size={16} />
            </button>
          )}
        </div>

        <Dropdown
          className="mb-filter"
          icon={FolderOpen}
          value={category}
          onChange={pick(setCategory)}
          options={[{ value: "all", label: "All categories" }, ...CATEGORIES]}
        />

        <Dropdown
          className="mb-filter"
          icon={CheckCircle2}
          value={status}
          onChange={pick(setStatus)}
          options={[
            { value: "all", label: "All status" },
            { value: "published", label: "Published" },
            { value: "draft", label: "Draft" },
          ]}
        />

        <div className="mb-view-toggle">
          <button type="button" className={view === "grid" ? "is-active" : ""} onClick={() => { setView("grid"); setAnimKey((k) => k + 1); }} aria-label="Grid view">
            <LayoutGrid size={18} />
          </button>
          <button type="button" className={view === "list" ? "is-active" : ""} onClick={() => { setView("list"); setAnimKey((k) => k + 1); }} aria-label="List view">
            <List size={18} />
          </button>
        </div>
      </div>

      {/* List */}
      {visible.length ? (
        <div key={animKey} className={`mb-list mb-list--${view}`}>
          {visible.map((b, i) => (
            <BlogCard
              key={b.id}
              blog={b}
              index={i}
              onEdit={(x) => setEditing({ ...x })}
              onDelete={setDeleting}
              onToggle={toggleStatus}
            />
          ))}
        </div>
      ) : (
        <div className="mb-empty">
          <div className="mb-empty-icon">
            <Newspaper size={30} />
          </div>
          <h3>No blogs found</h3>
          <p>Try a different search or add a new blog.</p>
          <div className="mb-empty-actions">
            <button type="button" className="mb-btn mb-btn--outline" onClick={clearFilters}>
              Clear filters
            </button>
            <button type="button" className="mb-btn mb-btn--primary" onClick={() => navigate("/admin/blog/add")}>
              <Plus size={16} /> Add Blog
            </button>
          </div>
        </div>
      )}

      {/* Pagination */}
      {filtered.length > PAGE_SIZE && (
        <div className="mb-pager">
          <span>
            Showing {(current - 1) * PAGE_SIZE + 1}–{Math.min(current * PAGE_SIZE, filtered.length)} of {filtered.length}
          </span>
          <div className="mb-pager-btns">
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

      {/* Edit modal */}
      {editing && (
        <Modal onClose={() => setEditing(null)}>
          <form onSubmit={saveEdit}>
            <div className="mb-modal-head">
              <h3><Pencil size={18} /> Edit Blog</h3>
              <button type="button" onClick={() => setEditing(null)} aria-label="Close"><X size={18} /></button>
            </div>
            <div className="mb-modal-body">
              <label>
                Title
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  autoFocus
                />
              </label>
              <div className="mb-modal-row">
                <div className="mb-field">
                  <span>Category</span>
                  <Dropdown
                    value={editing.category}
                    onChange={(v) => setEditing({ ...editing, category: v })}
                    options={CATEGORIES}
                  />
                </div>
                <div className="mb-field">
                  <span>Status</span>
                  <Dropdown
                    value={editing.status}
                    onChange={(v) => setEditing({ ...editing, status: v })}
                    options={[
                      { value: "published", label: "Published" },
                      { value: "draft", label: "Draft" },
                    ]}
                  />
                </div>
              </div>
              <label>
                Short summary
                <textarea
                  rows={3}
                  value={editing.excerpt}
                  onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                />
              </label>
            </div>
            <div className="mb-modal-foot">
              <button type="button" className="mb-btn mb-btn--outline" onClick={() => setEditing(null)}>
                Cancel
              </button>
              <button type="submit" className="mb-btn mb-btn--primary">
                <Save size={16} /> Save changes
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete modal */}
      {deleting && (
        <Modal onClose={() => setDeleting(null)}>
          <div className="mb-modal-body mb-confirm">
            <div className="mb-confirm-icon">
              <AlertTriangle size={28} />
            </div>
            <h3>Delete this blog?</h3>
            <p>
              “{deleting.title}” will be removed permanently. This cannot be undone.
            </p>
            <div className="mb-modal-foot mb-modal-foot--center">
              <button type="button" className="mb-btn mb-btn--outline" onClick={() => setDeleting(null)}>
                Keep blog
              </button>
              <button type="button" className="mb-btn mb-btn--danger" onClick={confirmDelete}>
                <Trash2 size={16} /> Delete blog
              </button>
            </div>
          </div>
        </Modal>
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};

export default ManageBlog;