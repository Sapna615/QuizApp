const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const { getFallbackQuestions } = require('../fallbackQuestions');

// QuizAPI.io configuration
const QUIZ_API_KEY = process.env.QUIZ_API_KEY || 'TtpjiqmpQ6CSJjwFBbCPdpplBP8N6FZDN3PQi9zE';
const QUIZ_API_URL = 'https://quizapi.io/api/v1/questions';

// Map our categories to QuizAPI categories
const mapToQuizAPICategory = (category) => {
  const categoryMap = {
    // Programming
    'Python Programming': 'python',
    'C++ Programming': 'c',
    'Java Programming': 'java',
    'JavaScript': 'javascript',
    'HTML/CSS': 'html',
    'Operating Systems': 'linux',
    'Networking': 'networking',
    'Databases': 'sql',
    'Algorithms': 'algorithms',
    'Data Structures': 'data structures',
    'Web Development': 'web development',
    'Cybersecurity': 'security',
    'Artificial Intelligence': 'machine learning',
    'Machine Learning': 'machine learning',
    
    // General knowledge
    'General Knowledge': 'general knowledge',
    'Science': 'science',
    'History': 'history',
    'Geography': 'geography',
    'Sports': 'sports',
    'Entertainment': 'entertainment',
    'Mythology': 'mythology',
    'Art': 'art',
    'Literature': 'literature',
    'Technology': 'technology',
    'Space': 'space',
    'Mathematics': 'mathematics',
    'Physics': 'physics',
    'Chemistry': 'chemistry',
    'Biology': 'biology',
    'Economics': 'economics',
    'Politics': 'politics'
  };
  
  return categoryMap[category] || 'general knowledge';
};

// Helper function to decode HTML entities
const decodeHTMLEntities = (text) => {
  if (!text) return '';
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"');
};

// Helper function to map our categories to OpenTDB categories
const getOpenTDBCategoryId = (categoryName) => {
  // Map specific technical categories to more general but relevant OpenTDB categories
  const techCategoryMap = {
    // Programming Languages
    'Python Programming': { id: 18, searchTerm: 'python programming' }, // Computer Science
    'C++ Programming': { id: 18, searchTerm: 'C++ programming' }, // Computer Science
    'Java Programming': { id: 18, searchTerm: 'Java programming' }, // Computer Science
    'JavaScript': { id: 18, searchTerm: 'JavaScript programming' }, // Computer Science
    'HTML/CSS': { id: 18, searchTerm: 'HTML CSS web development' }, // Computer Science
    
    // Technical Subjects
    'Operating Systems': { id: 18, searchTerm: 'operating systems' }, // Computer Science
    'Networking': { id: 18, searchTerm: 'computer networking' }, // Computer Science
    'Databases': { id: 18, searchTerm: 'database SQL' }, // Computer Science
    'Algorithms': { id: 18, searchTerm: 'algorithms' }, // Computer Science
    'Data Structures': { id: 18, searchTerm: 'data structures' }, // Computer Science
    'Web Development': { id: 18, searchTerm: 'web development' }, // Computer Science
    'Mobile Development': { id: 18, searchTerm: 'mobile app development' }, // Computer Science
    'Cybersecurity': { id: 18, searchTerm: 'cybersecurity' }, // Computer Science
    'Artificial Intelligence': { id: 18, searchTerm: 'artificial intelligence' }, // Computer Science
    'Machine Learning': { id: 18, searchTerm: 'machine learning' }, // Computer Science
  };

  // Standard OpenTDB categories
  const standardCategoryMap = {
    'General Knowledge': { id: 9 },
    'Science & Nature': { id: 17 },
    'Science': { id: 17 },
    'History': { id: 23 },
    'Geography': { id: 22 },
    'Sports': { id: 21 },
    'Entertainment': { id: 11 },
    'Mathematics': { id: 19 },
    'Mythology': { id: 20 },
    'Art': { id: 25 },
    'Celebrities': { id: 26 },
    'Animals': { id: 27 },
    'Vehicles': { id: 28 },
    'Comics': { id: 29 },
    'Gadgets': { id: 30 },
    'Anime': { id: 31 },
    'Cartoons': { id: 32 }
  };

  // Try to find the category in our custom tech mapping first
  if (techCategoryMap[categoryName]) {
    return techCategoryMap[categoryName];
  }

  // Then try standard categories
  if (standardCategoryMap[categoryName]) {
    return standardCategoryMap[categoryName];
  }

  // Default to General Knowledge
  return { id: 9, searchTerm: categoryName };
};

