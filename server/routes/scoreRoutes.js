const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const UserScore = require('../models/UserScore');

// Submit quiz answers and calculate score
router.post('/', async (req, res) => {
  try {
    const { quizId, answers, userId, username, quizTitle, category, difficulty, score: frontendScore, totalQuestions } = req.body;
    let quiz = null;
    let questions = [];
    let actualQuizId = quizId;

    // Check if quizId is a valid MongoDB ObjectId or a category-based ID
    if (quizId && !quizId.startsWith('category-')) {
      quiz = await Quiz.findById(quizId);
      if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
      questions = quiz.questions;
    } else if (answers) {
      questions = answers;
      // For category-based quizzes, don't store the quizId
      actualQuizId = undefined;
    }

    let score = 0;
    if (quiz && quizId && !quizId.startsWith('category-')) {
      quiz.questions.forEach((question, index) => {
        if (answers[index] && answers[index] === question.correctAnswer) {
          score++;
        }
      });
    } else {
      score = frontendScore;
    }

    const userScore = new UserScore({
      userId,
      username,
      quizId: actualQuizId,
      quizTitle: quizTitle || (quiz ? quiz.title : 'N/A'),
      category: category || (quiz ? quiz.category : 'N/A'),
      difficulty: difficulty ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase() : (quiz ? quiz.difficulty : 'N/A'),
      score,
      totalQuestions: totalQuestions || (quiz ? quiz.questions.length : answers.length),
    });

    const savedUserScore = await userScore.save();
    res.status(201).json(savedUserScore);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Leaderboard by quiz title
router.get('/leaderboard', async (req, res) => {
  try {
    const { quizTitle, limit = 10 } = req.query;
    const matchStage = quizTitle ? { quizTitle } : {};

    const leaderboard = await UserScore.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$userId',
          username: { $first: '$username' },
          bestScore: { $max: '$score' },
          attempts: { $sum: 1 },
        },
      },
      { $sort: { bestScore: -1, attempts: 1 } },
      { $limit: Number(limit) },
    ]);

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Overall leaderboard (total score across quizzes)
router.get('/leaderboard/overall', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const leaderboard = await UserScore.aggregate([
      {
        $group: {
          _id: '$userId',
          username: { $first: '$username' },
          totalScore: { $sum: '$score' },
          attempts: { $sum: 1 },
        },
      },
      { $sort: { totalScore: -1, attempts: 1 } },
      { $limit: Number(limit) },
    ]);

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user scores for a specific quiz or all quizzes
router.get('/', async (req, res) => {
  try {
    const { userId, quizId } = req.query;
    let query = {};
    if (userId) query.userId = userId;
    if (quizId) query.quizId = quizId;

    const scores = await UserScore.find(query).populate('quizId');
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get recent tests with time tracking (admin only)
router.get('/recent', async (req, res) => {
  try {
    const recentTests = await UserScore.find()
      .populate('userId', 'username email')
      .sort({ dateCompleted: -1 })
      .limit(50);
    
    res.json(recentTests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

