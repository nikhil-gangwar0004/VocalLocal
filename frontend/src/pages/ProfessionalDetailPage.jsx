import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Shield, CheckCircle, Phone, MessageCircle, ArrowLeft, Calendar, Wrench, ThumbsUp } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } })
};

const ProfessionalDetailPage = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');

  // Mock data — MERN backend se API call hogi
  const professionals = {
    '1': { name: 'Ramesh Kumar', role: 'Plumber', rating: 4.9, jobs: 312, location: 'Pilibhit, UP', avatar: 'RK', color: '#3b82f6', exp: '8 yrs', price: '₹299/hr', available: true, phone: '+91 98111 22333' },
    '2': { name: 'Suresh Verma', role: 'Electrician', rating: 4.8, jobs: 245, location: 'Bareilly, UP', avatar: 'SV', color: '#f59e0b', exp: '5 yrs', price: '₹249/hr', available: true, phone: '+91 97222 33444' },
    '3': { name: 'Anil Sharma', role: 'Mechanic', rating: 4.7, jobs: 189, location: 'Pilibhit, UP', avatar: 'AS', color: '#ef4444', exp: '10 yrs', price: '₹399/hr', available: false, phone: '+91 96333 44555' },
    '4': { name: 'Priya Singh', role: 'Salon', rating: 5.0, jobs: 420, location: 'Shahjahanpur, UP', avatar: 'PS', color: '#ec4899', exp: '6 yrs', price: '₹199/hr', available: true, phone: '+91 95444 55666' },
  };

  const pro = professionals[id] || professionals['1'];

  const reviews = [
    { name: 'Rahul G.', rating: 5, date: '2 din pehle', text: 'Bahut accha kaam kiya! Time pe aaye, pipe sahi kar diya. Highly recommend!', avatar: 'RG' },
    { name: 'Sunita D.', rating: 5, date: '1 hafta pehle', text: 'Very professional. Price bhi reasonable tha. Dobara bulaunga zaroor.', avatar: 'SD' },
    { name: 'Amit V.', rating: 4, date: '2 hafta pehle', text: 'Kaam acha kiya. Thodi der se aaye lekin inform kar diya tha. Overall good.', avatar: 'AV' },
    { name: 'Meena K.', rating: 5, date: '1 mahine pehle', text: 'Ekdum perfect! Hath saaf kiya, koi gandagi nahi chhodi. 5 star!', avatar: 'MK' },
  ];

  const services = {
    Plumber: ['Pipe Leakage Fix', 'Bathroom Fitting', 'Water Tank Installation', 'Drainage Cleaning', 'Tap Repair', 'Geyser Installation'],
    Electrician: ['Wiring & Rewiring', 'Switch/Socket Repair', 'Fan Installation', 'AC Wiring', 'MCB/Fuse Box', 'CCTV Wiring'],
    Mechanic: ['Car Servicing', 'Bike Repair', 'Engine Checkup', 'Tyre Change', 'Battery Replacement', 'AC Gas Refill'],
    Salon: ['Hair Cut', 'Facial', 'Waxing', 'Manicure/Pedicure', 'Bridal Makeup', 'Hair Color'],
  };

  const proServices = services[pro.role] || services['Plumber'];

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'reviews', label: `Reviews (${reviews.length})` },
  ];

  return (
    <div style={{ backgroundColor: '#020617', color: '#fff', minHeight: '100vh', padding: '100px 24px 60px', fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>

        {/* Back */}
        <button onClick={() => navigate(-1)} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'transparent', border: 'none', color: '#475569',
          fontSize: 14, cursor: 'pointer', marginBottom: 28, padding: 0,
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
        onMouseLeave={e => e.currentTarget.style.color = '#475569'}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>

          {/* Left — Profile */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} style={{ height: 'fit-content' }}>

            {/* Main Card */}
            <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 28, marginBottom: 16 }}>
              {/* Avatar */}
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: pro.color + '20', border: `3px solid ${pro.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 26, color: pro.color, margin: '0 auto 14px' }}>
                  {pro.avatar}
                </div>
                <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 4 }}>{pro.name}</h1>
                <div style={{ fontSize: 14, color: '#475569', marginBottom: 10 }}>{pro.role}</div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 999,
                  background: pro.available ? 'rgba(34,197,94,0.1)' : 'rgba(100,116,139,0.1)',
                  color: pro.available ? '#22c55e' : '#64748b',
                  border: `1px solid ${pro.available ? 'rgba(34,197,94,0.2)' : 'rgba(100,116,139,0.2)'}`,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: pro.available ? '#22c55e' : '#64748b' }} />
                  {pro.available ? 'Available Today' : 'Currently Busy'}
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: 18 }}>
                {[
                  { val: pro.rating, label: 'Rating', icon: <Star size={12} fill="#fbbf24" color="#fbbf24" /> },
                  { val: pro.jobs, label: 'Jobs', icon: <CheckCircle size={12} color="#22c55e" /> },
                  { val: pro.exp, label: 'Exp.', icon: <Clock size={12} color="#3b82f6" /> },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'center', fontWeight: 800, fontSize: 15, color: '#fff', marginBottom: 3 }}>
                      {s.icon} {s.val}
                    </div>
                    <div style={{ fontSize: 10, color: '#334155', fontWeight: 600 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Location + Price */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#475569', fontSize: 13 }}>
                  <MapPin size={13} /> {pro.location}
                </div>
                <div style={{ fontWeight: 900, color: '#fbbf24', fontSize: 16 }}>{pro.price}</div>
              </div>

              {/* Badges */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                {[
                  { icon: <Shield size={12} />, text: 'ID Verified', color: '#22c55e' },
                  { icon: <ThumbsUp size={12} />, text: 'Top Rated', color: '#fbbf24' },
                ].map((b) => (
                  <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, color: b.color, background: b.color + '15', padding: '4px 10px', borderRadius: 999 }}>
                    {b.icon} {b.text}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              {user ? (
                <Link to={`/book/${id || '1'}`} style={{ textDecoration: 'none' }}>
                  <button style={{ width: '100%', padding: '13px', borderRadius: 12, background: '#fbbf24', border: 'none', color: '#000', fontWeight: 800, fontSize: 15, cursor: 'pointer', marginBottom: 10 }}>
                    <Calendar size={15} style={{ display: 'inline', marginRight: 6 }} />
                    Book Now
                  </button>
                </Link>
              ) : (
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <button style={{ width: '100%', padding: '13px', borderRadius: 12, background: '#fbbf24', border: 'none', color: '#000', fontWeight: 800, fontSize: 15, cursor: 'pointer', marginBottom: 10 }}>
                    🔒 Login to Book
                  </button>
                </Link>
              )}

              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ flex: 1, padding: '10px', borderRadius: 10, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22c55e', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <Phone size={13} /> Call
                </button>
                <button style={{ flex: 1, padding: '10px', borderRadius: 10, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <MessageCircle size={13} /> Chat
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right — Tabs */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}>

            {/* Tab Bar */}
            <div style={{ display: 'flex', gap: 4, background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 4, marginBottom: 20 }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                  flex: 1, padding: '10px 8px',
                  background: activeTab === t.id ? '#fbbf24' : 'transparent',
                  border: 'none', borderRadius: 10,
                  color: activeTab === t.id ? '#000' : '#475569',
                  fontWeight: activeTab === t.id ? 700 : 600,
                  fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
                }}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* About Tab */}
            {activeTab === 'about' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 24, marginBottom: 16 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 14, color: '#fff' }}>About {pro.name}</h3>
                  <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.8 }}>
                    {pro.name} ek experienced {pro.role.toLowerCase()} hain jo Pilibhit area mein {pro.exp} se kaam kar rahe hain. Inke paas {pro.jobs}+ successful jobs ka experience hai aur customers inhe bahut pasand karte hain.
                  </p>
                  <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.8, marginTop: 12 }}>
                    Yeh always time pe aate hain, kaam cleanly karte hain aur customers ki satisfaction inki pehli priority hoti hai.
                  </p>
                </div>

                <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 24 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 14 }}>Working Hours</h3>
                  {[
                    { day: 'Monday - Friday', time: '8:00 AM - 8:00 PM' },
                    { day: 'Saturday', time: '9:00 AM - 6:00 PM' },
                    { day: 'Sunday', time: 'Emergency only' },
                  ].map((h) => (
                    <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 13 }}>
                      <span style={{ color: '#64748b' }}>{h.day}</span>
                      <span style={{ color: '#fff', fontWeight: 600 }}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 24 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 18 }}>Services Offered</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {proServices.map((s, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10 }}>
                        <Wrench size={13} color={pro.color} />
                        <span style={{ fontSize: 13, color: '#cbd5e1', fontWeight: 500 }}>{s}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 20, padding: '14px 16px', background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)', borderRadius: 12 }}>
                    <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>
                      💡 Koi specific service chahiye jo list mein nahi hai? Seedha call ya chat karke puchho!
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Rating Summary */}
                <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 20, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 44, fontWeight: 900, color: '#fbbf24', letterSpacing: '-2px' }}>{pro.rating}</div>
                    <div style={{ display: 'flex', gap: 2, justifyContent: 'center', marginTop: 4 }}>
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill="#fbbf24" color="#fbbf24" />)}
                    </div>
                    <div style={{ fontSize: 12, color: '#475569', marginTop: 4 }}>{reviews.length} reviews</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    {[5, 4, 3, 2, 1].map(s => (
                      <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 11, color: '#475569', width: 8 }}>{s}</span>
                        <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 999, overflow: 'hidden' }}>
                          <div style={{ height: '100%', borderRadius: 999, background: '#fbbf24', width: s === 5 ? '75%' : s === 4 ? '20%' : '5%' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {reviews.map((r, i) => (
                  <div key={i} style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '18px 20px', marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(251,191,36,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, color: '#fbbf24' }}>
                          {r.avatar}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</div>
                          <div style={{ display: 'flex', gap: 2, marginTop: 2 }}>
                            {[...Array(r.rating)].map((_, j) => <Star key={j} size={10} fill="#fbbf24" color="#fbbf24" />)}
                          </div>
                        </div>
                      </div>
                      <span style={{ fontSize: 11, color: '#334155' }}>{r.date}</span>
                    </div>
                    <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.7, fontStyle: 'italic' }}>"{r.text}"</p>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetailPage;