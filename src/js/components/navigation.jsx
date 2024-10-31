import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname.replace('#', '');

  return (
    <nav className="nav">
      <div className="nav__container">
        <div className="nav__content">
          {/* Logo */}
          <div className="nav__logo-wrapper">
            <Link to="/" className="nav__logo">MyPropHub</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="nav__menu">
            <Link
              to="/"
              className={`nav__link ${currentPath === '/' ? 'nav__link--active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/projects"
              className={`nav__link ${currentPath === '/projects' ? 'nav__link--active' : ''}`}
            >
              New Projects
            </Link>
            <Link
              to="/services"
              className={`nav__link ${currentPath === '/services' ? 'nav__link--active' : ''}`}
            >
              Our Services
            </Link>
            <Link
              to="/contact"
              className={`nav__link ${currentPath === '/contact' ? 'nav__link--active' : ''}`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="nav__mobile-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="nav__mobile-icon" /> : <Menu className="nav__mobile-icon" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="nav__mobile-menu">
            <div className="nav__mobile-menu-content">
              <Link
                to="/"
                className="nav__mobile-menu-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/projects"
                className="nav__mobile-menu-link"
                onClick={() => setIsMenuOpen(false)}
              >
                New Projects
              </Link>
              <Link
                to="/services"
                className="nav__mobile-menu-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Services
              </Link>
              <Link
                to="/contact"
                className="nav__mobile-menu-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;