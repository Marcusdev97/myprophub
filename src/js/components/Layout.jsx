// src/js/components/Layout.jsx
import React from 'react';
import Navigation from './navigation';

const Container = ({ 
  children, 
  size = "default",
  className = "" 
}) => {
  const containerClasses = {
    narrow: "w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8",
    default: "w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",
    wide: "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-[1440px]",
    // 新增 fullWidth 选项，用于 Projects 页面
    fullWidth: "w-full px-4 sm:px-6 lg:px-8 xl:px-12"
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
    small: "py-4 md:py-6 lg:py-8",
    default: "py-6 md:py-8 lg:py-12",
    large: "py-8 md:py-12 lg:py-16"
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
    lg: 3,
    xl: 4  // 新增 xl 断点支持
  },
  gap = "default",
  className = ""
}) => {
  const getColsClass = () => {
    const baseClass = `grid-cols-${cols.default}`;
    const smClass = cols.sm ? `sm:grid-cols-${cols.sm}` : '';
    const lgClass = cols.lg ? `lg:grid-cols-${cols.lg}` : '';
    const xlClass = cols.xl ? `xl:grid-cols-${cols.xl}` : '';
    return `${baseClass} ${smClass} ${lgClass} ${xlClass}`;
  };

  const gapClasses = {
    small: "gap-4 sm:gap-6",
    default: "gap-6 sm:gap-8 lg:gap-10",
    large: "gap-8 sm:gap-10 lg:gap-12"
  };

  return (
    <div className={`grid ${getColsClass()} ${gapClasses[gap]} ${className}`.trim()}>
      {children}
    </div>
  );
};

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100">
        <Container size="fullWidth">
          <Navigation />
        </Container>
      </header>

      <main className="flex-1 pt-[--header-height] min-h-[calc(100vh-var(--header-height)-var(--footer-height))]">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100">
        <Container size="fullWidth">
          <div className="py-4 text-center text-gray-600">
            <p>© {new Date().getFullYear()} MyPropHub. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export {
  MainLayout as default,
  Container,
  Section,
  Grid
};