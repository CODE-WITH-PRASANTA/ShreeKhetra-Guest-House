
import React, { useState } from "react";
import {
  Search,
  Plus,
  Copy,
  Pencil,
  Trash2,
  TicketPercent,
  CalendarDays,
  Users,
  Tag,
  X,
  CheckCircle2,
  Percent,
  IndianRupee,
  Clock,
} from "lucide-react";
import "./DiscountCoupon.css";

const initialCoupons = [
  {
    id: 1,
    code: "WELCOME25",
    title: "Welcome Offer",
    description: "Special discount for first-time guests.",
    type: "Percentage",
    discount: "25%",
    minBooking: "₹2,000",
    usage: 34,
    limit: 100,
    expiry: "30 Dec 2026",
    status: "Active",
    color: "purple",
  },
  {
    id: 2,
    code: "SUMMER500",
    title: "Summer Special",
    description: "Enjoy a flat discount on your summer stay.",
    type: "Flat",
    discount: "₹500",
    minBooking: "₹3,000",
    usage: 65,
    limit: 100,
    expiry: "15 Dec 2026",
    status: "Active",
    color: "orange",
  },
  {
    id: 3,
    code: "FAMILY15",
    title: "Family Package",
    description: "Exclusive savings for family bookings.",
    type: "Percentage",
    discount: "15%",
    minBooking: "₹4,000",
    usage: 18,
    limit: 50,
    expiry: "20 Dec 2026",
    status: "Active",
    color: "green",
  },
  {
    id: 4,
    code: "WEEKEND20",
    title: "Weekend Deal",
    description: "Make your weekends more affordable.",
    type: "Percentage",
    discount: "20%",
    minBooking: "₹2,500",
    usage: 50,
    limit: 50,
    expiry: "10 Nov 2026",
    status: "Expired",
    color: "blue",
  },
];

