// src/js/pages/home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-grid">
        <div className="hero">
          <div className="hero__content">
            <h1 className="hero__title">
              Build your Brickz
            </h1>
            <p className="hero__subtitle">
              Crafting Spaces
            </p>
            <Link to="/projects" className="hero__search">
              <Search className="hero__search-icon" />
              <span>Explore Properties</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;