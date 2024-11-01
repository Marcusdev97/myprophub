// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navigation from './js/components/navigation';
import ServicesPage from './js/pages/services';
import Contact from './js/pages/contact';
import ProjectsPage from './js/pages/projects';
import './index.css';
import './styles/main.scss';

// 将 Home 组件分离出来
const Home = () => {
  return (
    <div className="content-container">
      <div className="home-content">
        <p className="text-xl text-gray-600">Welcome to MyPropHub!</p>
      </div>
    </div>
  );
};

// 将 App 组件分离出来
const App = () => {
  return (
    <div className="page-container">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
};

// 使用这种方式渲染
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);