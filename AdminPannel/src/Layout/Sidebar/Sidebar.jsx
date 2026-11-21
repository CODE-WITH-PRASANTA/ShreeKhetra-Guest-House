import { useEffect, useState } from "react";
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
  Wallet,
  Star,
  TicketPercent,
  UserRound,
  Settings,
  LogOut,
  BedDouble,
  ClipboardList,
} from "lucide-react";

import logo from "../../assets/SriKshetra Residency 03.png";
import "./Sidebar.css";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    label: "Room Management",
    icon: BedDouble,
    children: [
      {
        label: "Add Rooms",
        icon: Hotel,
        path: "/admin/rooms/add",
      },
      {
        label: "Manage Rooms",
        icon: ClipboardList,
        path: "/admin/rooms/manage",
      },
    ],
  },
  {
    label: "Enquiry Management",
    icon: MessageSquareText,
    path: "/admin/enquiry",
  },
  {
    label: "Daily Booking Management",
    icon: CalendarCheck,
    path: "/admin/daily-booking",
  },
  {
    label: "Review Management",
    icon: Star,
    path: "/admin/reviews",
  },
  {
    label: "Blog Management",
    icon: BookOpen,
    children: [
      {
        label: "Add Blog",
        icon: FilePenLine,
        path: "/admin/blog/posting",
      },
      {
        label: "Manage Blog",
        icon: FolderKanban,
        path: "/admin/blog/management",
      },
    ],
  },
  {
    label: "Wallet Management",
    icon: Wallet,
    path: "/admin/wallet",
  },
  {
    label: "Gallery Management",
    icon: Images,
    path: "/admin/gallery",
  },
  {
    label: "Booking Management",
    icon: ClipboardList,
    path: "/admin/booking-management",
  },
  {
    label: "Discount Coupon",
    icon: TicketPercent,
    path: "/admin/discount-coupon",
  },
  {
    label: "Profile",
    icon: UserRound,
    path: "/admin/profile",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

const Sidebar = ({
  isCollapsed = false,
  isMobileOpen = false,
  onMobileClose = () => {},
  onProfileClick = () => {},
  onLogout = () => {},
  brandName = "Srikhetra Guest House",
  brandTagline = "ADMIN PANEL",
  version = "v2.5.0",
}) => {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();

  const getDropdownForPath = (pathname) => {
    if (pathname.startsWith("/admin/rooms")) return "Room Management";
    if (pathname.startsWith("/admin/blog")) return "Blog Management";
    return null;
  };

  const [openDropdown, setOpenDropdown] = useState(() =>
    getDropdownForPath(currentPath)
  );

  useEffect(() => {
    setOpenDropdown(getDropdownForPath(currentPath));
  }, [currentPath]);

  const isPathActive = (path) => {
    const normalizedPath = path.toLowerCase();
    return (
      currentPath === normalizedPath ||
      currentPath.startsWith(`${normalizedPath}/`)
    );
  };

  const isItemActive = (item) => {
    if (item.children) {
      return item.children.some((child) => isPathActive(child.path));
    }
    return isPathActive(item.path);
  };

  const handleLinkClick = (callback) => (event) => {
    callback?.(event);
    if (window.innerWidth <= 992) onMobileClose();
  };

  const toggleDropdown = (label) => {
    setOpenDropdown((previous) => (previous === label ? null : label));
  };

  const handleProfileClick = (event) => {
    onProfileClick?.(event);
    if (window.innerWidth <= 992) onMobileClose();
  };

  return (
    <>
      <div
        className={`HealthySidebar-backdrop ${isMobileOpen ? "is-visible" : ""}`}
        onClick={onMobileClose}
        aria-hidden="true"
      />

      <aside
        className={`HealthySidebar ${isCollapsed ? "is-collapsed" : ""} ${
          isMobileOpen ? "is-mobile-open" : ""
        }`}
        aria-label="Main Sidebar"
      >
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

          <button
            type="button"
            className="HealthySidebar-mobile-close"
            onClick={onMobileClose}
            aria-label="Close sidebar"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* MAIN NAVIGATION */}
        <nav className="HealthySidebar-nav" aria-label="Main Navigation">
          <div className="HealthySidebar-section-title">MAIN MENU</div>

          <div className="HealthySidebar-nav-list">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isItemActive(item);
              const isOpen = openDropdown === item.label;

              if (item.children) {
                return (
                  <div
                    key={item.label}
                    className={`HealthySidebar-group ${active ? "is-active" : ""}`}
                  >
                    <button
                      type="button"
                      className={`HealthySidebar-link HealthySidebar-dropdown-toggle ${
                        active ? "active" : ""
                      }`}
                      onClick={() => toggleDropdown(item.label)}
                      title={isCollapsed ? item.label : undefined}
                      aria-expanded={isOpen}
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
                            isOpen ? "is-open" : ""
                          }`}
                        />
                      )}
                    </button>

                    {isOpen && !isCollapsed && (
                      <div className="HealthySidebar-submenu">
                        {item.children.map((child) => {
                          const ChildIcon = child.icon;

                          return (
                            <NavLink
                              key={child.path}
                              to={child.path}
                              end
                              className={({ isActive: childActive }) =>
                                `HealthySidebar-sublink ${
                                  childActive ? "active" : ""
                                }`
                              }
                              onClick={handleLinkClick()}
                            >
                              <span className="HealthySidebar-subicon">
                                <ChildIcon size={17} strokeWidth={2} />
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

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `HealthySidebar-link ${isActive ? "active" : ""}`
                  }
                  onClick={handleLinkClick()}
                  title={isCollapsed ? item.label : undefined}
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
            <span className="HealthySidebar-footer-version">{version}</span>
            <span className="HealthySidebar-footer-caption">
              Guest House Administration
            </span>

            <button
              type="button"
              className="HealthySidebar-logout-btn"
              onClick={handleLinkClick(onLogout)}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