const DiscountCoupon = () => {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    code: "",
    title: "",
    description: "",
    type: "Percentage",
    discount: "",
    minBooking: "",
    usage: 0,
    limit: "",
    expiry: "",
    status: "Active",
    color: "purple",
  };

  const [form, setForm] = useState(emptyForm);

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch =
      coupon.code.toLowerCase().includes(search.toLowerCase()) ||
      coupon.title.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || coupon.status === filter;

    return matchesSearch && matchesFilter;
  });

  const activeCount = coupons.filter(
    (coupon) => coupon.status === "Active"
  ).length;

  const expiredCount = coupons.filter(
    (coupon) => coupon.status === "Expired"
  ).length;

  const totalUsage = coupons.reduce(
    (total, coupon) => total + Number(coupon.usage || 0),
    0
  );

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setEditingId(null);

    const colors = ["purple", "orange", "green", "blue"];
    setForm({
      ...emptyForm,
      color: colors[coupons.length % colors.length],
    });

    setShowModal(true);
  };

  const openEditModal = (coupon) => {
    setEditingId(coupon.id);
    setForm({ ...coupon });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.code.trim() ||
      !form.title.trim() ||
      !form.discount ||
      !form.limit ||
      !form.expiry
    ) {
      return;
    }

    if (editingId) {
      setCoupons((prev) =>
        prev.map((coupon) =>
          coupon.id === editingId
            ? {
                ...form,
                id: editingId,
                usage: Number(form.usage),
                limit: Number(form.limit),
              }
            : coupon
        )
      );
    } else {
      const newCoupon = {
        ...form,
        id: Date.now(),
        code: form.code.trim().toUpperCase(),
        usage: Number(form.usage || 0),
        limit: Number(form.limit),
      };

      setCoupons((prev) => [newCoupon, ...prev]);
    }

    setShowModal(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const deleteCoupon = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this coupon?"
    );

    if (confirmed) {
      setCoupons((prev) =>
        prev.filter((coupon) => coupon.id !== id)
      );
    }
  };

  const copyCoupon = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      window.alert(`Coupon code ${code} copied!`);
    } catch {
      window.alert("Unable to copy coupon code.");
    }
  };

  return (
    <div className="DiscountCoupon">
      <div className="DiscountCoupon__header">
        <div>
          <span className="DiscountCoupon__eyebrow">
            PROMOTIONS MANAGEMENT
          </span>
          <h1>Discount Coupons</h1>
          <p>
            Create, manage and track your guest house discount offers.
          </p>
        </div>

        <button
          className="DiscountCoupon__addBtn"
          onClick={openAddModal}
        >
          <Plus size={19} />
          Create Coupon
        </button>
      </div>

      <div className="DiscountCoupon__stats">
        <div className="DiscountCoupon__statCard">
          <div className="DiscountCoupon__statIcon purple">
            <TicketPercent size={23} />
          </div>
          <div>
            <span>Total Coupons</span>
            <h2>{coupons.length}</h2>
            <small>All created coupons</small>
          </div>
        </div>

        <div className="DiscountCoupon__statCard">
          <div className="DiscountCoupon__statIcon green">
            <CheckCircle2 size={23} />
          </div>
          <div>
            <span>Active Coupons</span>
            <h2>{activeCount}</h2>
            <small>Currently available</small>
          </div>
        </div>

        <div className="DiscountCoupon__statCard">
          <div className="DiscountCoupon__statIcon orange">
            <Clock size={23} />
          </div>
          <div>
            <span>Expired Coupons</span>
            <h2>{expiredCount}</h2>
            <small>Offers no longer valid</small>
          </div>
        </div>

        <div className="DiscountCoupon__statCard">
          <div className="DiscountCoupon__statIcon blue">
            <Users size={23} />
          </div>
          <div>
            <span>Total Redemptions</span>
            <h2>{totalUsage}</h2>
            <small>Coupon usage count</small>
          </div>
        </div>
      </div>

      <div className="DiscountCoupon__toolbar">
        <div className="DiscountCoupon__search">
          <Search size={19} />
          <input
            type="text"
            placeholder="Search coupon name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="DiscountCoupon__filters">
          {["All", "Active", "Expired"].map((item) => (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="DiscountCoupon__sectionHeading">
        <div>
          <h2>Available Offers</h2>
          <p>
            Manage your promotional coupons and special deals.
          </p>
        </div>
        <span>{filteredCoupons.length} Coupons</span>
      </div>

      <div className="DiscountCoupon__grid">
        {filteredCoupons.length > 0 ? (
          filteredCoupons.map((coupon) => (
            <div
              className={`DiscountCoupon__card DiscountCoupon__card--${coupon.color}`}
              key={coupon.id}
            >
              <div className="DiscountCoupon__cardTop">
                <div className="DiscountCoupon__couponIcon">
                  <TicketPercent size={24} />
                </div>

                <span
                  className={`DiscountCoupon__status ${
                    coupon.status === "Active"
                      ? "isActive"
                      : "isExpired"
                  }`}
                >
                  {coupon.status}
                </span>
              </div>

              <div className="DiscountCoupon__offer">
                <div>
                  <span className="DiscountCoupon__offerLabel">
                    SPECIAL OFFER
                  </span>
                  <h2>{coupon.discount}</h2>
                  <p>OFF ON YOUR BOOKING</p>
                </div>
                <div className="DiscountCoupon__offerShape">
                  <Percent size={38} />
                </div>
              </div>

              <div className="DiscountCoupon__cardContent">
                <h3>{coupon.title}</h3>
                <p>{coupon.description}</p>

                <div className="DiscountCoupon__codeBox">
                  <div>
                    <small>COUPON CODE</small>
                    <strong>{coupon.code}</strong>
                  </div>

                  <button
                    onClick={() => copyCoupon(coupon.code)}
                    title="Copy coupon code"
                  >
                    <Copy size={17} />
                  </button>
                </div>

                <div className="DiscountCoupon__details">
                  <div>
                    <span>
                      <IndianRupee size={15} />
                      Minimum Booking
                    </span>
                    <strong>{coupon.minBooking}</strong>
                  </div>

                  <div>
                    <span>
                      <CalendarDays size={15} />
                      Valid Until
                    </span>
                    <strong>{coupon.expiry}</strong>
                  </div>
                </div>

                <div className="DiscountCoupon__usage">
                  <div className="DiscountCoupon__usageText">
                    <span>Coupon Usage</span>
                    <strong>
                      {coupon.usage}/{coupon.limit}
                    </strong>
                  </div>

                  <div className="DiscountCoupon__progress">
                    <span
                      style={{
                        width: `${
                          coupon.limit > 0
                            ? Math.min(
                                (coupon.usage / coupon.limit) * 100,
                                100
                              )
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="DiscountCoupon__cardActions">
                  <button
                    className="DiscountCoupon__editBtn"
                    onClick={() => openEditModal(coupon)}
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    className="DiscountCoupon__deleteBtn"
                    onClick={() => deleteCoupon(coupon.id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="DiscountCoupon__empty">
            <TicketPercent size={42} />
            <h3>No Coupons Found</h3>
            <p>Try another search or create a new coupon.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div
          className="DiscountCoupon__modalOverlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="DiscountCoupon__modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="DiscountCoupon__modalHeader">
              <div>
                <span>COUPON MANAGEMENT</span>
                <h2>
                  {editingId ? "Edit Coupon" : "Create New Coupon"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
              >
                <X size={21} />
              </button>
            </div>

            <form
              className="DiscountCoupon__form"
              onSubmit={handleSubmit}
            >
              <div className="DiscountCoupon__formGrid">
                <label>
                  Coupon Code *
                  <input
                    name="code"
                    value={form.code}
                    onChange={handleInput}
                    placeholder="e.g. WELCOME25"
                    required
                  />
                </label>

                <label>
                  Coupon Title *
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleInput}
                    placeholder="Enter coupon title"
                    required
                  />
                </label>

                <label className="full">
                  Description
                  <input
                    name="description"
                    value={form.description}
                    onChange={handleInput}
                    placeholder="Enter coupon description"
                  />
                </label>

                <label>
                  Discount Type
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleInput}
                  >
                    <option value="Percentage">Percentage</option>
                    <option value="Flat">Flat Amount</option>
                  </select>
                </label>

                <label>
                  Discount Value *
                  <input
                    name="discount"
                    value={form.discount}
                    onChange={handleInput}
                    placeholder="e.g. 25% or ₹500"
                    required
                  />
                </label>

                <label>
                  Minimum Booking
                  <input
                    name="minBooking"
                    value={form.minBooking}
                    onChange={handleInput}
                    placeholder="e.g. ₹2000"
                  />
                </label>

                <label>
                  Usage Limit *
                  <input
                    name="limit"
                    type="number"
                    min="1"
                    value={form.limit}
                    onChange={handleInput}
                    placeholder="Enter usage limit"
                    required
                  />
                </label>

                <label>
                  Expiry Date *
                  <input
                    name="expiry"
                    type="date"
                    value={form.expiry}
                    onChange={handleInput}
                    required
                  />
                </label>

                <label>
                  Coupon Color
                  <select
                    name="color"
                    value={form.color}
                    onChange={handleInput}
                  >
                    <option value="purple">Purple</option>
                    <option value="orange">Orange</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                  </select>
                </label>

                <label>
                  Status
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleInput}
                  >
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                  </select>
                </label>
              </div>

              <div className="DiscountCoupon__modalActions">
                <button
                  type="button"
                  className="DiscountCoupon__cancelBtn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="DiscountCoupon__saveBtn"
                >
                  <CheckCircle2 size={17} />
                  {editingId ? "Update Coupon" : "Create Coupon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountCoupon;
