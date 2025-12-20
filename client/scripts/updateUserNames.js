const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../server/models/User');

dotenv.config();

const updateUserNames = async () => {
  try {
    // Connect to MongoDB with updated options
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout
      family: 4, // Use IPv4, skip trying IPv6
    });

    console.log('Successfully connected to MongoDB');

    // Find all users that need updating
    const usersToUpdate = await User.find({
      $or: [
        { name: { $exists: false } },
        { name: { $in: [null, ''] } },
        { name: { $regex: /^user\s*\d*$/i } } // Also update users with default names like 'User 1'
      ]
    }).select('username name');

    console.log(`Found ${usersToUpdate.length} users that need name updates`);

    let updatedCount = 0;
    const batchSize = 50;
    const batches = [];

    // Process users in batches
    for (let i = 0; i < usersToUpdate.length; i += batchSize) {
      batches.push(usersToUpdate.slice(i, i + batchSize));
    }

    for (const batch of batches) {
      await Promise.all(batch.map(async (user) => {
        try {
          const newName = user.username || `User_${user._id.toString().substring(0, 6)}`;
          await User.updateOne(
            { _id: user._id },
            { $set: { name: newName } }
          );
          console.log(`Updated user ${user._id}: ${newName}`);
          updatedCount++;
        } catch (err) {
          console.error(`Error updating user ${user._id}:`, err.message);
        }
      }));
    }

    console.log(`\nUpdate complete. Successfully updated ${updatedCount} users.`);
    process.exit(0);
  } catch (error) {
    console.error('Error in update process:', error.message);
    process.exit(1);
  } finally {
    // Close the connection when done
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    }
  }
};

// Run the update
updateUserNames();
