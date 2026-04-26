const express = require('express');
const router = express.Router();

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');


// ================= REGISTER =================
router.post('/register', async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      fullname,
      email,
      password
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ token });

  } catch (err) {

    if (err.code === 11000) {
      return res.status(400).json({
        message: 'Email already registered'
      });
    }

    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
});


// ================= LOGIN =================
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ token });

    } catch (err) {
        res.status(500).json({
            message: 'Server error',
            error: err.message
        });
    }
});



router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
});


router.put('/me', auth, async (req, res) => {
    try {
        const { fullname, password } = req.body;

        const user = await User.findById(req.user.id);

        if (fullname) user.fullname = fullname;
        if (password) { user.password = password; }

        await user.save();

        res.json({ message: 'Profile updated' });

    } catch {
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE ACCOUNT
router.delete('/me', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    // delete all tasks of user
    await Task.deleteMany({ user: userId });

    // delete user
    await User.findByIdAndDelete(userId);

    res.json({ message: 'Account deleted' });

  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;