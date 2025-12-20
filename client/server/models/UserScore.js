const mongoose = require('mongoose');

const UserScoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String,
    required: false,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Quiz',
  },
  quizTitle: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: false,
  },
  score: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  dateCompleted: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('UserScore', UserScoreSchema);

