import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Camera,
  Pencil,
  Save,
  X,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  KeyRound,
  Bell,
  Globe,
  LogOut,
  Check,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  CalendarCheck,
  MessagesSquare,
  Wallet,
  Clock,
  BedDouble,
  Activity,
  Trash2,
} from "lucide-react";
import "./Profile.css";

/* ---------------------------------------------------------------
   Demo data – replace with your API response.
---------------------------------------------------------------- */
const INITIAL_PROFILE = {
  name: "Ramesh Panda",
  email: "admin@srikhetraguesthouse.in",
  phone: "9437012345",
  address: "Grand Road, Near Jagannath Temple, Odisha",
  about: "Owner and administrator of Srikhetra Guest House. Looking after bookings, guest reviews and payments.",
};

const GUEST_HOUSE = [
  { icon: Building2, label: "Property", value: "Srikhetra Guest House" },
  { icon: BedDouble, label: "Total rooms", value: "14 rooms · 4 room types" },
  { icon: Clock, label: "Check-in time", value: "12:00 PM" },
  { icon: Clock, label: "Check-out time", value: "11:00 AM" },
];

const STATS = [
  { icon: CalendarCheck, label: "Bookings handled", value: "128", tone: "blue" },
  { icon: MessagesSquare, label: "Reviews replied", value: "54", tone: "violet" },
  { icon: Wallet, label: "Withdrawals made", value: "12", tone: "green" },
  { icon: Clock, label: "Last login", value: "Today, 9:41 AM", tone: "amber" },
];

const ACTIVITY = [
  { icon: CalendarCheck, text: "Confirmed booking BK-1004", time: "2 hours ago", tone: "blue" },
  { icon: MessagesSquare, text: "Replied to Anita Das's review", time: "Yesterday", tone: "violet" },
  { icon: Wallet, text: "Requested a withdrawal of ₹10,000", time: "3 days ago", tone: "green" },
  { icon: MessagesSquare, text: "Featured 2 guest reviews", time: "5 days ago", tone: "amber" },
  { icon: ShieldCheck, text: "Password changed", time: "2 weeks ago", tone: "blue" },
];

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी (Hindi)" },
  { value: "or", label: "ଓଡ଼ିଆ (Odia)" },
];

const PREFS = [
  { key: "booking", label: "New booking alerts", hint: "Get notified when a guest books a room" },
  { key: "review", label: "Review alerts", hint: "Get notified when a guest posts a review" },
  { key: "wallet", label: "Wallet alerts", hint: "Payments received and withdrawal updates" },
  { key: "summary", label: "Weekly summary email", hint: "A short report every Monday morning" },
];

