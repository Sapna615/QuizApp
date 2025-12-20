// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // // require('dotenv').config({ path: '../.env' });

// // require('dotenv').config();

// // const jwt = require('jsonwebtoken');

// // const app = express();
// // const PORT = process.env.PORT || 5001;

// // // Middleware
// // // app.use(cors({
// // //   origin: 'http://localhost:3000',
// // //   credentials: true,
// // //   allowedHeaders: ['Content-Type', 'Authorization']
// // // }));


// // // app.use(cors({
// // //   origin: [
// // //     "http://localhost:3000",
// // //     "http://localhost:5001"
// // //   ],
// // //   credentials: true,
// // //   allowedHeaders: ['Content-Type', 'Authorization']
// // // }));


// // app.use(cors({
// //   origin: [
// //     "http://localhost:3000",
// //     "http://localhost:5001"
// //   ],
// //   methods: ["GET", "POST", "PUT", "DELETE"],
// //   allowedHeaders: ["Content-Type", "Authorization"],
// //   credentials: true
// // }));









// // app.use(express.json());

// // const quizRoutes = require('./routes/quizRoutes');
// // const scoreRoutes = require('./routes/scoreRoutes');
// // const userRoutes = require('./routes/userRoutes');
// // const externalQuizRoutes = require('./routes/externalQuizRoutes');
// // const categoryRoutes = require('./routes/categoryRoutes');
// // const Category = require('./models/Category'); // New
// // const leaderboardRoutes = require('./routes/leaderboardRoutes');

// // const seedCategories = async () => {
// //   const defaults = [
// //     'General Knowledge',
// //     'Science',
// //     'History',
// //     'Geography',
// //     'Sports',
// //     'Entertainment'
// //   ];

// //   await Promise.all(
// //     defaults.map((name) =>
// //       Category.updateOne(
// //         { name },
// //         { $setOnInsert: { name } },
// //         { upsert: true }
// //       )
// //     )
// //   );
// //   console.log('Default categories ensured.');
// // };

// // app.use('/api/quizzes', quizRoutes);
// // app.use('/api/scores', scoreRoutes);
// // app.use('/api/users', userRoutes);
// // app.use('/api/external-quizzes', externalQuizRoutes);
// // app.use('/api/categories', categoryRoutes);
// // app.use('/api/leaderboard', leaderboardRoutes);

// // // MongoDB Connection
// // // mongoose.connect(process.env.MONGODB_URI, {
// // //   useNewUrlParser: true,
// // //   useUnifiedTopology: true,
// // // })
// // // .then(async () => {
// // //   console.log('MongoDB Atlas connected');
// // //   console.log('Connected to database:', process.env.MONGODB_URI);
// // //   // Test the connection
// // //   const db = mongoose.connection.db;
// // //   console.log('Database name:', db.databaseName);
// // //   const collections = await db.listCollections().toArray();
// // //   console.log('Available collections:', collections.map(c => c.name));
// // //   try {
// // //     await seedCategories();
// // //   } catch (seedError) {
// // //     console.error('Failed to seed default categories:', seedError.message);
// // //   }
// // // })
// // // .catch(err => console.error(err));



// // mongoose.connect(process.env.MONGODB_URI)
// //   .then(async () => {
// //     console.log("MongoDB Atlas connected");

// //     // List collections safely
// //     const db = mongoose.connection.db;
// //     console.log("Database name:", db.databaseName);
// //     const collections = await db.listCollections().toArray();
// //     console.log("Collections:", collections.map(c => c.name));
// //     // Seed categories if needed
// //     try {
// //       await seedCategories();
// //     } catch (err) {
// //       console.error("Category seeding error:", err.message);
// //     }
// //   })
// //   .catch(err => {
// //     console.error("MongoDB connection error:", err);
// //     process.exit(1); // stop server if connection fails
// //   });











// // // Basic Route
// // app.get('/', (req, res) => {
// //   res.send('Quiz API is running');
// // });

// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });














// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const jwt = require('jsonwebtoken');

// const scoreRoutes = require('./routes/scoreRoutes');
// const userRoutes = require('./routes/userRoutes');
// const externalQuizRoutes = require('./routes/externalQuizRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');
// const leaderboardRoutes = require('./routes/leaderboardRoutes');

// app.use('/api/quizzes', quizRoutes);
// app.use('/api/scores', scoreRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/external-quizzes', externalQuizRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/leaderboard', leaderboardRoutes);

// // ---------- Seed Default Categories ----------
// const Category = require('./models/Category');

// const seedCategories = async () => {
//   const defaults = [
//     'General Knowledge',
//     'Science',
//     'History',
//     'Geography',
//     'Sports',
//     'Entertainment'
//   ];

//   await Promise.all(
//     defaults.map((name) =>
//       Category.updateOne(
//         { name },
//         { $setOnInsert: { name } },
//         { upsert: true }
//       )
//     )
//   );

//   console.log('Default categories ensured.');
// };

// // ---------- MongoDB Connection ----------
// mongoose.connect(process.env.MONGODB_URI)
//   .then(async () => {
//     console.log("MongoDB Atlas connected");

//     const db = mongoose.connection.db;
//     console.log("Database name:", db.databaseName);

//     const collections = await db.listCollections().toArray();
//     console.log("Collections:", collections.map(c => c.name));

//     try {
//       await seedCategories();
//     } catch (err) {
//       console.error("Category seeding error:", err.message);
//     }
//   })
//   .catch(err => {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
//   });

// // ---------- Basic Route ----------
// app.get('/', (req, res) => {
//   res.send('Quiz API is running');
// });

// // ---------- Start Server ----------
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });







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
