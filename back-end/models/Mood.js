const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mood: String,
  label: String,
  note: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Mood', moodSchema);
