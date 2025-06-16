import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const authController = {
  register: async (req, res) => {
    const { name, email, password, photoUrl } = req.body;
    try {
      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashed, photoUrl });
      // Generate JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.cookie('token', token, { httpOnly: true, sameSite: 'lax' })
        .status(201)
        .json({ message: 'User registered', user: { name, email, photoUrl } });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    const { idToken } = req.body; // Get Firebase ID token from frontend
    if (!idToken) return res.status(400).json({ error: 'No token provided' });

    // Optionally verify token here with Firebase Admin SDK
    res.cookie('token', idToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false, // set to true in production with HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.json({ message: 'Login successful' });
  },

  logout: (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
  }
};

export default authController;