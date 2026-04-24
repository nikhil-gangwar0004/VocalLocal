import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star, MapPin, Clock, Calendar, CheckCircle,
  ArrowLeft, Phone, MessageCircle, Shield, Zap
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBooking } from '../services/api'; // ✅ Required import added

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } })
};

const BookingPage = ({ user }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [step, setStep] = useState(1); // 1: Details, 2: Confirm, 3: Success
  const [form, setForm] = useState({
    date: '',
    time: '',
    address: '',
    description: '',
    contact: user?.phone || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // ✅ Added for error feedback

  // Mock professional data — real mein API se aayega
  const professional = {
    id: id || '1',
    name: 'Ramesh Kumar',
    role: 'Plumber',
    rating: 4.9,
    jobs: 312,
    exp: '8 yrs',
    location: 'Pilibhit, UP',
    price: '299', // Updated to string match schema
    avatar: 'RK',
    color: '#3b82f6',
    available: true,
    skills: ['Pipe Repair', 'Leak Fixing', 'Bathroom Fitting', 'Water Tank', 'Drainage'],
  };

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

  // ✅ Only logic changed to match your backend model keys
  const handleConfirm = async () => {
    setLoading(true);
    setError('');
    try {
      const bookingData = {
        professional: id,           // Changed key from professionalId to professional
        service: professional.role, // Changed key from serviceName to service
        date: form.date,
        time: form.time,
        address: form.address,
        description: form.description || '',
        price: professional.price.toString(),
        status: 'pending'
      };

      await createBooking(bookingData); 
      setStep(3);
    } catch (err) {
      setError(err.message || 'Booking failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '13px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12, color: '#fff', fontSize: 15,
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{ backgroundColor: '#020617', color: '#fff', minHeight: '100vh', padding: '100px 24px 60px', fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>

        {/* Back Button */}
        <button onClick={() => navigate(-1)} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'transparent', border: 'none',
          color: '#475569', fontSize: 14, cursor: 'pointer',
          marginBottom: 32, padding: 0,
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
        onMouseLeave={e => e.currentTarget.style.color = '#475569'}
        >
          <ArrowLeft size={16} /> Back to Services
        </button>

        {/* Step 3 — Success */}
        {step === 3 ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            style={{ background: '#0f172a', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 28, padding: '60px 40px', textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '2px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <CheckCircle size={36} color="#22c55e" />
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12, color: '#fff' }}>Booking Confirmed! 🎉</h2>
            <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
              {professional.name} ko aapki booking mil gayi hai.<br />
              Wo aapke address par {form.date} ko {form.time} pe aayenge.
            </p>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '20px', marginBottom: 32, textAlign: 'left' }}>
              {[
                { label: 'Service', value: professional.role },
                { label: 'Provider', value: professional.name },
                { label: 'Date', value: form.date },
                { label: 'Time', value: form.time },
                { label: 'Address', value: form.address },
                { label: 'Rate', value: `₹${professional.price}/hr` },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ color: '#475569', fontSize: 13 }}>{item.label}</span>
                  <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{item.value}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/profile')} style={{
                flex: 1, padding: '14px', borderRadius: 12,
                background: '#fbbf24', border: 'none',
                color: '#000', fontWeight: 700, fontSize: 14, cursor: 'pointer',
              }}>
                View My Bookings
              </button>
              <button onClick={() => navigate('/')} style={{
                flex: 1, padding: '14px', borderRadius: 12,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer',
              }}>
                Go to Home
              </button>
            </div>
          </motion.div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>

            {/* Professional Card */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp}
              style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 24, height: 'fit-content' }}>

              {/* Profile */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: professional.color + '20', border: `2px solid ${professional.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, color: professional.color }}>
                  {professional.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#fff' }}>{professional.name}</div>
                  <div style={{ fontSize: 13, color: '#475569' }}>{professional.role}</div>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: 16 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, color: '#fbbf24', fontWeight: 800, fontSize: 14 }}>
                    <Star size={12} fill="#fbbf24" /> {professional.rating}
                  </div>
                  <div style={{ color: '#334155', fontSize: 10, marginTop: 2 }}>Rating</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: '#fff' }}>{professional.jobs}</div>
                  <div style={{ color: '#334155', fontSize: 10, marginTop: 2 }}>Jobs</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: '#fff' }}>{professional.exp}</div>
                  <div style={{ color: '#334155', fontSize: 10, marginTop: 2 }}>Exp.</div>
                </div>
              </div>

              {/* Location + Price */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#475569', fontSize: 12 }}>
                  <MapPin size={12} /> {professional.location}
                </div>
                <div style={{ fontWeight: 800, color: '#fbbf24', fontSize: 15 }}>₹{professional.price}/hr</div>
              </div>

              {/* Skills */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Skills</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {professional.skills.map(s => (
                    <span key={s} style={{ fontSize: 11, padding: '4px 10px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 999, color: '#60a5fa', fontWeight: 600 }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Buttons */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ flex: 1, padding: '10px', borderRadius: 10, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22c55e', fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <Phone size={13} /> Call
                </button>
                <button style={{ flex: 1, padding: '10px', borderRadius: 10, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa', fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <MessageCircle size={13} /> Chat
                </button>
              </div>
            </motion.div>

            {/* Booking Form */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}>

              {/* Step Indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                {[1, 2].map((s) => (
                  <React.Fragment key={s}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: step >= s ? '#fbbf24' : 'rgba(255,255,255,0.05)',
                      border: `2px solid ${step >= s ? '#fbbf24' : 'rgba(255,255,255,0.1)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: 13,
                      color: step >= s ? '#000' : '#334155',
                    }}>
                      {s}
                    </div>
                    {s < 2 && <div style={{ flex: 1, height: 2, background: step > s ? '#fbbf24' : 'rgba(255,255,255,0.06)', borderRadius: 999 }} />}
                  </React.Fragment>
                ))}
                <span style={{ fontSize: 13, color: '#475569', marginLeft: 8 }}>
                  {step === 1 ? 'Booking Details' : 'Confirm'}
                </span>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 28 }}>

                {step === 1 && (
                  <>
                    <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 24, color: '#fff' }}>Booking Details</h2>

                    {/* Date */}
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                        <Calendar size={12} /> Select Date
                      </label>
                      <input type="date"
                        value={form.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={e => setForm({ ...form, date: e.target.value })}
                        style={{ ...inputStyle, colorScheme: 'dark' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(251,191,36,0.4)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                      />
                    </div>

                    {/* Time Slots */}
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                        <Clock size={12} /> Select Time
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                        {timeSlots.map(t => (
                          <button key={t} onClick={() => setForm({ ...form, time: t })} style={{
                            padding: '8px 4px',
                            borderRadius: 8,
                            background: form.time === t ? '#fbbf24' : 'rgba(255,255,255,0.04)',
                            border: `1px solid ${form.time === t ? '#fbbf24' : 'rgba(255,255,255,0.08)'}`,
                            color: form.time === t ? '#000' : '#94a3b8',
                            fontWeight: form.time === t ? 700 : 500,
                            fontSize: 12, cursor: 'pointer',
                            transition: 'all 0.15s',
                          }}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Address */}
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                        <MapPin size={12} /> Your Address
                      </label>
                      <input type="text" placeholder="Ghar ka pura address likhein..."
                        value={form.address}
                        onChange={e => setForm({ ...form, address: e.target.value })}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = 'rgba(251,191,36,0.4)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                      />
                    </div>

                    {/* Description */}
                    <div style={{ marginBottom: 24 }}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Problem Description</label>
                      <textarea placeholder="Kya problem hai? Detail mein batao..." rows={3}
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                        style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
                        onFocus={e => e.target.style.borderColor = 'rgba(251,191,36,0.4)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                      />
                    </div>

                    <button
                      onClick={() => { if (form.date && form.time && form.address) setStep(2); }}
                      disabled={!form.date || !form.time || !form.address}
                      style={{
                        width: '100%', padding: '14px',
                        background: (!form.date || !form.time || !form.address) ? '#1e293b' : '#fbbf24',
                        border: 'none', borderRadius: 12,
                        color: (!form.date || !form.time || !form.address) ? '#334155' : '#000',
                        fontWeight: 800, fontSize: 15, cursor: (!form.date || !form.time || !form.address) ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      Continue to Review →
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 24, color: '#fff' }}>Review & Confirm</h2>

                    {/* Summary */}
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 18, marginBottom: 20 }}>
                      {[
                        { label: 'Service', value: professional.role },
                        { label: 'Provider', value: professional.name },
                        { label: 'Date', value: form.date },
                        { label: 'Time', value: form.time },
                        { label: 'Address', value: form.address },
                        { label: 'Rate', value: `₹${professional.price}/hr` },
                      ].map((item) => (
                        <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <span style={{ color: '#475569', fontSize: 13 }}>{item.label}</span>
                          <span style={{ color: '#fff', fontSize: 13, fontWeight: 600, maxWidth: '55%', textAlign: 'right' }}>{item.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Error display if validation fails */}
                    {error && (
                      <div style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', padding: '10px', borderRadius: 10, fontSize: 12, marginBottom: 15, textAlign: 'center' }}>
                        ❌ {error}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: 10 }}>
                      <button onClick={() => setStep(1)} style={{
                        padding: '13px 20px', borderRadius: 12,
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                        color: '#94a3b8', fontWeight: 600, fontSize: 14, cursor: 'pointer',
                      }}>
                        ← Edit
                      </button>
                      <button onClick={handleConfirm} disabled={loading} style={{
                        flex: 1, padding: '13px',
                        background: loading ? '#92400e' : '#fbbf24',
                        border: 'none', borderRadius: 12,
                        color: '#000', fontWeight: 800, fontSize: 15,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      }}>
                        {loading ? (
                          <div style={{ width: 18, height: 18, border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                        ) : '✓ Confirm Booking'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: #334155; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.5); }
      `}</style>
    </div>
  );
};

export default BookingPage;