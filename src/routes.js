// src/routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './App'; // Ensure this points to the real Home component, not the wrapper App
import Events from './Pages/Gallery/Gallery';
import Projects from './Pages/Projects/Projects';
import Team from './Pages/Team/Team';
import About from './Pages/About/About';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/team" element={<Team />} />
      <Route path="/about-details" element={<About />} />
    </Routes>
  );
};

export default AppRoutes;