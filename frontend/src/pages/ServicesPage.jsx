import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom'; // ✅ Added useLocation
import { getProfessionals } from '../services/api';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } })
};

const ServicesPage = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Added hook
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authAlert, setAuthAlert] = useState(false);

  const filters = ['All', 'Plumber', 'Electrician', 'Mechanic', 'Carpenter', 'Painter', 'AC Repair', 'Salon'];

  // ✅ New useEffect: URL se category filter catch karne ke liye
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category && filters.includes(category)) {
      setActiveFilter(category);
    }
  }, [location]);

  useEffect(() => {
    const fetchProfessionals = async () => {
      setLoading(true);
      try {
        const queryFilters = {};
        if (activeFilter !== 'All') queryFilters.role = activeFilter;
        const data = await getProfessionals(queryFilters);
        setProfessionals(data);
      } catch (err) {
        console.log('Error fetching professionals:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfessionals();
  }, [activeFilter]);

  // Baaki saara JSX code waise hi rakho...
  const filtered = professionals.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.role.toLowerCase().includes(search.toLowerCase()) ||
    (p.location || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleBook = (proId) => {
    if (!user) {
      setAuthAlert(true);
      setTimeout(() => setAuthAlert(false), 3000);
      return;
    }
    navigate(`/book/${proId}`);
  };

  return (
    <div style={{ backgroundColor: '#020617', color: '#fff', minHeight: '100vh', padding: '100px 24px 60px', fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* ... baaki tera pura JSX same rahega ... */}
        {authAlert && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            style={{
              position: 'fixed', top: 90, left: '50%', transform: 'translateX(-50%)',
              background: '#0f172a', border: '1px solid rgba(251,191,36,0.4)',
              borderRadius: 14, padding: '14px 24px', color: '#fbbf24',
              fontWeight: 700, fontSize: 14, zIndex: 999,
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
            }}>
            🔒 Book karne ke liye pehle Login karein!
          </motion.div>
        )}

        <motion.div initial="hidden" animate="visible" variants={fadeUp} style={{ marginBottom: 48 }}>
          <p style={{ color: '#fbbf24', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
            Browse Professionals
          </p>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-1px', marginBottom: 12 }}>
            Find Your Expert
          </h1>
          <p style={{ color: '#475569', fontSize: 16 }}>
            Pilibhit aur surrounding areas ke verified professionals
          </p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1} style={{ marginBottom: 24 }}>
          <div style={{ position: 'relative', maxWidth: 520 }}>
            <Search size={16} color="#334155" style={{
              position: 'absolute', left: 16, top: '50%',
              transform: 'translateY(-50%)', pointerEvents: 'none'
            }} />
            <input
              type="text"
              placeholder="Name, role ya location search karein..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '14px 16px 14px 44px',
                background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12, color: '#fff', fontSize: 15, outline: 'none',
                boxSizing: 'border-box', transition: 'border-color 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(251,191,36,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
          </div>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2}
          style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              padding: '8px 18px', borderRadius: 999,
              background: activeFilter === f ? '#fbbf24' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeFilter === f ? '#fbbf24' : 'rgba(255,255,255,0.08)'}`,
              color: activeFilter === f ? '#000' : '#64748b',
              fontWeight: activeFilter === f ? 700 : 600,
              fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
            }}>{f}</button>
          ))}
        </motion.div>

        <div style={{ color: '#334155', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
          {loading ? 'Loading...' : `${filtered.length} professionals found`}
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{
                background: '#0f172a', borderRadius: 20, padding: 24, height: 220,
                animation: 'pulse 1.5s infinite'
              }} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {filtered.map((pro, i) => (
              <motion.div
                key={pro._id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -4 }}
                style={{
                  background: '#0f172a',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 20, padding: 24,
                  transition: 'border-color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = (pro.color || '#3b82f6') + '50'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: '50%',
                    background: (pro.color || '#3b82f6') + '20',
                    border: `2px solid ${(pro.color || '#3b82f6')}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 900, fontSize: 15, color: pro.color || '#3b82f6', flexShrink: 0
                  }}>
                    {pro.name?.charAt(0)}{pro.name?.split(' ')[1]?.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 15, color: '#fff' }}>{pro.name}</div>
                    <div style={{ color: '#475569', fontSize: 12 }}>{pro.role}</div>
                  </div>
                  <div style={{
                    fontSize: 11, fontWeight: 700,
                    color: pro.available ? '#22c55e' : '#64748b',
                    background: pro.available ? 'rgba(34,197,94,0.1)' : 'rgba(100,116,139,0.1)',
                    padding: '3px 8px', borderRadius: 6
                  }}>
                    {pro.available ? 'Available' : 'Busy'}
                  </div>
                </div>

                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '10px 0', marginBottom: 12,
                  borderTop: '1px solid rgba(255,255,255,0.04)',
                  borderBottom: '1px solid rgba(255,255,255,0.04)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, color: '#fbbf24', fontWeight: 700, fontSize: 13 }}>
                    <Star size={12} fill="#fbbf24" /> {pro.rating}
                  </div>
                  <div style={{ color: '#475569', fontSize: 12 }}>{pro.jobs} jobs</div>
                  <div style={{ color: '#475569', fontSize: 12 }}>{pro.exp}</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#334155', fontSize: 12 }}>
                    <MapPin size={11} /> {pro.location}
                  </div>
                  <div style={{ fontWeight: 800, color: '#fbbf24', fontSize: 14 }}>{pro.price}</div>
                </div>

                <button
                  onClick={() => handleBook(pro._id)}
                  style={{
                    width: '100%', padding: '10px', borderRadius: 10,
                    background: pro.available ? 'rgba(251,191,36,0.1)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${pro.available ? 'rgba(251,191,36,0.25)' : 'rgba(255,255,255,0.06)'}`,
                    color: pro.available ? '#fbbf24' : '#334155',
                    fontWeight: 700, fontSize: 13,
                    cursor: pro.available ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s'
                  }}>
                  {!user
                    ? '🔒 Login to Book'
                    : pro.available
                      ? 'Book Now →'
                      : 'Notify When Available'
                  }
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;