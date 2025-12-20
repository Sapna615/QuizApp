const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserScore = require('../models/UserScore');
const Quiz = require('../models/Quiz');
const { protect, admin } = require('../middleware/authMiddleware');

// Get the ObjectId type
const ObjectId = mongoose.Types.ObjectId;

// helper to parse limit with safe default
const parseLimit = (val, def = 10) => {
  const n = parseInt(val, 10);
  return Number.isFinite(n) && n > 0 && n <= 100 ? n : def;
};

// GET /api/leaderboard/quiz/:quizId?limit=10
// Best score per user for a specific quiz (Admin only for detailed view)
// Regular users can only see top scores, not detailed user information
const getQuizLeaderboard = async (req, res, isAdmin = false) => {
  try {
    const limit = parseLimit(req.query.limit, 10);
    const quizId = req.params.quizId;

    if (!ObjectId.isValid(quizId)) {
      return res.status(400).json({ message: 'Invalid quizId' });
    }
    
    const quizObjectId = new ObjectId(quizId);

    const results = await UserScore.aggregate([
      { $match: { quizId: quizObjectId } },
      { $group: {
          _id: '$userId',
          bestScore: { $max: '$score' },
          attempts: { $sum: 1 },
          lastPlayed: { $max: '$dateCompleted' }
      }},
      { $sort: { bestScore: -1, attempts: 1, lastPlayed: 1 } },
      { $limit: limit },
      { $project: { userId: '$_id', bestScore: 1, attempts: 1, lastPlayed: 1, _id: 0 } }
    ]);

    // For non-admin users, only return scores without user IDs
    const finalResults = isAdmin ? results : results.map(({ bestScore, attempts, lastPlayed }) => ({
      bestScore,
      attempts,
      lastPlayed
    }));

    return { type: 'quiz', quizId, results: finalResults };
  } catch (err) {
    throw err;
  }
};

// Admin route for quiz leaderboard
router.get('/admin/quiz/:quizId', protect, admin, async (req, res) => {
  try {
    const result = await getQuizLeaderboard(req, res, true);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Public route for quiz leaderboard (scores only)
router.get('/quiz/:quizId', protect, async (req, res) => {
  try {
    const result = await getQuizLeaderboard(req, res, false);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/leaderboard/global?limit=10 — Public leaderboard (scores only)
// GET /api/leaderboard/admin/global?limit=10 — Admin leaderboard (with user details)
const getGlobalLeaderboard = async (req, res, isAdmin = false) => {
  try {
    const limit = parseLimit(req.query.limit, 10);
    const User = require('../models/User');

    // First, get the aggregated scores
    let results = await UserScore.aggregate([
      {
        $addFields: {
          // Create a stable identifier for grouping, using username if available
          userIdForGroup: {
            $cond: {
              if: { $and: [
                { $eq: [{ $type: "$userId" }, "string"] },
                { $eq: [{ $strLenCP: "$userId" }, 24] },
                { $ne: ["$userId", null] }
              ]},
              then: "$userId",
              else: { $ifNull: ["$username", { $toString: "$_id" }] }
            }
          }
        }
      },
      {
        $group: {
          _id: '$userIdForGroup',
          totalScore: { $sum: '$score' },
          quizzesPlayed: { 
            $addToSet: {
              $cond: [
                { $ifNull: ['$quizId', false] },
                '$quizId',
                '$$REMOVE'  // Exclude null/undefined quizIds
              ]
            }
          },
          attempts: { $sum: 1 },
          lastPlayed: { $max: '$dateCompleted' },
          username: { $first: '$username' },
          userId: { $first: '$userId' } // Keep the original userId for reference
        }
      },
      // Remove any null/undefined values from quizzesPlayed array
      {
        $addFields: {
          quizzesPlayed: {
            $filter: {
              input: '$quizzesPlayed',
              as: 'quiz',
              cond: { $ne: ['$$quiz', null] }
            }
          }
        }
      },
      { $addFields: { quizzesCount: { $size: '$quizzesPlayed' } } },
      { $sort: { totalScore: -1, quizzesCount: -1, lastPlayed: 1 } },
      { $limit: limit }
    ]);

    // Get user details for admin view
    if (isAdmin) {
      // Try to find users by ID first
      const potentialUserIds = results
        .map(r => {
          try {
            // Only try to convert to ObjectId if it's a valid format
            if (typeof r._id === 'string' && /^[0-9a-fA-F]{24}$/.test(r._id)) {
              return new mongoose.Types.ObjectId(r._id);
            }
            return null;
          } catch (e) {
            return null;
          }
        })
        .filter(id => id !== null);

      // Also try to find by username
      const usernames = results
        .map(r => r.username)
        .filter(Boolean);

      // Find users by either ID or username
      const users = await User.find({
        $or: [
          { _id: { $in: potentialUserIds } },
          { username: { $in: usernames } }
        ]
      }, 'username email name _id');

      // Create a map of usernames to user details
      const userMap = users.reduce((acc, user) => {
        acc[user._id.toString()] = user;
        if (user.username) {
          acc[user.username] = user;
        }
        return acc;
      }, {});

      // Add user details to results
      results = results.map(item => {
        // Try to find user by ID first, then by username
        const user = userMap[item._id.toString()] || 
                    (item.username ? userMap[item.username] : {}) || 
                    {};
        
        // Create a display name with fallbacks
        const displayName = user.name || 
                          item.username || 
                          (user.username || `User_${item._id.toString().substring(0, 6)}`);
        
        return {
          userId: user._id || item._id,
          name: user.name || displayName,
          username: user.username || item.username || '',
          email: user.email || '',
          totalScore: item.totalScore,
          quizzesCount: item.quizzesCount || (item.quizzesPlayed ? item.quizzesPlayed.length : 0),
          attempts: item.attempts,
          lastPlayed: item.lastPlayed
        };
      });
    } else {
      // For non-admin users, return scores with usernames but no user IDs
      results = results.map(item => ({
        username: item.username || `Player_${item._id.toString().substring(0, 6)}`,
        totalScore: item.totalScore,
        quizzesCount: item.quizzesCount || (item.quizzesPlayed ? item.quizzesPlayed.length : 0),
        attempts: item.attempts,
        lastPlayed: item.lastPlayed
      }));
    }

    return { type: 'global', results };
  } catch (err) {
    throw err;
  }
};

// Public routes (no auth required) - MUST COME FIRST
router.get('/public/global', async (req, res) => {
  try {
    const result = await getGlobalLeaderboard(req, res, false);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/public/quiz/:quizId', async (req, res) => {
  try {
    const result = await getQuizLeaderboard(req, res, false);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin route for global leaderboard
router.get('/admin/global', protect, admin, async (req, res) => {
  try {
    const result = await getGlobalLeaderboard(req, res, true);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin route for quiz leaderboard
router.get('/admin/quiz/:quizId', protect, admin, async (req, res) => {
  try {
    const result = await getQuizLeaderboard(req, res, true);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Protected route for quiz leaderboard
router.get('/quiz/:quizId', protect, async (req, res) => {
  try {
    const result = await getQuizLeaderboard(req, res, false);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Protected route for global leaderboard
router.get('/global', protect, async (req, res) => {
  try {
    const result = await getGlobalLeaderboard(req, res, false);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/leaderboard/category/:categoryId - Get leaderboard for a specific category
// GET /api/leaderboard/admin/category/:categoryId - Admin version with user details
const getCategoryLeaderboard = async (req, res, isAdmin = false) => {
  try {
    const limit = parseLimit(req.query.limit, 10);
    const categoryId = req.params.categoryId;
    
    console.log('Fetching leaderboard for category ID:', categoryId);

    // First, get the category name if possible
    let categoryName = categoryId;
    try {
      const category = await mongoose.model('Category').findById(categoryId);
      if (category) {
        categoryName = category.name;
      }
    } catch (err) {
      console.log('Could not find category by ID, using ID as name');
    }

    console.log('Searching for scores with category:', categoryId);
    
    // Find all quizzes in this category
    const quizzesInCategory = await Quiz.find({ category: categoryId }, '_id');
    const quizIds = quizzesInCategory.map(q => q._id);
    
    console.log(`Found ${quizIds.length} quizzes in category`);

    // Get all user scores for these quizzes
    let results = await UserScore.aggregate([
      { 
        $match: { 
          $or: [
            { category: categoryId },
            { quizId: { $in: quizIds } }
          ]
        } 
      },
      { 
        $group: {
          _id: '$userId',
          username: { $first: '$username' },
          bestScore: { $max: '$score' },
          attempts: { $sum: 1 },
          lastPlayed: { $max: '$dateCompleted' }
        }
      },
      { $sort: { bestScore: -1, attempts: 1, lastPlayed: 1 } },
      { $limit: limit },
      { 
        $project: { 
          userId: '$_id',
          username: 1,
          bestScore: 1, 
          attempts: 1, 
          lastPlayed: 1, 
          _id: 0 
        } 
      }
    ]);

    console.log(`Found ${results.length} results for category ${categoryId}`);

    // For non-admin users, only return scores without user IDs
    if (!isAdmin) {
      results = results.map(({ bestScore, attempts, lastPlayed }) => ({
        bestScore,
        attempts,
        lastPlayed
      }));
    }

    return { 
      type: 'category', 
      category: categoryId, 
      categoryName,
      results 
    };
  } catch (err) {
    console.error('Error in category leaderboard:', err);
    throw err;
  }
};

// Admin route for category leaderboard
router.get('/admin/category/:categoryId', protect, admin, async (req, res) => {
  try {
    const result = await getCategoryLeaderboard(req, res, true);
    res.json(result);
  } catch (err) {
    res.status(500).json({ 
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// Public route for category leaderboard (scores only)
router.get('/category/:categoryId', protect, async (req, res) => {
  try {
    const result = await getCategoryLeaderboard(req, res, false);
    res.json(result);
  } catch (err) {
    res.status(500).json({ 
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

module.exports = router;
