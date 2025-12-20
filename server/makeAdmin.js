require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Function to make a user admin
const makeAdmin = async (email) => {
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { role: 'admin' } },
      { new: true }
    );

    if (!user) {
      console.error('User not found with email:', email);
      return;
    }

    console.log(`Successfully updated user ${user.email} to admin`);
    console.log('User details:', {
      id: user._id,
      email: user.email,
      role: user.role,
      username: user.username
    });
  } catch (error) {
    console.error('Error updating user role:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Get email from command line argument
const email = process.argv[2];
if (!email) {
  console.error('Please provide an email address as an argument');
  console.log('Usage: node makeAdmin.js user@example.com');
  process.exit(1);
}

makeAdmin(email);
