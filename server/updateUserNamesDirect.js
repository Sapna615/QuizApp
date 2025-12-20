const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const updateUserNames = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Find all users that need updating
    const users = await User.find({
      $or: [
        { name: { $exists: false } },
        { name: { $in: [null, ''] } }
      ]
    });

    console.log(`Found ${users.length} users to update`);

    // Update each user with their username as their name
    for (const user of users) {
      if (user.username) {
        user.name = user.username;
        await user.save();
        console.log(`Updated user ${user._id}: ${user.name}`);
      }
    }

    console.log('User names update completed');
    process.exit(0);
  } catch (error) {
    console.error('Error updating user names:', error);
    process.exit(1);
  }
};

updateUserNames();
