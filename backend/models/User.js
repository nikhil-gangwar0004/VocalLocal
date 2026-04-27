const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name zaroori hai'], trim: true },
  email: { 
    type: String, 
    required: [true, 'Email zaroori hai'], 
    unique: true, 
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    lowercase: true, 
    trim: true 
  },
  password: { type: String, required: [true, 'Password zaroori hai'], minlength: 6 },
  phone: { 
    type: String, 
    required: true,
    match: [/^[6-9]\d{9}$/, 'Please fill a valid 10-digit mobile number'] 
  },
  location: { type: String, default: 'Pilibhit, UP' },
  role: { 
    type: String, 
    enum: ['customer', 'professional', 'admin'], 
    default: 'customer' 
  },
  isVerifiedPro: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: true }, 
  proDetails: {
    category: String,
    experience: String,
    price: String,
    aadhar: {
       type: String,
       match: [/^\d{12}$/, 'Aadhar should be 12 digits'] 
    },
    status: { type: String, default: 'none' } 
  },
  avatar: { type: String, default: '' },

  // ✅ Forget Password OTP fields
  resetOtp: { type: String, default: null },
  resetOtpExpiry: { type: Date, default: null },

  createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);