const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token invalid hai, login karein' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Token nahi mila, login karein' });
  }
};

const adminOnly = (req, res, next) => {
  // ✅ Sirf teri email allow hogi
  if (req.user && req.user.email === "gangwarn411@gmail.com") {
    next();
  } else {
    res.status(403).json({ message: "Access Denied: Bhai, tum admin nahi ho!" });
  }
};

// Dono ko ek saath export karna zaroori hai
module.exports = { protect, adminOnly };