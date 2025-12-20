const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserScore = require('./models/UserScore');

dotenv.config();

const checkUserScores = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });

    console.log('Connected to MongoDB');

    // Get a sample of user scores
    const sampleScores = await UserScore.find({}).limit(5).lean();
    console.log('Sample UserScores:');
    console.log(JSON.stringify(sampleScores, null, 2));

    // Check if we have any scores with quizId
    const scoresWithQuiz = await UserScore.countDocuments({ quizId: { $exists: true, $ne: null } });
    console.log(`\nTotal scores with quizId: ${scoresWithQuiz}`);

    // Check for any null or undefined quizIds
    const scoresWithoutQuiz = await UserScore.countDocuments({ 
      $or: [
        { quizId: { $exists: false } },
        { quizId: null },
        { quizId: { $type: 'null' } }
      ]
    });
    console.log(`Scores without valid quizId: ${scoresWithoutQuiz}`);

    // Check the first few scores with quizId
    const firstFewWithQuiz = await UserScore.find({ 
      quizId: { $exists: true, $ne: null } 
    }).limit(3).lean();
    
    console.log('\nFirst few scores with quizId:');
    console.log(JSON.stringify(firstFewWithQuiz, null, 2));

    // Check if we have any scores at all
    const totalScores = await UserScore.countDocuments({});
    console.log(`\nTotal user scores in database: ${totalScores}`);

  } catch (error) {
    console.error('Error checking user scores:', error);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    }
    process.exit(0);
  }
};

checkUserScores();
