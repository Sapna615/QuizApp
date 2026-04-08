require('dotenv').config();
const mongoose = require('mongoose');
const UserScore = require('./models/UserScore');
const User = require('./models/User');

const seedSampleScores = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing scores
    await UserScore.deleteMany({});
    console.log('Cleared existing scores');

    // Sample scores with proper ObjectIds
    const sampleScores = [
      {
        userId: new mongoose.Types.ObjectId(),
        username: 'Alice',
        quizId: new mongoose.Types.ObjectId(),
        quizTitle: 'Java Quiz',
        category: 'Java',
        difficulty: 'Easy',
        score: 8,
        totalQuestions: 10,
        timeTaken: 300,
        dateCompleted: new Date()
      },
      {
        userId: new mongoose.Types.ObjectId(),
        username: 'Bob',
        quizId: new mongoose.Types.ObjectId(),
        quizTitle: 'Java Quiz',
        category: 'Java',
        difficulty: 'Easy',
        score: 6,
        totalQuestions: 10,
        timeTaken: 420,
        dateCompleted: new Date(Date.now() - 86400000) // Yesterday
      },
      {
        userId: new mongoose.Types.ObjectId(),
        username: 'Charlie',
        quizId: new mongoose.Types.ObjectId(),
        quizTitle: 'Python Quiz',
        category: 'Python',
        difficulty: 'Medium',
        score: 7,
        totalQuestions: 10,
        timeTaken: 380,
        dateCompleted: new Date(Date.now() - 172800000) // 2 days ago
      }
    ];

    // Insert sample scores
    await UserScore.insertMany(sampleScores);
    console.log('Seeded sample scores:', sampleScores.length);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding scores:', error);
    process.exit(1);
  }
};

seedSampleScores();
