import React, { useState } from 'react';
import { motion } from 'framer-motion';
// ✅ AnimatePresence icon hata diya
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const SignupPage = ({ onLogin }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState('customer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.phone) {
      setError('Sabhi fields fill karein');
      return;
    }
    if (!validateEmail(form.email)) {
      setError('Bhai, email ka format sahi nahi hai!');
      return;
    }
    if (!validatePhone(form.phone)) {
      setError('Mobile number 10 digit ka aur sahi hona chahiye!');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords match nahi kar rahe');
      return;
    }
    if (form.password.length < 6) {
      setError('Password kam se kam 6 characters ka hona chahiye');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const userData = await registerUser({ ...form, role });
      onLogin(userData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '14px 16px 14px 44px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12, color: '#fff', fontSize: 15,
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
  };

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#020617',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '100px 24px 60px', position: 'relative', overflow: 'hidden',
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <div style={{ position: 'absolute', top: '20%', left: '30%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: 480, position: 'relative' }}>

        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1.5px' }}>
              <span style={{ color: '#fff' }}>Vocal</span><span style={{ color: '#fbbf24' }}>Local</span>
            </div>
          </Link>
          <p style={{ color: '#475569', fontSize: 14, marginTop: 6 }}>Free account banao — 2 minute mein!</p>
        </div>

        {/* Role Toggle */}
        <div style={{ display: 'flex', background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 4, marginBottom: 24, gap: 4 }}>
          {['customer', 'professional'].map((r) => (
            <button key={r} onClick={() => setRole(r)} style={{
              flex: 1, padding: '10px', borderRadius: 10, border: 'none',
              background: role === r ? '#fbbf24' : 'transparent',
              color: role === r ? '#000' : '#475569',
              fontWeight: 700, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s', textTransform: 'capitalize',
            }}>
              {r === 'customer' ? '🙋 Customer' : '🔧 Professional'}
            </button>
          ))}
        </div>

        <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 28, padding: '36px 36px', boxShadow: '0 40px 80px rgba(0,0,0,0.4)' }}>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#fff', marginBottom: 4 }}>Create Account ✨</h1>
          <p style={{ color: '#475569', fontSize: 14, marginBottom: 24 }}>
            {role === 'customer' ? 'Hire local professionals easily' : 'Apna kaam badhao, customers pao'}
          </p>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Full Name *</label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="#334155" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type="text" placeholder="Aapka naam" value={form.name} onChange={update('name')} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(251,191,36,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Email *</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#334155" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type="email" placeholder="aap@example.com" value={form.email} onChange={update('email')} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(251,191,36,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
              </div>
            </div>

            {/* Phone */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Phone Number *</label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} color="#334155" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type="tel" placeholder="98765 43210" value={form.phone} onChange={update('phone')} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(251,191,36,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Password *</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#334155" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type={showPass ? 'text' : 'password'} placeholder="Min 6 characters" value={form.password} onChange={update('password')}
                  style={{ ...inputStyle, paddingRight: 48 }}
                  onFocus={e => e.target.style.borderColor = 'rgba(251,191,36,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#334155' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Confirm Password *</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#334155" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type="password" placeholder="Password dobara likhein" value={form.confirm} onChange={update('confirm')} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(251,191,36,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
              </div>
            </div>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '10px 14px', color: '#f87171', fontSize: 13, marginBottom: 16 }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '15px',
              background: loading ? '#92400e' : '#fbbf24',
              border: 'none', borderRadius: 14, color: '#000',
              fontWeight: 800, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s',
            }}>
              {loading
                ? <div style={{ width: 20, height: 20, border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                : <>Create Account <ArrowRight size={16} /></>
              }
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 24, color: '#475569', fontSize: 14 }}>
          Already account hai?{' '}
          <Link to="/login" style={{ color: '#fbbf24', fontWeight: 700, textDecoration: 'none' }}>Login Karein</Link>
        </p>
      </motion.div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } input::placeholder { color: #334155; }`}</style>
    </div>
  );
};

export default SignupPage;