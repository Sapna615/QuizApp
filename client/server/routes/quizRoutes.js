const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const { protect, admin } = require('../middleware/authMiddleware'); // Import middleware

// Create a new quiz (Admin only)
router.post('/', protect, admin, async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a quiz (Admin only)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { title, description, questions, timeLimit, category, difficulty } = req.body;

    const quiz = await Quiz.findById(req.params.id);

    if (quiz) {
      quiz.title = title || quiz.title;
      quiz.description = description || quiz.description;
      quiz.questions = questions || quiz.questions;
      quiz.timeLimit = timeLimit !== undefined ? timeLimit : quiz.timeLimit;
      quiz.category = category || quiz.category;
      quiz.difficulty = difficulty || quiz.difficulty;

      const updatedQuiz = await quiz.save();
      res.json(updatedQuiz);
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a quiz (Admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (quiz) {
      await quiz.deleteOne(); // Use deleteOne() instead of remove()
      res.json({ message: 'Quiz removed' });
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all quizzes (Public - can be filtered)
router.get('/', async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }
    if (difficulty) {
      filter.difficulty = difficulty;
    }

    const quizzes = await Quiz.find(filter);
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single quiz by ID (Public)
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

