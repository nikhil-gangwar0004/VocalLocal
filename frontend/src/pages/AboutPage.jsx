import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, MapPin, Star, Target, Heart, Zap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } })
};

const AboutPage = () => {
  const team = [
    { name: 'Arjun Sharma', role: 'Founder & CEO', avatar: 'AS', color: '#fbbf24', city: 'Pilibhit' },
    { name: 'Priya Verma', role: 'Head of Operations', avatar: 'PV', color: '#3b82f6', city: 'Bareilly' },
    { name: 'Rohit Gupta', role: 'Lead Developer', avatar: 'RG', color: '#22c55e', city: 'Lucknow' },
    { name: 'Neha Singh', role: 'Marketing Head', avatar: 'NS', color: '#ec4899', city: 'Pilibhit' },
  ];

  const values = [
    { icon: <Shield size={22} />, title: 'Trust First', desc: 'Har professional ko verify karke hi platform pe laate hain. Aapki safety hamari pehli zimmedari hai.', color: '#22c55e' },
    { icon: <Heart size={22} />, title: 'Community Love', desc: 'Pilibhit aur aas paas ke har ghar tak quality services pahunchana hamare dil ke kareeb hai.', color: '#ec4899' },
    { icon: <Zap size={22} />, title: 'Fast & Reliable', desc: 'Same day service, quick response — kyunki aapka time bahut qeemti hai.', color: '#fbbf24' },
    { icon: <Award size={22} />, title: 'Quality Guaranteed', desc: 'Kaam se satisfied nahi? 100% refund ya dobara service — koi sawaal nahi.', color: '#3b82f6' },
  ];

  const milestones = [
    { year: '2023', event: 'VocalLocal ki shuruaat Pilibhit se hui', icon: '🚀' },
    { year: '2024', event: '1000+ professionals platform se jude', icon: '🏆' },
    { year: '2024', event: 'Bareilly aur Shahjahanpur mein expansion', icon: '📍' },
    { year: '2025', event: '50,000+ successful bookings complete', icon: '⭐' },
    { year: '2026', event: 'UP ke 200+ cities mein available', icon: '🌟' },
  ];

  return (
    <div style={{ backgroundColor: '#020617', color: '#fff', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", overflowX: 'hidden' }}>

      {/* ─── HERO ─── */}
      <section style={{ padding: '140px 24px 80px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 16px', borderRadius: 999, marginBottom: 28 }}>
          <Heart size={13} color="#fbbf24" />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#94a3b8', textTransform: 'uppercase' }}>Our Story</span>
        </motion.div>

        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
          style={{ fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-2px', marginBottom: 24, maxWidth: 700, margin: '0 auto 24px' }}>
          Pilibhit ke liye,<br />
          <span style={{ color: '#fbbf24', fontStyle: 'italic' }}>Pilibhit ke saath.</span>
        </motion.h1>

        <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
          style={{ color: '#64748b', fontSize: 18, maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.7 }}>
          VocalLocal ek local services platform hai jo Pilibhit aur aas paas ke logon ko trusted professionals se connect karta hai — quickly, safely, aur affordably.
        </motion.p>
      </section>

      {/* ─── MISSION ─── */}
      <section style={{ padding: '60px 24px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 40, alignItems: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Target size={18} color="#fbbf24" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Our Mission</span>
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, letterSpacing: '-1px', marginBottom: 16, lineHeight: 1.1 }}>
              Har Ghar Tak<br />Quality Service
            </h2>
            <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.8 }}>
              Hamara sapna hai ki Pilibhit ka har ghar ek trusted professional se connect ho sake — chahe plumber ki zaroorat ho, electrician ki, ya kuch aur. Koi bhi kaam adhoora na rahe.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { value: '10K+', label: 'Professionals' },
                { value: '50K+', label: 'Customers' },
                { value: '200+', label: 'Cities' },
                { value: '4.9★', label: 'Avg Rating' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '20px 16px', textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#fbbf24', letterSpacing: '-1px' }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: '#475569', marginTop: 4, fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: 60 }}>
            <p style={{ color: '#fbbf24', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>What We Believe</p>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-1px' }}>Hamare Values</h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {values.map((v, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -6 }}
                style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: 28 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: v.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', color: v.color, marginBottom: 18 }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>{v.title}</h3>
                <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.7 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section style={{ padding: '80px 24px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ color: '#fbbf24', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Our Journey</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-1px' }}>Hamara Safar</h2>
          </motion.div>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 2, background: 'rgba(255,255,255,0.06)' }} />
            {milestones.map((m, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                style={{ display: 'flex', gap: 24, marginBottom: 32, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#0f172a', border: '2px solid rgba(251,191,36,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, position: 'relative', zIndex: 1 }}>
                  {m.icon}
                </div>
                <div style={{ paddingTop: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#fbbf24', letterSpacing: '0.1em' }}>{m.year}</span>
                  <p style={{ color: '#94a3b8', fontSize: 14, marginTop: 4, lineHeight: 1.6 }}>{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: 60 }}>
            <p style={{ color: '#fbbf24', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>The People</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-1px' }}>Hamari Team</h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
            {team.map((t, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -6 }}
                style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '28px 20px', textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: t.color + '20', border: `2px solid ${t.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 20, color: t.color, margin: '0 auto 16px' }}>
                  {t.avatar}
                </div>
                <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: '#475569', marginBottom: 8 }}>{t.role}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center', color: '#334155', fontSize: 11 }}>
                  <MapPin size={10} /> {t.city}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: '80px 24px 100px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', background: 'linear-gradient(135deg, #0f172a, #1e293b)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: 28, padding: '52px 40px', textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 900, marginBottom: 14, letterSpacing: '-1px' }}>
              Hamare Saath <span style={{ color: '#fbbf24' }}>Judo!</span>
            </h2>
            <p style={{ color: '#475569', fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>
              Chahe customer ho ya professional — VocalLocal pe sabke liye jagah hai.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '13px 28px', borderRadius: 999, background: '#fbbf24', border: 'none', fontWeight: 800, fontSize: 14, cursor: 'pointer', color: '#000' }}>
                  Sign Up Free →
                </button>
              </Link>
              <Link to="/services" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '13px 28px', borderRadius: 999, background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', fontWeight: 700, fontSize: 14, cursor: 'pointer', color: '#94a3b8' }}>
                  Services Dekho
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;