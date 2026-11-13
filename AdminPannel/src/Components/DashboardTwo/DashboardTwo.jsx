import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  BedDouble,
  UserRoundPlus,
  Image as ImageIcon,
  FileText,
  ChevronDown,
} from "lucide-react";

import "./DashboardTwo.css";

const sampleData = {
  overview: [
    { label: "Nov 6", value: 7 },
    { label: "Nov 7", value: 9 },
    { label: "Nov 8", value: 14 },
    { label: "Nov 9", value: 10 },
    { label: "Nov 10", value: 20 },
    { label: "Nov 11", value: 16 },
    { label: "Nov 12", value: 24 },
  ],
  bookingStatus: {
    confirmed: 28,
    pending: 8,
    checkIn: 6,
    checkOut: 6,
  },
};

const statusConfig = [
  { key: "confirmed", label: "Confirmed", color: "#16b96b" },
  { key: "pending", label: "Pending", color: "#2784f2" },
  { key: "checkIn", label: "Check-In", color: "#f59e0b" },
  { key: "checkOut", label: "Check-Out", color: "#923de8" },
];

const GRAPH_WIDTH = 720;
const GRAPH_HEIGHT = 245;
const GRAPH_LEFT = 45;
const GRAPH_RIGHT = 15;
const GRAPH_TOP = 20;
const GRAPH_BOTTOM = 40;

const validateData = (data) =>
  data &&
  Array.isArray(data.overview) &&
  data.overview.length > 0 &&
  data.bookingStatus &&
  statusConfig.every(
    (item) =>
      Number.isFinite(Number(data.bookingStatus[item.key])) &&
      Number(data.bookingStatus[item.key]) >= 0
  );

const getGraphData = (data) => {
  const values = data.map((item) =>
    Math.max(0, Number(item.value) || 0)
  );

  const maxValue = Math.max(
    5,
    Math.ceil(Math.max(...values) / 5) * 5
  );

  const points = data.map((item, index) => {
    const x =
      GRAPH_LEFT +
      (index / Math.max(data.length - 1, 1)) *
        (GRAPH_WIDTH - GRAPH_LEFT - GRAPH_RIGHT);

    const y =
      GRAPH_HEIGHT -
      GRAPH_BOTTOM -
      ((Number(item.value) || 0) / maxValue) *
        (GRAPH_HEIGHT - GRAPH_TOP - GRAPH_BOTTOM);

    return {
      x,
      y,
      label: item.label,
      value: Number(item.value) || 0,
    };
  });

  let linePath = "";

  points.forEach((point, index) => {
    if (index === 0) {
      linePath = `M ${point.x} ${point.y}`;
    } else {
      const previous = points[index - 1];
      const middleX = (previous.x + point.x) / 2;

      linePath += ` C ${middleX} ${previous.y},
        ${middleX} ${point.y},
        ${point.x} ${point.y}`;
    }
  });

  const areaPath = points.length
    ? `${linePath} L ${points[points.length - 1].x} ${
        GRAPH_HEIGHT - GRAPH_BOTTOM
      } L ${points[0].x} ${GRAPH_HEIGHT - GRAPH_BOTTOM} Z`
    : "";

  return {
    points,
    linePath,
    areaPath,
    maxValue,
  };
};

