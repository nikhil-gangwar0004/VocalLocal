import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Edit3, Save, X, CheckCircle, Clock, Calendar, Shield, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getMyBookings, updateProfile, logoutUser } from '../services/api';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } })
};

const ProfilePage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || 'Pilibhit, UP',
  });

  // 🔄 Bookings fetch karne ka main function
  const fetchBookings = useCallback(async () => {
    try {
      setLoadingBookings(true);
      const token = localStorage.getItem('token') || localStorage.getItem('vl_token');
      
      if (!token) {
        console.log("No token found");
        setLoadingBookings(false);
        return;
      }

      const data = await getMyBookings();
      console.log("Fetched Bookings:", data); // Debugging ke liye
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Bookings fetch error:', err.message);
    } finally {
      setLoadingBookings(false);
    }
  }, []);

  // Component load hote hi data fetch karega
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleSave = async () => {
    try {
      await updateProfile({ name: form.name, phone: form.phone, location: form.location });
      setSaved(true);
      setEditing(false);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.log('Update error:', err.message);
    }
  };

  const handleLogout = () => {
    logoutUser();
    onLogout();
    navigate('/');
  };

  const stats = [
    { label: 'Total Bookings', value: bookings.length.toString(), icon: <Calendar size={18} />, color: '#fbbf24' },
    { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length.toString(), icon: <CheckCircle size={18} />, color: '#22c55e' },
    { label: 'Upcoming', value: bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length.toString(), icon: <Clock size={18} />, color: '#3b82f6' },
    { label: 'Member Since', value: new Date(user?.createdAt || Date.now()).getFullYear().toString(), icon: <Shield size={18} />, color: '#a855f7' },
  ];

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10, color: '#fff', fontSize: 14,
    outline: 'none', boxSizing: 'border-box',
  };

  const statusColor = (status) => {
    if (status === 'completed') return { bg: 'rgba(34,197,94,0.1)', color: '#22c55e', text: '✓ Completed' };
    if (status === 'cancelled') return { bg: 'rgba(239,68,68,0.1)', color: '#ef4444', text: '✗ Cancelled' };
    return { bg: 'rgba(251,191,36,0.1)', color: '#fbbf24', text: '⏳ Upcoming' };
  };

  return (
    <div style={{ backgroundColor: '#020617', color: '#fff', minHeight: '100vh', padding: '100px 24px 60px', fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} style={{ marginBottom: 36 }}>
          <p style={{ color: '#fbbf24', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>My Account</p>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-1px' }}>Profile</h1>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>

          {/* Left — Profile Card */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}>
            <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 28, marginBottom: 20 }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 28, color: '#000', flexShrink: 0 }}>
                  {form.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 20, color: '#fff' }}>{form.name}</div>
                  <div style={{ fontSize: 13, color: '#475569', marginTop: 2, textTransform: 'capitalize' }}>{user?.role || 'Customer'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                {!editing ? (
                  <button onClick={() => setEditing(true)} style={{ flex: 1, padding: '10px', borderRadius: 10, background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)', color: '#fbbf24', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <Edit3 size={14} /> Edit Profile
                  </button>
                ) : (
                  <>
                    <button onClick={handleSave} style={{ flex: 1, padding: '10px', borderRadius: 10, background: '#22c55e', border: 'none', color: '#000', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <Save size={14} /> Save
                    </button>
                    <button onClick={() => setEditing(false)} style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', cursor: 'pointer' }}>
                      <X size={14} />
                    </button>
                  </>
                )}
              </div>

              {/* Input Fields */}
              {[
                { label: 'Full Name', key: 'name', icon: <User size={14} />, type: 'text' },
                { label: 'Email', key: 'email', icon: <Mail size={14} />, type: 'email', disabled: true },
                { label: 'Phone', key: 'phone', icon: <Phone size={14} />, type: 'tel' },
                { label: 'Location', key: 'location', icon: <MapPin size={14} />, type: 'text' },
              ].map((field) => (
                <div key={field.key} style={{ marginBottom: 14 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: 6 }}>
                    {field.icon} {field.label}
                  </label>
                  {editing && !field.disabled ? (
                    <input type={field.type} value={form[field.key]}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      style={inputStyle} />
                  ) : (
                    <div style={{ fontSize: 14, color: '#cbd5e1', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      {form[field.key] || '—'}
                    </div>
                  )}
                </div>
              ))}

              <button onClick={handleLogout} style={{ width: '100%', padding: '12px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, color: '#ef4444', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8 }}>
                <LogOut size={15} /> Logout
              </button>
            </div>
          </motion.div>

          {/* Right — Stats + Bookings */}
          <div>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              {stats.map((s, i) => (
                <div key={i} style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '18px 16px' }}>
                  <div style={{ color: s.color, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: '#475569', fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                 <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>My Bookings</h3>
                 <button onClick={fetchBookings} style={{ background: 'none', border: 'none', color: '#fbbf24', fontSize: 12, cursor: 'pointer' }}>Refresh ↻</button>
              </div>

              {loadingBookings ? (
                <div style={{ textAlign: 'center', padding: '32px 0', color: '#475569' }}>Updating...</div>
              ) : bookings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <p style={{ color: '#475569', fontSize: 14 }}>Koi booking nahi mili.</p>
                </div>
              ) : (
                bookings.map((b, i) => {
                  const s = statusColor(b.status);
                  return (
                    <div key={b._id || i} style={{ padding: '14px 0', borderBottom: i < bookings.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{b.serviceName || b.service}</div>
                          <div style={{ fontSize: 12, color: '#475569' }}>{b.professionalName || 'Professional'}</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6, color: '#475569', fontSize: 11 }}>
                            <Clock size={10} /> {b.date} at {b.time}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: s.bg, color: s.color, marginBottom: 4 }}>
                            {s.text}
                          </div>
                          <div style={{ fontSize: 13, fontWeight: 800, color: '#fbbf24' }}>₹{b.totalPrice || b.price}</div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;