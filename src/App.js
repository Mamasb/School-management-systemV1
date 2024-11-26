import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/landingpage';
import RegistrationForm from './pages/Registration/RegistrationForm';
import LoginForm from './pages/Registration/LoginForm';
import ServicesPage from './pages/Registration/ServicesPage';
import BabyClassServices from './pages/Registration/BabyClassServices';  // Baby Class service page
import PPServices from './pages/Registration/ServicesPage';  // PP1 & PP2 service page
import BookInterview from './pages/Registration/BookInterview';  // Grades 1-9 interview page
import './App.css';

import AppBar from './components/AppBar/AppBar';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userFullName, setUserFullName] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const name = localStorage.getItem('fullName');
    if (name) {
      setUserFullName(name);
    } else {
      setUserFullName('Guest'); // Fallback to "Guest" if no name is found
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <AppBar toggleSidebar={toggleSidebar} />

        <div className="main-content">
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            userFullName={userFullName}
          />

          <div className="content-area">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/services" element={<ServicesPage userFullName={userFullName} />} />
              <Route path="/baby-class-services" element={<BabyClassServices />} />
              <Route path="/pp-services" element={<PPServices />} />
              <Route path="/book-interview" element={<BookInterview />} />
            </Routes>
          </div>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
