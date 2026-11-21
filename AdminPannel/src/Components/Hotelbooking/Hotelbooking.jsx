import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import './Hotelbooking.css';

/* ------------------------------------------------------------------ */
/*  Constants & helpers                                                */
/* ------------------------------------------------------------------ */

const STATUSES = ['Confirmed', 'Pending', 'Cancelled'];
const PAGE_SIZES = [5, 10, 20, 50];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const PLACEHOLDER_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">' +
      '<rect width="120" height="120" fill="#e3efe8"/>' +
      '<g fill="none" stroke="#2f7d5b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M32 90V34a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v56"/><path d="M22 90h76"/>' +
      '<path d="M46 46h6M68 46h6M46 62h6M68 62h6"/><path d="M54 90V76h12v14"/></g></svg>'
  );

const unsplash = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=240&h=240&q=60`;

const HOTEL_CATALOG = {
  'oyo family comfort stay': {
    name: 'OYO Family Comfort Stay',
    location: 'Rajnagar, Kendrapara',
    image: unsplash('photo-1566073771259-6a8506099945'),
    rate: 3000,
  },
  'ranjan residency': {
    name: 'Ranjan Residency',
    location: 'Cuttack',
    image: unsplash('photo-1551882547-ff40c63fe5fa'),
    rate: 2750,
  },
  'sea breeze resort': {
    name: 'Sea Breeze Resort',
    location: 'Puri',
    image: unsplash('photo-1520250497591-112f2f40a3f4'),
    rate: 3600,
  },
  'green mangrove hotel': {
    name: 'Green Mangrove Hotel',
    location: 'Bhadrak',
    image: unsplash('photo-1542314831-068cd1dbfeeb'),
    rate: 2250,
  },
  'river view inn': {
    name: 'River View Inn',
    location: 'Bhubaneswar',
    image: unsplash('photo-1564501049412-61c2a3083791'),
    rate: 3000,
  },
};
const CATALOG_LIST = Object.values(HOTEL_CATALOG);

const getHotelMeta = (name) => HOTEL_CATALOG[(name || '').trim().toLowerCase()] || null;

const hashString = (str) => [...str].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) % 100000, 7);

const resolveHotel = (name, location) => {
  const meta = getHotelMeta(name);
  if (meta) return { hotel: meta.name, location: meta.location, image: meta.image };
  return {
    hotel: name.trim(),
    location: (location || '').trim() || 'Odisha, India',
    image: CATALOG_LIST[hashString(name) % CATALOG_LIST.length].image,
  };
};

const formatDate = (iso) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d} ${MONTHS[Number(m) - 1]} ${y}`;
};

const addDays = (iso, days) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
};

const formatCurrency = (n) => `₹${Number(n).toLocaleString('en-IN')}`;
const padSerial = (n) => String(n).padStart(3, '0');

/* ------------------------------------------------------------------ */
/*  Sample data (86 bookings: 52 confirmed, 24 pending, 10 cancelled)  */
/* ------------------------------------------------------------------ */

