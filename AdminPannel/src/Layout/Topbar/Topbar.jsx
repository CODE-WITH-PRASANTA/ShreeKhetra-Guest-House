import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, ChevronDown, Bell, Search, User, LogOut, Shield } from 'lucide-react';
import './Topbar.css';

const AUTH_KEY = 'isAdminAuthenticated';

const Topbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Logout Handler
  const handleLogout = (e) => {
    e.stopPropagation();
    sessionStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_KEY);
    setDropdownOpen(false);
    navigate('/login', { replace: true });
  };

  // Format path breadcrumb dynamically
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentPath =
    pathSegments.length > 0
      ? pathSegments[pathSegments.length - 1].replace(/-/g, ' ')
      : 'Dashboard';
  const parentPath =
    pathSegments.length > 1 ? pathSegments[0].toUpperCase() : 'ADMIN';

  return (
    <header className="Topbar">
      <div className="Topbar-left">
        <button
          className="Topbar-toggle-btn"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="Topbar-path">
          <span className="Topbar-path-parent">{parentPath}</span>
          <span className="Topbar-path-separator">/</span>
          <span className="Topbar-path-current">{currentPath}</span>
        </div>
      </div>

      <div className="Topbar-right">
        {/* Search Bar */}
        <div className="Topbar-search-box">
          <Search size={16} className="Topbar-search-icon" />
          <input
            type="text"
            placeholder="Search bookings, enquiries..."
            className="Topbar-search-input"
          />
          <kbd className="Topbar-search-shortcut">⌘K</kbd>
        </div>

        {/* Notifications */}
        <div className="Topbar-action-wrapper" ref={dropdownRef}>
          <button
            className={`Topbar-action-btn ${notificationsOpen ? 'active' : ''}`}
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setDropdownOpen(false);
            }}
            aria-label="Notifications"
          >
            <Bell size={19} />
            <span className="Topbar-badge">2</span>
          </button>

          {notificationsOpen && (
            <div className="Topbar-dropdown Topbar-notifications-dropdown">
              <div className="Topbar-dropdown-header">
                <span className="Topbar-dropdown-title">Notifications</span>
                <span className="Topbar-dropdown-badge">2 New</span>
              </div>
              <div className="Topbar-notification-list">
                <div className="Topbar-notification-item unread">
                  <div className="Topbar-notification-dot" />
                  <div>
                    <p className="Topbar-notification-text">
                      New room booking request received.
                    </p>
                    <span className="Topbar-notification-time">5 mins ago</span>
                  </div>
                </div>
                <div className="Topbar-notification-item unread">
                  <div className="Topbar-notification-dot" />
                  <div>
                    <p className="Topbar-notification-text">
                      New guest enquiry awaiting reply.
                    </p>
                    <span className="Topbar-notification-time">20 mins ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Profile Menu */}
          <div
            className={`Topbar-user ${dropdownOpen ? 'active' : ''}`}
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
              setNotificationsOpen(false);
            }}
          >
            <div className="Topbar-avatar-wrapper">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Admin Avatar"
                className="Topbar-avatar"
              />
              <span className="Topbar-status-indicator" />
            </div>

            <div className="Topbar-user-info">
              <span className="Topbar-username">Shree</span>
              <span className="Topbar-role">Administrator</span>
            </div>

            <ChevronDown
              size={15}
              className={`Topbar-chevron ${dropdownOpen ? 'open' : ''}`}
            />

            {dropdownOpen && (
              <div
                className="Topbar-dropdown Topbar-user-dropdown"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="Topbar-user-card">
                  <p className="Topbar-card-name">Shree</p>
                  <p className="Topbar-card-email">admin@shreekhetraguesthouse.com</p>
                </div>
                <div className="Topbar-dropdown-divider" />
                <Link
                  to="/admin/dashboard"
                  className="Topbar-dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  <User size={16} /> Dashboard
                </Link>
                <Link
                  to="/admin/hotel-booking"
                  className="Topbar-dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  <Shield size={16} /> Hotel Bookings
                </Link>
                <div className="Topbar-dropdown-divider" />
                <button
                  type="button"
                  onClick={handleLogout}
                  className="Topbar-dropdown-item logout"
                >
                  <LogOut size={16} /> Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;