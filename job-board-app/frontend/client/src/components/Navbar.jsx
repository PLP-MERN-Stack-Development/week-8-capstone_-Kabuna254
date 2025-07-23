import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { authService } from "../api/authService";

const Navbar = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference
    return localStorage.getItem('darkMode') === 'true' || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches && 
            localStorage.getItem('darkMode') !== 'false');
  });

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    try {
      await authService.deleteAccount();
      alert("Account deleted successfully");
      navigate("/register");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again.");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="navbar">
      <div className="flex items-center w-full">
        <Link to="/" className="navbar-brand">JobBoard</Link>
        
        {/* Mobile menu button */}
        <button 
          className="nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
        {user?.role === 'employer' && (
          <Link 
            to="/create-job" 
            className="nav-link nav-link-post"
            onClick={() => setMobileMenuOpen(false)}
          >
            Post a Job
          </Link>
        )}
        
        <Link 
          to="/jobBrowser" 
          className="nav-link"
          onClick={() => setMobileMenuOpen(false)}
        >
          Browse Jobs
        </Link>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="nav-button nav-button-darkmode"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        {user ? (
          <>
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="nav-button nav-button-logout"
            >
              Logout
            </button>
            <button
              onClick={() => {
                handleDeleteAccount();
                setMobileMenuOpen(false);
              }}
              className="nav-button nav-button-delete"
            >
              Delete Account
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="nav-button nav-button-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;