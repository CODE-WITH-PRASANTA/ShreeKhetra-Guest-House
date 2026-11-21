import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  Wallet,
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  Landmark,
  Clock,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  X,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  CalendarDays,
  Hash,
  Smartphone,
  CreditCard,
  Banknote,
  Receipt,
  Ban,
  ShieldCheck,
} from "lucide-react";
import "./Walletmanagement.css";

/* ---------------------------------------------------------------
   Demo data – replace with your API response.
   type: "credit" (money in) | "debit" (money out)
   status: completed | pending | failed | cancelled
   Only COMPLETED transactions change the balance.
   PENDING debits are put "on hold" and cannot be withdrawn again.
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
  { id: 1, title: "Booking – Rohit Mishra", note: "Deluxe AC Double Room", category: "Booking", type: "credit", amount: 4800, date: daysAgo(1), status: "completed", ref: "TXN-90321" },
  { id: 2, title: "Booking – Anita Das", note: "Family Suite", category: "Booking", type: "credit", amount: 9600, date: daysAgo(3), status: "completed", ref: "TXN-90288" },
  { id: 3, title: "Withdrawal to SBI ••4521", note: "Bank transfer", category: "Withdrawal", type: "debit", amount: 10000, date: daysAgo(4), status: "completed", ref: "TXN-90254" },
  { id: 4, title: "Booking – Priya Nayak", note: "Sea View Room", category: "Booking", type: "credit", amount: 7200, date: daysAgo(6), status: "completed", ref: "TXN-90190" },
  { id: 5, title: "Refund – Amit Kumar", note: "Late check-in compensation", category: "Refund", type: "debit", amount: 1500, date: daysAgo(8), status: "completed", ref: "TXN-90133" },
  { id: 6, title: "Wallet top-up", note: "Added via UPI", category: "Top-up", type: "credit", amount: 5000, date: daysAgo(9), status: "completed", ref: "TXN-90101" },
  { id: 7, title: "Booking – Meera Joshi", note: "Family Suite", category: "Booking", type: "credit", amount: 6400, date: daysAgo(10), status: "pending", ref: "TXN-90077" },
  { id: 8, title: "Withdrawal to HDFC ••9087", note: "Bank transfer", category: "Withdrawal", type: "debit", amount: 8000, date: daysAgo(11), status: "pending", ref: "TXN-90060" },
  { id: 9, title: "Booking – Biswajit Sahoo", note: "Standard Non-AC Room", category: "Booking", type: "credit", amount: 2100, date: daysAgo(13), status: "failed", ref: "TXN-90012" },
  { id: 10, title: "Platform service fee", note: "Monthly fee", category: "Fee", type: "debit", amount: 960, date: daysAgo(15), status: "completed", ref: "TXN-89980" },
  { id: 11, title: "Booking – Sneha Rath", note: "Sea View Room", category: "Booking", type: "credit", amount: 5400, date: daysAgo(18), status: "completed", ref: "TXN-89931" },
  { id: 12, title: "Withdrawal to SBI ••4521", note: "Bank transfer", category: "Withdrawal", type: "debit", amount: 4000, date: daysAgo(20), status: "failed", ref: "TXN-89902" },
];

const STATUS = { completed: "Completed", pending: "Pending", failed: "Failed", cancelled: "Cancelled" };
const TYPES = [
  { value: "all", label: "All transactions" },
  { value: "credit", label: "Money in" },
  { value: "debit", label: "Money out" },
];
const SORTS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "highest", label: "Highest amount" },
  { value: "lowest", label: "Lowest amount" },
];
const METHODS = [
  { value: "upi", label: "UPI" },
  { value: "card", label: "Debit / Credit card" },
  { value: "netbanking", label: "Net banking" },
];
const BANKS = [
  { value: "SBI ••4521", label: "State Bank of India ••4521" },
  { value: "HDFC ••9087", label: "HDFC Bank ••9087" },
];
const QUICK_AMOUNTS = [1000, 2000, 5000, 10000];
const MIN_WITHDRAW = 500;
const PAGE_SIZE = 5;

const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const fmt = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

/* count-up animation for the big numbers */
const useCountUp = (target, duration = 900) => {
  const [value, setValue] = useState(0);
  const fromRef = useRef(0);
  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = from + (target - from) * eased;
      fromRef.current = val;
      setValue(val);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
};

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
    <div ref={rootRef} className={`wm-dd ${isOpen ? "is-open" : ""} ${className}`}>
      <button
        type="button"
        className={`wm-dd-trigger ${invalid ? "is-invalid" : ""}`}
        onClick={() => (isOpen ? close() : openMenu())}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        {Icon && <Icon size={18} className="wm-dd-icon" />}
        <span className={`wm-dd-value ${selected ? "" : "is-placeholder"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={18} className="wm-dd-chevron" />
      </button>

      {open && (
        <ul ref={panelRef} className={`wm-dd-panel ${closing ? "is-closing" : ""}`} role="listbox">
          {items.map((item, i) => (
            <li
              key={item.value}
              data-i={i}
              role="option"
              aria-selected={item.value === value}
              className={`wm-dd-option ${item.value === value ? "is-selected" : ""} ${i === active ? "is-active" : ""}`}
              style={{ "--i": Math.min(i, 9) }}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(item)}
            >
              <span className="wm-dd-option-label">{item.label}</span>
              {item.value === value && <Check size={16} className="wm-dd-check" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/* ---------- Small components ---------- */

const StatCard = ({ icon: Icon, label, value, tone, index }) => (
  <div className={`wm-stat wm-stat--${tone}`} style={{ "--i": index }}>
    <div className="wm-stat-icon">
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
    <div className="wm-overlay" onMouseDown={onClose}>
      <div className="wm-modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
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
    <div className={`wm-toast wm-toast--${toast.type}`} role="status">
      {toast.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
      <span>{toast.message}</span>
      <button type="button" onClick={onClose} aria-label="Close">
        <X size={16} />
      </button>
    </div>
  );
};

const methodIcon = { upi: Smartphone, card: CreditCard, netbanking: Landmark };

const TxnCard = ({ t, index, onCancel }) => {
  const credit = t.type === "credit";
  const canCancel = t.status === "pending" && t.type === "debit" && t.category === "Withdrawal";
  return (
    <article className={`wm-txn wm-txn--${t.status}`} style={{ "--i": index }}>
      <span className={`wm-txn-icon wm-txn-icon--${t.type}`}>
        {credit ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
      </span>

      <div className="wm-txn-main">
        <strong>{t.title}</strong>
        <div className="wm-meta">
          <span>
            <Receipt size={13} /> {t.category} · {t.note}
          </span>
          <span>
            <CalendarDays size={13} /> {fmt(t.date)}
          </span>
          <span>
            <Hash size={13} /> {t.ref}
          </span>
        </div>
      </div>

      <div className="wm-txn-side">
        <strong className={`wm-amount wm-amount--${t.type} ${t.status !== "completed" ? "is-muted" : ""}`}>
          {credit ? "+" : "−"}
          {inr(t.amount)}
        </strong>
        <span className={`wm-badge wm-badge--${t.status}`}>{STATUS[t.status]}</span>
      </div>

      {canCancel && (
        <button type="button" className="wm-act wm-act--danger" onClick={() => onCancel(t)}>
          <Ban size={15} /> Cancel
        </button>
      )}
    </article>
  );
};

/* ---------- Main component ---------- */

const Walletmanagement = () => {
  const [txns, setTxns] = useState(SEED);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [animKey, setAnimKey] = useState(0);
  const [adding, setAdding] = useState(null); // { amount, method, error }
  const [withdrawing, setWithdrawing] = useState(null); // { amount, bank, error }
  const [cancelling, setCancelling] = useState(null);
  const [toast, setToast] = useState(null);

  const replay = () => setAnimKey((k) => k + 1);

  const stats = useMemo(() => {
    const done = txns.filter((t) => t.status === "completed");
    const credited = done.filter((t) => t.type === "credit").reduce((s, t) => s + t.amount, 0);
    const debited = done.filter((t) => t.type === "debit").reduce((s, t) => s + t.amount, 0);
    const hold = txns
      .filter((t) => t.status === "pending" && t.type === "debit")
      .reduce((s, t) => s + t.amount, 0);
    const incoming = txns
      .filter((t) => t.status === "pending" && t.type === "credit")
      .reduce((s, t) => s + t.amount, 0);
    const balance = credited - debited;
    const total = credited + debited;
    return {
      credited,
      debited,
      hold,
      incoming,
      balance,
      available: Math.max(0, balance - hold),
      inPct: total ? (credited / total) * 100 : 0,
      outPct: total ? (debited / total) * 100 : 0,
      pendingCount: txns.filter((t) => t.status === "pending").length,
    };
  }, [txns]);

  const balanceShown = useCountUp(stats.balance);
  const availableShown = useCountUp(stats.available);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = txns.filter(
      (t) =>
        (type === "all" || t.type === type) &&
        (status === "all" || t.status === status) &&
        (!q ||
          t.title.toLowerCase().includes(q) ||
          t.ref.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q))
    );
    const sorters = {
      newest: (a, b) => b.date.localeCompare(a.date) || b.id - a.id,
      oldest: (a, b) => a.date.localeCompare(b.date) || a.id - b.id,
      highest: (a, b) => b.amount - a.amount,
      lowest: (a, b) => a.amount - b.amount,
    };
    return [...list].sort(sorters[sort]);
  }, [txns, query, type, status, sort]);

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
    setType("all");
    setStatus("all");
    setSort("newest");
    setPage(1);
    replay();
  };
  const filtersActive = query || type !== "all" || status !== "all";

  /* ---- actions ---- */
  const addTxn = (data) => {
    const next = Math.max(0, ...txns.map((t) => t.id)) + 1;
    const txn = {
      id: next,
      date: toISO(new Date()),
      ref: `TXN-${90400 + next}`,
      ...data,
    };
    setTxns((prev) => [txn, ...prev]);
    setPage(1);
    setSort("newest");
    replay();
  };

  const openAdd = () => setAdding({ amount: "", method: "upi", error: "" });
  const openWithdraw = () => setWithdrawing({ amount: "", bank: BANKS[0].value, error: "" });

  const submitAdd = (e) => {
    e.preventDefault();
    const amount = Number(adding.amount);
    if (!amount || amount < 100) {
      setAdding({ ...adding, error: "Enter an amount of ₹100 or more." });
      return;
    }
    if (amount > 200000) {
      setAdding({ ...adding, error: "You can add up to ₹2,00,000 at a time." });
      return;
    }
    // TODO: await axios.post("/api/wallet/add-money", { amount, method: adding.method })
    const label = METHODS.find((m) => m.value === adding.method).label;
    addTxn({ title: "Wallet top-up", note: `Added via ${label}`, category: "Top-up", type: "credit", amount, status: "completed" });
    setToast({ type: "success", message: `${inr(amount)} added to your wallet.` });
    setAdding(null);
  };

  const submitWithdraw = (e) => {
    e.preventDefault();
    const amount = Number(withdrawing.amount);
    if (!amount || amount < MIN_WITHDRAW) {
      setWithdrawing({ ...withdrawing, error: `Minimum withdrawal is ${inr(MIN_WITHDRAW)}.` });
      return;
    }
    if (amount > stats.available) {
      setWithdrawing({ ...withdrawing, error: `You can withdraw up to ${inr(stats.available)}.` });
      return;
    }
    // TODO: await axios.post("/api/wallet/withdraw", { amount, bank: withdrawing.bank })
    addTxn({
      title: `Withdrawal to ${withdrawing.bank}`,
      note: "Bank transfer",
      category: "Withdrawal",
      type: "debit",
      amount,
      status: "pending",
    });
    setToast({ type: "success", message: `Withdrawal of ${inr(amount)} requested.` });
    setWithdrawing(null);
  };

  const confirmCancel = () => {
    // TODO: await axios.put(`/api/wallet/withdrawals/${cancelling.id}/cancel`)
    setTxns((prev) => prev.map((t) => (t.id === cancelling.id ? { ...t, status: "cancelled" } : t)));
    setToast({ type: "success", message: "Withdrawal cancelled. Money is back in your wallet." });
    setCancelling(null);
  };

  const typeOptions = TYPES;
  const statusOptions = [
    { value: "all", label: "All status" },
    ...Object.entries(STATUS).map(([value, label]) => ({ value, label })),
  ];

  return (
    <div className="wm-page">
      {/* Banner */}
      <div className="wm-banner">
        <div className="wm-banner-icon">
          <Wallet size={26} />
        </div>
        <div className="wm-banner-text">
          <h2>Wallet Management</h2>
          <p>Track booking payments, add money and withdraw earnings of Srikhetra Guest House</p>
        </div>
        <button type="button" className="wm-btn wm-btn--white" onClick={openAdd}>
          <Plus size={18} /> Add money
        </button>
      </div>

      {/* Balance + stats */}
      <div className="wm-top">
        <section className="wm-balance">
          <div className="wm-balance-head">
            <span className="wm-balance-chip">
              <ShieldCheck size={14} /> Secure wallet
            </span>
            <Wallet size={22} className="wm-balance-logo" />
          </div>
          <span className="wm-balance-label">Wallet balance</span>
          <strong className="wm-balance-amount">{inr(balanceShown)}</strong>
          <div className="wm-balance-sub">
            <div>
              <span>Available to withdraw</span>
              <strong>{inr(availableShown)}</strong>
            </div>
            <div>
              <span>On hold</span>
              <strong>{inr(stats.hold)}</strong>
            </div>
          </div>
          <div className="wm-balance-actions">
            <button type="button" className="wm-btn wm-btn--white" onClick={openAdd}>
              <Plus size={18} /> Add money
            </button>
            <button type="button" className="wm-btn wm-btn--glass" onClick={openWithdraw}>
              <Landmark size={18} /> Withdraw
            </button>
          </div>
        </section>

        <div className="wm-stats">
          <StatCard index={0} icon={TrendingUp} label="Total received" value={inr(stats.credited)} tone="green" />
          <StatCard index={1} icon={TrendingDown} label="Total paid out" value={inr(stats.debited)} tone="red" />
          <StatCard index={2} icon={Clock} label="Pending requests" value={stats.pendingCount} tone="violet" />
          <StatCard index={3} icon={Banknote} label="Incoming (pending)" value={inr(stats.incoming)} tone="amber" />
        </div>
      </div>

      {/* Toolbar */}
      <div className="wm-toolbar">
        <div className="wm-search">
          <Search size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => pick(setQuery)(e.target.value)}
            placeholder="Search by guest, category or reference..."
          />
          {query && (
            <button type="button" onClick={() => pick(setQuery)("")} aria-label="Clear search">
              <X size={16} />
            </button>
          )}
        </div>
        <Dropdown className="wm-filter" icon={ArrowDownLeft} value={type} onChange={pick(setType)} options={typeOptions} ariaLabel="Filter by type" />
        <Dropdown className="wm-filter" icon={Filter} value={status} onChange={pick(setStatus)} options={statusOptions} ariaLabel="Filter by status" />
        <Dropdown className="wm-filter" icon={ArrowUpDown} value={sort} onChange={pick(setSort)} options={SORTS} ariaLabel="Sort transactions" />
      </div>

      <div className="wm-layout">
        {/* Summary */}
        <aside className="wm-summary">
          <h3>Money in vs out</h3>
          <div className="wm-flow">
            <div className="wm-flow-row">
              <span>
                <ArrowDownLeft size={14} /> Received
              </span>
              <strong>{inr(stats.credited)}</strong>
            </div>
            <div className="wm-flow-track">
              <span className="wm-flow-fill wm-flow-fill--in" style={{ "--w": `${stats.inPct}%`, "--d": "0.8s" }} />
            </div>
            <div className="wm-flow-row">
              <span>
                <ArrowUpRight size={14} /> Paid out
              </span>
              <strong>{inr(stats.debited)}</strong>
            </div>
            <div className="wm-flow-track">
              <span className="wm-flow-fill wm-flow-fill--out" style={{ "--w": `${stats.outPct}%`, "--d": "0.95s" }} />
            </div>
          </div>

          <h3 className="wm-summary-title2">Linked accounts</h3>
          <ul className="wm-accounts">
            {BANKS.map((b, i) => (
              <li key={b.value} style={{ "--i": i }}>
                <span className="wm-account-icon">
                  <Landmark size={16} />
                </span>
                <div>
                  <strong>{b.label}</strong>
                  <span>Withdrawals in 1–2 working days</span>
                </div>
              </li>
            ))}
            <li style={{ "--i": 2 }}>
              <span className="wm-account-icon">
                <Smartphone size={16} />
              </span>
              <div>
                <strong>UPI</strong>
                <span>Instant top-ups</span>
              </div>
            </li>
          </ul>
        </aside>

        {/* Transactions */}
        <section className="wm-results">
          <div className="wm-resultline">
            <h3>Transactions</h3>
            <span>
              {filtered.length} {filtered.length === 1 ? "transaction" : "transactions"}
            </span>
            {filtersActive && (
              <button type="button" className="wm-clear" onClick={clearFilters}>
                <X size={14} /> Clear filters
              </button>
            )}
          </div>

          {visible.length ? (
            <div key={animKey} className="wm-list">
              {visible.map((t, i) => (
                <TxnCard key={t.id} t={t} index={i} onCancel={setCancelling} />
              ))}
            </div>
          ) : (
            <div className="wm-empty">
              <div className="wm-empty-icon">
                <Wallet size={30} />
              </div>
              <h3>No transactions found</h3>
              <p>Try a different search or filter.</p>
              <button type="button" className="wm-btn wm-btn--primary" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}

          {filtered.length > PAGE_SIZE && (
            <div className="wm-pager">
              <span>
                Showing {(current - 1) * PAGE_SIZE + 1}–{Math.min(current * PAGE_SIZE, filtered.length)} of{" "}
                {filtered.length}
              </span>
              <div className="wm-pager-btns">
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

      {/* Add money modal */}
      {adding && (
        <Modal onClose={() => setAdding(null)}>
          <form onSubmit={submitAdd} noValidate>
            <div className="wm-modal-head">
              <h3>
                <Plus size={18} /> Add money
              </h3>
              <button type="button" onClick={() => setAdding(null)} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <div className="wm-modal-body">
              <label>
                Amount
                <div className={`wm-money ${adding.error ? "is-invalid" : ""}`}>
                  <span>₹</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min="0"
                    autoFocus
                    value={adding.amount}
                    onChange={(e) => setAdding({ ...adding, amount: e.target.value, error: "" })}
                    placeholder="0"
                  />
                </div>
              </label>
              <div className="wm-chips">
                {QUICK_AMOUNTS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    className={Number(adding.amount) === a ? "is-active" : ""}
                    onClick={() => setAdding({ ...adding, amount: String(a), error: "" })}
                  >
                    +{inr(a)}
                  </button>
                ))}
              </div>
              <div className="wm-field">
                <span>Payment method</span>
                <Dropdown
                  icon={methodIcon[adding.method]}
                  value={adding.method}
                  onChange={(v) => setAdding({ ...adding, method: v })}
                  options={METHODS}
                  ariaLabel="Payment method"
                />
              </div>
              {adding.error && (
                <p className="wm-error">
                  <AlertCircle size={15} /> {adding.error}
                </p>
              )}
            </div>
            <div className="wm-modal-foot">
              <button type="button" className="wm-btn wm-btn--outline" onClick={() => setAdding(null)}>
                Cancel
              </button>
              <button type="submit" className="wm-btn wm-btn--primary">
                <Plus size={16} /> Add {Number(adding.amount) > 0 ? inr(Number(adding.amount)) : "money"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Withdraw modal */}
      {withdrawing && (
        <Modal onClose={() => setWithdrawing(null)}>
          <form onSubmit={submitWithdraw} noValidate>
            <div className="wm-modal-head">
              <h3>
                <Landmark size={18} /> Withdraw money
              </h3>
              <button type="button" onClick={() => setWithdrawing(null)} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <div className="wm-modal-body">
              <div className="wm-avail">
                <span>Available to withdraw</span>
                <strong>{inr(stats.available)}</strong>
              </div>
              <label>
                Amount
                <div className={`wm-money ${withdrawing.error ? "is-invalid" : ""}`}>
                  <span>₹</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min="0"
                    autoFocus
                    value={withdrawing.amount}
                    onChange={(e) => setWithdrawing({ ...withdrawing, amount: e.target.value, error: "" })}
                    placeholder="0"
                  />
                  <button
                    type="button"
                    className="wm-max"
                    onClick={() => setWithdrawing({ ...withdrawing, amount: String(Math.floor(stats.available)), error: "" })}
                  >
                    Max
                  </button>
                </div>
              </label>
              <div className="wm-field">
                <span>Send to</span>
                <Dropdown
                  icon={Landmark}
                  value={withdrawing.bank}
                  onChange={(v) => setWithdrawing({ ...withdrawing, bank: v })}
                  options={BANKS}
                  ariaLabel="Bank account"
                />
              </div>
              {withdrawing.error && (
                <p className="wm-error">
                  <AlertCircle size={15} /> {withdrawing.error}
                </p>
              )}
            </div>
            <div className="wm-modal-foot">
              <button type="button" className="wm-btn wm-btn--outline" onClick={() => setWithdrawing(null)}>
                Cancel
              </button>
              <button type="submit" className="wm-btn wm-btn--primary">
                <Landmark size={16} /> Request withdrawal
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Cancel withdrawal modal */}
      {cancelling && (
        <Modal onClose={() => setCancelling(null)}>
          <div className="wm-modal-body wm-confirm">
            <div className="wm-confirm-icon">
              <AlertTriangle size={28} />
            </div>
            <h3>Cancel this withdrawal?</h3>
            <p>
              The request of {inr(cancelling.amount)} ({cancelling.title}) will be cancelled and the money stays in your
              wallet.
            </p>
            <div className="wm-modal-foot wm-modal-foot--center">
              <button type="button" className="wm-btn wm-btn--outline" onClick={() => setCancelling(null)}>
                Keep request
              </button>
              <button type="button" className="wm-btn wm-btn--danger" onClick={confirmCancel}>
                <Ban size={16} /> Cancel withdrawal
              </button>
            </div>
          </div>
        </Modal>
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};

export default Walletmanagement;