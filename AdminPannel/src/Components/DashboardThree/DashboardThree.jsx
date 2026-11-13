import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Mail,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

import "./DashboardThree.css";

const initialBookings = [
  {
    id: 1001,
    guestName: "Rakesh Sahoo",
    room: "Deluxe Room",
    checkIn: "2026-11-12",
    checkOut: "2026-11-14",
    status: "Confirmed",
    amount: 4800,
  },
  {
    id: 1002,
    guestName: "Priya Kar",
    room: "Standard Room",
    checkIn: "2026-11-12",
    checkOut: "2026-11-13",
    status: "Check-In",
    amount: 2400,
  },
  {
    id: 1003,
    guestName: "Amit Mishra",
    room: "Family Room",
    checkIn: "2026-11-11",
    checkOut: "2026-11-14",
    status: "Confirmed",
    amount: 7200,
  },
  {
    id: 1004,
    guestName: "Swati Das",
    room: "Deluxe Room",
    checkIn: "2026-11-11",
    checkOut: "2026-11-12",
    status: "Completed",
    amount: 4800,
  },
];

const initialEnquiries = [
  {
    id: 1,
    guestName: "Suman Kumar",
    message: "Room availability for 3 nights?",
    createdAt: new Date(Date.now() - 2 * 60000).toISOString(),
  },
  {
    id: 2,
    guestName: "Puja Dash",
    message: "Group booking for 10 people",
    createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
  },
  {
    id: 3,
    guestName: "Rohit Behera",
    message: "Need a family room with AC",
    createdAt: new Date(Date.now() - 60 * 60000).toISOString(),
  },
];

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || "")
    .join("");

const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatAmount = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

const getRelativeTime = (date, now) => {
  if (!date) return "";

  const timestamp = new Date(date).getTime();

  if (Number.isNaN(timestamp)) return "";

  const difference = Math.max(0, now - timestamp);

  const minutes = Math.floor(difference / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} mins ago`;
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;

  return `${days} ${days === 1 ? "day" : "days"} ago`;
};

const getStatusClass = (status = "") =>
  status.toLowerCase().replace(/\s+/g, "-");

const DashboardThree = ({
  apiUrl = "",
  refreshInterval = 10000,
  onViewAllBookings,
  onViewAllEnquiries,
}) => {
  const [bookings, setBookings] = useState(initialBookings);
  const [enquiries, setEnquiries] = useState(initialEnquiries);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [connected, setConnected] = useState(false);

  const [currentTime, setCurrentTime] = useState(Date.now());

  // UPDATE RELATIVE ENQUIRY TIME
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  // FETCH LIVE DASHBOARD DATA
  useEffect(() => {
    if (!apiUrl) {
      setBookings(initialBookings);
      setEnquiries(initialEnquiries);
      setConnected(false);
      setApiError("");
      return;
    }

    let active = true;
    let firstRequest = true;

    const fetchDashboardData = async () => {
      try {
        if (firstRequest) setLoading(true);

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const result = await response.json();

        if (!active) return;

        if (
          result.bookings !== undefined &&
          !Array.isArray(result.bookings)
        ) {
          throw new Error("Invalid bookings data");
        }

        if (
          result.enquiries !== undefined &&
          !Array.isArray(result.enquiries)
        ) {
          throw new Error("Invalid enquiries data");
        }

        if (Array.isArray(result.bookings)) {
          setBookings(result.bookings);
        }

        if (Array.isArray(result.enquiries)) {
          setEnquiries(result.enquiries);
        }

        setConnected(true);
        setApiError("");
        firstRequest = false;
      } catch (error) {
        if (active) {
          setConnected(false);
          setApiError(error.message || "Unable to load dashboard data");
          console.error("Dashboard API error:", error);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchDashboardData();

    const interval = setInterval(
      fetchDashboardData,
      Math.max(2000, refreshInterval)
    );

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [apiUrl, refreshInterval]);

  return (
    <section className="dashboard-three">

      {/* RECENT BOOKINGS */}

      <div className="dashboard-three-card bookings-card">

        <div className="dashboard-three-header">

          <div className="dashboard-three-title">
            <div className="three-heading-icon calendar-icon">
              <CalendarDays size={24} strokeWidth={2.3} />
            </div>

            <h2>Recent Bookings</h2>
          </div>

          <div className="three-header-actions">

            {connected && (
              <span className="three-live-indicator">
                <i></i>
                LIVE
              </span>
            )}

            <button
              className="three-view-all"
              type="button"
              onClick={onViewAllBookings}
            >
              View All <ArrowRight size={17} />
            </button>

          </div>

        </div>

        <div className="booking-table-wrapper">

          <table className="recent-bookings-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Guest Name</th>
                <th>Room</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>

              {loading && bookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="three-message-cell">
                    Loading bookings...
                  </td>
                </tr>
              ) : bookings.length > 0 ? (
                bookings.slice(0, 4).map((booking, index) => (
                  <tr key={booking.id ?? index}>

                    <td className="booking-id">
                      #{booking.id}
                    </td>

                    <td>
                      <div className="booking-guest">

                        <span className={`guest-avatar guest-avatar-${index % 4}`}>
                          {getInitials(booking.guestName)}
                        </span>

                        <span className="guest-name">
                          {booking.guestName}
                        </span>

                      </div>
                    </td>

                    <td className="room-name">
                      {booking.room}
                    </td>

                    <td className="booking-date">
                      {formatDate(booking.checkIn)}
                    </td>

                    <td className="booking-date">
                      {formatDate(booking.checkOut)}
                    </td>

                    <td>
                      <span
                        className={`booking-status status-${getStatusClass(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td className="booking-amount">
                      {formatAmount(booking.amount)}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="three-message-cell">
                    No recent bookings found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        {apiError && (
          <div className="three-error-message">
            {apiError}
          </div>
        )}

      </div>

      {/* RECENT ENQUIRIES */}

      <div className="dashboard-three-card enquiries-card">

        <div className="dashboard-three-header">

          <div className="dashboard-three-title">
            <div className="three-heading-icon mail-icon">
              <Mail size={25} strokeWidth={2.3} />
            </div>

            <h2>Recent Enquiries</h2>
          </div>

          <div className="three-header-actions">

            {connected && (
              <span className="three-live-indicator">
                <i></i>
                LIVE
              </span>
            )}

            <button
              className="three-view-all"
              type="button"
              onClick={onViewAllEnquiries}
            >
              View All <ArrowRight size={17} />
            </button>

          </div>

        </div>

        <div className="enquiries-list">

          {loading && enquiries.length === 0 ? (
            <div className="three-message-cell">
              Loading enquiries...
            </div>
          ) : enquiries.length > 0 ? (
            enquiries.slice(0, 4).map((enquiry, index) => (
              <div
                className="enquiry-item"
                key={enquiry.id ?? index}
              >

                <div className={`enquiry-avatar enquiry-avatar-${index % 4}`}>
                  {getInitials(enquiry.guestName)}
                </div>

                <div className="enquiry-content">

                  <h3>{enquiry.guestName}</h3>

                  <p>{enquiry.message}</p>

                </div>

                <span className="enquiry-time">
                  {getRelativeTime(
                    enquiry.createdAt,
                    currentTime
                  )}
                </span>

              </div>
            ))
          ) : (
            <div className="three-message-cell">
              No recent enquiries found.
            </div>
          )}

        </div>

        {apiError && (
          <div className="three-error-message">
            {apiError}
          </div>
        )}

      </div>

    </section>
  );
};

export default DashboardThree;