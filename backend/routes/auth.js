const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const Professional = require('../models/Professional');
const { protect } = require('../middleware/authMiddleware');
const { sendOtpEmail } = require('../utils/sendEmail');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Email already registered' });

        const user = await User.create({
            name, email, password, phone,
            role: role || 'customer',
            isVerified: true
        });

        res.status(201).json({
            _id: user._id, name: user.name, email: user.email,
            phone: user.phone, role: user.role,
            token: generateToken(user._id)
        });
    } catch (error) { res.status(500).json({ message: error.message }); }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id, name: user.name, email: user.email,
                phone: user.phone, role: user.role,
                proDetails: user.proDetails,
                token: generateToken(user._id)
            });
        } else { res.status(401).json({ message: 'Galat email ya password' }); }
    } catch (error) { res.status(500).json({ message: error.message }); }
});

// ✅ 1️⃣ FORGOT PASSWORD — OTP Send
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Ye email registered nahi hai' });

        const otp = crypto.randomInt(100000, 999999).toString();
        user.resetOtp = otp;
        user.resetOtpExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();

        await sendOtpEmail(email, otp);
        res.json({ message: 'OTP bhej diya gaya!' });
    } catch (error) { res.status(500).json({ message: error.message }); }
});

// ✅ 2️⃣ VERIFY OTP
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.resetOtp !== otp)
            return res.status(400).json({ message: 'Invalid OTP' });

        if (user.resetOtpExpiry < Date.now())
            return res.status(400).json({ message: 'OTP expire ho gaya, dobara try karo' });

        res.json({ message: 'OTP verified!', success: true });
    } catch (error) { res.status(500).json({ message: error.message }); }
});

// ✅ 3️⃣ RESET PASSWORD
router.post('/reset-password', async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.resetOtp !== otp || user.resetOtpExpiry < Date.now())
            return res.status(400).json({ message: 'Invalid ya expired OTP' });

        user.password = newPassword;
        user.resetOtp = null;
        user.resetOtpExpiry = null;
        await user.save();

        res.json({ message: 'Password reset ho gaya! 🎉' });
    } catch (error) { res.status(500).json({ message: error.message }); }
});

// GET /api/auth/me
router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (error) { res.status(500).json({ message: error.message }); }
});

// PUT /api/auth/profile
router.put('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User nahi mila' });
        user.name = req.body.name || user.name;
        user.phone = req.body.phone || user.phone;
        user.location = req.body.location || user.location;
        if (req.body.password) user.password = req.body.password;
        const updated = await user.save();
        res.json({
            _id: updated._id, name: updated.name, email: updated.email,
            phone: updated.phone, location: updated.location, role: updated.role,
            proDetails: updated.proDetails, token: generateToken(updated._id),
        });
    } catch (error) { res.status(500).json({ message: error.message }); }
});

// PUT /api/auth/apply-pro
router.put('/apply-pro', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.proDetails = {
            category: req.body.category,
            experience: req.body.experience,
            price: req.body.price,
            aadhar: req.body.aadhar,
            status: 'pending'
        };
        await user.save();
        res.json({ message: 'Application sent!' });
    } catch (error) { res.status(500).json({ message: error.message }); }
});

// ADMIN ROUTES
router.get('/admin/pending-pros', protect, async (req, res) => {
    try {
        if (req.user.email !== 'gangwarn411@gmail.com') return res.status(403).json({ message: 'Unauthorized' });
        const pending = await User.find({ 'proDetails.status': 'pending' }).select('-password');
        res.json(pending);
    } catch (error) { res.status(500).json({ message: error.message }); }
});

router.put('/admin/approve-pro/:id', protect, async (req, res) => {
    try {
        if (req.user.email !== 'gangwarn411@gmail.com') return res.status(403).json({ message: 'Unauthorized' });
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User nahi mila' });
        user.role = 'professional';
        user.isVerifiedPro = true;
        user.proDetails.status = 'approved';
        await user.save();

        const alreadyExists = await Professional.findOne({ name: user.name });
        if (!alreadyExists) {
            await Professional.create({
                name: user.name,
                email: user.email,
                role: user.proDetails?.category || 'Handyman',
                phone: user.phone || '',
                price: user.proDetails?.price || '₹299/hr',
                exp: user.proDetails?.experience || '1 yr',
                location: user.location || 'Pilibhit, UP',
                available: true, verified: true, color: '#22c55e',
                skills: [user.proDetails?.category || 'General'],
                bio: `Verified professional on VocalLocal`,
            });
        } else {
            // ✅ FIX — email update karo agar professional pehle se exist karta hai
            await Professional.findByIdAndUpdate(alreadyExists._id, {
                email: user.email
            });
        }
        res.json({ message: `${user.name} approved!` });
    } catch (error) { res.status(500).json({ message: error.message }); }
});

router.put('/admin/reject-pro/:id', protect, async (req, res) => {
    try {
        if (req.user.email !== 'gangwarn411@gmail.com') return res.status(403).json({ message: 'Unauthorized' });
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User nahi mila' });
        user.proDetails.status = 'rejected';
        await user.save();
        res.json({ message: `${user.name} rejected.` });
    } catch (error) { res.status(500).json({ message: error.message }); }
});

module.exports = router;