const DashboardTwo = ({
  apiUrl,
  wsUrl,
  refreshInterval = 5000,
  onAddBooking,
  onAddGuest,
  onUploadGallery,
  onViewEnquiries,
}) => {
  const [range, setRange] = useState("7d");
  const [dashboardData, setDashboardData] = useState(sampleData);

  const [activePoint, setActivePoint] = useState(null);
  const [activeStatus, setActiveStatus] = useState(null);

  const [liveConnected, setLiveConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // API LIVE DATA
  useEffect(() => {
    if (!apiUrl) {
      setDashboardData(sampleData);
      setLiveConnected(false);
      return;
    }

    let active = true;

    const fetchData = async () => {
      try {
        const separator = apiUrl.includes("?") ? "&" : "?";

        const response = await fetch(
          `${apiUrl}${separator}range=${range}`,
          {
            headers: {
              Accept: "application/json",
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Dashboard API request failed");
        }

        const result = await response.json();

        if (!active) return;

        if (!validateData(result)) {
          throw new Error("Invalid dashboard response");
        }

        setDashboardData(result);
        setLastUpdated(new Date());
        setLiveConnected(true);
      } catch (error) {
        if (active) {
          setLiveConnected(false);
          console.error("Dashboard API error:", error);
        }
      }
    };

    fetchData();

    const timer = setInterval(
      fetchData,
      Math.max(1000, refreshInterval)
    );

    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [apiUrl, range, refreshInterval]);

  // WEBSOCKET LIVE DATA
  useEffect(() => {
    if (!wsUrl) return;

    let active = true;
    let socket;
    let reconnectTimer;
    let delay = 2000;

    const connect = () => {
      if (!active) return;

      socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        delay = 2000;

        socket.send(
          JSON.stringify({
            type: "subscribe",
            range,
          })
        );
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          const result = message.data || message;

          if (
            active &&
            (!message.range || message.range === range) &&
            validateData(result)
          ) {
            setDashboardData(result);
            setLiveConnected(true);
            setLastUpdated(new Date());
          }
        } catch (error) {
          console.error("Invalid WebSocket data:", error);
        }
      };

      socket.onclose = () => {
        if (!active) return;

        setLiveConnected(false);

        reconnectTimer = setTimeout(connect, delay);
        delay = Math.min(delay * 2, 15000);
      };

      socket.onerror = () => socket.close();
    };

    connect();

    return () => {
      active = false;
      clearTimeout(reconnectTimer);

      if (socket) {
        socket.onclose = null;
        socket.close();
      }
    };
  }, [wsUrl, range]);

  // GRAPH DATA
  const graph = useMemo(
    () => getGraphData(dashboardData.overview),
    [dashboardData.overview]
  );

  const selectedPoint =
    activePoint !== null
      ? graph.points[activePoint]
      : null;

  // BOOKING STATUS DATA
  const status = dashboardData.bookingStatus;

  const totalBookings = statusConfig.reduce(
    (sum, item) => sum + Number(status[item.key] || 0),
    0
  );

  const statusDetails = statusConfig.map((item) => {
    const count = Number(status[item.key]) || 0;

    const percentage =
      totalBookings > 0
        ? (count / totalBookings) * 100
        : 0;

    return {
      ...item,
      count,
      percentage,
    };
  });

  // SINGLE CIRCULAR DONUT
  const donutBackground = useMemo(() => {
    if (!totalBookings) return "#edf0f6";

    let current = 0;

    const segments = statusDetails.map((item) => {
      const start = current;
      current += item.percentage;

      return `${item.color} ${start}% ${current}%`;
    });

    return `conic-gradient(${segments.join(", ")})`;
  }, [statusDetails, totalBookings]);

  // GRAPH CURSOR
  const handleGraphMove = (event) => {
    if (!graph.points.length) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const mouseX =
      ((event.clientX - rect.left) / rect.width) * GRAPH_WIDTH;

    let nearestIndex = 0;
    let shortestDistance = Infinity;

    graph.points.forEach((point, index) => {
      const distance = Math.abs(point.x - mouseX);

      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestIndex = index;
      }
    });

    setActivePoint(nearestIndex);
  };

  const selectedStatus = statusDetails.find(
    (item) => item.key === activeStatus
  );

  const tooltipLeft = selectedPoint
    ? `${(selectedPoint.x / GRAPH_WIDTH) * 100}%`
    : "0%";

  const tooltipTop = selectedPoint
    ? `${(selectedPoint.y / GRAPH_HEIGHT) * 100}%`
    : "0%";

  return (
    <section className="dashboard-two">

      {/* BOOKING OVERVIEW */}

      <div className="dashboard-panel overview-panel">

        <div className="panel-header">

          <div className="panel-title">
            <div className="panel-heading-icon overview-icon">
              <BarChart3 size={23} />
            </div>

            <h2>Booking Overview</h2>
          </div>

          <div className="panel-header-right">

            {liveConnected && (
              <div className="live-indicator connected">
                <span></span>
                LIVE
              </div>
            )}

            <div className="range-selector">
              <select
                value={range}
                onChange={(e) => {
                  setRange(e.target.value);
                  setActivePoint(null);
                }}
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>

              <ChevronDown size={15} />
            </div>

          </div>
        </div>

        {/* INTERACTIVE GRAPH */}

        <div
          className="booking-chart"
          onMouseMove={handleGraphMove}
          onMouseLeave={() => setActivePoint(null)}
        >

          <svg
            viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
            className="booking-svg"
            preserveAspectRatio="none"
          >

            <defs>
              <linearGradient
                id="booking-area-fill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#287ff0"
                  stopOpacity=".32"
                />

                <stop
                  offset="100%"
                  stopColor="#287ff0"
                  stopOpacity=".015"
                />
              </linearGradient>
            </defs>

            {/* GRID */}

            {Array.from({ length: 6 }).map((_, index) => {
              const y =
                GRAPH_HEIGHT -
                GRAPH_BOTTOM -
                (index / 5) *
                  (GRAPH_HEIGHT - GRAPH_BOTTOM - GRAPH_TOP);

              return (
                <g key={index}>
                  <line
                    x1={GRAPH_LEFT}
                    x2={GRAPH_WIDTH - GRAPH_RIGHT}
                    y1={y}
                    y2={y}
                    className="chart-grid-line"
                  />

                  <text
                    x="7"
                    y={y + 4}
                    className="chart-y-label"
                  >
                    {Math.round((index / 5) * graph.maxValue)}
                  </text>
                </g>
              );
            })}

            {/* GRAPH AREA */}

            <path
              d={graph.areaPath}
              fill="url(#booking-area-fill)"
              className="chart-area-fill"
            />

            {/* GRAPH LINE */}

            <path
              d={graph.linePath}
              className="chart-main-line"
            />

            {/* VERTICAL CURSOR */}

            {selectedPoint && (
              <line
                x1={selectedPoint.x}
                x2={selectedPoint.x}
                y1={GRAPH_TOP}
                y2={GRAPH_HEIGHT - GRAPH_BOTTOM}
                className="chart-cursor-line"
              />
            )}

            {/* POINTS */}

            {graph.points.map((point, index) => (
              <g key={`${point.label}-${index}`}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={activePoint === index ? 13 : 9}
                  className="chart-point-glow"
                />

                <circle
                  cx={point.x}
                  cy={point.y}
                  r={activePoint === index ? 6 : 4.5}
                  className={`chart-point ${
                    activePoint === index ? "point-active" : ""
                  }`}
                />
              </g>
            ))}

            {/* DATE LABELS */}

            {graph.points.map((point, index) => (
              <text
                key={index}
                x={point.x}
                y={GRAPH_HEIGHT - 8}
                textAnchor="middle"
                className="chart-x-label"
              >
                {point.label}
              </text>
            ))}

          </svg>

          {/* GRAPH TOOLTIP */}

          {selectedPoint && (
            <div
              className="graph-tooltip"
              style={{
                left: tooltipLeft,
                top: tooltipTop,
              }}
            >
              <span className="tooltip-date">
                {selectedPoint.label}
              </span>

              <strong>{selectedPoint.value}</strong>

              <small>Bookings</small>
            </div>
          )}

        </div>

        <div className="chart-footer">
          <span>
            <i></i>
            Booking Activity
          </span>

          <span>
            {lastUpdated
              ? `Updated ${lastUpdated.toLocaleTimeString("en-IN")}`
              : "Booking Activity"}
          </span>
        </div>

      </div>

      {/* BOOKING STATUS */}

      <div className="dashboard-panel status-panel">

        <div className="panel-header">

          <div className="panel-title">
            <div className="panel-heading-icon status-icon">
              <BedDouble size={23} />
            </div>

            <h2>Booking Status</h2>
          </div>

          {liveConnected && (
            <div className="live-indicator connected">
              <span></span>
              LIVE
            </div>
          )}

        </div>

        <div className="status-content">

          {/* SINGLE DONUT CIRCLE */}

          <div className="donut-wrapper">

            <div
              className="donut-chart"
              style={{
                background: donutBackground,
              }}
              onMouseLeave={() => setActiveStatus(null)}
            >

              <div className="donut-inner">

                {selectedStatus ? (
                  <>
                    <span className="center-caption">
                      {selectedStatus.label}
                    </span>

                    <strong className="center-value">
                      {selectedStatus.count}
                    </strong>

                    <span className="center-percentage">
                      {selectedStatus.percentage.toFixed(1)}%
                    </span>
                  </>
                ) : (
                  <>
                    <span className="center-caption">
                      Total Bookings
                    </span>

                    <strong className="center-value">
                      {totalBookings}
                    </strong>

                    <span className="center-percentage">
                      All Status
                    </span>
                  </>
                )}

              </div>

              {/* INVISIBLE INTERACTIVE DONUT SEGMENTS */}

              <svg
                className="donut-hover-layer"
                viewBox="0 0 200 200"
              >
                {(() => {
                  const radius = 76;
                  const circumference = 2 * Math.PI * radius;
                  let offset = 0;

                  return statusDetails.map((item) => {
                    const segmentLength =
                      (item.percentage / 100) * circumference;

                    const currentOffset = offset;
                    offset += segmentLength;

                    return (
                      <circle
                        key={item.key}
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke="transparent"
                        strokeWidth="30"
                        strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                        strokeDashoffset={-currentOffset}
                        transform="rotate(-90 100 100)"
                        className="donut-hover-segment"
                        onMouseEnter={() =>
                          setActiveStatus(item.key)
                        }
                      />
                    );
                  });
                })()}
              </svg>

            </div>
          </div>

          {/* STATUS LEGEND */}

          <div className="status-legend">

            {statusDetails.map((item) => (
              <div
                key={item.key}
                className={`status-item ${
                  activeStatus === item.key ? "status-active" : ""
                }`}
                onMouseEnter={() =>
                  setActiveStatus(item.key)
                }
                onMouseLeave={() =>
                  setActiveStatus(null)
                }
                tabIndex="0"
                role="button"
                onFocus={() => setActiveStatus(item.key)}
                onBlur={() => setActiveStatus(null)}
              >

                <span
                  className="status-dot"
                  style={{ background: item.color }}
                ></span>

                <span className="status-name">
                  {item.label}
                </span>

                <strong className="status-count">
                  {item.count}
                </strong>

                <span className="status-percentage">
                  {item.percentage.toFixed(1)}%
                </span>

                <div className="status-progress">
                  <span
                    style={{
                      width: `${item.percentage}%`,
                      background: item.color,
                    }}
                  ></span>
                </div>

              </div>
            ))}

          </div>

        </div>

        <div className="status-bottom-detail">

          {selectedStatus ? (
            <>
              <span
                className="detail-color"
                style={{ background: selectedStatus.color }}
              ></span>

              <span>{selectedStatus.label}</span>

              <strong>
                {selectedStatus.count} bookings
              </strong>

              <span>
                {selectedStatus.percentage.toFixed(1)}% of total
              </span>
            </>
          ) : (
            <span>Hover over any status to view details</span>
          )}

        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div className="dashboard-panel actions-panel">

        <div className="panel-header">

          <div className="panel-title">
            <div className="panel-heading-icon action-heading-icon">
              <span>ϟ</span>
            </div>

            <h2>Quick Actions</h2>
          </div>

        </div>

        <div className="quick-actions-grid">

          <button
            type="button"
            className="quick-action action-purple"
            onClick={onAddBooking}
          >
            <BedDouble size={28} />
            <span>Add Booking</span>
          </button>

          <button
            type="button"
            className="quick-action action-green"
            onClick={onAddGuest}
          >
            <UserRoundPlus size={28} />
            <span>Add Guest</span>
          </button>

          <button
            type="button"
            className="quick-action action-orange"
            onClick={onUploadGallery}
          >
            <ImageIcon size={28} />
            <span>Upload Gallery</span>
          </button>

          <button
            type="button"
            className="quick-action action-blue"
            onClick={onViewEnquiries}
          >
            <FileText size={28} />
            <span>View Enquiries</span>
          </button>

        </div>

      </div>

    </section>
  );
};

export default DashboardTwo;