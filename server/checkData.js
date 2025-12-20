const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Quiz = require('./models/Quiz');
const UserScore = require('./models/UserScore');

dotenv.config();

const checkData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });

    console.log('Connected to MongoDB');

    // Check users
    const userCount = await User.countDocuments({});
    console.log(`\nTotal users: ${userCount}`);
    
    if (userCount > 0) {
      const sampleUser = await User.findOne({}).select('_id username email name').lean();
      console.log('Sample user:');
      console.log(JSON.stringify(sampleUser, null, 2));
    }

    // Check quizzes
    const quizCount = await Quiz.countDocuments({});
    console.log(`\nTotal quizzes: ${quizCount}`);
    
    if (quizCount > 0) {
      const sampleQuiz = await Quiz.findOne({}).select('_id title category').lean();
      console.log('Sample quiz:');
      console.log(JSON.stringify(sampleQuiz, null, 2));
    }

    // Check user scores
    const scoreCount = await UserScore.countDocuments({});
    console.log(`\nTotal user scores: ${scoreCount}`);
    
    if (scoreCount > 0) {
      const sampleScore = await UserScore.findOne({}).lean();
      console.log('Sample score:');
      console.log(JSON.stringify(sampleScore, null, 2));
    }

  } catch (error) {
    console.error('Error checking data:', error);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('\nMongoDB connection closed');
    }
    process.exit(0);
  }
};

checkData();
