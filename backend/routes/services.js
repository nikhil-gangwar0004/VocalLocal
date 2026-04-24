const express = require('express');
const router = express.Router();
const Professional = require('../models/Professional');
const { protect, adminOnly } = require('../middleware/authMiddleware'); // ✅ adminOnly added

// GET Routes (Public)
router.get('/', async (req, res) => {
  try {
    const { role, location, available } = req.query;
    let filter = {};
    if (role) filter.role = role;
    if (location) filter.location = new RegExp(location, 'i');
    if (available) filter.available = available === 'true';
    const professionals = await Professional.find(filter).sort({ rating: -1 });
    res.json(professionals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/seed', async (req, res) => {
  try {
    await Professional.deleteMany({});
    const sampleProfessionals = [
      { name: 'Ramesh Kumar',  role: 'Plumber',     rating: 4.9, jobs: 312, location: 'Pilibhit, UP',     phone: '+91 98111 22333', price: '₹299/hr', exp: '8 yrs',  available: true,  color: '#3b82f6', skills: ['Pipe Repair', 'Leak Fixing', 'Bathroom Fitting', 'Water Tank'] },
      { name: 'Suresh Verma',  role: 'Electrician', rating: 4.8, jobs: 245, location: 'Bareilly, UP',     phone: '+91 97222 33444', price: '₹249/hr', exp: '5 yrs',  available: true,  color: '#f59e0b', skills: ['Wiring', 'Fan Installation', 'AC Wiring', 'MCB Box'] },
      { name: 'Anil Sharma',   role: 'Mechanic',    rating: 4.7, jobs: 189, location: 'Pilibhit, UP',     phone: '+91 96333 44555', price: '₹399/hr', exp: '10 yrs', available: false, color: '#ef4444', skills: ['Car Servicing', 'Bike Repair', 'Engine Checkup', 'Tyre Change'] },
      { name: 'Priya Singh',   role: 'Salon',       rating: 5.0, jobs: 420, location: 'Shahjahanpur, UP', phone: '+91 95444 55666', price: '₹199/hr', exp: '6 yrs',  available: true,  color: '#ec4899', skills: ['Hair Cut', 'Facial', 'Waxing', 'Bridal Makeup'] },
      { name: 'Mahesh Yadav',  role: 'Carpenter',   rating: 4.6, jobs: 156, location: 'Pilibhit, UP',     phone: '+91 94555 66777', price: '₹349/hr', exp: '12 yrs', available: true,  color: '#22c55e', skills: ['Furniture Repair', 'Door Fitting', 'Woodwork', 'Almari'] },
      { name: 'Vikram Tiwari', role: 'Painter',     rating: 4.5, jobs: 98,  location: 'Bareilly, UP',     phone: '+91 93666 77888', price: '₹179/hr', exp: '4 yrs',  available: true,  color: '#a855f7', skills: ['Wall Painting', 'POP Work', 'Waterproof Paint', 'Texture Paint'] },
    ];
    const created = await Professional.insertMany(sampleProfessionals);
    res.json({ message: `✅ ${created.length} professionals add ho gaye!`, data: created });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const professional = await Professional.findById(req.params.id);
    if (!professional) return res.status(404).json({ message: 'Professional nahi mila' });
    res.json(professional);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin Only Routes
router.delete('/:id', protect, adminOnly, async (req, res) => { // ✅ adminOnly added
  try {
    const professional = await Professional.findByIdAndDelete(req.params.id);
    if (!professional) return res.status(404).json({ message: 'Expert nahi mila' });
    res.json({ message: '✅ Expert removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, adminOnly, async (req, res) => { // ✅ adminOnly added
  try {
    const professional = await Professional.create(req.body);
    res.status(201).json(professional);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;