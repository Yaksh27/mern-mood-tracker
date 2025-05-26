const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Journal', journalSchema);
