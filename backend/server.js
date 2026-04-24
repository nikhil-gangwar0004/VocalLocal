const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// MongoDB connect
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // React frontend
  credentials: true
}));
app.use(express.json());

// Routes
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