const buildInitialBookings = () => {
  const firstFive = [
    ['Ananya Das', '2026-10-20', '2026-10-21', 1, 2, '9876543210', 'ananya.das@gmail.com', 3000, 'Confirmed'],
    ['Rahul Mohanty', '2026-10-22', '2026-10-24', 2, 4, '8765432109', 'rahul.mohanty@mail.com', 5500, 'Pending'],
    ['Priya Sharma', '2026-10-25', '2026-10-27', 1, 2, '7654321098', 'priya.sharma@mail.com', 7200, 'Confirmed'],
    ['Amit Kumar', '2026-10-28', '2026-10-30', 2, 3, '6543210987', 'amit.kumar@mail.com', 4500, 'Cancelled'],
    ['Sneha Patel', '2026-11-01', '2026-11-03', 1, 2, '9123456780', 'sneha.patel@mail.com', 6000, 'Confirmed'],
  ];

  const hotels = CATALOG_LIST;
  const bookings = firstFive.map((row, i) => {
    const hotel = hotels[i];
    return {
      id: `bk-${padSerial(i + 1)}`,
      hotel: hotel.name,
      location: hotel.location,
      image: hotel.image,
      guest: row[0],
      checkIn: row[1],
      checkOut: row[2],
      rooms: row[3],
      guests: row[4],
      phone: row[5],
      email: row[6],
      amount: row[7],
      status: row[8],
    };
  });

  const first = ['Arjun', 'Meera', 'Debasis', 'Kavita', 'Subhash', 'Ritika', 'Pratik', 'Lopamudra', 'Sanjay', 'Nandini', 'Biswajit', 'Swati', 'Manoj', 'Pooja', 'Rakesh', 'Smita'];
  const last = ['Nayak', 'Behera', 'Panda', 'Sahoo', 'Mishra', 'Swain', 'Jena', 'Rout', 'Patra', 'Dash', 'Mahapatra', 'Pradhan'];

  let otherIndex = 0;
  for (let k = 0; k < 81; k += 1) {
    const n = k + 6;
    let status;
    if (k % 9 === 4) {
      status = 'Cancelled';
    } else {
      const isPending = Math.floor(((otherIndex + 1) * 23) / 72) > Math.floor((otherIndex * 23) / 72);
      status = isPending ? 'Pending' : 'Confirmed';
      otherIndex += 1;
    }
    const hotel = hotels[n % 5];
    const nights = (n % 3) + 1;
    const rooms = (n % 3) + 1 > 2 ? 2 : (n % 2) + 1;
    const guests = rooms + (n % 3);
    const fn = first[n % first.length];
    const ln = last[(n * 7) % last.length];
    const checkIn = addDays('2026-11-03', (k + 1) * 2);
    bookings.push({
      id: `bk-${padSerial(n)}`,
      hotel: hotel.name,
      location: hotel.location,
      image: hotel.image,
      guest: `${fn} ${ln}`,
      checkIn,
      checkOut: addDays(checkIn, nights),
      rooms,
      guests,
      phone: `${6 + (n % 4)}${String(100000000 + ((n * 48271 + 13) % 899999999))}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@${n % 2 ? 'gmail.com' : 'mail.com'}`,
      amount: hotel.rate * rooms * nights,
      status,
    });
  }
  return bookings;
};

const INITIAL_BOOKINGS = buildInitialBookings();

const EMPTY_FORM = {
  hotel: '',
  location: '',
  guest: '',
  checkIn: '',
  checkOut: '',
  rooms: '1',
  guests: '1',
  phone: '',
  email: '',
  amount: '',
  status: 'Pending',
};

const EMPTY_FILTERS = { search: '', hotel: 'All Hotels', status: 'All Status', checkIn: '', checkOut: '' };

/* ------------------------------------------------------------------ */
/*  Validation                                                         */
/* ------------------------------------------------------------------ */

const normalizePhone = (value) => value.replace(/[\s-]/g, '').replace(/^(\+91|91)(?=\d{10}$)/, '');

const validateForm = (form) => {
  const errors = {};
  if (!form.hotel.trim()) errors.hotel = 'Hotel name is required.';
  if (!form.guest.trim()) errors.guest = 'Guest name is required.';
  else if (form.guest.trim().length < 2) errors.guest = 'Enter at least 2 characters.';
  if (!form.checkIn) errors.checkIn = 'Check-in date is required.';
  if (!form.checkOut) errors.checkOut = 'Check-out date is required.';
  if (form.checkIn && form.checkOut && form.checkOut <= form.checkIn) {
    errors.checkOut = 'Check-out must be later than check-in.';
  }
  const rooms = Number(form.rooms);
  if (form.rooms === '') errors.rooms = 'Number of rooms is required.';
  else if (!Number.isInteger(rooms) || rooms <= 0) errors.rooms = 'Rooms must be a positive whole number.';
  const guests = Number(form.guests);
  if (form.guests === '') errors.guests = 'Number of guests is required.';
  else if (!Number.isInteger(guests) || guests <= 0) errors.guests = 'Guests must be a positive whole number.';
  if (!form.phone.trim()) errors.phone = 'Phone number is required.';
  else if (!/^[6-9]\d{9}$/.test(normalizePhone(form.phone.trim()))) {
    errors.phone = 'Enter a valid 10-digit mobile number.';
  }
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (form.amount === '') errors.amount = 'Total amount is required.';
  else if (Number.isNaN(Number(form.amount)) || Number(form.amount) < 0) errors.amount = 'Amount cannot be negative.';
  if (!STATUSES.includes(form.status)) errors.status = 'Select a booking status.';
  return errors;
};

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

