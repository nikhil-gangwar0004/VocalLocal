import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { applyProfessional, getMe } from '../services/api';

const skills = [
  { value: 'Electrician', icon: '⚡', color: '#f59e0b', desc: 'Wiring, Fitting, Repair' },
  { value: 'Plumber', icon: '🔧', color: '#3b82f6', desc: 'Pipes, Tanks, Leaks' },
  { value: 'Mechanic', icon: '🔩', color: '#ef4444', desc: 'Car, Bike, Engine' },
  { value: 'Carpenter', icon: '🪚', color: '#22c55e', desc: 'Furniture, Woodwork' },
  { value: 'Painter', icon: '🎨', color: '#a855f7', desc: 'Wall, POP, Texture' },
  { value: 'AC Repair', icon: '❄️', color: '#06b6d4', desc: 'Service, Gas Refill' },
  { value: 'Salon', icon: '✂️', color: '#ec4899', desc: 'Hair, Makeup, Beauty' },
  { value: 'Handyman', icon: '🛠️', color: '#f97316', desc: 'General Home Repairs' },
];

const ProfessionalOnboarding = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    category: '', 
    experience: '', 
    price: '', 
    aadhar: '' 
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [freshUser, setFreshUser] = useState(null);

  // ✅ VALIDATION LOGIC
  const validateAadhar = (aadhar) => /^\d{12}$/.test(aadhar);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setFreshUser(data);
      } catch (err) {
        console.log('User fetch error:', err.message);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ AADHAR CHECK (Injection)
    if (!validateAadhar(formData.aadhar)) {
      alert('Bhai, Aadhar number galat hai! Ye exactly 12 digits ka hona chahiye.');
      return;
    }

    setLoading(true);
    try {
      await applyProfessional(formData);
      setSubmitted(true);
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const currentUser = freshUser || user;
  const proStatus = currentUser?.proDetails?.status;

  // ─── APPROVED SCREEN ───
  if (proStatus === 'approved') {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#020617', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        fontFamily: "'Segoe UI', sans-serif", 
        padding: 24 
      }}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ type: 'spring', damping: 15 }}
          style={{ 
            textAlign: 'center', 
            background: '#0f172a', 
            border: '1px solid rgba(34,197,94,0.3)', 
            borderRadius: 32, 
            padding: '60px 48px', 
            maxWidth: 480 
          }}
        >
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }} 
            style={{ fontSize: 64, marginBottom: 24 }}
          >
            🎉
          </motion.div>
          <h2 style={{ fontSize: 32, fontWeight: 900, color: '#22c55e', marginBottom: 12, letterSpacing: '-1px' }}>
            Congratulations!
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.8, marginBottom: 8 }}>
            <strong style={{ color: '#fff' }}>{currentUser?.name}</strong>, aap ab ek
          </p>
          <div style={{ display: 'inline-block', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 12, padding: '8px 20px', marginBottom: 20 }}>
            <span style={{ color: '#22c55e', fontWeight: 900, fontSize: 18 }}>✅ Verified Professional</span>
          </div>
          <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>
            Aapka profile VocalLocal pe live ho gaya hai!<br />
            Customers ab aapko Services page pe dekh sakte hain.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={() => navigate('/services')} style={{ padding: '12px 24px', borderRadius: 12, background: '#fbbf24', border: 'none', color: '#000', fontWeight: 800, cursor: 'pointer' }}>
              Services Dekho →
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── REJECTED SCREEN ───
  if (proStatus === 'rejected') {
    return (
      <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', background: '#0f172a', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 32, padding: '60px 48px', maxWidth: 480 }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>😔</div>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: '#ef4444', marginBottom: 12 }}>Application Rejected</h2>
          <p style={{ color: '#475569', marginBottom: 32 }}>Sorry bhai, aapki details criteria meet nahi kar payi.</p>
          <button onClick={() => { setSubmitted(false); setStep(1); setSelectedSkill(null); }} style={{ padding: '12px 28px', borderRadius: 12, background: '#fbbf24', border: 'none', color: '#000', fontWeight: 800, cursor: 'pointer' }}>
            Dobara Apply Karo
          </button>
        </motion.div>
      </div>
    );
  }

  // ─── PENDING SCREEN ───
  if (submitted || proStatus === 'pending') {
    return (
      <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', background: '#0f172a', border: '1px solid rgba(251,191,36,0.2)', borderRadius: 32, padding: '60px 48px', maxWidth: 480 }}>
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} style={{ fontSize: 64, marginBottom: 24 }}>⏳</motion.div>
          <h2 style={{ fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 12 }}>Application Submitted!</h2>
          <p style={{ color: '#475569', lineHeight: 1.6 }}>Humari team aapki details verify kar rahi hai. <br/> Dashboard jald hi active hoga.</p>
          <button onClick={() => navigate('/')} style={{ marginTop: 24, padding: '10px 24px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>
            Home Pe Jao
          </button>
        </motion.div>
      </div>
    );
  }

  const inputStyle = {
    width: '100%', 
    padding: '16px 20px', 
    background: 'rgba(255,255,255,0.03)', 
    border: '1px solid rgba(255,255,255,0.08)', 
    borderRadius: 16, 
    color: '#fff', 
    fontSize: '15px', 
    outline: 'none', 
    boxSizing: 'border-box', 
    transition: '0.3s all',
    marginTop: '8px'
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617', fontFamily: "'Segoe UI', sans-serif", overflowX: 'hidden', paddingTop: 80 }}>
      {/* Background Glow */}
      <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px 80px', position: 'relative', zIndex: 1 }}>
        
        {/* Page Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 48 }}>
           <div style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', padding: '6px 16px', borderRadius: 999, display: 'inline-block', fontSize: '12px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 16 }}>
             Expert Registration
           </div>
          <h1 style={{ fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1 }}>
            Apna Kaam <span style={{ color: '#fbbf24' }}>Badhao!</span>
          </h1>
          <p style={{ color: '#475569', marginTop: 12 }}>Pilibhit ke customers se seedha judiye.</p>
        </motion.div>

        {/* Custom Progress Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40, justifyContent: 'center' }}>
          {[1, 2].map((s) => (
            <React.Fragment key={s}>
              <div style={{ 
                width: 40, 
                height: 40, 
                borderRadius: '50%', 
                background: step >= s ? '#fbbf24' : '#0f172a', 
                border: `2px solid ${step >= s ? '#fbbf24' : 'rgba(255,255,255,0.1)'}`, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: 900, 
                color: step >= s ? '#000' : '#475569',
                transition: '0.4s all'
              }}>
                {s}
              </div>
              {s < 2 && <div style={{ width: 80, height: 3, background: step > s ? '#fbbf24' : 'rgba(255,255,255,0.08)', borderRadius: 999 }} />}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
                <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 32, padding: '40px' }}>
                  <h3 style={{ color: '#fff', marginBottom: 24, fontWeight: 800 }}>Select Your Category</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
                    {skills.map((skill) => (
                      <div 
                        key={skill.value} 
                        onClick={() => { setSelectedSkill(skill); setFormData({ ...formData, category: skill.value }); }} 
                        style={{ 
                          padding: '20px 10px', 
                          borderRadius: 20, 
                          cursor: 'pointer', 
                          textAlign: 'center', 
                          transition: '0.2s all',
                          background: selectedSkill?.value === skill.value ? skill.color + '20' : 'rgba(255,255,255,0.02)', 
                          border: `2px solid ${selectedSkill?.value === skill.value ? skill.color : 'rgba(255,255,255,0.05)'}` 
                        }}
                      >
                        <div style={{ fontSize: 32, marginBottom: 8 }}>{skill.icon}</div>
                        <div style={{ fontWeight: 700, color: selectedSkill?.value === skill.value ? '#fff' : '#475569' }}>{skill.value}</div>
                      </div>
                    ))}
                  </div>
                  <button 
                    type="button" 
                    onClick={() => { if (selectedSkill) setStep(2); }} 
                    style={{ 
                      width: '100%', 
                      padding: '18px', 
                      marginTop: 32, 
                      background: selectedSkill ? '#fbbf24' : '#1e293b', 
                      borderRadius: 16, 
                      color: '#000', 
                      fontWeight: 800, 
                      fontSize: '16px',
                      cursor: selectedSkill ? 'pointer' : 'not-allowed',
                      border: 'none'
                    }}
                  >
                    Next: Fill Details →
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="step2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
                <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 32, padding: '40px' }}>
                  
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: 13, color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>💼 Experience *</label>
                    <input style={inputStyle} value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} placeholder="e.g. 5 Years" required />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: 13, color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>🪪 Aadhar Number *</label>
                    <input 
                      style={inputStyle} 
                      type="text" 
                      maxLength="12" 
                      value={formData.aadhar} 
                      onChange={e => setFormData({ ...formData, aadhar: e.target.value.replace(/\D/g, '').slice(0, 12) })} 
                      placeholder="123456789012" 
                      required 
                    />
                    <p style={{ color: '#334155', fontSize: '11px', marginTop: '6px' }}>Private & Secure: Sirf verification ke liye use hoga.</p>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: 13, color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>💰 Price / Rate *</label>
                    <input style={inputStyle} value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="e.g. ₹299/hr" required />
                  </div>
                  
                  <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
                    <button type="button" onClick={() => setStep(1)} style={{ padding: '16px 24px', borderRadius: 16, background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Back</button>
                    <button type="submit" disabled={loading} style={{ flex: 1, padding: '16px', background: '#fbbf24', borderRadius: 16, color: '#000', fontWeight: 900, border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}>
                      {loading ? 'Submitting...' : '🚀 Submit Profile'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Footer info for Onboarding */}
        <div style={{ textAlign: 'center', marginTop: 40, color: '#334155', fontSize: '13px' }}>
          By submitting, you agree to our Terms for Professionals.
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default ProfessionalOnboarding;