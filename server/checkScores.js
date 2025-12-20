const mongoose = require('mongoose');
const UserScore = require('./models/UserScore');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

async function checkScores() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if we have any user scores
    const count = await UserScore.countDocuments();
    console.log(`Total user scores in database: ${count}`);
    
    if (count > 0) {
      // Show a few sample scores
      const sampleScores = await UserScore.find().limit(3);
      console.log('\nSample scores:');
      console.log(sampleScores);
    }
    
  } catch (error) {
    console.error('Error checking scores:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

checkScores();
