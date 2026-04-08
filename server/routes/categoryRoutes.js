const express = require('express');
console.log('categoryRoutes.js loaded.');
const router = express.Router();
const Category = require('../models/Category');
const Quiz = require('../models/Quiz');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Create a new category (Admin only)
// @route   POST /api/categories
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const { name } = req.body;

    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = await Category.create({ name });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Get categories from actual quizzes first
    const quizCategories = await Quiz.distinct('category');
    
    // If no quizzes exist, return default categories
    if (quizCategories.length === 0) {
      const defaultCategories = [
        { _id: 'category-1', name: 'Java' },
        { _id: 'category-2', name: 'Python' },
        { _id: 'category-3', name: 'React' },
        { _id: 'category-4', name: 'Node.js' },
        { _id: 'category-5', name: 'Networking' },
        { _id: 'category-6', name: 'Operating Systems' },
        { _id: 'category-7', name: 'JavaScript' },
        { _id: 'category-8', name: 'HTML/CSS' },
        { _id: 'category-9', name: 'Database' },
        { _id: 'category-10', name: 'General Knowledge' }
      ];
      return res.json(defaultCategories);
    }
    
    // Format the response to match expected structure
    const categories = quizCategories.map((categoryName, index) => ({
      _id: `category-${index}`,
      name: categoryName
    }));
    
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
