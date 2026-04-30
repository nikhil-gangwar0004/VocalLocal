const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// MongoDB connect
connectDB();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://vocal-local.vercel.app',
    'https://vocal-local-git-main-nikhils-projects-1c4bdb3d.vercel.app',
    'https://vocal-local-5uykmqpu4-nikhils-projects-1c4bdb3d.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// ─── RATE LIMITERS ───

// 1. Login/Register — 10 tries in 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Bahut zyada login attempts! 15 minute baad try karo.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// 2. OTP/Forgot Password — 5 tries in 15 minutes
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Bahut zyada OTP requests! 15 minute baad try karo.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// 3. Booking — 20 bookings in 1 hour
const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { message: 'Bahut zyada booking requests! 1 ghante baad try karo.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// 4. General API — 100 requests in 15 minutes
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Bahut zyada requests! Thodi der baad try karo.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── RATE LIMITING APPLY ───
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/auth/forgot-password', otpLimiter);
app.use('/api/auth/verify-otp', otpLimiter);
app.use('/api/auth/reset-password', otpLimiter);
app.use('/api/bookings', bookingLimiter);
app.use('/api', generalLimiter);

// ─── ROUTES ───
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/services', require('./routes/services'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'VocalLocal Backend Running! 🚀' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});