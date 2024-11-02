// src/js/pages/home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="content-container">
          <div className="hero__content">
            <h1 className="hero__title">
              Find Your Dream Home in Malaysia
            </h1>
            <p className="hero__subtitle">
              Your trusted partner in finding the perfect property
            </p>
            <Link to="/projects" className="hero__cta">
              Explore Properties
              <ArrowRight className="hero__cta-icon" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="content-container">
          <div className="cta__content">
            <span className="cta__label">GET STARTED</span>
            <h2 className="cta__title">Ready to find your perfect home?</h2>
            <Link to="/contact" className="cta__button">
              Contact Us
              <ArrowRight className="cta__button-icon" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;