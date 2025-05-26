const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const Mood = require('../models/Mood');

router.post('/', protect, async (req, res) => {
  try {
    const { mood, label, note } = req.body;
    const newMood = await Mood.create({
      userId: req.user._id,
      mood,
      label,
      note,
    });
    res.status(201).json(newMood);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save mood' });
  }
});

module.exports = router;
