const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserScore = require('./models/UserScore');
const { Types: { ObjectId } } = mongoose;

dotenv.config();

const migrateUserScores = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });

    console.log('Connected to MongoDB');

    // Find all user scores with string user IDs
    const scores = await UserScore.find({
      $or: [
        { userId: { $type: 'string' } },
        { userId: { $exists: false } }
      ]
    });

    console.log(`Found ${scores.length} user scores to migrate`);

    let updatedCount = 0;
    const batchSize = 50;
    const batches = [];

    // Process scores in batches
    for (let i = 0; i < scores.length; i += batchSize) {
      batches.push(scores.slice(i, i + batchSize));
    }

    for (const batch of batches) {
      await Promise.all(batch.map(async (score) => {
        try {
          // Only convert if userId is a string and a valid ObjectId
          if (typeof score.userId === 'string' && ObjectId.isValid(score.userId)) {
            score.userId = new ObjectId(score.userId);
            await score.save();
            updatedCount++;
          }
        } catch (err) {
          console.error(`Error updating score ${score._id}:`, err.message);
        }
      }));
    }

    console.log(`\nMigration complete. Successfully updated ${updatedCount} user scores.`);
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    }
  }
};

// Run the migration
migrateUserScores();
