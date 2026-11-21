import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Settings.css";

/* ---------- tiny inline icon set (no extra dependency) ---------- */
const PATHS = {
  gear: "M12 15a3 3 0 100-6 3 3 0 000 6zm7.4-3a7.4 7.4 0 00-.1-1.2l2-1.6-2-3.4-2.4 1a7.6 7.6 0 00-2-1.2L14.5 3h-4l-.4 2.6a7.6 7.6 0 00-2 1.2l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 000 2.4l-2 1.6 2 3.4 2.4-1a7.6 7.6 0 002 1.2l.4 2.6h4l.4-2.6a7.6 7.6 0 002-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z",
  building: "M4 21V5l8-3 8 3v16M9 21v-5h6v5M8 9h2m4 0h2M8 13h2m4 0h2",
  bell: "M18 16v-5a6 6 0 10-12 0v5l-2 2h16l-2-2zm-8 4a2 2 0 004 0",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zm-3 9l2 2 4-4",
  palette: "M12 3a9 9 0 100 18c1.5 0 2-1 1.5-2s0-2 1.5-2h2a4 4 0 004-4c0-5-4-10-9-10zM7.5 12h.01M10 8h.01M15 8h.01",
  warn: "M12 3l10 18H2L12 3zm0 7v5m0 3h.01",
  check: "M5 13l4 4L19 7",
  chevron: "M6 9l6 6 6-6",
  close: "M6 6l12 12M18 6L6 18",
  save: "M5 3h11l3 3v15H5V3zm3 0v5h7V3M8 21v-7h8v7",
  undo: "M9 14L4 9l5-5M4 9h10a6 6 0 010 12h-3",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18zm0-14v5l3 2",
  mail: "M3 6h18v12H3V6zm0 0l9 7 9-7",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z",
  globe: "M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.500 5.500 12 3z",
};
const Icon = ({ name, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={PATHS[name]} />
  </svg>
);

/* ---------- default values ---------- */
const DEFAULTS = {
  name: "Srikhetra Guest House",
  email: "admin@srikhetra.in",
  phone: "+91 98765 43210",
  checkIn: "12:00 PM",
  currency: "INR (₹)",
  autoConfirm: true,
  sameDay: true,
  requireId: true,
  emailAlerts: true,
  smsAlerts: false,
  dailyDigest: true,
  twoFactor: false,
  theme: "Light",
  language: "English",
  animations: true,
};
const CHECK_IN = ["10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM"];
const CURRENCY = ["INR (₹)", "USD ($)", "EUR (€)"];
const THEME = ["Light", "Dark", "System"];
const LANG = ["English", "ଓଡ଼ିଆ", "हिन्दी"];

/* ---------- Toggle ---------- */
const Toggle = ({ on, onChange, label }) => (
  <button type="button" role="switch" aria-checked={on} aria-label={label}
    className={`st-toggle ${on ? "is-on" : ""}`} onClick={() => onChange(!on)}>
    <span className="st-toggle-thumb" />
  </button>
);

/* ---------- Custom dropdown ---------- */
const Dropdown = ({ value, options, onChange, icon }) => {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef(null);

  const close = () => {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); }, 150);
  };
  const pick = (opt) => { onChange(opt); close(); };

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => ref.current && !ref.current.contains(e.target) && close();
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const onKey = (e) => {
    if (!open && ["Enter", " ", "ArrowDown"].includes(e.key)) {
      e.preventDefault(); setActive(Math.max(0, options.indexOf(value))); setOpen(true); return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % options.length); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a - 1 + options.length) % options.length); }
    if (e.key === "Enter") { e.preventDefault(); pick(options[active]); }
    if (e.key === "Escape") close();
  };

  return (
    <div ref={ref} className={`st-dd ${open ? "is-open" : ""}`}>
      <button type="button" className="st-dd-trigger" aria-haspopup="listbox"
        aria-expanded={open} onKeyDown={onKey}
        onClick={() => { setActive(Math.max(0, options.indexOf(value))); open ? close() : setOpen(true); }}>
        {icon && <Icon name={icon} />}
        <span className="st-dd-value">{value}</span>
        <span className="st-dd-chevron"><Icon name="chevron" /></span>
      </button>
      {open && (
        <ul role="listbox" className={`st-dd-panel ${closing ? "is-closing" : ""}`}>
          {options.map((opt, i) => (
            <li key={opt} role="option" aria-selected={opt === value}
              style={{ "--i": i }}
              className={`st-dd-option ${i === active ? "is-active" : ""} ${opt === value ? "is-selected" : ""}`}
              onMouseEnter={() => setActive(i)} onClick={() => pick(opt)}>
              <span className="st-dd-option-label">{opt}</span>
              {opt === value && <span className="st-dd-check"><Icon name="check" size={16} /></span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/* ---------- Card + row helpers ---------- */
const Card = ({ icon, title, i, children }) => (
  <section className="st-card" style={{ "--i": i }}>
    <header className="st-card-head">
      <h3><Icon name={icon} /> {title}</h3>
    </header>
    {children}
  </section>
);
const Row = ({ title, desc, children }) => (
  <div className="st-line">
    <div><strong>{title}</strong><span>{desc}</span></div>
    {children}
  </div>
);

/* ---------- Settings page ---------- */
const Settings = () => {
  const [saved, setSaved] = useState(DEFAULTS);
  const [form, setForm] = useState(DEFAULTS);
  const [errors, setErrors] = useState({});
  const [confirm, setConfirm] = useState(false);
  const [toast, setToast] = useState(null);

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));
  const dirty = useMemo(() => JSON.stringify(form) !== JSON.stringify(saved), [form, saved]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Enter the guest house name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a phone number with at least 10 digits.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = () => {
    if (!validate()) return setToast({ type: "error", text: "Fix the highlighted fields to save." });
    setSaved(form);
    setToast({ type: "success", text: "Settings saved" });
    // TODO: call your API here, e.g. await api.put("/settings", form)
  };
  const discard = () => { setForm(saved); setErrors({}); };
  const resetAll = () => {
    setForm(DEFAULTS); setSaved(DEFAULTS); setErrors({}); setConfirm(false);
    setToast({ type: "success", text: "Settings reset to defaults" });
  };

  const field = (k, label, icon, type = "text") => (
    <label>
      {label}
      <div className="st-input">
        <Icon name={icon} />
        <input type={type} value={form[k]} onChange={(e) => set(k)(e.target.value)}
          className={errors[k] ? "is-invalid" : ""} aria-invalid={!!errors[k]} />
      </div>
      {errors[k] && <em>{errors[k]}</em>}
    </label>
  );

  return (
    <div className={`st-page ${form.animations ? "" : "st-no-motion"}`}>
      {/* Hero */}
      <div className="st-hero">
        <div className="st-light"><span className="st-orb" /><span className="st-streak" /></div>
        <div className="st-hero-icon"><Icon name="gear" size={24} /></div>
        <div className="st-hero-text">
          <h2>Settings</h2>
          <p>Manage how {form.name || "your guest house"} runs, notifies and looks.</p>
          <div className="st-chips">
            <span className="st-chip-live"><i />{dirty ? "Unsaved changes" : "All changes saved"}</span>
          </div>
        </div>
        <div className="st-hero-actions">
          <button className="st-btn st-btn--glass" onClick={discard} disabled={!dirty}>
            <Icon name="undo" size={16} /> Discard
          </button>
          <button className="st-btn st-btn--white" onClick={save} disabled={!dirty}>
            <Icon name="save" size={16} /> Save changes
          </button>
        </div>
      </div>

      <div className="st-layout">
        <div className="st-col">
          <Card icon="building" title="Guest house details" i={0}>
            <div className="st-form">
              {field("name", "Guest house name", "building")}
              <div className="st-row">
                {field("email", "Contact email", "mail", "email")}
                {field("phone", "Contact phone", "phone", "tel")}
              </div>
              <div className="st-row">
                <div className="st-field"><span>Check-in time</span>
                  <Dropdown icon="clock" value={form.checkIn} options={CHECK_IN} onChange={set("checkIn")} /></div>
                <div className="st-field"><span>Currency</span>
                  <Dropdown icon="globe" value={form.currency} options={CURRENCY} onChange={set("currency")} /></div>
              </div>
            </div>
          </Card>

          <Card icon="gear" title="Booking rules" i={1}>
            <Row title="Auto-confirm bookings" desc="Confirm new bookings without manual approval.">
              <Toggle on={form.autoConfirm} onChange={set("autoConfirm")} label="Auto-confirm bookings" />
            </Row>
            <Row title="Allow same-day bookings" desc="Guests can book rooms for today.">
              <Toggle on={form.sameDay} onChange={set("sameDay")} label="Allow same-day bookings" />
            </Row>
            <Row title="Require ID at check-in" desc="Ask for a government ID before handing over keys.">
              <Toggle on={form.requireId} onChange={set("requireId")} label="Require ID at check-in" />
            </Row>
          </Card>
        </div>

        <div className="st-col">
          <Card icon="bell" title="Notifications" i={2}>
            <Row title="Email alerts" desc="New bookings, cancellations and payments.">
              <Toggle on={form.emailAlerts} onChange={set("emailAlerts")} label="Email alerts" />
            </Row>
            <Row title="SMS alerts" desc="Text messages for urgent updates.">
              <Toggle on={form.smsAlerts} onChange={set("smsAlerts")} label="SMS alerts" />
            </Row>
            <Row title="Daily digest" desc="Morning summary of arrivals and departures.">
              <Toggle on={form.dailyDigest} onChange={set("dailyDigest")} label="Daily digest" />
            </Row>
          </Card>

          <Card icon="shield" title="Security" i={3}>
            <Row title="Two-factor sign-in" desc="Ask for a code when signing in on a new device.">
              <Toggle on={form.twoFactor} onChange={set("twoFactor")} label="Two-factor sign-in" />
            </Row>
          </Card>

          <Card icon="palette" title="Appearance" i={4}>
            <div className="st-row">
              <div className="st-field st-field--plain"><span>Theme</span>
                <Dropdown icon="palette" value={form.theme} options={THEME} onChange={set("theme")} /></div>
              <div className="st-field st-field--plain"><span>Language</span>
                <Dropdown icon="globe" value={form.language} options={LANG} onChange={set("language")} /></div>
            </div>
            <Row title="Page animations" desc="Turn off to reduce motion across the admin panel.">
              <Toggle on={form.animations} onChange={set("animations")} label="Page animations" />
            </Row>
          </Card>

          <Card icon="warn" title="Danger zone" i={5}>
            <Row title="Reset all settings" desc="Restore every setting to its default value.">
              <button className="st-act st-act--danger" onClick={() => setConfirm(true)}>Reset</button>
            </Row>
          </Card>
        </div>
      </div>

      {/* Confirm modal */}
      {confirm && (
        <div className="st-overlay" onClick={() => setConfirm(false)}>
          <div className="st-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="st-confirm">
              <div className="st-confirm-icon"><Icon name="warn" size={28} /></div>
              <h3>Reset all settings?</h3>
              <p>Every setting returns to its default. This can't be undone.</p>
              <div className="st-modal-foot">
                <button className="st-btn st-btn--outline" onClick={() => setConfirm(false)}>Keep settings</button>
                <button className="st-btn st-btn--danger" onClick={resetAll}>Reset settings</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`st-toast st-toast--${toast.type}`} role="status">
          <Icon name={toast.type === "error" ? "warn" : "check"} />
          <span>{toast.text}</span>
          <button onClick={() => setToast(null)} aria-label="Dismiss"><Icon name="close" size={14} /></button>
        </div>
      )}
    </div>
  );
};

export default Settings;