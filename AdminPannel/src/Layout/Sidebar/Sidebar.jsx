
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  BookOpen,
  Images,
  CalendarCheck,
  MessageSquareText,
  Hotel,
  ChevronDown,
  X,
  FilePenLine,
  FolderKanban,
  Leaf,
} from "lucide-react";

import logo from "../../assets/SriKshetra Residency 03.png";
import "./Sidebar.css";

// =========================================================
// NAVIGATION ITEMS
// =========================================================

export const NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    label: "Blog",
    icon: BookOpen,
    path: "/admin/blog",
    children: [
      {
        label: "Blog Posting",
        icon: FilePenLine,
        path: "/admin/blog/posting",
      },
      {
        label: "Blog Management",
        icon: FolderKanban,
        path: "/admin/blog/management",
      },
    ],
  },
  {
    label: "Gallery",
    icon: Images,
    path: "/admin/gallery",
  },
  {
    label: "Explores",
    icon: Leaf,
    path: "/admin/explores",
  },
  {
    label: "Tour Booking",
    icon: CalendarCheck,
    path: "/admin/tour-booking",
  },
  {
    label: "Hotel Booking",
    icon: Hotel,
    path: "/admin/hotel-booking",
  },
  {
    label: "Enquiry",
    icon: MessageSquareText,
    path: "/admin/enquiry",
  },
];

// =========================================================
// SIDEBAR COMPONENT
// =========================================================

