
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

import "./MainLayout.css";

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // SIDEBAR TOGGLE

  const toggleSidebar = () => {
    if (window.innerWidth <= 992) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  };

  // CLOSE MOBILE SIDEBAR

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return (
    <div
      className={`MainLayout ${
        isCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      {/* SIDEBAR */}

      <Sidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onToggleCollapse={toggleSidebar}
        onMobileClose={closeMobileSidebar}
      />

      {/* MAIN CONTAINER */}

      <div className="MainLayout-container">

        {/* TOPBAR */}

        <Topbar toggleSidebar={toggleSidebar} />

        {/* PAGE CONTENT */}

        <main className="MainLayout-content">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MainLayout;
