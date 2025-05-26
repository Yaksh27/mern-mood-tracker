const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const protect = require('./middleware/authMiddleware');
const moodRoutes = require('./routes/mood');
const journalRoutes = require('./routes/journal');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/moods', moodRoutes);
app.use('/api/journals', journalRoutes);
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: `Hello, ${req.user.name}! You are authenticated.` });
});
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error(err));
