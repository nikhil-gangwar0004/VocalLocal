import React, { useState, useEffect } from 'react';
import { MapPin, User, LogOut, Menu, X, ChevronDown, Bell, Briefcase, LayoutDashboard } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ user, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 40,
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'rgba(2,6,23,0.95)' : 'rgba(2,6,23,0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        padding: '0 24px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-1px', cursor: 'pointer' }}>
            <span style={{ color: '#fff' }}>Vocal</span>
            <span style={{ color: '#fbbf24' }}>Local</span>
          </div>
        </Link>

        {/* Desktop Links & Expert Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="hidden md:flex">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '8px 16px', borderRadius: 999, fontSize: 14, fontWeight: 600,
                color: location.pathname === link.path ? '#fbbf24' : '#94a3b8',
                backgroundColor: location.pathname === link.path ? 'rgba(251,191,36,0.08)' : 'transparent',
                transition: 'all 0.2s',
              }}>
                {link.label}
              </div>
            </Link>
          ))}

          {/* ✅ NANCY LOGIC: Become an Expert Button */}
          {user && user.role === 'customer' && (
            <Link to="/become-expert" style={{ textDecoration: 'none' }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
                borderRadius: 999, background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)',
                color: '#fbbf24', fontSize: 13, fontWeight: 700, cursor: 'pointer'
              }}>
                <Briefcase size={14} /> Become an Expert
              </button>
            </Link>
          )}
        </div>

        {/* Right Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          
          {/* Admin/Pro Dashboard Link (Desktop) */}
          <div className="hidden md:flex">
            {user && (user.role === 'professional' || user.email === 'gangwarn411@gmail.com') && (
              <Link to={user.role === 'admin' ? '/admin' : '/expert-panel'} style={{ textDecoration: 'none' }}>
                <button style={{
                  background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
                  color: '#4ade80', padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: 'pointer'
                }}>
                  Dashboard
                </button>
              </Link>
            )}
          </div>

          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => { setDropdownOpen(!dropdownOpen); setMenuOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, padding: '8px 16px 8px 8px',
                  cursor: 'pointer', color: '#fff',
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: '#000'
                }}>
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="hidden sm:inline" style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>{user.name?.split(' ')[0]}</span>
                <ChevronDown size={14} color="#64748b" />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    style={{
                      position: 'absolute', right: 0, top: 'calc(100% + 8px)', background: '#0f172a',
                      border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 8, minWidth: 200, zIndex: 100,
                    }}
                  >
                    <div style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 4 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{user.name}</div>
                      <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase' }}>{user.role} Account</div>
                    </div>
                    
                    {/* Role-specific Links in Dropdown */}
                    {user.role === 'customer' && (
                      <button onClick={() => { navigate('/become-expert'); setDropdownOpen(false); }} 
                        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'transparent', border: 'none', color: '#fbbf24', fontSize: 14, cursor: 'pointer', borderRadius: 8 }}>
                        <Briefcase size={14} /> Join as Expert
                      </button>
                    )}

                    <button onClick={() => { navigate('/profile'); setDropdownOpen(false); }} 
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'transparent', border: 'none', color: '#94a3b8', fontSize: 14, cursor: 'pointer', borderRadius: 8 }}>
                      <User size={14} /> My Profile
                    </button>

                    <button onClick={() => { onLogout(); setDropdownOpen(false); }} 
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'transparent', border: 'none', color: '#ef4444', fontSize: 14, cursor: 'pointer', borderRadius: 8 }}>
                      <LogOut size={14} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 10 }}>
              <Link to="/login" className="hidden sm:block" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '9px 20px', borderRadius: 999, background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Login</button>
              </Link>
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '9px 20px', borderRadius: 999, background: '#fbbf24', border: 'none', color: '#000', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Sign Up</button>
              </Link>
            </div>
          )}

          <button onClick={() => { setMenuOpen(!menuOpen); setDropdownOpen(false); }}
            style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: 4 }} className="md:hidden">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#0f172a', borderBottom: '1px solid rgba(251,191,36,0.2)', paddingBottom: 20 }}>
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>
                <div style={{ padding: '16px 24px', color: '#e2e8f0', fontSize: 16, fontWeight: 600 }}>{link.label}</div>
              </Link>
            ))}
            
            {user && user.role === 'customer' && (
              <Link to="/become-expert" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>
                <div style={{ padding: '16px 24px', color: '#fbbf24', fontWeight: 700 }}>Become an Expert 🛠️</div>
              </Link>
            )}

            {user && (user.role === 'professional' || user.email === 'gangwarn411@gmail.com') && (
              <Link to={user.email === 'gangwarn411@gmail.com' ? '/admin' : '/expert-panel'} onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>
                <div style={{ padding: '16px 24px', color: '#4ade80', fontWeight: 700 }}>Dashboard ⚡</div>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;