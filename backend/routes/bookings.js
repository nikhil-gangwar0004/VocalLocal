const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect, adminOnly } = require('../middleware/authMiddleware'); // ✅ adminOnly add kiya security ke liye

// @route   POST /api/bookings
// @desc    Naya booking create karo
router.post('/', protect, async (req, res) => {
  try {
    const { professional, service, date, time, address, description, price } = req.body;

    const booking = await Booking.create({
      user: req.user._id,
      professional,
      service,
      date,
      time,
      address,
      description,
      price,
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('professional', 'name role phone price');

    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/bookings/my
// @desc    Meri saari bookings dekho
router.get('/my', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('professional', 'name role phone avatar color')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ REQUIRED FOR ADMIN: Sirf gangwarn411 hi dekh sakega
router.get('/all', protect, adminOnly, async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('user', 'name email phone')
      .populate('professional', 'name role')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ REQUIRED FOR ADMIN: Sirf gangwarn411 hi status badal sakega
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking nahi mili' });

    booking.status = status;
    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/bookings/:id
// @desc    Ek booking ki detail dekho
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('professional', 'name role phone price avatar')
      .populate('user', 'name email phone');

    if (!booking) return res.status(404).json({ message: 'Booking nahi mili' });

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/bookings/:id/cancel
// @desc    Booking cancel karo
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking nahi mili' });

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Aap yeh booking cancel nahi kar sakte' });
    }

    booking.status = 'cancelled';
    await booking.save();
    res.json({ message: 'Booking cancel ho gayi', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;