const ICON_PATHS = {
  bed: (
    <>
      <path d="M3 18V6" />
      <path d="M3 14h18v4" />
      <path d="M21 14v-2a3 3 0 0 0-3-3h-7v5" />
      <circle cx="7" cy="11" r="1.6" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.4 2.8 2.8L16.2 9.6" />
    </>
  ),
  hourglass: (
    <>
      <path d="M6 3h12M6 21h12" />
      <path d="M7 3v3.5c0 1.6 1 2.6 2.4 3.5L12 12l2.6-2c1.4-.9 2.4-1.9 2.4-3.5V3" />
      <path d="M7 21v-3.5c0-1.6 1-2.6 2.4-3.5L12 12l2.6 2c1.4.9 2.4 1.9 2.4 3.5V21" />
    </>
  ),
  xCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m9.2 9.2 5.6 5.6M14.8 9.2l-5.6 5.6" />
    </>
  ),
  trend: (
    <>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </>
  ),
  list: <path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  edit: (
    <>
      <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" />
      <path d="m13.5 6.5 4 4" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16M10 11v6M14 11v6" />
      <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
    </>
  ),
  chevLeft: <path d="m15 5-7 7 7 7" />,
  chevRight: <path d="m9 5 7 7-7 7" />,
  chevDown: <path d="m6 9 6 6 6-6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c.8-4 4-6 8-6s7.2 2 8 6" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3 2.5 20h19L12 3Z" />
      <path d="M12 10v4.5M12 17.4h.01" />
    </>
  ),
  reset: (
    <>
      <path d="M4 12a8 8 0 1 0 2.6-5.9" />
      <path d="M4 4v4.5h4.5" />
    </>
  ),
};

