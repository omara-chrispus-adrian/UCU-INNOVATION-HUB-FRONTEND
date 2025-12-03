import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import ThemeToggle from './ThemeToggle';
import '../styles/Navbar.css';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const { notifications, removeNotification, clearAll } = useNotification();
    const navigate = useNavigate();
    const location = useLocation();
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Check if on dashboard page
    const isDashboard = location.pathname.includes('/dashboard/');

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowNotificationDropdown(false);
            }
        };

        if (showNotificationDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [showNotificationDropdown]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getDashboardLink = () => {
        if (!user) return '/';
        switch (user.role) {
            case 'student':
                return '/dashboard/student';
            case 'supervisor':
                return '/dashboard/supervisor';
            case 'admin':
                return '/dashboard/admin';
            default:
                return '/';
        }
    };

    return (
        <nav className="navbar glass">
            <div className="container-custom">
                <div className="navbar-content">
                    {/* Logo */}
                    <Link to="/" className="navbar-logo">
                        <div className="logo-icon">
                            <span>U</span>
                        </div>
                        <span className="logo-text gradient-text">
                            UCU Innovators Hub
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="navbar-links">
                        <Link to="/" className="nav-link">
                            Gallery
                        </Link>

                        {/* Notification Icon - Only on Dashboards */}
                        {isAuthenticated && isDashboard && (
                            <div className="notification-icon-container" ref={dropdownRef}>
                                <button 
                                    className="notification-bell" 
                                    title="Notifications"
                                    onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                    </svg>
                                    {notifications.length > 0 && (
                                        <span className="notification-badge">
                                            {notifications.length > 99 ? '99+' : notifications.length}
                                        </span>
                                    )}
                                </button>

                                {/* Notification Dropdown */}
                                {showNotificationDropdown && (
                                    <div className="notification-dropdown">
                                        <div className="notification-dropdown-header">
                                            <h3>Notifications</h3>
                                            {notifications.length > 0 && (
                                                <button 
                                                    className="clear-all-btn"
                                                    onClick={() => {
                                                        clearAll();
                                                        setShowNotificationDropdown(false);
                                                    }}
                                                >
                                                    Clear All
                                                </button>
                                            )}
                                        </div>

                                        <div className="notification-dropdown-list">
                                            {notifications.length === 0 ? (
                                                <div className="no-notifications">
                                                    <p>No notifications yet</p>
                                                </div>
                                            ) : (
                                                notifications.map((notification) => (
                                                    <div 
                                                        key={notification.id} 
                                                        className={`notification-dropdown-item notification-${notification.type}`}
                                                    >
                                                        <div className="notification-item-icon">
                                                            {notification.type === 'success' && '✓'}
                                                            {notification.type === 'error' && '✕'}
                                                            {notification.type === 'warning' && '⚠'}
                                                            {notification.type === 'info' && 'ℹ'}
                                                        </div>
                                                        <div className="notification-item-content">
                                                            {notification.title && (
                                                                <div className="notification-item-title">
                                                                    {notification.title}
                                                                </div>
                                                            )}
                                                            <div className="notification-item-message">
                                                                {notification.message}
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="notification-item-close"
                                                            onClick={() => removeNotification(notification.id)}
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {isAuthenticated ? (
                            <>
                                <Link to={getDashboardLink()} className="nav-link">
                                    Dashboard
                                </Link>
                                <div className="user-info">
                                    <div className="user-details">
                                        <span className="user-name">{user?.full_name || user?.email}</span>
                                        <span className="user-role">{user?.role}</span>
                                    </div>
                                    <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="auth-buttons">
                                <Link to="/login">
                                    <button className="btn btn-secondary btn-sm">Login</button>
                                </Link>
                                <Link to="/register">
                                    <button className="btn btn-primary btn-sm">Register</button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
