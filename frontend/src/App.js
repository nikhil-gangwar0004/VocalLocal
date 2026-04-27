import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ServicesPage from './pages/ServicesPage';
import ProfilePage from './pages/ProfilePage';
import BookingPage from './pages/BookingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProfessionalDetailPage from './pages/ProfessionalDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminDashboard from './pages/AdminDashboard';
import ProfessionalOnboarding from './pages/ProfessionalOnboarding';
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import ForgotPassword from './pages/ForgotPassword'; // ✅ Added
import './output.css';

function App() {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(() => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('userData');
      if (token && userData) {
        return JSON.parse(userData);
      }
      return null;
    } catch (e) {
      return null;
    }
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    if (userData.token) {
      localStorage.setItem('token', userData.token);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="App overflow-x-hidden">
        <AnimatePresence>
          {loading ? (
            <Loader key="loader" finishLoading={() => setLoading(false)} />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Navbar user={user} onLogout={handleLogout} />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home user={user} />} />
                <Route path="/services" element={<ServicesPage user={user} />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/professional/:id" element={<ProfessionalDetailPage user={user} />} />

                {/* Admin Route */}
                <Route
                  path="/admin"
                  element={
                    user && user.email === 'gangwarn411@gmail.com'
                      ? <AdminDashboard />
                      : <Navigate to="/" replace />
                  }
                />

                {/* Expert Dashboard */}
                <Route
                  path="/expert-panel"
                  element={
                    user && user.role === 'professional'
                      ? <ProfessionalDashboard user={user} />
                      : <Navigate to="/" replace />
                  }
                />

                {/* Become Expert */}
                <Route
                  path="/become-expert"
                  element={user ? <ProfessionalOnboarding user={user} /> : <Navigate to="/login" />}
                />

                {/* Auth Routes */}
                <Route
                  path="/login"
                  element={user ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />}
                />
                <Route
                  path="/signup"
                  element={user ? <Navigate to="/" /> : <SignupPage onLogin={handleLogin} />}
                />

                {/* ✅ Forgot Password Route */}
                <Route
                  path="/forgot-password"
                  element={user ? <Navigate to="/" /> : <ForgotPassword />}
                />

                {/* Protected Routes */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute user={user}>
                      <ProfilePage user={user} onLogout={handleLogout} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/book/:id"
                  element={
                    <ProtectedRoute user={user}>
                      <BookingPage user={user} />
                    </ProtectedRoute>
                  }
                />

                {/* 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;