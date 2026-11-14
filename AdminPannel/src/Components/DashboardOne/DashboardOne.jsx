import React, { useEffect, useState } from "react";
import {
  BedDouble,
  Users,
  IndianRupee,
  Mail,
  Star,
  CalendarDays,
  TrendingUp,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";

import "./DashboardOne.css";

const initialStats = [
  {
    id: 1,
    title: "Total Bookings",
    value: 48,
    growth: "+12%",
    icon: BedDouble,
    color: "blue",
    chart: "10,45 25,40 40,42 55,30 70,35 85,19 100,12",
    description: "Compared to last month",
  },
  {
    id: 2,
    title: "Total Guests",
    value: 112,
    growth: "+18%",
    icon: Users,
    color: "green",
    chart: "10,48 25,42 40,44 55,32 70,28 85,15 100,8",
    description: "Compared to last month",
  },
  {
    id: 3,
    title: "Total Revenue",
    value: 124500,
    prefix: "₹",
    growth: "+25%",
    icon: IndianRupee,
    color: "orange",
    chart: "10,48 25,38 40,42 55,26 70,30 85,12 100,5",
    description: "Compared to last month",
  },
  {
    id: 4,
    title: "New Enquiries",
    value: 26,
    growth: "+8%",
    icon: Mail,
    color: "purple",
    chart: "10,47 25,43 40,44 55,35 70,32 85,18 100,10",
    description: "Compared to last month",
  },
  {
    id: 5,
    title: "Guest Rating",
    value: 4.8,
    growth: "+8%",
    icon: Star,
    color: "pink",
    chart: "10,45 25,40 40,38 55,30 70,24 85,18 100,8",
    description: "320 Reviews",
    decimals: 1,
  },
];

const AnimatedNumber = ({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        start = value;
        clearInterval(timer);
      }

      setDisplay(start);
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <>
      {prefix}
      {decimals
        ? display.toFixed(decimals)
        : Math.floor(display).toLocaleString("en-IN")}
      {suffix}
    </>
  );
};

const DashboardOne = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );

  return (
    <section className="dashboard-one">

      <div className="dashboard-header">
        <div className="welcome-content">
          <h1>
            Welcome Back, <span>Jane Doe</span>
            <span className="wave">👋</span>
          </h1>

          <p>
            Here's what's happening at{" "}
            <strong>Shrikhetra Residency</strong> today.
          </p>
        </div>

        <div className="header-actions">
          <div className="date-selector">
            <CalendarDays size={17} />

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              aria-label="Select dashboard date"
            />

            <ChevronDown size={15} className="date-chevron" />
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {initialStats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              className={`stat-card ${stat.color}`}
              key={stat.id}
              style={{ "--card-index": index }}
            >
              <div className="card-top">
                <div className="stat-icon">
                  <Icon size={19} strokeWidth={2.3} />
                </div>

                <div className="growth-badge">
                  <TrendingUp size={12} />
                  {stat.growth}
                </div>
              </div>

              <div className="stat-content">
                <p className="stat-title">{stat.title}</p>

                <h3 className="stat-value">
                  <AnimatedNumber
                    value={stat.value}
                    prefix={stat.prefix || ""}
                    suffix={stat.suffix || ""}
                    decimals={stat.decimals || 0}
                  />
                </h3>

                <div className="stat-footer">
                  <span>{stat.description}</span>

                  {stat.id !== 5 && (
                    <ArrowUpRight size={14} />
                  )}
                </div>
              </div>

              <div className="chart-area">
                <svg
                  viewBox="0 0 110 55"
                  preserveAspectRatio="none"
                  className="sparkline"
                >
                  <defs>
                    <linearGradient
                      id={`gradient-${stat.id}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        className="chart-gradient-start"
                      />
                      <stop
                        offset="100%"
                        className="chart-gradient-end"
                      />
                    </linearGradient>
                  </defs>

                  <polygon
                    points={`0,55 ${stat.chart} 110,55`}
                    fill={`url(#gradient-${stat.id})`}
                  />

                  <polyline
                    points={stat.chart}
                    className="chart-line"
                  />
                </svg>
              </div>

              <div className="card-shine"></div>
            </div>
          );
        })}
      </div>

    </section>
  );
};

export default DashboardOne;