const RULES = [
  { key: "len", label: "At least 8 characters", test: (p) => p.length >= 8 },
  { key: "upper", label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { key: "lower", label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
  { key: "num", label: "One number", test: (p) => /\d/.test(p) },
];
const LEVELS = ["Too short", "Weak", "Fair", "Good", "Strong"];

const formatPhone = (p) => `+91 ${p.slice(0, 5)} ${p.slice(5)}`;

/**
 * Custom dropdown (replaces the native <select>) – lives inside this file.
 * Props: value, onChange(newValue), options ([{value,label}]), placeholder,
 *        icon, invalid, className, ariaLabel
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
    <div ref={rootRef} className={`pf-dd ${isOpen ? "is-open" : ""} ${className}`}>
      <button
        type="button"
        className={`pf-dd-trigger ${invalid ? "is-invalid" : ""}`}
        onClick={() => (isOpen ? close() : openMenu())}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        {Icon && <Icon size={18} className="pf-dd-icon" />}
        <span className={`pf-dd-value ${selected ? "" : "is-placeholder"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={18} className="pf-dd-chevron" />
      </button>

      {open && (
        <ul ref={panelRef} className={`pf-dd-panel ${closing ? "is-closing" : ""}`} role="listbox">
          {items.map((item, i) => (
            <li
              key={item.value}
              data-i={i}
              role="option"
              aria-selected={item.value === value}
              className={`pf-dd-option ${item.value === value ? "is-selected" : ""} ${i === active ? "is-active" : ""}`}
              style={{ "--i": Math.min(i, 9) }}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(item)}
            >
              <span className="pf-dd-option-label">{item.label}</span>
              {item.value === value && <Check size={16} className="pf-dd-check" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/* ---------- Small components ---------- */

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="pf-overlay" onMouseDown={onClose}>
      <div className="pf-modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
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
    <div className={`pf-toast pf-toast--${toast.type}`} role="status">
      {toast.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
      <span>{toast.message}</span>
      <button type="button" onClick={onClose} aria-label="Close">
        <X size={16} />
      </button>
    </div>
  );
};

const Toggle = ({ on, onChange, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={on}
    aria-label={label}
    className={`pf-toggle ${on ? "is-on" : ""}`}
    onClick={onChange}
  >
    <span className="pf-toggle-thumb" />
  </button>
);

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="pf-info-row">
    <span className="pf-info-icon">
      <Icon size={17} />
    </span>
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  </div>
);

const PasswordField = ({ label, value, onChange, show, onToggle, autoComplete }) => (
  <label>
    {label}
    <div className="pf-pass">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder="••••••••"
      />
      <button type="button" onClick={onToggle} aria-label={show ? "Hide password" : "Show password"}>
        {show ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </div>
  </label>
);

/* ---------- Main component ---------- */

const Profile = () => {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(INITIAL_PROFILE);
  const [errors, setErrors] = useState({});
  const [photo, setPhoto] = useState("");
  const [pw, setPw] = useState({ current: "", next: "", confirm: "", show: false, error: "" });
  const [prefs, setPrefs] = useState({ booking: true, review: true, wallet: true, summary: false });
  const [twoStep, setTwoStep] = useState(false);
  const [language, setLanguage] = useState("en");
  const [confirmOut, setConfirmOut] = useState(false);
  const [toast, setToast] = useState(null);
  const fileRef = useRef(null);

  // free the temporary photo URL
  useEffect(() => () => photo && URL.revokeObjectURL(photo), [photo]);

  const strength = useMemo(() => {
    const passed = RULES.filter((r) => r.test(pw.next)).length;
    return pw.next ? passed : -1;
  }, [pw.next]);

  /* ---- photo ---- */
  const onPhoto = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setToast({ type: "error", message: "Please choose an image file." });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setToast({ type: "error", message: "Photo must be smaller than 2 MB." });
      return;
    }
    // TODO: upload with FormData -> await axios.post("/api/profile/photo", formData)
    setPhoto(URL.createObjectURL(file));
    setToast({ type: "success", message: "Profile photo updated." });
  };
  const removePhoto = () => {
    // TODO: await axios.delete("/api/profile/photo")
    setPhoto("");
    setToast({ type: "success", message: "Profile photo removed." });
  };

  /* ---- personal info ---- */
  const startEdit = () => {
    setDraft(profile);
    setErrors({});
    setEditing(true);
  };
  const cancelEdit = () => {
    setEditing(false);
    setErrors({});
  };
  const setField = (key) => (e) => {
    setDraft({ ...draft, [key]: e.target.value });
    if (errors[key]) setErrors({ ...errors, [key]: "" });
  };
  const saveProfile = (e) => {
    e.preventDefault();
    const next = {};
    if (draft.name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(draft.email.trim())) next.email = "Enter a valid email address.";
    if (!/^\d{10}$/.test(draft.phone)) next.phone = "Enter a 10-digit mobile number.";
    if (!draft.address.trim()) next.address = "Enter your address.";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    // TODO: await axios.put("/api/profile", draft)
    setProfile({ ...draft, name: draft.name.trim(), email: draft.email.trim(), address: draft.address.trim(), about: draft.about.trim() });
    setEditing(false);
    setToast({ type: "success", message: "Profile saved." });
  };

  /* ---- password ---- */
  const setPass = (key) => (e) => setPw({ ...pw, [key]: e.target.value, error: "" });
  const submitPassword = (e) => {
    e.preventDefault();
    const fail = (error) => setPw({ ...pw, error });
    if (!pw.current) return fail("Enter your current password.");
    if (!RULES.every((r) => r.test(pw.next))) return fail("New password does not meet all the rules.");
    if (pw.next === pw.current) return fail("New password must be different from the current one.");
    if (pw.next !== pw.confirm) return fail("The two new passwords do not match.");
    // TODO: await axios.put("/api/profile/password", { current: pw.current, next: pw.next })
    setPw({ current: "", next: "", confirm: "", show: false, error: "" });
    setToast({ type: "success", message: "Password updated." });
  };

  /* ---- preferences & security ---- */
  const togglePref = (key) => {
    // TODO: await axios.put("/api/profile/preferences", { ...prefs, [key]: !prefs[key] })
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  };
  const toggleTwoStep = () => {
    setTwoStep((v) => !v);
    setToast({ type: "success", message: twoStep ? "Two-step verification turned off." : "Two-step verification turned on." });
  };
  const signOutOthers = () => {
    // TODO: await axios.post("/api/profile/sessions/sign-out-others")
    setConfirmOut(false);
    setToast({ type: "success", message: "Signed out of all other devices." });
  };

  const initial = profile.name.trim().charAt(0).toUpperCase() || "A";

  return (
    <div className="pf-page">
      {/* Hero – opens from the top-left corner while a light travels across */}
      <section className="pf-hero">
        <div className="pf-light" aria-hidden="true">
          <span className="pf-orb" />
          <span className="pf-streak" />
        </div>

        <div className="pf-avatar-wrap">
          <div className="pf-avatar">
            {photo ? <img src={photo} alt={`${profile.name} profile`} /> : <span>{initial}</span>}
          </div>
          <button type="button" className="pf-camera" onClick={() => fileRef.current?.click()} aria-label="Change photo">
            <Camera size={16} />
          </button>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPhoto} />
        </div>

        <div className="pf-hero-text">
          <h2>{profile.name}</h2>
          <p>Owner &amp; Administrator</p>
          <div className="pf-chips">
            <span>
              <Building2 size={14} /> Srikhetra Guest House
            </span>
            <span>
              <Mail size={14} /> {profile.email}
            </span>
            <span className="pf-chip-live">
              <i /> Online
            </span>
          </div>
        </div>

        <div className="pf-hero-actions">
          {photo && (
            <button type="button" className="pf-btn pf-btn--glass" onClick={removePhoto}>
              <Trash2 size={16} /> Remove photo
            </button>
          )}
          <button type="button" className="pf-btn pf-btn--white" onClick={editing ? cancelEdit : startEdit}>
            {editing ? <X size={17} /> : <Pencil size={17} />} {editing ? "Cancel editing" : "Edit profile"}
          </button>
        </div>
      </section>

      {/* Stats */}
      <div className="pf-stats">
        {STATS.map((s, i) => (
          <div key={s.label} className={`pf-stat pf-stat--${s.tone}`} style={{ "--i": i }}>
            <div className="pf-stat-icon">
              <s.icon size={20} />
            </div>
            <div>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pf-layout">
        {/* Left column */}
        <div className="pf-col">
          {/* Personal information */}
          <section className="pf-card" style={{ "--i": 0 }}>
            <header className="pf-card-head">
              <h3>
                <User size={18} /> Personal information
              </h3>
              {!editing && (
                <button type="button" className="pf-link" onClick={startEdit}>
                  <Pencil size={14} /> Edit
                </button>
              )}
            </header>

            {editing ? (
              <form onSubmit={saveProfile} noValidate className="pf-form">
                <div className="pf-row">
                  <label>
                    Full name
                    <input className={errors.name ? "is-invalid" : ""} type="text" autoFocus value={draft.name} onChange={setField("name")} />
                    {errors.name && <em>{errors.name}</em>}
                  </label>
                  <label>
                    Mobile number
                    <input
                      className={errors.phone ? "is-invalid" : ""}
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={draft.phone}
                      onChange={setField("phone")}
                    />
                    {errors.phone && <em>{errors.phone}</em>}
                  </label>
                </div>
                <label>
                  Email address
                  <input className={errors.email ? "is-invalid" : ""} type="email" value={draft.email} onChange={setField("email")} />
                  {errors.email && <em>{errors.email}</em>}
                </label>
                <label>
                  Address
                  <input className={errors.address ? "is-invalid" : ""} type="text" value={draft.address} onChange={setField("address")} />
                  {errors.address && <em>{errors.address}</em>}
                </label>
                <label>
                  About you
                  <textarea rows={3} maxLength={160} value={draft.about} onChange={setField("about")} />
                  <span className="pf-counter">{draft.about.length}/160</span>
                </label>
                <div className="pf-form-foot">
                  <button type="button" className="pf-btn pf-btn--outline" onClick={cancelEdit}>
                    Cancel
                  </button>
                  <button type="submit" className="pf-btn pf-btn--primary">
                    <Save size={16} /> Save changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="pf-info">
                <InfoRow icon={User} label="Full name" value={profile.name} />
                <InfoRow icon={Phone} label="Mobile number" value={formatPhone(profile.phone)} />
                <InfoRow icon={Mail} label="Email address" value={profile.email} />
                <InfoRow icon={MapPin} label="Address" value={profile.address} />
                {profile.about && <p className="pf-about">{profile.about}</p>}
              </div>
            )}
          </section>

          {/* Security */}
          <section className="pf-card" style={{ "--i": 1 }}>
            <header className="pf-card-head">
              <h3>
                <Lock size={18} /> Security
              </h3>
            </header>

            <form onSubmit={submitPassword} noValidate className="pf-form">
              <PasswordField
                label="Current password"
                value={pw.current}
                onChange={setPass("current")}
                show={pw.show}
                onToggle={() => setPw({ ...pw, show: !pw.show })}
                autoComplete="current-password"
              />
              <div className="pf-row">
                <PasswordField
                  label="New password"
                  value={pw.next}
                  onChange={setPass("next")}
                  show={pw.show}
                  onToggle={() => setPw({ ...pw, show: !pw.show })}
                  autoComplete="new-password"
                />
                <PasswordField
                  label="Confirm new password"
                  value={pw.confirm}
                  onChange={setPass("confirm")}
                  show={pw.show}
                  onToggle={() => setPw({ ...pw, show: !pw.show })}
                  autoComplete="new-password"
                />
              </div>

              <div className="pf-strength" aria-live="polite">
                <div className="pf-strength-bar">
                  {[1, 2, 3, 4].map((n) => (
                    <span key={n} className={strength >= n ? `is-on is-l${strength}` : ""} />
                  ))}
                </div>
                <span>{strength < 0 ? "Password strength" : LEVELS[strength]}</span>
              </div>
              <ul className="pf-rules">
                {RULES.map((r) => (
                  <li key={r.key} className={r.test(pw.next) ? "is-ok" : ""}>
                    <Check size={13} /> {r.label}
                  </li>
                ))}
              </ul>

              {pw.error && (
                <p className="pf-error">
                  <AlertCircle size={15} /> {pw.error}
                </p>
              )}
              <div className="pf-form-foot">
                <button type="submit" className="pf-btn pf-btn--primary">
                  <KeyRound size={16} /> Update password
                </button>
              </div>
            </form>

            <div className="pf-line">
              <div>
                <strong>Two-step verification</strong>
                <span>Ask for a code when signing in from a new device</span>
              </div>
              <Toggle on={twoStep} onChange={toggleTwoStep} label="Two-step verification" />
            </div>
            <div className="pf-line">
              <div>
                <strong>Other devices</strong>
                <span>Sign out of every device except this one</span>
              </div>
              <button type="button" className="pf-act pf-act--danger" onClick={() => setConfirmOut(true)}>
                <LogOut size={15} /> Sign out others
              </button>
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="pf-col">
          {/* Guest house */}
          <section className="pf-card" style={{ "--i": 2 }}>
            <header className="pf-card-head">
              <h3>
                <Building2 size={18} /> Guest house
              </h3>
            </header>
            <div className="pf-info">
              {GUEST_HOUSE.map((g) => (
                <InfoRow key={g.label} icon={g.icon} label={g.label} value={g.value} />
              ))}
            </div>
          </section>

          {/* Preferences */}
          <section className="pf-card" style={{ "--i": 3 }}>
            <header className="pf-card-head">
              <h3>
                <Bell size={18} /> Preferences
              </h3>
            </header>
            {PREFS.map((p) => (
              <div key={p.key} className="pf-line">
                <div>
                  <strong>{p.label}</strong>
                  <span>{p.hint}</span>
                </div>
                <Toggle on={prefs[p.key]} onChange={() => togglePref(p.key)} label={p.label} />
              </div>
            ))}
            <div className="pf-field">
              <span>Language</span>
              <Dropdown icon={Globe} value={language} onChange={setLanguage} options={LANGUAGES} ariaLabel="Language" />
            </div>
          </section>

          {/* Activity */}
          <section className="pf-card" style={{ "--i": 4 }}>
            <header className="pf-card-head">
              <h3>
                <Activity size={18} /> Recent activity
              </h3>
            </header>
            <ul className="pf-timeline">
              {ACTIVITY.map((a, i) => (
                <li key={a.text} style={{ "--i": i }}>
                  <span className={`pf-tl-icon pf-tl-icon--${a.tone}`}>
                    <a.icon size={15} />
                  </span>
                  <div>
                    <strong>{a.text}</strong>
                    <span>{a.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Sign out others */}
      {confirmOut && (
        <Modal onClose={() => setConfirmOut(false)}>
          <div className="pf-modal-body pf-confirm">
            <div className="pf-confirm-icon">
              <AlertTriangle size={28} />
            </div>
            <h3>Sign out other devices?</h3>
            <p>You will stay signed in here. Every other phone or computer will need to sign in again.</p>
            <div className="pf-modal-foot pf-modal-foot--center">
              <button type="button" className="pf-btn pf-btn--outline" onClick={() => setConfirmOut(false)}>
                Keep them signed in
              </button>
              <button type="button" className="pf-btn pf-btn--danger" onClick={signOutOthers}>
                <LogOut size={16} /> Sign out others
              </button>
            </div>
          </div>
        </Modal>
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};

export default Profile;