const Sidebar = ({
  isCollapsed = false,
  isMobileOpen = false,
  onMobileClose = () => {},
  onProfileClick = () => {},
  onLogout = () => {},
  brandName = "Srikhetra Guest House",
  brandTagline = "ADMIN PANEL",

  user = {
    name: "Admin",
    role: "Super Administrator",
    initials: "AD",
    avatarUrl: "",
  },

  version = "v2.5.0",
}) => {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();

  // =======================================================
  // BLOG DROPDOWN
  // =======================================================

  const [blogOpen, setBlogOpen] = useState(
    currentPath.startsWith("/admin/blog")
  );

  // Automatically open Blog dropdown when a blog page is active.
  useEffect(() => {
    if (currentPath.startsWith("/admin/blog")) {
      setBlogOpen(true);
    }
  }, [currentPath]);

  // =======================================================
  // ACTIVE PATH CHECK
  // =======================================================

  const isPathActive = (path) => {
    const normalizedPath = path.toLowerCase();

    return (
      currentPath === normalizedPath ||
      currentPath.startsWith(`${normalizedPath}/`)
    );
  };

  // =======================================================
  // ACTIVE MENU CHECK
  // =======================================================

  const isItemActive = (item) => {
    if (item.children) {
      return item.children.some((child) =>
        isPathActive(child.path)
      );
    }

    return isPathActive(item.path);
  };

  // =======================================================
  // CLOSE MOBILE SIDEBAR
  // =======================================================

  const handleLinkClick = (callback) => (event) => {
    if (callback) {
      callback(event);
    }

    if (window.innerWidth <= 992) {
      onMobileClose();
    }
  };

  // =======================================================
  // BLOG DROPDOWN TOGGLE
  // =======================================================

  const handleBlogToggle = () => {
    setBlogOpen((previous) => !previous);
  };

  // =======================================================
  // PROFILE CLICK
  // =======================================================

  const handleProfileClick = (event) => {
    if (onProfileClick) {
      onProfileClick(event);
    }

    if (window.innerWidth <= 992) {
      onMobileClose();
    }
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <>
      {/* MOBILE BACKDROP */}

      <div
        className={`HealthySidebar-backdrop ${
          isMobileOpen ? "is-visible" : ""
        }`}
        onClick={onMobileClose}
        aria-hidden="true"
      />

      {/* SIDEBAR */}

      <aside
        className={`HealthySidebar ${
          isCollapsed ? "is-collapsed" : ""
        } ${
          isMobileOpen ? "is-mobile-open" : ""
        }`}
        aria-label="Admin Sidebar"
      >
        {/* DECORATIVE BACKGROUND */}

        <div className="HealthySidebar-glow HealthySidebar-glow-top" />
        <div className="HealthySidebar-glow HealthySidebar-glow-bottom" />

        {/* BRAND HEADER */}

        <div className="HealthySidebar-header">
          <div className="HealthySidebar-brand">
            <div className="HealthySidebar-logo-ring">
              <img
                src={logo}
                alt={`${brandName} Logo`}
                className="HealthySidebar-logo"
              />
            </div>

            <div className="HealthySidebar-brand-meta">
              <h2>{brandName}</h2>
              <span>{brandTagline}</span>
            </div>
          </div>

          {/* MOBILE CLOSE */}

          <button
            type="button"
            className="HealthySidebar-mobile-close"
            onClick={onMobileClose}
            aria-label="Close sidebar"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* ADMIN PROFILE */}

        <div
          className="HealthySidebar-profile-card"
          role="button"
          tabIndex={0}
          onClick={handleProfileClick}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              handleProfileClick(event);
            }
          }}
          title={
            isCollapsed
              ? `${user.name} (${user.role})`
              : undefined
          }
        >
          <div className="HealthySidebar-avatar-wrap">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="HealthySidebar-avatar-img"
              />
            ) : (
              <div className="HealthySidebar-avatar-fallback">
                {user.initials ||
                  user.name
                    ?.split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
              </div>
            )}

            <span className="HealthySidebar-status-beacon" />
          </div>

          <div className="HealthySidebar-profile-details">
            <span className="HealthySidebar-profile-name">
              {user.name}
            </span>

            <span className="HealthySidebar-profile-role">
              {user.role}
            </span>
          </div>
        </div>

        {/* MAIN NAVIGATION */}

        <nav
          className="HealthySidebar-nav"
          aria-label="Main Navigation"
        >
          {!isCollapsed && (
            <div className="HealthySidebar-nav-heading">
              MAIN MENU
            </div>
          )}

          <div className="HealthySidebar-nav-list">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isItemActive(item);

              // BLOG DROPDOWN

              if (item.children) {
                return (
                  <div
                    key={item.label}
                    className={`HealthySidebar-group ${
                      active ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className={`HealthySidebar-link HealthySidebar-dropdown-toggle ${
                        active ? "active" : ""
                      }`}
                      onClick={handleBlogToggle}
                      title={
                        isCollapsed ? item.label : undefined
                      }
                      aria-expanded={blogOpen}
                    >
                      <span className="HealthySidebar-icon-box">
                        <Icon size={20} strokeWidth={2.2} />
                      </span>

                      <span className="HealthySidebar-link-title">
                        {item.label}
                      </span>

                      {!isCollapsed && (
                        <ChevronDown
                          size={17}
                          className={`HealthySidebar-chevron ${
                            blogOpen ? "is-open" : ""
                          }`}
                        />
                      )}
                    </button>

                    {/* BLOG SUBMENU */}

                    {blogOpen && !isCollapsed && (
                      <div className="HealthySidebar-submenu">
                        {item.children.map((child) => {
                          const ChildIcon = child.icon;

                          return (
                            <NavLink
                              key={child.path}
                              to={child.path}
                              className={({ isActive }) =>
                                `HealthySidebar-sublink ${
                                  isActive ? "active" : ""
                                }`
                              }
                              end
                              onClick={handleLinkClick()}
                            >
                              <span className="HealthySidebar-subicon">
                                <ChildIcon
                                  size={17}
                                  strokeWidth={2}
                                />
                              </span>

                              <span className="HealthySidebar-link-title">
                                {child.label}
                              </span>
                            </NavLink>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // NORMAL NAVIGATION

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `HealthySidebar-link ${
                      isActive ? "active" : ""
                    }`
                  }
                  onClick={handleLinkClick()}
                  title={
                    isCollapsed ? item.label : undefined
                  }
                >
                  <span className="HealthySidebar-icon-box">
                    <Icon size={20} strokeWidth={2.2} />
                  </span>

                  <span className="HealthySidebar-link-title">
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* SIDEBAR FOOTER */}

        {!isCollapsed && (
          <div className="HealthySidebar-footer">
            <span className="HealthySidebar-footer-version">
              {version}
            </span>

            <span className="HealthySidebar-footer-caption">
              Admin Dashboard
            </span>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
