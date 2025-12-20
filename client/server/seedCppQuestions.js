const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

const cppQuiz = {
  title: 'C++ Programming Quiz',
  description: 'Test your knowledge of C++ programming language',
  category: 'C++ Programming',
  difficulty: 'Hard',
  timeLimit: 15, // 15 minutes
  questions: [
    {
      questionText: 'What is the output of the following C++ code?\nint x = 5;\ncout << x++ << ++x;',
      options: [
        '5 6',
        '5 7',
        '6 6',
        '6 7'
      ],
      correctAnswer: '5 7',
      explanation: 'x++ is post-increment (returns 5 then increments), ++x is pre-increment (increments then returns 7)'
    },
    {
      questionText: 'Which of these is not a valid C++ variable name?',
      options: [
        '_myVar',
        'myVar1',
        '1myVar',
        'my_var'
      ],
      correctAnswer: '1myVar',
      explanation: 'Variable names cannot start with a number in C++'
    },
    {
      questionText: 'What is the size of an int data type in C++ on a 32-bit system?',
      options: [
        '1 byte',
        '2 bytes',
        '4 bytes',
        '8 bytes'
      ],
      correctAnswer: '4 bytes',
      explanation: 'On a 32-bit system, int is typically 4 bytes (32 bits)'
    },
    {
      questionText: 'Which of the following is not a valid way to declare a pointer in C++?',
      options: [
        'int *ptr;',
        'int* ptr;',
        'int * ptr;',
        'int ptr*;'
      ],
      correctAnswer: 'int ptr*;',
      explanation: 'The asterisk must be next to either the type or the variable name, not after the variable name'
    },
    {
      questionText: 'What does the "virtual" keyword do in C++?',
      options: [
        'Makes a function execute faster',
        'Allows a function to be overridden in derived classes',
        'Prevents a function from being overridden',
        'Makes a function inline'
      ],
      correctAnswer: 'Allows a function to be overridden in derived classes',
      explanation: 'The virtual keyword enables runtime polymorphism by allowing derived classes to provide their own implementation of the function'
    },
    {
      questionText: 'What is the output of: cout << sizeof(\'a\') in C++?',
      options: [
        '1',
        '2',
        '4',
        '8'
      ],
      correctAnswer: '1',
      explanation: 'In C++, a character literal is of type char, which is 1 byte in size'
    },
    {
      questionText: 'Which of these is not a valid C++ STL container?',
      options: [
        'vector',
        'array',
        'list',
        'tuple'
      ],
      correctAnswer: 'tuple',
      explanation: 'While tuple is a template class in C++, it is not considered an STL container like vector, array, or list'
    }
  ]
};

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Remove any existing C++ quizzes
    await Quiz.deleteMany({ category: 'C++ Programming' });
    console.log('Removed existing C++ quizzes');

    // Add the new C++ quiz
    const savedQuiz = await Quiz.create(cppQuiz);
    console.log('Added new C++ quiz with ID:', savedQuiz._id);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
