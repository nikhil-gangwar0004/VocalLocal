const mongoose = require('mongoose');

const professionalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }, // Plumber, Electrician, etc.
  rating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  jobs: { type: Number, default: 0 },
  location: { type: String, default: 'Pilibhit, UP' },
  phone: { type: String, default: '' },
  price: { type: String, default: '₹299/hr' },
  exp: { type: String, default: '1 yr' },
  available: { type: Boolean, default: true },
  avatar: { type: String, default: '' },
  color: { type: String, default: '#3b82f6' },
  skills: [{ type: String }],
  bio: { type: String, default: '' },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Professional', professionalSchema);