// @desc    Get random questions from OpenTDB
// @route   GET /api/external-quizzes
// @access  Public
router.get('/', async (req, res) => {
  const { category = 'General Knowledge', difficulty = 'medium', amount = 10 } = req.query;
  
  console.log(`Attempting to fetch ${amount} ${category} questions from OpenTDB...`);

  try {
    // Map difficulty to OpenTDB format
    const difficultyMap = {
      'easy': 'easy',
      'medium': 'medium',
      'hard': 'hard'
    };
    
    const opentdbDifficulty = difficultyMap[difficulty.toLowerCase()] || '';
    const categoryInfo = getOpenTDBCategoryId(category);
    const opentdbCategory = categoryInfo.id;
    const searchTerm = categoryInfo.searchTerm || category.toLowerCase();
    
    // Build the API URL
    let apiUrl = `https://opentdb.com/api.php?amount=${Math.min(amount, 50)}&category=${opentdbCategory}&type=multiple`;
    if (opentdbDifficulty) {
      apiUrl += `&difficulty=${opentdbDifficulty}`;
    }
    
    console.log('OpenTDB URL:', apiUrl);
    
    const response = await axios.get(apiUrl, {
      timeout: 5000 // 5 second timeout
    });
    
    if (response.data && response.data.results && response.data.results.length > 0) {
      const formattedQuestions = response.data.results.map((q, index) => {
        // Combine and shuffle answers
        const answers = [
          ...q.incorrect_answers,
          q.correct_answer
        ].sort(() => Math.random() - 0.5);
        
        return {
          id: index + 1,
          questionText: `${decodeHTMLEntities(q.question)} ${opentdbCategory === 18 ? `(Computer Science: ${searchTerm})` : ''}`.trim(),
          options: answers.map(a => decodeHTMLEntities(a)),
          correctAnswer: decodeHTMLEntities(q.correct_answer),
          explanation: `The correct answer is: ${decodeHTMLEntities(q.correct_answer)}`,
          category: q.category || category,
          difficulty: q.difficulty || difficulty,
          tags: [q.category ? q.category.toLowerCase() : category.toLowerCase()]
        };
      });
      
      return res.json({
        success: true,
        title: `${category} Quiz`,
        description: `A ${difficulty} difficulty quiz on ${category} (${formattedQuestions.length} questions)`,
        questions: formattedQuestions,
        timeLimit: 15, // 15 minutes by default
        category: category,
        difficulty: difficulty,
        source: 'opentdb.com'
      });
    }
    
    throw new Error('No questions found in OpenTDB response');
    
  } catch (error) {
    console.error('Error with OpenTDB:', error.message);
    
    // Final fallback to local questions
    try {
      console.log('Using local fallback questions...');
      const fallbackQuestions = getFallbackQuestions(category, amount);
      
      if (fallbackQuestions && fallbackQuestions.length > 0) {
        return res.json({
          success: true,
          title: `${category} Quiz`,
          description: `A ${difficulty} difficulty quiz on ${category} (${fallbackQuestions.length} local questions)`,
          questions: fallbackQuestions,
          timeLimit: 15,
          category: category,
          difficulty: difficulty,
          source: 'local',
          isFallback: true
        });
      }
    } catch (localError) {
      console.error('Local fallback failed:', localError.message);
    }
    
    // If all else fails
    return res.status(500).json({
      success: false,
      message: 'Failed to load questions. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
