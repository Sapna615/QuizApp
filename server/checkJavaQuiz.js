const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

async function checkJavaQuiz() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const Quiz = require('./models/Quiz');
    const javaQuiz = await Quiz.findOne({ category: 'Java Programming' });
    
    if (!javaQuiz) {
      console.log('No Java Programming quiz found in the database');
      return;
    }

    console.log('Found Java Programming quiz:');
    console.log(`Title: ${javaQuiz.title}`);
    console.log(`Description: ${javaQuiz.description}`);
    console.log(`Number of questions: ${javaQuiz.questions.length}`);
    console.log('\nSample question:');
    console.log(javaQuiz.questions[0]);
    
  } catch (error) {
    console.error('Error checking Java quiz:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

checkJavaQuiz();
