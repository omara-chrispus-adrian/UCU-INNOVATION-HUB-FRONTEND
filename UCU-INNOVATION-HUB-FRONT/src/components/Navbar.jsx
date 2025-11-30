import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import '../styles/Navbar.css';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

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
