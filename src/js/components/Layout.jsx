// src/js/components/layout/Layout.jsx
import React from 'react';
import Navigation from './navigation';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="layout__footer">
      <div className="footer__content">
        <p>© {currentYear} MyPropHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

const MainLayout = ({ children }) => {
  return (
    <div className="layout">
      <header className="layout__header">
        <div className="layout__container">
          <Navigation />
        </div>
      </header>

      <main className="layout__main">
        <div className="layout__container">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Container = ({ 
  children, 
  size = "default",
  className = "" 
}) => {
  const containerClasses = {
    narrow: "layout__container max-w-3xl",
    default: "layout__container max-w-5xl",
    wide: "layout__container max-w-7xl"
  };

  return (
    <div className={`${containerClasses[size]} ${className}`.trim()}>
      {children}
    </div>
  );
};

const Section = ({ 
  children, 
  spacing = "default",
  className = "" 
}) => {
  const spacingClasses = {
    small: "py-4 md:py-6",
    default: "py-6 md:py-8",
    large: "py-8 md:py-12"
  };

  return (
    <section className={`w-full ${spacingClasses[spacing]} ${className}`.trim()}>
      {children}
    </section>
  );
};

const Grid = ({
  children,
  cols = {
    default: 1,
    sm: 2,
    lg: 3
  },
  gap = "default",
  className = ""
}) => {
  const getColsClass = () => {
    return `grid-cols-${cols.default} ${cols.sm ? `sm:grid-cols-${cols.sm}` : ''} ${cols.lg ? `lg:grid-cols-${cols.lg}` : ''}`;
  };

  const gapClasses = {
    small: "gap-2 md:gap-3",
    default: "gap-3 md:gap-4",
    large: "gap-4 md:gap-6"
  };

  return (
    <div className={`grid ${getColsClass()} ${gapClasses[gap]} ${className}`.trim()}>
      {children}
    </div>
  );
};

export {
  MainLayout as default,
  Container,
  Section,
  Grid
};