const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// ---------- CORS ----------
app.use(cors({
  origin: "http://localhost:3000",  // Only allow localhost for development
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true
}));

// ---------- Middleware ----------
app.use(express.json());

// ---------- Routes ----------
const quizRoutes = require('./routes/quizRoutes');
const scoreRoutes = require('./routes/scoreRoutes');
const userRoutes = require('./routes/userRoutes');
const externalQuizRoutes = require('./routes/externalQuizRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');

app.use('/api/quizzes', quizRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/api/users', userRoutes);
app.use('/api/external-quizzes', externalQuizRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// ---------- Seed Default Categories ----------
const Category = require('./models/Category');
const seedCategories = async () => {
  const defaults = ['General Knowledge','Science','History','Geography','Sports','Entertainment'];
  await Promise.all(defaults.map(name =>
    Category.updateOne({ name }, { $setOnInsert: { name } }, { upsert: true })
  ));
  console.log('Default categories ensured.');
};

// ---------- MongoDB Connection ----------
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB Atlas connected");
    const db = mongoose.connection.db;
    console.log("Database name:", db.databaseName);
    const collections = await db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
    await seedCategories();
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// ---------- Basic Route ----------
app.get('/', (req, res) => res.send('Quiz API is running'));

// ---------- Start Server ----------
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
