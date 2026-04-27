import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://vocallocal-lrje.onrender.com/api'; // ✅ Render URL

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputStyle = {
    width: '100%', padding: '13px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12, color: '#fff', fontSize: 15,
    outline: 'none', boxSizing: 'border-box',
  };

  const btnStyle = {
    width: '100%', padding: '14px',
    background: '#fbbf24', border: 'none',
    borderRadius: 12, color: '#000',
    fontWeight: 800, fontSize: 15, cursor: 'pointer',
    marginTop: 16,
  };

  const sendOtp = async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMsg('OTP bhej diya gaya! Email check karo 📧');
      setStep(2);
    } catch (err) {
      setError(err.message || 'Kuch error aaya');
    } finally { setLoading(false); }
  };

  const verifyOtp = async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMsg('OTP verified! ✅');
      setStep(3);
    } catch (err) {
      setError(err.message || 'Invalid OTP');
    } finally { setLoading(false); }
  };

  const resetPass = async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMsg('Password reset ho gaya! 🎉 Login karo ab.');
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      setError(err.message || 'Kuch error aaya');
    } finally { setLoading(false); }
  };

  return (
    <div style={{
      backgroundColor: '#020617', minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: 24
    }}>
      <div style={{
        background: '#0f172a',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 24, padding: 36,
        width: '100%', maxWidth: 420
      }}>

        <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 24, marginBottom: 6 }}>
          Forgot Password 🔐
        </h2>
        <p style={{ color: '#475569', fontSize: 14, marginBottom: 28 }}>
          {step === 1 && 'Apna registered email daalo'}
          {step === 2 && `OTP bheja gaya: ${email}`}
          {step === 3 && 'Naya password set karo'}
        </p>

        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, flex: s < 3 ? 1 : 'unset' }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: step >= s ? '#fbbf24' : 'rgba(255,255,255,0.05)',
                border: `2px solid ${step >= s ? '#fbbf24' : 'rgba(255,255,255,0.1)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 13,
                color: step >= s ? '#000' : '#334155',
              }}>{s}</div>
              {s < 3 && <div style={{ flex: 1, height: 2, background: step > s ? '#fbbf24' : 'rgba(255,255,255,0.06)', borderRadius: 999 }} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <input style={inputStyle} placeholder="Email address" value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendOtp()} />
        )}

        {step === 2 && (
          <input style={{ ...inputStyle, letterSpacing: 8, fontSize: 20, textAlign: 'center' }}
            placeholder="- - - - - -" value={otp} maxLength={6}
            onChange={e => setOtp(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && verifyOtp()} />
        )}

        {step === 3 && (
          <input type="password" style={inputStyle}
            placeholder="Naya password (min 6 characters)" value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && resetPass()} />
        )}

        {step === 1 && (
          <button style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }} onClick={sendOtp} disabled={loading}>
            {loading ? 'Bhej raha hai...' : 'Send OTP →'}
          </button>
        )}
        {step === 2 && (
          <button style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }} onClick={verifyOtp} disabled={loading}>
            {loading ? 'Verify ho raha hai...' : 'Verify OTP →'}
          </button>
        )}
        {step === 3 && (
          <button style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }} onClick={resetPass} disabled={loading}>
            {loading ? 'Reset ho raha hai...' : 'Reset Password ✓'}
          </button>
        )}

        {error && <p style={{ color: '#ef4444', fontSize: 13, marginTop: 12, textAlign: 'center' }}>❌ {error}</p>}
        {msg && <p style={{ color: '#22c55e', fontSize: 13, marginTop: 12, textAlign: 'center' }}>✅ {msg}</p>}

        <p style={{ color: '#475569', fontSize: 13, textAlign: 'center', marginTop: 24 }}>
          Yaad aa gaya?{' '}
          <span onClick={() => navigate('/login')}
            style={{ color: '#fbbf24', cursor: 'pointer', fontWeight: 700 }}>
            Login karo
          </span>
        </p>

      </div>
    </div>
  );
}