import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Search, Wrench, Zap, Car, ShieldCheck, ArrowRight,
  Star, MapPin, CheckCircle, ChevronDown,
  Paintbrush, Scissors, Wind, Hammer
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
  })
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");
  const navigate = useNavigate();

  const categories = [
    { name: 'Plumber',     icon: <Wrench size={22} />,     desc: 'Pipe leaks & fittings',  color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
    { name: 'Electrician', icon: <Zap size={22} />,         desc: 'Wiring & Appliances',    color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
    { name: 'Mechanic',    icon: <Car size={22} />,         desc: 'Car & Bike Repair',      color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
    { name: 'Painter',     icon: <Paintbrush size={22} />, desc: 'Wall & Home Painting',   color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
    { name: 'Carpenter',   icon: <Hammer size={22} />,     desc: 'Furniture & Woodwork',   color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
    { name: 'AC Repair',   icon: <Wind size={22} />,       desc: 'AC Service & Repair',    color: '#06b6d4', bg: 'rgba(6,182,212,0.12)' },
    { name: 'Salon',       icon: <Scissors size={22} />,   desc: 'Home Beauty Services',   color: '#ec4899', bg: 'rgba(236,72,153,0.12)' },
    { name: 'Handyman',    icon: <Hammer size={22} />,     desc: 'General Home Repairs',   color: '#f97316', bg: 'rgba(249,115,22,0.12)' },
  ];

  const professionals = [
    { name: 'Ramesh Kumar',  role: 'Plumber',     rating: 4.9, jobs: 312, location: 'Pilibhit',     avatar: 'RK', color: '#3b82f6', exp: '8 yrs' },
    { name: 'Suresh Verma',  role: 'Electrician', rating: 4.8, jobs: 245, location: 'Bareilly',     avatar: 'SV', color: '#f59e0b', exp: '5 yrs' },
    { name: 'Anil Sharma',   role: 'Mechanic',    rating: 4.7, jobs: 189, location: 'Pilibhit',     avatar: 'AS', color: '#ef4444', exp: '10 yrs' },
    { name: 'Priya Singh',   role: 'Salon',       rating: 5.0, jobs: 420, location: 'Shahjahanpur', avatar: 'PS', color: '#ec4899', exp: '6 yrs' },
  ];

  const stats = [
    { value: '10,000+', label: 'Verified Experts' },
    { value: '50,000+', label: 'Happy Customers' },
    { value: '200+',    label: 'Cities Covered' },
    { value: '4.9★',    label: 'Average Rating' },
  ];

  const howItWorks = [
    { step: '01', title: 'Search Service',  desc: 'Type what you need — plumber, electrician, mechanic and more.' },
    { step: '02', title: 'Choose Expert',   desc: 'See ratings, reviews and prices. Pick the best fit for you.' },
    { step: '03', title: 'Book Instantly',  desc: 'Schedule at your convenience. Same-day slots available.' },
    { step: '04', title: 'Job Done ✓',      desc: 'Expert arrives, work gets done. Pay only when satisfied.' },
  ];

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // ✅ Handle newsletter subscription
  const handleSubscribe = () => {
    // Clear previous messages
    setEmailError("");
    setEmailSuccess("");
    
    // Check if email is empty
    if (!email.trim()) {
      setEmailError("❌ Please enter your email address first!");
      setTimeout(() => setEmailError(""), 3000);
      return;
    }
    
    // Check if email is valid format
    if (!validateEmail(email)) {
      setEmailError("❌ Please enter a valid email address (e.g., name@example.com)!");
      setTimeout(() => setEmailError(""), 3000);
      return;
    }
    
    // If valid - show success message
    setEmailSuccess("✅ Thank you for subscribing! You'll receive updates from us.");
    setEmail(""); // Clear input field
    
    // Hide success message after 3 seconds
    setTimeout(() => setEmailSuccess(""), 3000);
  };

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ backgroundColor: '#020617', color: '#fff', fontFamily: "'Segoe UI', sans-serif", overflowX: 'hidden' }}>

      {/* ─── HERO ─── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 16px', borderRadius: 999, marginBottom: 32 }}>
          <ShieldCheck size={14} color="#fbbf24" />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#94a3b8', textTransform: 'uppercase' }}>Verified Local Professionals</span>
        </motion.div>

        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
          style={{ fontSize: 'clamp(52px, 10vw, 96px)', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-2px', marginBottom: 24, maxWidth: 800 }}>
          Find Experts<br />
          <span style={{ color: '#fbbf24', fontStyle: 'italic' }}>Fast & Easy.</span>
        </motion.h1>

        <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
          style={{ color: '#64748b', fontSize: 18, maxWidth: 480, marginBottom: 48, lineHeight: 1.6 }}>
          Hire trusted local professionals in Pilibhit, UP — plumbers, electricians, mechanics & more at your doorstep.
        </motion.p>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}
          style={{ width: '100%', maxWidth: 560, display: 'flex', borderRadius: 999, overflow: 'hidden', boxShadow: '0 0 60px rgba(251,191,36,0.2)', border: '2px solid rgba(251,191,36,0.3)' }}>
          <input
            type="text"
            placeholder="Search: plumber, electrician..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, padding: '18px 24px', fontSize: 16, fontWeight: 600, backgroundColor: '#0f172a', color: '#fff', border: 'none', outline: 'none' }}
          />
          <button style={{ backgroundColor: '#fbbf24', padding: '18px 24px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15, color: '#000' }}>
            <Search size={20} /> Search
          </button>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}
          style={{ display: 'flex', gap: 24, marginTop: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Free Booking', 'Verified Pros', 'Same Day Service'].map((tag) => (
            <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569', fontSize: 13 }}>
              <CheckCircle size={14} color="#22c55e" /> {tag}
            </div>
          ))}
        </motion.div>

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          style={{ position: 'absolute', bottom: 32, color: '#334155', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, fontSize: 12 }}>
          <span>Scroll</span><ChevronDown size={16} />
        </motion.div>
      </section>

      {/* ─── STATS ─── */}
      <section style={{ padding: '64px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32, textAlign: 'center' }}>
          {stats.map((s, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <div style={{ fontSize: 40, fontWeight: 900, color: '#fbbf24', letterSpacing: '-1px' }}>{s.value}</div>
              <div style={{ color: '#475569', fontSize: 13, marginTop: 4 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ color: '#fbbf24', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>What do you need?</p>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-1px' }}>Browse by Category</h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {filteredCategories.length > 0 ? filteredCategories.map((cat, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => handleNavigation(`/services?category=${cat.name}`)}
                style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: 28, cursor: 'pointer', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = cat.color}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cat.color, marginBottom: 16 }}>
                  {cat.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>{cat.name}</h3>
                <p style={{ color: '#475569', fontSize: 13, marginBottom: 16 }}>{cat.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fbbf24', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Explore Now <ArrowRight size={12} />
                </div>
              </motion.div>
            )) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '64px 0', color: '#334155' }}>
                <p style={{ fontSize: 18, fontWeight: 700 }}>"{searchTerm}" ke liye koi service nahi mili</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* ─── HOW IT WORKS ─── */}
      <section style={{ padding: '100px 24px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ color: '#fbbf24', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Simple Process</p>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-1px' }}>How It Works</h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
            {howItWorks.map((step, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                style={{ textAlign: 'center', padding: '32px 20px' }}>
                <div style={{ fontSize: 48, fontWeight: 900, color: 'rgba(251,191,36,0.15)', letterSpacing: '-2px', marginBottom: 16 }}>{step.step}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>{step.title}</h3>
                <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.6 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROFESSIONALS ─── */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ color: '#fbbf24', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Top Rated</p>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-1px' }}>Featured Professionals</h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 24 }}>
            {professionals.map((pro, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -6 }}
                style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: 28, cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: pro.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, flexShrink: 0 }}>
                    {pro.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 16 }}>{pro.name}</div>
                    <div style={{ color: '#475569', fontSize: 13 }}>{pro.role}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#fbbf24', fontWeight: 700, fontSize: 14 }}>
                    <Star size={14} fill="#fbbf24" /> {pro.rating}
                  </div>
                  <div style={{ color: '#475569', fontSize: 13 }}>{pro.jobs} jobs</div>
                  <div style={{ color: '#475569', fontSize: 13 }}>{pro.exp}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#334155', fontSize: 12, marginBottom: 20 }}>
                  <MapPin size={12} /> {pro.location}
                </div>

                <button style={{ width: '100%', padding: '12px', borderRadius: 12, background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24', fontWeight: 700, fontSize: 13, cursor: 'pointer', letterSpacing: '0.05em' }}>
                  Book Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER (With Working Newsletter Validation) ─── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '40px 24px', textAlign: 'center' }}>
        
        {/* Extra 4-Column Grid */}
        <div style={{ maxWidth: 1100, margin: '0 auto 40px auto', textAlign: 'left' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: 32,
            marginBottom: 32
          }}>
            
            {/* Column 1: Quick Links */}
            <div>
              <h4 style={{ color: '#fbbf24', fontSize: 14, fontWeight: 800, marginBottom: 16, letterSpacing: '0.1em' }}>QUICK LINKS</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  { label: 'About Us', path: '/about' },
                  { label: 'Services', path: '/services' },
                  { label: 'Become an Expert', path: '/become-expert' },
                  { label: 'Contact Us', path: '/contact' },
                  { label: 'Blog', path: '/blog' }
                ].map((link, i) => (
                  <li key={i} style={{ marginBottom: 10 }}>
                    <button
                      onClick={() => handleNavigation(link.path)}
                      style={{ 
                        background: 'none', border: 'none', 
                        color: '#64748b', fontSize: 13, cursor: 'pointer', 
                        transition: '0.2s', display: 'inline-block',
                        padding: 0
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#fbbf24'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Column 2: Contact Info */}
            <div>
              <h4 style={{ color: '#fbbf24', fontSize: 14, fontWeight: 800, marginBottom: 16, letterSpacing: '0.1em' }}>CONTACT US</h4>
              <p style={{ color: '#64748b', fontSize: 13, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>📧</span> nikhilgangwarnikhil491@gmail.com
              </p>
              <p style={{ color: '#64748b', fontSize: 13, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>📞</span> +91 98765 43210
              </p>
              <p style={{ color: '#64748b', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>📍</span> Pilibhit, Uttar Pradesh
              </p>
            </div>
            
            {/* Column 3: Newsletter - ✅ With Validation */}
            <div>
              <h4 style={{ color: '#fbbf24', fontSize: 14, fontWeight: 800, marginBottom: 16, letterSpacing: '0.1em' }}>STAY UPDATED</h4>
              
              {/* Error Message */}
              {emailError && (
                <div style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: 8,
                  padding: '8px 12px',
                  marginBottom: 12,
                  fontSize: 12,
                  color: '#ef4444',
                  textAlign: 'center'
                }}>
                  {emailError}
                </div>
              )}
              
              {/* Success Message */}
              {emailSuccess && (
                <div style={{
                  background: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.3)',
                  borderRadius: 8,
                  padding: '8px 12px',
                  marginBottom: 12,
                  fontSize: 12,
                  color: '#22c55e',
                  textAlign: 'center'
                }}>
                  {emailSuccess}
                </div>
              )}
              
              <div style={{ display: 'flex', marginBottom: 16, borderRadius: 999, overflow: 'hidden', border: '1px solid #334155' }}>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ flex: 1, padding: '10px 14px', background: '#0f172a', border: 'none', color: '#fff', outline: 'none', fontSize: 12 }}
                />
                <button 
                  onClick={handleSubscribe}
                  style={{ background: '#fbbf24', border: 'none', padding: '0 16px', fontWeight: 700, cursor: 'pointer', color: '#000', fontSize: 12 }}>
                  Subscribe
                </button>
              </div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-start' }}>
                {['📘', '🐦', '📸', '💼'].map((icon, i) => (
                  <span key={i} style={{ fontSize: 18, cursor: 'pointer', opacity: 0.7, transition: '0.2s', display: 'inline-block' }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = 0.7; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    {icon}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Column 4: Thank You Message */}
            <div>
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(251,191,36,0.02) 100%)',
                border: '1px solid rgba(251,191,36,0.15)',
                borderRadius: 16,
                padding: '16px 12px',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: 11, color: '#64748b', marginBottom: 6 }}>🙏 THANK YOU FOR VISITING</p>
                <p style={{ fontSize: 18, fontWeight: 800, color: '#fbbf24', letterSpacing: '-0.5px', marginBottom: 4 }}>
                  Nikhil Gangwar
                </p>
                <p style={{ fontSize: 10, color: '#475569' }}>
                  ❤️ Making Pilibhit better, one service at a time
                </p>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '24px 0' }}></div>
        </div>
        
        {/* Original Footer Content */}
        <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>
          <span style={{ color: '#fff' }}>Vocal</span><span style={{ color: '#fbbf24' }}>Local</span>
        </div>
        <p style={{ fontSize: 13, color: '#334155' }}>© 2026 VocalLocal. Pilibhit, UP. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;