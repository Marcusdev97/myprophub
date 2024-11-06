// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './js/components/Layout';  // 导入 MainLayout
import HomePage from './js/pages/home';
import ServicesPage from './js/pages/services';
import Contact from './js/pages/contact';
import ProjectsPage from './js/pages/projects';
import PropertyDetails from './js/components/PropertyDetails';
import './index.css';
import './styles/main.scss';

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </MainLayout>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);