const Icon = ({ name, size = 20 }) => (
  <svg
    className="hotelbooking-icon"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {ICON_PATHS[name]}
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Custom Dropdown (always stays inside container width on mobile)     */
/* ------------------------------------------------------------------ */

const FilterDropdown = ({ icon, value, options, onChange, ariaLabel }) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const handleOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className={`hotelbooking-custom-select${open ? ' hotelbooking-select-open' : ''}`}>
      <button
        type="button"
        className="hotelbooking-custom-select-trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
      >
        <Icon name={icon} size={18} />
        <span className="hotelbooking-custom-select-value">{value}</span>
        <Icon name="chevDown" size={16} />
      </button>

      {open && (
        <ul className="hotelbooking-custom-select-menu" role="listbox" aria-label={ariaLabel}>
          {options.map((opt) => {
            const selected = opt === value;
            return (
              <li key={opt} role="option" aria-selected={selected}>
                <button
                  type="button"
                  className={`hotelbooking-custom-select-option${selected ? ' hotelbooking-option-selected' : ''}`}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                >
                  {opt}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Small presentational components                                    */
/* ------------------------------------------------------------------ */

const HotelImage = ({ src, alt, className }) => (
  <img
    className={className}
    src={src}
    alt={alt}
    loading="lazy"
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = PLACEHOLDER_IMG;
    }}
  />
);

const StatusBadge = ({ status }) => (
  <span className={`hotelbooking-status-badge hotelbooking-status-${status.toLowerCase()}`}>{status}</span>
);

const StatCard = ({ label, count, icon, tone }) => (
  <div className={`hotelbooking-stat-card hotelbooking-tone-${tone}`}>
    <div className="hotelbooking-stat-icon">
      <Icon name={icon} size={28} />
    </div>
    <div className="hotelbooking-stat-text">
      <span className="hotelbooking-stat-label">{label}</span>
      <strong className="hotelbooking-stat-count">{count}</strong>
    </div>
    <div className="hotelbooking-stat-trend">
      <Icon name="trend" size={22} />
    </div>
  </div>
);

const Field = ({ label, error, children, full }) => (
  <label className={`hotelbooking-field${full ? ' hotelbooking-field-full' : ''}${error ? ' hotelbooking-field-error' : ''}`}>
    <span className="hotelbooking-field-label">{label}</span>
    {children}
    {error && <span className="hotelbooking-field-message" role="alert">{error}</span>}
  </label>
);

const ModalShell = ({ title, onClose, children, size = 'md', labelId }) => (
  <div
    className="hotelbooking-modal-backdrop"
    onMouseDown={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}
  >
    <div className={`hotelbooking-modal hotelbooking-modal-${size}`} role="dialog" aria-modal="true" aria-labelledby={labelId}>
      <div className="hotelbooking-modal-header">
        <h2 id={labelId} className="hotelbooking-modal-title">{title}</h2>
        <button type="button" className="hotelbooking-modal-close" onClick={onClose} aria-label="Close dialog">
          <Icon name="close" size={20} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

const getPageItems = (current, total) => {
  const set = new Set([1, total, current - 1, current, current + 1]);
  if (current <= 3) {
    set.add(2);
    set.add(3);
  }
  if (current >= total - 2) {
    set.add(total - 1);
    set.add(total - 2);
  }
  const pages = [...set].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const items = [];
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > 1) items.push(`gap-${p}`);
    items.push(p);
  });
  return items;
};

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

const Hotelbooking = () => {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const nextIdRef = useRef(INITIAL_BOOKINGS.length + 1);
  const toastTimerRef = useRef(null);
  const headerCheckboxRef = useRef(null);

  /* ---------- toast ---------- */
  const showToast = useCallback((message, type = 'success') => {
    window.clearTimeout(toastTimerRef.current);
    setToast({ message, type, key: Date.now() });
    toastTimerRef.current = window.setTimeout(() => setToast(null), 3200);
  }, []);

  useEffect(() => () => window.clearTimeout(toastTimerRef.current), []);

  /* ---------- derived statistics ---------- */
  const stats = useMemo(
    () => ({
      total: bookings.length,
      confirmed: bookings.filter((b) => b.status === 'Confirmed').length,
      pending: bookings.filter((b) => b.status === 'Pending').length,
      cancelled: bookings.filter((b) => b.status === 'Cancelled').length,
    }),
    [bookings]
  );

  /* ---------- hotel options ---------- */
  const hotelOptions = useMemo(
    () => [...new Set(bookings.map((b) => b.hotel))].sort((a, b) => a.localeCompare(b)),
    [bookings]
  );

  /* ---------- filtering ---------- */
  const filteredBookings = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return bookings.filter((b) => {
      if (q) {
        const haystack = `${b.hotel} ${b.guest} ${b.phone} ${b.email} ${b.location}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filters.hotel !== 'All Hotels' && b.hotel !== filters.hotel) return false;
      if (filters.status !== 'All Status' && b.status !== filters.status) return false;
      if (filters.checkIn && b.checkIn < filters.checkIn) return false;
      if (filters.checkOut && b.checkOut > filters.checkOut) return false;
      return true;
    });
  }, [bookings, filters]);

  const hasActiveFilters =
    filters.search !== '' ||
    filters.hotel !== 'All Hotels' ||
    filters.status !== 'All Status' ||
    filters.checkIn !== '' ||
    filters.checkOut !== '';

  /* ---------- pagination ---------- */
  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pageRows = filteredBookings.slice(startIndex, startIndex + pageSize);
  const showingFrom = filteredBookings.length === 0 ? 0 : startIndex + 1;
  const showingTo = startIndex + pageRows.length;

  useEffect(() => {
    setPage(1);
  }, [filters, pageSize]);

  useEffect(() => {
    setSelectedIds(new Set());
  }, [filters, pageSize, currentPage]);

  /* ---------- selection ---------- */
  const selectedOnPage = pageRows.filter((b) => selectedIds.has(b.id)).length;
  const allSelected = pageRows.length > 0 && selectedOnPage === pageRows.length;

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = selectedOnPage > 0 && !allSelected;
    }
  }, [selectedOnPage, allSelected]);

  const toggleRow = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setSelectedIds(allSelected ? new Set() : new Set(pageRows.map((b) => b.id)));
  };

  /* ---------- modal helpers ---------- */
  const closeModal = useCallback(() => setModal(null), []);

  useEffect(() => {
    if (!modal) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modal, closeModal]);

  const bookingToForm = (b) => ({
    hotel: b.hotel,
    location: b.location,
    guest: b.guest,
    checkIn: b.checkIn,
    checkOut: b.checkOut,
    rooms: String(b.rooms),
    guests: String(b.guests),
    phone: b.phone,
    email: b.email,
    amount: String(b.amount),
    status: b.status,
  });

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setModal({ type: 'form' });
  };

  const openEdit = (booking) => {
    setForm(bookingToForm(booking));
    setErrors({});
    setModal({ type: 'form', booking });
  };

  /* ---------- form handling ---------- */
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'hotel') {
        const meta = getHotelMeta(value);
        if (meta) next.location = meta.location;
      }
      return next;
    });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFormReset = () => {
    setForm(modal && modal.booking ? bookingToForm(modal.booking) : EMPTY_FORM);
    setErrors({});
  };

  const handleSave = (e) => {
    e.preventDefault();
    const found = validateForm(form);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    const hotelInfo = resolveHotel(form.hotel, form.location);
    const payload = {
      ...hotelInfo,
      guest: form.guest.trim(),
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      rooms: Number(form.rooms),
      guests: Number(form.guests),
      phone: normalizePhone(form.phone.trim()),
      email: form.email.trim(),
      amount: Number(form.amount),
      status: form.status,
    };

    if (modal && modal.booking) {
      const { id } = modal.booking;
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...payload } : b)));
      showToast(`Booking for ${payload.guest} updated.`);
    } else {
      const id = `bk-${padSerial(nextIdRef.current)}`;
      nextIdRef.current += 1;
      setBookings((prev) => [{ id, ...payload }, ...prev]);
      showToast(`Booking for ${payload.guest} added.`);
    }
    closeModal();
  };

  /* ---------- delete ---------- */
  const confirmDelete = () => {
    const { booking } = modal;
    setBookings((prev) => prev.filter((b) => b.id !== booking.id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(booking.id);
      return next;
    });
    showToast(`Booking for ${booking.guest} deleted.`);
    closeModal();
  };

  const confirmBulkDelete = () => {
    const ids = new Set(selectedIds);
    setBookings((prev) => prev.filter((b) => !ids.has(b.id)));
    setSelectedIds(new Set());
    showToast(`${ids.size} booking${ids.size > 1 ? 's' : ''} deleted.`);
    closeModal();
  };

  /* ---------- filters ---------- */
  const updateFilter = (name, value) => setFilters((prev) => ({ ...prev, [name]: value }));

  const resetFilters = () => setFilters(EMPTY_FILTERS);

  const handleSearchClick = () => {
    setPage(1);
    showToast(
      filteredBookings.length === 0
        ? 'No bookings match your search.'
        : `${filteredBookings.length} booking${filteredBookings.length > 1 ? 's' : ''} found.`,
      filteredBookings.length === 0 ? 'error' : 'success'
    );
  };

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */

  return (
    <div className="hotelbooking-container">
      {/* ---------- statistics ---------- */}
      <section className="hotelbooking-stats" aria-label="Booking statistics">
        <StatCard label="Total Bookings" count={stats.total} icon="bed" tone="total" />
        <StatCard label="Confirmed" count={stats.confirmed} icon="check" tone="confirmed" />
        <StatCard label="Pending" count={stats.pending} icon="hourglass" tone="pending" />
        <StatCard label="Cancelled" count={stats.cancelled} icon="xCircle" tone="cancelled" />
      </section>

      {/* ---------- toolbar ---------- */}
      <section className="hotelbooking-toolbar" aria-label="Search and filters">
        <div className="hotelbooking-search-bar">
          <Icon name="search" size={18} />
          <input
            type="text"
            className="hotelbooking-search-input"
            placeholder="Search guest, phone, hotel..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
            aria-label="Search bookings"
          />
        </div>

        <FilterDropdown
          icon="bed"
          value={filters.hotel}
          options={['All Hotels', ...hotelOptions]}
          onChange={(val) => updateFilter('hotel', val)}
          ariaLabel="Filter by hotel"
        />

        <FilterDropdown
          icon="list"
          value={filters.status}
          options={['All Status', ...STATUSES]}
          onChange={(val) => updateFilter('status', val)}
          ariaLabel="Filter by status"
        />

        <div className={`hotelbooking-date-filter${filters.checkIn ? ' hotelbooking-has-value' : ''}`}>
          <Icon name="calendar" size={18} />
          <span className="hotelbooking-date-placeholder">Check-in Date</span>
          <input
            type="date"
            value={filters.checkIn}
            max={filters.checkOut || undefined}
            onChange={(e) => updateFilter('checkIn', e.target.value)}
            aria-label="Check-in date from"
          />
        </div>

        <div className={`hotelbooking-date-filter${filters.checkOut ? ' hotelbooking-has-value' : ''}`}>
          <Icon name="calendar" size={18} />
          <span className="hotelbooking-date-placeholder">Check-out Date</span>
          <input
            type="date"
            value={filters.checkOut}
            min={filters.checkIn || undefined}
            onChange={(e) => updateFilter('checkOut', e.target.value)}
            aria-label="Check-out date until"
          />
        </div>

        {hasActiveFilters && (
          <button type="button" className="hotelbooking-reset-button" onClick={resetFilters}>
            <Icon name="reset" size={16} />
            Reset Filters
          </button>
        )}

        <div className="hotelbooking-toolbar-actions">
          <button type="button" className="hotelbooking-primary-button hotelbooking-search-button" onClick={handleSearchClick}>
            <Icon name="search" size={18} />
            Search
          </button>
          <button type="button" className="hotelbooking-primary-button hotelbooking-add-button" onClick={openAdd}>
            <Icon name="plus" size={18} />
            Add Booking
          </button>
        </div>
      </section>

      {/* ---------- table ---------- */}
      <section className="hotelbooking-table-card" aria-label="Bookings">
        {selectedIds.size > 0 && (
          <div className="hotelbooking-bulk-bar">
            <span>{selectedIds.size} selected</span>
            <button type="button" className="hotelbooking-danger-button" onClick={() => setModal({ type: 'bulk' })}>
              <Icon name="trash" size={16} />
              Delete Selected
            </button>
          </div>
        )}

        <div className="hotelbooking-table-scroll">
          <table className="hotelbooking-table">
            <thead>
              <tr>
                <th className="hotelbooking-col-check">
                  <input
                    ref={headerCheckboxRef}
                    type="checkbox"
                    className="hotelbooking-checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    disabled={pageRows.length === 0}
                    aria-label="Select all rows on this page"
                  />
                </th>
                <th className="hotelbooking-col-serial">#</th>
                <th>Hotel Details</th>
                <th>Guest Name</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Rooms</th>
                <th>Guests</th>
                <th>Phone Number</th>
                <th>Email Address</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={13} className="hotelbooking-empty-cell">
                    <div className="hotelbooking-empty-state">
                      <div className="hotelbooking-empty-icon"><Icon name="search" size={30} /></div>
                      <h3>No bookings found</h3>
                      <p>
                        {hasActiveFilters
                          ? 'Nothing matches your search and filters. Try different keywords or clear the filters.'
                          : 'There are no bookings yet. Add your first booking to get started.'}
                      </p>
                      {hasActiveFilters ? (
                        <button type="button" className="hotelbooking-reset-button" onClick={resetFilters}>
                          <Icon name="reset" size={16} />
                          Reset Filters
                        </button>
                      ) : (
                        <button type="button" className="hotelbooking-primary-button" onClick={openAdd}>
                          <Icon name="plus" size={18} />
                          Add Booking
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                pageRows.map((b, index) => (
                  <tr key={b.id} className={selectedIds.has(b.id) ? 'hotelbooking-row-selected' : ''}>
                    <td className="hotelbooking-col-check">
                      <input
                        type="checkbox"
                        className="hotelbooking-checkbox"
                        checked={selectedIds.has(b.id)}
                        onChange={() => toggleRow(b.id)}
                        aria-label={`Select booking for ${b.guest}`}
                      />
                    </td>
                    <td className="hotelbooking-col-serial">
                      <span className="hotelbooking-serial">{padSerial(startIndex + index + 1)}</span>
                    </td>
                    <td>
                      <div className="hotelbooking-hotel-cell">
                        <HotelImage className="hotelbooking-hotel-thumb" src={b.image} alt={b.hotel} />
                        <div className="hotelbooking-hotel-text">
                          <strong className="hotelbooking-hotel-name">{b.hotel}</strong>
                          <span className="hotelbooking-hotel-location">{b.location}</span>
                        </div>
                      </div>
                    </td>
                    <td className="hotelbooking-guest-name">{b.guest}</td>
                    <td className="hotelbooking-nowrap">{formatDate(b.checkIn)}</td>
                    <td className="hotelbooking-nowrap">{formatDate(b.checkOut)}</td>
                    <td className="hotelbooking-center">{b.rooms}</td>
                    <td className="hotelbooking-center">{b.guests}</td>
                    <td className="hotelbooking-nowrap">{b.phone}</td>
                    <td>{b.email || '—'}</td>
                    <td><span className="hotelbooking-amount">{formatCurrency(b.amount)}</span></td>
                    <td><StatusBadge status={b.status} /></td>
                    <td>
                      <div className="hotelbooking-actions">
                        <button
                          type="button"
                          className="hotelbooking-action-button hotelbooking-action-view"
                          title="View details"
                          aria-label={`View booking for ${b.guest}`}
                          onClick={() => setModal({ type: 'view', booking: b })}
                        >
                          <Icon name="eye" size={17} />
                        </button>
                        <button
                          type="button"
                          className="hotelbooking-action-button hotelbooking-action-edit"
                          title="Edit booking"
                          aria-label={`Edit booking for ${b.guest}`}
                          onClick={() => openEdit(b)}
                        >
                          <Icon name="edit" size={17} />
                        </button>
                        <button
                          type="button"
                          className="hotelbooking-action-button hotelbooking-action-delete"
                          title="Delete booking"
                          aria-label={`Delete booking for ${b.guest}`}
                          onClick={() => setModal({ type: 'delete', booking: b })}
                        >
                          <Icon name="trash" size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ---------- pagination ---------- */}
        <div className="hotelbooking-pagination">
          <span className="hotelbooking-pagination-info">
            Showing {showingFrom} to {showingTo} of {filteredBookings.length} bookings
          </span>

          <label className="hotelbooking-page-size">
            <span>Show:</span>
            <span className="hotelbooking-page-size-select">
              <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} aria-label="Rows per page">
                {PAGE_SIZES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <Icon name="chevDown" size={14} />
            </span>
            <span>per page</span>
          </label>

          <nav className="hotelbooking-page-nav" aria-label="Pagination">
            <button
              type="button"
              className="hotelbooking-page-button"
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <Icon name="chevLeft" size={16} />
            </button>
            {getPageItems(currentPage, totalPages).map((item) =>
              typeof item === 'string' ? (
                <span key={item} className="hotelbooking-page-ellipsis">…</span>
              ) : (
                <button
                  key={item}
                  type="button"
                  className={`hotelbooking-page-button${item === currentPage ? ' hotelbooking-page-active' : ''}`}
                  onClick={() => setPage(item)}
                  aria-current={item === currentPage ? 'page' : undefined}
                >
                  {item}
                </button>
              )
            )}
            <button
              type="button"
              className="hotelbooking-page-button"
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <Icon name="chevRight" size={16} />
            </button>
          </nav>
        </div>
      </section>

      {/* ---------- add / edit modal ---------- */}
      {modal && modal.type === 'form' && (
        <ModalShell
          title={modal.booking ? 'Edit Booking' : 'Add Booking'}
          onClose={closeModal}
          size="lg"
          labelId="hotelbooking-form-title"
        >
          <form className="hotelbooking-form" onSubmit={handleSave} noValidate>
            <div className="hotelbooking-form-grid">
              <Field label="Hotel Name" error={errors.hotel}>
                <input
                  name="hotel"
                  list="hotelbooking-hotel-list"
                  value={form.hotel}
                  onChange={handleFormChange}
                  placeholder="Select or type a hotel"
                  autoComplete="off"
                />
                <datalist id="hotelbooking-hotel-list">
                  {[...new Set([...CATALOG_LIST.map((h) => h.name), ...hotelOptions])].map((h) => (
                    <option key={h} value={h} />
                  ))}
                </datalist>
              </Field>
              <Field label="Hotel Location">
                <input
                  name="location"
                  value={form.location}
                  onChange={handleFormChange}
                  placeholder="e.g. Puri"
                  disabled={Boolean(getHotelMeta(form.hotel))}
                />
              </Field>
              <Field label="Guest Name" error={errors.guest}>
                <input name="guest" value={form.guest} onChange={handleFormChange} placeholder="Full name" />
              </Field>
              <Field label="Phone Number" error={errors.phone}>
                <input
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  value={form.phone}
                  onChange={handleFormChange}
                  placeholder="10-digit mobile number"
                />
              </Field>
              <Field label="Check-in Date" error={errors.checkIn}>
                <input name="checkIn" type="date" value={form.checkIn} onChange={handleFormChange} />
              </Field>
              <Field label="Check-out Date" error={errors.checkOut}>
                <input name="checkOut" type="date" value={form.checkOut} min={form.checkIn || undefined} onChange={handleFormChange} />
              </Field>
              <Field label="Number of Rooms" error={errors.rooms}>
                <input name="rooms" type="number" min="1" step="1" value={form.rooms} onChange={handleFormChange} />
              </Field>
              <Field label="Number of Guests" error={errors.guests}>
                <input name="guests" type="number" min="1" step="1" value={form.guests} onChange={handleFormChange} />
              </Field>
              <Field label="Email Address" error={errors.email}>
                <input name="email" type="email" value={form.email} onChange={handleFormChange} placeholder="name@example.com" />
              </Field>
              <Field label="Total Amount (₹)" error={errors.amount}>
                <input name="amount" type="number" min="0" step="1" value={form.amount} onChange={handleFormChange} placeholder="0" />
              </Field>
              <Field label="Booking Status" error={errors.status} full>
                <select name="status" value={form.status} onChange={handleFormChange}>
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="hotelbooking-form-footer">
              <button type="button" className="hotelbooking-ghost-button" onClick={handleFormReset}>
                Reset Form
              </button>
              <div className="hotelbooking-form-footer-right">
                <button type="button" className="hotelbooking-ghost-button" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="hotelbooking-primary-button">
                  {modal.booking ? 'Save Changes' : 'Save Booking'}
                </button>
              </div>
            </div>
          </form>
        </ModalShell>
      )}

      {/* ---------- view modal ---------- */}
      {modal && modal.type === 'view' && (
        <ModalShell title="Booking Details" onClose={closeModal} size="lg" labelId="hotelbooking-view-title">
          <div className="hotelbooking-view">
            <div className="hotelbooking-view-hero">
              <HotelImage className="hotelbooking-view-image" src={modal.booking.image} alt={modal.booking.hotel} />
              <div className="hotelbooking-view-hero-text">
                <h3>{modal.booking.hotel}</h3>
                <p><Icon name="pin" size={16} /> {modal.booking.location}</p>
                <StatusBadge status={modal.booking.status} />
              </div>
            </div>
            <dl className="hotelbooking-detail-grid">
              <div><dt><Icon name="user" size={15} /> Guest Name</dt><dd>{modal.booking.guest}</dd></div>
              <div><dt><Icon name="phone" size={15} /> Phone Number</dt><dd>{modal.booking.phone}</dd></div>
              <div><dt><Icon name="mail" size={15} /> Email Address</dt><dd>{modal.booking.email || '—'}</dd></div>
              <div><dt><Icon name="list" size={15} /> Booking ID</dt><dd>{modal.booking.id.toUpperCase()}</dd></div>
              <div><dt><Icon name="calendar" size={15} /> Check-in</dt><dd>{formatDate(modal.booking.checkIn)}</dd></div>
              <div><dt><Icon name="calendar" size={15} /> Check-out</dt><dd>{formatDate(modal.booking.checkOut)}</dd></div>
              <div><dt><Icon name="bed" size={15} /> Rooms</dt><dd>{modal.booking.rooms}</dd></div>
              <div><dt><Icon name="user" size={15} /> Guests</dt><dd>{modal.booking.guests}</dd></div>
              <div className="hotelbooking-detail-total">
                <dt>Total Amount</dt>
                <dd>{formatCurrency(modal.booking.amount)}</dd>
              </div>
            </dl>
            <div className="hotelbooking-form-footer hotelbooking-view-footer">
              <button type="button" className="hotelbooking-ghost-button" onClick={closeModal}>Close</button>
              <button type="button" className="hotelbooking-primary-button" onClick={() => openEdit(modal.booking)}>
                <Icon name="edit" size={16} />
                Edit Booking
              </button>
            </div>
          </div>
        </ModalShell>
      )}

      {/* ---------- delete confirmation ---------- */}
      {modal && modal.type === 'delete' && (
        <ModalShell title="Delete Booking" onClose={closeModal} size="sm" labelId="hotelbooking-delete-title">
          <div className="hotelbooking-confirm">
            <div className="hotelbooking-confirm-icon"><Icon name="alert" size={28} /></div>
            <p>
              Delete the booking for <strong>{modal.booking.guest}</strong> at <strong>{modal.booking.hotel}</strong>
              {' '}({formatDate(modal.booking.checkIn)} – {formatDate(modal.booking.checkOut)})? This cannot be undone.
            </p>
            <div className="hotelbooking-confirm-actions">
              <button type="button" className="hotelbooking-ghost-button" onClick={closeModal}>Keep Booking</button>
              <button type="button" className="hotelbooking-danger-button" onClick={confirmDelete}>
                <Icon name="trash" size={16} />
                Delete
              </button>
            </div>
          </div>
        </ModalShell>
      )}

      {/* ---------- bulk delete confirmation ---------- */}
      {modal && modal.type === 'bulk' && (
        <ModalShell title="Delete Selected" onClose={closeModal} size="sm" labelId="hotelbooking-bulk-title">
          <div className="hotelbooking-confirm">
            <div className="hotelbooking-confirm-icon"><Icon name="alert" size={28} /></div>
            <p>
              Delete <strong>{selectedIds.size}</strong> selected booking{selectedIds.size > 1 ? 's' : ''}? This cannot be undone.
            </p>
            <div className="hotelbooking-confirm-actions">
              <button type="button" className="hotelbooking-ghost-button" onClick={closeModal}>Cancel</button>
              <button type="button" className="hotelbooking-danger-button" onClick={confirmBulkDelete}>
                <Icon name="trash" size={16} />
                Delete {selectedIds.size}
              </button>
            </div>
          </div>
        </ModalShell>
      )}

      {/* ---------- toast ---------- */}
      {toast && (
        <div key={toast.key} className={`hotelbooking-toast hotelbooking-toast-${toast.type}`} role="status" aria-live="polite">
          <Icon name={toast.type === 'error' ? 'alert' : 'check'} size={18} />
          <span>{toast.message}</span>
          <button type="button" className="hotelbooking-toast-close" onClick={() => setToast(null)} aria-label="Dismiss message">
            <Icon name="close" size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Hotelbooking;