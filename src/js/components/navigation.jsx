import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'New Projects' },
    { path: '/services', label: 'Our Services' },
    { path: '/contact', label: 'Contact Us' }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleMobileMenuClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav className={`nav ${isScrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__container">
          <div className="nav__content">
            {/* Logo */}
            <div className="nav__logo-wrapper">
              <Link to="/" className="nav__logo">MyPropHub</Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="nav__menu">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`nav__link ${currentPath === path ? 'nav__link--active' : ''}`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="nav__mobile-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? 
                <X className="nav__icon" /> : 
                <Menu className="nav__icon" />
              }
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
          <div 
          className={`nav__mobile-overlay ${isMenuOpen ? 'active' : ''}`}
          onClick={handleMobileMenuClick}
          >
            <div className="nav__mobile-menu" onClick={e => e.stopPropagation()}>
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`nav__mobile-link ${currentPath === path ? 'nav__mobile-link--active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;