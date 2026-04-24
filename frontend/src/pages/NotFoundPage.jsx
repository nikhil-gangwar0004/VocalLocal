import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      backgroundColor: '#020617', color: '#fff',
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '24px',
      fontFamily: "'Segoe UI', sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      {/* BG Glow */}
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', maxWidth: 480, position: 'relative' }}
      >
        {/* 404 Big Number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, type: 'spring', damping: 15 }}
          style={{ fontSize: 'clamp(100px, 20vw, 160px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-6px', marginBottom: 8 }}
        >
          <span style={{ color: 'rgba(255,255,255,0.08)' }}>4</span>
          <span style={{ color: '#fbbf24' }}>0</span>
          <span style={{ color: 'rgba(255,255,255,0.08)' }}>4</span>
        </motion.div>

        {/* Emoji */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{ fontSize: 48, marginBottom: 20 }}
        >
          🔍
        </motion.div>

        <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 12, letterSpacing: '-0.5px' }}>
          Page Nahi Mili!
        </h1>
        <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.7, marginBottom: 36 }}>
          Aap jo page dhundh rahe hain, woh exist nahi karta ya hata diya gaya hai. Ghabrao mat, home pe wapas jao!
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 999,
              background: '#fbbf24', border: 'none',
              color: '#000', fontWeight: 800, fontSize: 15, cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#fcd34d'}
            onMouseLeave={e => e.currentTarget.style.background = '#fbbf24'}
            >
              <Home size={16} /> Home Pe Jao
            </button>
          </Link>

          <button onClick={() => navigate(-1)} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '14px 28px', borderRadius: 999,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#94a3b8', fontWeight: 700, fontSize: 15, cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#94a3b8'; }}
          >
            <ArrowLeft size={16} /> Wapas Jao
          </button>
        </div>

        {/* Quick Links */}
        <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ color: '#334155', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16 }}>Quick Links</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: 'Services', path: '/services' },
              { label: 'Login', path: '/login' },
              { label: 'Sign Up', path: '/signup' },
            ].map(link => (
              <Link key={link.path} to={link.path} style={{ textDecoration: 'none' }}>
                <span style={{
                  fontSize: 13, fontWeight: 600, color: '#475569',
                  padding: '6px 14px', borderRadius: 999,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  cursor: 'pointer', transition: 'all 0.2s',
                  display: 'inline-block',
                }}>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Brand */}
        <div style={{ marginTop: 36, fontSize: 18, fontWeight: 900, letterSpacing: '-0.5px' }}>
          <span style={{ color: '#fff' }}>Vocal</span>
          <span style={{ color: '#fbbf24' }}>Local</span>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;