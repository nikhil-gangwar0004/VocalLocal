import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle, Clock, Globe } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } })
};

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const update = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setError('Name, Email aur Message zaroori hai!'); return; }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setSent(true);
  };

  const contacts = [
    { icon: <Phone size={20} />, label: 'Phone', value: '+91 98765 43210', sub: 'Mon-Sat, 9AM - 7PM', color: '#22c55e' },
    { icon: <Mail size={20} />, label: 'Email', value: 'support@vocallocal.in', sub: '24 ghante mein reply', color: '#3b82f6' },
    { icon: <MapPin size={20} />, label: 'Office', value: 'Pilibhit, Uttar Pradesh', sub: '262001, India', color: '#fbbf24' },
    { icon: <Clock size={20} />, label: 'Working Hours', value: 'Mon - Sat', sub: '9:00 AM - 7:00 PM', color: '#a855f7' },
  ];

  const faqs = [
    { q: 'Kya VocalLocal free hai?', a: 'Haan! Customer ke liye bilkul free hai. Professional registration bhi free hai.' },
    { q: 'Service cancel kaise karein?', a: 'Booking ke 2 ghante pehle tak cancel kar sakte ho — koi charge nahi.' },
    { q: 'Payment kab karna hota hai?', a: 'Kaam complete hone ke baad hi payment karni hoti hai. Pehle nahi.' },
    { q: 'Professional verified hain?', a: 'Haan, sabhi professionals ID verification aur background check ke baad hi platform pe aate hain.' },
  ];

  const inputStyle = {
    width: '100%', padding: '13px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12, color: '#fff', fontSize: 15,
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{ backgroundColor: '#020617', color: '#fff', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", overflowX: 'hidden' }}>

      {/* ─── HERO ─── */}
      <section style={{ padding: '130px 24px 60px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translateX(-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 16px', borderRadius: 999, marginBottom: 24 }}>
          <MessageCircle size={13} color="#fbbf24" />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#94a3b8', textTransform: 'uppercase' }}>Get In Touch</span>
        </motion.div>
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
          style={{ fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-2px', marginBottom: 20 }}>
          Hum Yahan Hain<br />
          <span style={{ color: '#fbbf24', fontStyle: 'italic' }}>Aapke Liye!</span>
        </motion.h1>
        <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
          style={{ color: '#64748b', fontSize: 16, maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
          Koi bhi sawaal ho, problem ho ya feedback — humse baat karo. Hum 24 ghante ke andar reply karte hain.
        </motion.p>
      </section>

      {/* ─── CONTACT INFO CARDS ─── */}
      <section style={{ padding: '20px 24px 60px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 16 }}>
          {contacts.map((c, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              whileHover={{ y: -4 }}
              style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '24px 20px' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: c.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color, marginBottom: 14 }}>
                {c.icon}
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{c.label}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 4 }}>{c.value}</div>
              <div style={{ fontSize: 12, color: '#334155' }}>{c.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── FORM + FAQ ─── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>

          {/* Contact Form */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 32 }}>
              <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 6, letterSpacing: '-0.5px' }}>Message Bhejo</h2>
              <p style={{ color: '#475569', fontSize: 13, marginBottom: 28 }}>Hum jaldi se jaldi reply karenge!</p>

              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '2px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <CheckCircle size={28} color="#22c55e" />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Message Bhej Diya! ✓</h3>
                  <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.6 }}>
                    Shukriya! Humari team 24 ghante mein aapko reply karegi.
                  </p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                    style={{ marginTop: 20, padding: '10px 24px', borderRadius: 10, background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)', color: '#fbbf24', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                    Dobara Bhejo
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Name *</label>
                      <input type="text" placeholder="Aapka naam" value={form.name} onChange={update('name')} style={inputStyle}
                        onFocus={e => e.target.style.borderColor = 'rgba(251,191,36,0.4)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Phone</label>
                      <input type="tel" placeholder="+91..." value={form.phone} onChange={update('phone')} style={inputStyle}
                        onFocus={e => e.target.style.borderColor = 'rgba(251,191,36,0.4)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Email *</label>
                    <input type="email" placeholder="aap@example.com" value={form.email} onChange={update('email')} style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(251,191,36,0.4)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Subject</label>
                    <select value={form.subject} onChange={update('subject')} style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option value="" style={{ background: '#0f172a' }}>Topic select karein</option>
                      <option value="booking" style={{ background: '#0f172a' }}>Booking Issue</option>
                      <option value="payment" style={{ background: '#0f172a' }}>Payment Problem</option>
                      <option value="professional" style={{ background: '#0f172a' }}>Professional se Issue</option>
                      <option value="suggestion" style={{ background: '#0f172a' }}>Suggestion / Feedback</option>
                      <option value="other" style={{ background: '#0f172a' }}>Kuch Aur</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Message *</label>
                    <textarea placeholder="Aapka sawaal ya feedback likhein..." rows={4} value={form.message} onChange={update('message')}
                      style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
                      onFocus={e => e.target.style.borderColor = 'rgba(251,191,36,0.4)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                  </div>

                  {error && (
                    <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '10px 14px', color: '#f87171', fontSize: 13, marginBottom: 16 }}>
                      {error}
                    </div>
                  )}

                  <button type="submit" disabled={loading} style={{
                    width: '100%', padding: '14px',
                    background: loading ? '#92400e' : '#fbbf24',
                    border: 'none', borderRadius: 12,
                    color: '#000', fontWeight: 800, fontSize: 15,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'all 0.2s',
                  }}>
                    {loading ? (
                      <div style={{ width: 18, height: 18, border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                    ) : <><Send size={15} /> Message Bhejo</>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 24, letterSpacing: '-0.5px' }}>
              Aksar Pooche Gaye<br />
              <span style={{ color: '#fbbf24' }}>Sawal (FAQ)</span>
            </h2>

            {faqs.map((faq, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '20px 22px', marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 8 }}>{faq.q}</div>
                <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.7 }}>{faq.a}</div>
              </motion.div>
            ))}

            {/* Social Links */}
            <div style={{ marginTop: 28, background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Social Media</p>
              <div style={{ display: 'flex', gap: 12 }}>
                {[
                  { icon: '📸', label: 'Instagram', color: '#ec4899' },
                  { icon: '🐦', label: 'Twitter', color: '#3b82f6' },
                  { icon: '👍', label: 'Facebook', color: '#4267B2' },
                ].map((s) => (
                  <button key={s.label} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '10px 16px', borderRadius: 10,
                    background: s.color + '15',
                    border: `1px solid ${s.color}30`,
                    color: s.color, fontWeight: 700, fontSize: 13, cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}>
                    <span style={{ fontSize: 16 }}>{s.icon}</span> {s.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: #334155; }
        select option { background: #0f172a; color: #fff; }
      `}</style>
    </div>
  );
};

export default ContactPage;