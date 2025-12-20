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
    // Get categories from actual quizzes instead of the Category collection
    const quizCategories = await Quiz.distinct('category');
    
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
