import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Plus, Trash2, CheckCircle, X,
  ClipboardList, TrendingUp, Zap, Briefcase,
  Activity, Clock, UserCheck, AlertCircle
} from 'lucide-react';
import {
  getProfessionals, deleteProfessional, addProfessional,
  getAllBookings, updateBookingStatus, approveExpert
} from '../services/api';

// ─── Pending Applications API ───
const getPendingApplications = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:5000/api/auth/admin/pending-pros', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

const rejectApplication = async (id) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`http://localhost:5000/api/auth/admin/reject-pro/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

const AdminDashboard = () => {
  const [pros, setPros] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [pendingApps, setPendingApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState('bookings'); // bookings | applications
  const [newPro, setNewPro] = useState({
    name: '', role: 'Plumber', price: '₹299/hr',
    location: 'Pilibhit, UP', exp: '1 yr', available: true, color: '#3b82f6'
  });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [prosData, bookingsData, appsData] = await Promise.all([
        getProfessionals(),
        getAllBookings(),
        getPendingApplications(),
      ]);
      setPros(prosData);
      setBookings(bookingsData);
      setPendingApps(appsData);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    await updateBookingStatus(id, status);
    loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Expert ko platform se hatana hai?')) {
      await deleteProfessional(id);
      loadData();
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    await addProfessional(newPro);
    setShowAddForm(false);
    loadData();
  };

  const handleApprove = async (id) => {
    try {
      await approveExpert(id);
      alert('✅ Expert approved! Ab woh professional ban gaye hain.');
      loadData();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleReject = async (id) => {
    if (window.confirm('Application reject karni hai?')) {
      await rejectApplication(id);
      loadData();
    }
  };

  const inputStyle = {
    padding: '14px 18px', background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 14, color: '#fff', outline: 'none', width: '100%',
    boxSizing: 'border-box',
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <motion.div whileHover={{ y: -4 }} style={{
      background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 20, padding: 24,
    }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, marginBottom: 14 }}>
        <Icon size={20} />
      </div>
      <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>{value}</div>
      <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginTop: 4 }}>{label}</div>
    </motion.div>
  );

  return (
    <div style={{ backgroundColor: '#020617', color: '#fff', minHeight: '100vh', padding: '100px 24px 60px', fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fbbf24', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
              <Activity size={14} /> System Live
            </div>
            <h1 style={{ fontSize: 40, fontWeight: 900, letterSpacing: '-1.5px' }}>
              Admin <span style={{ color: '#fbbf24' }}>Dashboard</span>
            </h1>
          </div>
          <button onClick={() => setShowAddForm(!showAddForm)} style={{
            background: '#fbbf24', color: '#000', padding: '14px 24px', borderRadius: 14,
            border: 'none', fontWeight: 800, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8, fontSize: 14,
          }}>
            {showAddForm ? <X size={18} /> : <Plus size={18} />}
            {showAddForm ? 'Close' : 'Add Expert'}
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
          <StatCard icon={Users} label="Total Experts" value={pros.length} color="#3b82f6" />
          <StatCard icon={Clock} label="Pending Bookings" value={bookings.filter(b => b.status === 'pending').length} color="#fbbf24" />
          <StatCard icon={CheckCircle} label="Completed Jobs" value={bookings.filter(b => b.status === 'completed').length} color="#22c55e" />
          <StatCard icon={AlertCircle} label="Pending Applications" value={pendingApps.length} color="#ef4444" />
        </div>

        {/* Add Expert Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.form initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleAddSubmit}
              style={{ background: '#0f172a', padding: 28, borderRadius: 24, border: '1px solid rgba(251,191,36,0.2)', marginBottom: 32 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20, color: '#fff' }}>➕ Naya Professional Add Karo</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                <input style={inputStyle} placeholder="Full Name" required onChange={e => setNewPro({ ...newPro, name: e.target.value })} />
                <select style={{ ...inputStyle, cursor: 'pointer' }} onChange={e => setNewPro({ ...newPro, role: e.target.value })}>
                  {['Plumber', 'Electrician', 'Mechanic', 'Carpenter', 'Painter', 'AC Repair', 'Salon'].map(r => (
                    <option key={r} value={r} style={{ background: '#0f172a' }}>{r}</option>
                  ))}
                </select>
                <input style={inputStyle} placeholder="Price (e.g. ₹299/hr)" onChange={e => setNewPro({ ...newPro, price: e.target.value })} />
                <input style={inputStyle} placeholder="Experience (e.g. 5 yrs)" onChange={e => setNewPro({ ...newPro, exp: e.target.value })} />
              </div>
              <button type="submit" style={{ marginTop: 16, background: '#fbbf24', color: '#000', padding: '14px 32px', borderRadius: 12, border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: 15 }}>
                ✓ Register Professional
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: 4, background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 4, marginBottom: 24, width: 'fit-content' }}>
          {[
            { id: 'bookings', label: '📋 Live Bookings', count: bookings.length },
            { id: 'applications', label: '🧑‍🔧 Pending Applications', count: pendingApps.length },
            { id: 'experts', label: '👥 All Experts', count: pros.length },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: '10px 18px', borderRadius: 10, border: 'none',
              background: activeTab === tab.id ? '#fbbf24' : 'transparent',
              color: activeTab === tab.id ? '#000' : '#475569',
              fontWeight: activeTab === tab.id ? 700 : 600,
              fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {tab.label}
              {tab.count > 0 && (
                <span style={{
                  background: activeTab === tab.id ? 'rgba(0,0,0,0.2)' : 'rgba(251,191,36,0.2)',
                  color: activeTab === tab.id ? '#000' : '#fbbf24',
                  borderRadius: 999, padding: '2px 8px', fontSize: 11, fontWeight: 800,
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ─── BOOKINGS TAB ─── */}
        {activeTab === 'bookings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ background: '#0f172a', borderRadius: 24, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <ClipboardList size={18} color="#fbbf24" />
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>Live Bookings</h3>
            </div>
            <div style={{ maxHeight: 500, overflowY: 'auto' }}>
              {bookings.length === 0 ? (
                <div style={{ padding: 40, textAlign: 'center', color: '#475569' }}>Koi booking nahi hai</div>
              ) : bookings.map(b => (
                <div key={b._id} style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{b.user?.name || 'Customer'}</div>
                    <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>{b.service} • {b.date} at {b.time}</div>
                    <div style={{ fontSize: 11, color: '#334155', marginTop: 2 }}>{b.address}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 6,
                      background: b.status === 'completed' ? 'rgba(34,197,94,0.1)' : b.status === 'cancelled' ? 'rgba(239,68,68,0.1)' : 'rgba(251,191,36,0.1)',
                      color: b.status === 'completed' ? '#22c55e' : b.status === 'cancelled' ? '#ef4444' : '#fbbf24',
                    }}>
                      {b.status.toUpperCase()}
                    </span>
                    {b.status === 'pending' && (
                      <button onClick={() => handleStatusUpdate(b._id, 'completed')}
                        style={{ background: 'rgba(34,197,94,0.1)', border: 'none', color: '#22c55e', padding: '8px 12px', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <CheckCircle size={14} /> Complete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── PENDING APPLICATIONS TAB ─── */}
        {activeTab === 'applications' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {pendingApps.length === 0 ? (
              <div style={{ background: '#0f172a', borderRadius: 24, border: '1px solid rgba(255,255,255,0.06)', padding: 48, textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <p style={{ color: '#475569', fontSize: 15 }}>Koi pending application nahi hai!</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 16 }}>
                {pendingApps.map(app => (
                  <motion.div key={app._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    style={{ background: '#0f172a', border: '1px solid rgba(251,191,36,0.15)', borderRadius: 20, padding: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>

                      {/* Left — User Info */}
                      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 20, color: '#000', flexShrink: 0 }}>
                          {app.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: 16, color: '#fff' }}>{app.name}</div>
                          <div style={{ fontSize: 13, color: '#475569' }}>{app.email}</div>
                          {app.phone && <div style={{ fontSize: 12, color: '#334155', marginTop: 2 }}>📞 {app.phone}</div>}
                        </div>
                      </div>

                      {/* Right — Action Buttons */}
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={() => handleApprove(app._id)} style={{
                          padding: '10px 20px', borderRadius: 12,
                          background: '#22c55e', border: 'none',
                          color: '#000', fontWeight: 800, fontSize: 13,
                          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                        }}>
                          <UserCheck size={15} /> Approve ✓
                        </button>
                        <button onClick={() => handleReject(app._id)} style={{
                          padding: '10px 20px', borderRadius: 12,
                          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                          color: '#ef4444', fontWeight: 700, fontSize: 13,
                          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                        }}>
                          <X size={14} /> Reject
                        </button>
                      </div>
                    </div>

                    {/* Application Details */}
                    <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
                      {[
                        { label: '🛠️ Skill', value: app.proDetails?.category },
                        { label: '💼 Experience', value: app.proDetails?.experience },
                        { label: '💰 Price', value: app.proDetails?.price },
                        { label: '🪪 Aadhar', value: app.proDetails?.aadhar ? '****' + app.proDetails.aadhar.slice(-4) : 'N/A' },
                      ].map(item => (
                        <div key={item.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 14px' }}>
                          <div style={{ fontSize: 11, color: '#475569', marginBottom: 4 }}>{item.label}</div>
                          <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{item.value || '—'}</div>
                        </div>
                      ))}
                    </div>

                    {/* Pending Badge */}
                    <div style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: 999, padding: '4px 12px' }}>
                      <Clock size={12} color="#fbbf24" />
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#fbbf24' }}>Awaiting Approval</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ─── EXPERTS TAB ─── */}
        {activeTab === 'experts' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ background: '#0f172a', borderRadius: 24, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Zap size={18} color="#fbbf24" />
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>All Experts</h3>
            </div>
            <div style={{ maxHeight: 500, overflowY: 'auto' }}>
              {pros.map(p => (
                <div key={p._id} style={{ padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: (p.color || '#3b82f6') + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: p.color || '#3b82f6' }}>
                      {p.name?.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: '#475569' }}>{p.role} • {p.location}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#fbbf24' }}>{p.price}</span>
                    <button onClick={() => handleDelete(p._id)}
                      style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: '#ef4444', padding: '8px 10px', borderRadius: 10, cursor: 'pointer' }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      <style>{`::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }`}</style>
    </div>
  );
};

export default AdminDashboard;