require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');

const seedCategories = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Default categories to seed
    const defaultCategories = [
      'Java',
      'Python', 
      'React',
      'Node.js',
      'Networking',
      'Operating Systems',
      'JavaScript',
      'HTML/CSS',
      'Database',
      'General Knowledge'
    ];

    // Clear existing categories
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    // Insert default categories
    const categories = await Category.insertMany(
      defaultCategories.map(name => ({ name }))
    );
    console.log('Seeded categories:', categories);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
};

seedCategories();
